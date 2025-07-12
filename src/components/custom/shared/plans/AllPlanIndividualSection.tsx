import { AllPlantDataType } from '@/types'
import React from 'react'
import AllPlanIndividualCard from './AllPlanIndividualCard'

type Props = {
  plantData: AllPlantDataType[]
  children: React.ReactNode
  blur?: boolean
}

function AllPlanIndividualSection({ plantData, children, blur }: Props) {
  return (
    <div className="container-padding">
      <h1
        className="global-h2 uppercase font-semibold text-[#434343] 
      text-center md:text-start
      mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]"
      >
        {children}
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
     gap-5 md:gap-8 lg:gap-5 xl:gap-12 2xl:gap-20"
      >
        {plantData?.map((data, index) => <AllPlanIndividualCard key={index} data={data} blur={blur} />)}
      </div>
    </div>
  )
}

export default AllPlanIndividualSection
