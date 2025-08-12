import { LicensedInfoType } from '@/types'
import React from 'react'

type Props = {
  data: LicensedInfoType
}

function LiscensedInfo({
  data: {
    licensedImage,
    licensedMobileImage,
    licensedDate,
    launchedImage,
    launchedMobileImage,
    launchedDate,
  },
}: Props) {
  return (
    <div className="bg-[#ED7125]">
      <div
        className="flex justify-evenly md:justify-between items-center mx-auto text-white 
      font-light md:font-medium lg:font-bold
      h-[50px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]  
      w-[98%] md:w-[80%]"
      >
        <div className="flex items-center space-x-1 md:space-x-4">
          <div>
            {/* mobile */}
            <img src={licensedMobileImage} alt="" className="lg:hidden w-[24px] h-[24px]" />
            {/* desktop */}
            <img src={licensedImage} alt="" className="hidden lg:block w-[64px] h-[64px]" />
          </div>
          <div className="uppercase text-[9px] md:global-h4">
            <span className="">Licensed : </span> <span> {licensedDate}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-4">
          <div>
            {/* mobile */}
            <img src={launchedMobileImage} alt="" className="lg:hidden w-[24px] h-[24px]" />
            {/* desktop */}
            <img src={launchedImage} alt="" className="hidden lg:block w-[64px] h-[64px]" />
          </div>
          <div className="uppercase text-[9px] md:global-h4">
            <span className="">Launched : </span> <span> {launchedDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiscensedInfo
