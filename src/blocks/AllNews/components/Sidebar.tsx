'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { News, NewsCategory, NewsTag } from '@/payload-types'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'

type NewsItem = NonNullable<News['newsItems']>[number] & {
  category?: {
    label?: string
    key?: string
  } | null
  tag?: {
    label?: string
    key?: string
  } | null
}

type EventFilter = 'all' | 'blog' | 'vlog'

type Props = {
  newsItems: NewsItem[]
  categories: NewsCategory['categories']
  tags: NewsTag['tags']

  eventType: EventFilter
  search: string
  categoryKey: string
  tagKey: string

  onEventTypeChange: (value: EventFilter) => void
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onTagChange: (value: string) => void
  onReset: () => void
}

function formatSidebarDate(date?: string | null) {
  if (!date) return ''

  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''

  return d
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase()
}

function Sidebar({
  newsItems,
  categories,
  tags,
  eventType,
  search,
  categoryKey,
  tagKey,
  onEventTypeChange,
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onReset,
}: Props) {
  const relatedPosts = useMemo(() => {
    return [...newsItems]
      .sort((a, b) => {
        const aDate = new Date(a?.releaseDate || '').getTime()
        const bDate = new Date(b?.releaseDate || '').getTime()

        return (Number.isNaN(bDate) ? 0 : bDate) - (Number.isNaN(aDate) ? 0 : aDate)
      })
      .slice(0, 3)
  }, [newsItems])

  const categoryCounts = useMemo(() => {
    return newsItems.reduce<Record<string, number>>((acc, item) => {
      const key = String(item?.categoryKey || '').trim()
      if (!key) return acc

      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  }, [newsItems])

  const tagCounts = useMemo(() => {
    return newsItems.reduce<Record<string, number>>((acc, item) => {
      const key = String(item?.tagKey || '').trim()
      if (!key) return acc

      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  }, [newsItems])

  const hasActiveFilters = eventType !== 'all' || search || categoryKey || tagKey

  return (
    <aside className="w-full space-y-2 xl:space-y-4 2xl:space-y-6">
      {/* Event selector */}
      <div className="bg-cyan px-1 w-[130px] mt-2 lg:mt-0">
        <Select
          value={eventType}
          onValueChange={(value) => onEventTypeChange(value as EventFilter)}
        >
          <SelectTrigger className="h-10  rounded-none border-none bg-cyan text-dark-1 font-manrope text-xs uppercase shadow-none focus:ring-0">
            <SelectValue placeholder="Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Events</SelectItem>
            <SelectItem value="blog">Blog</SelectItem>
            <SelectItem value="vlog">Vlog</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="bg-bg-1 p-4 xl:p-6 2xl:p-7">
        <h3 className="font-proxima font-bold text-dark-1 text-base xl:text-lg">Search here</h3>

        <div className="mt-4 flex bg-white-1">
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search here"
            className="h-11 rounded-none border border-white-3 bg-white-1 font-manrope text-xs shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            variant="ghost"
            className="h-11 w-12 rounded-none border border-l-0 border-white-3 bg-white-1 hover:bg-white-2"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-dark-1" />
          </Button>
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="mt-3 h-auto rounded-none px-0 py-0 font-manrope text-xs text-cyan hover:bg-transparent hover:text-dark-1"
          >
            Clear all filters
          </Button>
        )}
      </div>

      {/* Related posts */}
      <div className="bg-bg-1 p-4 xl:p-6 2xl:p-7">
        <h3 className="font-proxima font-bold text-dark-1 text-base xl:text-lg">Related post</h3>

        <div className="mt-4 space-y-3">
          {relatedPosts.map((post, index) => {
            const thumbnail =
              typeof post?.thumbnailImage === 'object' && post?.thumbnailImage?.url
                ? post.thumbnailImage
                : null

            return (
              <button
                key={post?.id || index}
                type="button"
                onClick={() => onSearchChange(post?.title1 || '')}
                className="grid w-full grid-cols-[68px_1fr] gap-3 text-left"
              >
                <div className="relative h-[68px] w-[68px] bg-white-3">
                  {thumbnail?.url && (
                    <Image
                      src={thumbnail.url}
                      alt={post?.title1 || 'Related post'}
                      fill
                      sizes="68px"
                      className="object-cover"
                      placeholder={post?.thumbnailImageBlurDataURL ? 'blur' : 'empty'}
                      blurDataURL={post?.thumbnailImageBlurDataURL || undefined}
                    />
                  )}
                </div>

                <div>
                  <div className="font-proxima font-bold text-dark-1 text-xs xl:text-sm leading-[140%]">
                    {post?.title1}
                  </div>
                  <div className="mt-1 font-manrope text-dark-3 text-[11px] uppercase">
                    {formatSidebarDate(post?.releaseDate)}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-bg-1 p-4 xl:p-6 2xl:p-7">
        <h3 className="font-proxima font-bold text-dark-1 text-base xl:text-lg">Categories</h3>

        <div
          className="
         mt-4 space-y-3 overflow-y-auto pr-1
    max-h-[220px]
    md:max-h-[240px]
    xl:max-h-[280px]
    2xl:max-h-[320px]
        "
        >
          <button
            type="button"
            onClick={() => onCategoryChange('')}
            className={[
              'flex h-10 w-full items-center justify-between bg-white-1 px-4 text-left font-manrope text-xs transition-all',
              !categoryKey ? 'text-cyan' : 'text-dark-1 hover:text-cyan',
            ].join(' ')}
          >
            <span>All Categories</span>
            <span>({newsItems.length.toString().padStart(2, '0')})</span>
          </button>

          {categories?.map((category) => {
            const key = category?.key || ''
            const count = categoryCounts[key] || 0
            const active = categoryKey === key

            return (
              <button
                key={key}
                type="button"
                onClick={() => onCategoryChange(active ? '' : key)}
                className={[
                  'flex h-10 w-full items-center justify-between bg-white-1 px-4 text-left font-manrope text-xs transition-all',
                  active ? 'text-cyan' : 'text-dark-1 hover:text-cyan',
                ].join(' ')}
              >
                <span>{category?.label}</span>
                <span>({String(count).padStart(2, '0')})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-bg-1 p-4 xl:p-6 2xl:p-7">
        <h3 className="font-proxima font-bold text-dark-1 text-base xl:text-lg">Tags</h3>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onTagChange('')}
            className={[
              'px-2 py-1 font-manrope text-[11px] transition-all',
              !tagKey
                ? 'bg-cyan text-white-1'
                : 'bg-white-1 text-dark-1 hover:bg-cyan hover:text-white-1',
            ].join(' ')}
          >
            All
          </button>

          {tags &&
            tags.map((tag) => {
              const key = tag?.key || ''
              const active = tagKey === key
              const count = tagCounts[key] || 0

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onTagChange(active ? '' : key)}
                  className={[
                    'px-2 py-1 font-manrope text-[11px] transition-all',
                    active
                      ? 'bg-cyan text-white-1'
                      : 'bg-white-1 text-dark-1 hover:bg-cyan hover:text-white-1',
                  ].join(' ')}
                  title={`${count} post${count === 1 ? '' : 's'}`}
                >
                  {tag?.label}
                </button>
              )
            })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
