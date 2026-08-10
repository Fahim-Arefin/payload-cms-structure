import { CollaborativeMethodBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = { block: CollaborativeMethodBlockType }

function CM_RightSideImage({ block }: Props) {
  return (
    <div className="ml-3 md:mr-0 flex flex-col justify-center items-center">
      {/* mainImage */}
      <div
        className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
               w-full aspect-[500/360] "
      >
        {typeof block?.collaborativeMethodInfo?.image === 'object' &&
          block?.collaborativeMethodInfo?.image?.url && (
            <Image
              fill
              src={block?.collaborativeMethodInfo?.image?.url}
              alt={'Feature Icon'}
              className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
              quality={100}
              placeholder="blur"
              blurDataURL={block?.collaborativeMethodInfo?.imageBlurDataURL || ''}
            />
          )}
        <div
          className="absolute inset-0 bg-primary-2 z-0 rounded-sm lg:rounded-[6px] xl:rounded-[8px]
               w-full aspect-[500/360]
                -left-3 md:-left-4 lg:-left-6 xl:-left-10
                top-3 md:top-4 lg:top-6 xl:top-10"
        >
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default CM_RightSideImage
