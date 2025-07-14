import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'
import FeedBackSection from '@/components/custom/support/FeedBackSection'
import GeneralFaq from '@/components/custom/support/GeneralFaq'
import LevelUpSection from '@/components/custom/support/LevelUpSection'
import { MapTabSection } from '@/components/custom/support/MapTabSection'

import NewsSliderSection from '@/components/custom/support/NewsSliderSection'

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
  const levelUpData = [
    {
      title: 'Vlog',
      image: '/assets/levelup1.jpg',
    },
    {
      title: 'Blog',
      image: '/assets/levelup2.jpg',
    },
    {
      title: 'News',
      image: '/assets/levelup3.jpg',
    },
    {
      title: 'Vlog',
      image: '/assets/levelup1.jpg',
    },
    {
      title: 'Blog',
      image: '/assets/levelup2.jpg',
    },
    {
      title: 'News',
      image: '/assets/levelup3.jpg',
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

  const tabContent = [
    {
      content: {
        office_location: 'Shanta Life Insurance PLC, Dhaka',
        office_address: 'Shanta Western Tower, 186 Bir Uttam Mir Shawkat Sarak, Dhaka 1208',
        office_email: 'info@shantalife.com',
        office_phone: '09610889900 (10 am to 6 pm, Sunday to Thursday)',
      },
    },
    {
      content: {
        office_location: 'Shanta Life Insurance PLC, Dhaka',
        office_address: 'Shanta Western Tower, 186 Bir Uttam Mir Shawkat Sarak, Dhaka 1208',
        office_email: 'info@shantalife.com',
        office_phone: '09610889900 (10 am to 6 pm, Sunday to Thursday)',
      },
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <MapTabSection config={tabItems} data={tabContent} />
      <GeneralFaq />
      <CatchTheBuzzSection />
      <NewsSliderSection data={newsSliderData} />
      <FeedBackSection />
      <LevelUpSection data={levelUpData} />
    </div>
  )
}

export default SupportPage
