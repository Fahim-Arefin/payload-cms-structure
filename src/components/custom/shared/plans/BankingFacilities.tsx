import { BankingFacilitiesDataType } from '@/types'
import Image from 'next/image'
import React from 'react'
import LocalizedText from '../LocalizedText'

type Props = {
  data: BankingFacilitiesDataType
}

function BankingFacilities({ data }: Props) {
  return (
    <div
      className="bg-[#F6EDDD]
           px-5 py-12 
           md:p-24 
           lg:px-[100px]  lg:py-[100px] 
           xl:px-[200px]  xl:py-[100px] 
           2xl:px-[300px] 2xl:py-[150px]
           space-y-4 md:space-y-10 lg:space-y-12"
    >
      {/* headers */}
      <div>
        <h1 className="global-h1 font-medium">
          <LocalizedText en={data?.title} bn={data?.titleBN}/>
        </h1>
        <h1 className="global-h1 text-[#ED7125] font-medium">
          <LocalizedText en={data?.coloredTitle} bn={data?.coloredTitleBN}/>
        </h1>
      </div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 
      gap-4 md:gap-10 lg:gap-16 xl:gap-20 2xl:gap-28"
      >
        {/* left side */}
        <div className="relative aspect-video lg:aspect-square rounded-md lg:rounded-lg xl:rounded-xl">
          <Image
            src={data?.bancassuranceProductsImage}
            alt="Bancassurance ProductsImage"
            fill
            className="rounded-md lg:rounded-lg xl:rounded-xl object-center object-cover"
            sizes="(max-width:1023px) 400px,700px"
          />
        </div>
        {/* right side */}
        <div className="flex flex-col justify-between space-y-2 md:space-y-4 lg:space-y-0">
          {data?.bancassuranceProducts?.map((item, i) => (
            <div className="flex items-center space-x-8 " key={i}>
              <div
                className="
              w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]
              h-[40px] md:h-[50px] lg:h-[60px] xl:h-[70px] 2xl:h-[80px] "
              >
                <img src={item?.image} alt={item?.description} className="w-full h-full" />
              </div>
              <div className="global-p1 font-semibold text-[#3A3A3A]">
                <LocalizedText en={item?.description} bn={item?.descriptionBN}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BankingFacilities
