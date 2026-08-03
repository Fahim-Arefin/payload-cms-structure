import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CS_DeliveryBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CS_DeliverySection from './components/CS_DeliverySection'

type Props = {
  block: CS_DeliveryBlockType
  params: Record<string, string>
}

function CS_DeliveryBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CS_DeliverySection block={block} />
    </WithHashScroller>
  )
}

export default CS_DeliveryBlock
