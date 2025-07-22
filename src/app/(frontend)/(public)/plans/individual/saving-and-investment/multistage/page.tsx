import FourStagePlan from '@/components/custom/multistage/FourStagePlan'
import MultiPlansSection from '@/components/custom/multistage/MultiPlansSection'
import MultiStageTab from '@/components/custom/multistage/MultiStageTab'

import StagePlanTitle from '@/components/custom/multistage/StagePlanTitle'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import { FC } from 'react'

type Props = {}

const page: FC<Props> = ({}) => {
  const heroSlides = [
    {
      title: 'Shanta Multi-Stage Maturity Plans',
      subtitle: '',
      description: 'Because Life Has More Than One Milestone. We’re With You at Every One.',
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
          className="absolute top-[205px] md:top-[305px] lg:top-[400px] xl:top-[420px]  2xl:top-[630px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          {/* <Button
            variant="primary"
            className="
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
          >
            Purchase Now
          </Button> */}
          <ToolTip>
            <GlobalButton
              size="large"
              className="cursor-not-allowed"
              text="Purchase Now"
              variant="primary"
            />
          </ToolTip>
          {/* <Button
            className=" px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6 w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] rounded border border-white text-white bg-white/20 backdrop-blur-md
             hover:bg-white/30 hover:border-white transition-colors duration-300"
          >
            Call Now
          </Button> */}
          <ToolTip>
            <GlobalButton
              size="large"
              className="cursor-not-allowed border border-white text-white bg-white/30 backdrop-blur-md  hover:bg-white/30 hover:border-white "
              text="Call Now"
              variant="primary"
            />
          </ToolTip>
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
