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
      subtitle: 'Shanta Spouse Shield',
      subtitleBN: 'শান্তা স্পাউস শিল্ড',
      description: `Securing your shared journey, protecting your family’s tomorrow`,
      descriptionBN: `সুরক্ষা ও ভালোবাসায় ভবিষ্যতের পথচলা`,
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
    descriptionBN: `শান্তা স্পাউস শিল্ড আপনার ভবিষ্যৎ অর্থনৈতিক সুরক্ষায় একটি স্মার্ট ও বাস্তবমুখী প্ল্যান - 
    যেন একসাথে পথচলার প্রতিটি পদক্ষেপে থাকে নিশ্চিন্ত সুরক্ষার ছায়া।`,
  }

  const lifestyleData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/lifestyle-banner.jpg`,
    title: `Tailored Options`,
    subTitle: `for Your Lifestyle`,
    titleBN: `প্রয়োজনমাফিক পছন্দ করুন`,
    subTitleBN: `আপনার পলিসি`,
    description: `To match the needs of modern families, Shanta Spouse Shield offers two flexible plans, 
    giving you the freedom to choose the protection that best suits your way of life.`,
    descriptionBN: `মডার্ন ফ্যামিলির প্রয়োজন মাথায় রেখে শান্তা স্পাউস শিল্ড নিয়ে এসেছে ২টা ফ্লেক্সিবল 
    প্ল্যান—যেখানে আপনি খুব সহজেই নিজের লাইফস্টাইলের সাথে বেস্ট ম্যাচ করা প্রটেকশন পছন্দ করে নিতে পারবেন।`,
  }

  // tab-config.ts
  const tabItems = [
    {
      value: 'planA',
      label: 'Plan A',
      labelBN: 'প্ল্যান এ',
    },
    {
      value: 'planB',
      label: 'Plan B',
      labelBN: 'প্ল্যান বি',
    },
  ]

  const tabContent = {
    title: 'Insurance',
    coloredTitle: 'Coverages',
    titleBN: 'ইন্স্যুরেন্স',
    coloredTitleBN: 'কাভারেজ',
    planA: [
      {
        title: 'Life Coverage',
        titleBN: 'লাইফ কাভারেজ',
        description: `In the event of the insured spouse’s unexpected demise, this plan provides the insured with 50% or 100% of the 
          coverage amount, depending on the chosen option. Premiums are not refundable in case of the spouse’s 
          survival till maturity.`,
        descriptionBN: `এই প্ল্যান এর আওতায় বীমাগ্রাহকের স্বামী / স্ত্রী- র আকস্মিক অবর্তমানে বীমাঅঙ্কের ৫০% অথবা ১০০% অর্থ প্রদান করা হবে। `,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/icon1.png`,
      },
    ],
    planB: [
      {
        title: 'Life Coverage',
        titleBN: 'লাইফ কাভারেজ',
        description: `In the event of the insured spouse’s unexpected demise, 
          this plan provides the insured with 50% or 100% of the coverage amount, 
          depending on the chosen option.`,
        descriptionBN: `এই প্ল্যান এর আওতায় বীমাগ্রাহকের স্বামী / স্ত্রী- র আকস্মিক অবর্তমানে বীমাঅঙ্কের ৫০% অথবা ১০০% অর্থ প্রদান করা হবে।`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/spouse-shield/web/icon1.png`,
      },
      {
        title: 'Smart Exit',
        titleBN: 'স্মার্ট প্রস্থান',
        description: `At the end of the policy term, your spouse’s survival ensures a full refund of 
          the premium paid for this supplementary coverage.`,
        descriptionBN: `পলিসির মেয়াদপূর্তিতে আপনার স্বামী / স্ত্রী  জীবিত থাকলে এই সহযোগী বীমার জন্য প্রদত্ত সম্পূৰ্ণ প্রিমিয়াম ফেরত পাবেন।`,
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
      <LifestyleSection data={lifestyleData} />
      <PlanTabs config={tabItems} data={tabContent} />
    </div>
  )
}

export default page
