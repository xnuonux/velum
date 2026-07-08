// the composer ... a spec + a forged system + the runtime, folded into ONE
// self-contained html file. no imports, no cdn, no telemetry in the export.
// the preview iframe renders exactly this string; what you see is what ships.
import type { DesignSystem, SectionInstance, SiteSpec, WorkItem } from '../design/types';
import { seeded, hashText } from '../design/lapidary';
import { siteCss } from './styles';

function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function paras(body: string): string {
  return body
    .split(/\n{2,}|\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${esc(p)}</p>`)
    .join('');
}

/** a generated presence block ... layered seeded gradients from the ramp.
 *  used when a work item has no image; beautiful instead of broken. */
function presence(system: DesignSystem, seedText: string): string {
  const rng = seeded(hashText(seedText));
  const [g0, , g2, g3, g4] = system.dialect.ramp;
  const spot = (c: string, s: number) =>
    `radial-gradient(${Math.round(60 + rng() * 80)}% ${Math.round(50 + rng() * 70)}% at ${Math.round(rng() * 100)}% ${Math.round(rng() * 100)}%, ${c}${Math.round(s * 255).toString(16).padStart(2, '0')}, transparent)`;
  const bg = [spot(g4, 0.5), spot(g3, 0.65), spot(g2, 0.8), `linear-gradient(${Math.round(rng() * 360)}deg, ${g2}, ${g0})`].join(',');
  return `<div class="v-presence" style="background:${bg}"></div>`;
}

function renderSection(s: SectionInstance, spec: SiteSpec, system: DesignSystem): string {
  switch (s.kind) {
    case 'hero':
      return `<section class="v-hero">
  <span class="v-eyebrow v-rise">${esc(s.eyebrow ?? '')}</span>
  <h1 class="v-rise v-d1">${esc(s.heading ?? spec.name)}</h1>
  <p class="v-lead v-rise v-d2">${esc(s.body ?? '')}</p>
  ${s.cta ? `<div class="v-cta-wrap v-rise v-d3"><a class="v-cta" href="#s-contact">${esc(s.cta)}</a></div>` : ''}
</section>`;

    case 'statement': {
      const body = esc(s.body ?? '');
      return `<section class="v-statement">
  <span class="v-eyebrow v-rise">${esc(s.eyebrow ?? 'the idea')}</span>
  <p class="v-rise v-d1">${body}</p>
</section>`;
    }

    case 'work': {
      const items = (s.works ?? [])
        .map(
          (w: WorkItem, i: number) => `<div class="v-glass v-work-card v-rise v-d${(i % 4) + 1}">
    ${w.image ? `<img src="${w.image}" alt="${esc(w.title)}" loading="lazy" />` : presence(system, spec.name + w.title + i)}
    <div class="v-work-body"><h3>${esc(w.title)}</h3><p>${esc(w.note)}</p></div>
  </div>`
        )
        .join('\n');
      return `<section id="s-work">
  <div class="v-head v-rise"><span class="v-eyebrow">${esc(s.eyebrow ?? 'the work')}</span><h2>${esc(s.heading ?? '')}</h2></div>
  <div class="v-work-grid">${items}</div>
</section>`;
    }

    case 'features': {
      const items = (s.features ?? [])
        .map(
          (f, i) => `<div class="v-glass v-feat v-rise v-d${(i % 4) + 1}">
    <span class="v-mark"></span><h3>${esc(f.title)}</h3><p>${esc(f.note)}</p>
  </div>`
        )
        .join('\n');
      return `<section id="s-features">
  <div class="v-head v-rise"><span class="v-eyebrow">${esc(s.eyebrow ?? 'what it does')}</span><h2>${esc(s.heading ?? '')}</h2></div>
  <div class="v-feat-grid">${items}</div>
</section>`;
    }

    case 'offer': {
      const tiers = (s.tiers ?? [])
        .map(
          (t, i) => `<div class="v-glass v-tier${t.marked ? ' marked' : ''} v-rise v-d${(i % 4) + 1}">
    <h3>${esc(t.name)}</h3><div class="v-price">${esc(t.price)}</div><p class="v-tier-note">${esc(t.note)}</p>
    <ul>${t.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
  </div>`
        )
        .join('\n');
      return `<section id="s-offer">
  <div class="v-head v-rise"><span class="v-eyebrow">${esc(s.eyebrow ?? 'the offer')}</span><h2>${esc(s.heading ?? '')}</h2></div>
  <div class="v-tier-grid">${tiers}</div>
</section>`;
    }

    case 'quote':
      return `<section class="v-quote">
  <blockquote class="v-rise">${esc(s.quoteText ?? '')}</blockquote>
  <cite class="v-rise v-d1">${esc(s.quoteBy ?? '')}</cite>
</section>`;

    case 'contact': {
      const links = (s.links ?? [])
        .filter(l => l.label && l.url)
        .map(l => `<a href="${esc(l.url)}" rel="noopener">${esc(l.label)}</a>`)
        .join('');
      return `<section id="s-contact" class="v-contact">
  <div class="v-head v-rise"><span class="v-eyebrow">${esc(s.eyebrow ?? 'reach')}</span><h2>${esc(s.heading ?? '')}</h2></div>
  <p class="v-line v-rise v-d1">${esc(s.contactLine ?? '')}</p>
  ${s.email ? `<a class="v-cta v-rise v-d2" href="mailto:${esc(s.email)}">${esc(s.cta ?? 'write to me')}</a>` : ''}
  ${links ? `<div class="v-links v-rise v-d3">${links}</div>` : ''}
</section>`;
    }

    case 'footer':
      return `<footer class="v-footer">
  <span class="v-sigil"></span>
  <p>${esc(s.body ?? spec.name)}</p>
  <p class="v-cut">a living site · cut on velum</p>
</footer>`;
  }
}

export function composeSite(spec: SiteSpec, system: DesignSystem, runtimeJs: string): string {
  const d = system.dialect;
  const config = {
    ramp: d.ramp,
    drift: spec.drift,
    dim: spec.dim,
    cursor: spec.cursorId,
    accent: d.accent,
    ink: d.ink,
  };
  const sections = spec.sections.map(s => renderSection(s, spec, system)).join('\n\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(spec.name)}</title>
<meta name="description" content="${esc(spec.description)}" />
<meta name="theme-color" content="${d.ramp[0]}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="${system.fontsHref}" />
<style>
${siteCss(system, spec)}
</style>
</head>
<body>
<canvas id="veil" aria-hidden="true"></canvas>
<div class="v-grain" aria-hidden="true"></div>
<main>
${sections}
</main>
<script type="application/json" id="velum-config">${JSON.stringify(config)}</script>
<script>
${runtimeJs}
</script>
</body>
</html>`;
}

/** what the paragraphs helper is for ... long statement bodies (kept exported for the editor preview) */
export const composeHelpers = { esc, paras };
