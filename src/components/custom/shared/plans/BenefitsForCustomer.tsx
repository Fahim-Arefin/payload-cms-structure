import { BankingFacilitiesDataType } from '@/types'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: BankingFacilitiesDataType
}

function BenefitsForCustomer({ data }: Props) {
  return (
    <div
      className="bg-[#F6EDDD]   px-5 py-12 
           md:p-24 
           lg:px-[100px]  lg:py-[100px] 
           xl:px-[200px]  xl:py-[100px] 
           2xl:px-[300px] 2xl:py-[150px]"
    >
      {/* headers */}
      <div
        className="flex 
        space-x-1 lg:space-x-2 xl:space-x-3 2xl:space-x-4 
      mb-4 md:mb-6 lg:mb-8 xl:mb-12 2xl:mb-16"
      >
        <h1 className="global-h1 font-medium">{data?.title} </h1>
        <h1 className="global-h1 text-[#ED7125] font-medium">{data?.coloredTitle}</h1>
      </div>

      {/* content */}
      <div className={`grid grid-cols-1 lg:grid-cols-5 gap-7 md:gap-8 xl:gap-9 2xl:gap-10`}>
        {/* left content */}
        <div
          className={`order-2 lg:order-1 col-span-1 lg:col-span-3
                flex flex-col justify-center
              space-y-4 lg:space-y-4 xl:space-y-7
               `}
        >
          {/* items */}
          {data?.bancassuranceProducts?.map((eachItem, i) => (
            <div
              key={i}
              className=" flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
                    space-x-2 lg:space-x-2 xl:space-x-2.5 2xl:space-x-4
                    p-2 md:px-4 md:py-1.5 lg:px-2 lg:py-2 xl:p-2.5 2xl:p-4 
                    rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
            >
              <div
                className="relative min-w-[15px] md:min-w-[18px] lg:min-w-[20px] xl:min-w-[22px] 2xl:min-w-[26px] 
                                 h-[15px] md:h-[18px] lg:h-[20px] xl:h-[22px] 2xl:h-[26px] 
                                 "
              >
                <Image fill src={eachItem?.image} alt="icons" />
              </div>
              <div className="text-[12px] md:text-[14px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] text-[#434343] font-semibold ">
                {eachItem?.description}
              </div>
            </div>
          ))}
        </div>
        {/* right content */}
        <div
          className={`order-1 lg:order-2 col-span-1 lg:col-span-2
                  relative 
                  w-full lg:w-[93%] xl:w-full
                  aspect-video lg:aspect-auto h-auto
                  rounded-md lg:rounded-lg  xl:rounded-xl
                  overflow-hidden
                 `}
          role="img"
          aria-label="Background image"
        >
          {/* Image */}
          <Image
            fill
            src={data?.bancassuranceProductsImage}
            alt={data?.title}
            className="object-center object-cover rounded-md lg:rounded-lg  xl:rounded-xl "
            sizes="50vw"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 " />
        </div>
      </div>
    </div>
  )
}

export default BenefitsForCustomer
