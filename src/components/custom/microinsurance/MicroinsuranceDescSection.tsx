import React from 'react'
import Image from 'next/image'
import { MicroinsuranceDataType } from '@/types'

type Props = {
  data: MicroinsuranceDataType
}

const MicroinsuranceDescSection = ({ data }: Props) => {
  return (
    <div
      className="bg-[#F6EDDD]   px-5 py-12 
               md:p-24 
               lg:px-[100px]  lg:py-[100px] 
               xl:px-[200px]  xl:py-[100px] 
               2xl:px-[300px] 2xl:py-[150px]"
    >
      {/* headers */}

      {/* content */}
      <div className={`grid grid-cols-1 lg:grid-cols-5 gap-7 md:gap-8 xl:gap-9 2xl:gap-10`}>
        {/* right content */}
        <div
          className={`order-1 lg:order-1 col-span-1 lg:col-span-2
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
            src={data?.microinsuranceProductsImage}
            alt={data?.title}
            // placeholder="blur"
            // blurDataURL=""
            className="object-center object-cover rounded-md lg:rounded-lg xl:rounded-[10px]"
            sizes="50vw"
          />
        </div>
        {/* left content */}
        <div
          className={`order-2 lg:order-2 col-span-1 lg:col-span-3
                    flex flex-col justify-center
                  space-y-4 lg:space-y-4 xl:space-y-8
                   `}
        >
          {/* items */}
          <h2 className="global-h1 font-semibold text-[#1F2937] lg:w-1/2">What is Microinsurance?</h2>
          <p className="global-span text-[#434343] font-[350]">
            Specially designed for low-income individuals and families, offering protection against:
          </p>
          <div className="flex flex-col gap-4">
            {data?.microinsuranceProducts?.map((eachItem, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-4">
                <div
                  className="relative min-w-[15px] md:min-w-[18px] lg:min-w-[20px] xl:min-w-[22px] 2xl:min-w-[30px] 
                                 h-[15px] md:h-[18px] lg:h-[20px] xl:h-[22px] 2xl:h-[30px] "
                >
                  <Image src={eachItem?.image} fill alt={eachItem?.description} sizes="50vw" />
                </div>
                <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[24px] text-[#434343] font-semibold ">
                  {eachItem?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MicroinsuranceDescSection
