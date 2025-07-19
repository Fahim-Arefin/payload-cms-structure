import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'
import ProtectionSection from '@/components/custom/shared/plans/ProtectionSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Shanta Critical Protection',
      description: `Get life-sustaining support because a diagnosis shouldn't derail your dreams. We'll step in so you can fight back stronger.`,
      image: '/assets/banners/crit-coverage.png',
    },
  ]

  const planInfoData = {
    image: '/assets/planInfo5.svg',
    description:
      'Health struggles can come with financial struggles too—making recovery even harder. From rising medical bills to daily expenses, the burden can feel overwhelming. With Shanta Life’s Critical Protection Riders, you get financial security when you need it most—covering up to 25 major illnesses, depending on your plan.',
  }

  const offersData = [
    {
      image: '/assets/offer9.png',
      bgImage: '/assets/offerbg9.jpg',
      title: 'Living Benefit',
      description: 'Helping with treatment costs so you can focus on recovery.',
    },
    {
      image: '/assets/offer10.png',
      bgImage: '/assets/offerbg10.jpg',
      title: 'Affordable Premium',
      description: 'Security for you and your family in case of lifelong disability.',
    },
    {
      image: '/assets/offer11.png',
      bgImage: '/assets/offerbg11.jpg',
      title: 'One-Time Payout',
      description: 'Financial support if an accident limits your abilities.',
    },
    {
      image: '/assets/offer12.png',
      bgImage: '/assets/offerbg12.jpg',
      title: 'Protection Against 25+ Critical Illnesses',
      description:
        'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
    },
    {
      image: '/assets/offer9.png',
      bgImage: '/assets/offerbg9.jpg',
      title: 'Living Benefit',
      description: 'Helping with treatment costs so you can focus on recovery.',
    },
    {
      image: '/assets/offer10.png',
      bgImage: '/assets/offerbg10.jpg',
      title: 'Affordable Premium',
      description: 'Security for you and your family in case of lifelong disability.',
    },
    {
      image: '/assets/offer11.png',
      bgImage: '/assets/offerbg11.jpg',
      title: 'One-Time Payout',
      description: 'Financial support if an accident limits your abilities.',
    },
    {
      image: '/assets/offer12.png',
      bgImage: '/assets/offerbg12.jpg',
      title: 'Protection Against 25+ Critical Illnesses',
      description:
        'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
    },
  ]

  const protectionData = {
     title: 'Critical',
    subTitle: 'Protection - ',
    smallTitle: 'Classic',
    bgImage: '/assets/protectionbg1.jpg',
    item: [
      {
        image: '/assets/protection1.png',
        description: 'Covers Surgery or diagnose for 19 Critical Illnesses',
      },
      {
        image: '/assets/protection2.png',
        description: 'Full Coverage Amount Payout',
      },
      {
        image: '/assets/protection3.png',
        description: 'Coverage amount = 50% of Basic Life Coverage',
      },
      {
        image: '/assets/protection4.png',
        description: 'Coverage up to 15 lacs',
      },
    ],
  }
  const protectionData2 = {
    title: '',
    subTitle: 'Standard',
    smallTitle: '',
    bgImage: '/assets/protectionbg2.jpg',
    item: [
      {
        image: '/assets/protection5.png',
        description: 'Covers Diagnoses / Surgery for 10 Minor illnesses & 15 Major illnesses',
      },
      {
        image: '/assets/protection6.png',
        description:
          'Minor Critical illness coverage = 30 % of Rider Coverage Amount or BDT 3 lacs (whichever is lower)',
      },
      {
        image: '/assets/protection7.png',
        description: 'Coverage amount = 50% of Basic Life Coverage',
      },
      {
        image: '/assets/protection8.png',
        description: 'Rider continues even after minor CI claim payment Coverage up to 15 lacs',
      },
    ],
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        // height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[578px] "
        top=" top-[150px] md:top-[200px] lg:top-[63%]"
      />
      <PlanInfoSection data={planInfoData} />
      <OffersClientWrapper
        data={offersData}
        subheading="Four types of protection to keep you and your loved ones financially secure"
        card={2}
      />
      <ProtectionSection bgColor="#FCF4EB" data={protectionData} />
      <ProtectionSection align="right" data={protectionData2} />
      <ContactUsSection />
    </div>
  )
}

export default page
