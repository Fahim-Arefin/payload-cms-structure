import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { ProductInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProductInfoSection from './ProductInfoSection'
import Angle from 'public/assets/images/angle.png'
import Image from 'next/image'

type Props = {
  block: ProductInfoBlockType
}

function ProductInfoGrid({ block }: Props) {
  return (
    <div
      className="container-padding grid grid-cols-1 md:grid-cols-3 
    gap-4 lg:gap-12 xl:gap-14 2xl:gap-16"
    >
      <div className="hidden md:block col-span-1">
        <SectionHeading01 data={block?.sectionHeading} align="left" dark />
      </div>
      <div className="md:hidden col-span-1">
        <SectionHeading01 data={block?.sectionHeading} align="middle" dark />
      </div>
      <div className="col-span-1 md:col-span-2">
        <ProductInfoSection data={block?.productInfo} />
      </div>
      {/* angle image */}
      <div
        className="hidden md:block absolute 
        md:bottom-6 lg:bottom-10 xl:bottom-16
        left-[82px] xl:left-32 2xl:left-44
        w-[120px] lg:w-[130px] xl:w-[150px] 2xl:w-[200px]
      aspect-square"
      >
        <Image
          fill
          src={Angle}
          alt="Angle Image"
          placeholder="blur"
          blurDataURL={Angle?.blurDataURL}
          quality={90}
          sizes="100vw"
        />
      </div>
    </div>
  )
}

export default ProductInfoGrid
