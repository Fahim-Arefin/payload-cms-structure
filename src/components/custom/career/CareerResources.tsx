'use client'

import React, { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import ResourceCard from './ResourceCard'
import { CareerResourceDataType } from '@/types'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import Autoplay from 'embla-carousel-autoplay'

type CareerResourceSectionProps = {
  data: CareerResourceDataType[]
}

export function CareerResourceSection({ data }: CareerResourceSectionProps) {
  const [desktopCarouselApi, setDesktopCarouselApi] = useState<CarouselApi | null>(null)
  const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrevDesktop, setCanScrollPrevDesktop] = useState(false)
  const [canScrollNextDesktop, setCanScrollNextDesktop] = useState(false)
  const [canScrollPrevMobile, setCanScrollPrevMobile] = useState(false)
  const [canScrollNextMobile, setCanScrollNextMobile] = useState(false)

  // Desktop carousel nav logic
  useEffect(() => {
    if (!desktopCarouselApi) return
    const updateScrollButtons = () => {
      setCanScrollPrevDesktop(desktopCarouselApi.canScrollPrev())
      setCanScrollNextDesktop(desktopCarouselApi.canScrollNext())
    }
    updateScrollButtons()
    desktopCarouselApi.on('select', updateScrollButtons)
    return () => {
      void desktopCarouselApi.off('select', updateScrollButtons)
    }
  }, [desktopCarouselApi])

  // Mobile carousel nav logic
  useEffect(() => {
    if (!mobileCarouselApi) return

    const updateScrollButtons = () => {
      setCanScrollPrevMobile(mobileCarouselApi.canScrollPrev())
      setCanScrollNextMobile(mobileCarouselApi.canScrollNext())
    }

    updateScrollButtons()
    mobileCarouselApi.on('select', updateScrollButtons)

    // Always cleanup
    return () => {
      mobileCarouselApi.off('select', updateScrollButtons)
    }
  }, [mobileCarouselApi])

  return (
    <div className="relative w-full flex flex-col items-center container-padding bg-white overflow-hidden">
      {/* Absolute Human Resource Image - Top Right */}
      <img
        src="/assets/career/web/humanresource.png"
        alt="Human Resource"
        className="hidden lg:block absolute right-4 md:right-8 xl:right-60 top-8 z-0 pointer-events-none select-none md:w-[400px] md:h-[250px] xl:w-[584px] xl:h-[336px]"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      {/* Mobile: Human resource image background */}
      <img
        src="/assets/career/mobile/humanresource.png"
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

      {/* Cards carousel for all screens */}
      <div className="w-full flex justify-center pl-4 xl:pl-20">
        {/* Large screens: Carousel with 2 visible cards per slide */}
        <div className="hidden lg:block w-full z-10 mb-12 relative">
          <Carousel
            opts={{ align: 'start' }}
            setApi={setDesktopCarouselApi}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent className="gap-12 xl:gap-20">
              {data.map((item, idx) => (
                <CarouselItem
                  key={idx}
                  className="
                    basis-[46%] max-w-[540px] 2xl:max-w-[600px] shrink-0
                    pl-16
                    py-12
                    flex justify-center
                    transition-all
                  "
                >
                  <ResourceCard data={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel navigation at bottom center (lg+) */}
            <div
              className="hidden lg:flex gap-2 absolute
                inset-x-0 justify-center -bottom-12"
            >
              <CarouselNavButtons
                onPrev={() => desktopCarouselApi?.scrollPrev()}
                onNext={() => desktopCarouselApi?.scrollNext()}
                hasPrev={canScrollPrevDesktop}
                hasNext={canScrollNextDesktop}
              />
            </div>
          </Carousel>
        </div>

        {/* Mobile/Tablet carousel (as before) */}
        <div className="block lg:hidden w-full z-10 mb-10">
          <Carousel opts={{ loop: true }} setApi={setMobileCarouselApi}>
            <CarouselContent>
              {data.map((item, idx) => (
                <CarouselItem key={idx} className="px-16 pb-16 h-full">
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
                onPrev={() => mobileCarouselApi?.scrollPrev()}
                onNext={() => mobileCarouselApi?.scrollNext()}
                hasPrev={canScrollPrevMobile}
                hasNext={canScrollNextMobile}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
