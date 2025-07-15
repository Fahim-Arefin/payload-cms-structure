import { PlanInfoDataType } from '@/types'
import React from 'react'

type Props = {
  bgColor?: string
  data: PlanInfoDataType
}

function PlanInfoSection({ bgColor, data }: Props) {
  return (
    <div style={{ backgroundColor: bgColor }} className="container-padding">
      <div className="grid grid-cols-1 items-center justify-items-center md:justify-items-start md:grid-cols-2 gap-10 md:gap-2 lg:gap-8 xl:gap-2">
        <div className=" w-full h-full flex justify-center md:justify-start items-center">
          <div className="w-[50%] md:w-full lg:w-[90%] xl:w-[85%] 2xl:w-[80%] ">
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
