// src/lib/cacheDebug.ts
export const CACHE_DEBUG = process.env.CACHE_DEBUG === '1' || process.env.NODE_ENV === 'development'

export function logCacheMiss(key: string, extra?: Record<string, unknown>) {
  //   if (!CACHE_DEBUG) return
  const time = new Date().toISOString()
  console.log(`[CACHE MISS] ${time} -> ${key}`, extra ?? '')
}
