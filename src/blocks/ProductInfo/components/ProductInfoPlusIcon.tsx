// import { pageHrefWithAnchor } from '@/lib/utils'
// import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
// import Link from 'next/link'
// import React from 'react'

// type ProductItem = NonNullable<ProductInfoBlockType['productInfo']>['products'][number]

// type Props = {
//   data: ProductItem
// }

// function ProductInfoPlusIcon({ data }: Props) {
//   const plusHref = pageHrefWithAnchor(data?.plusButtonLink, data?.plusSectionId)
//   const plusLink = plusHref !== '#' ? plusHref : ''

//   const className = `
//     text-primary-2 font-grift global-p3 border border-primary-2
//     inline-flex items-center justify-center
//     aspect-square
//     h-[28px] lg:h-[31px] xl:h-[36px] 2xl:h-[38px]
//     rounded-full
//     hover:bg-primary-1/30 transition-all duration-200 ease-in
//   `

//   if (plusLink) {
//     return (
//       <Link href={plusLink} aria-label="View more product tags" className={className}>
//         +
//       </Link>
//     )
//   }

//   return <div className={`${className} cursor-default opacity-50`}>+</div>
// }

// export default ProductInfoPlusIcon
import { pageHrefWithAnchor } from '@/lib/utils'
import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import PlusIcon from 'public/assets/icons/plusIcon.png'
import React from 'react'

type ProductItem = NonNullable<ProductInfoBlockType['productInfo']>['products'][number]

type Props = {
  data: ProductItem
}

function ProductInfoPlusIcon({ data }: Props) {
  const plusHref = pageHrefWithAnchor(data?.plusButtonLink, data?.plusSectionId)
  const plusLink = plusHref !== '#' ? plusHref : ''

  const className = `
    text-primary-2 border border-primary-2
    grid place-items-center
    aspect-square
    h-[28px] lg:h-[31px] xl:h-[36px] 2xl:h-[38px]
    rounded-full
    hover:bg-primary-1/30 transition-all duration-200 ease-in
  `

  const icon = (
    <Image
      src={PlusIcon}
      alt=""
      width={12}
      height={12}
      quality={90}
      placeholder="blur"
      blurDataURL={PlusIcon.blurDataURL}
      className="
        w-[8px]
        lg:w-[9px]
        xl:w-[10px]
        2xl:w-[11px]
        h-auto
      "
    />
  )

  if (plusLink) {
    return (
      <Link href={plusLink} aria-label="View more product tags" className={className}>
        {icon}
      </Link>
    )
  }

  return <div className={`${className} cursor-default opacity-50`}>{icon}</div>
}

export default ProductInfoPlusIcon
