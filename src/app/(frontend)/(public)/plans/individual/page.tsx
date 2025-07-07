import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'

import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'
import { Button } from '@/components/ui/button'
import { BsPlay } from 'react-icons/bs'

function PlanPage() {
  const heroSlides = [
    {
      title: 'Offering Confidence',
      subtitle: '',
      description: 'Stay Ahead in Life',
      image: '/assets/plan1.jpg',
    },
  ]

  const indivisualPlantData = [
    {
      title: 'Saving and Investments',
      description: 'Turn today\u2019s choices into tomorrow\u2019s freedom.',
      link: '/plans/individual/saving-and-investment',
      image: '/assets/plan4.jpg',
    },
    {
      title: 'Child Education',
      description: 'From crayons to cap and gown — we\u2019ve got you covered',
      link: '/',
      image: '/assets/plan5.jpg',
    },
    {
      title: 'Health & Protection',
      description: 'Life happens. We make sure you\u2019re ready.',
      link: '/',
      image: '/assets/plan6.jpg',
    },
    {
      title: 'Retirement',
      description: 'Plan today for the freedom you deserve tomorrow.',
      link: '/',
      image: '/assets/plan7.jpg',
    },
    {
      title: 'Takaful',
      description: 'Guided by Shariah, united in trust — protection with integrity.',
      link: '/',
      image: '/assets/plan8.jpg',
    },
  ]

  return (
    <div className="font-avenir bg-white ">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[205px] md:top-[305px] lg:top-[400px] xl:top-[420px]  2xl:top-[630px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <Button
            variant="primary"
            className="
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
          >
            Explore Now
          </Button>
          <Button
            className=" px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6 w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] rounded border border-white text-white bg-white/20 backdrop-blur-md
             hover:bg-white/30 hover:border-white transition-colors duration-300"
          >
            Call Now
          </Button>
        </div>
      </HeroSection>
      <AllPlanSection plantData={indivisualPlantData} blur>
        <div>
          <span>Not Just Policies,</span>
          <br />
          <span className="text-[#ED7125]">It's POSSIBILITIES </span>
        </div>
      </AllPlanSection>
      <ContactUsSection />
    </div>
  )
}

export default PlanPage
