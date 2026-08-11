import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CollaborativeMethodBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CollaborativeMethodSection from './components/CollaborativeMethodSection'

type Props = {
  block: CollaborativeMethodBlockType
  params: Record<string, string>
}

function CollaborativeMethodBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
      className="rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px]"
    >
      <CollaborativeMethodSection block={block} />
    </WithHashScroller>
  )
}

export default CollaborativeMethodBlock
