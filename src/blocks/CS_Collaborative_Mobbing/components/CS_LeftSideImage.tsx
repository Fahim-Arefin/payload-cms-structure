import { CS_Collaborative_MobbingBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = { block: CS_Collaborative_MobbingBlockType }

function CS_LeftSideImage({ block }: Props) {
  return (
    <div className="mr-3 md:mr-0">
      {/* mainImage */}
      <div
        className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
             w-full aspect-[902/540] "
      >
        {typeof block?.otherInfo?.mainImage === 'object' && block?.otherInfo?.mainImage?.url && (
          <Image
            fill
            src={block?.otherInfo?.mainImage?.url}
            alt={'Feature Icon'}
            className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
            quality={100}
            placeholder="blur"
            blurDataURL={block?.otherInfo?.mainImageBlurDataURL || ''}
          />
        )}
        <div
          className="absolute inset-0 bg-primary-2 z-0 rounded-sm lg:rounded-[6px] xl:rounded-[8px]
             w-full aspect-[902/540]
              left-3 md:left-4 lg:left-6 xl:left-10
              top-3 md:top-4 lg:top-6 xl:top-10"
        >
          <div>below primary background</div>
        </div>
      </div>
    </div>
  )
}

export default CS_LeftSideImage
