import { ChildEducationTabs } from '@/components/custom/child-education/ChildEducationTabs'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import Link from 'next/link'
import { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Shanta Child Education Plan ',
      titleBN: 'শান্তা চাইল্ড এডুকেশন প্ল্যান',
      subtitle: '',
      description: 'Set them up for success - nurture their boundless potential.',
      descriptionBN: 'সাফল্য থাকুক অবিচল, বিকশিত হোক অপার সম্ভাবনা।',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/child-education-banner.jpg`,
    },
  ]

  const childInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/child-education/web/childInfo.png`,
    // mobileImage: '/assets/solutions/individual/child-education/web/childInfo.png',
    description: `Shanta Life’s Child Education Plan is designed to help parents build an education fund while
     offering robust life insurance protection. It's a perfect blend of savings and security for every milestone 
     in your child’s journey.`,
    descriptionBN: `প্রতিটি বাবা-মার স্বপ্ন থাকে তাদের সন্তানের উজ্জ্বল ভবিষ্যত, কিন্তু জীবন কখনো কখনো অপ্রত্যাশিত মোড় নিতে পারে। 
    শান্তা লাইফের চাইল্ড এডুকেশন প্ল্যান হলো একটি জীবন বীমা পলিসি যা আত্মবিশ্বাসের সঙ্গে সন্তানের উচ্চ শিক্ষার জন্য সঞ্চয় করতে সাহায্য করে, 
    পাশাপাশি অনিশ্চয়তার বিরুদ্ধে গুরুত্বপূর্ণ সুরক্ষা প্রদান করে।`,
  }

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
        description:
          'Receive the full sum assured at the end of the policy term to support higher education goals.',
        descriptionBN: `পলিসির মেয়াদ শেষে নিশ্চিত বীমা অংক প্রাপ্তি`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon2.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon2.png',
      },
      {
        title: 'Life Coverage',
        titleBN: 'মৃত্যুজনিত কভারেজ',
        description: 'In the event of the parent’s death, the plan ensures:',
        descriptionBN: `বীমা চলাকালীন পিতা/মাতার (বীমাগ্রহীতা) মৃত্যু ঘটলে:`,
        listItems: [
          "Monthly stipend (1%, 2%, or 3% of the sum assured, based on plan choice) till policy maturity to ensure the child's education quality.",
          'Waiver of all future premiums while continuing full coverage.',
          'Full maturity benefit paid at term-end.',
        ],
        listItemsBN: [
          'পলিসির মেয়াদপূর্তি পর্যন্ত প্রতি মাসে বীমা অঙ্কের সর্বোচ্চ ৩% (১%, ২% অথবা ৩%, প্ল্যান অনুযায়ী) উপবৃত্তি হিসেবে প্রদান করা হবে।',
          'ভবিষ্যতে প্রদেয় সকল প্রিমিয়াম মওকুফ থাকবে। (যদি প্রিমিয়াম সিঙ্গেল পেমেন্ট হয়, তাহলে এই সুবিধা প্রযোজ্য নয়)',
          'মেয়াদপূর্তির পর্যন্ত পলিসি সচল থাকবে এবং মেয়াদপূর্তিতে ১০০% বীমা অঙ্ক মনোনীত সন্তানকে প্রদান করা হবে।',
        ],
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon5.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon5.png',
      },
      {
        title: 'Tax Benefits',
        titleBN: 'আয়কর রেয়াত সুবিধা',
        description: 'Enjoy tax rebates on premiums, avail upto 15% tax rebate. ',
        descriptionBN: `কর আইন সাপেক্ষে প্রদত্ত প্রিমিয়ামের ওপর কর ছাড়/ রেয়াত`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon3.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon3.png',
      },

      {
        title: 'Customizable Coverage',
        titleBN: 'প্রয়োজন অনুযায়ী কভারেজ',
        description: 'Choose a sum assured based on your child’s future needs.',
        descriptionBN: `আপনার চাহিদা বা পছন্দ অনুসারে বীমা অংক/কভারেজ এবং সময়কাল নির্ধারণের স্বাধীনতা`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon1.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon1.png',
      },
      {
        title: 'Flexible Premium Payments',
        titleBN: 'সুবিধাজনক প্রিমিয়াম পরিশোধের ধরণ',
        description: 'Opt for monthly, quarterly, half-yearly, or annual premium modes.',
        descriptionBN:
          'পলিসি নেওয়ার সময় আপনার সুবিধা অনুযায়ী মাসিক, ত্রৈমাসিক, অর্ধ-বার্ষিক বা বার্ষিক—যেকোনো প্রিমিয়াম পরিশোধের ধরন বেছে নিতে পারেন।',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon6.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon6.png',
      },
      {
        title: 'Partner Discounts',
        titleBN: `চিকিৎসাসেবায় বিশেষ ছাড়`,
        description:
          'Avail exclusive discounts on medical and diagnostic services at partnered hospitals and diagnostic centers.',
        descriptionBN: `নির্বাচিত নেটওয়ার্ক হাসপাতাল এবং ডায়াগনস্টিক সেন্টারগুলিতে চিকিৎসা ও ডায়াগনস্টিক পরিষেবাগুলিতে বিশেষ ছাড়`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childTabIcon4.png`,
        // mobileImage: '/assets/icons/mobile/childTabIcon4.png',
      },
    ],
    eligibility: [
      {
        title: 'Child',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childIcon.svg`,
        // mobileIcon: '/assets/icons/mobile/childIcon.svg',
        // bgImage:"/assets/eligibilityImage1.jpg",
        entryMin: '30',
        entryMinLabel: 'Days',
        entryMax: '15',
        entryMaxLabel: 'Years',
        policyTerm: '10-20',
        policyTermLabel: 'Years',
        maturityAge: '25',
        maturityAgeLabel: 'Years',
        titleBN: 'সন্তান',
        entryMinBN: '৩০',
        entryMinLabelBN: 'দিন',
        entryMaxBN: '১৫',
        entryMaxLabelBN: 'বছর',
        policyTermBN: '১০-২০',
        policyTermLabelBN: 'বছর',
        maturityAgeBN: '২৫',
        maturityAgeLabelBN: 'বছর',
      },
      {
        title: 'Parents',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/parentIcon.svg`,
        // mobileIcon: '/assets/icons/mobile/parentIcon.svg',
        // bgImage:"/assets/parentsTab.jpg",
        entryMin: '21',
        entryMinLabel: 'Years',
        entryMax: '55',
        entryMaxLabel: 'Years',
        policyTerm: '10-20',
        policyTermLabel: 'Years',
        maturityAge: '65',
        maturityAgeLabel: 'Years',
        titleBN: 'পিতা/মাতা (বীমাগ্রহীতা)',
        entryMinBN: '২১',
        entryMinLabelBN: 'বছর',
        entryMaxBN: '৫৫',
        entryMaxLabelBN: 'বছর',
        policyTermBN: '১০-২০',
        policyTermLabelBN: 'বছর',
        maturityAgeBN: '৬৫',
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
      <PlanInfoSection bgColor="#FCF4EB" data={childInfoData} />
      <ChildEducationTabs data={tabContent} config={tabItems} />
      <ContactUsSection />
    </div>
  )
}

export default page
