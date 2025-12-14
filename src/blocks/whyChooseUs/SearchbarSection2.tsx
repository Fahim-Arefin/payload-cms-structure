'use client'

import { Input } from '@/components/ui/input'
import React, { useState, useRef, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useRouter } from 'next/navigation'
import useSSRLanguage from '@/hooks/useSSRLanguage'

type SearchSuggestion = {
  label: string
  url: string
}

type Props = {
  suggestions: SearchSuggestion[]
  backgroundColor?: string
}

function SearchBarSection2({ suggestions, backgroundColor }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const lang = useSSRLanguage()

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
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim()) {
      const lower = value.toLowerCase()
      const filtered = suggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(lower),
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
      setFilteredSuggestions([])
    }
    setActiveSuggestion(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeSuggestion >= 0) {
        handleSuggestionClick(filteredSuggestions[activeSuggestion])
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setActiveSuggestion(-1)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.label)
    setShowSuggestions(false)
    setActiveSuggestion(-1)
    router.push(suggestion.url)
  }

  return (
    <div
      // lg:pt-24 lg:pb-0
      className="z-40 flex justify-center items-center px-10 py-12 sm:p-8 md:p-16 lg:p-24"
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className="w-full md:max-w-sm lg:max-w-xl bg-[#F6EDDD] rounded-lg md:rounded-md 
        relative
        py-1 px-1.5 md:py-1.5 md:px-2 lg:py-2 lg:px-2.5 "
      >
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'bn' ? 'খুঁজুন' : 'Search...'}
          className="w-full rounded-xl md:rounded-md bg-white text-[#000000] placeholder:text-[#000000]/70 
          placeholder:text-xs sm:placeholder:text-sm tracking-[0.03em] py-4 px-5 sm:py-5 sm:px-12 
          h-[40px] md:h-[45px] lg:h-[60px] xl:h-[70px] "
        />

        <div className="hidden lg:block absolute right-5 sm:right-10 top-1/2 -translate-y-1/2">
          <CiSearch size={28} />
        </div>
        <div className="lg:hidden absolute right-5 sm:right-10 top-1/2 -translate-y-1/2">
          <CiSearch size={24} />
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.url}-${index}`}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                  index === activeSuggestion ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestion(index)}
              >
                <div className="flex items-center gap-2">
                  <CiSearch size={16} className="text-gray-400" />
                  <span className="text-sm font-medium">{suggestion.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBarSection2
