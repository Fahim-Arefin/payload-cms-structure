import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { CS_Collaborative_MobbingBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CS_CollaborativeMobbingGrid from './CS_CollaborativeMobbingGrid'

type Props = { block: CS_Collaborative_MobbingBlockType }

function CS_CollaborativeMobbingSection({ block }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[60px]
      "
    >
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      <CS_CollaborativeMobbingGrid block={block} />
    </div>
  )
}

export default CS_CollaborativeMobbingSection
