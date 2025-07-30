import AgentOnboardingHeroWrapper from '@/components/custom/agent-onboarding/AgentOnboardingHeroWrapper'
import FreedomOpportunity from '@/components/custom/agent-onboarding/FreedomOpportunity'
import OnboardingForm from '@/components/custom/agent-onboarding/OnboardingForm'
import OnboardingHighlight from '@/components/custom/agent-onboarding/OnboardingHighlight'
import OnboardingIntro from '@/components/custom/agent-onboarding/OnboardingIntro'
import OnboardingOpportunity from '@/components/custom/agent-onboarding/OnboardingOpportunity'
import OnboardingRoles from '@/components/custom/agent-onboarding/OnboardingRoles'
import OnboardingVision from '@/components/custom/agent-onboarding/OnboardingVIsion'
import OnboardingWay from '@/components/custom/agent-onboarding/OnboardingWay'
import RolesSection from '@/components/custom/agent-onboarding/RolesSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Turn your Ambition, Into Impact ',
      subtitle: '',
      description: 'Stay beyond the ordinary, step into a role that builds futures.',
      image: '/assets/agentHeroBanner.jpg',
    },
  ]

  // const highlightSlides = [
  //   {
  //     mainDescription:
  //       'As a Relationship Officer at Shanta Life, you’ll be part of a dynamic industry with endless potential. Enjoy attractive earnings, continuous professional development, and the rewarding experience of helping individuals and families secure their financial futures. This isn’t just a role—it’s your gateway to a successful future.',
  //     images: [
  //       {
  //         src: '/assets/onboarding1.png',
  //         title: 'Attractive Earning Potential Based on Performance',
  //       },
  //       {
  //         src: '/assets/onboarding2.png',
  //         title: 'Learning from the top-tier Industry insider in BD',
  //       },
  //       {
  //         src: '/assets/onboarding3.png',
  //         title: 'Applicable for professionals, Freshers & Undergraduates',
  //       },
  //       {
  //         src: '/assets/onboarding4.png',
  //         title: 'Completely Flexible Work Hours',
  //       },
  //     ],
  //   },
  // ]

  const onBoardingIntroContent = {
    heading: 'Lead from',
    subheading: 'The front',
    paragraphTitle: 'Own your time. Maximize your growth.',
    image: '/assets/shantaIntroImage.png',
    paragraph: `Being a Relationship Officer is about people, progress, and purpose. This role gives you high-earning potential, unmatched flexibility, and the rare chance to secure futures.  Set your own pace, work from anywhere, and unlock exclusive access to world-class training, rewarding income, and powerful professional connections.`,
  }

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
      description: '',
    },
    {
      image: '/assets/onboardingWay2.png',
      title: '',
      description: '',
    },
    {
      image: '/assets/onboardingWay3.png',
      title: '',
      description: '',
    },
    {
      image: '/assets/onboardingWay1.png',
      title: '',
      description: '',
    },
    {
      image: '/assets/onboardingWay2.png',
      title: '',
      description: '',
    },
    {
      image: '/assets/onboardingWay3.png',
      title: '',
      description: '',
    },
  ]

  const opportunityData = {
    title: 'What Sets a Shanta Life RM/RO Champion Apart',
    items: [
      { text: 'Seasoned Professionals', src: '/assets/onboardingOpportunity1.jpg' },
      { text: 'Fresh Graduates', src: '/assets/onboardingOpportunity2.jpg' },
      { text: 'Self-Motivated Undergrad Students', src: '/assets/onboardingOpportunity3.jpg' },
    ],
  }

  const expectedData = {
    title: 'What Sets a Shanta Life RM/RO Champion Apart',
    sectionLeft: [
      {
        icon: '/assets/opportunityIcon1.svg',
        text: 'Be a Brand Ambassador',
      },
      {
        icon: '/assets/opportunityIcon2.svg',
        text: 'Own your Numbers',
      },
      {
        icon: '/assets/opportunityIcon3.svg',
        text: 'Master the product,own the pitch',
      },
      {
        icon: '/assets/opportunityIcon4.svg',
        text: 'Be Digitally Savy',
      },
      {
        icon: '/assets/opportunityIcon5.svg',
        text: 'Follow up, follow through- build genuine connections',
      },
      {
        icon: '/assets/opportunityIcon5.svg',
        text: 'Learn, Evolve & Excel',
      },
    ],
    sectionRight: {
      avatar: '/assets/agent-onboarding-life.jpg',
      name: 'Tarafder Mohammad Fahim',
      quote:
        'Every day, I learn something new, try to make a real impact on clients’ lives, and feel valued as a team member of Shanta Life.',
    },
  }

  const onboardingRolesData = [
    {
      image: '/assets/agent-onboarding/6.svg',
      title: 'Earn Without Limits',
      description:
        'Trust is our foundation. We earn trust not through words, but through consistent action and care.',
    },
    {
      image: '/assets/agent-onboarding/2.svg',
      title: 'Get Recognized, Get Rewarded',
    },
    {
      image: '/assets/agent-onboarding/3.svg',
      title: 'Freedom to Work On Your Time ',
    },
    // {
    //   image: '/assets/role4.svg',
    //   title: 'Learn, Earn, Grow',
    // },
    {
      image: '/assets/agent-onboarding/4.svg',
      title: 'Take Charge of your career',
    },
    {
      image: '/assets/agent-onboarding/5.svg',
      title: 'Help secure lives',
    },
  ]
  const visionData = [
    {
      img: '/assets/vision1.svg',
      title: 'Experienced Professionals ',
      points: [
        '1-2 years of working in Sales',
        'Proven expertise in leading teams',
        'Excellent communication, networking, and analytical skills',
      ],
    },
    {
      img: '/assets/vision2.svg',
      title: 'Freshers & Undergrads',
      points: [
        'Excellent communications and networking skills',
        'Self motivated to build a future in sales',
        'Graduates and current students from any recognized university or college can apply',
      ],
    },
  ]

  return (
    <div className="font-avenir">
      <AgentOnboardingHeroWrapper heroSlides={heroSlides} />
      {/* <OnboardingHighlight highlightSlides={highlightSlides[0]} /> */}
      <OnboardingIntro onboardingIntroContent={onBoardingIntroContent} />

      <RolesSection onboardingRoleData={onboardingRolesData} />
      {/* <FreedomOpportunity /> */}
      {/* <OnboardingRoles rolesData={rolesData} /> */}
      <OnboardingVision data={visionData} />
      <OnboardingOpportunity expectedData={expectedData} opportunityData={opportunityData} />
      <OnboardingWay wayWeAreData={wayWeAreData} />
      <OnboardingForm />
    </div>
  )
}

export default page
