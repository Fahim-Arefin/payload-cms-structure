import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { CS_CollaborationProtocalBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CollaborationProtocalGrid from './CollaborationProtocalGrid'
import CollaborationProtocalImage from './CollaborationProtocalImage'

type Props = { block: CS_CollaborationProtocalBlockType }

function CollaborationProtocalSection({ block }: Props) {
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
      <CollaborationProtocalGrid block={block} />
      <CollaborationProtocalImage block={block} />
    </div>
  )
}

export default CollaborationProtocalSection
