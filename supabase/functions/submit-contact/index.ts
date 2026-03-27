import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const payload = await request.json();

  if (!payload?.name || !payload?.email || !payload?.subject || !payload?.message || payload?.consentPrivacy !== true) {
    return json({ error: 'Invalid payload' }, 400);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from('contact_inquiries').insert({
    name: payload.name,
    company: payload.company || null,
    email: payload.email,
    phone: payload.phone || null,
    subject: payload.subject,
    message: payload.message,
    consent_privacy: true,
  });

  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({ ok: true });
});
