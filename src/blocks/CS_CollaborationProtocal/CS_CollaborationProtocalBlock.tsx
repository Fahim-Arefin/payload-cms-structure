import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CS_CollaborationProtocalBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CollaborationProtocalSection from './components/CollaborationProtocalSection'

type Props = {
  block: CS_CollaborationProtocalBlockType
  params: Record<string, string>
}

function CS_CollaborationProtocalBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CollaborationProtocalSection block={block} />
    </WithHashScroller>
  )
}

export default CS_CollaborationProtocalBlock
