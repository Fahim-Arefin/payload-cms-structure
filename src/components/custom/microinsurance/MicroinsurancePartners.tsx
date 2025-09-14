'use client'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import React, { FC, Fragment, useEffect, useState } from 'react'

type MicroinsurancePartnersProps = {
  data: any
}

const MicroinsurancePartners: FC<MicroinsurancePartnersProps> = ({
  data,
}: MicroinsurancePartnersProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!carouselApi) return
    if (hoveredIdx !== null) return // Pause autoplay when hovering

    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext()
      } else {
        carouselApi.scrollTo(0) // Loop back to first slide
      }
    }, sliderDelay)

    return () => clearInterval(interval)
  }, [carouselApi, hoveredIdx])

  useEffect(() => {
    if (!carouselApi) return

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollButtons()
    carouselApi.on('select', updateScrollButtons)

    return () => {
      carouselApi.off('select', updateScrollButtons)
    }
  }, [carouselApi])
  return (
    <div className="pb-12 lg:pb-20">
      <div
        className="px-5 pt-12 
               md:px-24 md:pt-24
               lg:px-[100px]  lg:pt-[100px] 
               xl:px-[200px]  xl:pt-[100px] 
               2xl:px-[300px] 2xl:pt-[150px] pb-4 flex flex-col space-y-3 md:space-y-6 mb-4 md:mb-10"
      >
        <div className="flex flex-row space-x-1 md:space-x-2">
          <h3 className="global-h2 uppercase font-semibold text-[#434343]">{data?.title} </h3>
          <h3 className="global-h2 uppercase font-semibold text-[#ED7125]">{data?.coloredTitle}</h3>
        </div>
        <div className="global-span font-[350] text-[#434343] text-justify">
          {data?.description}
        </div>
      </div>
      {/* SHADCN CAROUSEL */}
      <Carousel opts={{ align: 'start', dragFree: true }} setApi={setCarouselApi} className="w-full">
        <CarouselContent className="mb-4">
          {data?.items?.map((it: any, idx: number) => (
            <div key={`${it.title}-${idx}`}>
              {/* card */}
              <CarouselItem className="basis-[70%] sm:basis-[45%] md:basis-[30%] lg:basis-[23%] px-5">
                <div
                  className="h-[60px] md:h-[64px] rounded-2xl flex gap-4 md:gap-6 lg:gap-8 items-center justify-center"
                >
                  <span className="text-[#2E2E2E] bg-white border border-[#F0EAE1]
                                shadow-[3px_3px_10px_#0000001A] py-4 px-6 text-base md:text-lg font-medium">
                    {it.title}
                  </span>
                  <span
                    className="block w-[8px] h-[8px] rounded-full"
                    style={{ backgroundColor: it.dotColor }}
                  />
                </div>
              </CarouselItem>

            </div>
          ))}
        </CarouselContent>

        {/* hide arrows (keep markup for a11y) */}
        {/* <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" /> */}
      </Carousel>
    </div>
  )
}

export default MicroinsurancePartners
