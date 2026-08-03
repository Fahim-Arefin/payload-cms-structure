import { CS_DeliveryBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CS_DeliveryBlockType
}

function CS_DeliveryGrid({ block }: Props) {
  return (
    <div
      className="grid grid-cols-1
        gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-6 2xl:gap-y-8"
    >
      {block?.deliveryInfo?.features.map((item, index) => (
        <div
          key={index}
          className="border-l-2 border-[#3E4949] 
          pl-1.5 xl:pl-3 2xl:pl-4
          pr-0.5 xl:pr-1 
          py-0.5 xl:py-1 
          flex 
          gap-1
          xl:gap-1.5
          2xl:gap-2
          ml-[10%] lg:ml-[22%] xl:ml-[20%] 2xl:ml-[25%]
          "
        >
          <h3 className="font-grift text-[#191C1D] global-p3 font-bold">{item?.title}</h3>
          <p className="font-grift text-[#191C1D] global-p3">{item?.subtitle}</p>
        </div>
      ))}
    </div>
  )
}

export default CS_DeliveryGrid
