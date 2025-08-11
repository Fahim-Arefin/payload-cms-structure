import { PlanInfoDataType } from '@/types'
import React from 'react'

type Props = {
  bgColor?: string
  data: PlanInfoDataType
}

function PlanInfoSection({ bgColor, data }: Props) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="px-5 py-12 
           md:p-24 
           lg:px-[100px]  lg:py-[100px] 
           xl:px-[200px]  xl:py-[100px] 
           2xl:px-[300px] 2xl:py-[150px]"
    >
      <div className="grid grid-cols-1 items-center justify-items-center md:justify-items-start md:grid-cols-2 gap-10 md:gap-2 lg:gap-8 xl:gap-2">
        <div className=" w-full h-full flex justify-center md:justify-start items-center">
          {/* mobile */}
          <div className="lg:hidden w-[50%] md:w-full lg:w-[90%] xl:w-[85%] 2xl:w-[80%] ">
            <img src={data?.mobileImage} alt="info image" className="h-full w-full" />
          </div>
          {/* web */}
          <div className="hidden lg:block w-[50%] md:w-full lg:w-[90%] xl:w-[85%] 2xl:w-[80%] ">
            <img src={data?.image} alt="info image" className="h-full w-full" />
          </div>
        </div>
        <div className="flex justify-center items-center text-justify">
          <p
            className="global-p1 font-light
             leading-4 md:leading-5 lg:leading-8 xl:leading-10"
          >
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlanInfoSection
