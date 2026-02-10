import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LIPWA_API_KEY = Deno.env.get('LIPWA_API_KEY');
    if (!LIPWA_API_KEY) {
      throw new Error('LIPWA_API_KEY is not configured');
    }

    const LIPWA_CHANNEL_ID = Deno.env.get('LIPWA_CHANNEL_ID');
    if (!LIPWA_CHANNEL_ID) {
      throw new Error('LIPWA_CHANNEL_ID is not configured');
    }

    const { amount, phone_number, package_name } = await req.json();

    if (!amount || !phone_number || !package_name) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, phone_number, package_name' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone number format (Kenyan)
    const cleanPhone = phone_number.replace(/\s/g, '');
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format. Use format like 0712345678 or +254712345678' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format phone to +254
    let formattedPhone = cleanPhone;
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+254' + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith('254')) {
      formattedPhone = '+' + formattedPhone;
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const callbackUrl = `${SUPABASE_URL}/functions/v1/lipwa-callback`;

    const response = await fetch('https://pay.lipwa.app/api/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LIPWA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Number(amount),
        callback_url: callbackUrl,
        channel_id: LIPWA_CHANNEL_ID,
        phone_number: formattedPhone,
        api_ref: `UPGRADE-${package_name}-${Date.now()}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Lipwa API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Lipwa STK Push error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
