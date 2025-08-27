import HeroSection from '@/components/custom/shared/hero/HeroSection'
import BenefitSliderSection from '@/components/custom/shared/plans/BenefitSliderSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Lifestyle Privileges',
      subtitle: 'with Digital Loyalty Card ',
      description:
        'Life insurance that rewards you — with lifestyle privileges to enrich every day.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/LPWDLC-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'Enriching Lifestyles Everyday',
    description: `
   With Shanta Life, coverage comes with privileges. Enjoy special discounts on hotels, lifestyle brands, and more — with a growing list of enriching partners designed to make your life better every day.
  `,
  }

  const benefitSliderData = {
    title: 'Benefits of',
    coloredTitle: 'Our Hospital Network',
    description: 'Discover the benefits that make our hospital service special.',
    item: [
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage1.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon1.png`,
        description: 'Seagull Hotels Ltd.',
        rateText: 'Save up to 60%',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage2.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon2.png`,
        description: 'Amari Dhaka',
        rateText: '5-star comfort at special prices',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage3.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon3.png`,
        description: 'Seagull resort & spa village',
        rateText: 'Save up to 60%',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage4.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon4.png`,
        description: 'White hall Hotel',
        rateText: ' Premium luxury at affordable rates',
      },
    ],
  }

  const WCTMSectionData = {
    title: 'Hotel & Resort',
    coloredTitle: 'Discounts',
    description:
      'Turn your holidays and business trips into unforgettable experiences at premium hotels and resorts with exclusive discounts of up to 60% through Digital Loyalty Card. ',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/WCTMImage.png`,
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <WCTMSection data={WCTMSectionData} className="bg-white" />
      <BenefitSliderSection data={benefitSliderData} basis=" basis-1/2 md:basis-1/3 lg:basis-1/4" />
    </div>
  )
}

export default page
