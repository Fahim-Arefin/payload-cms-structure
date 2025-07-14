import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import AllPlanIndividualSection from '@/components/custom/shared/plans/AllPlanIndividualSection'

import HeroSection from '@/components/custom/shared/hero/HeroSection'
// import { Button } from '@/components/ui/button'
// import ToolTip from '@/components/custom/shared/ToolTip'

function PlanPage() {
  const heroSlides = [
    {
      title: 'Health & Protection',
      subtitle: '',
      description: '',
      image: '/assets/healthandprotection1.jpg',
      titleTop: '60%',
    },
  ]

  const indivisualPlantData = [
    {
      title: 'Shanta',
      biggerTitle: 'Accidental Coverage',
      description: 'Why blend in when your coverage can stand out?',
      link: '/plans/individual/saving-and-investment',
      image: '/assets/healthandprotection2.jpg',
    },
    {
      title: 'Shanta',
      biggerTitle: 'Critical Illness Coverage',
      description: 'Why blend in when your coverage can stand out?',
      link: '/',
      image: '/assets/healthandprotection3.jpg',
    },
  ]

  return (
    <div className="font-avenir bg-white ">
      <HeroSection heroSlides={heroSlides} top=" top-[250px] md:top-[300px] lg:top-[63%] " />
      <AllPlanIndividualSection plantData={indivisualPlantData} blur>
        <div>
          <span>A healthy outside </span>
          {/* <br /> */}
          <span className="text-[#ED7125]">starts from the inside </span>
        </div>
      </AllPlanIndividualSection>
      <ContactUsSection />
    </div>
  )
}

export default PlanPage
