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
        <div className="grid grid-cols-2 relative">
          {/* Background-like image */}
          <img
            src="/assets/shantaIntroImage.png"
            alt=""
            className=" hidden lg:block absolute inset-x-0 lg:-bottom-6 xl:-bottom-2 2xl:-bottom-4 lg:w-[92%] xl:w-[80%] 2xl:w-[78%] h-[112px] object-cover object-center z-0 " // adjust offset as needed
          />

          <div
            className="col-span-1 lg:col-span-2
           lg:font-semibold uppercase
           lg:flex lg:flex-col"
          >
            <h1 className="global-h1 text-[#ED7125]">{shantaIntroContent?.heading}</h1>
            <h1 className="global-h1 text-black">{shantaIntroContent?.subheading}</h1>
          </div>
          <div className="col-span-1 pt-3 md:pt-0 lg:hidden">
            <img src="/assets/shantaIntroImage.png" alt="" className="h-full" />
          </div>
        </div>
        <div className="space-y-3 md:space-y-5 2xl:space-y-8 ">
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
