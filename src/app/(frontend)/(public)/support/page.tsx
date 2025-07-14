import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'
import FeedBackSection from '@/components/custom/support/FeedBackSection'
import GeneralFaq from '@/components/custom/support/GeneralFaq'
import NewsSliderSection from '@/components/custom/support/NewsSliderSection'
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

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <GeneralFaq />
      <CatchTheBuzzSection />
      <NewsSliderSection data={newsSliderData} />
      <FeedBackSection />
    </div>
  )
}

export default SupportPage
