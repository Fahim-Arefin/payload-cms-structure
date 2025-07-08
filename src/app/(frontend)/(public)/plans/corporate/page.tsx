import CorporateChoose from '@/components/custom/corporate/CorporateChoose'
import CorporateHighlight from '@/components/custom/corporate/CorporateHighlights'
import CorporateSuitability from '@/components/custom/corporate/CorporateSuitability'
import PartnerCarousel from '@/components/custom/corporate/PartnerCarousel'
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
      icon: '/assets/corporatebenefits1.png',
      text: 'Comprehensive Coverage',
      description: 'Protection against natural and accidental deaths, disabilities, and critical illnesses.',
    },
    {
      icon: '/assets/corporatebenefits2.png',
      text: 'HEALTH BENEFITS',
      description: 'In-patient, outpatient, maternity, dental, and optical care for total well-being.'
    },
    {
      icon: '/assets/corporatebenefits3.png',
      text: 'EFFORTLESS CLAIMS',
      description: 'Cashless hospitalization and a smooth claims process.',

    },
    {
      icon: '/assets/corporatebenefits4.png',
      text: 'GLOBAL CARE ACCESS',
      description: 'Trusted medical support locally and worldwide.',
    },
    {
      icon: '/assets/corporatebenefits5.png',
      text: 'STRONG TOGETHER',
      description: 'Foster loyalty and belonging by investing in your team’s well-being.',
    },
  ]

   const suitabilityData = [
  {
    img: "/assets/suitability1.png",
    title: "FOR LIFE COVERAGE",
    description:
      "All regular and healthy eligible employees aged 18 to 64 are qualified for coverage. New hires shall get immediate protection under the scheme from day one seamless and stress-free security from the beginning of their journey with your company.",
  },
  {
    img: "/assets/suitability2.png",
    title: "FOR LIFE COVERAGE",
    description:
      "All eligible employees are suitable for this coverage. Expanding this coverage to employees’ dependents provides an additional level of support. It reflects a deep commitment not only to the employee but also to their family, promoting a sense of security, care and well-being for their entire household.",
  },
];

const partnerData = [
  {
    img: '/assets/partner1.png',
    title: 'GOLDEN HARVEST',
  },
  {
    img: '/assets/partner2.png',
    title: 'PARTEX STAR GROUP',
  },
  {
    img: '/assets/partner3.png',
    title: 'AMERICAN & EFRID, INC',
  },
  {
    img: '/assets/partner4.png',
    title: 'GE HEALTHCARE',
  },
 
]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <CorporateHighlight highlightsData={highlightData} />
      <CorporateChoose benefitsData={benefitsData}/>
      <CorporateSuitability data={suitabilityData}/>
      <PartnerCarousel data={partnerData}/>
      <ContactUsSection />
    </div>
  )
}

export default page
