import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { FAQBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FAQSection from './components/FAQSection'

type Props = {
  block: FAQBlockType
  params: Record<string, string>
}

function FAQBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <FAQSection block={block} />
    </WithHashScroller>
  )
}

export default FAQBlock
