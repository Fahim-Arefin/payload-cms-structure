import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import EndowmentSection from '@/components/custom/shared/plans/EndowmentSection'
import React from 'react'

function SavingAndInvestment() {
  const heroSlides = [
    {
      title: '',
      subtitle: '',
      description:
        'The right life insurance doesn\u2019t just wait around for the what-ifs—it walks beside you through the what\u2019s next.',
      image: '/assets/banner5.jpg',
    },
  ]

  const planInfoData = {
    image: '/assets/planInfo1.png',
    description:
      'Looking for a savings plan that does more than just save? Shanta Life brings you tailored savings & investment-linked insurance plans that secure your dreams—while protecting the ones you love.',
  }

  const endowmentData = {
    title: 'Endowment Plan',
    subtitle: 'Shanta',
    description:
      'Shanta Lifes endowment plan provides the policy owner a guaranteed sum assured. This unique plan combines savings and life insurance components which serves the need for financial security of your family.',
    feature: [
      {
        name: 'Maturity Value',
        image: '/assets/feature1.png',
      },
      {
        name: 'Death Benefit',
        image: '/assets/feature2.png',
      },
      {
        name: 'Grace Period',
        image: '/assets/feature3.png',
      },
      {
        name: 'Surrender & Policy Loan Facility',
        image: '/assets/feature4.png',
      },
      {
        name: 'Tax Benefits',
        image: '/assets/feature5.png',
      },
      {
        name: 'Additional Rider Facility (If taken)',
        image: '/assets/feature6.png',
      },
    ],
    image: '/assets/endowment1.jpg',
    link: '/plans/individual/saving-and-investment/endowment',
  }

  const multiStagePlanData = {
    title: 'Multi stages Plans',
    subtitle: 'Shanta',
    description:
      'Shanta Lifes endowment plan provides the policy owner a guaranteed sum assured. This unique plan combines savings and life insurance components which serves the need for financial security of your family.',
    feature: [
      {
        name: 'Maturity Value',
        image: '/assets/feature1.png',
      },
      {
        name: 'Death Benefit',
        image: '/assets/feature2.png',
      },
      {
        name: 'Grace Period',
        image: '/assets/feature3.png',
      },
      {
        name: 'Surrender & Policy Loan Facility',
        image: '/assets/feature4.png',
      },
      {
        name: 'Tax Benefits',
        image: '/assets/feature5.png',
      },
      {
        name: 'Additional Rider Facility (If taken)',
        image: '/assets/feature6.png',
      },
    ],
    image: '/assets/endowment2.png',
    link: '/',
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <PlanInfoSection bgColor="#FFFFFF" data={planInfoData} />
      <EndowmentSection data={endowmentData} content="left" bgColor="#F6EDDD" />
      <EndowmentSection data={multiStagePlanData} content="right" />
      <ContactUsSection />
    </div>
  )
}

export default SavingAndInvestment
