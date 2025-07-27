import { AllAboutCardDataType } from '@/types'
import React from 'react'

type Props = {
  data: AllAboutCardDataType
  index: number
}

function AllAboutCard({ data, index }: Props) {
  return (
    // w-full lg:w-[260px] xl:w-[380px] 2xl:w-[480px]
    <div
      className={`group 
    rounded-md lg:rounded-[15px] cursor-pointer
     shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]
    h-[180px] md:h-[220px] lg:h-[300px] xl:h-[400px] 2xl:h-[450px]
    w-full
    flex justify-center items-center bg-[rgba(252,242,236,0.8)] text-[#434]
    hover:bg-[rgba(156,134,57,0.8)] hover:text-white 
    transition-all duration-300 ease-in-out 
    `}
    >
      <div className="space-y-1 md:space-y-2">
        <div
          className="mx-auto
    w-[50px] md:w-[70px] xl:w-[100px] 
    h-[50px] md:h-[70px] xl:h-[100px]
    relative group"
        >
          {/* Main image (shown by default, fades out on hover) */}
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full h-full absolute inset-0 object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 z-10"
          />
          {/* Hover image (hidden by default, fades in on hover) */}
          <img
            src={data?.hoverImage}
            alt="Trust"
            className="w-full h-full absolute inset-0 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20"
          />
        </div>
        <div className="global-h2 text-center font-semibold lg:font-medium uppercase px-1 ">
          {data?.title}
        </div>
        <div
          className="global-p2
          font-light mx-auto text-center
         max-w-[96%] md:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] "
          dangerouslySetInnerHTML={data?.description}
        >
          {/* {typeof data?.description == 'string' ? data?.description : null} */}
        </div>
      </div>
    </div>
  )
}

export default AllAboutCard
