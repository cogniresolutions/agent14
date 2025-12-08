import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const siteKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SITE_KEY');

  if (!siteKey) {
    console.error('CLOUDFLARE_TURNSTILE_SITE_KEY not configured in Supabase secrets');
    return new Response(
      JSON.stringify({ error: 'Turnstile site key not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  console.log('Turnstile config requested, using site key from Supabase secrets');

  return new Response(
    JSON.stringify({ siteKey }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
