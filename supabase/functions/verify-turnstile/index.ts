import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cloudflare provides test keys for development
// These always pass verification - replace with real keys in production
const DEVELOPMENT_SECRET_KEY = '1x0000000000000000000000000000000AA'; // Always passes

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      console.error('No token provided');
      return new Response(
        JSON.stringify({ success: false, error: 'No token provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use production key if configured, otherwise use development test key
    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY') || DEVELOPMENT_SECRET_KEY;

    console.log('Verifying Turnstile token with key:', secretKey.substring(0, 10) + '...');

    // Verify with Cloudflare
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const verifyResult = await verifyResponse.json();
    console.log('Turnstile verification result:', JSON.stringify(verifyResult));

    if (verifyResult.success) {
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.error('Turnstile verification failed:', verifyResult['error-codes']);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Verification failed',
          codes: verifyResult['error-codes'] 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in verify-turnstile function:', errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
