'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@payloadcms/ui'

type Props = { children: React.ReactNode }

function ensureStyleTag() {
  const id = 'editor-hide-status-panel'
  let style = document.getElementById(id) as HTMLStyleElement | null

  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }

  style.textContent = `
    /* ✅ Hide ONLY the "Status: ... Unpublish/Revert" item for editors */
    html.role-editor .doc-controls__meta > li.doc-controls__status {
      display: none !important;
    }
  `
}

export function AdminRoleStylesProvider({ children }: Props) {
  const { user } = useAuth()

  useEffect(() => {
    ensureStyleTag()

    const isEditor = (user as any)?.role === 'editor'
    document.documentElement.classList.toggle('role-editor', isEditor)
  }, [user])

  return <>{children}</>
}
