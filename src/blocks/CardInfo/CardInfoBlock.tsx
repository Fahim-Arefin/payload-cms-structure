import WithHashScroller from '@/components/custom/shared/WithHashScroller'
import { CardInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CardInfoSection from './components/CardInfoSection'

type Props = {
  block: CardInfoBlockType

  params: Record<string, string>
}

function CardInfoBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={null}
      className="bg-[#1E1E1E] "
    >
      <CardInfoSection block={block} />
    </WithHashScroller>
  )
}

export default CardInfoBlock
