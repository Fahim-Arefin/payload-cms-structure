'use client'

import NoDataFound from '@/components/custom/shared/NoDataFound'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { News, NewsCategory, NewsTag } from '@/payload-types'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AllNewsClientCard from './AllNewsClientCard'
import Sidebar from './Sidebar'

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
  block: AllNewsBlockType
  data: News
  categoriesData: NewsCategory
  tagsData: NewsTag
}

const PER_PAGE = 3

function AllNewsClient({ block, data, categoriesData, tagsData }: Props) {
  const [eventType, setEventType] = useState<EventFilter>('all')
  const [search, setSearch] = useState('')
  const [categoryKey, setCategoryKey] = useState('')
  const [tagKey, setTagKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const newsItems = (data?.newsItems ?? []) as NewsItem[]
  const categories = categoriesData?.categories ?? []
  const tags = tagsData?.tags ?? []

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase()

    return newsItems.filter((item) => {
      const matchesEvent = eventType === 'all' ? true : item?.eventType === eventType

      const matchesSearch = query
        ? [item?.title1, item?.title2, item?.categoryName, item?.category?.label, item?.tag?.label]
            .filter(Boolean)
            .some((text) => String(text).toLowerCase().includes(query))
        : true

      const matchesCategory = categoryKey ? item?.categoryKey === categoryKey : true
      const matchesTag = tagKey ? item?.tagKey === tagKey : true

      return matchesEvent && matchesSearch && matchesCategory && matchesTag
    })
  }, [newsItems, eventType, search, categoryKey, tagKey])

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / PER_PAGE))

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE
    const end = start + PER_PAGE

    return filteredNews.slice(start, end)
  }, [filteredNews, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [eventType, search, categoryKey, tagKey])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const resetFilters = () => {
    setEventType('all')
    setSearch('')
    setCategoryKey('')
    setTagKey('')
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(nextPage)
  }

  const sidebarProps = {
    newsItems,
    categories,
    tags,
    eventType,
    search,
    categoryKey,
    tagKey,
    onEventTypeChange: setEventType,
    onSearchChange: setSearch,
    onCategoryChange: setCategoryKey,
    onTagChange: setTagKey,
    onReset: resetFilters,
  }

  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding">
        {/* Mobile filter drawer button */}
        <div className="mb-4 flex justify-end lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                className="rounded-none bg-cyan text-dark-1 hover:bg-dark-1 hover:text-white-1"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[80vw] max-w-[420px] overflow-y-auto bg-white-2 p-0"
            >
              <SheetHeader className="border-b border-white-3 p-4">
                <SheetTitle className="font-proxima text-dark-1">Filter News</SheetTitle>
              </SheetHeader>

              <Sidebar {...sidebarProps} />
            </SheetContent>
          </Sheet>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3
          gap-4 xl:gap-8 2xl:gap-14"
        >
          <div
            className="col-span-1 lg:col-span-2
            space-y-4 xl:space-y-8 2xl:space-y-14"
          >
            {paginatedNews.length > 0 ? (
              <>
                {paginatedNews.map((item, index) => (
                  <AllNewsClientCard key={item?.id || index} item={item} block={block} />
                ))}

                {totalPages > 1 && (
                  <div className="flex items-center gap-2 pt-2 xl:pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                      className="h-8 w-8 rounded-none border border-dark-1/20 bg-white-1 p-0 text-dark-1 hover:bg-cyan hover:text-white-1 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1
                      const active = page === currentPage

                      return (
                        <Button
                          key={page}
                          type="button"
                          variant="ghost"
                          onClick={() => goToPage(page)}
                          className={[
                            'h-8 w-8 rounded-none border p-0 font-manrope text-xs transition-all',
                            active
                              ? 'border-cyan bg-cyan text-white-1'
                              : 'border-dark-1/20 bg-white-1 text-dark-1 hover:bg-cyan hover:text-white-1',
                          ].join(' ')}
                        >
                          {page}
                        </Button>
                      )
                    })}

                    <Button
                      type="button"
                      variant="ghost"
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage(currentPage + 1)}
                      className="h-8 w-8 rounded-none border border-dark-1/20 bg-white-1 p-0 text-dark-1 hover:bg-cyan hover:text-white-1 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <NoDataFound
                message="No News Found"
                description="Try changing your search, category, tag, or event filter."
                bgColor={block?.backgroundColor || ''}
              />
            )}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:col-span-1 lg:block">
            <Sidebar {...sidebarProps} />
          </div>
        </div>
      </div>
    </WithHashScroller>
  )
}

export default AllNewsClient
