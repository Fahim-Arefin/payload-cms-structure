import { PlanInfoDataType } from '@/types'
import React from 'react'

type Props = {
  bgColor?: string
  data: PlanInfoDataType
}

// border border-fuchsia-200
function PlanInfoSection({ bgColor, data }: Props) {
  return (
    <div style={{ backgroundColor: bgColor }} className="container-padding">
      <div className="grid grid-cols-1 items-center justify-items-center md:justify-items-start md:grid-cols-2 gap-4 md:gap-2">
        <div className="max-w-[135px] md:max-w-full max-h-[124px] md:max-h-[360px] w-fit">
          <img src={data?.image} alt="info image" className="h-full w-full" />
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
