import { AllAboutCardDataType } from '@/types'
import React from 'react'

type Props = {
  data: AllAboutCardDataType
  index: number
}

function AllAboutCard({ data, index }: Props) {
  return (
    <div
      className={`
    rounded-md lg:rounded-[15px] 
     shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]
    h-[180px] md:h-[220px] lg:h-[300px] xl:h-[400px] 2xl:h-[450px]
    w-full lg:w-[260px] xl:w-[380px] 2xl:w-[480px]
    flex justify-center items-center
    ${index % 2 === 0 ? ' bg-[rgba(252,242,236,0.8)]' : ' bg-[rgba(156,134,57,0.8)]'} 
    `}
    >
      <div>
        <div
          className="mx-auto
         w-[40px] md:w-[70px] xl:w-[100px] 
         h-[40px] md:h-[70px] xl:h-[100px]"
        >
          <img src={data?.image} alt={data?.title} className="w-full h-full" />
        </div>
        <div className="text-[20px] md:text-[24px] lg:text-[32px] xl:text-[45px] text-center">
          {data?.title}
        </div>
        <div
          className="text-[10px] md:text-xs xl:text-lg font-light mx-auto text-center
         max-w-[96%] md:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] "
        >
          {data?.description}
        </div>
      </div>
    </div>
  )
}

export default AllAboutCard
