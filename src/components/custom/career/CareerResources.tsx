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
        className="hidden lg:block absolute right-4 md:right-8 xl:right-60 top-8 z-0 pointer-events-none select-none md:w-[400px] md:h-[250px] xl:w-[584px] xl:h-[336px]"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Mobile: Human resource image background */}
      <img
        src="/assets/humanresource.png"
        alt="Human Resource"
        width={350}
        height={220}
        className="block lg:hidden absolute -right-5 top-8 w-[88vw] max-w-[370px] z-0 pointer-events-none select-none"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Section Title */}
      <div className="mb-7 sm:mb-10 relative z-10 w-full max-w-[1250px]">
        <h3 className="text-[#434342] font-light text-[16px] md:text-[20px] xl:text-[24px]">
          HEAR FROM
        </h3>
        <div className="flex items-center gap-2 mt-[-4px]">
          <span className="text-[#434342] font-semibold global-h1">OUR</span>
          <span className="text-[#ED7125] font-semibold global-h1">RESOURCES</span>
        </div>
      </div>

      {/* Desktop: 2 Cards, Mobile: Carousel 1 Card */}
      <div className="w-full flex justify-center pl-4 xl:pl-20">
        <div className="hidden lg:flex justify-evenly gap-16 xl:gap-20 2xl:gap-28 w-full z-10">
          {data.map((item, idx) => (
            <ResourceCard key={idx} data={item} />
          ))}
        </div>
        {/* Shadcn Carousel for Mobile/Tablet */}
        <div className="block lg:hidden w-full z-10 mb-10">
          <Carousel opts={{ loop: true }} setApi={setCarouselApi}>
            <CarouselContent>
              {data.map((item, idx) => (
                <CarouselItem key={idx} className="px-16 h-[265px]">
                  <ResourceCard data={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel navigation at bottom center */}
            <div
              className="flex lg:hidden gap-2 absolute
                        inset-x-0 justify-center -bottom-10"
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
