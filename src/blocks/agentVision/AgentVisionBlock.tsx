import OnboardingVision from '@/components/custom/agent-onboarding/OnboardingVIsion'
import { AgentVisionBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AgentVisionBlockType
  params: Record<string, string>
}

function AgentVisionBlock({ block }: Props) {
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
  return <OnboardingVision visionData={block} />
}

export default AgentVisionBlock
