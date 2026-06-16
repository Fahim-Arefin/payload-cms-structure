// import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'

// type Props = {
//   item: NonNullable<ProductInfoBlockType['productInfo']['products'][number]['productTags']>[number]
// }

// function ProductInfoTag({ item }: Props) {
//   return (
//     <div
//       className="text-primary-2 font-grift global-p5 border border-primary-2
//            px-2 lg:px-3 xl:px-6
//           py-1.5 lg:py-2
//           rounded-[20px] xl:rounded-[99px]
//           h-fit hover:bg-primary-1/30 transition-all duration-200 ease-in
//           "
//     >
//       {item?.tag}
//     </div>
//   )
// }

// export default ProductInfoTag

import { pageHrefWithAnchor } from '@/lib/utils'
import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import React from 'react'

type ProductItem = NonNullable<ProductInfoBlockType['productInfo']>['products'][number]

type Props = {
  item: NonNullable<ProductItem['productTags']>[number]
}

function ProductInfoTag({ item }: Props) {
  const tagHref = pageHrefWithAnchor(item?.buttonLink, item?.sectionId)
  const tagLink = tagHref !== '#' ? tagHref : ''

  const className = `
    text-primary-2 font-grift global-p5 border border-primary-2 
    px-2 lg:px-3 xl:px-6 
    py-1.5 lg:py-2 
    rounded-[20px] xl:rounded-[99px]
    h-fit hover:bg-primary-1/30 transition-all duration-200 ease-in
  `

  if (tagLink) {
    return (
      <Link href={tagLink} className={className}>
        {item?.tag}
      </Link>
    )
  }

  return <div className={className}>{item?.tag}</div>
}

export default ProductInfoTag
