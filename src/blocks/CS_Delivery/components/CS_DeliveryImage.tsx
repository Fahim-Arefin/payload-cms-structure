import { CS_DeliveryBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  block: CS_DeliveryBlockType
}

function CS_DeliveryImage({ block }: Props) {
  return (
    <div
      className="grid grid-cols-2 
    gap-4 md:gap-6 lg:gap-10 xl:gap-12 2xl:gap-16"
    >
      <div
        className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
                 w-full aspect-[571/386] "
      >
        {typeof block?.deliveryInfo?.imageOneWrapper?.imageOne === 'object' &&
          block?.deliveryInfo?.imageOneWrapper?.imageOne?.url && (
            <Image
              fill
              src={block?.deliveryInfo?.imageOneWrapper?.imageOne?.url}
              alt={'Feature Icon'}
              className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
              quality={100}
              placeholder="blur"
              blurDataURL={block?.deliveryInfo?.imageOneWrapper?.imageOneBlurDataURL || ''}
            />
          )}
      </div>
      <div
        className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
                 w-full aspect-[571/386] "
      >
        {typeof block?.deliveryInfo?.imageTwoWrapper?.imageTwo === 'object' &&
          block?.deliveryInfo?.imageTwoWrapper?.imageTwo?.url && (
            <Image
              fill
              src={block?.deliveryInfo?.imageTwoWrapper?.imageTwo?.url}
              alt={'Feature Icon'}
              className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
              quality={100}
              placeholder="blur"
              blurDataURL={block?.deliveryInfo?.imageTwoWrapper?.imageTwoBlurDataURL || ''}
            />
          )}
      </div>
    </div>
  )
}

export default CS_DeliveryImage
