import { ShantaIntroContentType } from '@/types'
import React from 'react'

type Props = {
  shantaIntroContent: ShantaIntroContentType
}

function ShantaLifeIntroSection({ shantaIntroContent }: Props) {
  return (
    <div className="bg-white px-10 py-12 md:px-24 md:py-24 lg:p-[100px] 2xl:p-[200px] ">
      <div
        className="grid grid-cols-1 lg:grid-cols-2  
      space-y-6 lg:space-y-0 "
      >
        <div className="grid grid-cols-2 ">
          <div
            className="col-span-1 lg:col-span-2 font-medium
           lg:px-12 lg:flex lg:flex-col lg:justify-center"
          >
            <h1 className="shantaLifeIntroSection-h1 text-[#ED7125]">
              {shantaIntroContent?.heading}
            </h1>
            <h1 className="shantaLifeIntroSection-h1 text-black">
              {shantaIntroContent?.subheading}
            </h1>
          </div>
          <div className="col-span-1 pt-3 md:pt-0 lg:hidden">
            <img src="/assets/shantaIntroImage.png" alt="" className="h-full" />
          </div>
        </div>
        <div className="space-y-3 md:space-y-5 2xl:space-y-8 ">
          <h5
            className=" text-[#4A4A4A] font-semibold uppercase
        text-sm md:text-xl lg:text-[16px] xl:text-[22px]
        text-center lg:text-left"
          >
            {shantaIntroContent?.paragraphTitle}
          </h5>
          <p
            className="
            text-center lg:text-justify 
            text-[#434343] font-light 
            lg:leading-[30px] xl:leading-[40px]
            text-sm md:text-lg lg:text-[16px] xl:text-[26px] 
            h-full
             lg:bg-[url('/assets/shantaIntroImage.png')] 
             lg:bg-center
             lg:bg-cover 
             lg:bg-no-repeat"
          >
            {shantaIntroContent?.paragraph}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShantaLifeIntroSection
