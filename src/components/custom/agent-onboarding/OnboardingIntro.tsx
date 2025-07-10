import { ShantaIntroContentType } from '@/types'
import React from 'react'

type Props = {
  onboardingIntroContent: ShantaIntroContentType
}

function OnboardingIntro({ onboardingIntroContent }: Props) {
  return (
    <div
      className="bg-white px-5 pt-12 pb-20
           md:px-24 md:pt-24
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px]"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2  
      space-y-6 lg:space-y-0"
      >
        <div className="grid grid-cols-2 relative">
          {/* Background-like image */}
          <img
            src="/assets/leaderBanner.png"
            alt=""
            className=" hidden lg:block absolute inset-x-0 lg:-bottom-6 xl:-bottom-2 2xl:-bottom-20 lg:w-[92%] xl:w-[80%] 2xl:w-[60%] object-cover" // adjust offset as needed
          />

          <div
            className="col-span-1 lg:col-span-2
           lg:font-semibold uppercase
           lg:flex lg:flex-col"
          >
            <h1 className="global-h1 text-[#ED7125]">{onboardingIntroContent?.heading}</h1>
            <h1 className="global-h1 text-black">{onboardingIntroContent?.subheading}</h1>
          </div>
          <div className="col-span-1 pt-3 md:pt-0 lg:hidden">
            <img src="/assets/leaderBanner.png" alt="" className="h-full" />
          </div>
        </div>
        <div className="space-y-3 md:space-y-5 2xl:space-y-8 ">
          <h5
            className=" text-[#4A4A4A] font-semibold uppercase
        global-h4
        text-center lg:text-left"
          >
            {onboardingIntroContent?.paragraphTitle}
          </h5>
          <p
            className="
            text-center lg:text-justify 
            text-[#434343] font-light 
            lg:leading-[30px] xl:leading-[40px]
            global-p1
            line-clamp-4
            
            "
          >
            {onboardingIntroContent?.paragraph}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OnboardingIntro
