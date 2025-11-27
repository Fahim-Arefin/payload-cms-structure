// // src/utils/media/triggerMediaTemporaryPurge.ts

// /**
//  * Fire-and-forget call to the purge endpoint that deletes all media where temporary === true.
//  * Safe to call from collection onAfterChange hooks.
//  */
// export function triggerMediaTemporaryPurge(req?: any): void {
//   try {
//     // Build base URL (prefer env for reliability across environments)
//     const host = (req?.headers?.host as string) || ''
//     const proto = (req?.headers?.['x-forwarded-proto'] as string) || 'https'
//     const base = process.env.API_URL || (host ? `${proto}://${host}` : '')

//     if (!base) return

//     // Fire-and-forget
//     fetch(`${base}/api/media/purge-temporary`, {
//       method: 'POST',
//       cache: 'no-store',
//     }).catch(() => {
//       // ignore purge failures so the save never fails
//     })
//   } catch {
//     // swallow — never block the doc save
//   }
// }

// =============================================================================
// =============================================================================
// =============================================================================

// src/utils/media/triggerMediaTemporaryPurge.ts
/**
 * Fire-and-forget call to the purge endpoint that deletes all media where temporary === true.
 * Safe to call from collection onAfterChange hooks.
 */
export function triggerMediaTemporaryPurge(req?: any): void {
  try {
    const host = (req?.headers?.host as string) || ''
    const proto = (req?.headers?.['x-forwarded-proto'] as string) || 'https'
    const base = process.env.API_URL || (host ? `${proto}://${host}` : '')

    if (!base) return

    fetch(`${base}/api/media/purge-temporary`, {
      method: 'POST',
      cache: 'no-store',
    }).catch(() => {})
  } catch {}
}
