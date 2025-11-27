import WCTMSection from '@/components/custom/shared/plans/WCTMSection'
import { AddonInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AddonInfoBlockType
  params: Record<string, string>
}

function AddonsInfoBlock({ block }: Props) {
  return (
    <div>
      <WCTMSection data={block} />
    </div>
  )
}

export default AddonsInfoBlock
