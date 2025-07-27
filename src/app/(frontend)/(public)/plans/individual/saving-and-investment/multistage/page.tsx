import FourStagePlan from '@/components/custom/multistage/FourStagePlan'
import MultiPlansSection from '@/components/custom/multistage/MultiPlansSection'
import MultiStageTab from '@/components/custom/multistage/MultiStageTab'

import StagePlanTitle from '@/components/custom/multistage/StagePlanTitle'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import ToolTip from '@/components/custom/shared/ToolTip'
import { FC } from 'react'
import Link from 'next/link'

type Props = {}

const page: FC<Props> = ({}) => {
  const heroSlides = [
    {
      title: 'Shanta Multi-Stage Maturity Plans',
      subtitle: '',
      description: `Since life has more than one milestone, 
      we’re with you at each one.`,
      image: '/assets/banners/multistage.png',
    },
  ]

  const planInfoData = {
    image: '/assets/multistagePlan.png',
    description:
      'Some dreams can’t wait. Whether it’s funding your child’s education, celebrating a life event, or building a safety net for the future—Shanta Life’s Multi-Stage Maturity Plan is your financial partner through it all. With guaranteed payouts at key stages and full protection throughout, it’s the smart way to stay prepared for what’s next!!',
  }

  const threeStageData = [
    { name: '1/3 of the policy term', value: 25 },
    { name: '2/3 of the policy term', value: 25 },
    { name: 'Remaining Sum Assured', value: 50 },
  ]

  const planData = [
    { image: '/assets/time.png', timeline: '12 YEARS' },
    { image: '/assets/time.png', timeline: '15 YEARS' },
    { image: '/assets/time.png', timeline: '18 YEARS' },
    { image: '/assets/time.png', timeline: '21 YEARS' },
    { image: '/assets/time.png', timeline: '24 YEARS' },
    { image: '/assets/time.png', timeline: '27 YEARS' },
  ]

  // tab-config.ts
  const tabItems = [
    {
      value: 'features',
      label: 'KEY FEATURES',
    },
    {
      value: 'benefits',
      label: 'Additional Benefits',
    },
  ]

  const tabContent = {
    features: [
      {
        title: 'Multiple Guaranteed Payouts',
        description:
          'Enjoy your benefits when you need them most—not just at the end. Structured payouts help you meet life’s big moments head-on.',
        image: '/assets/tabimage1.png', // You can use or update this image as needed
      },
      {
        title: 'Maturity Benefit',
        description:
          'Receive the final lump sum at the end of your policy term to complete your journey with confidence.',
        image: '/assets/tabimage1.png',
      },
      {
        title: 'Life Coverage',
        description:
          'Life Coverage That Never Compromises. In case of the unfortunate demise passing, your family receives the full sum assured—regardless of earlier stage payouts.',
        image: '/assets/tabimage4.png',
      },
      {
        title: 'Tax Benefits',
        description:
          'Get rewarded for being responsible—enjoy up to 15% tax rebates on premiums under existing tax laws.',
        image: '/assets/tabimage2.png',
      },
      {
        title: 'Flexible Premium Payments',
        description:
          'Pay monthly, quarterly, half-yearly, or annually—it’s all about your convenience.',
        image: '/assets/tabimage3.png',
      },
      {
        title: 'Healthcare Partner Discounts',
        description:
          'Save more with exclusive discounts at top hospitals and diagnostic centers across our trusted partner network.',
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
       hero-content-width flex justify-left space-x-4 md:space-x-6 lg:justify-start"
        >
          <Link href="/purchase">
            <GlobalButton size="large" text="Purchase" variant="primary" className="" />
          </Link>
          <CallNowButton />
        </div>
      </HeroSection>
      <PlanInfoSection bgColor="#F6EDDD" data={planInfoData} />
      <MultiStageTab config={tabItems} data={tabContent} />
      <StagePlanTitle />
      <MultiPlansSection data={threeStageData} planData={planData} />
      <FourStagePlan />
      {/* <FiveStagePlan /> */}

      <ContactUsSection />
    </div>
  )
}

export default page
