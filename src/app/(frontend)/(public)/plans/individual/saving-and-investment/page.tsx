import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import EndowmentSection from '@/components/custom/shared/plans/EndowmentSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function SavingAndInvestment() {
  const heroSlides = [
    {
      title: 'SAVING AND INVESTMENT PLANS',
      subtitle: '',
      description:
        'The right life insurance doesn\u2019t just wait around for the what-ifs—it walks beside you through the what\u2019s next.',
      image: '/assets/banners/s&i-banner.png',
    },
  ]

  const planInfoData = {
    image: '/assets/solutions/individual/saving-and-investment/web/planInfo6.png',
    mobileImage: '/assets/solutions/individual/saving-and-investment/web/planInfo6.png',
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
        image: '/assets/icons/web/feature1.png',
        mobileImage: '/assets/icons/mobile/feature1.png',
      },
      {
        name: 'Death Benefit',
        image: '/assets/icons/web/feature2.png',
        mobileImage: '/assets/icons/mobile/feature2.png',
      },
      {
        name: 'Grace Period',
        image: '/assets/icons/web/feature3.png',
        mobileImage: '/assets/icons/mobile/feature3.png',
      },
      {
        name: 'Surrender & Policy Loan Facility',
        image: '/assets/icons/web/feature4.png',
        mobileImage: '/assets/icons/mobile/feature4.png',
      },
      {
        name: 'Tax Benefits',
        image: '/assets/icons/web/feature5.png',
        mobileImage: '/assets/icons/mobile/feature5.png',
      },
      {
        name: 'Additional Rider Facility (If taken)',
        image: '/assets/icons/web/feature6.png',
        mobileImage: '/assets/icons/mobile/feature6.png',
      },
    ],
    image: '/assets/solutions/individual/saving-and-investment/web/endowment1.jpg',
    mobileImage: '/assets/solutions/individual/saving-and-investment/mobile/endowment1.jpg',
    link: '/plans/individual/saving-and-investment/endowment',
  }

  const multiStagePlanData = {
    title: 'Multi stage Maturity Plans',
    subtitle: 'Shanta',
    description:
      'Shanta Lifes multi stage plans provides the policy owner a guaranteed sum assured. This unique plan combines savings and life insurance components which serves the need for financial security of your family.',
    feature: [
      {
        name: 'Maturity Value',
        image: '/assets/icons/web/feature1.png',
        mobileImage: '/assets/icons/mobile/feature1.png',
      },
      {
        name: 'Death Benefit',
        image: '/assets/icons/web/feature2.png',
        mobileImage: '/assets/icons/mobile/feature2.png',
      },
      {
        name: 'Grace Period',
        image: '/assets/icons/web/feature3.png',
        mobileImage: '/assets/icons/mobile/feature3.png',
      },
      {
        name: 'Surrender & Policy Loan Facility',
        image: '/assets/icons/web/feature4.png',
        mobileImage: '/assets/icons/mobile/feature4.png',
      },
      {
        name: 'Tax Benefits',
        image: '/assets/icons/web/feature5.png',
        mobileImage: '/assets/icons/mobile/feature5.png',
      },
      {
        name: 'Additional Rider Facility (If taken)',
        image: '/assets/icons/web/feature6.png',
        mobileImage: '/assets/icons/mobile/feature6.png',
      },
    ],
    image: '/assets/solutions/individual/saving-and-investment/web/multistage-11.jpg',
    mobileImage: '/assets/solutions/individual/saving-and-investment/mobile/multistage-11.jpg',
    link: '/plans/individual/saving-and-investment/multistage',
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
            {/* <Button
              variant="primary"
              className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[30px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
            >
              Purchase Now
            </Button> */}
            <GlobalButton size="large" className="" text="Purchase" variant="primary" />
          </Link>
          <CallNowButton />
        </div>
      </HeroSection>
      <PlanInfoSection bgColor="#FFFFFF" data={planInfoData} />
      <EndowmentSection data={endowmentData} content="left" bgColor="#F6EDDD" />
      <EndowmentSection data={multiStagePlanData} content="right" />
      <ContactUsSection />
    </div>
  )
}

export default SavingAndInvestment
