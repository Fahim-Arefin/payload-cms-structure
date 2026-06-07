// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Input } from '@/components/ui/input'
// import { SearchSuggestion } from './ServerNavbar'

// type Props = {
//   suggestions?: SearchSuggestion[]
//   center?: boolean
// }

// function SearchBarSection({ suggestions = [], center }: Props) {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([])
//   const [showSuggestions, setShowSuggestions] = useState(false)
//   const [activeSuggestion, setActiveSuggestion] = useState(-1)

//   const inputRef = useRef<HTMLInputElement>(null)
//   const suggestionsRef = useRef<HTMLDivElement>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         suggestionsRef.current &&
//         !suggestionsRef.current.contains(event.target as Node) &&
//         inputRef.current &&
//         !inputRef.current.contains(event.target as Node)
//       ) {
//         setShowSuggestions(false)
//         setActiveSuggestion(-1)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value

//     setSearchTerm(value)
//     setActiveSuggestion(-1)

//     if (!value.trim()) {
//       setFilteredSuggestions([])
//       setShowSuggestions(false)
//       return
//     }

//     const lower = value.toLowerCase()

//     const filtered = suggestions.filter((suggestion) =>
//       suggestion.label.toLowerCase().includes(lower),
//     )

//     setFilteredSuggestions(filtered)
//     setShowSuggestions(filtered.length > 0)
//   }

//   const handleSuggestionClick = (suggestion: SearchSuggestion) => {
//     setSearchTerm(suggestion.label)
//     setShowSuggestions(false)
//     setActiveSuggestion(-1)

//     router.push(suggestion.url)
//   }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (!showSuggestions || filteredSuggestions.length === 0) {
//       return
//     }

//     if (e.key === 'ArrowDown') {
//       e.preventDefault()

//       setActiveSuggestion((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0))
//     }

//     if (e.key === 'ArrowUp') {
//       e.preventDefault()

//       setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1))
//     }

//     if (e.key === 'Enter') {
//       e.preventDefault()

//       if (activeSuggestion >= 0) {
//         handleSuggestionClick(filteredSuggestions[activeSuggestion])
//       } else if (filteredSuggestions.length > 0) {
//         handleSuggestionClick(filteredSuggestions[0])
//       }
//     }

//     if (e.key === 'Escape') {
//       setShowSuggestions(false)
//       setActiveSuggestion(-1)
//       inputRef.current?.blur()
//     }
//   }

//   return (
//     <div
//       className="
//         text-white-1 relative z-30
//         space-y-4 xl:space-y-5
//       "
//     >
//       <div
//         className={`
//           font-grift font-bold
//           leading-[140%] tracking-[-0.6px]
//           text-white-1
//             ${center ? ` text-center text-[16px]` : ` text-[12px] md:text-[12px] lg:text-[14px] xl:text-[20px] 2xl:text-[22px] `} `}
//       >
//         SEARCH NOW!
//       </div>

//       <div className="relative">
//         <Input
//           ref={inputRef}
//           type="text"
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           placeholder="Search Our Products . . . "
//           className="
//             font-manrope global-p5
//             rounded-none
//             border-[1.5px] border-cyan
//             text-cyan font-bold
//             placeholder:font-manrope placeholder:global-p5 placeholder:text-cyan placeholder:font-bold
//             bg-white/10
//             focus:outline-none focus:ring-0
//             focus-visible:outline-none
//             focus-visible:ring-1 focus-visible:ring-[#686893]
//             focus-visible:ring-offset-0
//             focus-visible:border-[#686893]
//             p-2 lg:p-3 xl:p-4 2xl:p-5
//           "
//         />
//         {/* <div className="text-cyan text-[10px] font-manrope font-bold mt-1">try typing sagar</div> */}

//         {showSuggestions && filteredSuggestions.length > 0 && (
//           <div
//             ref={suggestionsRef}
//             className="
//               absolute left-0 right-0 top-full z-50
//               mt-2
//               max-h-[240px] overflow-y-auto
//               border-[1.5px] border-cyan
//               bg-dark-1
//               shadow-lg
//             "
//           >
//             {filteredSuggestions.map((suggestion, index) => {
//               const isActive = index === activeSuggestion

//               return (
//                 <button
//                   key={`${suggestion.url}-${index}`}
//                   type="button"
//                   onClick={() => handleSuggestionClick(suggestion)}
//                   onMouseEnter={() => setActiveSuggestion(index)}
//                   className={`
//                     flex w-full items-center justify-between
//                     border-b border-cyan/20 last:border-b-0
//                     px-3 py-2 lg:px-4 lg:py-3
//                     text-left
//                     font-manrope global-p5 font-bold
//                     transition-all duration-300
//                     ${
//                       isActive
//                         ? 'bg-cyan text-dark-1'
//                         : 'bg-transparent text-cyan hover:bg-cyan hover:text-dark-1'
//                     }
//                   `}
//                 >
//                   <span>{suggestion.label}</span>

//                   <span className="text-current">↗</span>
//                 </button>
//               )
//             })}
//           </div>
//         )}
//       </div>
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

import SearchIcon from '/public/assets/icons/search-icon.png'

type Props = {
  suggestions: SearchSuggestion[]
  center?: boolean
  placeholder?: string
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

function SearchBarSection({ suggestions, center = false, placeholder = 'Search...' }: Props) {
  const pathname = usePathname()

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

    if (event.key === 'Enter') {
      const activeSuggestion = filteredSuggestions[activeIndex]

      if (!activeSuggestion) return

      window.location.href = getSuggestionHref(activeSuggestion)
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
    }
  }

  const hasDropdown = isOpen && query.trim().length > 0

  return (
    <div
      ref={wrapperRef}
      className={`
        relative z-[9999] w-full
        ${center ? 'mx-auto' : ''}
      `}
    >
      <div
        className="
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
        "
      >
        <Image
          src={SearchIcon}
          alt=""
          aria-hidden="true"
          width={18}
          height={18}
          quality={90}
          placeholder="blur"
          blurDataURL={SearchIcon.blurDataURL}
          className="h-[16px] w-[16px] shrink-0 object-contain opacity-70"
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
          className="
            w-full bg-transparent
            font-grift text-[13px] uppercase tracking-[0.04em]
            text-secondary-1
            outline-none
            placeholder:text-secondary-1/45
          "
        />

        {query && (
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
        )}
      </div>

      {hasDropdown && (
        <div
          className="
            absolute left-0 right-0 top-full z-[9999]
            mt-2 overflow-hidden
            rounded-[14px]
            border border-secondary-1/10
            bg-white-1
            text-secondary-1
            shadow-[0_18px_50px_rgba(10,17,40,0.22)]
          "
        >
          {filteredSuggestions.length > 0 ? (
            <ul className="max-h-[260px] overflow-y-auto bg-white-1 py-2 text-secondary-1">
              {filteredSuggestions.map((suggestion, index) => {
                const label = getSuggestionLabel(suggestion)
                const href = getSuggestionHref(suggestion)
                const isActive = index === activeIndex

                return (
                  <li key={`${href}-${index}`} className="bg-white-1 text-secondary-1">
                    <Link
                      href={href}
                      onClick={() => {
                        setQuery('')
                        setIsOpen(false)
                        setActiveIndex(-1)
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`
                        block px-4 py-3
                        font-grift text-[12px] uppercase tracking-[0.04em]
                        transition-all duration-300

                        ${
                          isActive
                            ? 'bg-primary-1/10 text-primary-1'
                            : 'bg-white-1 text-secondary-1 hover:bg-primary-1/10 hover:text-primary-1'
                        }
                      `}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div
              className="
                bg-white-1 px-4 py-4
                font-grift text-[12px] uppercase tracking-[0.04em]
                text-secondary-1/65
              "
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
