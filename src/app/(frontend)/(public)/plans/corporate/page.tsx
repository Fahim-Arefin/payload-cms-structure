import CorporateAddons from '@/components/custom/corporate/CorporateAddons'
import CorporateChoose from '@/components/custom/corporate/CorporateChoose'
import CorporateHighlight from '@/components/custom/corporate/CorporateHighlights'
import CorporateSuitability from '@/components/custom/corporate/CorporateSuitability'
import PartnerCarousel from '@/components/custom/corporate/PartnerCarousel'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Shanta Corporate Plans',
      subtitle: '',
      description: 'When you go further for your people, they go further for you.',
      image: '/assets/corporatePlans.png',
    },
  ]

  const highlightData = [
    {
      mainDescription:
        'Deciding on the best package for your team, making sure you’re getting value for money, staying on top of the options available… It can all add up to a daunting to-do list. We’re here to make that easier for you.',
    },
  ]

  const benefitsData = [
    {
      icon: '/assets/choose1.svg',
      text: 'Comprehensive Coverage',
      description:
        'Protection that spans natural demise, accidental fatalities, disabilities, and major health conditions.',
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
      text: 'GLOBAL CARE ACCESS',
      description: 'Intelligent healthcare coverage—seamlessly bridging local and global support.',
    },
    {
      icon: '/assets/choose5.svg',
      text: 'Dedicated Account Management',
      description: 'Enhance retention with data-backed care solutions, managed by a team of dedicated experts. ',
    },
  ]

  const suitabilityData = [
    {
      img: '/assets/standard1.svg',
      title: 'FOR LIFE COVERAGE',
      description:
        'All regular and healthy eligible employees aged 18 to 64 are qualified for coverage. New hires shall get immediate protection under the scheme from day one seamless and stress-free security from the beginning of their journey with your company.',
    },
    {
      img: '/assets/standard2.svg',
      title: 'FOR HEALH COVERAGE',
      description:
        'All eligible employees are suitable for this coverage. Expanding this coverage to employees’ dependents provides an additional level of support. It reflects a deep commitment not only to the employee but also to their family, promoting a sense of security, care and well-being for their entire household.',
    },
  ]

  const partnerData = [
    {
      img: '/assets/partner1.png',
      title: 'GOLDEN HARVEST',
    },
    {
      img: '/assets/partner2.png',
      title: 'PARTEX STAR GROUP',
    },
    {
      img: '/assets/partner3.png',
      title: 'AMERICAN & EFRID, INC',
    },
    {
      img: '/assets/partner4.png',
      title: 'GE HEALTHCARE',
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
          <ToolTip>
            <Button
              variant="primary"
              className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
            >
              Explore Now
            </Button>
          </ToolTip>

          <ToolTip className="flex items-center space-x-2 text-white 2xl:space-x-4">
            {/* <div className="flex items-center space-x-2 text-white 2xl:space-x-4"> */}
            <Button
              className=" cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal border border-white text-white bg-white/20 backdrop-blur-md
                        hover:bg-white/30 hover:border-white transition-colors duration-300"
            >
              Call Now
            </Button>
            {/* </div> */}
          </ToolTip>
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
