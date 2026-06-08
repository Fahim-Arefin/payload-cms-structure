import { ProductHeroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProductHeroSection from './components/ProductHeroSection'

type Props = {
  block: ProductHeroBlockType
  params: Record<string, string>
}
function ProductHeroBlock({ block }: Props) {
  return <ProductHeroSection block={block} />
}

export default ProductHeroBlock
