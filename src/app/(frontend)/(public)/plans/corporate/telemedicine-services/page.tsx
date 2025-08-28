import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import KeyBenefits from '@/components/custom/shared/plans/KeyBenefits'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'

function page() {
  const heroSlides = [
    {
      title: 'Telemedicine Services',
      subtitle: '',
      description:
        'At Shanta Life Insurance, our Telemedicine Service brings healthcare closer than ever — giving you 24/7 access to qualified doctors, anytime, anywhere.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/TS-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'How Telemedicine Works',
    description: `
   Telemedicine allows insured members to consult licensed physicians remotely via phone, video call, or online chat. Whether it’s for general health advice, follow-up consultations, or minor illnesses, members can connect with a doctor without visiting a hospital or clinic. 
  `,
  }

  const WCTMSectionData = {
    title: 'Telemedicine',
    coloredTitle: 'Eligibility and Cost',
    description:
      'All eligible employees and their covered dependents under Shanta Life’s Group Health Insurance Plan are eligible to use the Telemedicine platform, free of charge.',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/WCTMImage.jpg`,
  }
  const keyBenefitsData = {
    title: 'Key Benefits of',
    coloredTitle: 'Telemedicine with Shanta Life',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefit.webp`,
    description: 'Enjoy the facilities you deserve without breaking the bank.',
    items: [
      {
        title: 'Instant Doctor Access',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefitIIcon1.png`,
      },
      {
        title: '24/7 Availability',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefitIIcon2.png`,
      },
      {
        title: 'E-Prescriptions',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefitIIcon3.png`,
      },
    ],
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <WCTMSection data={WCTMSectionData} className="bg-white" />
      <KeyBenefits data={keyBenefitsData} />
    </div>
  )
}

export default page
