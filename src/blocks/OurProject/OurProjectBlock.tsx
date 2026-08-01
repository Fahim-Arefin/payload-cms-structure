import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { OurProjectBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import OurProjectSection from './components/OurProjectSection'

type Props = {
  block: OurProjectBlockType
  params: Record<string, string>
}

function OurProjectBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <OurProjectSection block={block} />
    </WithHashScroller>
  )
}

export default OurProjectBlock
