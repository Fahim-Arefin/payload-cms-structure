import OnboardingForm from '@/components/custom/agent-onboarding/OnboardingForm'
import OnboardingHighlight from '@/components/custom/agent-onboarding/OnboardingHighlight'
import OnboardingIntro from '@/components/custom/agent-onboarding/OnboardingIntro'
import OnboardingOpportunity from '@/components/custom/agent-onboarding/OnboardingOpportunity'
import OnboardingRoles from '@/components/custom/agent-onboarding/OnboardingRoles'
import OnboardingVision from '@/components/custom/agent-onboarding/OnboardingVIsion'
import OnboardingWay from '@/components/custom/agent-onboarding/OnboardingWay'
import RolesSection from '@/components/custom/agent-onboarding/RolesSection'
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
      description: 'Stay beyond the Ordinary, step into a role that builds futures.',
      image: '/assets/banner4.png',
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
    paragraph:
      'Being a Relationship Officer isn’t about desk jobs. It’s about people, progress, and purpose. This role gives you high-earning potential, unmatched flexibility, and the rare chance to secure futures. It’s where your hustle meets human impact. Set your own pace, work from anywhere, and unlock exclusive access to world-class training, rewarding income, and powerful professional connections.',
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
        text: 'Follow up, follow through- build genunie connections',
      },
      {
        icon: '/assets/opportunityIcon5.svg',
        text: 'Learn, Evolve & Excel',
      },
    ],
    sectionRight: {
      avatar: '/assets/opportunityAvatar.jpg',
      name: 'Khondoker Khalil Ahamed',
      quote:
        'Every day, I learn something new, try to make a real impact on clients’ lives, and feel valued as a team member of Shanta Asset Management.',
    },
  }

  const onboardingRolesData = [
    {
      image: '/assets/role1.svg',
      title: 'Unlimited Earning Potential',
      description:
        'Trust is our foundation. We earn trust not through words, but through consistent action and care.',
    },
    {
      image: '/assets/role2.svg',
      title: 'Rewards & Recognition',
    },
    {
      image: '/assets/role3.svg',
      title: 'Growing Career',
    },
    {
      image: '/assets/role4.svg',
      title: 'Help secure lives',
    },
    {
      image: '/assets/role4.svg',
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
        'Preferably completed undergrad from business or related field',
      ],
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
        >
          <ToolTip>
            <Button
              variant="primary"
              className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
            >
              Apply Now
            </Button>
          </ToolTip>
        </div>
      </HeroSection>
      {/* <OnboardingHighlight highlightSlides={highlightSlides[0]} /> */}
      <OnboardingIntro onboardingIntroContent={onBoardingIntroContent} />

      <RolesSection onboardingRoleData={onboardingRolesData} />
      {/* <OnboardingRoles rolesData={rolesData} /> */}
      <OnboardingVision data={visionData} />
      <OnboardingOpportunity expectedData={expectedData} opportunityData={opportunityData} />
      <OnboardingWay wayWeAreData={wayWeAreData} />
      <OnboardingForm />
    </div>
  )
}

export default page
