import { ChildEducationTabs } from '@/components/custom/child-education/ChildEducationTabs'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import Link from 'next/link'
import { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Shanta Child Education Plan ',
      subtitle: '',
      description: 'Set them up for success - nurture their boundless potential.',
      image: '/assets/childEducationPlan.jpg',
    },
  ]

  const childInfoData = {
    image: '/assets/childBanner2.png',
    description: `Shanta Life’s Child Education Plan is designed to help parents build an education fund while offering robust life insurance protection. It's a perfect blend of savings and security for every milestone in your child’s journey.`,
  }

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
        description:
          'Receive the full sum assured at the end of the policy term to support higher education goals.',
        image: '/assets/childTabIcon2.png',
      },
      {
        title: 'Life Coverage',
        description: 'In the event of the parent’s death, the plan ensures:',
        listItems: [
          "Monthly stipend (1%, 2%, or 3% of the sum assured, based on plan choice) till policy maturity to ensure the child's education quality.",
          'Waiver of all future premiums while continuing full coverage.',
          'Full maturity benefit paid at term-end.',
        ],
        image: '/assets/childTabIcon5.png',
      },
      {
        title: 'Tax Benefits',
        description: 'Enjoy tax rebates on premiums, avail upto 15% tax rebate. ',
        image: '/assets/childTabIcon3.png',
      },

      {
        title: 'Customizable Coverage',
        description: 'Choose a sum assured based on your child’s future needs.',
        image: '/assets/childTabIcon1.png',
      },
      {
        title: 'Flexible Premium Payments',
        description: 'Opt for monthly, quarterly, half-yearly, or annual premium modes.',
        image: '/assets/childTabIcon6.png',
      },
      {
        title: 'Partner Discounts',
        description:
          'Avail exclusive discounts on medical and diagnostic services at partnered hospitals and diagnostic centers.',
        image: '/assets/childTabIcon4.png',
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
      <PlanInfoSection bgColor="#FCF4EB" data={childInfoData} />
      <ChildEducationTabs data={tabContent} config={tabItems} />
      <ContactUsSection />
    </div>
  )
}

export default page
