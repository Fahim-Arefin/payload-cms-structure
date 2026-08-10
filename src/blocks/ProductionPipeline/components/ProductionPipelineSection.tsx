import SectionHeading02 from '@/components/custom/sagar-ropes-shared/others/SectionHeading02'
import { ProductionPipelineBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProductionPipelineGrid from './ProductionPipelineGrid'

type Props = { block: ProductionPipelineBlockType }

function ProductionPipelineSection({ block }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[80px]
      "
    >
      <SectionHeading02 data={block?.sectionHeading} align="middle" />
      <ProductionPipelineGrid block={block} />
    </div>
  )
}

export default ProductionPipelineSection
