import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProductInfoSection from './ProductInfoSection'

type Props = {
  block: ProductInfoBlockType
}

function ProductInfoGrid({ block }: Props) {
  return (
    <div
      className="container-padding grid grid-cols-1 md:grid-cols-3 
    gap-4 lg:gap-12 xl:gap-14 2xl:gap-16"
    >
      <div className="col-span-1">
        <SectionHeading01 data={block?.sectionHeading} align="left" dark />
      </div>
      <div className="col-span-1 md:col-span-2">
        <ProductInfoSection data={block?.productInfo} />
      </div>
    </div>
  )
}

export default ProductInfoGrid
