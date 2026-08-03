import WithHashScroller2 from '@/components/custom/sagar-ropes-shared/others/WithHashScroller2'
import { BookACallBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import BookACallSection from './components/BookACallSection'

type Props = {
  block: BookACallBlockType
  params: Record<string, string>
}

function BookACallBlock({ block }: Props) {
  return (
    <WithHashScroller2
      id={block?.sectionSettings?.sectionId}
      topToMidBgColor={block?.sectionSettings?.topToMidBackgroundColor}
      midToBottomBgColor={block?.sectionSettings?.midToBottomBackgroundColor}
    >
      <BookACallSection block={block} />
    </WithHashScroller2>
  )
}

export default BookACallBlock
