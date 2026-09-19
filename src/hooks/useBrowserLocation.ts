'use client'

import { useSyncExternalStore } from 'react'

const listeners = new Set<() => void>()
let stopListening: (() => void) | undefined

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    let pending = false
    let listening = true
    const notify = () => {
      if (pending || !listening) return
      pending = true
      // Next writes history during useInsertionEffect. Notify React only after
      // the current commit finishes, and coalesce multiple writes to the URL.
      queueMicrotask(() => {
        pending = false
        if (listening) listeners.forEach((callback) => callback())
      })
    }
    const history = window.history
    const originalPush = history.pushState
    const originalReplace = history.replaceState

    // Call through to Next's history methods so its router state stays intact.
    const pushState: History['pushState'] = function (this: History, ...args) {
      originalPush.apply(this, args)
      notify()
    }
    const replaceState: History['replaceState'] = function (this: History, ...args) {
      originalReplace.apply(this, args)
      notify()
    }

    history.pushState = pushState
    history.replaceState = replaceState
    window.addEventListener('hashchange', notify)
    window.addEventListener('popstate', notify)
    stopListening = () => {
      listening = false
      if (history.pushState === pushState) history.pushState = originalPush
      if (history.replaceState === replaceState) history.replaceState = originalReplace
      window.removeEventListener('hashchange', notify)
      window.removeEventListener('popstate', notify)
    }
  }

  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      stopListening?.()
      stopListening = undefined
    }
  }
}

const getSnapshot = () => window.location.href
const getServerSnapshot = () => ''

/** Observe the committed URL, including same-page Next links and card selections. */
export function useBrowserLocation() {
  const href = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return href ? new URL(href) : null
}
