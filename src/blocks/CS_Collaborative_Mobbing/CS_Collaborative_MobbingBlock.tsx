import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CS_Collaborative_MobbingBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CS_CollaborativeMobbingSection from './components/CS_CollaborativeMobbingSection'

type Props = {
  block: CS_Collaborative_MobbingBlockType
  params: Record<string, string>
}

function CS_Collaborative_MobbingBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
      className="rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px]"
    >
      <CS_CollaborativeMobbingSection block={block} />
    </WithHashScroller>
  )
}

export default CS_Collaborative_MobbingBlock
