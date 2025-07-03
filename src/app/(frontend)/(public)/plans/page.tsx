import AllPlanSection from '@/components/custom/plans/AllPlanSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'

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
      <AllPlanSection plantData={allPlantData}>
        <div>
          Protect what <span className="text-[#ED7125]">brings you joy</span>
        </div>
      </AllPlanSection>
    </div>
  )
}

export default PlanPage
