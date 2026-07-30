// velum ... the entitlement: which pours are paid. pay once per site; revisions
// and re-exports of a paid site stay free forever. the record lives in
// localStorage, sovereign like the sites themselves. it is an honest lock, not
// a vault ... the trust model is the honest customer, and it says so.
const UNLOCKS = 'velum.unlocks';
const PENDING = 'velum.pendingUnlock';

export interface PendingUnlock {
  projectId: string;
  at: number;
}

/** projectId -> stripe session id that paid for it */
export function loadUnlocks(): Record<string, string> {
  try {
    const raw = localStorage.getItem(UNLOCKS);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    console.error('[velum] unlock store degraded ... treating all pours as locked');
    return {};
  }
}

export function isUnlocked(projectId: string): boolean {
  return Boolean(loadUnlocks()[projectId]);
}

export function markUnlocked(projectId: string, sessionId: string): void {
  const next = { ...loadUnlocks(), [projectId]: sessionId };
  localStorage.setItem(UNLOCKS, JSON.stringify(next));
}

/** the purchase in flight, stored before the hand-off to stripe so the return trip knows which pour it was for */
export function setPending(p: PendingUnlock | null): void {
  if (p) localStorage.setItem(PENDING, JSON.stringify(p));
  else localStorage.removeItem(PENDING);
}

export function getPending(): PendingUnlock | null {
  try {
    const raw = localStorage.getItem(PENDING);
    return raw ? (JSON.parse(raw) as PendingUnlock) : null;
  } catch {
    return null;
  }
}
