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

// Interface for pending confirmation details
interface PendingDetails {
  email?: string;
  reservationId?: string;
  awaitingConfirmation: boolean;
  originalMessage: string;
}

// Get session from database including pending details
async function getStoredSession(userId: string): Promise<{ sessionId: string; sequenceId: number; pendingDetails?: PendingDetails } | null> {
  const { data, error } = await supabase
    .from('sf_agent_sessions')
    .select('session_id, sequence_id, pending_details')
    .eq('user_id', userId)
    .single();
  
  if (error || !data) {
    console.log(`No stored session found for ${userId}`);
    return null;
  }
  
  console.log(`Found stored session for ${userId}: ${data.session_id}`);
  return { 
    sessionId: data.session_id, 
    sequenceId: data.sequence_id,
    pendingDetails: data.pending_details as PendingDetails | undefined
  };
}

// Store session in database
async function storeSession(userId: string, sessionId: string, sequenceId: number): Promise<void> {
  const { error } = await supabase
    .from('sf_agent_sessions')
    .upsert({
      user_id: userId,
      session_id: sessionId,
      sequence_id: sequenceId,
      pending_details: null,
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

// Store pending details for confirmation
async function storePendingDetails(userId: string, details: PendingDetails): Promise<void> {
  const { error } = await supabase
    .from('sf_agent_sessions')
    .update({ 
      pending_details: details,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);
  
  if (error) {
    console.error(`Error storing pending details: ${error.message}`);
  } else {
    console.log(`Pending details stored for ${userId}: ${JSON.stringify(details)}`);
  }
}

// Clear pending details after confirmation or rejection
async function clearPendingDetails(userId: string): Promise<void> {
  const { error } = await supabase
    .from('sf_agent_sessions')
    .update({ 
      pending_details: null,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);
  
  if (error) {
    console.error(`Error clearing pending details: ${error.message}`);
  } else {
    console.log(`Pending details cleared for ${userId}`);
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

// Extract reservation details from message
function extractReservationDetails(message: string): { email?: string; reservationId?: string } {
  const details: { email?: string; reservationId?: string } = {};
  
  // Extract email - look for email patterns
  const emailMatch = message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  if (emailMatch) {
    details.email = emailMatch[1].toLowerCase();
    console.log(`Extracted email: ${details.email}`);
  }
  
  // Extract reservation ID - look for patterns like OP-12345, RES-12345, or standalone IDs
  const reservationPatterns = [
    /(?:reservation\s*(?:id|number)?[:\s]*)?([A-Z]{2,3}-\d{4,6})/i,
    /(?:booking\s*(?:id|number)?[:\s]*)?([A-Z]{2,3}-\d{4,6})/i,
    /\b([A-Z]{2,3}-\d{4,6})\b/i
  ];
  
  for (const pattern of reservationPatterns) {
    const match = message.match(pattern);
    if (match) {
      details.reservationId = match[1].toUpperCase();
      console.log(`Extracted reservation ID: ${details.reservationId}`);
      break;
    }
  }
  
  return details;
}

// Spell out text letter by letter for clear pronunciation
function spellOutText(text: string): string {
  const spelled: string[] = [];
  
  for (const char of text) {
    if (char === '@') {
      spelled.push('at sign');
    } else if (char === '.') {
      spelled.push('dot');
    } else if (char === '-') {
      spelled.push('dash');
    } else if (char === '_') {
      spelled.push('underscore');
    } else if (/[a-zA-Z]/.test(char)) {
      // Use phonetic alphabet for clarity
      spelled.push(char.toUpperCase());
    } else if (/[0-9]/.test(char)) {
      spelled.push(char);
    }
  }
  
  return spelled.join(', ');
}

// Check if user message is a confirmation
function isConfirmation(message: string): boolean {
  const confirmPatterns = [
    /\b(yes|yeah|yep|yup|correct|right|confirm|confirmed|that's right|that is right|that's correct|that is correct|affirmative|exactly|perfect|looks good|sounds good)\b/i
  ];
  return confirmPatterns.some(pattern => pattern.test(message));
}

// Check if user message is a rejection/correction request
function isRejection(message: string): boolean {
  const rejectPatterns = [
    /\b(no|nope|wrong|incorrect|not right|not correct|change|fix|update|different|again|retry|re-enter|reenter)\b/i
  ];
  return rejectPatterns.some(pattern => pattern.test(message));
}

// Check if message contains reservation details that need confirmation
function needsConfirmation(message: string): boolean {
  const details = extractReservationDetails(message);
  // Need confirmation if we have both email and reservation ID
  return !!(details.email && details.reservationId);
}

async function getSfSession(userId: string, sfToken: string): Promise<{ sessionId: string; sequenceId: number; pendingDetails?: PendingDetails } | null> {
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
      const sessionData = { sessionId, sequenceId: 1, pendingDetails: undefined };
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

// Helper function to send message to Agentforce and return response
async function sendToAgentforce(
  sfSessionId: string, 
  sequenceId: number, 
  message: string, 
  userId: string, 
  sfToken: string, 
  isStreaming: boolean
): Promise<Response> {
  console.log(`sendToAgentforce: Sending to session ${sfSessionId}: ${message}`);
  const sfUrl = `${BASE_URL}/sessions/${sfSessionId}/messages`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  
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
        message: { text: message, type: "Text", sequenceId }
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    await updateSequenceId(userId, sequenceId + 1);

    if (sfResp.ok) {
      const sfData = await sfResp.json();
      console.log(`Agentforce response: ${JSON.stringify(sfData)}`);
      
      if (sfData.messages && Array.isArray(sfData.messages)) {
        for (const msg of sfData.messages) {
          if (msg.type === 'Inform' && msg.message?.trim()) {
            botReply = msg.message;
            break;
          } else if (msg.message?.trim() && msg.type !== 'Failure') {
            botReply = msg.message;
            break;
          }
          if (msg.type === 'Escalate') {
            needsHumanEscalation = true;
            await clearStoredSession(userId);
          }
        }
      }
      
      if (!botReply) {
        botReply = "Could you please provide more details?";
      }
    } else {
      await clearStoredSession(userId);
      botReply = "I encountered an issue. Please try again.";
    }
  } catch (err) {
    clearTimeout(timeoutId);
    botReply = "I'm having technical difficulties. Please try again.";
  }

  console.log(`sendToAgentforce reply: ${botReply}`);
  
  if (isStreaming) {
    return new Response(createStreamingResponse(botReply, "salesforce-agentforce"), {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
    });
  }
  
  return new Response(JSON.stringify({
    id: `chatcmpl-${crypto.randomUUID()}`,
    object: "chat.completion",
    model: "salesforce-agentforce",
    created: Math.floor(Date.now() / 1000),
    choices: [{ index: 0, message: { role: "assistant", content: botReply }, finish_reason: "stop" }]
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
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

// Helper to clean user message from Tavus - convert spoken email formats and clean XML tags
function cleanUserMessage(message: string): string {
  let cleaned = message;
  
  // Remove Tavus-specific XML tags that may be in the message
  cleaned = cleaned.replace(/<user_appearance>[\s\S]*?<\/user_appearance>/gi, '');
  cleaned = cleaned.replace(/<user_emotions>[\s\S]*?<\/user_emotions>/gi, '');
  cleaned = cleaned.replace(/<user_screen>[\s\S]*?<\/user_screen>/gi, '');
  cleaned = cleaned.replace(/<[^>]*>/g, ''); // Remove any other XML/HTML tags
  
  // Convert spoken email formats to proper email format
  // "john dot smith at gmail dot com" -> "john.smith@gmail.com"
  // "john at gmail dot com" -> "john@gmail.com"  
  // Handle various spoken patterns for email
  cleaned = cleaned.replace(/\s+dot\s+/gi, '.');
  cleaned = cleaned.replace(/\s+at\s+/gi, '@');
  
  // Clean up multiple spaces and trim
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  console.log(`Cleaned user message: ${cleaned}`);
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

  // Handle DELETE requests (clear session)
  if (req.method === 'DELETE') {
    console.log(`[${requestId}] Clear session request`);
    const userId = new URL(req.url).searchParams.get('user_id') || 'video_demo_user';
    await clearStoredSession(userId);
    return new Response(JSON.stringify({ 
      status: 'ok', 
      message: `Session cleared for ${userId}`,
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
    
    // Extract the latest user message and clean it for Salesforce
    const rawUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || "Hello";
    console.log(`Raw user message: ${rawUserMessage}`);
    const lastUserMessage = cleanUserMessage(rawUserMessage);
    console.log(`Cleaned message for Salesforce: ${lastUserMessage}`);

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

    // Check for pending confirmation flow
    const pendingDetails = sessionData.pendingDetails;
    
    if (pendingDetails?.awaitingConfirmation) {
      console.log(`Pending confirmation found: ${JSON.stringify(pendingDetails)}`);
      
      // Check if user is confirming the details
      if (isConfirmation(lastUserMessage)) {
        console.log('User confirmed the details, proceeding to Agentforce');
        // Clear pending details and proceed with the original message
        await clearPendingDetails(userId);
        // The original message with details will be sent to Agentforce below
        // We'll use the stored original message
        const confirmedMessage = pendingDetails.originalMessage;
        console.log(`Sending confirmed message to Agentforce: ${confirmedMessage}`);
        
        // Continue with normal Agentforce flow using the confirmed message
        // Update lastUserMessage to use the original stored message
        // We need to send this to Agentforce
        const { sessionId: sfSessionId, sequenceId } = sessionData;
        return await sendToAgentforce(sfSessionId, sequenceId, confirmedMessage, userId, sfToken, isStreaming);
      }
      
      // Check if user is rejecting/correcting
      if (isRejection(lastUserMessage)) {
        console.log('User rejected the details, asking for new information');
        await clearPendingDetails(userId);
        
        const retryMsg = "No problem! Please provide your reservation ID and email address again, and I will spell them back for you to confirm.";
        
        if (isStreaming) {
          return new Response(createStreamingResponse(retryMsg, "salesforce-agentforce"), {
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
            message: { role: "assistant", content: retryMsg },
            finish_reason: "stop"
          }]
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // User gave an unclear response, ask again
      console.log('Unclear confirmation response, asking again');
      const spelledEmail = pendingDetails.email ? spellOutText(pendingDetails.email) : 'not provided';
      const spelledId = pendingDetails.reservationId ? spellOutText(pendingDetails.reservationId) : 'not provided';
      
      const clarifyMsg = `I need you to confirm. Your email is: ${spelledEmail}. Your reservation ID is: ${spelledId}. Please say yes to confirm, or no to provide new details.`;
      
      if (isStreaming) {
        return new Response(createStreamingResponse(clarifyMsg, "salesforce-agentforce"), {
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
          message: { role: "assistant", content: clarifyMsg },
          finish_reason: "stop"
        }]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if message contains reservation details that need confirmation
    const extractedDetails = extractReservationDetails(lastUserMessage);
    if (extractedDetails.email && extractedDetails.reservationId) {
      console.log(`Found reservation details requiring confirmation: ${JSON.stringify(extractedDetails)}`);
      
      // Store pending details
      const pendingToStore: PendingDetails = {
        email: extractedDetails.email,
        reservationId: extractedDetails.reservationId,
        awaitingConfirmation: true,
        originalMessage: lastUserMessage
      };
      await storePendingDetails(userId, pendingToStore);
      
      // Spell out the details for user confirmation
      const spelledEmail = spellOutText(extractedDetails.email);
      const spelledId = spellOutText(extractedDetails.reservationId);
      
      const confirmationRequest = `Let me confirm your details. Your email is: ${spelledEmail}. Your reservation ID is: ${spelledId}. Is this correct? Please say yes to confirm, or no if you need to correct anything.`;
      
      console.log(`Asking for confirmation: ${confirmationRequest}`);
      
      if (isStreaming) {
        return new Response(createStreamingResponse(confirmationRequest, "salesforce-agentforce"), {
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
          message: { role: "assistant", content: confirmationRequest },
          finish_reason: "stop"
        }]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // No pending confirmation and no new details to confirm - proceed normally to Agentforce

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
          
          // Second pass: get response messages - pass through Agentforce's exact response
          for (const msg of sfData.messages) {
            // Check for Inform type messages first (these contain the actual response from Agentforce)
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
            
            // Check for escalation - just log it, don't override Agentforce's response
            if (msg.type === 'Escalate') {
              needsHumanEscalation = true;
              // Clear the session so next message starts fresh - session is now in escalated state
              console.log(`Escalation detected - clearing session to start fresh next time`);
              await clearStoredSession(userId);
              console.log(`Escalation requested by Agentforce`);
            }
          }
        }
        
        // Handle failure case - clear session but use Agentforce's error message if available
        if (hasFailure && !foundReply) {
          console.log(`Salesforce action failed, clearing session`);
          await clearStoredSession(userId);
          // Check if there's an error message from Agentforce to pass through
          for (const msg of sfData.messages) {
            if (msg.type === 'Failure' && msg.errors?.[0]) {
              botReply = msg.errors[0];
              foundReply = true;
              console.log(`Using Agentforce error message: ${botReply}`);
              break;
            }
          }
          // Only use fallback if Agentforce provided no message at all
          if (!foundReply) {
            botReply = "I encountered an issue. Could you please try again?";
          }
        }
        // If no message found in response, ask for clarification
        else if (!foundReply) {
          console.log(`No message found in Agentforce response, asking for clarification`);
          botReply = "Could you please provide more details about what you need help with?";
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
