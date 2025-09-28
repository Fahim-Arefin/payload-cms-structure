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
import LocalizedString from '@/components/custom/shared/LocalizedString'

function EndowmentPage() {
  const heroSlides = [
    {
      title: 'Shanta Endowment Plan',
      titleBN: 'শান্তা এনডাওমেন্ট প্ল্যান',
      subtitle: '',
      description: 'A promise that grows with time and care.',
      descriptionBN: 'সময় ও যত্নে বেড়ে ওঠার অটুট প্রতিশ্রুতি।',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/s&i-banner.png`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/endowment/web/planInfo2.png`,
    // mobileImage:
    //   '/assets/solutions/individual/saving-and-investment/endowment/mobile/planInfo2.png',
    descriptionBN: `আপনার ভবিষ্যৎ হোক নিশ্চিন্ত ও সুরক্ষিত। নিশ্চিত সুরক্ষা আর সঞ্চয়ের পূর্ণাঙ্গ সমাধান — শান্তা লাইফের এনডাওমেন্ট প্ল্যান।`,
    description:
      'Secure your future with confidence. Shanta Life\u2019s Endowment Plan offers policyholders a guaranteed sum assured, seamlessly blending savings and life insurance to ensure long-term financial security for their families.',
  }

  // tab-config.ts
  const tabItems = [
    {
      value: 'features',
      label: 'KEY FEATURES',
      labelBN: 'মূল সুবিধাসমূহ',
    },
    {
      value: 'eligibility',
      label: 'PLAN ELIGIBILITY',
      labelBN: 'বীমা পরিকল্পনার বৈশিষ্ট্য',
    },
    {
      value: 'benefits',
      label: 'Additional Benefits',
      labelBN: 'অতিরিক্ত সুবিধা',
    },
  ]

  const tabContent = {
    features: [
      {
        title: 'Maturity Benefit',
        titleBN: 'মেয়াদপূর্তি সুবিধা',
        description: 'Receive a guaranteed sum assured at the end of the policy term.',
        descriptionBN: 'পলিসির মেয়াদ শেষে নিশ্চিত বীমা অংক প্রাপ্তি',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon2.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon2.png',
      },
      {
        title: 'Tax Benefits',
        titleBN: `আয়কর রেয়াত সুবিধা`,
        description: 'Enjoy tax rebates on premiums, subject to prevailing tax laws.',
        descriptionBN: `কর আইন সাপেক্ষে প্রদত্ত প্রিমিয়ামের ওপর কর ছাড়/ রেয়াত`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon3.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon3.png',
      },
      {
        title: 'Flexible Premium Payments',
        titleBN: 'সুবিধাজনক প্রিমিয়াম পরিশোধের ধরণ',
        description:
          'Pay your premiums monthly, quarterly, half-yearly, or annually—your choice, your pace.',
        descriptionBN: `পলিসি নেওয়ার সময় আপনার সুবিধা অনুযায়ী মাসিক, ত্রৈমাসিক, অর্ধ-বার্ষিক বা বার্ষিক—যেকোনো প্রিমিয়াম পরিশোধের ধরন বেছে নিতে পারেন।`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon6.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon6.png',
      },
      {
        title: 'Life Coverage',
        titleBN: `মৃত্যুজনিত কভারেজ`,
        description:
          'In the event of the policyholder’s death during the term, the nominee receives the full sum assured.',
        descriptionBN: `বীমা চলমান অবস্থায় বীমাকৃত ব্যক্তির মৃত্যু হলে সুবিধাগ্রাহীকে পুরো বীমা অংক প্রদান`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon5.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon5.png',
      },
      {
        title: 'Customizable Coverage',
        titleBN: `প্রয়োজন অনুযায়ী কাভারেজ`,
        description: 'Choose a sum assured that fits your financial goals.',
        descriptionBN: `আপনার চাহিদা বা পছন্দ অনুসারে বীমা অংক/কভারেজ এবং সময়কাল নির্ধারণের স্বাধীনতা`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon1.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon1.png',
      },
      {
        title: 'Partner Discounts',
        titleBN: `চিকিৎসাসেবায় বিশেষ ছাড়`,
        description:
          'Get exclusive discounts on medical and diagnostic services at select hospitals and diagnostic centers in our partner network.',
        descriptionBN: `নির্বাচিত নেটওয়ার্ক হাসপাতাল এবং ডায়াগনস্টিক সেন্টারগুলিতে চিকিৎসা ও ডায়াগনস্টিক পরিষেবাগুলিতে বিশেষ ছাড়`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon4.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon4.png',
      },
    ],
    eligibility: [
      {
        title: 'Eligibility',
        titleBN: 'আবেদন করার বয়স',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childIcon.svg`,
        // mobileIcon:"/assets/icons/mobile/childIcon.svg",
        // bgImage:"/assets/eligibilityImage1.jpg",
        entryMin: '30',
        entryMinBN: '৩০',
        entryMinLabel: 'Days',
        entryMinLabelBN: 'দিন',
        entryMax: '60',
        entryMaxBN: '৬০',
        entryMaxLabel: 'Years',
        entryMaxLabelBN: 'বছর',
        policyTerm: '10-25',
        policyTermBN: '১০- ২৫',
        policyTermLabel: 'Years',
        policyTermLabelBN: 'বছর',
        maturityAge: '70',
        maturityAgeBN: '৭০',
        maturityAgeLabel: 'Years',
        maturityAgeLabelBN: 'বছর',
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
            <GlobalButton size="large" text="Purchase" variant="primary" className="">
              <LocalizedString en="Purchase" bn="কিনুন" />
            </GlobalButton>
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
