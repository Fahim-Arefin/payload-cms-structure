import React, { FC } from 'react'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CalculatorSection from '@/components/custom/pay-premium/CalculatorSection'

type Props = {}

const page: FC<Props> = ({}) => {
  const heroSlides = [
    {
      title: 'Premium Calculator',
      subtitle: '',
      description: 'Future-Proof Me',
      image: '/assets/premCalculator.png',
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <CalculatorSection />
      <ContactUsSection />
    </div>
  )
}

export default page
