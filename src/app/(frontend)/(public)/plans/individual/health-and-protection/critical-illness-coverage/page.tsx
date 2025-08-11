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
      description: `Get life-sustaining support because a diagnosis shouldn't derail your dreams. We'll step in so you can fight back stronger.`,
      image: '/assets/banners/crit-coverage.png',
    },
  ]

  const planInfoData = {
    image:
      '/assets/solutions/individual/health-and-protection/critical-protection/web/planInfo5.svg',
    mobileImage:
      '/assets/solutions/individual/health-and-protection/critical-protection/mobile/planInfo5.svg',
    description:
      'Health struggles can come with financial struggles too—making recovery even harder. From rising medical bills to daily expenses, the burden can feel overwhelming. With Shanta Life’s Critical Protection Riders, you get financial security when you need it most—covering up to 25 major illnesses, depending on your plan.',
  }

  const offersData = [
    {
      image: '/assets/icons/web/offer9.png',
      mobileImage: '/assets/icons/mobile/offer9.png',
      bgImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/web/offerbg9.jpg',
      bgMobileImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg9.jpg',
      title: 'Living Benefit',
      description: 'Helping with treatment costs so you can focus on recovery.',
    },
    {
      image: '/assets/icons/web/offer10.png',
      mobileImage: '/assets/icons/mobile/offer10.png',
      bgImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/web/offerbg10.jpg',
      bgMobileImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg10.jpg',
      title: 'Affordable Premium',
      description: 'Security for you and your family in case of lifelong disability.',
    },
    {
      image: '/assets/icons/web/offer11.png',
      mobileImage: '/assets/icons/mobile/offer11.png',
      bgImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/web/offerbg11.jpg',
      bgMobileImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg11.jpg',
      title: 'One-Time Payout',
      description: 'Financial support if an accident limits your abilities.',
    },
    {
      image: '/assets/icons/web/offer12.png',
      mobileImage: '/assets/icons/mobile/offer12.png',
      bgImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/web/offerbg12.jpg',
      bgMobileImage:
        '/assets/solutions/individual/health-and-protection/critical-protection/mobile/offerbg12.jpg',
      title: 'Protection Against 25+ Critical Illnesses',
      description:
        'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
    },
  ]

  const protectionData = {
    title: 'Critical',
    subTitle: 'Protection',
    smallTitle: 'Classic',
    bgImage:
      '/assets/solutions/individual/health-and-protection/critical-protection/web/criticalProtection.jpg',
    bgMobileImage:
      '/assets/solutions/individual/health-and-protection/critical-protection/mobile/criticalProtection.jpg',
    item: [
      {
        image: '/assets/icons/web/protection1.png',
        mobileImage: '/assets/icons/mobile/protection1.png',
        description: 'Covers Surgery or diagnose for 19 Critical Illnesses',
      },
      {
        image: '/assets/icons/web/protection2.png',
        mobileImage: '/assets/icons/mobile/protection2.png',
        description: 'Full Coverage Amount Payout',
      },
      {
        image: '/assets/icons/web/protection3.png',
        mobileImage: '/assets/icons/mobile/protection3.png',
        description: 'Coverage amount = 50% of Basic Life Coverage',
      },
      {
        image: '/assets/icons/web/protection4.png',
        mobileImage: '/assets/icons/mobile/protection4.png',
        description: 'Coverage up to 15 lacs',
      },
    ],
  }
  const protectionData2 = {
    title: 'Critical',
    subTitle: 'Protection',
    smallTitle: 'Standard',
    bgImage:
      '/assets/solutions/individual/health-and-protection/critical-protection/web/Critical-illness.jpeg',
    bgMobileImage:
      '/assets/solutions/individual/health-and-protection/critical-protection/mobile/Critical-illness.jpeg',
    item: [
      {
        image: '/assets/icons/web/protection5.png',
        mobileImage: '/assets/icons/mobile/protection5.png',
        description: 'Covers Diagnoses / Surgery for 10 Minor illnesses & 15 Major illnesses',
      },
      {
        image: '/assets/icons/web/protection6.png',
        mobileImage: '/assets/icons/mobile/protection6.png',
        description:
          'Minor Critical illness coverage = 30 % of Rider Coverage Amount or BDT 3 lacs (whichever is lower)',
      },
      {
        image: '/assets/icons/web/protection7.png',
        mobileImage: '/assets/icons/mobile/protection7.png',
        description: 'Coverage amount = 50% of Basic Life Coverage',
      },
      {
        image: '/assets/icons/web/protection8.png',
        mobileImage: '/assets/icons/mobile/protection8.png',
        description: 'Rider continues even after minor CI claim payment Coverage up to 15 lacs',
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
        card={2}
      />
      <ProtectionSection bgColor="#FCF4EB" data={protectionData} />
      <ProtectionSection align="right" data={protectionData2} />
      <ContactUsSection />
    </div>
  )
}

export default page
