// velum ... the unlock check. the only server piece: confirm with stripe that
// this checkout session is paid and bound to this pour. no database ... a
// replayed session id can only re-unlock the pour it actually paid for, which
// is exactly what an honest customer wants anyway.
//
// env: STRIPE_SECRET_KEY (netlify ui only, never the repo ... the plaintext-secret landmine).

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export default async (req) => {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id') ?? '';
  const project = url.searchParams.get('project') ?? '';
  if (!/^cs_(test|live)_.+/.test(sessionId) || !project) {
    return json({ ok: false, reason: 'bad request' }, 400);
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return json({ ok: false, reason: 'payments not configured' }, 500);

  const resp = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { headers: { Authorization: `Bearer ${key}` } }
  );
  if (!resp.ok) return json({ ok: false, reason: 'stripe rejected the session' }, 502);

  const s = await resp.json();
  const ok = s.payment_status === 'paid' && s.client_reference_id === project;
  return ok ? json({ ok: true }) : json({ ok: false, reason: 'not paid for this pour' });
};
