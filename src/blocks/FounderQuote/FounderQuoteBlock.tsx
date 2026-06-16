import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FounderQuoteSection from './components/FounderQuoteSection'

type Props = {
  block: FounderQuoteBlockType
  params: Record<string, string>
}

function FounderQuoteBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <FounderQuoteSection block={block} />
    </WithHashScroller>
  )
}

export default FounderQuoteBlock
