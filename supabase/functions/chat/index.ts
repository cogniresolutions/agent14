import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ORG_ID = "00Daj00000fuXdhEAE";
const FEATURE_ID = "ai-platform-agents-scrt";
const AGENT_ID = "0Xxaj000001Q1G1CAK";
const BASE_URL = "https://api.salesforce.com/einstein/ai-agent/v1";
const INSTANCE_URL = "https://orgfarm-7eec8186c7.my.salesforce.com";
const OAUTH_URL = "https://orgfarm-7eec8186c7.my.salesforce.com/services/oauth2/token";

// Create Supabase client for session persistence
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate fresh OAuth token using client credentials
async function getOAuthToken(): Promise<string | null> {
  const clientId = Deno.env.get('SF_CLIENT_ID');
  const clientSecret = Deno.env.get('SF_CLIENT_SECRET');
  
  if (!clientId || !clientSecret) {
    console.error('SF_CLIENT_ID or SF_CLIENT_SECRET not configured');
    return null;
  }
  
  console.log('Generating fresh OAuth token...');
  
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    
    const resp = await fetch(OAUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    
    console.log(`OAuth response status: ${resp.status}`);
    
    if (resp.ok) {
      const data = await resp.json();
      console.log('OAuth token generated successfully');
      return data.access_token;
    } else {
      const errorText = await resp.text();
      console.error(`OAuth error: ${errorText}`);
      return null;
    }
  } catch (e) {
    console.error(`OAuth connection error: ${e}`);
    return null;
  }
}

// Get session from database
async function getStoredSession(userId: string): Promise<{ sessionId: string; sequenceId: number } | null> {
  const { data, error } = await supabase
    .from('sf_agent_sessions')
    .select('session_id, sequence_id')
    .eq('user_id', userId)
    .single();
  
  if (error || !data) {
    console.log(`No stored session found for ${userId}`);
    return null;
  }
  
  console.log(`Found stored session for ${userId}: ${data.session_id}`);
  return { sessionId: data.session_id, sequenceId: data.sequence_id };
}

// Store session in database
async function storeSession(userId: string, sessionId: string, sequenceId: number): Promise<void> {
  const { error } = await supabase
    .from('sf_agent_sessions')
    .upsert({
      user_id: userId,
      session_id: sessionId,
      sequence_id: sequenceId,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  
  if (error) {
    console.error(`Error storing session: ${error.message}`);
  } else {
    console.log(`Session stored for ${userId}`);
  }
}

// Update sequence ID in database
async function updateSequenceId(userId: string, sequenceId: number): Promise<void> {
  const { error } = await supabase
    .from('sf_agent_sessions')
    .update({ sequence_id: sequenceId, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
  
  if (error) {
    console.error(`Error updating sequence ID: ${error.message}`);
  }
}

// Clear stored session
async function clearStoredSession(userId: string): Promise<void> {
  const { error } = await supabase
    .from('sf_agent_sessions')
    .delete()
    .eq('user_id', userId);
  
  if (error) {
    console.error(`Error clearing session: ${error.message}`);
  } else {
    console.log(`Session cleared for ${userId}`);
  }
}

async function getSfSession(userId: string, sfToken: string): Promise<{ sessionId: string; sequenceId: number } | null> {
  // First check for existing session in database
  const storedSession = await getStoredSession(userId);
  if (storedSession) {
    console.log(`Using existing session for ${userId}: ${storedSession.sessionId}`);
    return storedSession;
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
      // Store session in database for persistence
      await storeSession(userId, sessionId, 1);
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

// Helper to sanitize content for speech - remove problematic characters
function sanitizeForSpeech(content: string): string {
  return content
    .replace(/\n+/g, ' ')  // Replace newlines with spaces
    .replace(/\r/g, '')     // Remove carriage returns
    .replace(/\t/g, ' ')    // Replace tabs with spaces
    .replace(/\s+/g, ' ')   // Collapse multiple spaces
    .replace(/[""]|['']/g, '"')  // Normalize quotes
    .replace(/URL_Redacted/gi, 'their website')  // Replace redacted URLs
    .trim();
}

// Helper to clean user message - extract the relevant query for Agentforce
function cleanUserMessage(rawMessage: string): string {
  // Remove Tavus video conference context tags
  let cleaned = rawMessage
    .replace(/<user_appearance>[\s\S]*?<\/user_appearance>/gi, '')
    .replace(/<user_emotions>[\s\S]*?<\/user_emotions>/gi, '')
    .replace(/<user_screen>[\s\S]*?<\/user_screen>/gi, '')
    .replace(/<[^>]+>/g, '') // Remove any other XML-like tags
    .trim();
  
  // Look for restaurant-related keywords and extract that sentence
  const restaurantKeywords = [
    'restaurant', 'reservation', 'book', 'booking', 'table', 'dinner', 'lunch', 
    'breakfast', 'dining', 'eat', 'food', 'cuisine', 'steakhouse', 'japanese',
    'italian', 'chinese', 'mexican', 'indian', 'thai', 'french', 'seafood',
    'cancel', 'modify', 'change', 'reschedule', 'party size', 'guests', 'people',
    'yes', 'no', 'please', 'thank', 'help', 'agent', 'human', 'person'
  ];
  
  // Split into sentences and find relevant ones
  const sentences = cleaned.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  const relevantSentences: string[] = [];
  
  for (const sentence of sentences) {
    const lowerSentence = sentence.toLowerCase();
    if (restaurantKeywords.some(keyword => lowerSentence.includes(keyword))) {
      relevantSentences.push(sentence);
    }
  }
  
  // If we found relevant sentences, use those; otherwise use the last meaningful sentence
  if (relevantSentences.length > 0) {
    cleaned = relevantSentences.join('. ') + '.';
    console.log(`Extracted relevant query: ${cleaned}`);
  } else if (sentences.length > 0) {
    // Use the last sentence as it's likely the actual query
    cleaned = sentences[sentences.length - 1];
    console.log(`Using last sentence as query: ${cleaned}`);
  }
  
  // Final cleanup
  cleaned = cleaned
    .replace(/\s+/g, ' ')
    .trim();
  
  // Keep short valid responses (yes, no, ok, etc.) - don't replace them!
  // Only replace if truly empty
  if (cleaned.length === 0) {
    return "Hello, how can I help you with restaurant reservations?";
  }
  
  return cleaned;
}

// Helper to create SSE streaming response - OpenAI compatible format for Tavus
function createStreamingResponse(content: string, model: string): ReadableStream {
  const encoder = new TextEncoder();
  const id = `chatcmpl-${crypto.randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  
  // Sanitize content for speech
  const sanitizedContent = sanitizeForSpeech(content);
  console.log(`Creating streaming response with sanitized content: ${sanitizedContent.substring(0, 150)}...`);
  
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
      const roleData = `data: ${JSON.stringify(roleChunk)}\n\n`;
      controller.enqueue(encoder.encode(roleData));
      console.log(`Sent role chunk`);
      
      // Send the full content in one chunk for reliable delivery to Tavus
      const contentChunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{
          index: 0,
          delta: {
            content: sanitizedContent
          },
          finish_reason: null
        }]
      };
      const contentData = `data: ${JSON.stringify(contentChunk)}\n\n`;
      controller.enqueue(encoder.encode(contentData));
      console.log(`Sent content chunk: ${contentData.substring(0, 200)}...`);
      
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
      console.log(`Streaming response completed for Tavus`);
      controller.close();
    }
  });
}

serve(async (req) => {
  const requestId = crypto.randomUUID().substring(0, 8);
  console.log(`[${requestId}] Incoming request: ${req.method} from ${req.headers.get('origin') || 'unknown'}`);
  console.log(`[${requestId}] User-Agent: ${req.headers.get('user-agent')?.substring(0, 100) || 'unknown'}`);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log(`[${requestId}] CORS preflight request`);
    return new Response(null, { headers: corsHeaders });
  }

  // Handle GET requests (health checks)
  if (req.method === 'GET') {
    console.log(`[${requestId}] Health check request`);
    return new Response(JSON.stringify({ 
      status: 'ok', 
      service: 'video-agent-proxy',
      model: 'salesforce-agentforce',
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  console.log(`[${requestId}] Processing POST request`);

  try {
    // Generate fresh OAuth token for each request to avoid expiry issues
    const sfToken = await getOAuthToken();
    if (!sfToken) {
      console.error('Failed to generate OAuth token');
      return new Response(JSON.stringify({ 
        error: 'Failed to authenticate with Salesforce' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('Using fresh OAuth token for this request');

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
    
    // Extract the latest user message and clean it for Agentforce
    const rawUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || "Hello";
    const lastUserMessage = cleanUserMessage(rawUserMessage);
    console.log(`Raw message: ${rawUserMessage.substring(0, 100)}...`);
    console.log(`Cleaned message: ${lastUserMessage}`);

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
      
      // Increment sequenceId for next message and persist to database
      sessionData.sequenceId++;
      await updateSequenceId(userId, sessionData.sequenceId);

      console.log(`Salesforce message response status: ${sfResp.status}`);
      
      if (sfResp.ok) {
        const sfData = await sfResp.json();
        console.log(`Salesforce response: ${JSON.stringify(sfData)}`);
        
        // Extract the text from Salesforce response
        let foundReply = false;
        let hasFailure = false;
        
        if (sfData.messages && Array.isArray(sfData.messages)) {
          // First pass: check for failures
          for (const msg of sfData.messages) {
            if (msg.type === 'Failure') {
              hasFailure = true;
              const errorMsg = msg.errors?.[0] || msg.message || 'System error';
              console.log(`Agentforce action failed: ${errorMsg}, code: ${msg.code}`);
            }
          }
          
          // Second pass: get response messages
          for (const msg of sfData.messages) {
            // Check for escalation request
            if (msg.type === 'Escalate') {
              needsHumanEscalation = true;
              // Don't override existing message if we have an Inform
              if (!foundReply) {
                botReply = "I'll connect you with a human agent right away. One moment please while I transfer you to our support team.";
              }
              console.log(`Escalation requested`);
              // Don't break - we want to capture Inform messages first
            }
            // Check for Inform type messages (these contain the actual response)
            if (msg.type === 'Inform' && msg.message && msg.message.trim()) {
              botReply = msg.message;
              foundReply = true;
              console.log(`Found Agentforce Inform reply: ${botReply}`);
            }
            // Also check for any message content in other types
            else if (!foundReply && msg.message && msg.message.trim() && msg.type !== 'Failure') {
              botReply = msg.message;
              foundReply = true;
              console.log(`Found Agentforce reply: ${botReply}`);
            } else if (!foundReply && msg.text && msg.text.trim()) {
              botReply = msg.text;
              foundReply = true;
              console.log(`Found Agentforce text: ${botReply}`);
            }
          }
        }
        
        // Handle failure case - clear the corrupted session and create a new one
        if (hasFailure && !foundReply) {
          console.log(`Salesforce action failed, clearing session and retrying`);
          
          // Clear the corrupted session
          await clearStoredSession(userId);
          
          // Create a new session and retry
          const newSessionData = await getSfSession(userId, sfToken);
          if (newSessionData) {
            console.log(`Retrying with fresh session: ${newSessionData.sessionId}`);
            const retryResp = await fetch(`${BASE_URL}/sessions/${newSessionData.sessionId}/messages`, {
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
                  sequenceId: newSessionData.sequenceId
                }
              }),
            });
            
            if (retryResp.ok) {
              const retryData = await retryResp.json();
              console.log(`Retry with fresh session successful: ${JSON.stringify(retryData)}`);
              await updateSequenceId(userId, newSessionData.sequenceId + 1);
              
              // Extract reply from retry response
              if (retryData.messages && Array.isArray(retryData.messages)) {
                for (const msg of retryData.messages) {
                  if (msg.type === 'Escalate') {
                    needsHumanEscalation = true;
                  }
                  if (msg.type === 'Inform' && msg.message && msg.message.trim()) {
                    botReply = msg.message;
                    foundReply = true;
                    console.log(`Found retry reply: ${botReply}`);
                    break;
                  } else if (msg.message && msg.message.trim() && msg.type !== 'Failure') {
                    botReply = msg.message;
                    foundReply = true;
                    break;
                  }
                }
              }
            }
          }
          
          // If still no reply after retry, offer escalation
          if (!foundReply) {
            needsHumanEscalation = true;
            botReply = "I apologize, but I encountered an issue retrieving that information. Would you like to try your request again, or shall I connect you with a human agent who can assist you directly?";
          }
        }
        // If no message found in response, provide helpful fallback
        else if (!foundReply) {
          console.log(`No message found in Agentforce response, using fallback`);
          botReply = "Thank you for your patience! Could you please provide a bit more detail about what you're looking for? I can help with restaurant reservations, modifications, cancellations, or recommendations.";
        }
      } else {
        const errorText = await sfResp.text();
        console.error(`Salesforce error: ${errorText}`);
        
        // If session expired, clear it from database and retry with new session
        if (sfResp.status === 401 || sfResp.status === 404 || sfResp.status === 400 || sfResp.status === 410) {
          console.log(`Session expired (status ${sfResp.status}), clearing and creating new session`);
          await clearStoredSession(userId);
          
          // Try to create a new session and retry the message
          const newSessionData = await getSfSession(userId, sfToken);
          if (newSessionData) {
            console.log(`Retrying with new session: ${newSessionData.sessionId}`);
            const retryResp = await fetch(`${BASE_URL}/sessions/${newSessionData.sessionId}/messages`, {
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
                  sequenceId: newSessionData.sequenceId
                }
              }),
            });
            
            if (retryResp.ok) {
              const retryData = await retryResp.json();
              console.log(`Retry successful: ${JSON.stringify(retryData)}`);
              await updateSequenceId(userId, newSessionData.sequenceId + 1);
              
              // Extract reply from retry response
              if (retryData.messages && Array.isArray(retryData.messages)) {
                for (const msg of retryData.messages) {
                  if (msg.type === 'Inform' && msg.message && msg.message.trim()) {
                    botReply = msg.message;
                    console.log(`Found retry reply: ${botReply}`);
                    break;
                  } else if (msg.message && msg.message.trim() && msg.type !== 'Failure') {
                    botReply = msg.message;
                    break;
                  }
                }
              }
              
              if (!botReply) {
                botReply = "I've reconnected to the system. How can I assist you with your dining needs today?";
              }
            } else {
              console.error(`Retry also failed: ${await retryResp.text()}`);
              botReply = "I apologize for the brief interruption. Let me reconnect to our system. Could you please repeat your request? I'm here to help with your dining needs.";
            }
          } else {
            botReply = "I apologize for the brief interruption. Let me reconnect to our system. Could you please repeat your request? I'm here to help with your dining needs.";
          }
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
