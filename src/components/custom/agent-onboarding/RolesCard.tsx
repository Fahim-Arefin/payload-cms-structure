import { OnboardingRoleType } from '@/types'
import React from 'react'

type Props = {
  data: OnboardingRoleType
  index: number
}

function RolesCard({ data, index }: Props) {
  //
  return (
    <div
      className={`
    rounded-md lg:rounded-[4px] cursor-pointer
     shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]
     bg-[#FCF4EB]
     hover:bg-[rgba(156,134,57,0.8)]
     hover:text-white
    h-[136px] md:h-[180px]  lg:h-[250px] xl:h-[280px] 2xl:h-[310px]
     w-[108px] md:w-[150px] lg:w-[220px] xl:w-[250px] 2xl:w-[280px]
    flex justify-center items-center
    `}
      //  ${index % 2 === 0 ? ' bg-[rgba(252,242,236,0.8)] text-[#434]' : ' bg-[rgba(156,134,57,0.8)] text-white'}
    >
      <div className="space-y-1 ">
        <div
          className="mx-auto
         w-[40px] md:w-[70px] xl:w-[100px] 
         h-[40px] md:h-[70px] xl:h-[100px]"
        >
          <img src={data?.image} alt={data?.title} className="w-full h-full" />
        </div>
        <div
          className="global-p2
          font-light mx-auto text-center
         max-w-[96%] md:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%]"
        >
          {data?.title}
        </div>
      </div>
    </div>
  )
}

export default RolesCard
