import CorporateAddons from '@/components/custom/corporate/CorporateAddons'
import CorporateChoose from '@/components/custom/corporate/CorporateChoose'
import CorporateHighlight from '@/components/custom/corporate/CorporateHighlights'
import CorporateSuitability from '@/components/custom/corporate/CorporateSuitability'
import PartnerCarousel from '@/components/custom/corporate/PartnerCarousel'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Shanta Corporate Plans',
      subtitle: '',
      description: 'When you go further for your people, they go further for you.',
      image: '/assets/corporateHeroBanner.jpg',
    },
  ]

  const highlightData = [
    {
      mainDescription: `Deciding on the best package for your team, making sure you’re getting value for money, staying on top of the options available.It can all add up to a daunting to-do list. We’re here to make that easier for you. `,
    },
  ]

  const benefitsData = [
    {
      icon: '/assets/choose1.svg',
      text: 'Comprehensive Coverage',
      description:
        'Protection that spans natural demise, accidental fatalities, disabilities, and major health conditions. ',
    },
    {
      icon: '/assets/choose2.svg',
      text: 'Simplified Holistic Healthcare',
      description:
        'All-around healthcare support—covering hospitalization, maternity, dental, optical, and more.',
    },
    {
      icon: '/assets/choose3.svg',
      text: 'Effortless Claims Settlement',
      description: 'Smart and seamless claims support system with instant cashless access.',
    },
    {
      icon: '/assets/choose4.svg',
      text: 'Global Care Access',
      description: 'Intelligent healthcare coverage—seamlessly bridging local and global support.',
    },
    {
      icon: '/assets/choose5.svg',
      text: 'Dedicated Account Management',
      description:
        'Enhance retention with data-backed care solutions, managed by a team of dedicated experts.',
    },
  ]

  const suitabilityData = [
    {
      img: '/assets/standard1.svg',
      title: 'FOR LIFE COVERAGE',
      description:
        'All regular, healthy employees aged 18 to 64 are eligible for coverage. New hires receive instant protection from day one, ensuring seamless and hassle-free security from the very start of their journey with your company.',
    },
    {
      img: '/assets/standard2.svg',
      title: 'FOR HEALH COVERAGE',
      description:
        'All eligible employees qualify for this coverage. Extending it to their dependents adds another layer of support, demonstrating a strong commitment not only to the employee but also to their family—fostering security, care, and well-being for the entire household.',
    },
  ]

  const partnerData = [
    { img: '/assets/valued-clients/ShantaHolding.png', title: 'Shanta Holdings Limited' },
    {
      img: '/assets/valued-clients/Logo-Shanta-Multiverse.png',
      title: 'Shanta Multiverse Limited',
    },
    { img: '/assets/valued-clients/ShantaLifestyle.png', title: 'Shanta Lifestyle Limited' },
    { img: '/assets/valued-clients/amari-dhaka.png', title: 'Amari Dhaka' },
    {
      img: '/assets/valued-clients/hohensteiname.png',
      title: 'Hohenstein Laboratories Bangladesh Limited',
    },
    {
      img: '/assets/valued-clients/63a0499788734fea9d45a6a1_Logo-eskimi.png',
      title: 'Eskimi Bangladesh',
    },
    { img: '/assets/valued-clients/seml-bg.png', title: 'Strategic Equity Management' },
    { img: '/assets/valued-clients/STS_Group_logo.png', title: 'STS Capital Limited' },
    { img: '/assets/valued-clients/Golden-Sky-LOGO-3.png', title: 'Golden Sky Footwear' },
    { img: '/assets/valued-clients/Blucheez-Red_Blucheez_logo.png', title: 'Blucheez Fashion' },
    {
      img: '/assets/valued-clients/Eduko_Logo_Transparent_Background.png',
      title: 'Eduko Bangladesh',
    },
    {
      img: '/assets/valued-clients/Glenrich-New-Logo-2048x1016.png',
      title: 'Glenrich International School',
    },
    { img: '/assets/valued-clients/Line2.png', title: 'Bengal Airlift Limited' },
    {
      img: '/assets/valued-clients/acebangladesh-e1729689682400.png',
      title: 'Ace Bangladesh Limited',
    },
    { img: '/assets/valued-clients/Fitsair_logo.png', title: 'FitsAir' },
    { img: '/assets/valued-clients/aIR-ALLIANCE.png', title: 'Air Alliance Ltd. (SP)' },
    {
      img: '/assets/valued-clients/pixel_speedmark_8fb3bdc46abb8be4b9e2d982fdffea1d-4-4.png',
      title: 'Speedmark Transportation (BD) Limited',
    },
  ]

  const addOnsData = [
    {
      image: '/assets/addonIcon1.svg',
      description: 'Integrated Healthcare and Diagnostic Network',
      bgImage: '/assets/addons1.jpg',
    },
    {
      image: '/assets/addonIcon2.svg',
      description: 'Exclusive Discounts on Lifestyle Amenities ',
      bgImage: '/assets/addons2.jpg',
    },
    {
      image: '/assets/addonIcon3.svg',
      description: 'Digital Loyalty Card ',
      bgImage: '/assets/addons3.jpg',
    },
    {
      image: '/assets/addonIcon4.svg',
      description: 'Telemedicine Service',
      bgImage: '/assets/addons4.jpg',
    },
    {
      image: '/assets/addonIcon1.svg',
      description: 'Integrated Healthcare and Diagnostic Network',
      bgImage: '/assets/addons1.jpg',
    },
    {
      image: '/assets/addonIcon2.svg',
      description: 'Exclusive Discounts on Lifestyle Amenities ',
      bgImage: '/assets/addons2.jpg',
    },
    {
      image: '/assets/addonIcon3.svg',
      description: 'Digital Loyalty Card ',
      bgImage: '/assets/addons3.jpg',
    },
    {
      image: '/assets/addonIcon4.svg',
      description: 'Telemedicine Service',
      bgImage: '/assets/addons4.jpg',
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
        >
          <Link
            href="/assets/pdf/Required Brochures/Corporate Plans/Shanta Company Profile Brochure.pdf"
            target="_blank"
          >
            <GlobalButton size="large" text="Download Brochure" variant="primary" />
          </Link>

          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <CallNowButton />
          </div>
        </div>
      </HeroSection>
      <CorporateHighlight highlightsData={highlightData} />
      <CorporateChoose benefitsData={benefitsData} />
      <CorporateSuitability data={suitabilityData} />
      <PartnerCarousel data={partnerData} />
      <CorporateAddons data={addOnsData} />
      <ContactUsSection />
    </div>
  )
}

export default page
