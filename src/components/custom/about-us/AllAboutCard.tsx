import { AllAboutCardDataType } from '@/types'
import React from 'react'

type Props = {
  data: AllAboutCardDataType
  index: number
}

function AllAboutCard({ data, index }: Props) {
  return (
    <div
      className={`group
    rounded-md lg:rounded-[15px] cursor-pointer
     shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]
    h-[180px] md:h-[220px] lg:h-[300px] xl:h-[400px] 2xl:h-[450px]
    w-full lg:w-[260px] xl:w-[380px] 2xl:w-[480px]
    flex justify-center items-center bg-[rgba(252,242,236,0.8)] text-[#434]
    hover:bg-[rgba(156,134,57,0.8)] hover:text-white 
    transition-all duration-300 ease-in-out 
    `}
    >
      <div
        className="space-y-1 md:space-y-2 xl:space-y-3 
      2xl:w-[70%] mx-auto"
      >
        <div
          className="transform translate-x-28 group-hover:translate-x-0
          transition-all duration-300 ease-in-out 
         w-[40px] md:w-[70px] xl:w-[100px] 
         h-[40px] md:h-[70px] xl:h-[100px]"
        >
          <img src={data?.image} alt={data?.title} className="w-full h-full" />
        </div>
        {/* <div
          className="global-h2 text-center group-hover:text-start
        font-semibold lg:font-medium uppercase
      "
        >
          {data?.title}
        </div> */}
        <div
          className={`
    global-h2 text-center group-hover:text-start
    font-semibold lg:font-medium uppercase
    transition-all duration-300 ease-in-out
  `}
        >
          {data?.title}
        </div>

        <div
          className="global-p2
          font-light mx-auto"
        >
          {data?.description?.split(' ').slice(0, 14).join(' ') + '...'}
        </div>
      </div>
    </div>
  )
}

export default AllAboutCard
