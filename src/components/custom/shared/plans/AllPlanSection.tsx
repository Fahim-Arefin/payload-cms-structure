import { AllPlantDataType } from '@/types'
import React from 'react'
import AllPlanCard from './AllPlanCard'

type Props = {
  plantData: AllPlantDataType[]
  children: React.ReactNode
  blur?: boolean
}

function AllPlanSection({ plantData, children, blur }: Props) {
  return (
    <div className="container-padding">
      <div
        className=" text-[#434343] 
      text-start
      mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]"
      >
        {children}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
     gap-5 md:gap-8 lg:gap-2 xl:gap-8 2xl:gap-16"
      >
        {plantData?.map((data, index) => (
          <AllPlanCard key={index} data={data} blur={blur} />
        ))}
      </div>
    </div>
  )
}

export default AllPlanSection
