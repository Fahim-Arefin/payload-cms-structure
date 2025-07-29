import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import { Tab } from '@/components/custom/shared/Tab'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'

import React from 'react'
import Link from 'next/link'

function EndowmentPage() {
  const heroSlides = [
    {
      title: 'Shanta Endowment Plan',
      subtitle: '',
      description: 'A promise that grows with time and care.',
      image: '/assets/banners/s&i-banner.png',
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

  const tabContent = {
    features: [
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
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute bottom-12 lg:top-[500px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <Link href="/purchase">
            <GlobalButton size="large" text="Purchase" variant="primary" className="" />
          </Link>
          <CallNowButton />
        </div>
      </HeroSection>
      <PlanInfoSection bgColor="#F6EDDD" data={planInfoData} />
      <Tab config={tabItems} data={tabContent} />
      <ContactUsSection />
    </div>
  )
}

export default EndowmentPage
