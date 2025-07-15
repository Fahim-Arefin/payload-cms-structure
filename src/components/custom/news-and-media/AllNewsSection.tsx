import { AllNewsDataType } from '@/types'
import React from 'react'
import AllNewsCard from './AllNewsCard'

type Props = {
  newsData: AllNewsDataType[]
  children: React.ReactNode
}

function AllNewsSection({ newsData, children }: Props) {
  return (
    <div className="container-padding">
      <h1
        className="global-h2 uppercase font-semibold text-[#434343] 
      text-center md:text-start
      mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]"
      >
        {children}
      </h1>
      <h2
        className="global-h3 font-bold text-[#434343] 
              text-center md:text-start
              mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]"
      >
        Coming Soon(Re-designing)
      </h2>
      {/* <div className="hidden md:block"> */}
      {/*   <div className="grid md:grid-cols-2 md:gap-[122px]"> */}
      {/*     {newsData?.map((data, index) => <AllNewsCard key={index} data={data} />)} */}
      {/*   </div> */}
      {/* </div> */}

      {/* Mobile View */}
      {/* <div className="md:hidden">Mobile view</div> */}
    </div>
  )
}

export default AllNewsSection
