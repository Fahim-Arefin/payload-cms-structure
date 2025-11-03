// src/lib/support/hospitalCache.ts
const KEY = 'sl_hospitals_cache_v2' // bump key to avoid clobbering v1
const SIX_HOURS_MS = 6 * 60 * 60 * 1000

// ---------- utils ----------
const toMs = (v: unknown) => {
  const t = typeof v === 'number' ? v : Date.parse(String(v ?? ''))
  return Number.isFinite(t) ? t : NaN
}
const toISO = (ms: number) => new Date(ms).toISOString()

// try multiple possible fields; fall back to now if none exist
const pickItemUpdatedAt = (item: any): number | null => {
  const candidates = [
    item?.updated_at,
    item?.updatedAt,
    item?.last_updated,
    item?.lastUpdated,
    item?.modified_at,
    item?.modifiedAt,
    item?.created_at,
    item?.createdAt,
  ]
  for (const v of candidates) {
    const ms = toMs(v)
    if (Number.isFinite(ms)) return ms
  }
  return null
}

export const getLatestUpdateFromArray = (rows: any[]): number => {
  const times = rows
    .map(pickItemUpdatedAt)
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
  return times.length ? Math.max(...times) : Date.now()
}

// ---------- cache shapes ----------
type HospitalCacheV2 = {
  version: 2
  data: any[]

  // dual fields: ms for math, ISO for readability in localStorage/DevTools
  lastFetchedAtMs: number
  lastFetchedAtISO: string

  windowStartMs: number
  windowStartISO: string

  windowLastUpdateMs: number
  windowLastUpdateISO: string
}

// v1 shape (for migration)
type HospitalCacheV1 = {
  version: 1
  data: any[]
  lastFetchedAt: number
  windowStart: number
  windowLastUpdate: number
}

const migrateV1toV2 = (v1: HospitalCacheV1): HospitalCacheV2 => ({
  version: 2,
  data: v1.data,
  lastFetchedAtMs: v1.lastFetchedAt,
  lastFetchedAtISO: toISO(v1.lastFetchedAt),
  windowStartMs: v1.windowStart,
  windowStartISO: toISO(v1.windowStart),
  windowLastUpdateMs: v1.windowLastUpdate,
  windowLastUpdateISO: toISO(v1.windowLastUpdate),
})

// ---------- IO ----------
export const loadHospitalCache = (): HospitalCacheV2 | null => {
  try {
    // try v2 first
    const rawV2 = localStorage.getItem(KEY)
    if (rawV2) {
      const parsed = JSON.parse(rawV2)
      if (parsed?.version === 2) return parsed as HospitalCacheV2
    }

    // migrate any lingering v1
    const rawV1 = localStorage.getItem('sl_hospitals_cache_v1')
    if (rawV1) {
      const parsedV1 = JSON.parse(rawV1) as HospitalCacheV1
      if (parsedV1?.version === 1) {
        const v2 = migrateV1toV2(parsedV1)
        saveHospitalCache(v2)
        // optional: remove old key
        try { localStorage.removeItem('sl_hospitals_cache_v1') } catch {}
        return v2
      }
    }

    return null
  } catch {
    return null
  }
}

export const saveHospitalCache = (cache: HospitalCacheV2) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache, null, 2)) // pretty-print so dates are readable
  } catch {
    /* ignore quota errors etc. */
  }
}

// ---------- main API ----------
export const upsertHospitalCache = (incoming: any[]): HospitalCacheV2 => {
  const nowMs = Date.now()
  const latestUpdateMs = getLatestUpdateFromArray(incoming)
  const prev = loadHospitalCache()

  if (!prev) {
    const next: HospitalCacheV2 = {
      version: 2,
      data: incoming,
      lastFetchedAtMs: nowMs,
      lastFetchedAtISO: toISO(nowMs),
      windowStartMs: latestUpdateMs,
      windowStartISO: toISO(latestUpdateMs),
      windowLastUpdateMs: latestUpdateMs,
      windowLastUpdateISO: toISO(latestUpdateMs),
    }
    saveHospitalCache(next)
    return next
  }

  const withinWindow = latestUpdateMs - prev.windowStartMs <= SIX_HOURS_MS

  let windowStartMs = withinWindow ? prev.windowStartMs : latestUpdateMs
  let windowLastUpdateMs = Math.max(prev.windowLastUpdateMs, latestUpdateMs)

  // if range exceeded 6h, reset window to the latest
  if (windowLastUpdateMs - windowStartMs > SIX_HOURS_MS) {
    windowStartMs = windowLastUpdateMs
  }

  const next: HospitalCacheV2 = {
    version: 2,
    data: incoming,
    lastFetchedAtMs: nowMs,
    lastFetchedAtISO: toISO(nowMs),
    windowStartMs,
    windowStartISO: toISO(windowStartMs),
    windowLastUpdateMs,
    windowLastUpdateISO: toISO(windowLastUpdateMs),
  }

  saveHospitalCache(next)
  return next
}

// optional helper if you want a small formatter in UI
export const formatISOForBadge = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString() : ''
