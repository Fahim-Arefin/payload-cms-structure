'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AllNewsAndBlogDataType } from '@/types'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  bgColor?: string
  paddingOn?: boolean
  text: string
}

function SearchNews({ bgColor, paddingOn = false, text }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<AllNewsAndBlogDataType[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Combined data from both blogs and news
  const allContent: AllNewsAndBlogDataType[] = [
    // Blog data
    {
      id: 1,
      image: '/assets/news-and-media/web/newsandblog1.jpg',
      mobileImage: '/assets/news-and-media/mobile/newsandblog1.jpg',
      date: 'Jul 17, 2025',
      title: 'What is the Potential of the Insurance Sector in Bangladesh?',
      description:
        'We know that currently, there are 36 life insurance companies in Bangladesh. If we look at the life insurance penetration in Bangladesh, it is just over 0.4% of the GDP. This figure alone indicates that the existing insurance companies in Bangladesh have not yet fully capitalized on the available opportunities.',
    },
    {
      id: 3,
      image: '/assets/news-and-media/web/newsandblog3.jpg',
      mobileImage: '/assets/news-and-media/mobile/newsandblog3.jpg',
      date: 'Jul 17, 2025',
      title: 'What Steps Should Be Taken to Develop the Insurance Sector?',
      description:
        'Companies working in the insurance sector — along with regulatory body, IDRA — have been making efforts for a long time. One of the biggest ongoing challenges in our industry is the lack of trust. Restoring that trust is essential.',
    },
    // News data
    {
      id: 2,
      image: '/assets/news-and-media/web/news2.jpg',
      mobileImage: '/assets/news-and-media/mobile/news2.jpg',
      date: 'Jul 17, 2025',
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
      description:
        "Shanta Life Insurance PLC, a new venture under Shanta Holdings, signed an MoU with Dhaka Bank to provide Bancassurance service through the bank's distribution channel.",
      externalLink:
        'https://www.thedailystar.net/business/organisation-news/press-releases/news/shanta-life-insurance-and-dhaka-bank-sign-mou-jointly-prepare-bancassurance-3843041',
    },
    {
      id: 4,
      image: '/assets/news-and-media/web/news11.jpg',
      mobileImage: '/assets/news-and-media/mobile/news11.jpg',
      date: 'Jul 17, 2025',
      title: 'Shanta Life Insurance gets license to launch',
      description:
        'Bangladesh\'s insurance sector is set to expand through the launch of a new venture, "Shanta Life Insurance PLC". The company came into being through a consortium comprising Shanta Holdings Ltd.',
      externalLink:
        'https://www.thedailystar.net/business/news/shanta-life-insurance-gets-licence-launch-3464831',
    },
  ]

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
                    {/* mobile */}
                    <img
                      src={item.mobileImage}
                      alt={item.title}
                      className="lg:hidden w-12 h-9 object-cover rounded flex-shrink-0"
                    />
                    {/* web */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="hidden lg:block w-16 h-12 object-cover rounded flex-shrink-0"
                    />
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
