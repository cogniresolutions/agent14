import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Agentforce proxy endpoint for Custom LLM
const AGENTFORCE_LLM_BASE_URL = "https://dfvrviuppfkqjpdyevfv.supabase.co/functions/v1";
const AGENTFORCE_LLM_MODEL = "video-agent-proxy";

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
    console.log(`Using Agentforce LLM: ${AGENTFORCE_LLM_BASE_URL}/${AGENTFORCE_LLM_MODEL}`);

    // Create conversation with custom LLM pointing to Agentforce
    const conversationPayload = {
      replica_id,
      persona_id,
      conversation_name: conversation_name || 'Agent14 Video Session',
      // Override LLM to use our Agentforce proxy
      custom_llm: {
        model: AGENTFORCE_LLM_MODEL,
        base_url: AGENTFORCE_LLM_BASE_URL,
      },
      // Conversation-level overrides for the persona
      properties: {
        max_call_duration: 1800, // 30 minutes
        participant_left_timeout: 60,
        enable_recording: false,
        apply_greenscreen: false,
      }
    };

    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify(conversationPayload),
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

    return new Response(JSON.stringify({
      ...data,
      agentforce_connected: true,
      llm_endpoint: `${AGENTFORCE_LLM_BASE_URL}/${AGENTFORCE_LLM_MODEL}`
    }), {
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
