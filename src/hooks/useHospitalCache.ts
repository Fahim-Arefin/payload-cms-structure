// src/lib/support/useHospitalsCache.ts
'use client'

import { loadHospitalCache, upsertHospitalCache } from '@/lib/hospitalCache'
import { useEffect, useMemo, useState } from 'react'

export default function useHospitalsCache<T extends any[]>(
  freshHospitals: T | null | undefined,
) {
  const [cached, setCached] = useState(() => loadHospitalCache())

  useEffect(() => {
    if (!freshHospitals || !Array.isArray(freshHospitals)) return
    const next = upsertHospitalCache(freshHospitals)
    setCached(next)
  }, [JSON.stringify(freshHospitals)])

  const data = useMemo(() => cached?.data ?? freshHospitals ?? [], [cached, freshHospitals])

  return {
    data,
    // ms + iso available for UI/badges if needed
    lastFetchedAtMs: cached?.lastFetchedAtMs ?? null,
    lastFetchedAtISO: cached?.lastFetchedAtISO ?? null,
    windowStartMs: cached?.windowStartMs ?? null,
    windowStartISO: cached?.windowStartISO ?? null,
    windowLastUpdateMs: cached?.windowLastUpdateMs ?? null,
    windowLastUpdateISO: cached?.windowLastUpdateISO ?? null,
  }
}
