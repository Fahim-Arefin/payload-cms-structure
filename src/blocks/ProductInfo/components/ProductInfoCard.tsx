import { pageHrefWithAnchor } from '@/lib/utils'
import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import React from 'react'
import ProductInfoTag from './ProductInfoTag'
import ProductInfoArrow from './ProductInfoArrow'
import Image from 'next/image'
import Ellipse from 'public/assets/images/EllipseRound.png'
import ProductInfoPlusIcon from './ProductInfoPlusIcon'

type Props = {
  data: NonNullable<ProductInfoBlockType['productInfo']>['products'][number]
}

function ProductInfoCard({ data }: Props) {
  const productHref = pageHrefWithAnchor(data?.buttonLink, data?.sectionId)
  const productLink = productHref !== '#' ? productHref : ''

  return (
    <div
      className="border-b-2 border-primary-1/30 hover:bg-primary-1/30 hover:rounded-[12px] transition-all duration-300
     grid grid-cols-12
    
    pl-[10px] lg:pl-[12px] xl:pl-[34px] 2xl:pl-[56px]
    py-[14px] lg:py-[18px] xl:py-[25px] 2xl:py-[32px]
    "
    >
      {/* left */}
      <div
        className="space-y-3 lg:space-y-[16px] xl:space-y-[20px] 2xl:space-y-[22px] 
       col-span-10 lg:col-span-10 2xl:col-span-9"
      >
        <div className="text-white-1 font-agency global-h7">
          {productLink ? <Link href={productLink}>{data?.title}</Link> : <div>{data?.title}</div>}
        </div>
        {/* <div
          className="flex flex-wrap 
         gap-1.5 lg:gap-2"
        >
          {data?.productTags &&
            data?.productTags?.length > 0 &&
            data?.productTags?.map((item, i) => <ProductInfoTag key={i} item={item} />)}
        </div> */}
        <div className="flex flex-wrap gap-1.5 lg:gap-2">
          {data?.productTags &&
            data?.productTags?.length > 0 &&
            data?.productTags?.map((item, i) => <ProductInfoTag key={i} item={item} />)}

          <ProductInfoPlusIcon data={data} />
        </div>
      </div>
      {/* right */}
      <div
        className="relative text-white-1 border-l-2 border-primary-1/30 
      col-span-2 lg:col-span-2 2xl:col-span-3"
      >
        <ProductInfoArrow productLink={productLink} />
        <div
          className="absolute z-0 inset-0 mx-auto my-auto
        w-full
        aspect-square
        rounded-full"
        >
          <Image
            fill
            src={Ellipse}
            alt="Ellipse Image"
            placeholder="blur"
            blurDataURL={Ellipse?.blurDataURL}
            quality={90}
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductInfoCard
