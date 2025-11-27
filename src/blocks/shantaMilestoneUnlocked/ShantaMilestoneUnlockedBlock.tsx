import AwardSection from '@/components/custom/about-us/AwardSection'
import { ShantaMilestoneUnlockedBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: ShantaMilestoneUnlockedBlockType
  params: Record<string, string>
}

function ShantaMilestoneUnlockedBlock({ block }: Props) {
  return (
    <div>
      <AwardSection data={block} />
    </div>
  )
}

export default ShantaMilestoneUnlockedBlock
