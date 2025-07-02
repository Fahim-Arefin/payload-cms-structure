import React from 'react'
import { FootPrintSlider } from './FootPrintSlider'
import { FootPrintDataType } from '@/types'

type Props = {
  footPrintData: FootPrintDataType[]
}

function FootPrintSection({ footPrintData }: Props) {
  return (
    <div className="relative">
      <div
        className="relative
        h-[230px] md:h-[330px] lg:h-[430px] xl:h-[530px] 2xl:h-[650px] 
        bg-[url('/assets/footprint.gif')] bg-cover bg-center bg-no-repeat overflow-hidden "
      >
        {/* Mobile to <lg overlay */}
        <div className="absolute inset-0 bg-[rgba(37,69,37,0.8)] lg:hidden z-0" />

        {/* lg and above overlay */}
        <div className="hidden lg:block absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <div className="container-padding uppercase text-white relative z-10">
          <div className="text-center lg:text-start">
            <h1 className="hidden lg:block global-h1 lg:font-semibold">Shanta&rsquo;s FOOTPRINT</h1>
            <h1 className="lg:hidden global-h1 lg:font-semibold">
              Shanta&rsquo;s Living <span className="text-[#ED7125]">Ecosystem</span>
            </h1>
            <h3 className="global-h1 md:global-h4 font-light">Where Every Venture Connects</h3>
          </div>
        </div>
      </div>
      {/* Slider */}
      {/* <div className="-mt-[270px] pb-[100px] z-20 bg-white"> */}
      <div
        className="-mt-[90px] md:-mt-[100px] lg:-mt-[170px] 2xl:-mt-[270px] 
      pb-24 lg:pb-[150px] 
      z-20 bg-white"
      >
        <FootPrintSlider footPrintData={footPrintData} />
      </div>
    </div>
  )
}

export default FootPrintSection
