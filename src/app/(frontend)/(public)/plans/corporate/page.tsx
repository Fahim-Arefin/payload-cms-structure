import CorporateChoose from '@/components/custom/corporate/CorporateChoose'
import CorporateHighlight from '@/components/custom/corporate/CorporateHighlights'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Shanta Corporate Plans',
      subtitle: '',
      description: 'When you go further for your people, they go further for you.',
      image: '/assets/corporatePlans.png',
    },
  ]

  const highlightData = [
    {
      mainDescription:
        'Deciding on the best package for your team, making sure you’re getting value for money, staying on top of the options available… It can all add up to a daunting to-do list. We’re here to make that easier for you.',
    },
  ]

  const benefitsData = [
    {
      icon: '/assets/corporateBenefits1.png',
      text: 'Comprehensive Coverage',
      description: 'Protection against natural and accidental deaths, disabilities, and critical illnesses.',
    },
    {
      icon: '/assets/corporateBenefits2.png',
      text: 'HEALTH BENEFITS',
      description: 'In-patient, outpatient, maternity, dental, and optical care for total well-being.'
    },
    {
      icon: '/assets/corporateBenefits3.png',
      text: 'EFFORTLESS CLAIMS',
      description: 'Cashless hospitalization and a smooth claims process.',

    },
    {
      icon: '/assets/corporateBenefits4.png',
      text: 'GLOBAL CARE ACCESS',
      description: 'Trusted medical support locally and worldwide.',
    },
    {
      icon: '/assets/corporateBenefits5.png',
      text: 'STRONG TOGETHER',
      description: 'Foster loyalty and belonging by investing in your team’s well-being.',
    },
  ]
  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <CorporateHighlight highlightsData={highlightData} />
      <CorporateChoose benefitsData={benefitsData}/>

      <ContactUsSection />
    </div>
  )
}

export default page
