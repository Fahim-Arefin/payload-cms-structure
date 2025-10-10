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
import LocalizedString from '@/components/custom/shared/LocalizedString'

type Props = {}

const page: FC<Props> = ({}) => {
  const heroSlides = [
    {
      title: 'Shanta Multi-Stage Maturity Plans',
      titleBN: 'শান্তা মাল্টি-স্টেজ ম্যাচিউরিটি প্ল্যান',
      subtitle: '',
      description: `Since life has more than one milestone, 
      we’re with you at each one.`,
      descriptionBN: `জীবনের প্রতিটি মাইলফলকে, আপনার পাশে।`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/multi-stage/web/multistage.png`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/multi-stage/web/multistagePlan.png`,
    mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/multi-stage/mobile/multistagePlan.png`,
    description: `Some dreams can’t wait. 
      Whether it’s funding your child’s education, celebrating a life event, or building a safety net for the 
      future—Shanta Life’s Multi-Stage Maturity Plan is your financial partner through it all. 
      With guaranteed payouts at key stages and full protection throughout, 
      it’s the smart way to stay prepared for what’s next!! 
      Pick a plan from below that suits your need.`,
    descriptionBN: `কিছু স্বপ্নের কোনো অপেক্ষা হয় না। হতে পারে সেটা আপনার সন্তানের শিক্ষার ব্যায়, 
      জীবনের বিশেষ কোনো মুহূর্ত উদযাপন বা ভবিষ্যতের আর্থিক নিরাপত্তা—ধাপে ধাপে সেইসব স্বপ্নপূরণে আপনার পাশে থাকবে শান্তা লাইফের মাল্টি-স্টেজ ম্যাচিউরিটি প্ল্যান। 
      প্রয়োজন অনুযায়ী বেছে নিন নিচের উপযুক্ত প্ল্যান।`,
  }

  const threeStageData = [
    { name: '1/3 of the policy term', value: 25 },
    { name: '2/3 of the policy term', value: 25 },
    { name: 'Remaining Sum Assured', value: 50 },
  ]

  const planData = [
    { image: '/assets/time.png', timeline: '12 YEARS', timelineBN: '১২ বছর' },
    { image: '/assets/time.png', timeline: '15 YEARS', timelineBN: '১৫ বছর' },
    { image: '/assets/time.png', timeline: '18 YEARS', timelineBN: '১৮ বছর' },
    { image: '/assets/time.png', timeline: '21 YEARS', timelineBN: '২১ বছর' },
    { image: '/assets/time.png', timeline: '24 YEARS', timelineBN: '২৪ বছর' },
    { image: '/assets/time.png', timeline: '27 YEARS', timelineBN: '২৭ বছর' },
  ]

  // tab-config.ts
  const tabItems = [
    {
      value: 'features',
      label: 'KEY FEATURES',
      labelBN: 'মূল সুবিধাসমূহ',
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
        descriptionBN: `পলিসির মেয়াদ শেষে নিশ্চিত বীমা অংক প্রাপ্তি`,

        image: '/assets/solutions/individual/saving-and-investment/multi-stage/web/tabimage1.png',
        mobileImage:
          '/assets/solutions/individual/saving-and-investment/multi-stage/mobile/tabimage1.png',
      },
      {
        title: 'Flexible Premium Payments',
        titleBN: 'সুবিধাজনক প্রিমিয়াম পরিশোধের ধরণ',
        description:
          'Pay your premiums monthly, quarterly, half-yearly, or annually-your choice, your pace.',
        descriptionBN: `পলিসি নেওয়ার সময় আপনার সুবিধা অনুযায়ী মাসিক, ত্রৈমাসিক, অর্ধ-বার্ষিক বা বার্ষিক—যেকোনো 
        প্রিমিয়াম পরিশোধের ধরন বেছে নিতে পারেন।`,
        image: '/assets/solutions/individual/saving-and-investment/multi-stage/web/tabimage3.png',
        mobileImage:
          '/assets/solutions/individual/saving-and-investment/multi-stage/mobile/tabimage3.png',
      },
      {
        title: 'Customizable Coverage',
        titleBN: 'প্রয়োজন অনুযায়ী কভারেজ',
        description:
          'Enjoy your benefits when you need them most—not just at the end. Structured payouts help you meet life’s big moments head-on.',
        descriptionBN:
          'আপনার চাহিদা বা পছন্দ অনুসারে বীমা অংক/কভারেজ এবং সময়কাল নির্ধারণের স্বাধীনতা',
        image: '/assets/solutions/individual/saving-and-investment/multi-stage/web/tabimage1.png', // You can use or update this image as needed
        mobileImage:
          '/assets/solutions/individual/saving-and-investment/multi-stage/mobile/tabimage1.png', // You can use or update this image as needed
      },

      {
        title: 'Tax Benefits',
        titleBN: 'আয়কর রেয়াত সুবিধা',
        description: 'Enjoy tax rebates on premiums, subject to prevailing tax laws.',
        descriptionBN: 'কর আইন সাপেক্ষে প্রদত্ত প্রিমিয়ামের ওপর কর ছাড়/রেয়াত',
        image: '/assets/solutions/individual/saving-and-investment/multi-stage/web/tabimage2.png',
        mobileImage:
          '/assets/solutions/individual/saving-and-investment/multi-stage/mobile/tabimage2.png',
      },

      {
        title: 'Life Coverage',
        titleBN: 'মৃত্যুজনিত কভারেজ',
        description:
          'In the event of the policyholder’s death during the term, the nominee receives the full sum assured.',
        descriptionBN:
          'বীমা চলমান অবস্থায় বীমাকৃত ব্যক্তির মৃত্যু হলে সুবিধাগ্রাহীকে পুরো বীমা অংক প্রদান',
        image: '/assets/solutions/individual/saving-and-investment/multi-stage/web/tabimage4.png',
        mobileImage:
          '/assets/solutions/individual/saving-and-investment/multi-stage/mobile/tabimage4.png',
      },

      {
        title: 'Healthcare Partner Discounts',
        titleBN: 'চিকিৎসাসেবায় বিশেষ ছাড়',
        description:
          'Get exclusive discounts on medical and diagnostic services at select hospitals and diagnostic centers in our partner network.',
        descriptionBN:
          'নির্বাচিত নেটওয়ার্ক হাসপাতাল এবং ডায়াগনস্টিক সেন্টারগুলিতে চিকিৎসা ও ডায়াগনস্টিক পরিষেবাগুলিতে বিশেষ ছাড়',
        image: '/assets/solutions/individual/saving-and-investment/multi-stage/web/tabimage6.png',
        mobileImage:
          '/assets/solutions/individual/saving-and-investment/multi-stage/mobile/tabimage6.png',
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
            <GlobalButton size="large" text="Purchase" variant="primary" className="">
              <LocalizedString en="Purchase" bn="কিনুন" />
            </GlobalButton>
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
