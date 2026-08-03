import { CS_Collaborative_MobbingBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

import CS_LeftSideImage from './CS_LeftSideImage'
import CS_RightsideContent from './CS_RightsideContent'

type Props = { block: CS_Collaborative_MobbingBlockType }

function CS_CollaborativeMobbingGrid({ block }: Props) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 
    gap-10 md:gap-14 lg:gap-28 xl:gap-44 2xl:gap-56"
    >
      {/* left */}
      <CS_LeftSideImage block={block} />
      {/* right */}
      <CS_RightsideContent block={block} />
    </div>
  )
}

export default CS_CollaborativeMobbingGrid
