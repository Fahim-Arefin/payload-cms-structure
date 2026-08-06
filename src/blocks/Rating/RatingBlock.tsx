import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { RatingBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import RatingSection from './components/RatingSection'

type Props = {
  block: RatingBlockType
  params: Record<string, string>
}

function RatingBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <RatingSection block={block} />
    </WithHashScroller>
  )
}

export default RatingBlock
