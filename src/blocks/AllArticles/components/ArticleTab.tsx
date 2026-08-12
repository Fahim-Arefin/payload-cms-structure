// 'use client'

// import { gsap, useGSAP } from '@/lib/gsap'
// import { Article, ArticleTag } from '@/payload-types'
// import { AllArticlesBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React, { useEffect, useMemo, useRef, useState } from 'react'
// import ArticleCard from './ArticleCard'

// import ArrowRightColored from 'public/assets/icons/arrowRightColored.png'
// import LineImage from 'public/assets/images/Line.png'

// type Props = {
//   block: AllArticlesBlockType
//   data: Article
//   tagsData: ArticleTag
// }

// type TagItem = {
//   id?: string | null
//   label?: string | null
//   key?: string | null
// }

// type TabItem = {
//   key: string
//   label: string
// }

// const ITEMS_PER_PAGE = 6
// const ALL_TAB_KEY = 'all'

// function getArticleTagKeys(article: NonNullable<Article['articles']>[number]) {
//   const articleAny = article as any

//   if (Array.isArray(articleAny?.tagKeys)) {
//     return articleAny.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
//   }

//   if (Array.isArray(articleAny?.tags)) {
//     return articleAny.tags.map((tag: TagItem) => String(tag?.key ?? '').trim()).filter(Boolean)
//   }

//   return []
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

// function ArticleTab({ data, block, tagsData }: Props) {
//   const [activeTabKey, setActiveTabKey] = useState(ALL_TAB_KEY)
//   const [currentPage, setCurrentPage] = useState(1)

//   const scrollRef = useRef<HTMLDivElement | null>(null)
//   const rowRef = useRef<HTMLDivElement | null>(null)
//   const indicatorRef = useRef<HTMLDivElement | null>(null)
//   const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
//   const hasMountedRef = useRef(false)

//   const articles = useMemo(() => {
//     return Array.isArray(data?.articles) ? data.articles : []
//   }, [data?.articles])

//   const articleTags = useMemo<TagItem[]>(() => {
//     return Array.isArray(tagsData?.tags)
//       ? tagsData.tags.filter((tag: TagItem) => tag?.label && tag?.key)
//       : []
//   }, [tagsData?.tags])

//   const tabs = useMemo<TabItem[]>(() => {
//     return [
//       {
//         key: ALL_TAB_KEY,
//         label: 'All',
//       },
//       ...articleTags.map((tag) => ({
//         key: String(tag.key),
//         label: String(tag.label),
//       })),
//     ]
//   }, [articleTags])

//   const activeTabIndex = Math.max(
//     0,
//     tabs.findIndex((tab) => tab.key === activeTabKey),
//   )

//   const filteredArticles = useMemo(() => {
//     if (activeTabKey === ALL_TAB_KEY) return articles

//     return articles.filter((article) => {
//       const tagKeys = getArticleTagKeys(article)

//       return tagKeys.includes(activeTabKey)
//     })
//   }, [activeTabKey, articles])

//   const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE))

//   const paginatedArticles = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

//     return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE)
//   }, [currentPage, filteredArticles])

//   const paginationItems = useMemo(
//     () => getPaginationItems(currentPage, totalPages),
//     [currentPage, totalPages],
//   )

//   const updateIndicator = (duration = 0.42) => {
//     const row = rowRef.current
//     const indicator = indicatorRef.current
//     const activeTab = tabRefs.current[activeTabIndex]

//     if (!row || !indicator || !activeTab) return

//     const tabBounds = activeTab.getBoundingClientRect()
//     const rowBounds = row.getBoundingClientRect()

//     const offsetX = tabBounds.left - rowBounds.left
//     const offsetY = tabBounds.top - rowBounds.top

//     gsap.to(indicator, {
//       x: offsetX,
//       y: offsetY,
//       width: tabBounds.width,
//       height: tabBounds.height,
//       autoAlpha: 1,
//       duration,
//       ease: 'back.out(1)',
//       overwrite: 'auto',
//     })
//   }

//   useGSAP(
//     () => {
//       updateIndicator(hasMountedRef.current ? 0.42 : 0)
//       hasMountedRef.current = true

//       const handleResize = () => updateIndicator(0.25)

//       window.addEventListener('resize', handleResize)

//       return () => {
//         window.removeEventListener('resize', handleResize)
//       }
//     },
//     {
//       dependencies: [activeTabKey, activeTabIndex, tabs.length],
//       scope: rowRef,
//     },
//   )

//   useEffect(() => {
//     const scrollEl = scrollRef.current
//     const activeTab = tabRefs.current[activeTabIndex]

//     if (!scrollEl || !activeTab) return

//     const tabLeft = activeTab.offsetLeft
//     const tabWidth = activeTab.offsetWidth
//     const rowWidth = scrollEl.offsetWidth

//     scrollEl.scrollTo({
//       left: tabLeft - rowWidth / 2 + tabWidth / 2,
//       behavior: 'smooth',
//     })
//   }, [activeTabIndex, activeTabKey])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeTabKey])

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages)
//     }
//   }, [currentPage, totalPages])

//   useEffect(() => {
//     const tabExists = tabs.some((tab) => tab.key === activeTabKey)

//     if (!tabExists) {
//       setActiveTabKey(ALL_TAB_KEY)
//     }
//   }, [activeTabKey, tabs])

//   const handleTabClick = (tabKey: string) => {
//     setActiveTabKey(tabKey)
//   }

//   const goToPage = (page: number) => {
//     const nextPage = Math.max(1, Math.min(totalPages, page))

//     setCurrentPage(nextPage)
//   }

//   return (
//     <div className="w-full">
//       {/* tabs */}
//       <div className="relative w-full max-w-full overflow-hidden">
//         <div
//           ref={scrollRef}
//           className="
//             w-full overflow-x-auto overflow-y-hidden
//             [scrollbar-width:none]
//             [&::-webkit-scrollbar]:hidden
//           "
//         >
//           <div
//             ref={rowRef}
//             className="
//               relative mx-auto flex w-max min-w-full items-center justify-center
//               gap-[12px]
//               px-[16px]
//               md:gap-[16px] md:px-[20px]
//               lg:gap-[20px] lg:px-[24px]
//               xl:gap-[24px] xl:px-[28px]
//             "
//           >
//             {/* animated active pill */}
//             <div
//               ref={indicatorRef}
//               className="
//                 pointer-events-none absolute left-0 top-0 z-0
//                 rounded-[6px] bg-primary-1 opacity-0
//               "
//             />

//             {tabs.map((tab, index) => {
//               const isActive = tab.key === activeTabKey

//               return (
//                 <button
//                   key={tab.key}
//                   ref={(element) => {
//                     tabRefs.current[index] = element
//                   }}
//                   type="button"
//                   onClick={() => handleTabClick(tab.key)}
//                   className="
//                     relative z-10 shrink-0
//                     rounded-[6px]
//                     px-[16px] py-[8px]
//                     font-grift global-p5 font-bold
//                     transition-colors duration-300 ease-out
//                     md:px-[18px]
//                     lg:px-[20px]
//                     xl:px-[22px]
//                   "
//                 >
//                   <span
//                     className={`
//                       block whitespace-nowrap
//                       transition-colors duration-300 ease-out
//                       ${isActive ? 'text-white-1' : 'text-primary-2 hover:text-primary-1'}
//                     `}
//                   >
//                     {tab.label}
//                   </span>
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {/* horizontal line */}
//         <div className="relative mt-[12px] h-px w-full overflow-hidden">
//           <Image
//             src={LineImage}
//             alt=""
//             fill
//             className="object-fill object-center opacity-80"
//             placeholder="blur"
//             blurDataURL={LineImage.blurDataURL}
//             quality={95}
//           />
//         </div>
//       </div>

//       {/* card grid */}
//       <div
//         className="
//           mt-[28px]
//           grid grid-cols-1
//           gap-4
//           md:mt-[34px] md:grid-cols-2
//           lg:gap-7
//           xl:mt-[44px] xl:grid-cols-3
//           2xl:gap-9
//         "
//       >
//         {paginatedArticles.map((article, index) => (
//           <ArticleCard
//             key={article?.id ?? `${activeTabKey}-${currentPage}-${index}`}
//             data={article}
//             tagsData={tagsData}
//             block={block}
//           />
//         ))}
//       </div>

//       {/* empty filtered result */}
//       {!paginatedArticles.length && (
//         <div
//           className="
//             mt-[34px] rounded-[10px]
//             border border-primary-1/25
//             bg-white-1/45 px-[18px] py-[34px]
//             text-center
//             md:mt-[44px] md:px-[26px] md:py-[44px]
//           "
//         >
//           <h3 className="font-agency global-h6 text-secondary-1">No Articles Found</h3>

//           <p className="mx-auto mt-[10px] max-w-[460px] font-grift global-p5 text-secondary-2">
//             No articles are available under this tag yet. Try another category or check back later.
//           </p>
//         </div>
//       )}

//       {/* pagination */}
//       {totalPages > 1 && (
//         <div className="mt-[34px] xl:mt-[44px]">
//           {/* pagination top line */}
//           <div className="relative h-px w-full overflow-hidden">
//             <Image
//               src={LineImage}
//               alt=""
//               fill
//               className="object-fill object-center opacity-45"
//               placeholder="blur"
//               blurDataURL={LineImage.blurDataURL}
//               quality={95}
//             />
//           </div>

//           <div className="mt-[18px] flex items-center justify-center gap-[8px]">
//             <button
//               type="button"
//               aria-label="Previous page"
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="
//                 flex size-[28px] items-center justify-center
//                 rounded-[5px]
//                 transition-all duration-300
//                 hover:bg-primary-1/10
//                 disabled:pointer-events-none disabled:opacity-35
//               "
//             >
//               <Image
//                 src={ArrowRightColored}
//                 alt=""
//                 width={10}
//                 height={10}
//                 className="h-[9px] w-[9px] rotate-180 object-contain"
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
//                       flex size-[28px] items-center justify-center
//                       font-grift text-[11px] font-bold text-secondary-2/55
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
//                     flex size-[28px] items-center justify-center
//                     rounded-[5px]
//                     font-grift text-[11px] font-bold
//                     transition-all duration-300
//                     ${
//                       isActive
//                         ? 'bg-secondary-1 text-white-1'
//                         : 'bg-transparent text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
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
//                 flex size-[28px] items-center justify-center
//                 rounded-[5px]
//                 transition-all duration-300
//                 hover:bg-primary-1/10
//                 disabled:pointer-events-none disabled:opacity-35
//               "
//             >
//               <Image
//                 src={ArrowRightColored}
//                 alt=""
//                 width={10}
//                 height={10}
//                 className="h-[9px] w-[9px] object-contain"
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

// export default ArticleTab
'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import { Article, ArticleTag } from '@/payload-types'
import { AllArticlesBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ArticleCard from './ArticleCard'

import ArrowRightColored from 'public/assets/icons/arrowRightColored.png'
import DownArrowWhite from 'public/assets/icons/DownArrowWhite.png'
import LineImage from 'public/assets/images/Line.png'

type Props = {
  block: AllArticlesBlockType
  data: Article
  tagsData: ArticleTag
}

type TagItem = {
  id?: string | null
  label?: string | null
  key?: string | null
}

type TabItem = {
  key: string
  label: string
}

type SortMode = 'default' | 'latest' | 'oldest'

const ITEMS_PER_PAGE = 6
const ALL_TAB_KEY = 'all'

const sortOptions: { label: string; value: SortMode }[] = [
  {
    label: 'Default Order',
    value: 'default',
  },
  {
    label: 'Latest First',
    value: 'latest',
  },
  {
    label: 'Oldest First',
    value: 'oldest',
  },
]

function getArticleTagKeys(article: NonNullable<Article['articles']>[number]) {
  const articleAny = article as any

  if (Array.isArray(articleAny?.tagKeys)) {
    return articleAny.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
  }

  if (Array.isArray(articleAny?.tags)) {
    return articleAny.tags.map((tag: TagItem) => String(tag?.key ?? '').trim()).filter(Boolean)
  }

  return []
}

function getArticleSortTime(article: NonNullable<Article['articles']>[number]) {
  const date = new Date(article?.publishDate || '')

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

function ArticleTab({ data, block, tagsData }: Props) {
  const [activeTabKey, setActiveTabKey] = useState(ALL_TAB_KEY)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortMode, setSortMode] = useState<SortMode>('latest')
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  const sortDropdownRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const rowRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const hasMountedRef = useRef(false)

  const baseArticles = useMemo(() => {
    return Array.isArray(data?.articles) ? data.articles : []
  }, [data?.articles])

  const articles = useMemo(() => {
    const articleItems = baseArticles.map((article, index) => ({ article, index }))

    if (sortMode === 'default') {
      return articleItems.map((item) => item.article)
    }

    return articleItems
      .sort((a, b) => {
        const aTime = getArticleSortTime(a.article)
        const bTime = getArticleSortTime(b.article)

        if (aTime !== bTime) {
          return sortMode === 'latest' ? bTime - aTime : aTime - bTime
        }

        if (sortMode === 'latest') {
          return b.index - a.index
        }

        return a.index - b.index
      })
      .map((item) => item.article)
  }, [baseArticles, sortMode])

  const articleTags = useMemo<TagItem[]>(() => {
    return Array.isArray(tagsData?.tags)
      ? tagsData.tags.filter((tag: TagItem) => tag?.label && tag?.key)
      : []
  }, [tagsData?.tags])

  const tabs = useMemo<TabItem[]>(() => {
    return [
      {
        key: ALL_TAB_KEY,
        label: 'All',
      },
      ...articleTags.map((tag) => ({
        key: String(tag.key),
        label: String(tag.label),
      })),
    ]
  }, [articleTags])

  const selectedSortOption = useMemo(() => {
    return sortOptions.find((option) => option.value === sortMode) || sortOptions[1]
  }, [sortMode])

  const activeTabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === activeTabKey),
  )

  const filteredArticles = useMemo(() => {
    if (activeTabKey === ALL_TAB_KEY) return articles

    return articles.filter((article) => {
      const tagKeys = getArticleTagKeys(article)

      return tagKeys.includes(activeTabKey)
    })
  }, [activeTabKey, articles])

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE))

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage, filteredArticles])

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const updateIndicator = (duration = 0.42) => {
    const row = rowRef.current
    const indicator = indicatorRef.current
    const activeTab = tabRefs.current[activeTabIndex]

    if (!row || !indicator || !activeTab) return

    const tabBounds = activeTab.getBoundingClientRect()
    const rowBounds = row.getBoundingClientRect()

    const offsetX = tabBounds.left - rowBounds.left
    const offsetY = tabBounds.top - rowBounds.top

    gsap.to(indicator, {
      x: offsetX,
      y: offsetY,
      width: tabBounds.width,
      height: tabBounds.height,
      autoAlpha: 1,
      duration,
      ease: 'back.out(1)',
      overwrite: 'auto',
    })
  }

  useGSAP(
    () => {
      updateIndicator(hasMountedRef.current ? 0.42 : 0)
      hasMountedRef.current = true

      const handleResize = () => updateIndicator(0.25)

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    {
      dependencies: [activeTabKey, activeTabIndex, tabs.length],
      scope: rowRef,
    },
  )

  useEffect(() => {
    const scrollEl = scrollRef.current
    const activeTab = tabRefs.current[activeTabIndex]

    if (!scrollEl || !activeTab) return

    const tabLeft = activeTab.offsetLeft
    const tabWidth = activeTab.offsetWidth
    const rowWidth = scrollEl.offsetWidth

    scrollEl.scrollTo({
      left: tabLeft - rowWidth / 2 + tabWidth / 2,
      behavior: 'smooth',
    })
  }, [activeTabIndex, activeTabKey])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTabKey, sortMode])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    const tabExists = tabs.some((tab) => tab.key === activeTabKey)

    if (!tabExists) {
      setActiveTabKey(ALL_TAB_KEY)
    }
  }, [activeTabKey, tabs])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sortDropdownRef.current) return

      if (!sortDropdownRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleTabClick = (tabKey: string) => {
    setActiveTabKey(tabKey)
  }

  const handleSortSelect = (value: SortMode) => {
    setSortMode(value)
    setSortDropdownOpen(false)
  }

  const goToPage = (page: number) => {
    const nextPage = Math.max(1, Math.min(totalPages, page))

    setCurrentPage(nextPage)
  }

  return (
    <div className="w-full">
      {/* tabs */}
      <div className="relative w-full max-w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="
            w-full overflow-x-auto overflow-y-hidden
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div
            ref={rowRef}
            className="
              relative mx-auto flex w-max min-w-full items-center justify-center
              gap-[12px]
              px-[16px]
              md:gap-[16px] md:px-[20px]
              lg:gap-[20px] lg:px-[24px]
              xl:gap-[24px] xl:px-[28px]
            "
          >
            {/* animated active pill */}
            <div
              ref={indicatorRef}
              className="
                pointer-events-none absolute left-0 top-0 z-0
                rounded-[6px] bg-primary-1 opacity-0
              "
            />

            {tabs.map((tab, index) => {
              const isActive = tab.key === activeTabKey

              return (
                <button
                  key={tab.key}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  type="button"
                  onClick={() => handleTabClick(tab.key)}
                  className="
                    relative z-10 shrink-0
                    rounded-[6px]
                    px-[16px] py-[8px]
                    font-grift global-p5 font-bold
                    transition-colors duration-300 ease-out
                    md:px-[18px]
                    lg:px-[20px]
                    xl:px-[22px]
                  "
                >
                  <span
                    className={`
                      block whitespace-nowrap
                      transition-colors duration-300 ease-out
                      ${isActive ? 'text-white-1' : 'text-primary-2 hover:text-primary-1'}
                    `}
                  >
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* horizontal line */}
        <div className="relative mt-[12px] h-px w-full overflow-hidden">
          <Image
            src={LineImage}
            alt=""
            fill
            className="object-fill object-center opacity-80"
            placeholder="blur"
            blurDataURL={LineImage.blurDataURL}
            quality={95}
          />
        </div>
      </div>

      {/* sort selector */}
      <div
        className="
          relative z-30  flex w-full justify-start
          mt-[10px]
          md:mt-[14px]
          lg:mt-[18px]
          xl:mt-[22px]
          2xl:mt-[32px]
        "
      >
        <div ref={sortDropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setSortDropdownOpen((prev) => !prev)}
            className="
              flex items-center justify-between gap-[12px]
              rounded-[7px]
              bg-primary-1
              px-[16px] py-[10px]
              font-grift global-p5 font-bold
              text-white-1
              shadow-[0_10px_24px_rgba(0,108,103,0.18)]
              transition-all duration-300
              hover:bg-primary-1
              md:px-[18px] md:py-[11px]
              xl:px-[22px] xl:py-[12px]
            "
          >
            <span>{selectedSortOption.label}</span>

            <Image
              src={DownArrowWhite}
              alt=""
              width={14}
              height={14}
              className={`
                h-[10px] w-[10px] object-contain transition-transform duration-300
                md:h-[11px] md:w-[11px]
                xl:h-[12px] xl:w-[12px]
                ${sortDropdownOpen ? 'rotate-180' : ''}
              `}
              placeholder="blur"
              blurDataURL={DownArrowWhite.blurDataURL}
              quality={95}
            />
          </button>

          {sortDropdownOpen && (
            <div
              className="
                absolute left-0 top-full z-50 mt-[8px]
                min-w-[190px]
                overflow-hidden rounded-[7px]
                border border-primary-1/25
                bg-white-1
                shadow-[0_18px_44px_rgba(10,17,40,0.14)]
              "
            >
              {sortOptions.map((option) => {
                const isSelected = option.value === sortMode

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSortSelect(option.value)}
                    className={`
                      flex w-full items-center justify-between
                      px-[14px] py-[11px]
                      text-left font-grift global-p5 font-bold
                      transition-colors duration-300
                      ${
                        isSelected
                          ? 'bg-primary-1 text-white-1'
                          : 'bg-white-1 text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* card grid */}
      <div
        className="
          mt-[10px]
          md:mt-[14px]
          lg:mt-[18px]
          xl:mt-[22px]
          2xl:mt-[32px]
          grid grid-cols-1
          gap-4
          md:grid-cols-2
          lg:gap-7
          xl:grid-cols-3
          2xl:gap-9
        "
      >
        {paginatedArticles.map((article, index) => (
          <ArticleCard
            key={article?.id ?? `${activeTabKey}-${sortMode}-${currentPage}-${index}`}
            data={article}
            tagsData={tagsData}
            block={block}
          />
        ))}
      </div>

      {/* empty filtered result */}
      {!paginatedArticles.length && (
        <div
          className="
            rounded-[10px]
            border border-primary-1/25
            bg-white-1/45 px-[18px] py-[34px]
            text-center
            md:px-[26px] md:py-[44px]
          "
        >
          <h3 className="font-agency global-h6 text-secondary-1">No Articles Found</h3>

          <p className="mx-auto mt-[10px] max-w-[460px] font-grift global-p5 text-secondary-2">
            No articles are available under this tag yet. Try another category or check back later.
          </p>
        </div>
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div
          className="mt-[10px]
          md:mt-[14px]
          lg:mt-[18px]
          xl:mt-[22px]
          2xl:mt-[32px]"
        >
          {/* pagination top line */}
          {/* <div className="relative h-px w-full overflow-hidden">
            <Image
              src={LineImage}
              alt=""
              fill
              className="object-fill object-center opacity-45"
              placeholder="blur"
              blurDataURL={LineImage.blurDataURL}
              quality={95}
            />
          </div> */}

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

export default ArticleTab
