// the drafter ... a name + a few sentences become a full first draft,
// deterministically (same intent + seed, same draft). this is a seeded
// composition over curated banks + the story's own words ... a taste engine,
// not a model, and every placeholder says it is one. redraft cycles the seed.
import type { SectionInstance, SectionKind, SiteSpec, SiteType } from './design/types';
import { hashText, seeded } from './design/lapidary';

let n = 0;
function sid(): string {
  n += 1;
  return 's' + n + '-' + Math.abs(hashText(String(n) + 'velum')).toString(36).slice(0, 5);
}

function sentences(story: string): string[] {
  return story
    .split(/(?<=[.!?])\s+|\n+/)
    .map(s => s.trim().replace(/[!]+$/g, '.'))
    .filter(s => s.length > 3);
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

const EYEBROWS_HERO = ['est. tonight', 'a living site', 'welcome, wanderer', 'after dark', 'the door is open'];
const CTAS = ['enter', 'see the work', 'begin', 'come closer', 'step in'];
const WORK_HEADINGS = ['selected work', 'the pieces', 'what has been made', 'the body of work'];
const WORK_TITLES = ['nocturne', 'the first room', 'vessel', 'meridian line', 'low tide', 'the quiet study', 'ember field', 'a kept hour'];
const FEATURE_HEADINGS = ['what this holds', 'the craft', 'how it works', 'what you get'];
const OFFER_HEADINGS = ['ways in', 'the offer', 'working together'];
const CONTACT_HEADINGS = ['reach me', 'write', 'the last door'];
const CONTACT_LINES = [
  'no forms, no funnels ... a letter finds me faster than any button.',
  'if something here moved you, say so plainly. i read everything.',
  'the inbox is quiet and i like it that way. write when it matters.',
];

export function draftSections(name: string, story: string, siteType: SiteType, seed: number): SectionInstance[] {
  const rng = seeded(seed || 1);
  const ss = sentences(story);
  const lead = ss[0] ?? 'a few true sentences become a living place.';
  const statement = ss.length > 1 ? ss.slice(1).join(' ') : lead;
  const strongest = [...ss].sort((a, b) => b.length - a.length)[0] ?? lead;

  const hero: SectionInstance = {
    id: sid(),
    kind: 'hero',
    eyebrow: pick(rng, EYEBROWS_HERO),
    heading: name,
    body: lead,
    cta: pick(rng, CTAS),
  };

  const stmt: SectionInstance = {
    id: sid(),
    kind: 'statement',
    eyebrow: 'the idea',
    body: statement,
  };

  const prose: SectionInstance = {
    id: sid(),
    kind: 'prose',
    eyebrow: 'the longer telling',
    heading: 'in full',
    body:
      ss.length > 2
        ? ss.slice(2).join(' ')
        : 'a placeholder passage ... replace it with the longer telling: how this started, what it costs, why it stays.',
  };

  const work: SectionInstance = {
    id: sid(),
    kind: 'work',
    eyebrow: 'the work',
    heading: pick(rng, WORK_HEADINGS),
    works: Array.from({ length: 4 }, (_, i) => ({
      title: WORK_TITLES[(Math.floor(rng() * WORK_TITLES.length) + i) % WORK_TITLES.length],
      note: 'a placeholder piece ... swap in your own title, note, and image.',
    })),
  };

  const gallery = (count: number): SectionInstance => ({
    id: sid(),
    kind: 'gallery',
    eyebrow: 'the gallery',
    heading: 'in frames',
    galleryItems: Array.from({ length: count }, () => ({
      caption: 'a placeholder caption ... one true line about this frame.',
    })),
  });

  const features: SectionInstance = {
    id: sid(),
    kind: 'features',
    eyebrow: 'what it holds',
    heading: pick(rng, FEATURE_HEADINGS),
    features: [
      { title: 'made once, made whole', note: 'one self-contained file ... no builder lock-in, no cdn, nothing phoning home.' },
      { title: 'a ground that breathes', note: 'the veil shader drifts under everything. never a flat fill, never a white void.' },
      { title: 'yours, exportable', note: 'download the html and walk away. it keeps working anywhere you put it.' },
    ],
  };

  const offer: SectionInstance = {
    id: sid(),
    kind: 'offer',
    eyebrow: 'the offer',
    heading: pick(rng, OFFER_HEADINGS),
    tiers: [
      { name: 'the small', price: '$ ...', note: 'a placeholder tier ... name your own modest way in.', points: ['one page, alive', 'the stone of your choice', 'yours outright'] },
      { name: 'the studio', price: '$ ...', note: 'the middle path ... edit these words to fit the real offer.', points: ['everything in the small', 'work + offer sections', 'a custom cursor'], marked: true },
      { name: 'the patron', price: '$ ...', note: 'the full cut ... placeholder until your true offer exists.', points: ['everything in the studio', 'a second page', 'seasonal re-pours'] },
    ],
  };

  const quote: SectionInstance = {
    id: sid(),
    kind: 'quote',
    quoteText: strongest,
    quoteBy: name,
  };

  const contact: SectionInstance = {
    id: sid(),
    kind: 'contact',
    eyebrow: 'reach',
    heading: pick(rng, CONTACT_HEADINGS),
    contactLine: pick(rng, CONTACT_LINES),
    email: 'you@yourdomain.com',
    cta: 'write to me',
    links: [
      { label: 'instagram', url: 'https://instagram.com/' },
      { label: 'github', url: 'https://github.com/' },
    ],
  };

  const footer: SectionInstance = {
    id: sid(),
    kind: 'footer',
    body: name + ' ... ' + new Date().getFullYear(),
  };

  const byType: Record<SiteType, SectionInstance[]> = {
    portfolio: [hero, stmt, work, gallery(4), quote, contact, footer],
    landing: [hero, stmt, features, offer, quote, contact, footer],
    product: [hero, features, stmt, offer, contact, footer],
    personal: [hero, stmt, prose, gallery(3), quote, contact, footer],
    studio: [hero, stmt, work, prose, features, contact, footer],
  };
  return byType[siteType];
}

/** one honest section of a given kind, for the bench's add-a-section control.
 *  every placeholder says it is one. */
export function blankSection(kind: SectionKind): SectionInstance {
  const id = sid();
  switch (kind) {
    case 'hero':
      return { id, kind, eyebrow: 'a living site', heading: 'the name', body: 'a placeholder lead ... your first true sentence.', cta: 'enter' };
    case 'statement':
      return { id, kind, eyebrow: 'the idea', body: 'a placeholder statement ... say the one true thing, plainly.' };
    case 'prose':
      return { id, kind, eyebrow: 'the longer telling', heading: 'in full', body: 'a placeholder passage ... the longer telling goes here. how it started, what it costs, why it stays.' };
    case 'work':
      return { id, kind, eyebrow: 'the work', heading: 'selected work', works: [{ title: 'a piece', note: 'a placeholder piece ... swap in your own title, note, and image.' }] };
    case 'gallery':
      return { id, kind, eyebrow: 'the gallery', heading: 'in frames', galleryItems: [{ caption: 'a placeholder caption ... one true line about this frame.' }, { caption: 'another placeholder frame ... swap in your own image and words.' }] };
    case 'features':
      return { id, kind, eyebrow: 'what it holds', heading: 'what this holds', features: [{ title: 'a strength', note: 'a placeholder feature ... name the real one.' }] };
    case 'offer':
      return { id, kind, eyebrow: 'the offer', heading: 'ways in', tiers: [{ name: 'the way', price: '$ ...', note: 'a placeholder tier ... name the real way in.', points: ['one true thing'] }] };
    case 'quote':
      return { id, kind, quoteText: 'a placeholder quote ... the truest sentence, kept.', quoteBy: 'the name' };
    case 'contact':
      return { id, kind, eyebrow: 'reach', heading: 'reach me', contactLine: 'a placeholder line ... how a letter finds you.', email: 'you@yourdomain.com', cta: 'write to me', links: [] };
    case 'footer':
      return { id, kind, body: 'the name ... ' + new Date().getFullYear() };
  }
}

export function newSpec(name: string, story: string, siteType: SiteType, dialectId: string, seed: number): SiteSpec {
  return {
    id: Math.abs(hashText(name + story + String(seed))).toString(36) + Date.now().toString(36),
    name,
    story,
    siteType,
    dialectId,
    cursorId: 'moon',
    description: sentences(story)[0] ?? name + ' ... a living site.',
    sections: draftSections(name, story, siteType, seed),
    drift: 1,
    dim: 0.82,
    seed,
    updatedAt: Date.now(),
  };
}
