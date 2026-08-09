import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { MaintainanceBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import MaintainanceSection from './components/MaintainanceSection'

type Props = {
  block: MaintainanceBlockType
  params: Record<string, string>
}

function MaintainanceBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
      className="rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px]"
    >
      <MaintainanceSection block={block} />
    </WithHashScroller>
  )
}

export default MaintainanceBlock
