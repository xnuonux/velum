// velum ... the pricing modal. shown when a maker asks for the file before the
// pour is paid. the pitch is short because the preview behind it is the pitch.
import { PRICE_USD } from './config';

export default function PricingModal({ siteName, onPay, onClose }: {
  siteName: string;
  onPay: () => void;
  onClose: () => void;
}) {
  return (
    <div className="a-overlay" onClick={onClose}>
      <div className="a-modal" onClick={e => e.stopPropagation()}>
        <span className="a-eyebrow">the pour is yours to keep</span>
        <h2>{siteName}</h2>
        <p>
          the preview behind this window is the exact file you would leave with ... byte for byte.
          one payment, <strong>${PRICE_USD}</strong>, and the pour is unlocked forever:
        </p>
        <ul>
          <li>the self-contained html file ... yours outright, no lock-in, no telemetry</li>
          <li>every revision and re-export of this pour, free, forever</li>
          <li>deploy it anywhere ... it is one file and it needs nothing</li>
        </ul>
        <div className="a-row">
          <button className="a-btn gold" onClick={onPay}>pay ${PRICE_USD} ... unlock this pour</button>
          <button className="a-btn ghost" onClick={onClose}>keep shaping</button>
        </div>
        <p className="a-note">
          payment runs through stripe; you land back here and the export opens.
          the lock is an honest one, not a vault ... we would rather trust you than surveil you.
        </p>
      </div>
    </div>
  );
}
