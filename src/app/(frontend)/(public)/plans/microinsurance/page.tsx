import CallNowButton from '@/components/custom/shared/CallNowButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import EligibilityCriteria from '@/components/custom/shared/plans/EligibilityCriteria'
import MicroinsuranceIntro from '@/components/custom/shared/plans/MicroinsuranceIntro'
import OSAP from '@/components/custom/shared/plans/OSAP'
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
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-hero2.jpg`,
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
      <WSLSSection data={WSLS} />
      <OSAP data={OSAPData} />
      <EligibilityCriteria data={eligibilityCriteriaData} image="right" />
    </div>
  )
}

export default page
