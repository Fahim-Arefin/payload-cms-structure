import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProductionPipelineBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProductionPipelineSection from './components/ProductionPipelineSection'

type Props = {
  block: ProductionPipelineBlockType
  params: Record<string, string>
}

function ProductionPipelineBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <ProductionPipelineSection block={block} />
    </WithHashScroller>
  )
}

export default ProductionPipelineBlock
