import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    if (!LIPWA_API_KEY) throw new Error('LIPWA_API_KEY is not configured');

    const LIPWA_CHANNEL_ID = Deno.env.get('LIPWA_CHANNEL_ID');
    if (!LIPWA_CHANNEL_ID) throw new Error('LIPWA_CHANNEL_ID is not configured');

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { amount, phone_number, package_name, user_id } = await req.json();

    if (!amount || !phone_number || !package_name) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, phone_number, package_name' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanPhone = phone_number.replace(/\s/g, '');
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let formattedPhone = cleanPhone;
    if (formattedPhone.startsWith('0')) formattedPhone = '+254' + formattedPhone.slice(1);
    else if (formattedPhone.startsWith('254')) formattedPhone = '+' + formattedPhone;

    const apiRef = `UPGRADE-${package_name}-${Date.now()}`;
    const callbackUrl = `${SUPABASE_URL}/functions/v1/lipwa-callback`;

    // Store user_id in api_ref metadata for callback to use
    const metaRef = user_id ? `${apiRef}|uid:${user_id}` : apiRef;

    const { data: paymentRecord, error: dbError } = await supabase
      .from('payments')
      .insert({
        phone_number: formattedPhone,
        amount: Number(amount),
        package_name,
        status: 'pending',
        api_ref: metaRef,
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB insert error:', dbError);
      throw new Error('Failed to create payment record');
    }

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
        api_ref: metaRef,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      await supabase.from('payments').update({ status: 'failed' }).eq('id', paymentRecord.id);
      throw new Error(`Lipwa API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true, payment_id: paymentRecord.id, api_ref: metaRef }),
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
