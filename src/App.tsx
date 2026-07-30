// velum ... the foundry surface. bring a name and a few sentences; the bench
// pours a living site (the preview IS the export, byte for byte), holds the
// quality floor as visible rows, and hands you one self-contained html file.
import { useEffect, useMemo, useState } from 'react';
import type { SectionInstance, SiteSpec, SiteType, CursorId } from './design/types';
import { DIALECTS, dialectById } from './design/dialects';
import { forgeSystem, inferDialect } from './design/lapidary';
import { checkFloor } from './design/quality';
import { composeSite } from './export/compose';
import { draftSections, newSpec } from './draft';
import { isUnlocked, markUnlocked, getPending, setPending } from './paywall/entitlement';
import { paymentUrl, PAYMENT_LINK, PRICE_USD } from './paywall/config';
import PricingModal from './paywall/PricingModal';
import runtimeJs from './runtime/site-runtime.js?raw';

const STORE = 'velum.sites';
const TYPES: SiteType[] = ['portfolio', 'landing', 'personal', 'studio', 'product'];
const CURSORS: CursorId[] = ['moon', 'water', 'ember', 'gem', 'dither', 'none'];

function loadSites(): SiteSpec[] {
  try {
    const raw = localStorage.getItem(STORE);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.error('[velum] site store degraded ... starting empty');
    return [];
  }
}
function saveSites(sites: SiteSpec[]): void {
  localStorage.setItem(STORE, JSON.stringify(sites));
}

export default function App() {
  const [sites, setSites] = useState<SiteSpec[]>(loadSites);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // the forge form
  const [fName, setFName] = useState('');
  const [fStory, setFStory] = useState('');
  const [fType, setFType] = useState<SiteType>('portfolio');
  const [fStone, setFStone] = useState<string>('auto');
  const [forgeNote, setForgeNote] = useState<string | null>(null);

  // the paywall
  const [payOpen, setPayOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [, setUnlockTick] = useState(0); // re-render when an unlock lands

  const spec = useMemo(() => sites.find(s => s.id === currentId) ?? null, [sites, currentId]);

  useEffect(() => {
    document.body.classList.add('a-grain');
  }, []);

  // the return trip from stripe: #/unlock?session_id=cs_... (+ the pending pour in localStorage)
  useEffect(() => {
    const m = location.hash.match(/^#\/unlock\?(.*)$/);
    if (!m) return;
    const sessionId = new URLSearchParams(m[1]).get('session_id');
    const pending = getPending();
    history.replaceState(null, '', location.pathname + location.search);
    if (!sessionId || !pending) {
      setToast('returned from stripe, but no pour was waiting ... if you paid, open your pour and export again.');
      return;
    }
    fetch(`/.netlify/functions/stripe-unlock?session_id=${encodeURIComponent(sessionId)}&project=${encodeURIComponent(pending.projectId)}`)
      .then(r => r.json())
      .then(res => {
        if (res.ok) {
          markUnlocked(pending.projectId, sessionId);
          setPending(null);
          setToast('paid ... this pour is yours. export it, revise it, re-export it ... forever.');
          setUnlockTick(t => t + 1);
        } else {
          setToast('stripe did not confirm that payment ... if you were charged, write to us with the receipt.');
        }
      })
      .catch(() => setToast('the unlock check could not reach home ... try the export again in a moment.'));
  }, []);

  const update = (patch: Partial<SiteSpec>) => {
    if (!spec) return;
    const next = sites.map(s => (s.id === spec.id ? { ...s, ...patch, updatedAt: Date.now() } : s));
    setSites(next);
    saveSites(next);
  };

  const updateSection = (id: string, patch: Partial<SectionInstance>) => {
    if (!spec) return;
    update({ sections: spec.sections.map(s => (s.id === id ? { ...s, ...patch } : s)) });
  };

  const pour = () => {
    if (fName.trim().length < 2 || fStory.trim().length < 24) {
      setForgeNote('bring a real name and at least a few true sentences ... the pour needs material.');
      return;
    }
    const dialect = fStone === 'auto' ? inferDialect(fName, fStory) : dialectById(fStone);
    const s = newSpec(fName.trim(), fStory.trim(), fType, dialect.id, 1);
    const next = [s, ...sites];
    setSites(next);
    saveSites(next);
    setCurrentId(s.id);
    setForgeNote(null);
  };

  const redraft = () => {
    if (!spec) return;
    const seed = spec.seed + 1;
    update({ seed, sections: draftSections(spec.name, spec.story, spec.siteType, seed) });
  };

  const system = useMemo(() => (spec ? forgeSystem(spec) : null), [spec]);
  const floor = useMemo(() => (spec && system ? checkFloor(spec, system) : []), [spec, system]);
  const html = useMemo(() => (spec && system ? composeSite(spec, system, runtimeJs) : ''), [spec, system]);

  const doExport = () => {
    if (!spec || !html) return;
    if (!isUnlocked(spec.id)) {
      setPayOpen(true);
      return;
    }
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.html';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const goPay = () => {
    if (!spec) return;
    if (!PAYMENT_LINK) {
      setToast('payments are not wired yet ... the stripe payment link is missing from this build.');
      return;
    }
    setPending({ projectId: spec.id, at: Date.now() });
    location.href = paymentUrl(spec.id);
  };

  const remove = (id: string) => {
    const next = sites.filter(s => s.id !== id);
    setSites(next);
    saveSites(next);
    if (currentId === id) setCurrentId(null);
  };

  /* ── the forge view ── */
  if (!spec || !system) {
    return (
      <>
        <div className="a-bg" />
        <div className="a-forge">
          <span className="a-eyebrow">eternities · the anti-template-builder</span>
          <h1 className="a-wordmark">velum</h1>
          <p className="a-stand">
            bring a name and a few true sentences ... leave with a complete, breathing site in one
            self-contained file. it cannot make an ugly one.
          </p>
          <p className="a-note a-proof">
            poured with velum, opened raw:
            {' '}<a href="/showcase/meridian-glass.html" target="_blank" rel="noreferrer">meridian glass</a> ·{' '}
            <a href="/showcase/halden-and-ware.html" target="_blank" rel="noreferrer">halden and ware</a> ·{' '}
            <a href="/showcase/sable-park.html" target="_blank" rel="noreferrer">sable park</a>
          </p>

          {sites.length > 0 && (
            <div className="a-saved">
              <h3>the poured</h3>
              {sites.map(s => (
                <div className="row" key={s.id}>
                  <span className="nm">{s.name}</span>
                  {isUnlocked(s.id) && <span className="paid">paid</span>}
                  <span className="meta">
                    {dialectById(s.dialectId).name} · {s.siteType} · {new Date(s.updatedAt).toLocaleDateString()}
                  </span>
                  <button className="a-btn" onClick={() => setCurrentId(s.id)}>open</button>
                  <button className="a-btn danger" onClick={() => remove(s.id)}>delete</button>
                </div>
              ))}
            </div>
          )}

          <label className="a-label" htmlFor="v-name">the name</label>
          <input id="v-name" className="a-input" value={fName} onChange={e => setFName(e.target.value)} placeholder="your name, your studio, your thing" />

          <label className="a-label" htmlFor="v-story">a few true sentences ... who this is, what it makes, why it matters</label>
          <textarea
            id="v-story"
            className="a-area"
            value={fStory}
            onChange={e => setFStory(e.target.value)}
            placeholder="i photograph the hour after everyone leaves. the empty stage, the cooling lights. i want the people who were there to keep the feeling."
          />

          <label className="a-label" htmlFor="v-type">the shape</label>
          <select id="v-type" className="a-select" value={fType} onChange={e => setFType(e.target.value as SiteType)}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <label className="a-label">the stone</label>
          <div className="a-stones">
            <button className={`a-stone${fStone === 'auto' ? ' on' : ''}`} onClick={() => setFStone('auto')}>
              <div className="ramp"><i style={{ background: 'linear-gradient(90deg,#08090e,#750000,#41336b,#2d5f3f,#96702a)' }} /></div>
              <span className="nm">let the words choose</span>
            </button>
            {DIALECTS.map(d => (
              <button key={d.id} className={`a-stone${fStone === d.id ? ' on' : ''}`} onClick={() => setFStone(d.id)} title={d.feel}>
                <div className="ramp">{d.ramp.map((c, i) => <i key={i} style={{ background: c }} />)}</div>
                <span className="nm">{d.name}</span>
              </button>
            ))}
          </div>

          <div className="a-row">
            <button className="a-btn gold" onClick={pour}>pour the site</button>
          </div>
          {forgeNote && <p className="a-note" style={{ color: '#e8b3c0' }}>{forgeNote}</p>}
          <p className="a-note">
            the drafter is a seeded taste engine over curated banks + your own words ... deterministic,
            honest, no model called. placeholders say they are placeholders; everything is editable on the bench.
          </p>
          <p className="a-note">
            free to pour, free to shape. the file itself is a one-time ${PRICE_USD} per site ...
            revisions and re-exports of a paid pour, free forever.
          </p>
        </div>
        {toast && (
          <div className="a-toast" onClick={() => setToast(null)}>
            {toast} <span className="x">dismiss</span>
          </div>
        )}
      </>
    );
  }

  /* ── the bench ── */
  const d = system.dialect;
  return (
    <div className="a-bench">
      <div className="a-rail">
        <button className="a-btn ghost" onClick={() => setCurrentId(null)}>← the forge</button>
        <h1>{spec.name}</h1>
        <span className="sub">{d.name} · {spec.siteType} · seed {spec.seed}</span>

        <div className="a-row">
          <button className="a-btn gold" onClick={doExport}>export the html</button>
          <button className="a-btn" onClick={redraft}>redraft</button>
        </div>
        {isUnlocked(spec.id)
          ? <p className="a-note" style={{ color: 'var(--a-green)' }}>paid ... this pour exports freely, every revision, forever.</p>
          : <p className="a-note">the preview is free. the file is a one-time payment ... every revision after, free forever.</p>}
        <p className="a-note">the preview is the export, byte for byte. redraft re-pours the copy from a new seed; your stone + tuning stay.</p>

        <label className="a-label">the stone</label>
        <div className="a-stones">
          {DIALECTS.map(x => (
            <button key={x.id} className={`a-stone${spec.dialectId === x.id ? ' on' : ''}`} onClick={() => update({ dialectId: x.id })} title={x.feel}>
              <div className="ramp">{x.ramp.map((c, i) => <i key={i} style={{ background: c }} />)}</div>
              <span className="nm">{x.name}</span>
            </button>
          ))}
        </div>

        <label className="a-label" htmlFor="v-cursor">the living cursor</label>
        <select id="v-cursor" className="a-select" value={spec.cursorId} onChange={e => update({ cursorId: e.target.value as CursorId })}>
          {CURSORS.map(c => <option key={c} value={c}>{c === 'dither' ? 'dither (the ground follows the hand)' : c}</option>)}
        </select>

        <div className="a-slider-row">
          <span className="a-mini" style={{ margin: 0 }}>drift</span>
          <input type="range" min={0.4} max={1.6} step={0.05} value={spec.drift} onChange={e => update({ drift: Number(e.target.value) })} />
          <span className="v">{spec.drift.toFixed(2)}x</span>
        </div>
        <div className="a-slider-row">
          <span className="a-mini" style={{ margin: 0 }}>dim</span>
          <input type="range" min={0.5} max={1.1} step={0.02} value={spec.dim} onChange={e => update({ dim: Number(e.target.value) })} />
          <span className="v">{spec.dim.toFixed(2)}</span>
        </div>

        <label className="a-label" htmlFor="v-desc">seo description</label>
        <input id="v-desc" className="a-input" value={spec.description} onChange={e => update({ description: e.target.value })} />

        <label className="a-label">the sections</label>
        {spec.sections.map(s => (
          <SectionEditor key={s.id} s={s} onChange={patch => updateSection(s.id, patch)} />
        ))}
      </div>

      <div className="a-stage">
        <div className="a-stagebar">
          <span>the pour · {d.name}</span>
          <span className="spacer" />
          <span>{(html.length / 1024).toFixed(0)} kb · one file · no cdn scripts, fonts only</span>
        </div>
        <iframe title="the living preview" srcDoc={html} sandbox="allow-scripts allow-same-origin" />
        <div className="a-floor">
          {floor.map(f => (
            <span key={f.law} className={`a-law ${f.held ? 'held' : 'broken'}`} title={f.detail}>
              <span className="dot" />
              {f.law} {f.structural && <span className="st">· by construction</span>}
            </span>
          ))}
        </div>
      </div>
      {payOpen && <PricingModal siteName={spec.name} onPay={goPay} onClose={() => setPayOpen(false)} />}
      {toast && (
        <div className="a-toast" onClick={() => setToast(null)}>
          {toast} <span className="x">dismiss</span>
        </div>
      )}
    </div>
  );
}

/* ── the per-section editor ... small fields, the preview is the star ── */
function SectionEditor({ s, onChange }: { s: SectionInstance; onChange: (p: Partial<SectionInstance>) => void }) {
  const [open, setOpen] = useState(false);
  const title = s.heading ?? s.quoteText ?? s.body ?? s.kind;
  return (
    <div className="a-sec">
      <div className="a-sec-head" onClick={() => setOpen(v => !v)}>
        <span className="k">{s.kind}</span>
        <span className="t">{title}</span>
        <span style={{ color: 'var(--a-ghost)' }}>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="a-sec-body">
          {s.eyebrow !== undefined && (
            <>
              <span className="a-mini">eyebrow</span>
              <input className="a-input" value={s.eyebrow} onChange={e => onChange({ eyebrow: e.target.value })} />
            </>
          )}
          {s.heading !== undefined && (
            <>
              <span className="a-mini">heading</span>
              <input className="a-input" value={s.heading} onChange={e => onChange({ heading: e.target.value })} />
            </>
          )}
          {s.body !== undefined && (
            <>
              <span className="a-mini">body</span>
              <textarea className="a-area" value={s.body} onChange={e => onChange({ body: e.target.value })} />
            </>
          )}
          {s.cta !== undefined && (
            <>
              <span className="a-mini">the invitation</span>
              <input className="a-input" value={s.cta} onChange={e => onChange({ cta: e.target.value })} />
            </>
          )}
          {s.quoteText !== undefined && (
            <>
              <span className="a-mini">the quote</span>
              <textarea className="a-area" value={s.quoteText} onChange={e => onChange({ quoteText: e.target.value })} />
              <span className="a-mini">by</span>
              <input className="a-input" value={s.quoteBy ?? ''} onChange={e => onChange({ quoteBy: e.target.value })} />
            </>
          )}
          {s.contactLine !== undefined && (
            <>
              <span className="a-mini">the line</span>
              <textarea className="a-area" value={s.contactLine} onChange={e => onChange({ contactLine: e.target.value })} />
              <span className="a-mini">email</span>
              <input className="a-input" value={s.email ?? ''} onChange={e => onChange({ email: e.target.value })} />
            </>
          )}
          {s.works && (
            <>
              <span className="a-mini">pieces ... one per line, as title | note</span>
              <textarea
                className="a-area"
                value={s.works.map(w => `${w.title} | ${w.note}`).join('\n')}
                onChange={e =>
                  onChange({
                    works: e.target.value
                      .split('\n')
                      .filter(l => l.trim())
                      .map(l => {
                        const [title, ...rest] = l.split('|');
                        return { title: title.trim(), note: rest.join('|').trim() };
                      }),
                  })
                }
              />
            </>
          )}
          {s.features && (
            <>
              <span className="a-mini">features ... one per line, as title | note</span>
              <textarea
                className="a-area"
                value={s.features.map(f => `${f.title} | ${f.note}`).join('\n')}
                onChange={e =>
                  onChange({
                    features: e.target.value
                      .split('\n')
                      .filter(l => l.trim())
                      .map(l => {
                        const [title, ...rest] = l.split('|');
                        return { title: title.trim(), note: rest.join('|').trim() };
                      }),
                  })
                }
              />
            </>
          )}
          {s.tiers && (
            <>
              <span className="a-mini">tiers ... one per line, as name | price | note | point; point; point</span>
              <textarea
                className="a-area"
                value={s.tiers.map(t => `${t.name} | ${t.price} | ${t.note} | ${t.points.join('; ')}${t.marked ? ' | marked' : ''}`).join('\n')}
                onChange={e =>
                  onChange({
                    tiers: e.target.value
                      .split('\n')
                      .filter(l => l.trim())
                      .map(l => {
                        const parts = l.split('|').map(p => p.trim());
                        return {
                          name: parts[0] ?? '',
                          price: parts[1] ?? '',
                          note: parts[2] ?? '',
                          points: (parts[3] ?? '').split(';').map(p => p.trim()).filter(Boolean),
                          marked: (parts[4] ?? '').toLowerCase() === 'marked',
                        };
                      }),
                  })
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
