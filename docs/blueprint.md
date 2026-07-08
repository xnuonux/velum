# 06 · software · VELUM ... living websites

*an ultragod spec. domain 02 (sovereign software). architect: fable 5, 2026-07-04 (night engine). status: designed, unbuilt. name VELUM = a veil, a sail, a membrane (latin) ... a living surface stretched to catch the light. it stays. the whole product, so another AI could build it cold.*

> read `02-software-lapidary.md` first ... VELUM is built ON LAPIDARY (LAPIDARY makes the design SYSTEM; VELUM makes the whole SITE from it). also `THE-THEMOLOGY` (the aesthetic), the `deep-v2-react-port` + `meshy-glb-web-pipeline` memories (the DeepShader + the StrictMode-loseContext landmine + the never-white fallback), and the deep design system + bits arsenal (`frontend/src/design-system/deep/` ... the ground VELUM stands on). VELUM is the godwave flood, turned into a product for the whole web.

---

## the north star

VELUM makes websites that are *alive*. you bring a name and a few sentences ... or a brand, or your content ... and VELUM returns a complete, fast, deployable site that breathes: a shader ground that drifts like the substrate underneath it, a custom cursor that feels like touching water, motion that lives instead of sits, and the themology's excavated, premium, hundred-thousand-dollar weight on every pixel. not a template. not a grid of flat rectangles a million other people also chose. a living membrane, generated for you, that reads billion-dollar and moves like it is aware you are looking.

the effect on the human: the solo founder who cannot afford a design studio launches a site that makes investors assume they raised. the artist puts their work behind a surface as considered as the work itself. the freelancer stops looking like a squarespace and starts looking like a name. the web is aesthetically starving ... a sea of the same five templates, flat and dead ... and VELUM is the first builder that makes a site feel like a *place* instead of a page. the gift is the same as LAPIDARY's, one level up: taste, democratized, at the scale of a whole site, and it cannot make an ugly one.

productization-first: VELUM is a standalone universal site builder ... it sells to anyone with a name to put online, whether or not they have heard of lunari or eternities. lunari's own marketing sites (the flood already built them by hand) become the proof + the first dogfood, not the point. the moat is the same two-layer LAPIDARY constitution ... an absolute quality floor (it cannot make an ugly site, in any dialect) plus the aliveness no template-builder on earth ships.

---

## why now

- **the flood is the working proof, at whole-site scale.** the godwave flood (2026-07-03/04) hand-built exactly what VELUM automates: living sites (the landing, the app, the siblings) with shader grounds (`DeepShader`, `EmeraldShader`), a 31-component recolored bits arsenal, custom motion, the themology throughout. a known premium process that produces living sites and took a night is the exact shape of a product. VELUM is that night, as a machine.
- **LAPIDARY makes the engine underneath it real.** LAPIDARY (`02-software-lapidary.md`) generates the design system (shader ground + palette + component kit + motion) from an intent, held to the quality floor. VELUM is LAPIDARY's system plus the three things a whole SITE needs on top: structure (pages + sections), a living cursor, and a real deploy. the hard part (a guaranteed-premium design system from an intent) is already specced; VELUM assembles it into a site.
- **the web is dead and everyone can feel it.** template-builders (squarespace, wix, framer's stock) produce competent, flat, identical sites. the market is enormous and aesthetically exhausted ... the demand for "a site that does not look like everyone else's, that i did not have to hire a studio for" is universal and unmet, because meeting it needs a taste-engine no builder has bothered to build. VELUM is that engine, pointed at the whole web.

---

## current state (honest)

- **real:** the deep design system (`frontend/src/design-system/deep/` ... DeepShader, the tokens, Sigil/Wordmark), the 31-component bits arsenal (recolored, token-driven), the whole flood as a hand-built reference (living sites that ship). the raw materials of a living site exist, hand-assembled.
- **specced, unbuilt:** LAPIDARY (the design-system engine VELUM stands on).
- **does not exist:** the assembly. there is no "describe a site → get a deployable living site" product. no page/section composition engine, no living-cursor system as a product, no content flow, no editor-for-a-whole-site, no deploy pipeline for a stranger's site. VELUM is unbuilt. what exists is a hand-proof that living sites are possible + beautiful, and a specced engine (LAPIDARY) for the design layer.
- **the lie to not tell:** "we have a site builder." we have a design system, a component arsenal, a hand-built proof, and a specced design engine. VELUM ... the thing that turns an intent into a whole deployed living site ... is the build.

---

## the gap

from "a hand-built living site + a specced design-system engine (LAPIDARY)" to "anyone gets a whole deployed living site from an intent." named:

1. **the site-structure engine.** LAPIDARY makes a system (tokens + shader + kit); a SITE needs pages + sections composed from that kit (hero, about, work, offer, contact, footer ... the grammar of a site), wired to the generated system. this is new: a page/section composition layer over LAPIDARY's component kit.
2. **the living cursor.** dom's asked-for custom cursor, productized ... a library of living pointers (water, ember, gem-glow, the dithering-follow) that is a signature VELUM feature and the alive-not-static law applied to the one element every builder leaves as a stock arrow.
3. **the content flow.** the maker brings content (or drafts it lightly in-voice); VELUM places it into the structure. a bring-your-words + place-it-beautifully layer.
4. **the whole-site editor.** LAPIDARY's bench tunes a system; VELUM needs an editor for a whole site (sections, content, the cursor, the palette, the ground), still in the themology, still can't-make-it-ugly.
5. **the deploy.** a real, fast, live site (static/SSG), one command out to netlify/vercel/a VELUM domain. a stranger's site, hosted.

---

## prerequisites

- **LAPIDARY** (`02-software-lapidary.md`) ... the design-system engine. VELUM calls LAPIDARY to generate the ground + palette + kit + motion for a site, then assembles it. build LAPIDARY's per-system engine first (or in parallel); VELUM is its whole-site consumer. (the family compounds: LAPIDARY the design engine, VELUM the site product, both on the themology.)
- **the deep design system + bits arsenal** (`frontend/src/design-system/deep/` + `.../bits/`, 31 components) ... the section + component vocabulary VELUM composes from. the DeepShader (the living ground), the bits (ScrollReveal, ShinyText, GlassSurface, SpotlightCard, the nav grammars, the backgrounds) ... a site's building blocks.
- **the DeepShader discipline** (the `deep-v2-react-port` memory) ... the never-white fallback, the StrictMode-loseContext landmine (no `loseContext()` in cleanup), the mobile-dim tuning. a public-facing site's ground must never white-flash or die.
- **a static-site target** (Vite/React SSG or Astro) ... fast, deployable, SEO-clean. (Astro is worth considering for a content-site output ... islands of the living bits over static HTML = fast + alive.)
- **a deploy pipeline** ... netlify/vercel API, or a VELUM-hosted target. (the frontend-deploy memories: netlify dist-drag is the manual flow; VELUM automates it.)
- **the luna-firewall + the quality constitution** (from LAPIDARY) ... a maker's brand/content is user data; the quality laws are the non-negotiable floor.

---

## the design (the whole product, internals and out)

### I. VELUM vs LAPIDARY (the clean division)

- **LAPIDARY makes a design SYSTEM:** from an intent → a `MaterialPalette` + a shader ground + a token-driven component kit + a motion config, held to the quality laws + a dialect. the *language*.
- **VELUM makes a SITE:** it calls LAPIDARY for the system, then adds what a site is ... a structure (pages + sections), content placed into it, a living cursor, and a deploy. the *building*, in the language LAPIDARY cut.

one engine (LAPIDARY), two products (a system, or a whole site). VELUM is the higher-level, more consumer-facing of the two ... most people do not want "a design system," they want "my site." VELUM is the front door; LAPIDARY is the foundry behind it.

### II. the input → the site

- **the intent:** a name + a few sentences ("VELUM, a living-website builder, dark and premium and alive") OR a brand (colors, logo, an existing site to reskin) OR content (paste your about + work + contact). low-friction, like LAPIDARY.
- **the site-type:** portfolio / personal / product / landing / studio (a few archetypes, each a section-structure grammar). the maker picks or VELUM infers.
- **LAPIDARY runs:** the intent → a design system (ground + palette + kit + motion + dialect). the site's *look* is now generated + on-taste.
- **the structure composes:** VELUM assembles the site-type's section grammar (below) from LAPIDARY's kit, wired to the tokens.
- **the content places:** the maker's words + images flow into the sections (III).
- **the cursor + motion:** a living cursor (IV) + the aliveness (V) are applied.
- **the output:** a real, deployable, living site, previewed live, editable (VII), deployed in one command (VIII).

### III. the site-structure engine (pages + sections from the kit)

a site = pages, a page = sections, a section = a themology-composed block from the bits. the section grammar (each a real composition of the arsenal):
- **the hero:** the DeepShader ground + the Wordmark/name (ShinyText gold) + a tagline (BlurText reveal) + a CTA (StarBorder). the flood's landing hero, parameterized.
- **the about / statement:** GradientText headlines on the ground, glass panels (SpotlightCard).
- **the work / gallery:** the bits' grids (ChromaGrid, MagicBento, the card grids) ... a portfolio that floats + glows.
- **the offer / pricing:** glass pricing panels, the gold-accent hierarchy.
- **the crew / team / features:** StarBorder cards (the flood's crew section, generalized).
- **contact / footer:** the sigil footmark, a contact form (a real one ... ties to the contact-form desk item), social links.

VELUM selects the section set from the site-type, composes each from the kit + LAPIDARY's tokens, and wires them into a single-page or multi-page structure with the nav grammar (Dock/PillNav). the whole site reads as ONE living organism (the themology's one-organism law ... same ground, same motion, same light across every section), never a stitched-together template.

### IV. the living cursor (the signature ... dom's custom cursor, productized)

every builder on earth ships the stock arrow. VELUM's signature is that the *pointer itself is alive*. a library of living cursors (a bits component + a VELUM product feature):
- **the water:** a soft refractive disc that ripples + lags like touching the surface of water (the gel's language, in 2D).
- **the ember:** a warm trailing glow (the oxblood dialect) that leaves a fading wake.
- **the gem:** a small faceted light that catches + throws color (the emerald/ruby dialects).
- **the dithering-follow:** a patch of the DeepShader ground that follows the pointer, so moving the mouse stirs the substrate.
- **the moon:** a quiet silver halo (the flagship dialect).

each is a canvas/WebGL overlay (low-power, pointer-tracked, the DeepShader discipline ... never blocks interaction, disables on touch devices, respects prefers-reduced-motion). the cursor matches the site's dialect automatically. it is the smallest element and the one that makes a visitor feel, in the first half-second, that this site is *aware* ... the alive-not-static law where no one else applies it.

### V. the aliveness (the themology's law, enforced site-wide)

VELUM sites MOVE, always (the alive-not-static law): the shader ground drifts, the reveals rise on the planetarium curve, the gold shimmers sparse, the cursor lives, sections breathe on scroll. the coherence critic (from LAPIDARY) enforces it ... a VELUM site that renders identical still-vs-live fails the quality floor. this is the single biggest visible difference from a template-builder: their sites are photographs; VELUM's are places.

### VI. content (bring, or draft in-voice)

- **bring:** paste/upload your words + images; VELUM places them into the structure, typeset in the dialect (the reading register).
- **draft (optional, light AI):** VELUM can draft section copy in a voice the maker sets (a name + a tone → a hero line, an about paragraph) ... a small assist, not the core (VELUM's core is generation + assembly, not an AI writer). the maker always edits.
- **images:** the maker's, placed on-taste; or generated presence (LAPIDARY-adjacent) for grounds/textures. never stock-photo slop.

### VII. the whole-site editor (the bench, for a site)

a live editor in the themology (dogfooded ... VELUM's editor is a VELUM site):
- sections: add/remove/reorder (from the grammar), each stays coherent.
- content: inline edit, in-place.
- the design: swap the dialect, tune the palette + ground (LAPIDARY's sliders), pick the living cursor.
- live preview: the site breathes as you edit.
- the coherence readout: the quality floor + dialect laws, surfaced (observe-first until dom locks).

### VIII. the deploy (a real live site)

- one command / one button → a static/SSG build → deployed (netlify/vercel API, or a VELUM subdomain + custom-domain support). fast (the living bits as islands over static HTML where possible). SEO-clean (per-page meta, structured data, a sitemap ... the App.tsx SEO-map discipline, generated).
- the site is real, owned, exportable (the maker can take the code ... sovereignty, the eternities value; a VELUM site is not a hostage).

### the quality floor + dialects (inherited from LAPIDARY)

VELUM cannot make an ugly site, in any dialect, because it inherits LAPIDARY's two-layer constitution: the aesthetic-agnostic quality laws (always on ... texture, coherence, alive, real-materials, contrast, motion) + the pluggable dialects (any aesthetic direction, each held to the floor). the themology is the default + signature dialect (the deep, the flood's look); a maker can go marble, emerald, brutalist, editorial ... any style, never below premium. that guarantee is the product.

### failure modes (designed)

- **the living cursor hurts UX / accessibility** → disabled on touch, respects prefers-reduced-motion, never blocks clicks/hover, keyboard-first paths intact. the cursor is a delight, never a barrier.
- **the shader ground tanks a low-end device** → the DeepShader's low-power + never-white fallback + mobile-dim; the ground degrades to a static themology gradient gracefully.
- **content too thin** → VELUM defaults to a strong single-page structure + prompts for the missing pieces; never a blank or a lorem-ipsum ship.
- **SEO regression on a content site** → SSG output, per-page meta generated, structured data; verified.
- **a maker wants a genuinely ugly / off-brand site** → served as a dialect held to the quality floor (a purposeful minimal, a considered brutalist), never below premium ... the floor does not turn off (the LAPIDARY cut-list rule).

---

## the build order (phased, flagged, each shippable)

- **phase A · the section grammar over the bits.** the site-type structures (portfolio/landing/etc.) as compositions of the deep bits, wired to a LAPIDARY-generated system. verify: a hand-fed system → a composed multi-section living page, coherent, at parity with the flood's hand-built landing.
- **phase B · the living cursor library.** the five living cursors as a bits component + a VELUM feature, dialect-matched, accessibility-safe. verify: each cursor lives, never blocks interaction, disables on touch/reduced-motion (looked at, per the alive-law).
- **phase C · the intent → site pipeline + LAPIDARY integration.** intent → LAPIDARY system → VELUM structure → a previewable living site. verify: "a portfolio for a photographer, dark and premium" → a real living site, on-taste, in one flow.
- **phase D · the editor + content flow.** the whole-site editor (sections, content, dialect, cursor), the bring/draft content layer. verify: a non-technical maker builds + edits a whole living site in an afternoon, dogfooded (VELUM's editor is a VELUM site).
- **phase E · the deploy + SEO + export.** one-command deploy (netlify/vercel), SSG output, generated SEO, custom domains, code export. verify: a real deployed live site, fast, indexable, owned + exportable.
- **phase F · the standalone product (pricing, accounts, the market).** VELUM as a priced standalone builder (per-site or subscription), separate from lunari. verify: first external makers, first sites shipped, the quality-floor guarantee holding across strangers' sites.

each behind a flag, inert until earned. the visual phases (A, B) are verified by looking (the flood's discipline ... a themology surface is judged by eyes, not tsc), which waits for dom's supervised return where live builds are involved.

---

## verification (rows + eyes)

- **parity with the flood:** VELUM's generated landing matches or exceeds the hand-built flood landing (dom's verdict). the acceptance test.
- **the quality-floor gates:** every generated site passes the deterministic quality laws (contrast, no-flat-fill, coherence, motion-present) ... rows per generation. the taste-judged dims observe-first until dom locks.
- **the alive-check (eyes):** playwright screenshots, looked at ... a still identical to live fails. every generated site.
- **the cursor-accessibility check:** the living cursor never blocks interaction, disables correctly on touch/reduced-motion ... tested, rows.
- **the deploy receipt:** a generated site deploys, loads fast (a real lighthouse/perf number), indexes. rows per deploy.
- **dogfood:** VELUM's own site + editor are VELUM sites. if it cannot build itself beautifully, it is not done.

---

## the cut list (out of scope, do not re-litigate)

- **an ugly-capable builder.** VELUM makes any aesthetic, never below the quality floor. "any site at any quality" is squarespace's game (flat + dead at scale); VELUM's promise is "any site, always alive + premium." the floor never turns off.
- **a full app builder / a CMS / e-commerce backend.** VELUM makes living SITES (marketing, portfolio, personal, landing), not web apps with complex logic or a store backend. (the boundary keeps it sovereign + shippable; a maker who needs an app uses perseus/their stack + VELUM for the front.)
- **an AI-writes-your-whole-site tool.** the content draft is a light assist; VELUM's core is generation + assembly + aliveness, not an AI copywriter. the maker owns the words.
- **hosting lock-in.** a VELUM site is owned + exportable (the sovereignty value). VELUM is not a walled garden that holds your site hostage.
- **re-speccing LAPIDARY here.** VELUM stands on LAPIDARY; the design-system engine is LAPIDARY's spec, not re-litigated in VELUM's.

---

## open questions for the founder (dom's calls)

1. **the name.** VELUM (a veil / sail / living membrane) is my pick, in the aesthetic. it stays unless you hear truer.
2. **VELUM and LAPIDARY: two products or one?** they are cleanly divided (LAPIDARY = the design system, VELUM = the whole site). do they ship as two products (a design-engine + a site-builder, different buyers) or one tiered product (VELUM the consumer front, LAPIDARY the pro/API tier under it)? my read: one family, two front doors ... VELUM for "i want my site," LAPIDARY for "i want a design system / an API." same engine, priced for two buyers.
3. **the static target: Vite/React SSG or Astro?** Astro (islands of the living bits over static HTML) is likely faster + more SEO-clean for content sites; Vite/React reuses the flood's exact components directly. a build-tech call ... my lean: Astro for the output (fast + alive), the deep bits ported as islands.
4. **hosting: VELUM-hosted, or deploy-to-your-own?** my read: both ... a one-click VELUM-hosted subdomain (fastest path to live) + deploy-to-your-netlify/vercel + code export (sovereignty). the export is the eternities value; the hosting is the convenience.
5. **the first market.** solo founders, artists/creators, or agencies (who would ship many client sites via VELUM)? my read: creators/founders first (the emotional wedge ... "a site that finally looks like me"), agencies second (the volume play, the highest revenue per seat).

---

## the architect's note

VELUM is the flood, given to the world. what took a night by hand ... a living site that breathes and reads billion-dollar ... a stranger gets in an afternoon, and it is theirs, and it does not look like anyone else's, and it is alive down to the cursor. the web is a graveyard of the same five flat templates, and VELUM is the first builder that makes a site feel *awake*. build it on LAPIDARY (the design engine) + the bits (the vocabulary) + one signature no one else ships (a cursor that lives), and it becomes the most commercial product on the whole desk ... because everyone has a name to put online, and everyone is tired of looking like everyone else. make the web alive again, one membrane at a time. 🌙
