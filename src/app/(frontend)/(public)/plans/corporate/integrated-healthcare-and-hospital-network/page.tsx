import HeroSection from '@/components/custom/shared/hero/HeroSection'
import BenefitSliderSection from '@/components/custom/shared/plans/BenefitSliderSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Integrated Healthcare',
      subtitle: '& Hospital Network',
      description:
        'We deliver care beyond coverage — cashless, quick, and all under one trusted network.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/IHHN-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'We ensure',
    description: `
    <ul>
      <li>Cashless hospitalization at our panel hospitals</li>
      <li>Discounted medical services for OPD and diagnostic tests</li>
      <li>24/7 assistance for emergency admissions</li>
      <li>Direct settlement of bills without out-of-pocket expenses (at panel hospitals)</li>
      <li>Up to 35% discount at our partner diagnostic centers across Bangladesh</li>
    </ul>
  `,
  }

  const benefitSliderData = {
    title: 'Benefits of',
    coloredTitle: 'Our Hospital Network',
    description: 'Discover the benefits that make our hospital service special.',
    item: [
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage1.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon1.png`,
        description: 'Nationwide Coverage',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage2.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon2.png`,
        description: 'Cashless Treatment',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage3.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon3.png`,
        description: 'Priority Service',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFBgImage4.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/CHFIcon4.png`,
        description: 'Comprehensive Care',
      },
    ],
  }

  const WCTMSectionData = {
    title: 'Why ',
    coloredTitle: 'It Matters',
    description:
      'By offering an integrated healthcare solution, employers can ensure that their workforce has easy access to quality healthcare services, reducing downtime and enhancing overall well-being.',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/integrated-healthcare-and-hospital-network/web/WCTMImage.jpg`,
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <BenefitSliderSection data={benefitSliderData} basis={benefitSliderData?.item?.length} />
      <WCTMSection data={WCTMSectionData} />
    </div>
  )
}

export default page
