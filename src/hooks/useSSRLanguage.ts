// src/hooks/useSSRLanguage.ts
'use client'

import useMounted from '@/hooks/useMounted'
import { useLanguage } from '@/context/LanguageContext'

export default function useSSRLanguage() {
  const { language } = useLanguage()
  const mounted = useMounted()
  // 👇 SSR fallback is EN to avoid hydration mismatch
  return mounted ? language : 'en'
}