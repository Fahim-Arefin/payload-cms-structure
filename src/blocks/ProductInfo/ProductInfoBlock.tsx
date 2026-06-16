import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProductInfoGrid from './components/ProductInfoGrid'

type Props = {
  block: ProductInfoBlockType
  params: Record<string, string>
}
function ProductInfoBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <ProductInfoGrid block={block} />
    </WithHashScroller>
  )
}

export default ProductInfoBlock
