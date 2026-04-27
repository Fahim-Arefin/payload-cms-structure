'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { SearchSuggestion } from './ServerNavbar'

type Props = {
  suggestions?: SearchSuggestion[]
  center?: boolean
}

function SearchBarSection({ suggestions = [], center }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setActiveSuggestion(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchTerm(value)
    setActiveSuggestion(-1)

    if (!value.trim()) {
      setFilteredSuggestions([])
      setShowSuggestions(false)
      return
    }

    const lower = value.toLowerCase()

    const filtered = suggestions.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(lower),
    )

    setFilteredSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.label)
    setShowSuggestions(false)
    setActiveSuggestion(-1)

    router.push(suggestion.url)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) {
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()

      setActiveSuggestion((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0))
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()

      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1))
    }

    if (e.key === 'Enter') {
      e.preventDefault()

      if (activeSuggestion >= 0) {
        handleSuggestionClick(filteredSuggestions[activeSuggestion])
      } else if (filteredSuggestions.length > 0) {
        handleSuggestionClick(filteredSuggestions[0])
      }
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false)
      setActiveSuggestion(-1)
      inputRef.current?.blur()
    }
  }

  return (
    <div
      className="
        text-white-1 relative z-30
        space-y-4 xl:space-y-5
      "
    >
      <div
        className={`
          font-proxima font-bold
          leading-[140%] tracking-[-0.6px]
          text-white-1
            ${center ? ` text-center text-[16px]` : ` text-[12px] md:text-[12px] lg:text-[14px] xl:text-[20px] 2xl:text-[22px] `} `}
      >
        SEARCH NOW!
      </div>

      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Our Products . . . "
          className="
            font-manrope global-p5
            rounded-none
            border-[1.5px] border-cyan
            text-cyan font-bold
            placeholder:font-manrope placeholder:global-p5 placeholder:text-cyan placeholder:font-bold
            bg-white/10
            focus:outline-none focus:ring-0
            focus-visible:outline-none
            focus-visible:ring-1 focus-visible:ring-[#686893]
            focus-visible:ring-offset-0
            focus-visible:border-[#686893]
            p-2 lg:p-3 xl:p-4 2xl:p-5
          "
        />
        {/* <div className="text-cyan text-[10px] font-manrope font-bold mt-1">try typing sagar</div> */}

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="
              absolute left-0 right-0 top-full z-50
              mt-2
              max-h-[240px] overflow-y-auto
              border-[1.5px] border-cyan
              bg-dark-1
              shadow-lg
            "
          >
            {filteredSuggestions.map((suggestion, index) => {
              const isActive = index === activeSuggestion

              return (
                <button
                  key={`${suggestion.url}-${index}`}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setActiveSuggestion(index)}
                  className={`
                    flex w-full items-center justify-between
                    border-b border-cyan/20 last:border-b-0
                    px-3 py-2 lg:px-4 lg:py-3
                    text-left
                    font-manrope global-p5 font-bold
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-cyan text-dark-1'
                        : 'bg-transparent text-cyan hover:bg-cyan hover:text-dark-1'
                    }
                  `}
                >
                  <span>{suggestion.label}</span>

                  <span className="text-current">↗</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBarSection
