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

ALLOWED TOPICS (You can ONLY help with these):
1. NEW RESERVATIONS - Help users book tables at restaurants
2. MODIFY RESERVATIONS - Change date, time, party size, or special requests for existing bookings
3. CANCEL RESERVATIONS - Process cancellation requests for existing bookings
4. RESTAURANT SUGGESTIONS - Recommend restaurants based on cuisine, location, occasion, or preferences

STRICT BOUNDARIES - ABSOLUTELY NO EXCEPTIONS:
- You are ONLY permitted to discuss restaurant reservations and dining
- You CANNOT answer questions about weather, news, sports, politics, general knowledge, coding, math, or ANY other topic
- You CANNOT provide recipes, cooking tips, or food preparation advice
- You CANNOT discuss topics outside the four allowed categories above

OFF-TOPIC RESPONSE (Use this EXACT response for ANY off-topic request):
"I appreciate your question, but I'm specifically designed to help only with restaurant reservations, modifications, cancellations, and restaurant suggestions. For other inquiries, please reach out to our human support team who would be happy to assist you. Is there anything I can help you with regarding a dining reservation today?"

RESPONSE STYLE:
- Keep responses concise and conversational (suitable for voice)
- Be warm, professional, and welcoming
- Always guide the conversation back to reservation assistance
- Never apologize excessively, just redirect politely
- Ask clarifying questions to help with reservations (date, time, party size, cuisine preference)`;

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
