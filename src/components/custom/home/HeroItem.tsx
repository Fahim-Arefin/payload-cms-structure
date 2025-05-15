import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/button'
import { BsPlay } from 'react-icons/bs'

type Props = {
  slide: {
    image: string
    title: string
    subtitle: string
    description: string
  }
}

const HeroItem = ({ slide }: Props) => {
  return (
    <>
      {/* Background image */}
      <Image src={slide.image} alt={slide.title} fill className="object-cover" priority />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 z-10" />

      {/* Content */}
      <div className="absolute lg:w-[673px] 2xl:w-[973px] top-[130px] md:top-[140px] lg:top-[37%] inset-x-0 lg:left-[100px] 2xl:left-[148px] lg:right-auto space-y-4 md:space-y-6 lg:space-y-8 2xl:space-y-12 z-20">
        {/* Title */}
        <div className="text-center lg:text-left text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl tracking-[3%] lg:tracking-[0%] lg:font-bold text-white">
          <h1>{slide.title}</h1>
          <h1 className="lg:mt-2">{slide.subtitle}</h1>
        </div>

        {/* Subtitle */}
        <div className="bg-gradient-to-r from-[rgba(2,2,2,0.5)] to-[rgba(2,2,2,0.5)] lg:to-[rgba(115,115,115,0)] border-l-[2px] lg:border-l-[4px] 2xl:border-l-[6px] border-[#9C8639] w-[70%] md:w-[60%] lg:w-[80%] 2xl:w-[933px] mx-auto lg:mx-0 text-[10px] md:text-[16px] lg:text-[20px] 2xl:text-[35px] p-2 md:p-3 lg:p-4 2xl:p-5 2xl:font-semibold">
          <div className="text-white">
            {slide.description.split('. ').map((line, i) => (
              <h5 key={i}>{line.trim()}</h5>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="flex space-x-4 md:space-x-6 items-center justify-center lg:justify-start">
          <Button
            variant="primary"
            className="px-4 md:px-6 py-1 md:py-2 2xl:px-10 2xl:py-6 rounded-[4px] lg:rounded-[8px] w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-xl"
          >
            Explore Now
          </Button>
          <div className="flex space-x-2 2xl:space-x-4 text-white items-center">
            <div className="border-2 border-white rounded-full p-1 2xl:p-2">
              <BsPlay />
            </div>
            <div className="text-white text-sm lg:text-xl">From the Expert</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroItem
