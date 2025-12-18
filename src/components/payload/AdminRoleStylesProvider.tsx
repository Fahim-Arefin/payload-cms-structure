// // working code
// 'use client'

// import React, { useEffect } from 'react'
// import { useAuth } from '@payloadcms/ui'

// type Props = { children: React.ReactNode }

// function ensureStyleTag() {
//   const id = 'editor-hide-status-panel'
//   let style = document.getElementById(id) as HTMLStyleElement | null

//   if (!style) {
//     style = document.createElement('style')
//     style.id = id
//     document.head.appendChild(style)
//   }

//   style.textContent = `
//     /* ✅ Hide ONLY the "Status: ... Unpublish/Revert" item for editors */
//     html.role-editor .doc-controls__meta > li.doc-controls__status {
//       display: none !important;
//     }
//   `
// }

// export function AdminRoleStylesProvider({ children }: Props) {
//   const { user } = useAuth()

//   useEffect(() => {
//     ensureStyleTag()

//     const isEditor = (user as any)?.role === 'editor'
//     document.documentElement.classList.toggle('role-editor', isEditor)
//   }, [user])

//   return <>{children}</>
// }

// ============================================================
// ============================================================
// ============================================================

'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@payloadcms/ui'

type Props = { children: React.ReactNode }

function ensureStyleTag() {
  const id = 'editor-hide-publish-ui'
  let style = document.getElementById(id) as HTMLStyleElement | null

  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }

  style.textContent = `
    /* =========================
       EDIT DOC HEADER (you already wanted this)
       Hide ONLY status panel li
    ========================== */
    html.role-editor .doc-controls__meta > li.doc-controls__status {
      display: none !important;
    }

    /* =========================
       LIST VIEW (bulk actions)
       Try to hide publish/unpublish controls by common patterns
    ========================== */
    html.role-editor a[href*="publish"],
    html.role-editor button[type="button"][class*="publish"] {
      display: none !important;
      pointer-events: none !important;
    }
  `
}

/**
 * Fallback for list view bulk actions:
 * hide elements that literally show "Publish" or "Unpublish" in the UI.
 */
function hideBulkPublishUnpublishByText() {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>('a, button'))

  for (const el of candidates) {
    const text = (el.textContent || '').trim().toLowerCase()

    // Match exactly what you see in the list top-right actions
    if (text === 'publish' || text === 'unpublish') {
      el.style.display = 'none'
      el.setAttribute('data-hidden-by-role', 'editor-bulk-publish')
    }
  }
}

function restoreHidden() {
  document
    .querySelectorAll<HTMLElement>('[data-hidden-by-role="editor-bulk-publish"]')
    .forEach((el) => {
      el.style.display = ''
      el.removeAttribute('data-hidden-by-role')
    })
}

export function AdminRoleStylesProvider({ children }: Props) {
  const { user } = useAuth()

  useEffect(() => {
    ensureStyleTag()

    const isEditor = (user as any)?.role === 'editor'
    document.documentElement.classList.toggle('role-editor', isEditor)

    // Cleanup old hides
    restoreHidden()
    if (!isEditor) return

    // Run once
    hideBulkPublishUnpublishByText()

    // Re-run on navigation/rerenders
    const obs = new MutationObserver(() => hideBulkPublishUnpublishByText())
    obs.observe(document.body, { childList: true, subtree: true })

    return () => obs.disconnect()
  }, [user])

  return <>{children}</>
}
