import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ORG_ID = "00Daj00000fuXdhEAE";
const FEATURE_ID = "ai-platform-agents-scrt";
const AGENT_ID = "0Xxaj000001Q1G1CAK";
const BASE_URL = "https://api.salesforce.com/einstein/ai-agent/v1";
const INSTANCE_URL = "https://orgfarm-7eec8186c7.my.salesforce.com";

// Store sessions in memory
const sessions: Map<string, { sessionId: string; sequenceId: number }> = new Map();

async function getSfSession(userId: string, sfToken: string): Promise<{ sessionId: string; sequenceId: number } | null> {
  if (sessions.has(userId)) {
    console.log(`Using existing session for ${userId}`);
    return sessions.get(userId)!;
  }

  console.log(`Creating new Salesforce session for ${userId}...`);
  const url = `${BASE_URL}/agents/${AGENT_ID}/sessions`;
  
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sfToken}`,
        'Content-Type': 'application/json',
        'x-org-id': ORG_ID,
        'x-client-feature-id': FEATURE_ID,
      },
      body: JSON.stringify({
        externalSessionKey: crypto.randomUUID(),
        instanceConfig: { endpoint: INSTANCE_URL },
        streamingCapabilities: { chunkTypes: ["Text"] },
        bypassUser: true,
      }),
    });

    console.log(`Session creation response status: ${resp.status}`);
    
    if (resp.ok) {
      const data = await resp.json();
      const sessionId = data.sessionId;
      console.log(`Session created: ${sessionId}`);
      const sessionData = { sessionId, sequenceId: 1 };
      sessions.set(userId, sessionData);
      return sessionData;
    } else {
      const errorText = await resp.text();
      console.error(`Error creating session: ${errorText}`);
      return null;
    }
  } catch (e) {
    console.error(`Connection error: ${e}`);
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle GET requests (health checks)
  if (req.method === 'GET') {
    return new Response(JSON.stringify({ 
      status: 'ok', 
      service: 'video-agent-proxy',
      model: 'salesforce-agentforce'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const sfToken = Deno.env.get('SF_AGENT_TOKEN');
    if (!sfToken) {
      console.error('SF_AGENT_TOKEN not configured');
      return new Response(JSON.stringify({ 
        error: 'Salesforce token not configured' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse request body with error handling
    let data: any = {};
    try {
      const bodyText = await req.text();
      if (bodyText && bodyText.trim()) {
        data = JSON.parse(bodyText);
      }
    } catch (parseError) {
      console.log('Empty or invalid request body, using defaults');
    }

    const messages = data.messages || [];
    
    // If no messages, return a default response
    if (messages.length === 0) {
      console.log('No messages in request, returning greeting');
      return new Response(JSON.stringify({
        id: `chatcmpl-${crypto.randomUUID()}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        choices: [{
          index: 0,
          message: {
            role: "assistant",
            content: "Hello! I'm your AI concierge. How can I help you with your reservation today?"
          },
          finish_reason: "stop"
        }]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Extract the latest user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || "Hello";
    console.log(`Received message: ${lastUserMessage}`);

    // Get or create Salesforce session
    const userId = data.user_id || "video_demo_user";
    const sessionData = await getSfSession(userId, sfToken);

    if (!sessionData) {
      return new Response(JSON.stringify({
        id: "chatcmpl-error",
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        choices: [{
          index: 0,
          message: {
            role: "assistant",
            content: "I'm sorry, I couldn't connect to the reservation system. Please try again later."
          },
          finish_reason: "stop"
        }]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { sessionId: sfSessionId, sequenceId } = sessionData;

    // Send message to Salesforce
    console.log(`Sending to Salesforce session ${sfSessionId}: ${lastUserMessage}`);
    const sfUrl = `${BASE_URL}/sessions/${sfSessionId}/messages`;
    
    const sfResp = await fetch(sfUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sfToken}`,
        'Content-Type': 'application/json',
        'x-org-id': ORG_ID,
        'x-client-feature-id': FEATURE_ID,
      },
      body: JSON.stringify({
        message: {
          text: lastUserMessage,
          type: "Text",
          sequenceId: sequenceId
        }
      }),
    });

    // Increment sequenceId for next message
    sessionData.sequenceId++;

    console.log(`Salesforce message response status: ${sfResp.status}`);
    
    let botReply = "I'm processing your request.";
    
    if (sfResp.ok) {
      const sfData = await sfResp.json();
      console.log(`Salesforce response: ${JSON.stringify(sfData)}`);
      
      // Extract the text from Salesforce response
      if (sfData.messages && Array.isArray(sfData.messages)) {
        for (const msg of sfData.messages) {
          if (msg.type === 'Inform' || msg.message) {
            botReply = msg.message || msg.text || botReply;
            break;
          }
        }
      }
    } else {
      const errorText = await sfResp.text();
      console.error(`Salesforce error: ${errorText}`);
      
      // If session expired, clear it
      if (sfResp.status === 401 || sfResp.status === 404 || sfResp.status === 400) {
        sessions.delete(userId);
        botReply = "Let me reconnect. Please try again.";
      }
    }

    // Return in OpenAI-compatible format
    return new Response(JSON.stringify({
      id: `chatcmpl-${crypto.randomUUID()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: botReply
        },
        finish_reason: "stop"
      }]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in video-agent-proxy:', error);
    return new Response(JSON.stringify({
      id: "chatcmpl-error",
      object: "chat.completion", 
      created: Math.floor(Date.now() / 1000),
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: "I'm having a technical issue. Please try again."
        },
        finish_reason: "stop"
      }]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
