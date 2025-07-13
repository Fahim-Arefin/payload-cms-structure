import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'

import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { Button } from '@/components/ui/button'
import ToolTip from '@/components/custom/shared/ToolTip'

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
      link: '/plans/individual/child-education',
      image: '/assets/plan5.jpg',
    },
    {
      title: 'Health & Protection',
      description: 'Life happens. We make sure you\u2019re ready.',
      link: '/plans/individual/health-and-protection',
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
          className="absolute bottom-12 lg:top-[500px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <ToolTip>
            <Button
              variant="primary"
              className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[30px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
            >
              Explore Now
            </Button>
          </ToolTip>
          <ToolTip>
            <Button
              className=" 
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[30px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal
            border border-white text-white bg-white/20 backdrop-blur-md
             hover:bg-white/30 hover:border-white transition-colors duration-300"
            >
              Call Now
            </Button>
          </ToolTip>
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
