import { BankingFacilitiesDataType } from '@/types'
import React from 'react'

type Props = {
  data: BankingFacilitiesDataType
}

function PartnersCard({ data }: Props) {
  return (
    <div className="z-30">
      <div
        className="relative cursor-pointer 
        h-[140px] md:h-[150px] lg:h-[200px] xl:h-[240px] 2xl:h-[270px] 
        rounded-[8px] md:rounded-[10px] lg:rounded-[14px] xl:rounded-[20px]
        flex flex-col 
        space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-8
        group transition-all duration-300 ease-linear "
      >
        <div
          className="transition-transform duration-500 group-hover:scale-105
         w-full
         h-[140px] lg:h-[150px] xl:h-[180px]"
        >
          <img src={data?.image} alt={data?.description} className="h-full w-full object-contain" />
        </div>

        <p className="text-[#434343] global-p2 font-light transition-colors duration-500 uppercase text-center">
          {data?.description}
        </p>
      </div>
    </div>
  )
}

export default PartnersCard
