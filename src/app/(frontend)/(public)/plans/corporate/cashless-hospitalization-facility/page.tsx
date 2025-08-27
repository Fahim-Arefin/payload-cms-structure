import HeroSection from '@/components/custom/shared/hero/HeroSection'
import BenefitSliderSection from '@/components/custom/shared/plans/BenefitSliderSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Cashless Hospitalization Facility',
      subtitle: '',
      description:
        'Shanta Life Insurance offers a seamless cashless in-patient treatment facility through our exclusive Shanta Life Hospital Network.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHF-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'How Our Cashless Facility Works',
    description: `
    With Shanta Life’s exclusive Hospital Network, members enjoy seamless cashless in-patient care — no upfront payments, no stress. We settle bills directly with partner hospitals, so you can focus on recovery while we take care of the finances.
  `,
  }

  const benefitSliderData = {
    title: 'Key Features',
    coloredTitle: '& Benefits',
    description: 'Discover the advantages that make our cashless service the preferred choice.',
    item: [
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage1.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFIcon1.png`,
        description: 'Cashless admission at approved network hospitals',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage2.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFIcon2.png`,
        description: 'No need for reimbursement paperwork',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage3.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFIcon3.png`,
        description: 'Coverage up to the insured sum as per the policy terms',
      },
    ],
  }

  const WCTMSectionData = {
    title: 'Why Cashless',
    coloredTitle: 'Treatment Matters',
    description:
      'With medical costs rising, the cashless benefit ensures that your team can access quality healthcare instantly and stress-free. It removes the financial burden at the time of hospitalization and simplifies the entire claims process.  ',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/WCTMImage.png`,
    // image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/cashless-hospitalization-facility/web/CHFBgImage1.jpg`,
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <BenefitSliderSection data={benefitSliderData} bgColor="bg-white" />
      <WCTMSection data={WCTMSectionData} />
    </div>
  )
}

export default page
