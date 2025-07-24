import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function PlanPage() {
  const heroSlides = [
    {
      title: 'The right insurance stands with you.',
      subtitle: 'Every step. Every Turn.',
      // description:
      //   'Life\u2019s full of surprises. We\u2019re here to help you navigate them. Let\u2019s build a confident future together.',
      description:
        'Life\u2019s full of surprises, We\u2019re here to help you navigate them. Let\u2019s build a confident future together.',
      image: '/assets/solutionHeroBanner.jpg',
    },
  ]

  const allPlantData = [
    {
      title: 'INDIVIDUAL',
      description: 'Because your protection should be as exceptional as you are.',
      link: '/plans/individual',
      image: '/assets/plan1.jpg',
    },
    {
      title: 'CORPORATE',
      description: 'Corporate policies as sharp as your strategy.',
      link: '/plans/corporate',
      image: '/assets/plan2.jpg',
    },
    // BANCASSURANCE will be omitted for now
    // {
    //   title: 'BANCASSURANCE',
    //   description:
    //     'Money moves meet smart moves. Integrated coverage that fits into your financial routine.',
    //   link: '/plans/bancassurance',
    //   image: '/assets/plan3.jpg',
    // },
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
          <Link href="/purchase">
            <GlobalButton size="large" text="Purchase" variant="primary" className="" />
          </Link>
          <CallNowButton />
        </div>
      </HeroSection>
      <AllPlanSection plantData={allPlantData} blur>
        <div className="uppercase global-h2 font-medium">
          Choose <span className="text-[#ED7125]">your fit</span>
        </div>
        <div className="global-span text-[#3A3A3A] font-[350]">
          Explore plans built for your need
        </div>
      </AllPlanSection>
    </div>
  )
}

export default PlanPage
