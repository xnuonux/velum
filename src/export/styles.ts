// the exported site's stylesheet ... built per pour from the forged tokens.
// this css ships inside the single html file. the themology grammar: a living
// ground, glass floated on it, one metal cut rare, reveals on the planetarium
// curve, nothing flat, nothing springing.
import type { DesignSystem, SiteSpec } from '../design/types';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function siteCss(system: DesignSystem, _spec: SiteSpec): string {
  const d = system.dialect;
  const tokens = Object.entries(system.tokens)
    .map(([k, v]) => `${k}:${v};`)
    .join('');
  const light = !!d.light;
  return `
*{margin:0;padding:0;box-sizing:border-box}
:root{${tokens}}
html{scroll-behavior:smooth}
body{
  background:${d.ramp[0]};color:var(--ink);font-family:var(--body);
  font-size:clamp(16px,1.1vw,19px);line-height:1.65;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
::selection{background:${light ? 'rgba(138,109,44,.30)' : 'rgba(220,227,240,.22)'};color:${light ? '#1e1a14' : 'var(--ink)'}}
.v-cursor-live,.v-cursor-live *{cursor:none}
#veil{
  position:fixed;inset:0;width:100%;height:100%;z-index:0;display:block;
  background:radial-gradient(125% 95% at 50% 0%,${d.ramp[1]},${d.ramp[0]} 68%);
}
.v-grain{
  position:fixed;inset:0;z-index:1;pointer-events:none;opacity:${light ? '.08' : '.05'};
  mix-blend-mode:${light ? 'multiply' : 'overlay'};background-image:${GRAIN};
}
main{position:relative;z-index:2}
section{max-width:1180px;margin:0 auto;padding:clamp(84px,13vh,170px) clamp(22px,7vw,110px)}
h1,h2,h3{font-family:var(--display);font-weight:600;color:var(--ink)}
p{color:var(--ink-dim)}
a{color:var(--ink);text-decoration:none}

/* the rise ... reveals on the planetarium curve */
.v-rise{opacity:0;transform:translateY(26px);transition:opacity 1.1s var(--ease),transform 1.1s var(--ease)}
.v-rise.seen{opacity:1;transform:none}
.v-d1{transition-delay:.08s}.v-d2{transition-delay:.18s}.v-d3{transition-delay:.30s}.v-d4{transition-delay:.44s}

/* the metal ... shimmer sparse, an event not a default */
@keyframes v-shimmer{0%{background-position:220% 0}100%{background-position:-220% 0}}
.v-eyebrow{
  display:block;font-family:var(--body);font-size:12px;font-weight:600;
  letter-spacing:.4em;text-transform:uppercase;margin-bottom:26px;
  background:linear-gradient(100deg,var(--metal) 24%,var(--metal-hi) 46%,var(--metal-hi) 54%,var(--metal) 76%);
  background-size:220% 100%;-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;animation:v-shimmer 8.5s linear infinite;
}
.v-shimmer{
  background:linear-gradient(100deg,var(--metal) 24%,var(--metal-hi) 50%,var(--metal) 76%);
  background-size:220% 100%;-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;animation:v-shimmer 7s linear infinite;
}

/* the hero */
.v-hero{
  min-height:100svh;display:flex;flex-direction:column;justify-content:center;
  align-items:center;text-align:center;
}
.v-hero h1{
  font-size:clamp(52px,10.5vw,134px);font-weight:500;line-height:1.02;
  letter-spacing:.01em;margin-bottom:28px;
}
.v-hero .v-lead{
  font-size:clamp(19px,2vw,25px);max-width:640px;color:var(--ink-dim);
  font-style:italic;
}
.v-hero .v-cta{margin-top:52px}

/* the cta ... hairline, glass, a slow glow on approach */
.v-cta{
  display:inline-block;padding:15px 38px;border:1px solid var(--hair);
  border-radius:3px;background:var(--glass);backdrop-filter:blur(10px);
  -webkit-backdrop-filter:blur(10px);
  font-family:var(--body);font-size:14px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--ink);transition:border-color var(--t-base) var(--ease),box-shadow var(--t-base) var(--ease),transform var(--t-base) var(--ease);
}
.v-cta:hover{border-color:var(--accent);box-shadow:0 0 34px ${hexA(d.accent, 0.25)};transform:translateY(-2px)}

/* section heads */
.v-head h2{font-size:clamp(30px,5vw,58px);font-weight:500;line-height:1.08;margin-bottom:18px}
.v-head{margin-bottom:clamp(40px,7vh,72px)}

/* the statement */
.v-statement p{
  font-family:var(--display);font-size:clamp(22px,3.2vw,38px);line-height:1.35;
  color:var(--ink);max-width:900px;font-weight:500;
}
.v-statement p em{color:var(--accent);font-style:italic}

/* glass */
.v-glass{
  background:var(--glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border:1px solid var(--hair);border-radius:4px;
  box-shadow:0 18px 60px rgba(0,0,0,${light ? '.10' : '.45'});
  transition:transform var(--t-base) var(--ease),border-color var(--t-base) var(--ease),box-shadow var(--t-base) var(--ease);
}
.v-glass:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 26px 70px rgba(0,0,0,${light ? '.16' : '.55'}),0 0 40px ${hexA(d.accent, 0.16)}}

/* the work */
.v-work-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:26px}
.v-work-card{overflow:hidden}
.v-presence{aspect-ratio:4/3;position:relative;overflow:hidden}
.v-presence::after{
  content:"";position:absolute;inset:0;background-image:${GRAIN};opacity:.10;mix-blend-mode:overlay;
}
.v-work-card img{aspect-ratio:4/3;width:100%;object-fit:cover;display:block;filter:saturate(.92)}
.v-work-body{padding:22px 24px 26px}
.v-work-body h3{font-size:21px;margin-bottom:8px;font-weight:600}
.v-work-body p{font-size:15px}

/* the features */
.v-feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:26px}
.v-feat{padding:30px 28px 34px}
.v-feat .v-mark{
  width:34px;height:1px;background:linear-gradient(90deg,var(--metal),transparent);
  margin-bottom:22px;display:block;
}
.v-feat h3{font-size:20px;margin-bottom:10px;font-weight:600}
.v-feat p{font-size:15px}

/* the offer */
.v-tier-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(270px,100%),1fr));gap:26px;align-items:stretch}
.v-tier{padding:36px 30px;display:flex;flex-direction:column}
.v-tier.marked{border-color:${hexA(d.metal, 0.45)}}
.v-tier h3{font-size:17px;letter-spacing:.18em;text-transform:uppercase;font-family:var(--body);font-weight:600;margin-bottom:14px}
.v-tier .v-price{font-family:var(--display);font-size:44px;font-weight:500;color:var(--ink);margin-bottom:6px}
.v-tier .v-tier-note{font-size:14px;margin-bottom:24px}
.v-tier ul{list-style:none;margin-top:auto}
.v-tier li{font-size:15px;color:var(--ink-dim);padding:9px 0;border-top:1px solid var(--hair)}

/* the quote */
.v-quote{text-align:center}
.v-quote blockquote{
  font-family:var(--display);font-style:italic;font-size:clamp(24px,3.6vw,42px);
  line-height:1.3;color:var(--ink);max-width:880px;margin:0 auto 26px;
}
.v-quote cite{font-style:normal;font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:var(--ink-dim)}

/* contact */
.v-contact{text-align:center}
.v-contact .v-line{font-size:clamp(18px,1.8vw,22px);color:var(--ink-dim);max-width:560px;margin:0 auto 40px}
.v-links{display:flex;gap:26px;justify-content:center;flex-wrap:wrap;margin-top:38px}
.v-links a{
  font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:var(--ink-dim);
  border-bottom:1px solid transparent;padding-bottom:3px;
  transition:color var(--t-base) var(--ease),border-color var(--t-base) var(--ease);
}
.v-links a:hover{color:var(--ink);border-color:var(--accent)}

/* footer */
.v-footer{padding-top:60px;padding-bottom:60px;text-align:center;border-top:1px solid var(--hair)}
.v-footer .v-sigil{
  width:10px;height:10px;border:1px solid var(--metal);transform:rotate(45deg);
  display:inline-block;margin-bottom:20px;opacity:.7;
}
.v-footer p{font-size:13px;letter-spacing:.14em}
.v-footer .v-cut{font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.45;margin-top:10px}

@media(prefers-reduced-motion:reduce){
  .v-rise{transition:none;opacity:1;transform:none}
  .v-eyebrow,.v-shimmer{animation:none}
  html{scroll-behavior:auto}
}
@media(max-width:640px){
  section{padding-left:22px;padding-right:22px}
}
`.trim();
}

function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
