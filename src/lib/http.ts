// src/lib/http.ts
export function getClientIP(req: any): string {
  try {
    // Fetch API Headers object?
    const h: any = req?.headers
    if (h && typeof h.get === 'function') {
      const xff = h.get('x-forwarded-for')
      if (xff) return String(xff).split(',')[0].trim()
      const real = h.get('x-real-ip')
      if (real) return String(real).trim()
    }

    // Node/Express-like headers object?
    const raw = req?.headers?.['x-forwarded-for']
    if (Array.isArray(raw)) return raw[0]
    if (typeof raw === 'string' && raw) return raw.split(',')[0].trim()

    // Fallbacks commonly present on Node req
    return (
      (req as any)?.ip ??
      (req as any)?.socket?.remoteAddress ??
      (req as any)?.connection?.remoteAddress ??
      ''
    )
  } catch {
    return ''
  }
}
