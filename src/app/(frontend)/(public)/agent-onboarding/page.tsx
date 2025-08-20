import AllAboutSection from '@/components/custom/about-us/AllAboutSection'
import AgentOnboardingHeroWrapper from '@/components/custom/agent-onboarding/AgentOnboardingHeroWrapper'
import OnboardingForm from '@/components/custom/agent-onboarding/OnboardingForm'
import OnboardingIntro from '@/components/custom/agent-onboarding/OnboardingIntro'
import OnboardingOpportunity from '@/components/custom/agent-onboarding/OnboardingOpportunity'
import OnboardingVision from '@/components/custom/agent-onboarding/OnboardingVIsion'
import OnboardingWay from '@/components/custom/agent-onboarding/OnboardingWay'
import RolesSection from '@/components/custom/agent-onboarding/RolesSection'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Turn your Ambition, Into Impact ',
      subtitle: '',
      description: 'Stay beyond the ordinary, step into a role that builds futures.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/agentHeroBanner.jpg`,
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
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/leaderBanner.png`,
    // mobileImage: '/assets/agent-onboarding/mobile/leaderBanner.png',
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
      image: '/assets/agent-onboarding/web/onboardingWay1.png',
      mobileImage: `/assets/agent-onboarding/mobile/onboardingWay1.png`,
      title: '',
      description: '',
    },
    {
      image: '/assets/agent-onboarding/web/onboardingWay4.jpg',
      mobileImage: `/assets/agent-onboarding/mobile/onboardingWay4.jpg`,
      title: '',
      description: '',
    },
    {
      image: '/assets/agent-onboarding/web/onboardingWay5.jpg',
      mobileImage: `/assets/agent-onboarding/mobile/onboardingWay5.jpg`,
      title: '',
      description: '',
    },
    {
      image: '/assets/agent-onboarding/web/onboardingWay6.jpg',
      mobileImage: `/assets/agent-onboarding/mobile/onboardingWay6.jpg`,
      title: '',
      description: '',
    },
    {
      image: '/assets/agent-onboarding/web/onboardingWay7.jpg',
      mobileImage: `/assets/agent-onboarding/mobile/onboardingWay7.jpg`,
      title: '',
      description: '',
    },
  ]

  const opportunityData = {
    title: 'What Sets a Shanta Life ',
    subTitle: 'RM/RO Champion Apart',
    items: [
      {
        text: 'Seasoned Professionals',
        src: '/assets/agent-onboarding/web/onboardingOpportunity1.jpg',
        mobileSrc: '/assets/agent-onboarding/mobile/onboardingOpportunity1.jpg',
      },
      {
        text: 'Fresh Graduates',
        src: '/assets/agent-onboarding/web/onboardingOpportunity2.jpg',
        mobileSrc: '/assets/agent-onboarding/mobile/onboardingOpportunity2.jpg',
      },
      {
        text: 'Self-Motivated Undergrad Students',
        src: '/assets/agent-onboarding/web/onboardingOpportunity3.jpg',
        mobileSrc: '/assets/agent-onboarding/mobile/onboardingOpportunity3.jpg',
      },
    ],
  }

  const expectedData = {
    // title: 'What Sets a Shanta Life RM/RO Champion Apart',
    title: 'What Sets a Shanta Life',
    subTitle: 'RM/RO Champion Apart',
    sectionLeft: [
      {
        icon: '/assets/icons/web/opportunityIcon1.svg',
        mobileIcon: '/assets/icons/mobile/opportunityIcon1.svg',
        text: 'Be a Brand Ambassador',
      },
      {
        icon: '/assets/icons/web/opportunityIcon2.svg',
        mobileIcon: '/assets/icons/mobile/opportunityIcon2.svg',
        text: 'Own your Numbers',
      },
      {
        icon: '/assets/icons/web/opportunityIcon3.svg',
        mobileIcon: '/assets/icons/mobile/opportunityIcon3.svg',
        text: 'Master the product,own the pitch',
      },
      {
        icon: '/assets/icons/web/opportunityIcon4.svg',
        mobileIcon: '/assets/icons/mobile/opportunityIcon4.svg',
        text: 'Be Digitally Savy',
      },
      {
        icon: '/assets/icons/web/opportunityIcon5.svg',
        mobileIcon: '/assets/icons/mobile/opportunityIcon5.svg',
        text: 'Follow up, follow through- build genuine connections',
      },
      {
        icon: '/assets/icons/web/opportunityIcon5.svg',
        mobileIcon: '/assets/icons/mobile/opportunityIcon5.svg',
        text: 'Learn, Evolve & Excel',
      },
    ],
    sectionRight: {
      avatar: '/assets/agent-onboarding/web/agent-onboarding-life_2.jpg',
      mobileAvatar: `/assets/agent-onboarding/mobile/agent-onboarding-life_2.jpg`,
      name: 'Tarafder Mohammad Fahim',
      quote:
        'Every day, I learn something new, try to make a real impact on clients’ lives, and feel valued as a team member of Shanta Life.',
    },
  }

  const onboardingRolesData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/agentOnboardingBanner.jpg`,
    // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/agentOnboardingBanner.jpg`,
    // title: 'Where Freedom Meets',
    // coloredTitle: 'Opportunity',
    title: 'Why this role ',
    coloredTitle: 'works for you',
    data: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/6.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/6.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/6.svg`,
        title: 'Earn Without Limits',
        description: {
          __html: 'Your income grows with your ambition — no limits, just possibilities.',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/2.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/2.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/2.svg`,
        title: 'Get Recognized, Get Rewarded',
        description: {
          __html: 'From incentives to applause, your achievements will never go unnoticed.',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/3.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/3.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/3.svg`,
        title: 'Freedom to Work On Your Time ',
        description: {
          __html: 'Set your schedule. Work your way.',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/4.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/4.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/4.svg`,
        title: 'Take Charge of your career',
        description: {
          __html: 'Own your future by proactively shaping your career path.',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/5.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/5.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/5.svg`,
        title: 'Help secure lives',
        description: {
          __html: 'Protect and safeguard the well-being of others with dedication.',
        },
      },
    ],
  }
  const visionData = {
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/visionBanner.jpg`,
    // bgMobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/mobile/visionBanner.jpg`,
    data: [
      {
        img: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/vision1.svg`,
        title: 'Experienced Professionals ',
        points: [
          '1-2 years of working in Sales',
          'Proven expertise in leading teams',
          'Excellent communication, networking, and analytical skills',
        ],
      },
      {
        img: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/vision2.svg`,
        title: 'Freshers & Undergrads',
        points: [
          'Excellent communications and networking skills',
          'Self motivated to build a future in sales',
          'Graduates and current students from any recognized university or college can apply',
        ],
      },
    ],
  }

  return (
    <div className="font-avenir">
      <AgentOnboardingHeroWrapper heroSlides={heroSlides} />
      {/* <OnboardingHighlight highlightSlides={highlightSlides[0]} /> */}
      <OnboardingIntro onboardingIntroContent={onBoardingIntroContent} />
      {/* <RolesSection onboardingRoleData={onboardingRolesData} /> */}

      {/* repalced roles section with the AllAboutSection section */}
      <div className="lg:margin-top">
        <AllAboutSection allAboutData={onboardingRolesData} />
      </div>

      {/* <FreedomOpportunity /> */}
      {/* <OnboardingRoles rolesData={rolesData} /> */}
      <OnboardingVision visionData={visionData} />
      <OnboardingOpportunity expectedData={expectedData} opportunityData={opportunityData} />
      <OnboardingWay wayWeAreData={wayWeAreData} />
      <OnboardingForm />
    </div>
  )
}

export default page
