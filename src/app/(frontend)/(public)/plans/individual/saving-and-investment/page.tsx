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
import LocalizedString from '@/components/custom/shared/LocalizedString'

function SavingAndInvestment() {
  const heroSlides = [
    {
      title: 'SAVING AND INVESTMENT PLANS',
      titleBN: 'সেভিংস এন্ড ইনভেস্টমেন্ট প্ল্যানস',
      subtitle: '',
      description:
        'The right life insurance doesn\u2019t just wait around for the what-ifs—it walks beside you through the what\u2019s next.',
      descriptionBN: 'একটি সঠিক বীমা পরিকল্পনা শুধু ভবিষ্যতের জন্য নয়, এটি বর্তমানেরও আর্থিক ঢাল ',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/s&i-banner.png`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/planInfo6.png`,
    // mobileImage: '/assets/solutions/individual/saving-and-investment/web/planInfo6.png',
    descriptionBN: `সঞ্চয় আর স্বপ্নের সুরক্ষা একসাথে—শান্তা লাইফের কাস্টমাইজড সেভিংস ও ইনভেস্টমেন্ট-লিঙ্কড প্ল্যানস এর সঙ্গে।`,
    description:
      'Looking for a savings plan that does more than just save? Shanta Life brings you tailored savings & investment-linked insurance plans that secure your dreams—while protecting the ones you love.',
  }

  const endowmentData = {
    title: 'Endowment Plan',
    titleBN: 'এনডাওমেন্ট প্ল্যান',
    subtitle: 'Shanta',
    subtitleBN: 'শান্তা',
    description:
      'Shanta Life’s endowment plan provides the policy owner a guaranteed sum assured. This unique plan combines savings and life insurance components which serves the need for financial security of your family.',
    descriptionBN: `শান্তা লাইফের এনডাওমেন্ট  প্ল্যান পলিসি গ্রহীতাকে একটি নিশ্চিত বীমাঅঙ্ক প্রদান করে। এই বিশেষ প্ল্যানটি সঞ্চয় এবং 
      জীবনবীমার সমন্বয়ে তৈরি, যা আপনার পরিবারের আর্থিক নিরাপত্তার চাহিদা পূরণ করে।`,
    feature: [
      {
        name: 'Maturity Value',
        nameBN: 'ম্যাচিউরিটি ভ্যালু',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature1.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature1.png`,
      },
      {
        name: 'Death Benefit',
        nameBN: 'ডেথ বেনিফিট ',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature2.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature2.png`,
      },
      {
        name: 'Grace Period',
        nameBN: 'গ্রেস পিরিয়ড',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature3.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature3.png`,
      },
      {
        name: 'Surrender & Policy Loan Facility',
        nameBN: 'সারেন্ডার ও পলিসি লোন সুবিধা ',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature4.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature4.png`,
      },
      {
        name: 'Tax Benefits',
        nameBN: 'ট্যাক্স সুবিধা',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature5.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature5.png`,
      },
      {
        name: 'Additional Rider Facility (If taken)',
        nameBN: 'অতিরিক্ত রাইডার সুবিধা (যদি নেওয়া হয়)',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature6.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature6.png`,
      },
    ],
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/endowment1.jpg`,
    mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/mobile/endowment1.jpg`,
    link: '/plans/individual/saving-and-investment/endowment',
  }

  const multiStagePlanData = {
    title: 'Multi stage Maturity Plans',
    titleBN: 'মাল্টি স্টেজ ম্যাচিউরিটি প্ল্যানস ',
    subtitle: 'Shanta',
    subtitleBN: 'শান্তা',
    description: `With Shanta Multi-stage Maturity Plans, receive the coverage
    amount in scheduled installments over time, providing financial
    security to support your future goals and safeguard what matters most.`,
    descriptionBN: `পলিসির মেয়াদ শেষ হওয়ার আগেই সুরক্ষার পাশাপাশি আর্থিক সুবিধা প্রাপ্তির জন্য শান্তা মাল্টি স্টেজ ম্যাচিউরিটি প্ল্যানস হতে 
    পারে আপনার আদর্শ সমাধান। এই প্ল্যানগুলোর মাধ্যমে আপনি কিস্তি ভিত্তিতে নির্দিষ্ট সময় পর পর কভারেজ অ্যামাউন্টের নির্ধারিত অর্থ গ্রহণ করবেন, 
    যা আপনার ভবিষ্যৎ লক্ষ্য ও সুরক্ষায় আর্থিক নিশ্চয়তা প্রদান করবে`,
    feature: [
      {
        name: 'Maturity Value',
        nameBN: 'ম্যাচিউরিটি ভ্যালু',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature1.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature1.png`,
      },
      {
        name: 'Survival Benefits',
        nameBN: 'সারভাইভাল বেনিফিটস',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature8.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature1.png`,
      },
      {
        name: 'Death Benefit',
        nameBN: 'ডেথ বেনিফিট',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature2.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature2.png`,
      },
      {
        name: 'Grace Period',
        nameBN: 'গ্রেস পিরিয়ড',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature3.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature3.png`,
      },
      {
        name: 'Surrender & Policy Loan Facility',
        nameBN: 'সারেন্ডার ও পলিসি লোন সুবিধা',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature4.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature4.png`,
      },
      {
        name: 'Tax Benefits',
        nameBN: 'ট্যাক্স সুবিধা',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature5.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature5.png`,
      },
      {
        name: 'Additional Rider Facility (If taken)',
        nameBN: 'অতিরিক্ত রাইডার সুবিধা (যদি নেওয়া হয়)',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/feature6.png`,
        // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/mobile/feature6.png`,
      },
    ],
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/web/multistage-11.jpg`,
    mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/saving-and-investment/mobile/multistage-11.jpg`,
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
            <GlobalButton size="large" className="" text="Purchase" variant="primary">
              <LocalizedString en="Purchase" bn="কিনুন" />
            </GlobalButton>
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
