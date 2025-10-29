// src/components/i18n/LocalizedString.tsx
'use client'

import { Fragment } from 'react'
import useMounted from '@/hooks/useMounted'
import { useLanguage } from '@/context/LanguageContext'

type Props = {
  en?: string | null
  bn?: string | null
}

/** SSR: renders EN; after mount: swaps to selected language */
export default function LocalizedString({ en, bn }: Props) {
  const mounted = useMounted()
  const { language } = useLanguage()
  const text = !mounted ? (en ?? bn ?? '') : language === 'en' ? (en ?? '') : (bn ?? '')
  return <Fragment>{text}</Fragment>
}
