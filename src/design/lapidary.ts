// the foundry seam ... velum stands on lapidary (the design-system engine,
// specced in the lunari blueprints). lapidary the full engine is unbuilt, so
// velum embeds a small deterministic foundry with the same contract: an
// intent in, a design system out, the quality floor held by construction.
// this is a taste engine over curated stones, not a model, and it says so.
import type { Dialect, DesignSystem, SiteSpec } from './types';
import { DIALECTS, dialectById } from './dialects';

/** small deterministic prng ... same intent, same pour. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return (s >>> 0) / 4294967296;
  };
}

export function hashText(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** dialect inference ... reads the story's material words. deterministic,
 *  honest: keyword weight, falling back to a seeded pick among the dark stones. */
export function inferDialect(name: string, story: string): Dialect {
  const t = (name + ' ' + story).toLowerCase();
  const scores = new Map<string, number>();
  const vote = (id: string, n = 1) => scores.set(id, (scores.get(id) ?? 0) + n);

  const table: [RegExp, string, number][] = [
    [/\b(blood|red|crimson|wine|ruby|burgundy|dark red)\b/g, 'oxblood', 3],
    [/\b(forest|green|emerald|jade|garden|botanic|nature|moss)\b/g, 'emerald', 3],
    [/\b(ocean|sea|water|blue|cobalt|sapphire|night sky|deep water|memory)\b/g, 'cobalt', 3],
    [/\b(gold|golden|amber|honey|luxur|royal|vault|treasure)\b/g, 'gilded', 3],
    [/\b(marble|stone|gallery|museum|classic|editorial|light|minimal|clean|paper)\b/g, 'marble', 3],
    [/\b(veil|moon|violet|purple|dream|mystic|quiet|night|silver)\b/g, 'veil', 3],
    [/\b(photograph|film|studio|art)\b/g, 'oxblood', 1],
    [/\b(craft|wood|earth|clay)\b/g, 'emerald', 1],
    [/\b(tech|product|software|tool)\b/g, 'cobalt', 1],
  ];
  for (const [re, id, w] of table) {
    const m = t.match(re);
    if (m) vote(id, m.length * w);
  }
  let best: string | null = null;
  let bestScore = 0;
  for (const [id, s] of scores) if (s > bestScore) { best = id; bestScore = s; }
  if (best) return dialectById(best);
  // no material words ... a seeded pick among the deep stones (marble is a choice, not a default)
  const dark = DIALECTS.filter((d) => !d.light);
  const rng = seeded(hashText(name + story));
  return dark[Math.floor(rng() * dark.length)];
}

/** the pour: spec -> design system. tokens are the exported site's css vars. */
export function forgeSystem(spec: SiteSpec): DesignSystem {
  const d = dialectById(spec.dialectId);
  const tokens: Record<string, string> = {
    '--g0': d.ramp[0], '--g1': d.ramp[1], '--g2': d.ramp[2], '--g3': d.ramp[3], '--g4': d.ramp[4],
    '--ink': d.ink,
    '--ink-dim': d.inkDim,
    '--accent': d.accent,
    '--metal': d.metal,
    '--metal-hi': d.metalHi,
    '--glass': d.glass,
    '--hair': d.hair,
    '--display': `'${d.displayFont}', Georgia, serif`,
    '--body': `'${d.bodyFont}', Georgia, serif`,
    '--ease': 'cubic-bezier(.22,.68,.12,1)',
    '--t-micro': '140ms',
    '--t-base': '300ms',
    '--t-emphasis': '420ms',
  };
  const fams = [...new Set([d.displayFont, d.bodyFont])]
    .map((f) => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`)
    .join('&');
  return {
    dialect: d,
    tokens,
    fontsHref: `https://fonts.googleapis.com/css2?${fams}&display=swap`,
  };
}
