'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AllNewsAndBlogDataType } from '@/types'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Props = {
  bgColor?: string
  paddingOn?: boolean
  text: string
  allContent: AllNewsAndBlogDataType[]
}

function SearchNews({ bgColor, paddingOn = false, text, allContent }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<AllNewsAndBlogDataType[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Search logic
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.trim().length === 0) {
      setSearchResults([])
      setShowSuggestions(false)
      return
    }

    const filtered = allContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  // Handle suggestion click
  const handleSuggestionClick = (id: number) => {
    router.push(`/news-and-media/${id}`)
    setShowSuggestions(false)
    setSearchQuery('')
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <div
      className={`${paddingOn && ' px-5 pt-12 md:px-24 md:pt-24 lg:px-[130px]  lg:pt-[110px] xl:px-[200px]  xl:pt-[100px] 2xl:px-[300px] 2xl:pt-[150px] '}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0 ">
        <h1 className="global-h1 font-semibold uppercase">{text}</h1>
        <div className="bg-[#FAF2EA] p-2 rounded-lg relative" ref={searchRef}>
          <div
            className="flex items-center bg-white max-w-full
          rounded-xl 
          md:px-1.5 lg:px-2.5 xl:px-3 2xl:px-3.5 
          md:py-0.5 lg:py-1 xl:py-2  2xl:py-2.5 
          md:w-[250px] lg:w-[300px] xl:w-[400px] 2xl:w-[470px] "
          >
            <Input
              type="text"
              placeholder="Search blogs and news..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="placeholder:text-[#ABABAB] shadow-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sm text-lg"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-black hover:bg-transparent"
              onClick={() => handleSearch(searchQuery)}
            >
              <div className="w-[18px] md:w-5 lg:w-6 xl:w-7">
                <img src="/assets/icons/web/searchbar2.png" alt="" className="w-full h-full" />
              </div>
            </Button>
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && searchResults.length > 0 && (
            <div className="absolute top-full left-2 right-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSuggestionClick(item.id)}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex gap-3">
                    {/* web */}
                    <div className="relative w-12 h-9 lg:w-16 lg:h-12 ">
                      <Image
                        fill
                        src={item.image}
                        alt={item.title}
                        className="object-cover rounded flex-shrink-0"
                        sizes="350px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {item.description.substring(0, 100)}...
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {showSuggestions && searchResults.length === 0 && searchQuery.trim() && (
            <div className="absolute top-full left-2 right-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchNews
