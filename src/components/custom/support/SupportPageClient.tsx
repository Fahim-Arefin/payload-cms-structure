// src/components/custom/support/SupportPageClient.tsx
'use client'

import { useEffect, useState } from 'react'
import type { TabDataType } from '@/types'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'
import { FaqTabSection } from '@/components/custom/support/FaqTabSection'
import FeedBackSection from '@/components/custom/support/FeedBackSection'
import LevelUpSection from '@/components/custom/support/LevelUpSection'
import { MapTabSection } from '@/components/custom/support/MapTabSection'
import useHospitalsCache from '@/hooks/useHospitalCache'

type Props = {
  // [0] = branches block (unchanged local data)
  // [1] = hospitals block ({ content: hospitalsFromServerMapped })
  mapTabData: TabDataType[]
}

export default function SupportPageClient({ mapTabData }: Props) {
  const [activeMapTab, setActiveMapTab] = useState<'branches' | 'hospitals'>('branches')
  const [activeFaqTab, setActiveFaqTab] = useState<'general' | 'form'>('general')

  // ---- Localized hero slides (unchanged) ----
  const heroSlides = [
    {
      title: '',
      subtitle: 'SUPPORT',
      subtitleBN: 'সাপোর্ট',
      description: 'Need help? We aim to deliver support that speaks your language.',
      descriptionBN: 'আপনার সকল প্রশ্নের সমাধান, এক জায়গায়',
      image: '/assets/suppoprtHero.jpg',
    },
  ]

  // ---- Tabs config (unchanged) ----
  const tabItems = [
    { value: 'branches', label: 'OUR BRANCHES', labelBN: 'আমাদের ব্রাঞ্চ সমূহ' },
    { value: 'hospitals', label: 'PANEL HOSPITALS', labelBN: 'প্যানেল হসপিটাল' },
  ]
  const faqItems = [
    { value: 'general', label: 'GENERAL FAQ', labelBN: 'সাধারণ জিজ্ঞাসা' },
    { value: 'form', label: 'DOWNLOAD FORMS', labelBN: 'ডাউনলোড ফরম' },
  ]

  // ---- Hash handling (kept from your working code) ----
  useEffect(() => {
    let lastHash = ''
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash === lastHash) return
      lastHash = hash

      let target: 'map-section' | 'faq-section' | null = null
      if (hash === 'hospitals') (setActiveMapTab('hospitals'), (target = 'map-section'))
      else if (hash === 'branches') (setActiveMapTab('branches'), (target = 'map-section'))
      else if (hash === 'general') (setActiveFaqTab('general'), (target = 'faq-section'))
      else if (hash === 'form') (setActiveFaqTab('form'), (target = 'faq-section'))

      if (target) {
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }

    // initial
    handleHashChange()
    // listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    let lastHash = window.location.hash
    const handle = () => {
      const hash = window.location.hash.substring(1)
      if (hash === lastHash.substring(1)) return
      lastHash = window.location.hash
      if (hash === 'hospitals') setActiveMapTab('hospitals')
      else if (hash === 'branches') setActiveMapTab('branches')
      else if (hash === 'general') setActiveFaqTab('general')
      else if (hash === 'form') setActiveFaqTab('form')
    }
    handle()
    window.addEventListener('hashchange', handle)
    const interval = setInterval(() => {
      if (window.location.hash !== lastHash) handle()
    }, 100)
    return () => {
      window.removeEventListener('hashchange', handle)
      clearInterval(interval)
    }
  }, [])

  // ---- LocalStorage caching for hospitals (NEW) ----
  const branchesBlock = mapTabData[0]
  const hospitalsBlock = mapTabData[1]
  const initialHospitals = (hospitalsBlock?.content ?? []) as any[]
  const { data: cachedHospitals } = useHospitalsCache(initialHospitals)

  // feed cached hospitals to the map tabs, branches unchanged
  const finalMapTabData: TabDataType[] = [
    branchesBlock,
    { content: cachedHospitals },
  ]

  // You can default the active tab to 'hospitals' if desired; keeping your original default 'branches'
  return (
    <div className="font-avenir bg-white">
      

      <div id="map-section">
        <MapTabSection
          config={tabItems}
          data={finalMapTabData}
          initialTab={activeMapTab}
        />
      </div>

      <div id="faq-section">
        <FaqTabSection
          config={faqItems}
          initialTab={activeFaqTab}
        />
      </div>

      <CatchTheBuzzSection />
      <FeedBackSection />
      {/* <LevelUpSection
        data={[
          {
            title: 'Vlog',
            titleBN: 'ভ্লগ',
            image: '/assets/supportpage/web/levelup1.jpg',
            mobileImage: '/assets/supportpage/mobile/levelup1.jpg',
            link: '/news-and-media#vlog',
          },
          {
            title: 'Blog',
            titleBN: 'ব্লগ',
            image: '/assets/supportpage/web/levelup2.jpg',
            mobileImage: '/assets/supportpage/mobile/levelup2.jpg',
            link: '/news-and-media#blog',
          },
          {
            title: 'News',
            titleBN: 'নিউজ',
            image: '/assets/supportpage/web/levelup3.jpg',
            mobileImage: '/assets/supportpage/mobile/levelup3.jpg',
            link: '/news-and-media#news',
          },
        ]}
      /> */}
    </div>
  )
}
