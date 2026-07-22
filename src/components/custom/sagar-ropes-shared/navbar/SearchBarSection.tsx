// 'use client'

// import React, { useEffect, useMemo, useRef, useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import type { SearchSuggestion } from './ServerNavbar'

// import SearchIcon from '/public/assets/icons/search-icon.png'

// type Props = {
//   suggestions: SearchSuggestion[]
//   center?: boolean
//   placeholder?: string
// }

// function getSuggestionLabel(suggestion: SearchSuggestion) {
//   const item = suggestion as unknown as {
//     title?: string
//     label?: string
//     name?: string
//     slug?: string
//   }

//   return item.title || item.label || item.name || item.slug || 'Untitled'
// }

// function getSuggestionHref(suggestion: SearchSuggestion) {
//   const item = suggestion as unknown as {
//     href?: string
//     url?: string
//     slug?: string
//   }

//   if (item.href) return item.href
//   if (item.url) return item.url
//   if (item.slug) return item.slug.startsWith('/') ? item.slug : `/${item.slug}`

//   return '#'
// }

// function SearchBarSection({ suggestions, center = false, placeholder = 'Search...' }: Props) {
//   const pathname = usePathname()

//   const [query, setQuery] = useState('')
//   const [isOpen, setIsOpen] = useState(false)
//   const [activeIndex, setActiveIndex] = useState(-1)

//   const wrapperRef = useRef<HTMLDivElement | null>(null)
//   const inputRef = useRef<HTMLInputElement | null>(null)

//   const filteredSuggestions = useMemo(() => {
//     const normalizedQuery = query.trim().toLowerCase()

//     if (!normalizedQuery) return []

//     return suggestions
//       .filter((suggestion) => {
//         const label = getSuggestionLabel(suggestion).toLowerCase()
//         const href = getSuggestionHref(suggestion).toLowerCase()

//         return label.includes(normalizedQuery) || href.includes(normalizedQuery)
//       })
//       .slice(0, 8)
//   }, [query, suggestions])

//   useEffect(() => {
//     setQuery('')
//     setIsOpen(false)
//     setActiveIndex(-1)
//   }, [pathname])

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!wrapperRef.current) return

//       if (!wrapperRef.current.contains(event.target as Node)) {
//         setIsOpen(false)
//         setActiveIndex(-1)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value

//     setQuery(value)
//     setIsOpen(value.trim().length > 0)
//     setActiveIndex(-1)
//   }

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (!isOpen || filteredSuggestions.length === 0) return

//     if (event.key === 'ArrowDown') {
//       event.preventDefault()

//       setActiveIndex((prev) => {
//         if (prev >= filteredSuggestions.length - 1) return 0
//         return prev + 1
//       })
//     }

//     if (event.key === 'ArrowUp') {
//       event.preventDefault()

//       setActiveIndex((prev) => {
//         if (prev <= 0) return filteredSuggestions.length - 1
//         return prev - 1
//       })
//     }

//     if (event.key === 'Enter') {
//       const activeSuggestion = filteredSuggestions[activeIndex]

//       if (!activeSuggestion) return

//       window.location.href = getSuggestionHref(activeSuggestion)
//     }

//     if (event.key === 'Escape') {
//       setIsOpen(false)
//       setActiveIndex(-1)
//       inputRef.current?.blur()
//     }
//   }

//   const hasDropdown = isOpen && query.trim().length > 0

//   return (
//     <div
//       ref={wrapperRef}
//       className={`
//         relative z-[9999] w-full
//         ${center ? 'mx-auto' : ''}
//       `}
//     >
//       <div
//         className="
//           relative flex w-full items-center gap-2
//           rounded-[12px]
//           border border-secondary-1/10
//           bg-white-2
//           px-3 py-2.5
//           text-secondary-1
//           shadow-none
//           transition-all duration-300
//           focus-within:border-primary-1/35
//           focus-within:bg-white-1
//           focus-within:shadow-[0_10px_30px_rgba(10,17,40,0.08)]
//         "
//       >
//         <Image
//           src={SearchIcon}
//           alt=""
//           aria-hidden="true"
//           width={18}
//           height={18}
//           quality={90}
//           placeholder="blur"
//           blurDataURL={SearchIcon.blurDataURL}
//           className="h-[16px] w-[16px] shrink-0 object-contain opacity-70"
//         />

//         <input
//           ref={inputRef}
//           value={query}
//           onChange={handleInputChange}
//           onFocus={() => {
//             if (query.trim().length > 0) setIsOpen(true)
//           }}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder}
//           className="
//             w-full bg-transparent
//             font-grift text-[13px] uppercase tracking-[0.04em]
//             text-secondary-1
//             outline-none
//             placeholder:text-secondary-1/45
//           "
//         />

//         {query && (
//           <button
//             type="button"
//             aria-label="Clear search"
//             onClick={() => {
//               setQuery('')
//               setIsOpen(false)
//               setActiveIndex(-1)
//               inputRef.current?.focus()
//             }}
//             className="
//               flex h-5 w-5 shrink-0 items-center justify-center
//               rounded-full
//               text-secondary-1/50
//               transition-colors duration-300
//               hover:bg-secondary-1/10
//               hover:text-secondary-1
//             "
//           >
//             <span className="text-[14px] leading-none">×</span>
//           </button>
//         )}
//       </div>

//       {hasDropdown && (
//         <div
//           className="
//             absolute left-0 right-0 top-full z-[9999]
//             mt-2 overflow-hidden
//             rounded-[14px]
//             border border-secondary-1/10
//             bg-white-1
//             text-secondary-1
//             shadow-[0_18px_50px_rgba(10,17,40,0.22)]
//           "
//         >
//           {filteredSuggestions.length > 0 ? (
//             <ul className="max-h-[260px] overflow-y-auto bg-white-1 py-2 text-secondary-1">
//               {filteredSuggestions.map((suggestion, index) => {
//                 const label = getSuggestionLabel(suggestion)
//                 const href = getSuggestionHref(suggestion)
//                 const isActive = index === activeIndex

//                 return (
//                   <li key={`${href}-${index}`} className="bg-white-1 text-secondary-1">
//                     <Link
//                       href={href}
//                       onClick={() => {
//                         setQuery('')
//                         setIsOpen(false)
//                         setActiveIndex(-1)
//                       }}
//                       onMouseEnter={() => setActiveIndex(index)}
//                       className={`
//                         block px-4 py-3
//                         font-grift text-[12px] uppercase tracking-[0.04em]
//                         transition-all duration-300

//                         ${
//                           isActive
//                             ? 'bg-primary-1/10 text-primary-1'
//                             : 'bg-white-1 text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
//                         }
//                       `}
//                     >
//                       {label}
//                     </Link>
//                   </li>
//                 )
//               })}
//             </ul>
//           ) : (
//             <div
//               className="
//                 bg-white-1 px-4 py-4
//                 font-grift text-[12px] uppercase tracking-[0.04em]
//                 text-secondary-1/65
//               "
//             >
//               No results found
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default SearchBarSection
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { SearchSuggestion } from './ServerNavbar'

import SearchIcon from 'public/assets/icons/search-icon.png'
import ArrowRight from 'public/assets/icons/arrowright.png'

type Props = {
  suggestions: SearchSuggestion[]
  center?: boolean
  placeholder?: string
  variant?: 'default' | 'mobileDrawer'
}

function getSuggestionLabel(suggestion: SearchSuggestion) {
  const item = suggestion as unknown as {
    title?: string
    label?: string
    name?: string
    slug?: string
  }

  return item.title || item.label || item.name || item.slug || 'Untitled'
}

function getSuggestionHref(suggestion: SearchSuggestion) {
  const item = suggestion as unknown as {
    href?: string
    url?: string
    slug?: string
  }

  if (item.href) return item.href
  if (item.url) return item.url
  if (item.slug) return item.slug.startsWith('/') ? item.slug : `/${item.slug}`

  return '#'
}

function SearchBarSection({
  suggestions,
  center = false,
  placeholder = 'Search...',
  variant = 'default',
}: Props) {
  const pathname = usePathname()
  const isMobileDrawer = variant === 'mobileDrawer'

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const filteredSuggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) return []

    return suggestions
      .filter((suggestion) => {
        const label = getSuggestionLabel(suggestion).toLowerCase()
        const href = getSuggestionHref(suggestion).toLowerCase()

        return label.includes(normalizedQuery) || href.includes(normalizedQuery)
      })
      .slice(0, 8)
  }, [query, suggestions])

  useEffect(() => {
    setQuery('')
    setIsOpen(false)
    setActiveIndex(-1)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setQuery(value)
    setIsOpen(value.trim().length > 0)
    setActiveIndex(-1)
  }

  const goToSuggestion = () => {
    if (!query.trim()) {
      inputRef.current?.focus()
      return
    }

    const targetSuggestion = filteredSuggestions[activeIndex] || filteredSuggestions[0]

    if (!targetSuggestion) return

    window.location.href = getSuggestionHref(targetSuggestion)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      goToSuggestion()
      return
    }

    if (!isOpen || filteredSuggestions.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()

      setActiveIndex((prev) => {
        if (prev >= filteredSuggestions.length - 1) return 0
        return prev + 1
      })
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()

      setActiveIndex((prev) => {
        if (prev <= 0) return filteredSuggestions.length - 1
        return prev - 1
      })
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
    }
  }

  const hasDropdown = isOpen && query.trim().length > 0

  const searchBoxClassName = isMobileDrawer
    ? `
      relative flex h-[42px] w-full items-center
      gap-[16px]
      overflow-hidden
      rounded-[8px]
      border-[1.5px] border-[#A6E7EA]
      bg-primary-1/20
      px-[24px]
      text-white-1
      shadow-[inset_0_0_14px_rgba(166,231,234,0.20),0_0_0_1px_rgba(255,255,255,0.14)]
      transition-all duration-300
      focus-within:border-[#BDF4F6]
      focus-within:shadow-[inset_0_0_18px_rgba(166,231,234,0.26),0_0_0_1px_rgba(255,255,255,0.20)]
    `
    : `
      relative flex w-full items-center gap-2
      rounded-[12px]
      border border-secondary-1/10
      bg-white-2
      px-3 py-2.5
      text-secondary-1
      shadow-none
      transition-all duration-300
      focus-within:border-primary-1/35
      focus-within:bg-white-1
      focus-within:shadow-[0_10px_30px_rgba(10,17,40,0.08)]
    `

  const searchIconClassName = isMobileDrawer
    ? `
      size-[16px]
      shrink-0
      object-contain
      opacity-80
    `
    : `
      h-[16px] w-[16px]
      shrink-0
      object-contain
      opacity-70
    `

  const inputClassName = isMobileDrawer
    ? `
      h-full w-full bg-transparent
      font-grift
      text-[18px]
      font-semibold
      leading-none
      tracking-[0.9px]
      text-white-1
      outline-none
      placeholder:text-[#999999]
      placeholder:font-grift
      placeholder:font-semibold
    `
    : `
      w-full bg-transparent
      font-grift text-[13px] uppercase tracking-[0.04em]
      text-secondary-1
      outline-none
      placeholder:text-secondary-1/45
    `

  const dropdownClassName = isMobileDrawer
    ? `
      absolute left-0 right-0 top-full z-[99999]
      mt-3 overflow-hidden
      rounded-[8px]
      border border-primary-2/30
      bg-secondary-1
      text-white-1
      shadow-[0_18px_50px_rgba(0,0,0,0.35)]
    `
    : `
      absolute left-0 right-0 top-full z-[99999]
      mt-2 overflow-hidden
      rounded-[14px]
      border border-secondary-1/10
      bg-white-1
      text-secondary-1
      shadow-[0_18px_50px_rgba(10,17,40,0.22)]
    `

  return (
    <div
      ref={wrapperRef}
      className={`
        relative z-[9999] w-full
        ${center ? 'mx-auto' : ''}
      `}
    >
      <div className={searchBoxClassName}>
        <Image
          src={SearchIcon}
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
          quality={90}
          placeholder="blur"
          blurDataURL={SearchIcon.blurDataURL}
          className={searchIconClassName}
        />

        <input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClassName}
        />

        {isMobileDrawer ? (
          <button
            type="button"
            aria-label="Search"
            onClick={goToSuggestion}
            className="
              flex size-[22px] shrink-0 items-center justify-center
              text-white-1
              transition-transform duration-300
              hover:scale-105
              active:scale-95
            "
          >
            <Image
              src={ArrowRight}
              alt=""
              width={11}
              height={11}
              quality={90}
              placeholder="blur"
              blurDataURL={ArrowRight.blurDataURL}
              className="w-[8px] shrink-0 object-contain"
            />
          </button>
        ) : (
          query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('')
                setIsOpen(false)
                setActiveIndex(-1)
                inputRef.current?.focus()
              }}
              className="
                flex h-5 w-5 shrink-0 items-center justify-center
                rounded-full
                text-secondary-1/50
                transition-colors duration-300
                hover:bg-secondary-1/10
                hover:text-secondary-1
              "
            >
              <span className="text-[14px] leading-none">×</span>
            </button>
          )
        )}
      </div>

      {hasDropdown && (
        <div className={dropdownClassName}>
          {filteredSuggestions.length > 0 ? (
            <ul
              className={
                isMobileDrawer
                  ? 'max-h-[260px] overflow-y-auto bg-secondary-1 py-2 text-white-1'
                  : 'max-h-[260px] overflow-y-auto bg-white-1 py-2 text-secondary-1'
              }
            >
              {filteredSuggestions.map((suggestion, index) => {
                const label = getSuggestionLabel(suggestion)
                const href = getSuggestionHref(suggestion)
                const isActive = index === activeIndex

                return (
                  <li
                    key={`${href}-${index}`}
                    className={
                      isMobileDrawer ? 'bg-secondary-1 text-white-1' : 'bg-white-1 text-secondary-1'
                    }
                  >
                    <Link
                      href={href}
                      onClick={() => {
                        setQuery('')
                        setIsOpen(false)
                        setActiveIndex(-1)
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={
                        isMobileDrawer
                          ? `
                            block px-4 py-3
                            font-grift text-[13px] tracking-[0.04em]
                            transition-all duration-300
                            ${
                              isActive
                                ? 'bg-primary-1/30 text-white-1'
                                : 'bg-secondary-1 text-white-1 hover:bg-primary-1/25 hover:text-white-1'
                            }
                          `
                          : `
                            block px-4 py-3
                            font-grift text-[12px] uppercase tracking-[0.04em]
                            transition-all duration-300
                            ${
                              isActive
                                ? 'bg-primary-1/10 text-primary-1'
                                : 'bg-white-1 text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
                            }
                          `
                      }
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div
              className={
                isMobileDrawer
                  ? `
                    bg-secondary-1 px-4 py-4
                    font-grift text-[13px] tracking-[0.04em]
                    text-white-1/65
                  `
                  : `
                    bg-white-1 px-4 py-4
                    font-grift text-[12px] uppercase tracking-[0.04em]
                    text-secondary-1/65
                  `
              }
            >
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBarSection
