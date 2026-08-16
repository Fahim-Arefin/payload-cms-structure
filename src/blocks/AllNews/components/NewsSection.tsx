// 'use client'

// import { News, NewsTag } from '@/payload-types'
// import { AllNewsBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import ArrowRightColored from 'public/assets/icons/arrowRightColored.png'
// import DownArrowWhite from 'public/assets/icons/DownArrowWhite.png'
// import React, { useEffect, useMemo, useRef, useState } from 'react'
// import NewsCard from './NewsCard'

// type Props = {
//   block: AllNewsBlockType
//   data: News
//   tagsData: NewsTag
// }

// type NewsItem = NonNullable<News['news']>[number]

// type TagItem = {
//   id?: string | null
//   label?: string | null
//   key?: string | null
// }

// type EventStatus = 'upcoming-events' | 'todays-events' | 'past-events'

// type SelectOption = {
//   label: string
//   value: string
// }

// const ALL_TAGS_VALUE = 'all-tags'
// const ITEMS_PER_PAGE = 4

// const eventStatusOptions: SelectOption[] = [
//   {
//     label: 'Upcoming Events',
//     value: 'upcoming-events',
//   },
//   {
//     label: 'Todays Events',
//     value: 'todays-events',
//   },
//   {
//     label: 'Past Events',
//     value: 'past-events',
//   },
// ]

// function getNewsTagKeys(newsItem: NewsItem) {
//   const itemAny = newsItem as any

//   if (Array.isArray(itemAny?.tagKeys)) {
//     return itemAny.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
//   }

//   if (Array.isArray(itemAny?.tags)) {
//     return itemAny.tags.map((tag: TagItem) => String(tag?.key ?? '').trim()).filter(Boolean)
//   }

//   return []
// }

// function getNewsSortTime(newsItem: NewsItem) {
//   const date = new Date(newsItem?.publishDate || '')

//   if (Number.isNaN(date.getTime())) return 0

//   return date.getTime()
// }

// function getPaginationItems(currentPage: number, totalPages: number) {
//   if (totalPages <= 5) {
//     return Array.from({ length: totalPages }, (_, index) => index + 1)
//   }

//   if (currentPage <= 3) {
//     return [1, 2, 3, 'ellipsis', totalPages]
//   }

//   if (currentPage >= totalPages - 2) {
//     return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
//   }

//   return [1, 'ellipsis', currentPage, 'ellipsis-end', totalPages]
// }

// function CustomSelector({
//   options,
//   value,
//   onChange,
//   ariaLabel,
// }: {
//   options: SelectOption[]
//   value: string
//   onChange: (value: string) => void
//   ariaLabel: string
// }) {
//   const [open, setOpen] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement | null>(null)

//   const selectedOption = options.find((option) => option.value === value) || options[0]

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!dropdownRef.current) return

//       if (!dropdownRef.current.contains(event.target as Node)) {
//         setOpen(false)
//       }
//     }

//     window.addEventListener('mousedown', handleClickOutside)

//     return () => {
//       window.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return (
//     <div ref={dropdownRef} className="relative z-30">
//       <button
//         type="button"
//         aria-label={ariaLabel}
//         onClick={() => setOpen((prev) => !prev)}
//         className="
//           flex items-center justify-between gap-[10px]
//           rounded-[7px]
//           bg-primary-1
//           px-[16px] py-[9px]
//           font-grift global-p5 font-bold
//           text-white-1
//           shadow-[0_10px_24px_rgba(0,108,103,0.16)]
//           transition-all duration-300 ease-out
//           hover:bg-primary-1
//           md:px-[18px] md:py-[10px]
//           xl:px-[20px] xl:py-[11px]
//         "
//       >
//         <span className="whitespace-nowrap">{selectedOption?.label}</span>

//         <Image
//           src={DownArrowWhite}
//           alt=""
//           width={14}
//           height={14}
//           className={`
//             h-[10px] w-[10px] shrink-0 object-contain transition-transform duration-300
//             md:h-[11px] md:w-[11px]
//             xl:h-[12px] xl:w-[12px]
//             ${open ? 'rotate-180' : ''}
//           `}
//           placeholder="blur"
//           blurDataURL={DownArrowWhite.blurDataURL}
//           quality={95}
//         />
//       </button>

//       {open && (
//         <div
//           className="
//             absolute left-0 top-full z-50 mt-[8px]
//             min-w-full overflow-hidden
//             rounded-[7px]
//             border border-primary-1/25
//             bg-white-1
//             shadow-[0_18px_44px_rgba(10,17,40,0.14)]
//           "
//         >
//           {options.map((option) => {
//             const selected = option.value === value

//             return (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => {
//                   onChange(option.value)
//                   setOpen(false)
//                 }}
//                 className={`
//                   flex w-full items-center justify-between
//                   px-[14px] py-[11px]
//                   text-left font-grift global-p5 font-bold
//                   transition-colors duration-300
//                   ${
//                     selected
//                       ? 'bg-primary-1 text-white-1'
//                       : 'bg-white-1 text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
//                   }
//                 `}
//               >
//                 <span className="whitespace-nowrap">{option.label}</span>
//               </button>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }

// function NewsSection({ block, data, tagsData }: Props) {
//   const [activeEventStatus, setActiveEventStatus] = useState<EventStatus>('upcoming-events')
//   const [activeTagKey, setActiveTagKey] = useState(ALL_TAGS_VALUE)
//   const [currentPage, setCurrentPage] = useState(1)

//   const allNews = useMemo<NewsItem[]>(() => {
//     return Array.isArray(data?.news) ? data.news : []
//   }, [data?.news])

//   const tagOptions = useMemo<SelectOption[]>(() => {
//     const tags = Array.isArray(tagsData?.tags)
//       ? tagsData.tags.filter((tag: TagItem) => tag?.label && tag?.key)
//       : []

//     return [
//       {
//         label: 'All Tags',
//         value: ALL_TAGS_VALUE,
//       },
//       ...tags.map((tag: TagItem) => ({
//         label: String(tag.label),
//         value: String(tag.key),
//       })),
//     ]
//   }, [tagsData?.tags])

//   const filteredNews = useMemo<NewsItem[]>(() => {
//     return allNews
//       .filter((newsItem) => {
//         const itemAny = newsItem as any
//         const statusMatch = itemAny?.eventStatus === activeEventStatus

//         if (!statusMatch) return false
//         if (activeTagKey === ALL_TAGS_VALUE) return true

//         const tagKeys = getNewsTagKeys(newsItem)

//         return tagKeys.includes(activeTagKey)
//       })
//       .map((newsItem, index) => ({
//         newsItem,
//         index,
//       }))
//       .sort((a, b) => {
//         const aTime = getNewsSortTime(a.newsItem)
//         const bTime = getNewsSortTime(b.newsItem)

//         if (activeEventStatus === 'past-events') {
//           if (aTime !== bTime) return bTime - aTime
//           return b.index - a.index
//         }

//         if (aTime !== bTime) return aTime - bTime

//         return a.index - b.index
//       })
//       .map((item) => item.newsItem)
//   }, [activeEventStatus, activeTagKey, allNews])

//   const totalPages = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE))

//   const paginatedNews = useMemo<NewsItem[]>(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

//     return filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE)
//   }, [currentPage, filteredNews])

//   const paginationItems = useMemo(
//     () => getPaginationItems(currentPage, totalPages),
//     [currentPage, totalPages],
//   )

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeEventStatus, activeTagKey])

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages)
//     }
//   }, [currentPage, totalPages])

//   const goToPage = (page: number) => {
//     const nextPage = Math.max(1, Math.min(totalPages, page))

//     setCurrentPage(nextPage)
//   }

//   return (
//     <div className="w-full">
//       {/* selectors */}
//       <div
//         className="
//           relative z-30
//           flex flex-wrap items-center justify-center  lg:justify-start gap-[12px]
//           md:gap-[14px]
//           xl:gap-[16px]
//         "
//       >
//         <CustomSelector
//           ariaLabel="Filter news by event status"
//           options={eventStatusOptions}
//           value={activeEventStatus}
//           onChange={(value) => setActiveEventStatus(value as EventStatus)}
//         />

//         <CustomSelector
//           ariaLabel="Filter news by tag"
//           options={tagOptions}
//           value={activeTagKey}
//           onChange={setActiveTagKey}
//         />
//       </div>

//       {/* news list */}
//       {paginatedNews.length > 0 ? (
//         <div
//           className="
//             mt-[12px]
//             flex flex-col
//             md:mt-[14px]
//             lg:mt-[20px]
//             xl:mt-[30px]

//           "
//         >
//           {paginatedNews.map((newsItem, index) => (
//             <NewsCard
//               key={newsItem?.id ?? `${activeEventStatus}-${activeTagKey}-${currentPage}-${index}`}
//               block={block}
//               data={newsItem}
//               tagsData={tagsData}
//               showDivider={index !== paginatedNews.length - 1}
//             />
//           ))}
//         </div>
//       ) : (
//         <div
//           className="
//             mt-[28px]
//             rounded-[10px]
//             border border-primary-1/25
//             bg-white-1/45 px-[18px] py-[34px]
//             text-center
//             md:mt-[34px] md:px-[26px] md:py-[44px]
//             lg:mt-[42px]
//           "
//         >
//           <h3 className="font-agency global-h6 text-secondary-1">No News Found</h3>

//           <p className="mx-auto mt-[10px] max-w-[520px] font-grift global-p5 text-secondary-2">
//             No news items are available for the selected event status and tag. Try another filter.
//           </p>
//         </div>
//       )}

//       {/* pagination */}
//       {totalPages > 1 && (
//         <div
//           className="
//             mt-[10px]
//             md:mt-[14px]
//             lg:mt-[18px]
//             xl:mt-[22px]
//             2xl:mt-[32px]
//           "
//         >
//           <div
//             className="
//               mt-[18px] flex items-center justify-center
//               gap-[10px]
//               md:gap-[12px]
//               xl:gap-[16px]
//             "
//           >
//             <button
//               type="button"
//               aria-label="Previous page"
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="
//                 flex items-center justify-center
//                 rounded-[8px]
//                 border border-secondary-1/10
//                 bg-white-1
//                 shadow-[0_8px_22px_rgba(10,17,40,0.04)]
//                 transition-all duration-300
//                 hover:border-secondary-1/25
//                 hover:bg-white-2
//                 disabled:pointer-events-none disabled:opacity-35

//                 size-[36px]
//                 md:size-[40px]
//                 lg:size-[46px]
//                 xl:size-[52px]
//                 2xl:size-[58px]
//               "
//             >
//               <Image
//                 src={ArrowRightColored}
//                 alt=""
//                 width={14}
//                 height={14}
//                 className="
//                   rotate-180 object-contain
//                   brightness-0 saturate-100
//                   h-[11px] w-[11px]
//                   md:h-[12px] md:w-[12px]
//                   lg:h-[14px] lg:w-[14px]
//                   xl:h-[16px] xl:w-[16px]
//                 "
//                 placeholder="blur"
//                 blurDataURL={ArrowRightColored.blurDataURL}
//                 quality={95}
//               />
//             </button>

//             {paginationItems.map((item, index) => {
//               if (typeof item === 'string') {
//                 return (
//                   <span
//                     key={`${item}-${index}`}
//                     className="
//                       flex items-center justify-center
//                       font-grift font-bold text-secondary-1

//                       size-[36px]
//                       text-[13px]
//                       md:size-[40px] md:text-[14px]
//                       lg:size-[46px] lg:text-[16px]
//                       xl:size-[52px] xl:text-[18px]
//                       2xl:size-[58px] 2xl:text-[20px]
//                     "
//                   >
//                     ...
//                   </span>
//                 )
//               }

//               const isActive = item === currentPage

//               return (
//                 <button
//                   key={item}
//                   type="button"
//                   onClick={() => goToPage(item)}
//                   className={`
//                     flex items-center justify-center
//                     rounded-[8px]
//                     border
//                     font-grift font-bold
//                     shadow-[0_8px_22px_rgba(10,17,40,0.04)]
//                     transition-all duration-300

//                     size-[36px]
//                     text-[13px]
//                     md:size-[40px] md:text-[14px]
//                     lg:size-[46px] lg:text-[16px]
//                     xl:size-[52px] xl:text-[18px]
//                     2xl:size-[58px] 2xl:text-[20px]

//                     ${
//                       isActive
//                         ? 'border-secondary-1 bg-secondary-1 text-white-1'
//                         : 'border-secondary-1/10 bg-white-1 text-secondary-1 hover:border-secondary-1/25 hover:bg-white-2'
//                     }
//                   `}
//                 >
//                   {item}
//                 </button>
//               )
//             })}

//             <button
//               type="button"
//               aria-label="Next page"
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="
//                 flex items-center justify-center
//                 rounded-[8px]
//                 border border-secondary-1/10
//                 bg-white-1
//                 shadow-[0_8px_22px_rgba(10,17,40,0.04)]
//                 transition-all duration-300
//                 hover:border-secondary-1/25
//                 hover:bg-white-2
//                 disabled:pointer-events-none disabled:opacity-35

//                 size-[36px]
//                 md:size-[40px]
//                 lg:size-[46px]
//                 xl:size-[52px]
//                 2xl:size-[58px]
//               "
//             >
//               <Image
//                 src={ArrowRightColored}
//                 alt=""
//                 width={14}
//                 height={14}
//                 className="
//                   object-contain
//                   brightness-0 saturate-100
//                   h-[11px] w-[11px]
//                   md:h-[12px] md:w-[12px]
//                   lg:h-[14px] lg:w-[14px]
//                   xl:h-[16px] xl:w-[16px]
//                 "
//                 placeholder="blur"
//                 blurDataURL={ArrowRightColored.blurDataURL}
//                 quality={95}
//               />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default NewsSection

'use client'

import { News, NewsTag } from '@/payload-types'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import ArrowRightColored from 'public/assets/icons/arrowRightColored.png'
import DownArrowWhite from 'public/assets/icons/DownArrowWhite.png'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import NewsCard from './NewsCard'

type Props = {
  block: AllNewsBlockType
  data: News
  tagsData: NewsTag
}

type NewsItem = NonNullable<News['news']>[number]

type TagItem = {
  id?: string | null
  label?: string | null
  key?: string | null
}

type EventStatus = 'upcoming-events' | 'todays-events' | 'past-events'

type SelectOption = {
  label: string
  value: string
}

const ALL_TAGS_VALUE = 'all-tags'
const ITEMS_PER_PAGE = 4
const NEWS_CARD_ANCHOR_PREFIX = 'newscardp'
const NEWS_SCROLL_OFFSET = 130

const eventStatusOptions: SelectOption[] = [
  {
    label: 'Upcoming Events',
    value: 'upcoming-events',
  },
  {
    label: 'Todays Events',
    value: 'todays-events',
  },
  {
    label: 'Past Events',
    value: 'past-events',
  },
]

function getNewsCardAnchorId(page: number) {
  return `${NEWS_CARD_ANCHOR_PREFIX}${page}`
}

function removeNewsCardHashFromUrl() {
  if (typeof window === 'undefined') return

  const currentHash = window.location.hash.replace('#', '')

  if (!currentHash.startsWith(NEWS_CARD_ANCHOR_PREFIX)) return

  const baseUrl = `${window.location.pathname}${window.location.search}`

  window.history.replaceState(null, '', baseUrl)
}

function getNewsTagKeys(newsItem: NewsItem) {
  const itemAny = newsItem as any

  if (Array.isArray(itemAny?.tagKeys)) {
    return itemAny.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
  }

  if (Array.isArray(itemAny?.tags)) {
    return itemAny.tags.map((tag: TagItem) => String(tag?.key ?? '').trim()).filter(Boolean)
  }

  return []
}

function getNewsSortTime(newsItem: NewsItem) {
  const date = new Date(newsItem?.publishDate || '')

  if (Number.isNaN(date.getTime())) return 0

  return date.getTime()
}

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', currentPage, 'ellipsis-end', totalPages]
}

function scrollToNewsPageAnchor(page: number) {
  if (typeof window === 'undefined') return

  const anchorId = getNewsCardAnchorId(page)
  const target = document.getElementById(anchorId)

  if (!target) return

  const baseUrl = `${window.location.pathname}${window.location.search}`
  const nextUrl = `${baseUrl}#${anchorId}`

  window.history.pushState(null, '', nextUrl)

  const lenis = (window as any)?.lenis

  if (lenis?.scrollTo) {
    lenis.scrollTo(target, {
      offset: -NEWS_SCROLL_OFFSET,
      duration: 0.7,
      force: true,
    })

    return
  }

  const targetY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - NEWS_SCROLL_OFFSET,
  )

  window.scrollTo({
    top: targetY,
    left: 0,
    behavior: 'smooth',
  })
}

function CustomSelector({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  ariaLabel: string
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const selectedOption = options.find((option) => option.value === value) || options[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return

      if (!dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative z-30">
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center justify-between gap-[10px]
          rounded-[7px]
          bg-primary-1
          px-[16px] py-[9px]
          font-grift global-p5 font-bold
          text-white-1
          shadow-[0_10px_24px_rgba(0,108,103,0.16)]
          transition-all duration-300 ease-out
          hover:bg-primary-1
          md:px-[18px] md:py-[10px]
          xl:px-[20px] xl:py-[11px]
        "
      >
        <span className="whitespace-nowrap">{selectedOption?.label}</span>

        <Image
          src={DownArrowWhite}
          alt=""
          width={14}
          height={14}
          className={`
            h-[10px] w-[10px] shrink-0 object-contain transition-transform duration-300
            md:h-[11px] md:w-[11px]
            xl:h-[12px] xl:w-[12px]
            ${open ? 'rotate-180' : ''}
          `}
          placeholder="blur"
          blurDataURL={DownArrowWhite.blurDataURL}
          quality={95}
        />
      </button>

      {open && (
        <div
          className="
            absolute left-0 top-full z-50 mt-[8px]
            min-w-full overflow-hidden
            rounded-[7px]
            border border-primary-1/25
            bg-white-1
            shadow-[0_18px_44px_rgba(10,17,40,0.14)]
          "
        >
          {options.map((option) => {
            const selected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`
                  flex w-full items-center justify-between
                  px-[14px] py-[11px]
                  text-left font-grift global-p5 font-bold
                  transition-colors duration-300
                  ${
                    selected
                      ? 'bg-primary-1 text-white-1'
                      : 'bg-white-1 text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
                  }
                `}
              >
                <span className="whitespace-nowrap">{option.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function NewsSection({ block, data, tagsData }: Props) {
  const [activeEventStatus, setActiveEventStatus] = useState<EventStatus>('upcoming-events')
  const [activeTagKey, setActiveTagKey] = useState(ALL_TAGS_VALUE)
  const [currentPage, setCurrentPage] = useState(1)

  const pendingScrollPageRef = useRef<number | null>(null)
  const scrollFrameOneRef = useRef<number | null>(null)
  const scrollFrameTwoRef = useRef<number | null>(null)
  const hasFilterMountedRef = useRef(false)

  const allNews = useMemo<NewsItem[]>(() => {
    return Array.isArray(data?.news) ? data.news : []
  }, [data?.news])

  const tagOptions = useMemo<SelectOption[]>(() => {
    const tags = Array.isArray(tagsData?.tags)
      ? tagsData.tags.filter((tag: TagItem) => tag?.label && tag?.key)
      : []

    return [
      {
        label: 'All Tags',
        value: ALL_TAGS_VALUE,
      },
      ...tags.map((tag: TagItem) => ({
        label: String(tag.label),
        value: String(tag.key),
      })),
    ]
  }, [tagsData?.tags])

  const filteredNews = useMemo<NewsItem[]>(() => {
    return allNews
      .filter((newsItem) => {
        const itemAny = newsItem as any
        const statusMatch = itemAny?.eventStatus === activeEventStatus

        if (!statusMatch) return false
        if (activeTagKey === ALL_TAGS_VALUE) return true

        const tagKeys = getNewsTagKeys(newsItem)

        return tagKeys.includes(activeTagKey)
      })
      .map((newsItem, index) => ({
        newsItem,
        index,
      }))
      .sort((a, b) => {
        const aTime = getNewsSortTime(a.newsItem)
        const bTime = getNewsSortTime(b.newsItem)

        if (activeEventStatus === 'past-events') {
          if (aTime !== bTime) return bTime - aTime
          return b.index - a.index
        }

        if (aTime !== bTime) return aTime - bTime

        return a.index - b.index
      })
      .map((item) => item.newsItem)
  }, [activeEventStatus, activeTagKey, allNews])

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE))

  const paginatedNews = useMemo<NewsItem[]>(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

    return filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage, filteredNews])

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  useEffect(() => {
    if (!hasFilterMountedRef.current) {
      hasFilterMountedRef.current = true
      return
    }

    removeNewsCardHashFromUrl()
    pendingScrollPageRef.current = null
    setCurrentPage(1)
  }, [activeEventStatus, activeTagKey])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    const pendingPage = pendingScrollPageRef.current

    if (!pendingPage || pendingPage !== currentPage) return

    pendingScrollPageRef.current = null

    if (scrollFrameOneRef.current !== null) {
      cancelAnimationFrame(scrollFrameOneRef.current)
    }

    if (scrollFrameTwoRef.current !== null) {
      cancelAnimationFrame(scrollFrameTwoRef.current)
    }

    scrollFrameOneRef.current = requestAnimationFrame(() => {
      scrollFrameTwoRef.current = requestAnimationFrame(() => {
        scrollToNewsPageAnchor(currentPage)
      })
    })

    return () => {
      if (scrollFrameOneRef.current !== null) {
        cancelAnimationFrame(scrollFrameOneRef.current)
      }

      if (scrollFrameTwoRef.current !== null) {
        cancelAnimationFrame(scrollFrameTwoRef.current)
      }
    }
  }, [currentPage, paginatedNews.length])

  const goToPage = (page: number) => {
    const nextPage = Math.max(1, Math.min(totalPages, page))

    if (nextPage === currentPage) return

    pendingScrollPageRef.current = nextPage
    setCurrentPage(nextPage)
  }

  const currentAnchorId = getNewsCardAnchorId(currentPage)

  return (
    <div className="w-full">
      {/* selectors */}
      <div
        className="
          relative z-30
          flex flex-wrap items-center justify-center gap-[12px]
          md:gap-[14px]
          lg:justify-start
          xl:gap-[16px]
        "
      >
        <CustomSelector
          ariaLabel="Filter news by event status"
          options={eventStatusOptions}
          value={activeEventStatus}
          onChange={(value) => setActiveEventStatus(value as EventStatus)}
        />

        <CustomSelector
          ariaLabel="Filter news by tag"
          options={tagOptions}
          value={activeTagKey}
          onChange={setActiveTagKey}
        />
      </div>

      {/* dynamic news cards anchor */}
      <div
        id={currentAnchorId}
        className="
          scroll-mt-[105px]
          md:scroll-mt-[115px]
          lg:scroll-mt-[130px]
          xl:scroll-mt-[145px]
        "
      />

      {/* news list */}
      {paginatedNews.length > 0 ? (
        <div
          className="
            mt-[12px]
            flex flex-col
            md:mt-[14px]
            lg:mt-[20px]
            xl:mt-[30px]
          "
        >
          {paginatedNews.map((newsItem, index) => (
            <NewsCard
              key={newsItem?.id ?? `${activeEventStatus}-${activeTagKey}-${currentPage}-${index}`}
              block={block}
              data={newsItem}
              tagsData={tagsData}
              showDivider={index !== paginatedNews.length - 1}
            />
          ))}
        </div>
      ) : (
        <div
          className="
            mt-[28px]
            rounded-[10px]
            border border-primary-1/25
            bg-white-1/45 px-[18px] py-[34px]
            text-center
            md:mt-[34px] md:px-[26px] md:py-[44px]
            lg:mt-[42px]
          "
        >
          <h3 className="font-agency global-h6 text-secondary-1">No News Found</h3>

          <p className="mx-auto mt-[10px] max-w-[520px] font-grift global-p5 text-secondary-2">
            No news items are available for the selected event status and tag. Try another filter.
          </p>
        </div>
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div
          className="
            mt-[10px]
            md:mt-[14px]
            lg:mt-[18px]
            xl:mt-[22px]
            2xl:mt-[32px]
          "
        >
          <div
            className="
              mt-[18px] flex items-center justify-center
              gap-[10px]
              md:gap-[12px]
              xl:gap-[16px]
            "
          >
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="
                flex items-center justify-center
                rounded-[8px]
                border border-secondary-1/10
                bg-white-1
                shadow-[0_8px_22px_rgba(10,17,40,0.04)]
                transition-all duration-300
                hover:border-secondary-1/25
                hover:bg-white-2
                disabled:pointer-events-none disabled:opacity-35
                size-[36px]
                md:size-[40px]
                lg:size-[46px]
                xl:size-[52px]
                2xl:size-[58px]
              "
            >
              <Image
                src={ArrowRightColored}
                alt=""
                width={14}
                height={14}
                className="
                  rotate-180 object-contain
                  brightness-0 saturate-100
                  h-[11px] w-[11px]
                  md:h-[12px] md:w-[12px]
                  lg:h-[14px] lg:w-[14px]
                  xl:h-[16px] xl:w-[16px]
                "
                placeholder="blur"
                blurDataURL={ArrowRightColored.blurDataURL}
                quality={95}
              />
            </button>

            {paginationItems.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <span
                    key={`${item}-${index}`}
                    className="
                      flex items-center justify-center
                      font-grift font-bold text-secondary-1
                      size-[36px]
                      text-[13px]
                      md:size-[40px] md:text-[14px]
                      lg:size-[46px] lg:text-[16px]
                      xl:size-[52px] xl:text-[18px]
                      2xl:size-[58px] 2xl:text-[20px]
                    "
                  >
                    ...
                  </span>
                )
              }

              const isActive = item === currentPage

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(item)}
                  className={`
                    flex items-center justify-center
                    rounded-[8px]
                    border
                    font-grift font-bold
                    shadow-[0_8px_22px_rgba(10,17,40,0.04)]
                    transition-all duration-300
                    size-[36px]
                    text-[13px]
                    md:size-[40px] md:text-[14px]
                    lg:size-[46px] lg:text-[16px]
                    xl:size-[52px] xl:text-[18px]
                    2xl:size-[58px] 2xl:text-[20px]
                    ${
                      isActive
                        ? 'border-secondary-1 bg-secondary-1 text-white-1'
                        : 'border-secondary-1/10 bg-white-1 text-secondary-1 hover:border-secondary-1/25 hover:bg-white-2'
                    }
                  `}
                >
                  {item}
                </button>
              )
            })}

            <button
              type="button"
              aria-label="Next page"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="
                flex items-center justify-center
                rounded-[8px]
                border border-secondary-1/10
                bg-white-1
                shadow-[0_8px_22px_rgba(10,17,40,0.04)]
                transition-all duration-300
                hover:border-secondary-1/25
                hover:bg-white-2
                disabled:pointer-events-none disabled:opacity-35
                size-[36px]
                md:size-[40px]
                lg:size-[46px]
                xl:size-[52px]
                2xl:size-[58px]
              "
            >
              <Image
                src={ArrowRightColored}
                alt=""
                width={14}
                height={14}
                className="
                  object-contain
                  brightness-0 saturate-100
                  h-[11px] w-[11px]
                  md:h-[12px] md:w-[12px]
                  lg:h-[14px] lg:w-[14px]
                  xl:h-[16px] xl:w-[16px]
                "
                placeholder="blur"
                blurDataURL={ArrowRightColored.blurDataURL}
                quality={95}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsSection
