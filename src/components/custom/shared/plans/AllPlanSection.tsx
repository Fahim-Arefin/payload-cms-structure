import { PlanCardBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllPlanCard from './AllPlanCard'

type Props = {
  plantData: PlanCardBlockType
  children: React.ReactNode
  blur?: boolean
}

function AllPlanSection({ plantData, children, blur }: Props) {
  return (
    <div
      className="container-padding"
      style={{
        backgroundColor: plantData?.backgroundColor || '',
      }}
    >
      <div
        className=" text-[#434343] 
      text-start
      mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]"
      >
        {children}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 
     gap-5 md:gap-8 lg:gap-4 xl:gap-4 2xl:gap-16"
      >
        {plantData?.cards?.map((data, index) => (
          <AllPlanCard key={index} data={data} blur={blur} />
        ))}
      </div>
    </div>
  )
}

export default AllPlanSection
