// src/components/header/ServerTopHeader.tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import TopHeader from './TopHeader'
import { GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'

export type HeaderLink = { label: string; labelBN: string; href: string }
export type HeaderData = {
  showLocalizationToggle: boolean
  links: HeaderLink[]
}

export default async function ServerTopHeader({ className }: { className?: string }) {
  const payload = await getPayload({ config: await config })
  const data = await payload.findGlobal({
    slug: GLOBAL_HEADER_SLUG_AND_TAG,
    depth: 0,
  })

  const safe: HeaderData = {
    showLocalizationToggle: Boolean(data?.showLocalizationToggle ?? true),
    links: Array.isArray(data?.links)
      ? data.links.map((l: any) => ({
          label: String(l?.label ?? ''),
          labelBN: String(l?.labelBN ?? ''),
          href: String(l?.href ?? '#'),
        }))
      : [],
  }

  return <TopHeader className={className} data={safe} />
}
