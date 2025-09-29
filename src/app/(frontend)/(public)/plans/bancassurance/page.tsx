import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import BankingFacilities from '@/components/custom/shared/plans/BankingFacilities'
import BenefitsForCustomer from '@/components/custom/shared/plans/BenefitsForCustomer'
import { InsuranceCoverageTab } from '@/components/custom/shared/plans/InsuranceCoverageTab'

function Bancassurance() {
  const heroSlides = [
    {
      title: 'Bancassurance',
      titleBN: 'ব্যাংকাসুরেন্স',
      subtitle: '',
      description:
        'Where banking meets protection, tailored for individuals, delivered through trust',
      descriptionBN: `ব্যাংকিং ও সুরক্ষার সহজ সমন্বয়`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner6.jpg`,
    },
  ]
  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/planInfo3.png`,
    // mobileImage: '/assets/solutions/bancassurance/mobile/planInfo3.png',
    description: `At Shanta Life, we partner with leading banks to offer clear, 
    affordable life insurance solutions that safeguard your financial journey. 
    Our customized products address the diverse financial needs and risks of different 
    banking segments, ensuring maximum protection for families during uncertain times while 
    offering substantial financial benefits at maturity.`,
    descriptionBN: `শান্তা লাইফ প্রতিশ্রুতি রক্ষা করতে এবং মানসম্পন্ন ফলাফল 
    প্রদানের মাধ্যমে গ্রাহকদের সহায়তা করার জন্য নিবেদিত। আমাদের ব্যাংকাসুরেন্স  
    সুবিধাগুলি সর্বদা গ্রাহকদের আর্থিক ঝুঁকি হ্রাস করতে এবং অসুস্থতা, দুর্ঘটনা বা যেকোনো
    ধরণের অক্ষমতার মতো অপ্রত্যাশিত ঘটনার জন্য প্রস্তুতি নিশ্চিত করতে সহায়তা করবে।`,
  }

  const bankingFacilitiesData = {
    title: 'Banking Facilities THAT CAN BE',
    titleBN: `জীবন বীমার আওতায় সুরক্ষিত হতে পারে`,
    coloredTitle: 'Protected under Life Insurance',
    coloredTitleBN: 'এমন ব্যাংকিং সুবিধাগুলি',
    bancassuranceProductsImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BF.jpg`,
    bancassuranceProducts: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon1.png`,
        description: 'Credit Card',
        descriptionBN: 'ক্রেডিট কার্ড',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon2.png`,
        description: 'Personal Loan/Home Loan/SME Loan',
        descriptionBN: 'ব্যক্তিগত ঋণ/গৃহ ঋণ/এসএমই ঋণ',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon3.png`,
        description: 'Payroll Account',
        descriptionBN: 'পে-রোল অ্যাকাউন্ট',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon4.png`,
        description: 'Savings Account',
        descriptionBN: 'সঞ্চয়ী হিসাব',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon5.png`,
        description: 'Monthly Deposit Scheme (DPS)',
        descriptionBN: 'মাসিক আমানত প্রকল্প (ডিপিএস)',
      },
    ],
  }

  // tab-config.ts
  const tabItems = [
    {
      value: 'lifeCoverage',
      label: 'Life Coverage',
      labelBN: 'লাইফ কাভারেজ',
    },
    {
      value: 'healthCoverage',
      label: 'Health Coverage',
      labelBN: 'হেল্থ কাভারেজ',
    },
  ]

  const tabContent = {
    title: 'Insurance',
    titleBN: 'বীমা',
    coloredTitle: 'Coverages',
    coloredTitleBN: 'কভারেজসমূহ',
    lifeCoverage: [
      {
        title: 'Natural Death',
        titleBN: 'প্রাকৃতিক এবং দুর্ঘটনাজনিত মৃত্যু',
        description: `In the event of an insured member’s death
                      due to natural/accidental causes, Shanta
                      Life provides financial support to the
                      nominated beneficiary or organization as 
                      per policy terms, ensuring peace of mind 
                      and security during difficult times.`,
        descriptionBN: `প্রাকৃতিক/দুর্ঘটনাজনিত কারণে বীমাকৃত সদস্যের মৃত্যু হলে, 
                      শান্তা লাইফ মনোনীত সুবিধাভোগী বা সংস্থাকে পলিসির শর্তাবলী অনুসারে আর্থিক 
                      সহায়তা প্রদান করে, কঠিন সময়ে মানসিক শান্তি এবং নিরাপত্তা নিশ্চিত করে।`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon1.png`,
      },
      {
        title: 'Total Permanent Disability',
        titleBN: 'স্থায়ী অক্ষমতা',
        description: `In the event of an insured member’s disability, due
                    to accident, injury, or illness, and insured being
                    unable to work permanently, Shanta Life provides
                    financial support to the nominated beneficiary or
                    organization as per policy terms, ensuring peace of
                    mind and security during difficult times.`,
        descriptionBN: `দুর্ঘটনা, আঘাত বা অসুস্থতার কারণে বীমাকৃত সদস্যের অক্ষমতা, 
                    এবং স্থায়ীভাবে কাজ করতে অক্ষম হওয়ার ক্ষেত্রে, শান্তা লাইফ মনোনীত সুবিধাভোগী বা 
                    সংস্থাকে পলিসির শর্তাবলী অনুসারে আর্থিক সহায়তা প্রদান করে, কঠিন সময়ে মানসিক 
                    শান্তি এবং নিরাপত্তা নিশ্চিত করে।`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon3.png`,
      },
    ],
    healthCoverage: [
      {
        title: 'Critical Illness Coverage',
        titleBN: 'গুরুতর অসুস্থতায়  কভারেজ',
        description: `In the event of an insured member’s critical illness
                      (such as Kidney Failure, Cancer, Stroke, Major
                      Organ Transplant, etc.) and diagnosed by a
                      qualified medical practitioner, Shanta Life
                      provides financial support to the nominated
                      beneficiary or organization as per policy terms,
                      ensuring peace of mind and security during
                      difficult times.`,
        descriptionBN: `বীমাকৃত সদস্যের গুরুতর অসুস্থতা (যেমন কিডনি ব্যর্থতা, 
                      ক্যান্সার, স্ট্রোক, প্রধান অঙ্গ প্রতিস্থাপন ইত্যাদি) এবং একজন যোগ্যতাসম্পন্ন 
                      চিকিৎসক দ্বারা নির্ণয় করা হলে, শান্তা লাইফ মনোনীত সুবিধাভোগী বা সংস্থাকে 
                      পলিসির শর্তাবলী অনুসারে আর্থিক সহায়তা প্রদান করে, কঠিন সময়ে মানসিক শান্তি 
                      এবং নিরাপত্তা নিশ্চিত করে।`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon2.png`,
      },
      // {
      //   title: 'In-Patient Health Coverage',
      //   description:
      //     'In the event of an insured member’s death, Shanta Life provides financial support to the nominated beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.',
      //   image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon4.png`,
      // },
      {
        title: 'In-Patient Health Coverage',
        titleBN: 'হাসপাতাল ভর্তিজনিত আর্থিক সুরক্ষা',
        description: `In the event of an insured
                      member's hospitalization for
                      medical treatment, Shanta Life
                      provides financial support to the
                      insured as per policy terms,
                      ensuring peace of mind and
                      security during difficult times.`,
        descriptionBN: `কোনও বীমাকৃত সদস্যের চিকিৎসার জন্য হাসপাতালে ভর্তির ক্ষেত্রে, 
        শান্তা লাইফ পলিসির শর্তাবলী অনুসারে বীমাকৃত ব্যক্তিকে আর্থিক সহায়তা প্রদান করে, 
        কঠিন সময়ে মানসিক শান্তি এবং নিরাপত্তা নিশ্চিত করে।`,
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon4.png`,
      },
    ],
  }

  const benefitsForCustomerData = {
    title: 'Benefits for ',
    titleBN: 'গ্রাহকদের জন্য',
    coloredTitle: 'Customers',
    coloredTitleBN: 'সুবিধা',
    bancassuranceProductsImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCImage.jpg`,
    bancassuranceProducts: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description: 'Simplified access to insurance',
        descriptionBN: 'সহজ বীমা সেবা',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description: 'Customized plans aligned with banking products',
        descriptionBN: 'কাস্টমাইজড প্ল্যান',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description: 'Exclusive offers or bundled services',
        descriptionBN: 'বিশেষ অফার বা বান্ডিল পরিষেবা',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description:
          'Enhanced trustworthy services that can last the customer’s Long-term Life journey',
        descriptionBN: `উন্নত বিশ্বস্ত পরিষেবা যা গ্রাহকের দীর্ঘমেয়াদী জীবনযাত্রাকে সুরক্ষিত করে`,
      },
    ],
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      {/* <PlanInfoSection data={planInfoData} bgColor="#F6EDDD" /> */}
      <PlanInfoSection data={planInfoData} />
      <BankingFacilities data={bankingFacilitiesData} />
      <InsuranceCoverageTab config={tabItems} data={tabContent} />
      <BenefitsForCustomer data={benefitsForCustomerData} />
    </div>
  )
}

export default Bancassurance
