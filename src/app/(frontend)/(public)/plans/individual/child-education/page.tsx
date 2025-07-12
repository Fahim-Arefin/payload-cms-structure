import ChildEducationPlan from '@/components/custom/child-education/ChildEducationPlan'
import { ChildEducationTabs } from '@/components/custom/child-education/ChildEducationTabs'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React, { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Shanta Child Education Plan ',
      subtitle: '',
      description: 'Set them up for success - nurture their boundless potential.',
      image: '/assets/childeducationBanner.jpg',
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
      <ChildEducationPlan data={childInfoData} />
      <ChildEducationTabs data={tabContent} config={tabItems} />
    </div>
  )
}

export default page
