import CallNowButton from '@/components/custom/shared/CallNowButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PartnerCarousel from '@/components/custom/shared/PartnerCarousel'
import EligibilityCriteria from '@/components/custom/shared/plans/EligibilityCriteria'
import MicroinsuranceIntro from '@/components/custom/shared/plans/MicroinsuranceIntro'
import OnYourCueSection2 from '@/components/custom/shared/plans/OnYourCueSection2'
import OSAP from '@/components/custom/shared/plans/OSAP'
import StrategicPatners from '@/components/custom/shared/plans/StrategicPatners'
import WhyMicroInsuranceMatter from '@/components/custom/shared/plans/WhyMicroInsuranceMatter'
import WSLSSection from '@/components/custom/shared/plans/WSLS'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Microinsurance',
      titleBN: 'মাইক্রোইনস্যুরেন্স',
      subtitle: '',
      description: 'Empowering communities, strengthening financial resilience',
      descriptionBN: `কমিউনিটিকে ক্ষমতায়ন, আর্থিক স্থিতিস্থাপকতাকে শক্তিশালীকরণ।`,
      image: `/assets/solutions/microinsurance/web/microinsurance-hero.jpg`,
      // image: `/assets/solutions/microinsurance/web/microinsurance-hero2.jpg`,
      // image: `/assets/solutions/microinsurance/web/microBanner.jpeg`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-intro.png`,
    // mobileImage: '/assets/solutions/bancassurance/mobile/planInfo3.png',
    description: `At Shanta Life, we believe protection should be within everyone’s reach. Our microinsurance plans offer simple, affordable coverage with small and accessible premiums ensuring financial strength across multifaceted communities.`,
    descriptionBN: `মাইক্রোইনস্যুরেন্স এমন এক গুরুত্বপূর্ণ উদ্যোগ যা এনজিও, মাল্টিপারপাস প্রতিষ্ঠান ও বিভিন্ন আর্থিক প্রতিষ্ঠান (ব্যাংকসহ) থেকে ঋণ গ্রহণকারী সদস্যদের বীমা সুরক্ষার আওতায় আনতে কার্যকর ভূমিকা পালন করে। আমাদের মূল লক্ষ্য হলো স্বল্প প্রিমিয়ামের মাধ্যমে সাধারণ জনগণের মাঝে বীমা সুরক্ষা বিস্তৃত করা। আমাদের সহজ এবং গ্রহণযোগ্য মাইক্রো ইন্স্যুরেন্স পলিসিসমূহের মাধ্যমে দেশের প্রান্তিক জনসাধারণ বীমা সুবিধার আওতায় আসতে পারেন।   `,
  }

  const WSLS = {
    sectionTitle: 'why Shanta Life is special?',
    highlighedSectionTitle: 'Shanta Life',
    sectionTitleBN: 'কেন শান্তা লাইফ থেকে মাইক্রোইনস্যুরেন্স নিবেন ?',
    highlighedSectionTitleBN: 'মাইক্রোইনস্যুরেন্স নিবেন',
    description: `Simple requirements to get started with our microinsurance protection`,
    descriptionBN: ``,
    image: `/assets/solutions/microinsurance/web/WSLS.jpg`,
    stampImage: `/assets/solutions/microinsurance/web/absoluteImage.png`,
    items: [
      {
        icon: `/assets/solutions/microinsurance/web/WSLS-icon1.png`,
        title: `Affordable Protection`,
        titleBN: `স্বল্প প্রিমিয়াম`,
        description: `Get essential insurance coverage at prices that won't strain your budget. We believe financial security should be a right, not a luxury.`,
        descriptionBN: `কম খরচে কার্যকর বীমা সুরক্ষা প্রদান।`,
      },
      {
        icon: `/assets/solutions/microinsurance/web/WSLS-icon2.png`,
        title: `Effortless Enrollment`,
        titleBN: `সহজ নিবন্ধন প্রক্রিয়া`,
        description: `Our signup process is quick, simple, and digital. No complex paperwork, no long waits— protection through our strategic partners.`,
        descriptionBN: `ন্যূনতম ডকুমেন্টেশন, দীর্ঘসূত্রিতাবিহীন`,
      },
    ],
  }

  const microInsuranceMatterData = {
    sectionTitle: 'Why Microinsurance Matters?',
    highlighedSectionTitle: 'Microinsurance',
    sectionTitleBN: 'কেন মাইক্রোইনস্যুরেন্স গুরুত্বপূর্ণ ?',
    highlighedSectionTitleBN: 'মাইক্রোইনস্যুরেন্স',
    description: `Specially designed to cover for low-income individuals and who obtain loan facilities from NGOs, Multipurpose organizations, and financial institutions including Banks. Our protection includes: `,
    descriptionBN: `বিশেষভাবে তৈরি করা হয়েছে নিম্ন আয়ের ব্যক্তি এবং যারা এনজিও, বহুমুখী সংস্থা এবং ব্যাংকসহ আর্থিক প্রতিষ্ঠান থেকে ঋণ সুবিধা গ্রহণ করেন, তাদের সুরক্ষার জন্য। আমাদের সুরক্ষার অন্তর্ভুক্ত:`,
    items: [
      {
        title: 'Coverage for sudden loss of life',
        titleBN: 'আকস্মিক মৃত্যু',
        description: 'Ensure financial protection to your family even if you’re not there.',
        descriptionBN:
          'পরিবারের প্রধান সদস্যের আকস্মিক মৃত্যু হলে পরিবারকে আর্থিক সুরক্ষা প্রদান করে।',
      },
      {
        title: 'Permanent Disability Coverage',
        titleBN: 'স্থায়ী অক্ষমতা',
        description: 'Secure your income from life’s sudden slip-ups.',
        descriptionBN:
          'দুর্ঘটনা বা গুরুতর অসুস্থতার কারণে কর্মক্ষমতা হারালে আয় সুরক্ষা নিশ্চিত করে।',
      },
      {
        title: 'Health Care Support',
        titleBN: 'চিকিৎসা সুবিধা',
        description:
          'Cover medical expenses and hospitalization costs through affordable, easy to manage premiums.',
        descriptionBN:
          'স্বল্প প্রিমিয়ামে চিকিৎসা ব্যয় ও হাসপাতালে ভর্তি সংক্রান্ত খরচ বহন করে, যা সবার নাগালের মধ্যে।',
      },
    ],
  }

  const OSAPData = {
    title: 'Our Services and Products',
    titleBN: `আমাদের সেবা ও পণ্যসমূহ`,
    highlightedTitle: `Services and Products`,
    highlightedTitleBN: `সেবা ও পণ্যসমূহ`,
  }

  const eligibilityCriteriaData = {
    sectionTitle: 'ELIGIBILITY CRITERIA',
    highlighedSectionTitle: 'CRITERIA',
    sectionTitleBN: 'আবেদনের জন্য প্রয়োজনীয় যোগ্যতা',
    highlighedSectionTitleBN: 'প্রয়োজনীয় যোগ্যতা',
    description: `Simple requirements to get started with our microinsurance protection`,
    descriptionBN: ``,
    image: `/assets/solutions/microinsurance/web/ec.png`,
    eligibilityData: [
      {
        backGroundColor: '#FFFFFF',
        icon: `/assets/solutions/microinsurance/web/eligibility-iconlast.png`,
        iconTitle: 'Eligibility',
        iconTitleBN: 'যোগ্যতা',
        age: {
          title: 'Entry Age',
          titleBN: 'আবেদনের বয়স',
          minAgeLabel: 'Minimum',
          minAgeLabelBN: 'সর্বনিম্ন',
          minAgeValue: '18',
          minAgeValueBN: '১৮',
          minAgeValuePeriod: 'Years',
          minAgeValuePeriodBN: 'বছর',
          maxAgeLabel: 'Maximum',
          maxAgeLabelBN: 'সর্বোচ্চ',
          maxAgeValue: '65',
          maxAgeValueBN: '৬৫',
          maxAgeValuePeriod: 'Years',
          maxAgeValuePeriodBN: 'বছর',
        },
        // policyTerm: {
        //   title: 'Policy Term',
        //   titleBN: 'বীমার মেয়াদ',
        //   value: '10-20 Years',
        //   valueBN: '১০-২০ বছর',
        // },
        // maturityAge: {
        //   title: 'Maturity Age',
        //   titleBN: 'পলিসি মেয়াদপূর্তিতে বয়স',
        //   value: '25 Years',
        //   valueBN: '২৫ বছর',
        // },
        physicalCondition: {
          title: 'Physical Condition',
          titleBN: 'শারীরিক অবস্থা',
          value: 'Physically Fit',
          valueBN: 'শারীরিকভাবে পরিপূর্ণ সুস্থ',
        },
      },
    ],
  }

  const strategicPatnersData = {
    title: 'Our Strategic Partners',
    highlightedText: 'Strategic Partners',
    titleBN: 'আমাদের টার্গেট ক্লায়েন্টস',
    highlightedTextBN: 'টার্গেট ক্লায়েন্টস',
    backgroundColor: '#FFFFFF',
    partners: [
      {
        image: `/assets/solutions/microinsurance/web/1.png`,
        name: 'NGOs',
        nameBN: 'এনজিও',
      },
      {
        image: `/assets/solutions/microinsurance/web/2.png`,
        name: 'Co-Operative Society',
        nameBN: 'সমবায় সমিতি',
      },
      {
        image: `/assets/solutions/microinsurance/web/3.png`,
        name: 'Banks',
        nameBN: 'ব্যাংক',
      },
      {
        image: `/assets/solutions/microinsurance/web/4.png`,
        name: 'Multipurpose',
        nameBN: 'মাল্টিপারপাস অর্গানাইজেশন',
      },
      {
        image: `/assets/solutions/microinsurance/web/5.png`,
        name: 'NBFIs',
        nameBN: 'এনবিএফআই',
      },
    ],
  }
  const patnerNetworkData = {
    title: 'Our Partner Network',
    highlightedText: 'Partner Network',
    titleBN: 'আমাদের পার্টনার নেটওয়ার্ক',
    highlightedTextBN: 'পার্টনার নেটওয়ার্ক',
    backgroundColor: '#FCF4EB',
    partners: [
      {
        image: `/assets/solutions/microinsurance/web/p1.png`,
        name: 'Heed Sanchoy Rindan Samobay Samity Ltd',
        nameBN: 'হিড সঞ্চয় ঋণদান সমবায় সমিতি লিঃ',
      },
      {
        image: `/assets/solutions/microinsurance/web/p2.png`,
        name: 'Sehed Society',
        nameBN: 'শেড সোসাইটি',
      },
      {
        image: `/assets/solutions/microinsurance/web/p3.png`,
        name: 'Association for Social Progress',
        nameBN: 'এসোসিয়েশন ফর সোস্যাল প্রোগ্রেস',
      },
      {
        image: `/assets/solutions/microinsurance/web/p4.png`,
        name: 'R N Consortium Ltd',
        nameBN: 'আর এন কনসোর্টিয়াম লিঃ',
      },
      {
        image: `/assets/solutions/microinsurance/web/p5.png`,
        name: 'Come to Work',
        nameBN: 'কাম টু ওয়ার্ক',
      },
      {
        image: `/assets/solutions/microinsurance/web/p6.png`,
        name: 'Paksey Babosayi Samabay Somiti Ltd',
        nameBN: 'পাকশি ব্যবসায়ী সমবায় সমিতি লিঃ',
      },
      {
        image: `/assets/solutions/microinsurance/web/p7.png`,
        name: 'Abirbhav Samaj Unnayan Sangstha',
        nameBN: 'আবির্ভাব সমাজ উন্নয়ন সংস্থা ',
      },
      {
        image: `/assets/solutions/microinsurance/web/p8.png`,
        name: 'Ekota Khudra Babsayi Somo Bayi Samiti Ltd',
        nameBN: 'একতা ক্ষুদ্র ব্যবসায়ী সমবায় সমিতি লিঃ',
      },
      {
        image: `/assets/solutions/microinsurance/web/p9.png`,
        name: 'Elegant For Better Life',
        nameBN: 'এলিগ্যান্ট টেলিকমিউনিকেশন লিঃ',
      },
      {
        image: `/assets/solutions/microinsurance/web/p10.png`,
        name: 'Glory Association',
        nameBN: 'গ্লোরি এসোসিয়েটস',
      },
    ],
  }

  const cueData = {
    sectionHeading: ``,
    sectionHeadingBN: ``,
    sectionTitle: ``,
    highlighedSectionTitle: ``,
    sectionTitleBN: ``,
    highlighedSectionTitleBN: ``,
    description: ``,
    descriptionBN: ``,
    cards: [
      {
        icon: `/assets/solutions/microinsurance/web/c1.png`,
        title: 'Loan Shield',
        titleBN: 'ঋণ সুরক্ষা',
        // subtitle: 'Multi Stage Maturity Plans',
        // subtitleBN: 'মাল্টি স্টেজ ম্যাচিউরিটি প্ল্যান ',
        description: 'Covers Death (Natural & Accidental) and Permanent Total Disability (PTD).',
        descriptionBN:
          'ঋণগ্রহীতার অকাল মৃত্যু বা দুর্ঘটনায় স্থায়ী অক্ষমতার ক্ষেত্রে পরিবারের আর্থিক নিরাপত্তা নিশ্চিত করে।',
        image: `/assets/solutions/microinsurance/web/cc1.jpg`,
        // link: '/plans/individual/child-education',
        moreItem: [
          {
            description: 'Repayment of the outstanding loan as Death benefit',
            descriptionBN: 'মৃত্যু ঘটলে সম্পূর্ণ ঋণ পরিশোধ সুবিধা',
          },
          {
            description:
              'Repayment of the outstanding loan in case of Accidental death or Total Permanent Disability',
            descriptionBN: 'দুর্ঘটনাজনিত মৃত্যু ঘটলে সম্পূর্ণ ঋণ পরিশোধ সুবিধা',
          },
          {
            description: 'Funeral Cash Benefit',
            descriptionBN: 'অন্ত্যেষ্টিক্রিয়া সম্পাদন সহায়তা',
          },
          {
            description: 'Telemedicine Support',
            descriptionBN: 'টেলিমেডিসিন সেবা',
          },
        ],
      },
      {
        icon: `/assets/solutions/microinsurance/web/c2.png`,
        title: 'Deposit Shield',
        titleBN: 'আমানত সুরক্ষা',
        // subtitle: 'Multi Stage Maturity Plans',
        // subtitleBN: 'মাল্টি স্টেজ ম্যাচিউরিটি প্ল্যান ',
        description:
          'Protects against Death (Natural & Accidental) and Permanent Total Disability (PTD).',
        descriptionBN: 'আপনার সঞ্চয় ও আমানতকে অনাকাঙ্ক্ষিত ঝুঁকি থেকে সুরক্ষা দেয়।',
        image: `/assets/solutions/microinsurance/web/cc2.jpg`,
        // link: '/plans/individual/child-education',
        moreItem: [
          {
            description: 'Payment of Full maturity value any type of deposits in case of death',
            descriptionBN: 'মৃত্যুবরণ পূর্ণ ম্যাচুরিটি মূল্য প্রদান',
          },
          {
            description:
              'Payment of Full maturity value any type of deposits in case of accidental death or Total Permanent Disability',
            descriptionBN: 'দুর্ঘটনায় পূর্ণ ম্যাচুরিটি মূল্য প্রদান',
          },
          {
            description: 'Funeral Cash Benefit',
            descriptionBN: 'অন্ত্যেষ্টিক্রিয়া সম্পাদন সহায়তা',
          },
          {
            description: 'Telemedicine Support',
            descriptionBN: 'টেলিমেডিসিন সেবা',
          },
        ],
      },
      {
        icon: `/assets/solutions/microinsurance/web/c3.png`,
        title: 'Term Life Insurance',
        titleBN: 'টার্ম লাইফ বীমা',
        // subtitle: 'Multi Stage Maturity Plans',
        // subtitleBN: 'মাল্টি স্টেজ ম্যাচিউরিটি প্ল্যান ',
        description: 'Includes Death, Accidental Death (AD), and Permanent Total Disability (PTD).',
        descriptionBN: 'পরিবারের ভবিষ্যৎ সুরক্ষায় নির্ভরযোগ্য জীবনবীমা পরিকল্পনা।',
        image: `/assets/solutions/microinsurance/web/cc3.jpg`,
        // link: '/plans/individual/child-education',
        moreItem: [
          {
            description: 'Death Coverage',
            descriptionBN: 'মৃত্যু কভারেজ',
          },
          {
            description: 'Accidental death and Total Permanent Disability Coverage',
            descriptionBN: 'দুর্ঘটনাজনিত কভারেজ',
          },
          {
            description: 'Accidental medical expense Coverage',
            descriptionBN: 'দুর্ঘটনাজনিত চিকিৎসা ব্যয় সুরক্ষা',
          },
          {
            description: 'In-hospitalization benefit',
            descriptionBN: 'হাসপাতালে ভর্তি হলে বিল সুবিধা',
          },
          {
            description: 'Hospital Discount Facility',
            descriptionBN: 'হাসপাতালে ছাড় সুবিধা',
          },
          {
            description: 'Telemedicine Support',
            descriptionBN: 'টেলিমেডিসিন সেবা',
          },
        ],
      },
    ],
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
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
      <MicroinsuranceIntro data={planInfoData} />
      <WhyMicroInsuranceMatter data={microInsuranceMatterData} />
      <WSLSSection data={WSLS} />
      <OSAP data={OSAPData} />
      {/* bg="#F6EDDD" */}
      <OnYourCueSection2 data={cueData} bg="#F6EDDD" />
      <EligibilityCriteria data={eligibilityCriteriaData} image="right" />
      <StrategicPatners data={strategicPatnersData} />
      <PartnerCarousel data={patnerNetworkData} />
    </div>
  )
}

export default page
