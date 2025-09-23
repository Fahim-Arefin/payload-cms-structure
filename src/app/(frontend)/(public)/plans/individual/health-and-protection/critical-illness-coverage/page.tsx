import CallNowButton from '@/components/custom/shared/CallNowButton'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'
import ProtectionSection from '@/components/custom/shared/plans/ProtectionSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import Link from 'next/link'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Shanta Critical Protection',
      subtitleBN: 'শান্তা ক্রিটিক্যাল প্রটেকশন',
      description: `Get life-sustaining support because a diagnosis shouldn't derail your dreams. 
      We'll step in so you can fight back stronger.`,
      descriptionBN: `গুরুতর অসুস্থতা যখন জীবনের চ্যালেঞ্জ হয়ে দাঁড়ায়, 
      তখন আর্থিক সুরক্ষা চিকিৎসা খরচের বোঝা কমিয়ে, আপনার সুস্থতার যাত্রাকে করবে নির্বিঘ্ন।`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/crit-coverage.png`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/web/planInfo5.svg`,
    // mobileImage:
    //   '/assets/solutions/individual/health-and-protection/critical-protection/mobile/planInfo5.svg',
    description: `Health struggles can come with financial struggles too—making recovery even harder. 
      From rising medical bills to daily expenses, the burden can feel overwhelming. 
      With Shanta Life’s Critical Protection Riders, you get financial security when you 
      need it most—covering up to 25 major illnesses, depending on your plan.`,
    descriptionBN: `অসুস্থতা যেমন অপ্রত্যাশিত, তেমনি এর আর্থিক চাপও অনিবার্য। 
      নিজের ও পরিবারের আর্থিক স্থিতিশীলতা ধরে রাখার শক্ত ভিত্তি তৈরি করা যায় শুধুমাত্র প্রস্তুতির মাধ্যমে। 
      চিকিৎসার অতিরিক্ত খরচ ও পারিবারিক ব্যয় যেন আপনার সুস্থতার পথে বাঁধা না হয়ে দাঁড়ায়, এজন্য শান্তা 
      লাইফে আছে দুইটি ক্রিটিক্যাল প্রোটেকশন রাইডার—যা প্যাকেজ অনুযায়ী সর্বোচ্চ ২৫টি জটিল রোগে আপনাকে 
      নিশ্চিত আর্থিক সুরক্ষা প্রদান করবে ।`,
  }

  const offersData = [
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer9.png`,
      // mobileImage: '/assets/icons/mobile/offer9.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/web/offerbg9.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg9.jpg',
      title: 'Living Benefit',
      description: 'Helping with treatment costs so you can focus on recovery.',
      titleBN: 'লিভিং বেনিফিট',
      descriptionBN: `চিকিৎসার খরচ নিয়ে চিন্তা নয়, আপনার পূর্ণ সুস্থতাই আমাদের আশা`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer10.png`,
      // mobileImage: '/assets/icons/mobile/offer10.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/web/offerbg10.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg10.jpg',
      title: 'Affordable Premium',
      description: 'Affordable Security for you and your family in case of lifelong disability.',
      titleBN: 'স্বল্প প্রিমিয়াম',
      descriptionBN: `জীবনযাত্রার মানের সাথে সামঞ্জস্যপূর্ণ`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer11.png`,
      // mobileImage: '/assets/icons/mobile/offer11.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/web/offerbg11.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg11.jpg',
      title: 'One-Time Payout',
      description: 'Financial support if an accident limits your abilities.',
      titleBN: 'এককালীন অর্থ প্রাপ্তি',
      descriptionBN: `যা চিকিৎসা ব্যয়ভার লাঘবে সহায়তা করবে`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer12.png`,
      // mobileImage: '/assets/icons/mobile/offer12.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/web/offerbg12.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg12.jpg',
      title: 'Protection Against 25+ Critical Illnesses',
      description:
        'Your loved ones receive 50% of the insured amount for extra protection (including basic life coverage).',
      titleBN: 'প্যাকেজভেদে ২৫টি জটিল রোগে নিশ্চয়তা',
      descriptionBN: `মূল প্ল্যানের ৫০% অর্থ এককালীন প্রদান। সুস্থতার পথে আর্থিক উদ্বেগ যেন কখনোই আপনার মনোবল ভঙ্গ করতে না পারে।`,
    },
  ]

  const protectionData = {
    title: 'Critical',
    titleBN: 'ক্রিটিক্যাল',
    subTitle: 'Protection',
    subTitleBN: 'প্রটেকশন',
    smallTitle: 'Classic',
    smallTitleBN: 'ক্লাসিক',
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/web/criticalProtection.jpg`,
    bgMobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/mobile/criticalProtection.jpg`,
    item: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection1.png`,
        // mobileImage: '/assets/icons/mobile/protection1.png',
        description: 'Covers Surgery or diagnose for 19 Critical Illnesses',
        descriptionBN: '১৯টি নির্দিষ্ট গুরুতর অসুস্থতার জন্য সার্জারি বা রোগ নির্ণয় সাপেক্ষে সুরক্ষা',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection2.png`,
        // mobileImage: '/assets/icons/mobile/protection2.png',
        description: 'Full Coverage Amount Payout',
        descriptionBN: `কভারেজের সম্পূর্ণ অর্থ প্রদান`,
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection3.png`,
        // mobileImage: '/assets/icons/mobile/protection3.png',
        description: 'Coverage amount = 50% of Basic Life Coverage',
        descriptionBN: `কভারেজ = মূল প্ল্যানের ৫০% তবে সর্বনিম্ন ১ লাখ টাকা`,
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection4.png`,
        // mobileImage: '/assets/icons/mobile/protection4.png',
        description: 'Coverage up to 15 lacs',
        descriptionBN: `সর্বোচ্চ ১৫ লাখ টাকা পর্যন্ত কভারেজ`,
      },
    ],
  }
  const protectionData2 = {
    title: 'Critical',
    titleBN: 'ক্রিটিক্যাল',
    subTitle: 'Protection',
    subTitleBN: 'প্রটেকশন',
    smallTitle: 'Standard',
    smallTitleBN: 'স্ট্যান্ডার্ড',
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/web/Critical-illness.jpeg`,
    bgMobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/critical-protection/mobile/Critical-illness.jpeg`,
    item: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection5.png`,
        // mobileImage: '/assets/icons/mobile/protection5.png',
        description: 'Covers Diagnoses / Surgery for 10 Minor illnesses & 15 Major illnesses',
        descriptionBN: `১০টি নির্দিষ্ট স্বল্প গুরুতর (মাইনর ক্রিটিক্যাল ইলনেস) ও ১৫টি নির্দিষ্ট অধিক গুরুতর 
          (মেজর ক্রিটিক্যাল ইলনেস) অসুস্থতার জন্য সার্জারি বা রোগ নির্ণয় সাপেক্ষে সুরক্ষা`,
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection6.png`,
        // mobileImage: '/assets/icons/mobile/protection6.png',
        description:
          'Minor Critical illness coverage = 30 % of Rider Coverage Amount or BDT 3 lacs (whichever is lower)',
          descriptionBN: `স্বল্প গুরুতর অসুস্থতার (মেজর ক্রিটিক্যাল ইলনেস) কভারেজ = ক্রিটিক্যাল প্রটেকশন 
        কভারেজের ৩০% অথবা ৩ লক্ষ টাকা (যেটি কম)`,
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection7.png`,
        // mobileImage: '/assets/icons/mobile/protection7.png',
        description: 'Coverage amount = 50% of Basic Life Coverage',
        descriptionBN: `কভারেজ = মূল প্ল্যানের ৫০% তবে সর্বনিম্ন ১ লাখ টাকা`,
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/protection8.png`,
        // mobileImage: '/assets/icons/mobile/protection8.png',
        description: 'Rider continues even after minor CI claim payment Coverage up to 15 lacs',
        descriptionBN: `সর্বোচ্চ ১৫ লাখ টাকা পর্যন্ত কভারেজ`,
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
      <OffersClientWrapper
        data={offersData}
        subheading="Benefits to keep you and your loved ones financially secure"
        subHeadingBN="গুরতর অসুস্থতায় আপনার ও আপনার পরিবারের আর্থিক নিশ্চয়তা প্রদানের জন্য শান্তা ক্রিটিকাল প্রটেকশন বীমা সুবিধা প্রদান করে, যার মধ্যে আছে:"
        card={2}
      />
      <ProtectionSection bgColor="#FCF4EB" data={protectionData} />
      <ProtectionSection align="right" data={protectionData2} />
      <ContactUsSection />
    </div>
  )
}

export default page
