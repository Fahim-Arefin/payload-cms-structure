// src/lib/http.ts
import type { PayloadRequest } from 'payload'

export function getClientIP(req: PayloadRequest | any): string {
  try {
    const h: any = req?.headers
    // Fetch Headers (Next 15 / node-fetch style)
    if (h && typeof h.get === 'function') {
      return (
        h.get('x-forwarded-for') ||
        h.get('x-real-ip') ||
        (req as any).ip ||
        (req?.socket as any)?.remoteAddress ||
        ''
      )
    }
    // Plain object headers
    const xff = h?.['x-forwarded-for']
    const real = h?.['x-real-ip']
    return (
      (Array.isArray(xff) ? xff.join(', ') : xff) ||
      real ||
      (req as any).ip ||
      (req?.socket as any)?.remoteAddress ||
      ''
    )
  } catch {
    return ''
  }
}
