// the quality floor ... the deterministic laws, checked per pour and shown as
// rows. some laws are held by construction (the shader is always the ground,
// motion is always present); those are named as structural, never claimed as
// measurements. contrast is genuinely computed. taste-judged dimensions stay
// with the maker's eyes ... no machine grades its own beauty here.
import type { DesignSystem, FloorCheck, SiteSpec } from './types';

function lum(hex: string): number {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  const chan = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan((n >> 16) & 255) + 0.7152 * chan((n >> 8) & 255) + 0.0722 * chan(n & 255);
}

export function contrastRatio(a: string, b: string): number {
  const la = lum(a);
  const lb = lum(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export function checkFloor(spec: SiteSpec, system: DesignSystem): FloorCheck[] {
  const d = system.dialect;
  // the reading ground is the deep end of the ramp (light dialects invert)
  const ground = d.light ? d.ramp[0] : d.ramp[0];
  const ratio = contrastRatio(d.ink, ground);
  const midRatio = contrastRatio(d.ink, d.ramp[2]);
  const checks: FloorCheck[] = [
    {
      law: 'contrast',
      held: ratio >= 7,
      detail: `ink on ground ${ratio.toFixed(1)}:1 (floor 7:1) ... mid-ramp ${midRatio.toFixed(1)}:1`,
    },
    {
      law: 'metal legibility',
      held: contrastRatio(d.metal, ground) >= 4.5,
      detail: `metal on ground ${contrastRatio(d.metal, ground).toFixed(1)}:1 (floor 4.5:1) ... eyebrows and small cuts stay readable`,
    },
    {
      law: 'no flat fill',
      held: true,
      structural: true,
      detail: 'the ground is the veil shader (domain-warped fbm + bayer dither), never a fill',
    },
    {
      law: 'alive',
      held: spec.drift > 0,
      structural: true,
      detail: `the ground drifts (${spec.drift.toFixed(2)}x), reveals rise, the metal shimmers ... still under prefers-reduced-motion`,
    },
    {
      law: 'coherence',
      held: true,
      structural: true,
      detail: 'one dialect, one motion curve, one light logic across every section ... one organism',
    },
    {
      law: 'real materials',
      held: true,
      structural: true,
      detail: `${d.name}: stone ramp + glass panels + ${d.metal === '#c9d4f0' ? 'silver' : 'gold'} cut rare`,
    },
    {
      law: 'motion composed',
      held: true,
      structural: true,
      detail: 'cubic-bezier(.22,.68,.12,1), 300ms base ... no springs, nothing bounces',
    },
  ];
  return checks;
}
