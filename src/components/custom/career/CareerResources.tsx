'use client'

import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ResourceCard from './ResourceCard'
import { CareerResourceDataType } from '@/types'
import CarouselNavButtons from '../shared/CarousalNavButtons'

type CareerResourceSectionProps = {
  data: CareerResourceDataType[]
}

export function CareerResourceSection({ data }: CareerResourceSectionProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

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
    <div className="relative w-full flex flex-col items-center container-padding bg-white overflow-hidden">
      {/* Absolute Human Resource Image - Top Right */}
      <img
        src="/assets/humanresource.png"
        alt="Human Resource"
        className="hidden lg:block absolute right-8 top-8 z-0 pointer-events-none select-none w-[400px] h-auto"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Mobile: Human resource image background */}
      <img
        src="/assets/humanresource.png"
        alt="Human Resource"
        width={350}
        height={220}
        className="block lg:hidden absolute right-1 top-32 w-[88vw] max-w-[370px] z-0 pointer-events-none select-none"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Section Title */}
      <div className="mb-7 sm:mb-10 relative z-10 w-full max-w-[1250px] px-3 md:px-6 2xl:px-0">
        <h3 className="text-[#343434] font-light text-[20px] md:text-[25px] xl:text-[30px] 2xl:text-[32px] tracking-tight">
          HEAR FROM
        </h3>
        <div className="flex items-center gap-2 mt-[-4px]">
          <span className="text-[#343434] font-bold text-[32px] md:text-[42px] xl:text-[50px] 2xl:text-[56px] tracking-tight leading-tight">
            OUR
          </span>
          <span className="text-[#ED7125] font-bold text-[32px] md:text-[42px] xl:text-[50px] 2xl:text-[56px] tracking-tight leading-tight ml-2">
            RESOURCES
          </span>
        </div>
      </div>

      {/* Desktop: 2 Cards, Mobile: Carousel 1 Card */}
      <div className="relative w-full flex justify-center">
        <div className="hidden lg:flex w-full gap-8 z-10">
          {data.map((item, idx) => (
            <ResourceCard key={idx} data={item} />
          ))}
        </div>
        {/* Shadcn Carousel for Mobile/Tablet */}
        <div className="block lg:hidden w-full z-10 mb-10">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {data.map((item, idx) => (
                <CarouselItem key={idx} className="px-2">
                  <ResourceCard data={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel navigation at bottom center */}
            <div
              className="flex md:hidden gap-2 absolute
                        inset-x-0 justify-center -bottom-16 "
            >
              <CarouselNavButtons
                onPrev={() => carouselApi?.scrollPrev()}
                onNext={() => carouselApi?.scrollNext()}
                hasPrev={canScrollPrev}
                hasNext={canScrollNext}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
