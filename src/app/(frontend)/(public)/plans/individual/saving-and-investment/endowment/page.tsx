import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import { Tab } from '@/components/custom/shared/Tab'

import React from 'react'

function EndowmentPage() {
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
    image: '/assets/planInfo2.png',
    description:
      'Secure your future with confidence. Shanta Life\u2019s Endowment Plan offers policyholders a guaranteed sum assured, seamlessly blending savings and life insurance to ensure long-term financial security for their families.',
  }

  // tab-config.ts
  const tabItems = [
    {
      value: 'features',
      label: 'KEY FEATURES',
    },
    {
      value: 'eligibility',
      label: 'PLAN ELIGIBILITY',
    },
    {
      value: 'benefits',
      label: 'Additional Benefits',
    },
  ]

  const tabContent = [
    {
      content: [
        {
          title: 'Maturity Benefit',
          description: 'Receive a guaranteed sum assured at the end of the policy term.',
          image: '/assets/tabimage1.png',
        },
        {
          title: 'Tax Benefits',
          description: 'Enjoy tax rebates on premiums, subject to prevailing tax laws.',
          image: '/assets/tabimage2.png',
        },
        {
          title: 'Flexible Premium Payments',
          description:
            'Pay your premiums monthly, quarterly, half-yearly, or annually—your choice, your pace.',
          image: '/assets/tabimage3.png',
        },
        {
          title: 'Life Coverage',
          description:
            'In the event of the policyholder’s death during the term, the nominee receives the full sum assured.',
          image: '/assets/tabimage4.png',
        },
        {
          title: 'Customizable Coverage',
          description: 'Choose a sum assured that fits your financial goals.',
          image: '/assets/tabimage5.png',
        },
        {
          title: 'Partner Discounts',
          description:
            'Get exclusive discounts on medical and diagnostic services at select hospitals and diagnostic centers in our partner network.',
          image: '/assets/tabimage6.png',
        },
      ],
    },
    {
      content: [
        {
          title: 'Minimum Entry Age',
          description: 'Individuals must be at least 18 years old to purchase this plan.',
          image: '/assets/tabimage1.png',
        },
        {
          title: 'Maximum Entry Age',
          description: 'Applicants can be up to 60 years old at the time of policy inception.',
          image: '/assets/tabimage2.png',
        },
        {
          title: 'Medical Requirements',
          description: 'Medical underwriting may be required based on sum assured and age.',
          image: '/assets/tabimage3.png',
        },
        {
          title: 'Valid ID Proof',
          description: 'A government-issued ID is mandatory for verification.',
          image: '/assets/tabimage4.png',
        },
      ],
    },
    {
      content: [
        {
          title: 'Loyalty Additions',
          description: 'Enjoy loyalty bonuses for staying invested through the entire policy term.',
          image: '/assets/tabimage1.png',
        },
        {
          title: 'Accidental Death Benefit',
          description:
            'Receive an additional payout in case of accidental death, over and above the base sum assured.',
          image: '/assets/tabimage2.png',
        },
        {
          title: 'Terminal Illness Benefit',
          description: 'Get early access to the sum assured upon diagnosis of a terminal illness.',
          image: '/assets/tabimage3.png',
        },
        {
          title: 'Premium Waiver',
          description:
            'Future premiums are waived in case of disability or critical illness, as per policy terms.',
          image: '/assets/tabimage4.png',
        },
      ],
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <PlanInfoSection bgColor="#F6EDDD" data={planInfoData} />
      <Tab config={tabItems} data={tabContent} />
      <ContactUsSection />
    </div>
  )
}

export default EndowmentPage
