'use client'

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import FootPrintCard from '../about-us/FootPrintCard'
import OnboardingCard from './OnboardingCard'

type wayWeAreData = {
  image: string;  
  title: string;
  description: string;
}

type Props = {
  wayWeAreData: wayWeAreData[]
}

export function WayWeAreSlider({ wayWeAreData }: Props) {
  //   const [emblaRef, emblaApi] = useEmblaCarousel({
  //     align: 'center',
  //     loop: false,
  //     slidesToScroll: 1,
  //   })
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    containScroll: 'trimSnaps',
    // slidesToScroll: 1,
  })

  const [selectedIndex, setSelectedIndex] = useState(1)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setSelectedIndex(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const scrollToInitial = () => {
      emblaApi.scrollTo(1)
      emblaApi.on('select', onSelect)
      onSelect()
    }

    requestAnimationFrame(() => {
      setTimeout(scrollToInitial, 0)
    })
  }, [emblaApi, onSelect])

  //   🔁 Trigger re-check of layout after card size changes
  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit()
  }, [selectedIndex, emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden px-[10vw]" ref={emblaRef}>
        <div className="flex gap-x-6 transition-transform duration-500 ease-in-out will-change-transform">
          {wayWeAreData.map((data, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 transition-all duration-500 ease-in-out
                ${
                  index === selectedIndex
                    ? 'basis-[200px] md:basis-[350px] xl:basis-[600px] 2xl:basis-[800px]'
                    : 'basis-[120px] md:basis-[180px] xl:basis-[320px] 2xl:basis-[480px]'
                }
              `}
            >
              <OnboardingCard data={data} isActive={index === selectedIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {/* <div
        //   className="absolute top-0 flex justify-center gap-4 mt-6 bg-red-300">
        className="flex gap-4 absolute z-20
             inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-10 xl:-top-12 lg:right-24"
      >
        <button
          onClick={() => emblaApi?.scrollPrev()}
          //   className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 h-fit"
          className="w-6 xl:w-8
          h-6 xl:h-8
          rounded-full border border-gray-400 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
        >
          ←
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          //   className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 h-fit"
          className="
          px-6 xl:px-8
          h-6 xl:h-8
          rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
        >
          →
        </button>
      </div> */}
    </div>
  )
}
