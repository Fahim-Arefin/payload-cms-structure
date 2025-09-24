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
      titleBN: `আপনার ভিশনকে বদলে দিন বর্তমানে`,
      subtitle: '',
      description: 'Stay beyond the ordinary, step into a role that builds futures.',
      descriptionBN: 'ভবিষ্যৎ গড়ার ভূমিকায় এগিয়ে থাকুন নিজ স্বপ্নপূরণের পথে',
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
    headingBN: 'অনুপ্রেরণার',
    subheadingBN: 'নেতৃত্বে এগিয়ে',
    paragraphTitle: 'Own your time. Maximize your growth.',
    paragraphTitleBN: 'সময় আপনার, সম্ভাবনাও আপনার হাতে।',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/leaderBanner.png`,
    // mobileImage: '/assets/agent-onboarding/mobile/leaderBanner.png',
    paragraph: `Being a Relationship Officer is about people, progress, and purpose. This role gives you high-earning potential, unmatched flexibility, and the rare chance to secure futures.  Set your own pace, work from anywhere, and unlock exclusive access to world-class training, rewarding income, and powerful professional connections.`,
    paragraphBN: `রিলেশনশিপ অফিসার হওয়া মানে মানুষের অগ্রগতি ও তাদের জীবনের উদ্দেশ্য পূরণের জন্য কাজ করা। এই রোলে থাকছে সীমাহীন আয়ের সম্ভাবনা, কাজের পূর্ণ স্বাধীনতা,এবং ভবিষ্যৎ নিশ্চিত করার বিরল সুযোগ। কাজ করুন নিজস্ব গতিতে, যেকোনো জায়গায় , যেকোনো প্রান্তে আর সেইসাথে উন্মোচিত করুন বিশ্বমানের প্রশিক্ষণ, ফলপ্রসূ আয় ও শক্তিশালী পেশাগত নেটওয়ার্ক গড়ার নতুন দিগন্ত।`,
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

  const wayWeAreData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/wayBgBanner.png`,
    title: 'More than a Workplace A Movement',
    titleBN: 'কর্মস্থল থেকেও বেশি কিছু- একটি অগ্রযাত্রা',
    coloredTitle: 'A Movement',
    coloredTitleBN: 'একটি অগ্রযাত্রা',
    data: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingWay1.png`,
        // mobileImage: `/assets/agent-onboarding/mobile/onboardingWay1.png`,
        title: '',
        description: '',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingWay4.jpg`,
        // mobileImage: `/assets/agent-onboarding/mobile/onboardingWay4.jpg`,
        title: '',
        description: '',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingWay5.jpg`,
        // mobileImage: `/assets/agent-onboarding/mobile/onboardingWay5.jpg`,
        title: '',
        description: '',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingWay6.jpg`,
        // mobileImage: `/assets/agent-onboarding/mobile/onboardingWay6.jpg`,
        title: '',
        description: '',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingWay7.jpg`,
        // mobileImage: `/assets/agent-onboarding/mobile/onboardingWay7.jpg`,
        title: '',
        description: '',
      },
    ],
  }

  const opportunityData = {
    title: 'What Sets a Shanta Life ',
    subTitle: 'RM/RO Champion Apart',
    items: [
      {
        text: 'Seasoned Professionals',
        src: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingOpportunity1.jpg`,
        // mobileSrc: '/assets/agent-onboarding/mobile/onboardingOpportunity1.jpg',
      },
      {
        text: 'Fresh Graduates',
        src: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingOpportunity2.jpg`,
        // mobileSrc: '/assets/agent-onboarding/mobile/onboardingOpportunity2.jpg',
      },
      {
        text: 'Self-Motivated Undergrad Students',
        src: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/onboardingOpportunity3.jpg`,
        // mobileSrc: '/assets/agent-onboarding/mobile/onboardingOpportunity3.jpg',
      },
    ],
  }

  const expectedData = {
    // title: 'What Sets a Shanta Life RM/RO Champion Apart',
    title: 'What Sets a Shanta Life',
    titleBN: 'শান্তা লাইফের RM/RO চ্যাম্পিয়ন:',
    subTitle: 'RM/RO Champion Apart',
    subTitleBN: 'অন্যদের থেকে কেন এগিয়ে?',
    sectionLeft: [
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/opportunityIcon1.svg`,
        // mobileIcon: '/assets/icons/mobile/opportunityIcon1.svg',
        text: 'Be a Brand Ambassador',
        textBN: 'নিজেকে শান্তার ব্র্যান্ড অ্যাম্বাসেডর হিসেবে উপস্থাপন',
      },
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/opportunityIcon2.svg`,
        // mobileIcon: '/assets/icons/mobile/opportunityIcon2.svg',
        text: 'Own your Numbers',
        textBN: 'উপার্জন নিজের হাতে, ভবিষ্যত নিজের নিয়ন্ত্রণে',
      },
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/opportunityIcon3.svg`,
        // mobileIcon: '/assets/icons/mobile/opportunityIcon3.svg',
        text: 'Master the product,own the pitch',
        textBN: 'প্রোডাক্ট সম্পর্কে পরিপূর্ণ জ্ঞান, কাস্টমার ফ্রেন্ডলি উপস্থাপন',
      },
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/opportunityIcon4.svg`,
        // mobileIcon: '/assets/icons/mobile/opportunityIcon4.svg',
        text: 'Be Digitally Savy',
        textBN: 'প্রযুক্তিগত দক্ষতা',
      },
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/opportunityIcon5.svg`,
        // mobileIcon: '/assets/icons/mobile/opportunityIcon5.svg',
        text: 'Follow up, follow through- build genuine connections',
        textBN: 'নিয়মিত ফলোআপের মাধ্যমে  গ্রাহকের সাথে সুসম্পর্ক গড়ে তোলা ও বজায় রাখা',
      },
      {
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/opportunityIcon5.svg`,
        // mobileIcon: '/assets/icons/mobile/opportunityIcon5.svg',
        text: 'Learn, Evolve & Excel',
        textBN: 'শিখুন, বিকশিত হোন এবং এক্সেল করুন',
      },
    ],
    sectionRight: {
      avatar: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/agent-onboarding-life_2.jpg`,
      // mobileAvatar: `/assets/agent-onboarding/mobile/agent-onboarding-life_2.jpg`,
      name: 'Tarafder Mohammad Fahim',
      nameBN: 'তরফদার মোহাম্মদ ফাহিম',
      quote:
        'Every day, I learn something new, try to make a real impact on clients’ lives, and feel valued as a team member of Shanta Life.',
      quoteBN: `প্রতিদিনই শান্তা লাইফে আমি শিখছি কিভাবে গ্রাহকদের জীবন প্রকৃতভাবে অর্থবহ করে তোলা যায়, এবং শান্তা লাইফের 
        একজন গুরুত্বপূর্ণ টিম মেম্বার হিসেবে আমি গর্বিত বোধ করি।`,
    },
  }

  const onboardingRolesData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/agentOnboardingBanner.jpg`,
    // mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/agentOnboardingBanner.jpg`,
    // title: 'Where Freedom Meets',
    // coloredTitle: 'Opportunity',
    title: 'Why this role ',
    coloredTitle: 'works for you',
    titleBN: 'কেন এই রোল আপনার জন্য সঠিক পছন্দ?',
    coloredTitleBN: 'সঠিক পছন্দ?',
    data: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/6.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/6.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/6.svg`,
        title: 'Earn Without Limits',
        titleBN: 'নো লিমিট ইনকাম',
        description: {
          __html: 'Your income grows with your ambition — no limits, just possibilities.',
          __htmlBN: 'আপনার আয় আপনার হাতে - অফুরন্ত সম্ভবনার পথে এগিয়ে থাকুন।',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/2.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/2.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/2.svg`,
        title: 'Get Recognized, Get Rewarded',
        titleBN: 'স্বীকৃতি ও পুরস্কার',
        description: {
          __html: 'From incentives to applause, your achievements will never go unnoticed.',
          __htmlBN: 'ইনসেনটিভ হোক কিংবা প্রশংসা , আপনার কোন অর্জনই নজর এড়িয়ে যায় না।',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/3.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/3.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/3.svg`,
        title: 'Freedom to Work On Your Time ',
        titleBN: 'নিজের সুবিধামতো সময়ে কাজ করার স্বাধীনতা',
        description: {
          __html: 'Set your schedule. Work your way.',
          __htmlBN: 'নিজের সূচি নিজেই ঠিক করুন, নিজের মতো কাজ করুন।',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/4.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/4.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/4.svg`,
        title: 'Take Charge of your career',
        titleBN: 'নিজের ক্যারিয়ার, নিজের নিয়ন্ত্রণ',
        description: {
          __html: 'Own your future by proactively shaping your career path.',
          __htmlBN: 'নিজের ক্যারিয়ার গড়ার পথ নিজেই তৈরি করুন, ভবিষ্যৎ হোক আপনার নিয়ন্ত্রণে',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/5.svg`,
        // mobileImage: `/assets/agent-onboarding/mobile/5.svg`,
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/5.svg`,
        title: 'Help secure lives',
        titleBN: 'সুরক্ষার প্রতীক',
        description: {
          __html: 'Protect and safeguard the well-being of others with dedication.',
          __htmlBN: 'সমাজের সম্মিলিত কল্যাণে হয়ে উঠুন সুরক্ষার প্রতীক।',
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
        titleBN: 'অভিজ্ঞ প্রার্থীদের জন্য',
        points: [
          '1-2 years of working in Sales',
          'Proven expertise in leading teams',
          'Excellent communication, networking, and analytical skills',
        ],
        pointsBN: [
          '১-২ বছরের সেলসে কাজ করার অভিজ্ঞতা',
          'দল পরিচালনার দক্ষতা',
          'এক্সিলেন্ট কমিউনিকেশন, নেটওয়ার্কিং এবং ‍এনালাইটিকাল স্কীল',
        ],
      },
      {
        img: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/agent-onboarding/web/vision2.svg`,
        title: 'Freshers & Undergrads',
        titleBN: 'ফ্রেশার ও শিক্ষার্থীদের জন্য',
        points: [
          'Excellent communications and networking skills',
          'Self motivated to build a future in sales',
          'Graduates and current students from any recognized university or college can apply',
        ],
        pointsBN: [
          'এক্সিলেন্ট কমিউনিকেশন, নেটওয়ার্কিং স্কীল',
          'সেলসে ক্যারিয়ার গড়ার অদম্য আগ্রহ',
          'যেকোনো স্বীকৃত বিশ্ববিদ্যালয় বা কলেজ থেকে স্নাতক এবং বর্তমান শিক্ষার্থীরা আবেদন করতে পারবেন।',
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
