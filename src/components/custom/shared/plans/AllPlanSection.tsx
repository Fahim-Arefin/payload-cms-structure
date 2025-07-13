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
      <h1
        className="global-h2 uppercase font-semibold text-[#434343] 
      text-start
      mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]"
      >
        {children}
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
     gap-5 md:gap-8 lg:gap-5 xl:gap-12 2xl:gap-20"
      >
        {plantData?.map((data, index) => <AllPlanCard key={index} data={data} blur={blur} />)}
      </div>
    </div>
  )
}

export default AllPlanSection
