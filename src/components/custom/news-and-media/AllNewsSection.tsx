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
      <div className="hidden md:block">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
     gap-5 md:gap-8 lg:gap-5 xl:gap-12 2xl:gap-20"
        >
          {newsData?.map((data, index) => <AllNewsCard key={index} data={data} />)}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden"></div>
    </div>
  )
}

export default AllNewsSection
