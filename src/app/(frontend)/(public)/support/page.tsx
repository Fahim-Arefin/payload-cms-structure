'use client'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'
import { FaqTabSection } from '@/components/custom/support/FaqTabSection'
import FeedBackSection from '@/components/custom/support/FeedBackSection'
import LevelUpSection from '@/components/custom/support/LevelUpSection'
import { MapTabSection } from '@/components/custom/support/MapTabSection'
import { supportTabContent } from '@/lib/data'
import { useEffect, useState } from 'react'

function SupportPage() {
  const [activeMapTab, setActiveMapTab] = useState('branches')
  const [activeFaqTab, setActiveFaqTab] = useState('general')

  useEffect(() => {
    let lastHash = ''

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) // Remove the # symbol

      // Prevent infinite loops by checking if hash actually changed
      if (hash === lastHash) return
      lastHash = hash

      if (hash) {
        let targetSection = null

        // Handle map tab fragments
        if (hash === 'hospitals') {
          setActiveMapTab('hospitals')
          targetSection = 'map-section'
        } else if (hash === 'branches') {
          setActiveMapTab('branches')
          targetSection = 'map-section'
        }
        // Handle FAQ tab fragments
        else if (hash === 'general') {
          setActiveFaqTab('general')
          targetSection = 'faq-section'
        } else if (hash === 'form') {
          setActiveFaqTab('form')
          targetSection = 'faq-section'
        }

        // Scroll to the target section after a short delay to allow tab to activate
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

  useEffect(() => {
    let lastHash = window.location.hash

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash === lastHash?.substring(1)) return
      lastHash = window.location.hash

      if (hash) {
        let targetSection = null

        if (hash === 'hospitals') {
          setActiveMapTab('hospitals')
          targetSection = 'map-section'
        } else if (hash === 'branches') {
          setActiveMapTab('branches')
          targetSection = 'map-section'
        } else if (hash === 'general') {
          setActiveFaqTab('general')
          targetSection = 'faq-section'
        } else if (hash === 'form') {
          setActiveFaqTab('form')
          targetSection = 'faq-section'
        }

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

    // Initial check (on mount)
    handleHashChange()

    // Listen for hashchange (back/forward navigation, etc)
    window.addEventListener('hashchange', handleHashChange)

    // ALSO: poll for hash changes that Next.js Link might trigger (SPA navigation)
    const interval = setInterval(() => {
      if (window.location.hash !== lastHash) {
        handleHashChange()
      }
    }, 100) // fast enough for UX

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      clearInterval(interval)
    }
  }, [setActiveMapTab, setActiveFaqTab])

  const heroSlides = [
    {
      title: '',
      subtitle: 'SUPPORT',
      description: 'Need help? We aim to deliver support that speaks your language.',
      image: '/assets/suppoprtHero.jpg',
    },
  ]

  const newsSliderData = [
    {
      title: 'Shanta Life Insurance Begins its Journey',
      image: '/assets/newsSlider1.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance gets licence to launch',
      image: '/assets/newsSlider2.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
      image: '/assets/newsSlider3.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance Begins its Journey',
      image: '/assets/newsSlider1.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance gets licence to launch',
      image: '/assets/newsSlider2.jpg',
      date: '6th March, 2025',
    },
    {
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
      image: '/assets/newsSlider3.jpg',
      date: '6th March, 2025',
    },
  ]
  const levelUpData = [
    {
      title: 'Vlog',
      image: '/assets/supportpage/web/levelup1.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup1.jpg',
      link: '/news-and-media#vlog',
    },
    {
      title: 'Blog',
      image: '/assets/supportpage/web/levelup2.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup2.jpg',
      link: '/news-and-media#blog',
    },
    {
      title: 'News',
      image: '/assets/supportpage/web/levelup3.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup3.jpg',
      link: '/news-and-media#news',
    },
    {
      title: 'Vlog',
      image: '/assets/supportpage/web/levelup1.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup1.jpg',
      link: '/news-and-media#vlog',
    },
    {
      title: 'Blog',
      image: '/assets/supportpage/web/levelup2.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup2.jpg',
      link: '/news-and-media#blog',
    },
    {
      title: 'News',
      image: '/assets/supportpage/web/levelup3.jpg',
      mobileImage: '/assets/supportpage/mobile/levelup3.jpg',
      link: '/news-and-media#news',
    },
  ]

  const tabItems = [
    {
      value: 'branches',
      label: 'OUR BRANCHES',
    },
    {
      value: 'hospitals',
      label: 'PANEL HOSPITALS',
    },
  ]
  const faqItems = [
    {
      value: 'general',
      label: 'GENERAL FAQ',
    },
    {
      value: 'form',
      label: 'DOWNLOAD FORMS',
    },
  ]



  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        top=" top-[220px] md:top-[150px] lg:top-[50%]"
        // height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[578px] "
        // height=" h-[252px] md:h-[352px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px] "
        position="[object-position:50%_50px] md:[object-position:50%_-10%]"
      />
      <div id="map-section">
        <MapTabSection config={tabItems} data={supportTabContent} initialTab={activeMapTab} />
      </div>
      <div id="faq-section">
        <FaqTabSection config={faqItems} initialTab={activeFaqTab} />
      </div>
      {/* <GeneralFaq /> */}
      <CatchTheBuzzSection />
      {/* <NewsSliderSection data={newsSliderData} /> */}
      <FeedBackSection />
      <LevelUpSection data={levelUpData} />
    </div>
  )
}

export default SupportPage
