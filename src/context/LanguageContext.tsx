// 'use client'

// import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

// export type Language = 'en' | 'bn'

// type Ctx = {
//   language: Language
//   setLanguage: (lang: Language) => void
//   toggleLanguage: () => void
// }

// const LanguageContext = createContext<Ctx | null>(null)

// const STORAGE_KEY = 'lang'
// const COOKIE_NAME = 'lang'

// export function LanguageProvider({
//   children,
//   initial = 'en', // 👈 server-stable default
// }: {
//   children: ReactNode
//   initial?: Language
// }) {
//   const [language, setLanguage] = useState<Language>(initial)

//   // After mount, sync from localStorage or cookie (no SSR mismatch)
//   useEffect(() => {
//     try {
//       const fromStorage = localStorage.getItem(STORAGE_KEY)
//       const fromCookie = document.cookie.match(/(?:^|;\s*)lang=(en|bn)(?:;|$)/)?.[1]
//       const next =
//         fromStorage === 'en' || fromStorage === 'bn'
//           ? (fromStorage as Language)
//           : fromCookie === 'en' || fromCookie === 'bn'
//             ? (fromCookie as Language)
//             : initial

//       if (next !== language) setLanguage(next)
//     } catch {
//       /* noop */
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []) // run once after mount

//   // Persist on change
//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, language)
//       const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
//       document.cookie = `${COOKIE_NAME}=${language}; path=/; SameSite=Lax; expires=${expires}`
//     } catch {}
//   }, [language])

//   const value = useMemo<Ctx>(
//     () => ({
//       language,
//       setLanguage: (lang: Language) => setLanguage(lang),
//       toggleLanguage: () => setLanguage((p) => (p === 'en' ? 'bn' : 'en')),
//     }),
//     [language],
//   )

//   return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
// }

// export function useLanguage() {
//   const ctx = useContext(LanguageContext)
//   if (!ctx) throw new Error('useLanguage must be used within <LanguageProvider>')
//   return ctx
// }

// ====================================================================================
// ====================================================================================
// ====================================================================================

'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'en' | 'bn'

type Ctx = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<Ctx | null>(null)

const STORAGE_KEY = 'lang'
const COOKIE_NAME = 'lang'

export function LanguageProvider({
  children,
  initial = 'en',
}: {
  children: ReactNode
  initial?: Language
}) {
  const [language, setLanguage] = useState<Language>(initial)

  // After mount: restore from storage/cookie (this does NOT affect SSR markup)
  useEffect(() => {
    try {
      const fromStorage = localStorage.getItem(STORAGE_KEY)
      const fromCookie = document.cookie.match(/(?:^|;\s*)lang=(en|bn)(?:;|$)/)?.[1]
      const next =
        fromStorage === 'en' || fromStorage === 'bn'
          ? (fromStorage as Language)
          : fromCookie === 'en' || fromCookie === 'bn'
            ? (fromCookie as Language)
            : initial
      if (next !== language) setLanguage(next)
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist on change (client only)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
      document.cookie = `${COOKIE_NAME}=${language}; path=/; SameSite=Lax; expires=${expires}`
    } catch {}
  }, [language])

  const value = useMemo<Ctx>(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within <LanguageProvider>')
  return ctx
}