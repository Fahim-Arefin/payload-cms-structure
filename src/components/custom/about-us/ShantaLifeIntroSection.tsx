import { ShantaIntroContentType } from '@/types'
import React from 'react'

type Props = {
  shantaIntroContent: ShantaIntroContentType
}

function ShantaLifeIntroSection({ shantaIntroContent }: Props) {
  return (
    <div className="bg-white container-padding">
      <div
        className="grid grid-cols-1 lg:grid-cols-2  
      space-y-6 lg:space-y-0"
      >
        <div className="grid grid-cols-2 relative lg:min-h-[60px] xl:min-h-[130px] ">
          {/* Background-like image */}

          {/* web */}
          <div
            className=" hidden lg:block absolute inset-x-0  lg:-bottom-6 xl:-bottom-10 2xl:-bottom-[70px]
          lg:w-[90%] xl:w-[78%] 2xl:w-[80%] 
          lg:h-[180px] xl:h-[193px] 2xl:h-[230px]"
          >
            <img
              src={shantaIntroContent?.image}
              alt={shantaIntroContent?.heading}
              // className="w-full object-cover object-center z-0 "
              className="w-full h-full object-contain z-0 "
            />
          </div>

          <div
            className="col-span-1 lg:col-span-2
           font-medium lg:font-semibold uppercase
           lg:flex lg:flex-col "
          >
            <h1 className="global-h3 md:global-h1 text-[#ED7125]">{shantaIntroContent?.heading}</h1>
            <h1 className="global-h3 md:global-h1 text-black">{shantaIntroContent?.subheading}</h1>
          </div>

          {/* mobile */}
          <div className="col-span-1 lg:hidden md:-mt-4 ">
            <img
              src={shantaIntroContent?.mobileImage}
              alt={shantaIntroContent?.heading}
              className="w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="space-y-2 md:space-y-5 2xl:space-y-8">
          <h5
            className=" text-[#4A4A4A] font-semibold uppercase
        global-h4
        text-center lg:text-left"
          >
            {shantaIntroContent?.paragraphTitle}
          </h5>
          <p
            className="
            text-center lg:text-justify 
            text-[#434343] font-light 
            lg:leading-[30px] xl:leading-[40px]
            global-p1
            h-full
            "
          >
            {shantaIntroContent?.paragraph}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShantaLifeIntroSection
