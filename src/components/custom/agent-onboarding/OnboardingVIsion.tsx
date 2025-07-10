'use client'

import { VisionCardType } from '@/types'
import React from 'react'

type Props = {
  data: VisionCardType[]
}

function OnboardingVision({ data }: Props) {
  return (
    <div
      className="container-padding text-white"
      style={{
        background: `
    linear-gradient(0deg, #00000085, #00000085),
    url('/assets/visionBanner.jpg') #00000085 50% / cover no-repeat,
    #F6EDDD
  `,
      }}
    >
      {/* Title */}
      <h1 className="global-h1 font-semibold uppercase mb-10 text-white">
        Join Our <span className="text-[#ED7125]">Vision</span>
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-40">
        {data.map((item: VisionCardType, index: number) => (
          <div
            key={index}
            className="rounded-xl px-4 py-6 lg:px-10 lg:py-12 flex flex-col gap-6 xl:gap-10
                       bg-[#43434333] backdrop-blur-[16.666666px] border border-white/10"
          >
            <div className="w-[44px] h-[44px] lg:w-[100px] lg:h-[100px]">
              <img src={item?.img} alt={`icon-${index}`} className="object-contain w-full h-full" />
            </div>

            <h2 className="global-p1 font-bold uppercase text-white">{item?.title}</h2>

            {/* Bullet List */}
            <div className="flex flex-col gap-3 mb-4 lg:mb-10">
              {item.points.map((point, i) => (
                <div key={i} className="relative pl-6 text-justify text-white/90 global-p1">
                  <span className="absolute left-0 top-0 font-bold">•</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnboardingVision
