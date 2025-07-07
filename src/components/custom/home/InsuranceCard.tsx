import { InsuranceCardDataType } from '@/types'
import React from 'react'

type Props = {
  data: InsuranceCardDataType
}

function InsuranceCard({ data }: Props) {
  return (
    <div
      className="relative md:h-[200px] lg:h-[250px] xl:h-[300px] flex-shrink-0 
      rounded-[4.167px] 
      bg-no-repeat bg-cover bg-center 
      bg-[#343A40] overflow-hidden"
      style={{
        backgroundImage: `url(${data.image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#343A40]/50 rounded-[4.167px] z-10"></div>

      {/* Text Content */}
      <div
        className="relative z-20 h-full flex items-end 
      md:px-4 xl:px-6 
      md:pb-10 xl:pb-16"
      >
        <div className="h-fit md:space-y-2 lg:space-y-3 xl:space-y-4">
          <h4 className="text-white text-[12px] lg:text-[15px] font-bold">{data.title}</h4>
          <p className="text-[#E5E5E5] text-[10px] lg:text-[12px]">{data.description}</p>
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 z-20">
        <img src="/assets/circle.svg" alt="" />
      </div>
    </div>
  )
}

export default InsuranceCard
