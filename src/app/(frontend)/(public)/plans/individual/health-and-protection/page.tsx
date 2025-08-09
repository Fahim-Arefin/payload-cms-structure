import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'

import HeroSection from '@/components/custom/shared/hero/HeroSection'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'

function PlanPage() {
  const heroSlides = [
    {
      title: 'Health & Protection',
      subtitle: '',
      description:
        'Preventive care meets powerful protection. Let us be your financial shield you can count on. ',
      image: '/assets/banners/health-and-protection-banner.jpg',
      titleTop: '60%',
    },
  ]

  const indivisualPlantData = [
    {
      title: 'Shanta',
      biggerTitle: 'Accidental Coverage',
      description: 'Life’s detours aren’t always in your control — but recovery can be.',
      link: '/plans/individual/health-and-protection/accidental-coverage',
      image: '/assets/healthandprotection2.jpg',
    },
    {
      title: 'Shanta',
      biggerTitle: 'Critical Protection',
      description: 'Coverage to help you heal- financially and fearlessly.',
      link: '/plans/individual/health-and-protection/critical-illness-coverage',
      image: '/assets/healthandprotection3.jpg',
    },
  ]

  return (
    <div className="font-avenir bg-white ">
      <HeroSection heroSlides={heroSlides} top=" top-[250px] md:top-[300px] lg:top-[63%] " />
      <AllPlanSection plantData={indivisualPlantData} blur>
        <div className="uppercase global-h2 font-medium">
          <span>A healthy outside </span>
          {/* <br /> */}
          <span className="text-[#ED7125]">starts from the inside </span>
        </div>
      </AllPlanSection>
      <ContactUsSection />
    </div>
  )
}

export default PlanPage
