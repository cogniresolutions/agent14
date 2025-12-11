import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY');
    if (!TAVUS_API_KEY) {
      console.error('TAVUS_API_KEY not configured');
      return new Response(JSON.stringify({ 
        error: 'Video API key not configured' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { replica_id, persona_id, conversation_name } = body;

    if (!replica_id || !persona_id) {
      return new Response(JSON.stringify({ 
        error: 'replica_id and persona_id are required' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Creating conversation with replica: ${replica_id}, persona: ${persona_id}`);

    // Custom greeting message when user joins the conversation
    const customGreeting = "Hi! My name is Agent14. I am here to assist you with any reservation management, restaurant suggestions, or platform assistance. How can I help you today?";
    
    // Conversational context to restrict persona to diner booking only
    const conversationalContext = `You are Agent14, the official AI Video Concierge for Agent14.online - a premium restaurant reservation platform.

CRITICAL RULE - YOU MUST ALWAYS RESPOND VERBALLY:
- NEVER stay silent. You MUST always speak a response to every user message.
- Even if the user asks something you cannot help with, you MUST respond with a polite redirect.

YOUR CAPABILITIES (What you CAN help with):
1. NEW RESERVATIONS - Help users book tables at restaurants
2. MODIFY RESERVATIONS - Change date, time, party size, or special requests
3. CANCEL RESERVATIONS - Process cancellation requests
4. RESTAURANT SUGGESTIONS - Recommend restaurants based on preferences

WHEN USER ASKS ABOUT ANYTHING ELSE (weather, news, sports, math, recipes, coding, general knowledge, etc.):
You MUST respond with something like: "I appreciate your question! However, I'm specifically here to help with restaurant reservations - booking new tables, modifying existing reservations, cancellations, or suggesting great restaurants. For other topics, our human support team at Agent14 would be happy to help. Now, is there anything I can assist you with for your dining plans today?"

IMPORTANT BEHAVIOR RULES:
- ALWAYS speak - never go silent or ignore any message
- Be warm, friendly, and conversational
- When redirecting off-topic questions, always end by offering to help with reservations
- Keep responses concise and natural for voice conversation
- If unsure, politely explain your role and offer reservation help`;

    // Create conversation - Custom LLM must be configured on the Persona in the platform
    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify({
        replica_id,
        persona_id,
        conversation_name: conversation_name || 'Agent14 Video Concierge',
        custom_greeting: customGreeting,
        conversational_context: conversationalContext,
      }),
    });

    const data = await response.json();
    console.log('Conversation API response:', JSON.stringify(data));

    if (!response.ok) {
      console.error('Error creating conversation:', data);
      return new Response(JSON.stringify({ 
        error: data.message || data.error || 'Failed to create conversation',
        details: data
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-video-conversation:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
