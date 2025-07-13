import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'
import GeneralFaq from '@/components/custom/support/GeneralFaq'
import React from 'react'

function SupportPage() {
  const heroSlides = [
    {
      title: '',
      subtitle: 'SUPPORT',
      description: '',
      image: '/assets/banner8.jpg',
    },
  ]
  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <GeneralFaq />
      <CatchTheBuzzSection />
      {/* Add more sections as needed */}
    </div>
  )
}

export default SupportPage
