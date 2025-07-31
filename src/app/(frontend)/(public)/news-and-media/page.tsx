'use client'
import InsuranceCard from '@/components/custom/home/InsuranceCard'
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

        // Handle blog, news, and vlog fragments
        if (hash === 'blog') {
          targetSection = 'blog-section'
        } else if (hash === 'news') {
          targetSection = 'news-section'
        } else if (hash === 'vlog') {
          targetSection = 'vlog-section'
        }

        // Scroll to the target section after a short delay
        if (targetSection) {
          setTimeout(() => {
            const element = document.getElementById(targetSection)
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
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

  const insuranceCardData = [
    {
      title: 'Necessity of awareness of life insurance',
      image: '/assets/thumbnails/1.png',
      videoLink: 'https://youtube.com/embed/n9fFhLkJwLg',
      description: '',
    },
    {
      title: 'Living benefits of life insurance',
      image: '/assets/thumbnails/2.png',
      videoLink: 'https://www.youtube.com/embed/mUn_HAvpbag',
      description: '',
    },
    {
      title: 'Digitalization of life insurance industry',
      image: '/assets/thumbnails/3.png',
      videoLink: 'https://www.youtube.com/embed/DzMzN76gELM',
      description: '',
    },
  ]

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

      {/* VLOG section */}
      <div id="vlog-section"
        className={`px-5 
           md:px-24 
           lg:px-[130px]   
           xl:px-[200px]  
           2xl:px-[300px]
            pt-[30px] md:pt-[40px] lg:pt-[50px] xl:pt-[60px] 2xl:pt-[70px]
            pb-12 md:pb-24 lg:pb-[110px] xl:pb-[100px] 2xl:pb-[150px]`}
      >
        <div className="flex justify-end items-center mb-8 md:mb-12">
          <h1 className="global-h1 font-semibold uppercase">VLOG</h1>
        </div>
        <div className="grid grid-cols-3 gap-1 md:gap-2 lg:gap-6">
          {insuranceCardData?.map((item, i) => (
            <InsuranceCard data={item} key={i} />
          ))}
        </div>
      </div>

      <div id="news-section">
        <AllNewsAccordianSection />
      </div>
    </div>
  )
}
