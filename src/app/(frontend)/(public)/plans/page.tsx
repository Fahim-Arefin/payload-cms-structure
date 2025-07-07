import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'
import { Button } from '@/components/ui/button'
import { BsPlay } from 'react-icons/bs'

function PlanPage() {
  const heroSlides = [
    {
      title: 'The right insurance stands with you.',
      subtitle: 'Every step. Every Turn.',
      description:
        'The right life insurance doesn\u2019t just wait around for the what-ifs—it walks beside you through the what\u2019s next.',
      image: '/assets/banner4.jpg',
    },
  ]

  const allPlantData = [
    {
      title: 'INDIVIDUAL',
      description: 'Why blend in when your coverage can stand out?',
      link: '/plans/individual',
      image: '/assets/plan1.jpg',
    },
    {
      title: 'CORPORATE',
      description: 'Corporate protection that\u2019s as sharp as your strategy.',
      link: '/plans/corporate',
      image: '/assets/plan2.jpg',
    },
    {
      title: 'BANCASSURANCE',
      description:
        'Money moves meet smart moves. Integrated coverage that fits into your financial routine',
      link: '/plans/bancassurance',
      image: '/assets/plan3.jpg',
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute bottom-12 lg:top-[500px] xl:top-[490px]  2xl:top-[730px] 
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
      <AllPlanSection plantData={allPlantData}>
        <div>
          Protect what <span className="text-[#ED7125]">brings you joy</span>
        </div>
      </AllPlanSection>
    </div>
  )
}

export default PlanPage
