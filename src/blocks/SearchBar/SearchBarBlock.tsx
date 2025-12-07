// import SearchBarSection from '@/components/custom/home/SearchBarSection'
// import { SearchBarBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'

// type Props = {
//   block: SearchBarBlockType
//   params: Record<string, string>
// }

// function SearchBarBlock({ block }: Props) {
//   return (
//     <div>
//       <SearchBarSection />
//     </div>
//   )
// }

// export default SearchBarBlock

// ================================================================================
// ================================================================================
// ================================================================================
// src/components/blocks/SearchBarBlock.tsx
import React from 'react'
import SearchBarSection from '@/components/custom/home/SearchBarSection'
import { SearchBarBlockType } from '@/types/payloadCustomTypes'
import { pagesListTag } from '@/lib/cacheTags'

type Props = {
  block: SearchBarBlockType
  params: Record<string, string>
}

export type SearchSuggestion = {
  label: string
  url: string
}

const slugToUrl = (slug: string): string => {
  if (!slug || slug === 'index') return '/'
  return `/${slug.replace(/^\/+/, '')}`
}

async function fetchSearchSuggestions(): Promise<SearchSuggestion[]> {
  const baseURL = process.env.API_URL ?? 'http://localhost:3000'

  const url = new URL('/api/pages', baseURL)

  // only published pages
  url.searchParams.set('where[_status][equals]', 'published')

  // no relational populate
  url.searchParams.set('depth', '0')

  // limit number of pages
  url.searchParams.set('limit', '200')

  // ✅ CORRECT WAY: tell Payload to include only `name` and `slug`
  url.searchParams.set('select[name]', 'true')
  url.searchParams.set('select[slug]', 'true')

  const res = await fetch(url.toString(), {
    next: { tags: [pagesListTag] },
  })

  if (!res.ok) {
    console.error('Failed to fetch pages for search bar', res.status, await res.text())
    return []
  }

  const json = (await res.json()) as { docs?: any[] }

  const out: SearchSuggestion[] = []

  for (const page of json.docs ?? []) {
    const rawSlug = page?.slug
    const rawName = page?.name

    const slug = (rawSlug ?? '').toString().trim()
    const name = (rawName ?? '').toString().trim()

    if (!slug || !name) continue

    out.push({
      label: name, // what user sees & searches
      url: slugToUrl(slug), // actual route
    })
  }

  return out
}

async function SearchBarBlock({ block }: Props) {
  const suggestions = await fetchSearchSuggestions()

  return (
    <SearchBarSection
      suggestions={suggestions}
      backgroundColor={block.backgroundColor || '#FFFFFF'}
    />
  )
}

export default SearchBarBlock
