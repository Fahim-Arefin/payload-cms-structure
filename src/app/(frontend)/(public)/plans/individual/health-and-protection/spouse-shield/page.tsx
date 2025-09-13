import CallNowButton from '@/components/custom/shared/CallNowButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import LifestyleSection from '@/components/custom/spouse-shield/LifestyleSection'
import { PlanTabs } from '@/components/custom/spouse-shield/PlanTabs'
import React from 'react'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Spouse Shield',
      description: `Securing your shared journey, protecting your family’s tomorrow`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/hero-banner.jpg`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/intro-banner.png`,
    // mobileImage:
    //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/planInfo4.png',
    description: `Life is a shared journey, built on love and responsibility. 
    Shanta Spouse Shield gives you a smarter way to safeguard your financial future, 
    ensuring protection in every step of tomorrow. `,
  }

  const lifestyleData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/lifestyle-banner.jpg`,
    title: `Tailored Options`,
    subTitle: `for Your Lifestyle`,
    description: `To match the needs of modern families, Shanta Spouse Shield offers two flexible plans, 
    giving you the freedom to choose the protection that best suits your way of life.`,
  }

    // tab-config.ts
  const tabItems = [
    {
      value: 'planA',
      label: 'Plan A',
    },
    {
      value: 'planB',
      label: 'Plan B',
    },
  ]

  const tabContent = {
    title: 'Insurance',
    coloredTitle: 'Coverages',
    planA: [
      {
        title: 'Life Coverage',
        description:
          `In the event of the insured spouse’s unexpected demise, this plan provides the insured with 50% or 100% of the 
          coverage amount, depending on the chosen option. Premiums are not refundable in case of the spouse’s 
          survival till maturity.`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/icon1.png`,
      },
    ],
    planB: [
          {
        title: 'Life Coverage',
        description:
          `In the event of the insured spouse’s unexpected demise, 
          this plan provides the insured with 50% or 100% of the coverage amount, 
          depending on the chosen option.`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/icon1.png`,
      },
            {
        title: 'Smart Exit',
        description:
          `At the end of the policy term, your spouse’s survival ensures a full refund of 
          the premium paid for this supplementary coverage.`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/icon2.png`,
      },
    ],
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[250px] md:top-[330px] lg:top-[420px] xl:top-[450px]  2xl:top-[700px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <CallNowButton />
          </div>
        </div>
      </HeroSection>
       <PlanInfoSection data={planInfoData} />
       <LifestyleSection data={lifestyleData}/>
       <PlanTabs config={tabItems} data={tabContent}/>
    </div>
  )
}

export default page
