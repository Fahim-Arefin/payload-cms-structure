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
        <div key={i} className="mb-2 lg:mb-3 xl:mb-4 last:mb-0">
          <ProductInfoCard data={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductInfoSection
