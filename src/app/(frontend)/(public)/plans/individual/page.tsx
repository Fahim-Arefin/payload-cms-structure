import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'

import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { Button } from '@/components/ui/button'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import Link from 'next/link'

function PlanPage() {
  const heroSlides = [
    {
      title: 'Individual Plans',
      subtitle: '',
      description: 'Because real life doesn’t come with a rewind button',
      image: '/assets/plan1.jpg',
    },
  ]

  const indivisualPlantData = [
    {
      title: 'Child Education Plan',
      description: `A brighter future starts with a thoughtful plan`,
      link: '/plans/individual/child-education',
      image: '/assets/childEducationPlan.jpg',
    },
    {
      title: 'Saving and Investment Plan',
      description: `Because Life Has More Than One Milestone. We’re With You at Every One.`,
      link: '/plans/individual/saving-and-investment',
      image: '/assets/banners/s&i-banner.png',
    },

    {
      title: 'Health and Protection Plan',
      description: `Preventive care meets powerful protection. Let us be your financial shield you can count on`,
      link: '/plans/individual/health-and-protection',
      image: '/assets/healthandprotection1.jpg',
    },
    // {
    //   title: 'Retirement',
    //   description: 'Plan today for the freedom you deserve tomorrow.',
    //   link: '/',
    //   image: '/assets/plan7.jpg',
    // },
    // {
    //   title: 'Takaful',
    //   description: 'Guided by Shariah, united in trust — protection with integrity.',
    //   link: '/',
    //   image: '/assets/plan8.jpg',
    // },
  ]

  return (
    <div className="font-avenir bg-white ">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute bottom-12 lg:top-[500px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <Link href="/purchase-now">
            <GlobalButton size="large" text="Purchase Now" variant="primary" className="" />
          </Link>
          <CallNowButton />
        </div>
      </HeroSection>
      <AllPlanSection plantData={indivisualPlantData} blur>
        <div className="uppercase global-h2 font-medium">
          <span>
            Not Just <span className="text-[#ED7125]">policies</span>,
          </span>
          <br />
          <span className="text-[#ED7125]">It's POSSIBILITIES</span>
        </div>
        <div className="hidden lg:block global-span text-[#3A3A3A] font-[350] mt-4 xl:mt-6 2xl:mt-12">
          From wealth-building solutions to education-focused coverage,
        </div>
        <div className="hidden lg:block global-span text-[#3A3A3A] font-[350]">
          we bring you tailored plans that meet your ambitions.
        </div>
      </AllPlanSection>
      <ContactUsSection />
    </div>
  )
}

export default PlanPage
