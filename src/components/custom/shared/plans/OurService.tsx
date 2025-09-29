'use client'
import React, { useEffect, useState } from 'react'
import { MapTabSection } from '../../support/MapTabSection'
import { supportTabContent } from '@/lib/data'
import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedText from '../LocalizedText'

type Props = {}

function OurService({}: Props) {
  const [activeMapTab, setActiveMapTab] = useState('branches')
  const tabItems = [
    {
      value: 'branches',
      label: 'OUR BRANCHES',
      labelBN: 'আমাদের শাখাসমূহ'
    },
    {
      value: 'hospitals',
      label: 'PANEL HOSPITALS',
      labelBN: 'প্যানেল হসপিটাল'
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

        // Handle map tab fragments
        if (hash === 'hospitals') {
          setActiveMapTab('hospitals')
          targetSection = 'map-section'
        } else if (hash === 'branches') {
          setActiveMapTab('branches')
          targetSection = 'map-section'
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
  }, [setActiveMapTab])

  return (
    <div className="bg-white">
      <div
        className="px-5 pt-12 
           md:px-24 md:pt-[40px] 
           lg:px-[130px]  lg:pt-[50px] 
           xl:px-[200px]  xl:pt-[70px] 
           2xl:px-[300px] 2xl:pt-[100px]"
      >
        {/* heading */}
        <div className="space-y-6">
          <div className="flex space-x-2">
            <h3 className="global-h2 uppercase font-bold text-[#434343]">
              <LocalizedHighlighted
                textEn="Where You Can Avail Our Services"
                highlightEn="Our Services"
                textBn="যেখানে এই সেবা পাওয়া যাবে"
                highlightBn="সেবা পাওয়া"
                highlightClassName="text-[#ED7125]"
              />
            </h3>
          </div>
          <div className="global-span text-[#434343] font-light">
            <LocalizedText
              en="This benefit is available only at designated hospitals within the Shanta Life Hospital
            Network. We are continuously expanding our partnerships to provide broader access across
            Bangladesh. "
              bn="এই সুবিধা কেবলমাত্র Shanta Life Hospital Network-এর অনুমোদিত হাসপাতালে প্রযোজ্য। 
              আমরা ক্রমাগত আমাদের হাসপাতাল নেটওয়ার্ক বিস্তৃত করছি যাতে সারা বাংলাদেশে 
              আরও বেশি স্থানে আপনারা এই সুবিধা পান।"
            />
          </div>
        </div>
      </div>
      <div></div>
      <MapTabSection
        config={tabItems}
        data={supportTabContent}
        initialTab={activeMapTab}
        bgColor="#FFFFFF"
      />
    </div>
  )
}

export default OurService
