import { LicensedInfoType } from '@/types'
import Image from 'next/image'
import React from 'react'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: LicensedInfoType
}

function LiscensedInfo({
  data: {
    licensedImage,
    licensedMobileImage,
    licensedDate,
    licensedDateBN,
    launchedImage,
    launchedMobileImage,
    launchedDate,
    launchedDateBN,
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
          <div className="relative w-[24px] lg:w-[64px] h-[24px] lg:h-[64px] ">
            <Image src={licensedImage} alt="Licensed Image" className="" fill />
          </div>
          <div className="uppercase text-[9px] md:global-h4">
            <LocalizedText en={`Licensed : ${licensedDate}`} bn={`লাইসেন্স : ${licensedDateBN}`} />
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-4">
          <div className="relative w-[24px] h-[24px] lg:w-[64px] lg:h-[64px]">
            <Image src={launchedImage} alt="Launched Image" className="" fill />
          </div>
          <div className="uppercase text-[9px] md:global-h4">
            <LocalizedText
              en={`Launched : ${launchedDate}`}
              bn={`যাত্রা শুরু : ${launchedDateBN}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiscensedInfo
