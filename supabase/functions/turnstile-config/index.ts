import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cloudflare provides test keys for development
// These always pass verification - replace with real keys in production
const DEVELOPMENT_SITE_KEY = '1x00000000000000000000AA'; // Always passes
const DEVELOPMENT_SECRET_KEY = '1x0000000000000000000000000000000AA'; // Always passes

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Use production key if configured, otherwise use development test key
  const siteKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SITE_KEY') || DEVELOPMENT_SITE_KEY;

  console.log('Turnstile config requested, using key:', siteKey.substring(0, 10) + '...');

  return new Response(
    JSON.stringify({ siteKey }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
