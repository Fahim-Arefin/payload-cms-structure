import { InsuranceCardDataType } from '@/types'
import React from 'react'

type Props = {
  data: InsuranceCardDataType
}

function CareerStoryCard({ data }: Props) {
  return (
    <>
      {/* Mobile background */}
      <div
        className="relative md:hidden flex-shrink-0 rounded-[4.167px]
      bg-no-repeat bg-cover bg-center
      bg-[#343A40] overflow-hidden md:h-[200px] lg:h-[250px] xl:h-[300px]"
        style={{
          backgroundImage: `url(${data?.mobileImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#343A40]/50 rounded-[4.167px] z-10"></div>
        {/* Text Content */}
        <div className="relative z-20 p-2 h-full flex items-end">
          <div className="h-20 space-y-4">
            <h4 className="text-white text-[15px] font-bold line-clamp-1">{data.title}</h4>
            <p className="text-[#E5E5E5] text-[10px] line-clamp-2">{data.description}</p>
          </div>
        </div>
        <div className="absolute w-[24px] h-[24px] -bottom-1 -right-1 z-20">
          <img src="/assets/icons/web/circle.svg" alt="" />
        </div>
      </div>

      {/* Desktop/Tablet background */}
      <div
        className="relative hidden md:flex-shrink-0 md:block rounded-[4.167px]
      bg-no-repeat bg-cover bg-center
      bg-[#343A40] overflow-hidden md:h-[200px] lg:h-[250px] xl:h-[300px]"
        style={{
          backgroundImage: `url(${data?.image})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#343A40]/50 rounded-[4.167px] z-10"></div>
        {/* Text Content */}
        <div className="relative z-20 md:p-0 h-full flex items-end md:px-4 xl:px-6 md:pb-10 xl:pb-16">
          <div className="md:h-fit space-y-2 lg:space-y-3 xl:space-y-4">
            <h4 className="text-white text-[15px] font-bold md:line-clamp-none">{data.title}</h4>
            <p className="text-[#E5E5E5] text-[10px] lg:text-[12px] md:line-clamp-none">
              {data.description}
            </p>
          </div>
        </div>
        <div className="absolute w-[24px] h-[24px] md:h-fit md:w-fit -bottom-1 -right-1 z-20">
          <img src="/assets/icons/web/circle.svg" alt="" />
        </div>
      </div>
    </>
  )
}

export default CareerStoryCard
