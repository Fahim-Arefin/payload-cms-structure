'use client'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

export default function DropdownPortal({
  open,
  children,
  position,
}: {
  open: boolean
  children: React.ReactNode
  position: { top: number; left: number }
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !open) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body,
  )
}
