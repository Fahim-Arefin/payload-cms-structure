import React from 'react'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'
import PremiumEligibilitySection from '@/components/custom/shared/plans/PremiumEligibilitySection'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Waiver of Premium',
      description: `Secure future for your loved ones, in any situation`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/hero-banner.jpg`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/intro-banner.png`,
    // mobileImage:
    //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/planInfo4.png',
    description: `Life insurance is essential for the safety of your loved ones, but what if you're unable to pay 
    the premium due to unforeseen circumstances? The Shanta Waiver of Premium Rider will stand by you in such situations—where, 
    even if your income stops, the insurance benefits will continue, ensuring the protection of your family. `,
  }

  const offersData = [
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer5.png`,
      // mobileImage: '/assets//icons/mobile/offer5.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/offer-banner1.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg5.jpg',
      title: 'Plan 1',
      description:
        'If the premium payer unexpectedly passes away, all future premiums are waived, keeping the insurance active and your loved ones protected',
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer6.png`,
      // mobileImage: '/assets//icons/mobile/offer6.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/offer-banner2.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg6.jpg',
      title: 'Plan 2',
      description:
        'If the premium payer suffers a sudden and permanent disability, all future premiums are waived, ensuring the insurance continues to provide coverage.',
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer7.png`,
      // mobileImage: '/assets//icons/mobile/offer7.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/offer-banner3.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg7.jpg',
      title: 'Plan 3',
      description: `In the unfortunate event of the premium payer’s sudden death or permanent disability, 
        all future premiums are waived, and the insurance remains active, safeguarding your family's future.`,
    },
  ]

  const eligibilityData = {
    title: 'Criteria For',
    subTitle: 'elegibility',
    smallTitle: '',
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/eligibility-banner.jpg`,
    bgMobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/mobile/eligibility-banner.jpg`,
    item: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon1.png`,
        // mobileImage: '/assets/icons/mobile/protection1.png',
        description: 'Premiums waived if ill or disabled',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon2.png`,
        // mobileImage: '/assets/icons/mobile/protection2.png',
        description: 'Must meet age, health rules',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon3.png`,
        // mobileImage: '/assets/icons/mobile/protection3.png',
        description: 'Extra fee applies',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon4.png`,
        // mobileImage: '/assets/icons/mobile/protection4.png',
        description: 'Not for pre-existing conditions',
      },
    ],
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <PlanInfoSection data={planInfoData} />
      <OffersClientWrapper
        data={offersData}
        subheading="Shanta Waiver of Premium brings 3 exclusive plans to manage life's unexpected challenges. "
        card={2}
      />
      <PremiumEligibilitySection data={eligibilityData} />
      <ContactUsSection />
    </div>
  )
}

export default page
