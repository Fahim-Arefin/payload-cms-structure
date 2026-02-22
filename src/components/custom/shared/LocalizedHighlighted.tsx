// src/components/i18n/LocalizedHighlighted.tsx
'use client'

import { ElementType } from 'react'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { highlightText } from '@/components/custom/shared/highlightText'

type Props = {
  textEn?: string | null
  textBn?: string | null
  highlightEn?: string | null
  highlightBn?: string | null
  as?: ElementType
  className?: string
  highlightClassName?: string
  all?: boolean // pass through to highlightText (default: false)
}

export default function LocalizedHighlighted({
  textEn,
  textBn,
  highlightEn,
  highlightBn,
  as: Tag = 'span',
  className,
  highlightClassName = 'text-cyan',
  all = false,
}: Props) {
  const lang = useSSRLanguage()
  // const base = lang === 'en' ? (textEn ?? textBn ?? '') : (textBn ?? textEn ?? '')
  const base = lang === 'en' ? (textEn ?? '') : (textBn ?? '')
  const marker = lang === 'en' ? (highlightEn ?? '') : (highlightBn ?? '')

  return <Tag className={className}>{highlightText(base, marker, { highlightClassName, all })}</Tag>
}
