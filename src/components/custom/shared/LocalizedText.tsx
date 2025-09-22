// src/components/i18n/LocalizedText.tsx
'use client'

import { ElementType, ReactNode } from 'react'
import useSSRLanguage from '@/hooks/useSSRLanguage'

type Props = {
  en?: string | null
  bn?: string | null
  as?: ElementType
  className?: string
  childrenPrefix?: ReactNode
  childrenSuffix?: ReactNode
}

export default function LocalizedText({
  en,
  bn,
  as: Tag = 'span',
  className,
  childrenPrefix,
  childrenSuffix,
}: Props) {
  const lang = useSSRLanguage()
  const text = lang === 'en' ? (en ?? bn ?? '') : (bn ?? en ?? '')
  return (
    <Tag className={className}>
      {childrenPrefix}
      {text}
      {childrenSuffix}
    </Tag>
  )
}