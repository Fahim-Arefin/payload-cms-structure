import OnYourCueSection from '@/components/custom/home/OnYourCueSection'
import { FeaturedPlansBlock } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: FeaturedPlansBlock
  params: Record<string, string>
}

function FeaturedPlanBlock({ block }: Props) {
  return (
    <div style={{ backgroundColor: block?.backgroundColor || '' }}>
      <OnYourCueSection data={block} />
    </div>
  )
}

export default FeaturedPlanBlock
