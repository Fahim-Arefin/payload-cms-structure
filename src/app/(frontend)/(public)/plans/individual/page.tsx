import AllPlanSection from '@/components/custom/plans/AllPlanSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'

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
      link: '/',
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
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} />
      <AllPlanSection plantData={indivisualPlantData} blur>
        <div>
          <span>Not Just Policies,</span>
          <br />
          <span className="text-[#ED7125]">It's POSSIBILITIES </span>
        </div>
      </AllPlanSection>
    </div>
  )
}

export default PlanPage
