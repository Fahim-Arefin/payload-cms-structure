import HeroSection from '@/components/custom/shared/hero/HeroSection'
import BenefitSliderSection from '@/components/custom/shared/plans/BenefitSliderSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Integrated Healthcare',
      titleBN: 'ইন্টিগ্রেটেড হেলথকেয়ার',
      subtitle: '& Hospital Network',
      subtitleBN: 'ও হাসপাতাল নেটওয়ার্ক',
      description:
        'We deliver care beyond coverage — cashless, quick, and all under one trusted network.',
      descriptionBN: `আমরা শুধু কভারেজ নয়, তার বাইরেও নিশ্চিন্ত স্বাস্থ্যসেবা প্রদান করি — নগদহীন, দ্রুত, এবং একটি বিশ্বস্ত নেটওয়ার্কের আওতায়।`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/IHHN-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'We ensure',
    titleBN: 'আমরা নিশ্চিত করি',
    description: `
    <ul>
      <li>Cashless hospitalization at our panel hospitals</li>
      <li>Discounted medical services for OPD and diagnostic tests</li>
      <li>24/7 assistance for emergency admissions</li>
      <li>Direct settlement of bills without out-of-pocket expenses (at panel hospitals)</li>
      <li>Up to 35% discount at our partner diagnostic centers across Bangladesh</li>
    </ul>
  `,
    descriptionBN: `
    <ul>
      <li>আমাদের অনুমোদিত হাসপাতালসমূহে নগদহীন হাসপাতালে ভর্তি সুবিধা</li>
      <li>ওপিডি ও ডায়াগনস্টিক পরীক্ষায় বিশেষ ছাড়</li>
      <li>২৪/৭ জরুরি ভর্তি সহায়তা</li>
      <li>প্যানেল হাসপাতালগুলোতে পকেটের বাইরে খরচ ছাড়াই সরাসরি বিল নিষ্পত্তি</li>
      <li>বাংলাদেশ জুড়ে আমাদের পার্টনার ডায়াগনস্টিক সেন্টারে ৩৫% পর্যন্ত ছাড়</li>
    </ul>
  `,
  }

  const benefitSliderData = {
    title: 'Benefits of',
    titleBN: 'আমাদের হাসপাতাল নেটওয়ার্কের',
    coloredTitle: 'Our Hospital Network',
    coloredTitleBN: `বিশেষ সুবিধা`,
    description: 'Discover the benefits that make our hospital service special.',
    descriptionBN: `আমাদের সঙ্গে যুক্ত থাকলে আপনি উপভোগ করবেন:`,
    item: [
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage1.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon1.png`,
        description: 'Nationwide Coverage',
        descriptionBN: `দেশব্যাপী কভারেজ`,
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage2.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon2.png`,
        description: 'Cashless Treatment',
        descriptionBN: `ক্যাশলেস চিকিৎসা`,
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage3.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon3.png`,
        description: 'Priority Service',
        descriptionBN: `অগ্রাধিকার ভিত্তিক পরিষেবা`,
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage4.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon4.png`,
        description: 'Comprehensive Care',
        descriptionBN: `ব্যাপক পরিচর্যা`,
      },
    ],
  }

  const WCTMSectionData = {
    title: 'Why',
    titleBN: 'কেন ',
    coloredTitle: 'It Matters',
    coloredTitleBN: 'এটি গুরুত্বপূর্ণ',
    descriptionBN: `একটি সমন্বিত স্বাস্থ্যসেবা সমাধানের মাধ্যমে নিয়োগকর্তারা নিশ্চিত করতে পারেন—
      কর্মীরা সহজেই মানসম্পন্ন চিকিৎসা সেবার অ্যাক্সেস পাচ্ছে, কর্মঘণ্টার ক্ষতি কমছে এবং সামগ্রিক সুস্থতা বৃদ্ধি পাচ্ছে।`,
    description:
      'By offering an integrated healthcare solution, employers can ensure that their workforce has easy access to quality healthcare services, reducing downtime and enhancing overall well-being.',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/WCTMImage.jpg`,
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <BenefitSliderSection
        data={benefitSliderData}
        basis=" basis-1/2 md:basis-1/3 lg:basis-1/4"
        bgColor="bg-white"
      />
      <WCTMSection data={WCTMSectionData} />
    </div>
  )
}

export default page
