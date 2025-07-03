import OnboardingHighlight from '@/components/custom/agent-onboarding/OnboardingHighlight'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Launch Your Career as a Relationship Officer at Shanta Life',
      subtitle: '',
      description: 'Step into a career that offers purpose, growth, and real impact.',
      image: '/assets/banner4.png',
    },
  ]

  const highlightSlides = [
    {
      mainDescription:
        'As a Relationship Officer at Shanta Life, you’ll be part of a dynamic industry with endless potential. Enjoy attractive earnings, continuous professional development, and the rewarding experience of helping individuals and families secure their financial futures. This isn’t just a role—it’s your gateway to a successful future.',
      images: [
        {
          src: '/assets/onboarding1.png',
          title: 'Attractive Earning PotentialBased on Performance',
        },
        {
          src: '/assets/onboarding2.png',
          title: 'Learning from the top-tierIndustry insider in BD',
        },
        {
          src: '/assets/onboarding3.png',
          title: 'Applicable for professionals, Freshers & Undergraduates',
        },
        {
          src: '/assets/onboarding4.png',
          title: 'Completely Flexible Work Hours',
        },
      ],
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} />
      <OnboardingHighlight highlightSlides={highlightSlides[0]}/>
    </div>
  )
}

export default page
