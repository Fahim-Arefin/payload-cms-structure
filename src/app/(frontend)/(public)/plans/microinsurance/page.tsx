import React from 'react'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import MicroinsuranceIntro from '@/components/custom/shared/plans/MicroinsuranceIntro'
import MicroinsuranceDescSection from '@/components/custom/microinsurance/MicroinsuranceDescSection'
import MicroinsuranceOffer from '@/components/custom/microinsurance/MicroinsuranceOffer'
import MicroinsuranceEligibility from '@/components/custom/microinsurance/MicroinsuranceEligibility'
import MicroinsurancePartners from '@/components/custom/microinsurance/MicroinsurancePartners'
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

  const benefitsForCustomerData = {
    title: 'Benefits for ',
    coloredTitle: 'Customers',
    microinsuranceProductsImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-desc.jpg`,
    microinsuranceProducts: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-icon2.png`,
        description: 'Untimely death',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-icon1.png`,
        description: 'Health emergencies',
      },
    ],
  }

  const offerData = {
    title: 'We',
    coloredTitle: 'Offer',
    description: 'Comprehensive insurance solutions tailored for your needs and budget',
    offers: [
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-icon1.png`,
        title: 'Life Insurance',
        summary: "Comprehensive life coverage to protect your family's financial future",
        bullets: ['Credit Shield', 'Affordable Premiums', 'Quick Claims Settlement'],
      },
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-icon2.png`,
        title: 'Health Insurance',
        summary: 'Affordable protection for life’s unexpected health moments.',
        bullets: ['Emergency coverage', 'Hospital benefits'],
      },
      // {
      //   icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-icon3.png`,
      //   title: 'Family Protection',
      //   summary: 'Complete family insurance solutions tailored for your needs',
      //   bullets: ['Multi-member coverage', 'Flexible plans', '24/7 support'],
      // },
      // {
      //   icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-icon4.png`,
      //   title: 'Property Insurance',
      //   summary: 'Protect your home and belongings from unexpected events',
      //   bullets: ['Home protection', 'Asset coverage', 'Natural disaster cover'],
      // },
    ],
  }

  const benefitsData = {
    title: 'ELIGIBILITY',
    coloredTitle: 'CRITERIA',
    description: 'Simple requirements to get started with our microinsurance protection',
    image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-eligibility.jpg`,
    items: [
      {
        title: 'Age Requirement',
        label: 'Age: 18-65',
        icon: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/eligibility-icon1.png`,
      },
      {
        title: 'Residency Status',
        label: 'Resident/Citizen of Issuing Country',
        icon: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/eligibility-icon2.png`,
      },
      {
        title: 'Income Verification',
        label: 'Regular Income/Employment',
        icon: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/eligibility-icon3.png`,
      },
    ],
  }

  const partnerData = {
    title: 'Our',
    coloredTitle: 'Strategic Partners',
    description:
      'Working together with trusted organizations to bring insurance to every community',
    items: [
      { title: 'NGOs', dotColor: '#8A7B3D' }, // olive
      { title: 'MFIs', dotColor: '#ED7125' }, // orange
      { title: 'Banks', dotColor: '#8A7B3D' },
      { title: 'NBFIs', dotColor: '#ED7125' },
      { title: 'Cooperatives', dotColor: '#8A7B3D' },
      { title: 'NGOs', dotColor: '#8A7B3D' }, // olive
      { title: 'MFIs', dotColor: '#ED7125' }, // orange
      { title: 'Banks', dotColor: '#8A7B3D' },
      { title: 'NBFIs', dotColor: '#ED7125' },
      { title: 'Cooperatives', dotColor: '#8A7B3D' },
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
      {/* <MicroinsuranceDescSection data={benefitsForCustomerData} />
      <MicroinsuranceOffer data={offerData} />
      <MicroinsuranceEligibility data={benefitsData} />
      <MicroinsurancePartners data={partnerData} /> */}
    </div>
  )
}

export default page
