import HeroSection from '@/components/custom/shared/hero/HeroSection'
import BenefitSliderSection from '@/components/custom/shared/plans/BenefitSliderSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import OurService from '@/components/custom/shared/plans/OurService'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Cashless Hospitalization Facility',
      titleBN: 'ক্যাশলেস হসপিটালাইজেশন সুবিধা',
      subtitle: '',
      description:
        'Shanta Life Insurance offers a seamless cashless in-patient treatment facility through our exclusive Shanta Life Hospital Network.',
      descriptionBN: `শান্তা লাইফ ইন্স্যুরেন্স নিয়ে এসেছে ঝামেলাহীন ক্যাশলেস ইন-পেশেন্ট চিকিৎসা সুবিধা, 
        আমাদের এক্সক্লুসিভ Shanta Life Hospital Network এর মাধ্যমে।`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHF-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'How Our Cashless Facility Works',
    titleBN: 'কিভাবে কাজ করে আমাদের ক্যাশলেস সুবিধা',
    description: `
    With Shanta Life’s exclusive Hospital Network, members enjoy seamless cashless in-patient care — no upfront payments, no stress. We settle bills directly with partner hospitals, so you can focus on recovery while we take care of the finances.
  `,
    descriptionBN: `শান্তা লাইফ হাসপাতাল নেটওয়ার্কের মাধ্যমে সদস্যরা উপভোগ করতে পারবেন ঝামেলাহীন ক্যাশলেস ইন-পেশেন্ট কেয়ার।
    কোনো অগ্রিম পরিশোধ নয়,
    কোনো বাড়তি দুশ্চিন্তা নয়,
    আমরা সরাসরি পার্টনার হাসপাতালের সঙ্গে বিল মিটিয়ে দিই — যাতে আপনি কেবল সুস্থ হয়ে ওঠায় মনোযোগ দিতে পারেন, আর অর্থনৈতিক দিকের দায়িত্ব আমরা নেই।`,
  }

  const benefitSliderData = {
    title: 'Key Features',
    titleBN: 'মূল বৈশিষ্ট্য',
    coloredTitle: '& Benefits',
    coloredTitleBN: 'ও সুবিধাসমূহ',
    description: 'Discover the advantages that make our cashless service the preferred choice.',
    descriptionBN: `আমাদের ক্যাশলেস সার্ভিসকে করে তুলেছে আপনার পছন্দের প্রথম নাম:`,
    item: [
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage1.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFIcon1.png`,
        description: 'Cashless admission at approved network hospitals',
        descriptionBN: `অনুমোদিত নেটওয়ার্ক হাসপাতালে ক্যাশলেস ভর্তি সুবিধা`,
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage2.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFIcon2.png`,
        description: 'No need for reimbursement paperwork',
        descriptionBN: `রিম্বার্সমেন্ট কাগজপত্রের ঝামেলা নেই`,
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage3.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFIcon3.png`,
        description: 'Coverage up to the insured sum as per the policy terms',
        descriptionBN: `পলিসির শর্ত অনুযায়ী সর্বোচ্চ কভারেজ পর্যন্ত সুবিধা`,
      },
    ],
  }

  const WCTMSectionData = {
    title: 'Why Cashless',
    titleBN: 'কেন ক্যাশলেস',
    coloredTitle: 'Treatment Matters',
    coloredTitleBN: 'চিকিৎসা গুরুত্বপূর্ণ',
    descriptionBN: `চিকিৎসা ব্যয় ক্রমেই বাড়ছে। আমাদের ক্যাশলেস সুবিধা আপনার টিমকে দিচ্ছে
      তাৎক্ষণিক ও মানসম্পন্ন স্বাস্থ্যসেবা
      হাসপাতালে ভর্তি সময়ে আর্থিক চাপমুক্ত অভিজ্ঞতা
      সহজ ক্লেইম প্রক্রিয়া।`,
    description:
      'With medical costs rising, the cashless benefit ensures that your team can access quality healthcare instantly and stress-free. It removes the financial burden at the time of hospitalization and simplifies the entire claims process.  ',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/WCTMImage.png`,
    // image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage1.jpg`,
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <BenefitSliderSection data={benefitSliderData} bgColor="bg-white" />
      <WCTMSection data={WCTMSectionData} />
      <OurService />
    </div>
  )
}

export default page
