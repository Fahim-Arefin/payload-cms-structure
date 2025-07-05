import OnboardingForm from '@/components/custom/agent-onboarding/OnboardingForm'
import OnboardingHighlight from '@/components/custom/agent-onboarding/OnboardingHighlight'
import OnboardingOpportunity from '@/components/custom/agent-onboarding/OnboardingOpportunity'
import OnboardingRoles from '@/components/custom/agent-onboarding/OnboardingRoles'
import OnboardingWay from '@/components/custom/agent-onboarding/OnboardingWay'
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
        title: 'Attractive Earning Potential Based on Performance',
      },
      {
        src: '/assets/onboarding2.png',
        title: 'Learning from the top-tier Industry insider in BD',
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

const rolesData = [
  {
    icon: '/assets/roles1.png',
    text: 'Attractive Earning Potential\nBased on Performance',
  },
  {
    icon: '/assets/roles2.png',
    text: 'Learning from the top-tier\nIndustry insider in BD',
  },
  {
    icon: '/assets/roles3.png',
    text: 'Applicable for professionals,\nFreshers & Undergraduates',
  },
  {
    icon: '/assets/roles4.png',
    text: 'Completely Flexible Work Hours',
  },
]

 const wayWeAreData = [
    {
      image: '/assets/onboardingWay1.png',
      title: '',
      description:
        '',
    },
    {
      image: '/assets/onboardingWay2.png',
      title: '',
      description:
        '',
    },
    {
      image: '/assets/onboardingWay3.png',
      title: '',
      description:
        '',
    },
    {
      image: '/assets/onboardingWay1.png',
      title: '',
      description:
        '',
    },
    {
      image: '/assets/onboardingWay2.png',
      title: '',
      description:
        '',
    },
    {
      image: '/assets/onboardingWay3.png',
      title: '',
      description:
        '',
    },
    
  ]

const opportunityData = {
  title: 'INCLUSIVE CAREER',
  items: [
    { text: 'Seasoned Professionals', src: '/assets/onboardingOpportunity1.jpg' },
    { text: 'Fresh Graduates', src: '/assets/onboardingOpportunity2.jpg' },
    { text: 'Self-Motivated Undergrad Students', src: '/assets/onboardingOpportunity3.jpg' },
  ],
}

const expectedData = {
  title: 'WE EXPECTED YOU TO',
  sectionLeft: [
    {
      icon: '/assets/opportunityIcon1.svg',
      text: 'Introduce a Wide Range of People to Shanta Life Insurance',
    },
    {
      icon: '/assets/opportunityIcon2.svg',
      text: 'Educate Prospects About the Significance of Financial Planning',
    },
    {
      icon: '/assets/opportunityIcon3.svg',
      text: 'Onboarding New Policy holder, Agents,\nand Driving Exceptional Agent Experience',
    },
    {
      icon: '/assets/opportunityIcon4.svg',
      text: 'Staying Ahead of Market Trends and Regulations',
    },
    {
      icon: '/assets/opportunityIcon5.svg',
      text: 'Continuously Upskill With Our Help',
    },
  ],
  sectionRight: {
    avatar: '/assets/opportunityAvatar.jpg',
    name: 'Khondoker Khalil Ahamed',
    quote:
      'Every day, I learn something new, try to make a real impact on clients’ lives, and feel valued as a team member of Shanta Asset Management.',
  },
}


  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} />
      <OnboardingHighlight highlightSlides={highlightSlides[0]}/>
      <OnboardingRoles rolesData={rolesData} />
      <OnboardingOpportunity expectedData={expectedData} opportunityData={opportunityData}/>
      <OnboardingWay wayWeAreData={wayWeAreData}/>
      <OnboardingForm />
    </div>
  )
}

export default page
