import OnboardingOpportunity from '@/components/custom/agent-onboarding/OnboardingOpportunity'
import { AgentOnboardingOpportunityBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AgentOnboardingOpportunityBlockType
  params: Record<string, string>
}

function AgentOnboardingOpportunityBlock({ block }: Props) {
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

  return <OnboardingOpportunity data={block} />
}

export default AgentOnboardingOpportunityBlock
