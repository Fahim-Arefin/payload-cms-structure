import { WCUBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import TickIcon from 'public/assets/icons/tick.png'
type Props = { block: WCUBlockType }

function WhyChooseUsGrid({ block }: Props) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 
    gap-2 ml-8
    lg:gap-3 lg:ml-8
    xl:gap-5 xl:ml-20
    2xl:gap-6 2xl:ml-32"
    >
      {block?.choosingCriteria?.criteria?.map((item, i) => (
        <div key={i} className="flex items-center gap-2 lg:gap-3">
          <div
            className="relative 
          min-w-[15px] min-h-[15px]
          lg:min-w-[20px] lg:min-h-[20px]
          xl:min-w-[25px] xl:min-h-[25px]
          "
          >
            <Image
              src={TickIcon}
              alt=""
              fill
              className="object-contain object-center"
              placeholder="blur"
              blurDataURL={TickIcon.blurDataURL}
              quality={100}
            />
          </div>
          <div className="text-secondary-1 font-grift global-p3">{item?.text}</div>
        </div>
      ))}
    </div>
  )
}

export default WhyChooseUsGrid
