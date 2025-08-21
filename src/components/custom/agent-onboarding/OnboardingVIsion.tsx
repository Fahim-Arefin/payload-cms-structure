'use client'

import { VisionCardType } from '@/types'
import Image from 'next/image'
import React from 'react'

type Props = {
  visionData: {
    bgImage: string
    bgMobileImage?: string
    data: VisionCardType[]
  }
}

function OnboardingVision({ visionData }: Props) {
  const { bgImage, bgMobileImage, data } = visionData
  return (
    <div className="container-padding text-white relative">
      {/* Desktop bg */}
      {/* <div
        aria-hidden
        className="z-10 absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          // no gradient here — keep it in one place (overlay) to avoid duplication
          background: `url('${bgImage}') #F6EDDD 50%/cover no-repeat`,
        }}
      /> */}

      <Image
        fill
        src={bgImage}
        alt="vision background image"
        className="object-cover object-center z-10"
        sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
      />

      {/* Overlay (one layer for both) */}
      <div
        aria-hidden
        className="z-20 absolute inset-0 pointer-events-none "
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.72) 100%)',
        }}
      />

      {/* Title */}
      <h1 className="relative z-30 global-h1 font-semibold uppercase mb-10 text-white">
        Join Our <span className="text-[#ED7125]">Vision</span>
      </h1>

      {/* Cards */}
      <div className="relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 ">
        {data.map((item: VisionCardType, index: number) => (
          <div
            key={index}
            className="rounded-xl  flex flex-col border-[1.667px] border-white bg-[#9C86394D]
            space-y-3 md:space-y-4 lg:space-y-8 xl:space-y-12 2xl:space-y-16
            px-5 md:px-8 lg:px-10 xl:px-14 2xl:px-[70px]
            py-5 md:py-8 lg:py-10 xl:py-14 2xl:py-[70px] 
            min-h-[150px] md:min-h-[250px] lg:min-h-[450px] xl:min-h-[550px] 2xl:min-h-[650px]"
            style={{
              backdropFilter: 'blur(16.6667px)',
              WebkitBackdropFilter: 'blur(16.6667px)',
            }}
          >
            <div className="relative w-[44px] h-[44px] lg:w-[100px] lg:h-[100px]">
              <Image fill src={item?.img} alt={`icon-${index}`} className="object-contain" />
            </div>

            <h2 className="global-p1 font-bold uppercase text-white">{item?.title}</h2>

            {/* Bullet List */}
            <div
              className="flex flex-col  mb-4 lg:mb-10 
            gap-2 md:gap-3 xl:gap-4 2xl:gap-5"
            >
              {item.points.map((point, i) => (
                <div key={i} className="relative pl-6 text-white/90 global-p1">
                  <span className="absolute left-0 top-0 font-medium">•</span>
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
