import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CustomerReviewBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CustomerReviewSection from './components/CustomerReviewSection'

type Props = {
  block: CustomerReviewBlockType
  params: Record<string, string>
}

function CustomerReviewBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CustomerReviewSection block={block} />
    </WithHashScroller>
  )
}

export default CustomerReviewBlock
