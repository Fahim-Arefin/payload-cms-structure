'use client'
import AllNewsAccordianSection from '@/components/custom/news-and-media/AllNewsAccordianSection'
import AllNewsSection from '@/components/custom/news-and-media/AllNewsSection'
import SearchNews from '@/components/custom/news-and-media/SearchNews'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { useEffect } from 'react'

export default function NewsAndMedia() {
  const heroSlides = [
    {
      title: 'News & Media',
      subtitle: '',
      description: 'Focus on highlights',
      image: '/assets/news_media_hero.jpg',
    },
  ]

  useEffect(() => {
    let lastHash = ''
    
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) // Remove the # symbol
      
      // Prevent infinite loops by checking if hash actually changed
      if (hash === lastHash) return
      lastHash = hash
      
      if (hash) {
        let targetSection = null
        
        // Handle blog and news fragments
        if (hash === 'blog') {
          targetSection = 'blog-section'
        } else if (hash === 'news') {
          targetSection = 'news-section'
        }

        // Scroll to the target section after a short delay
        if (targetSection) {
          setTimeout(() => {
            const element = document.getElementById(targetSection)
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              })
            }
          }, 150)
        }
      }
    }

    // Check hash on component mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] "
        top=" top-[150px] md:top-[200px] lg:top-[43%]"
        position="[object-position:50%_60%]"
      />
      <div id="blog-section">
        <SearchNews paddingOn text="BLOGS" />
        <AllNewsSection />
      </div>
      <div id="news-section">
        <AllNewsAccordianSection />
      </div>
    </div>
  )
}
