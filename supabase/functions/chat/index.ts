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

// Helper to create SSE streaming response - OpenAI compatible format for Tavus
function createStreamingResponse(content: string, model: string): ReadableStream {
  const encoder = new TextEncoder();
  const id = `chatcmpl-${crypto.randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  
  console.log(`Creating streaming response with content: ${content.substring(0, 100)}...`);
  
  return new ReadableStream({
    start(controller) {
      // First chunk with role (required by OpenAI spec)
      const roleChunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{
          index: 0,
          delta: {
            role: "assistant",
            content: ""
          },
          finish_reason: null
        }]
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(roleChunk)}\n\n`));
      
      // Send the full content in one chunk for reliable delivery to Tavus
      const contentChunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{
          index: 0,
          delta: {
            content: content
          },
          finish_reason: null
        }]
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(contentChunk)}\n\n`));
      console.log(`Sent content chunk to stream`);
      
      // Send final chunk with finish_reason
      const finalChunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{
          index: 0,
          delta: {},
          finish_reason: "stop"
        }]
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalChunk)}\n\n`));
      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      console.log(`Streaming response completed`);
      controller.close();
    }
  });
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
      console.log(`Raw request body: ${bodyText.substring(0, 500)}`);
      if (bodyText && bodyText.trim()) {
        data = JSON.parse(bodyText);
      }
    } catch (parseError) {
      console.log('Empty or invalid request body, using defaults');
    }

    const messages = data.messages || [];
    const isStreaming = data.stream === true;
    
    console.log(`Stream requested: ${isStreaming}`);
    
    // If no messages, return a default response
    if (messages.length === 0) {
      console.log('No messages in request, returning greeting');
      const greeting = "Hi! My name is Agent14. I am here to assist you with any reservation management, restaurant suggestions, or platform assistance. How can I help you?";
      
      if (isStreaming) {
        return new Response(createStreamingResponse(greeting, "salesforce-agentforce"), {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          },
        });
      }
      
      return new Response(JSON.stringify({
        id: `chatcmpl-${crypto.randomUUID()}`,
        object: "chat.completion",
        model: "salesforce-agentforce",
        created: Math.floor(Date.now() / 1000),
        choices: [{
          index: 0,
          message: {
            role: "assistant",
            content: greeting
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
      const errorMsg = "I'm sorry, I couldn't connect to the reservation system. Please try again later.";
      
      if (isStreaming) {
        return new Response(createStreamingResponse(errorMsg, "salesforce-agentforce"), {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          },
        });
      }
      
      return new Response(JSON.stringify({
        id: "chatcmpl-error",
        object: "chat.completion",
        model: "salesforce-agentforce",
        created: Math.floor(Date.now() / 1000),
        choices: [{
          index: 0,
          message: {
            role: "assistant",
            content: errorMsg
          },
          finish_reason: "stop"
        }]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { sessionId: sfSessionId, sequenceId } = sessionData;

    // Send message to Salesforce with timeout handling
    console.log(`Sending to Salesforce session ${sfSessionId}: ${lastUserMessage}`);
    const sfUrl = `${BASE_URL}/sessions/${sfSessionId}/messages`;
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    let botReply = "";
    let needsHumanEscalation = false;
    
    try {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      // Increment sequenceId for next message
      sessionData.sequenceId++;

      console.log(`Salesforce message response status: ${sfResp.status}`);
      
      if (sfResp.ok) {
        const sfData = await sfResp.json();
        console.log(`Salesforce response: ${JSON.stringify(sfData)}`);
        
        // Extract the text from Salesforce response
        let foundReply = false;
        if (sfData.messages && Array.isArray(sfData.messages)) {
          for (const msg of sfData.messages) {
            // Check for escalation request
            if (msg.type === 'Escalate') {
              needsHumanEscalation = true;
              botReply = msg.message || "I'll connect you with a human agent right away. One moment please while I transfer you to our support team.";
              foundReply = true;
              console.log(`Escalation requested`);
              break;
            }
            // Check for any message content
            if (msg.message && msg.message.trim()) {
              botReply = msg.message;
              foundReply = true;
              console.log(`Found Agentforce reply: ${botReply}`);
              break;
            } else if (msg.text && msg.text.trim()) {
              botReply = msg.text;
              foundReply = true;
              console.log(`Found Agentforce text: ${botReply}`);
              break;
            }
          }
        }
        
        // If no message found in response, provide helpful fallback
        if (!foundReply) {
          console.log(`No message found in Agentforce response, using fallback`);
          botReply = "Thank you for your patience! I'm searching for the best information to help you. Could you please provide a bit more detail about what you're looking for? I can help with restaurant reservations, modifications, cancellations, or recommendations.";
        }
      } else {
        const errorText = await sfResp.text();
        console.error(`Salesforce error: ${errorText}`);
        
        // If session expired, clear it
        if (sfResp.status === 401 || sfResp.status === 404 || sfResp.status === 400) {
          sessions.delete(userId);
          botReply = "I apologize for the brief interruption. Let me reconnect to our system. Could you please repeat your request? I'm here to help with your dining needs.";
        } else {
          needsHumanEscalation = true;
          botReply = "I'm experiencing some difficulty retrieving that information right now. I sincerely apologize for the inconvenience. Would you like me to connect you with one of our human support agents? They would be happy to assist you personally.";
        }
      }
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      
      const isAbortError = fetchError instanceof Error && fetchError.name === 'AbortError';
      
      if (isAbortError) {
        console.error('Salesforce request timed out');
        needsHumanEscalation = true;
        botReply = "I apologize, but it's taking longer than expected to find that information. I don't want to keep you waiting. Would you like me to connect you with a human agent who can assist you right away? They'll be able to help you with your reservation needs.";
      } else {
        console.error(`Fetch error: ${fetchError}`);
        needsHumanEscalation = true;
        botReply = "I'm having some technical difficulties at the moment. I sincerely apologize for any inconvenience. I'd be happy to connect you with one of our human support agents who can assist you immediately. Would you like me to do that?";
      }
    }

    // Log escalation status
    if (needsHumanEscalation) {
      console.log(`Human escalation offered to user`);
    }

    console.log(`Bot reply: ${botReply}`);
    console.log(`Returning ${isStreaming ? 'streaming' : 'non-streaming'} response`);

    // Return streaming or non-streaming based on request
    if (isStreaming) {
      return new Response(createStreamingResponse(botReply, "salesforce-agentforce"), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        },
      });
    }

    // Return in OpenAI-compatible format (non-streaming)
    const responsePayload = {
      id: `chatcmpl-${crypto.randomUUID()}`,
      object: "chat.completion",
      model: "salesforce-agentforce",
      created: Math.floor(Date.now() / 1000),
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: botReply
        },
        finish_reason: "stop"
      }],
      usage: {
        prompt_tokens: lastUserMessage.length,
        completion_tokens: botReply.length,
        total_tokens: lastUserMessage.length + botReply.length
      }
    };
    
    console.log(`Returning response to Tavus: ${JSON.stringify(responsePayload)}`);
    
    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in video-agent-proxy:', error);
    const errorMsg = "I'm having a technical issue. Please try again.";
    
    return new Response(JSON.stringify({
      id: "chatcmpl-error",
      object: "chat.completion",
      model: "salesforce-agentforce",
      created: Math.floor(Date.now() / 1000),
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: errorMsg
        },
        finish_reason: "stop"
      }]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
