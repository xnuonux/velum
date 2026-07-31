// velum ... the type surface. a site is a spec; a spec forges into a system;
// a system + content renders to one self-contained living html file.

/** a dialect is a stone: a shader ramp, an ink, a metal, a glass tint. */
export interface Dialect {
  id: string;
  name: string;
  /** one line of what the stone feels like */
  feel: string;
  /** five-stop color ramp for the veil shader, void to bloom, hex */
  ramp: [string, string, string, string, string];
  /** primary reading ink on the ground */
  ink: string;
  /** secondary / muted ink */
  inkDim: string;
  /** the accent stone (borders, glows, small emphasis) */
  accent: string;
  /** the metal (rare ... eyebrows, the earned emphasis). usually old gold */
  metal: string;
  /** brightest metal highlight for the shimmer sweep */
  metalHi: string;
  /** glass panel tint, rgba() string */
  glass: string;
  /** hairline border color, rgba() string */
  hair: string;
  /** display face family (loaded from google fonts in the export) */
  displayFont: string;
  /** body face family */
  bodyFont: string;
  /** true when the ground is pale (marble) ... flips shadows + selection */
  light?: boolean;
}

export type SiteType = 'portfolio' | 'landing' | 'personal' | 'studio' | 'product';

export type CursorId = 'moon' | 'water' | 'ember' | 'gem' | 'dither' | 'none';

export type SectionKind =
  | 'hero'
  | 'statement'
  | 'prose'
  | 'work'
  | 'gallery'
  | 'features'
  | 'offer'
  | 'quote'
  | 'contact'
  | 'footer';

export interface WorkItem {
  title: string;
  note: string;
  /** optional data-url image; absent means a generated presence block */
  image?: string;
}

export interface GalleryItem {
  /** optional data-url image; absent means a generated presence block */
  image?: string;
  caption: string;
}

export interface FeatureItem {
  title: string;
  note: string;
}

export interface OfferTier {
  name: string;
  price: string;
  note: string;
  points: string[];
  marked?: boolean;
}

export interface SectionInstance {
  id: string;
  kind: SectionKind;
  /** which view of the one file this section lives on ... absent means page one.
   *  hero anchors page one; footer renders on both. */
  page?: 'one' | 'two';
  /** per-kind content lives here; keeps sections reorderable as one list */
  heading?: string;
  body?: string;
  eyebrow?: string;
  cta?: string;
  works?: WorkItem[];
  galleryItems?: GalleryItem[];
  features?: FeatureItem[];
  tiers?: OfferTier[];
  quoteText?: string;
  quoteBy?: string;
  contactLine?: string;
  email?: string;
  links?: { label: string; url: string }[];
}

/** the whole site, editable, persisted locally. this is the sovereign object. */
export interface SiteSpec {
  id: string;
  /** the name brought to the forge */
  name: string;
  /** the few sentences */
  story: string;
  siteType: SiteType;
  dialectId: string;
  cursorId: CursorId;
  /** seo description; drafted, editable */
  description: string;
  sections: SectionInstance[];
  /** shader tuning */
  drift: number;   // 0.4 .. 1.6, default 1
  dim: number;     // 0.5 .. 1.1, default 0.82
  /** draft seed ... redraft cycles it */
  seed: number;
  updatedAt: number;
}

/** the forged design system ... what lapidary returns for a spec. */
export interface DesignSystem {
  dialect: Dialect;
  /** css custom properties for the exported site */
  tokens: Record<string, string>;
  /** google fonts href for the pairing */
  fontsHref: string;
}

export interface FloorCheck {
  law: string;
  held: boolean;
  detail: string;
  /** true when the law is held by construction, not measured */
  structural?: boolean;
}
