import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProductInfoCard from './ProductInfoCard'

type Props = {
  data: ProductInfoBlockType['productInfo']
}

function ProductInfoSection({ data }: Props) {
  return (
    <div>
      {data?.products?.map((product, i) => (
        <div key={i}>
          <ProductInfoCard data={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductInfoSection
