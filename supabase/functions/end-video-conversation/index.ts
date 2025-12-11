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

    // Handle both JSON and sendBeacon (text/plain) requests
    let conversation_id: string | undefined;
    
    const contentType = req.headers.get('content-type') || '';
    const bodyText = await req.text();
    
    console.log('Received request, content-type:', contentType, 'body:', bodyText);
    
    if (bodyText) {
      try {
        const parsed = JSON.parse(bodyText);
        conversation_id = parsed.conversation_id;
      } catch (e) {
        console.error('Failed to parse body:', e);
      }
    }

    if (!conversation_id) {
      console.error('No conversation_id provided');
      return new Response(JSON.stringify({ 
        error: 'conversation_id is required' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Ending conversation: ${conversation_id}`);

    // End the conversation on Tavus
    const response = await fetch(`https://tavusapi.com/v2/conversations/${conversation_id}/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      console.log('No JSON response from Tavus');
    }
    
    console.log('End conversation response status:', response.status, 'data:', JSON.stringify(data));

    if (!response.ok) {
      // Still return success if conversation already ended or not found
      if (response.status === 404 || response.status === 400 || response.status === 409) {
        console.log('Conversation already ended or not found');
        return new Response(JSON.stringify({ 
          status: 'ended',
          message: 'Conversation already ended or not found'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      console.error('Error ending conversation:', data);
      return new Response(JSON.stringify({ 
        error: data.message || data.error || 'Failed to end conversation',
        details: data
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Successfully ended conversation:', conversation_id);
    return new Response(JSON.stringify({ 
      status: 'ended',
      conversation_id,
      ...data 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in end-video-conversation:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
