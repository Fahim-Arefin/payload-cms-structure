import React from 'react'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import MicroinsuranceIntro from '@/components/custom/shared/plans/MicroinsuranceIntro'
import MicroinsuranceDescSection from '@/components/custom/microinsurance/MicroinsuranceDescSection'
import MicroinsuranceOffer from '@/components/custom/microinsurance/MicroinsuranceOffer'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Affordable Insurance for Everyone ',
      subtitle: '',
      description: 'Protecting lives, securing future',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-hero.jpg`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-intro.png`,
    // mobileImage: '/assets/solutions/bancassurance/mobile/planInfo3.png',
    description: `Our mission is to provide affordable coverage for low-income and vulnerable people. 
    With growing demand for inclusive financial services, we ensure protection for all.`,
  }
  const benefitsForCustomerData = {
    title: 'Benefits for ',
    coloredTitle: 'Customers',
    microinsuranceProductsImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-desc.jpg`,
    microinsuranceProducts: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-icon1.png`,
        description: 'Health emergencies',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/microinsurance-icon2.png`,
        description: 'Untimely loss of life',
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
      summary:
        "Comprehensive life coverage to protect your family's financial future",
      bullets: ['Family protection', 'Affordable premiums', 'Quick claims'],
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-icon2.png`,
      title: 'Health Insurance',
      summary:
        'Essential health coverage for medical emergencies and treatments',
      bullets: ['Emergency coverage', 'Hospital benefits', 'Medical support'],
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-icon3.png`,
      title: 'Family Protection',
      summary:
        'Complete family insurance solutions tailored for your needs',
      bullets: ['Multi-member coverage', 'Flexible plans', '24/7 support'],
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-icon4.png`,
      title: 'Property Insurance',
      summary:
        'Protect your home and belongings from unexpected events',
      bullets: ['Home protection', 'Asset coverage', 'Natural disaster cover'],
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
      <MicroinsuranceDescSection data={benefitsForCustomerData}/>
      <MicroinsuranceOffer data={offerData}/>
    </div>
  )
}

export default page
