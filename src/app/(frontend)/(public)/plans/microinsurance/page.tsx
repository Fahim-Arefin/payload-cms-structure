import React from 'react'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import MicroinsuranceIntro from '@/components/custom/shared/plans/MicroinsuranceIntro'
import MicroinsuranceDescSection from '@/components/custom/microinsurance/MicroinsuranceDescSection'

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
    </div>
  )
}

export default page
