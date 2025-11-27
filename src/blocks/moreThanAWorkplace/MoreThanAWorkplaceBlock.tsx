import OnboardingWay from '@/components/custom/agent-onboarding/OnboardingWay'
import { MoreThanAWorkplaceBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: MoreThanAWorkplaceBlockType
  params: Record<string, string>
}

function MoreThanAWorkplaceBlock({ block }: Props) {
  return (
    <div
      className="container-padding-b"
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      <OnboardingWay wayWeAreData={block} />
    </div>
  )
}

export default MoreThanAWorkplaceBlock
