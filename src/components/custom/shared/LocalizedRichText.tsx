// src/components/i18n/LocalizedRichText.tsx
'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import useMounted from '@/hooks/useMounted'
import { useLanguage } from '@/context/LanguageContext'

type Props = {
  en?: any | null
  bn?: any | null
  className?: string
}

/** SSR renders EN; after mount swaps to selected language. */
export default function LocalizedRichText({ en, bn, className }: Props) {
  const mounted = useMounted()
  const { language } = useLanguage()
  const data = !mounted
    ? (en ?? bn ?? null)
    : language === 'en'
      ? (en ?? bn ?? null)
      : (bn ?? en ?? null)
  if (!data) return null
  return <RichText data={data as any} className={className} />
}