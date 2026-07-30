// velum ... the price + the stripe payment link. the link is a public url by
// design (stripe payment links are made to be shared); the secret key never
// touches this repo ... it lives in netlify env, used only by the unlock fn.
// VITE_STRIPE_PAYMENT_LINK is baked in at build time (see .env / netlify env).
export const PRICE_USD = 49;

export const PAYMENT_LINK: string = import.meta.env.VITE_STRIPE_PAYMENT_LINK ?? '';

export function paymentUrl(projectId: string): string {
  const sep = PAYMENT_LINK.includes('?') ? '&' : '?';
  return `${PAYMENT_LINK}${sep}client_reference_id=${encodeURIComponent(projectId)}`;
}
