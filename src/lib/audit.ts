// src/lib/audit.ts
import type { PayloadRequest } from 'payload'

/** omit sensitive keys from user snapshots stored in audit.diff */
const SENSITIVE_KEYS = new Set([
  'hash',
  'salt',
  'password',
  'resetPasswordToken',
  'resetPasswordExpiration',
  'verificationToken',
  'verificationTokenExpiration',
  'token',
  'loginAttempts',
])

function deepOmit(obj: any): any {
  if (obj == null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(deepOmit)
  const out: any = {}
  for (const [k, v] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(k)) continue
    out[k] = deepOmit(v)
  }
  return out
}

export function sanitizeUserSnapshot<T = any>(snap: T): T {
  return deepOmit(snap)
}

/** return true if ALL changed fields are benign (login/logout stamps only) */
export function onlyBenignUserUpdate(before: any, after: any): boolean {
  if (!before || !after) return false
  const benign = new Set(['lastLoginAt', 'lastLogoutAt', 'updatedAt', 'loginAttempts'])
  const changed = new Set<string>()
  const keys = new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})])

  for (const k of keys) {
    const a = (before as any)?.[k]
    const b = (after as any)?.[k]
    // stringify to keep it simple and robust for dates
    if (JSON.stringify(a) !== JSON.stringify(b)) changed.add(k)
  }
  if (!changed.size) return false
  for (const k of changed) if (!benign.has(k)) return false
  return true
}

/** find if an identical auth audit (login/logout) exists very recently */
export async function recentAuthAuditExists(
  req: PayloadRequest | any,
  actorId: string | null,
  action: 'login' | 'logout',
  windowMs = 5000,
): Promise<boolean> {
  if (!actorId) return false
  const cutoff = new Date(Date.now() - windowMs).toISOString()
  try {
    const res = await req.payload.find({
      collection: 'audit-logs',
      limit: 1,
      depth: 0,
      where: {
        and: [
          { action: { equals: action } },
          { actor: { equals: actorId } },
          { createdAt: { greater_than: cutoff } },
        ],
      },
    })
    return (res?.docs?.length ?? 0) > 0
  } catch {
    return false
  }
}
