'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CareerOpeningForm from './CareerOpeningForm'

import { useEffect, useState } from 'react'
import CareerOpeningCard from './CareerOpeningCard'
import CarouselNavButtons from '../shared/CarousalNavButtons'

type CareerOpeningDataProps = {
  openingData: any
}

export default function CareerOpening({ openingData }: CareerOpeningDataProps) {
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
    <section className="container-padding w-full bg-[#F6EDDD] py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left: Section Title */}
        <div className="mb-8 md:mb-0 md:col-span-1">
          <div>
            <span className="block text-[#343434] font-light text-[20px] md:text-[22px] xl:text-[24px]">
              CURRENTLY OPENING
            </span>
            <span className="block text-[#ED7125] font-bold text-[28px] md:text-[34px] xl:text-[36px] tracking-tight -mt-1">
              POSITIONS
            </span>
          </div>
        </div>

        {/* Center: Cards (Grid for desktop, Carousel for mobile) */}
        <div className="md:col-span-1 flex flex-col items-center w-full">
          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-2 gap-5 w-full">
            {openingData.map((card: any, idx: number) => (
              <CareerOpeningCard key={idx} {...card} />
            ))}
          </div>
          {/* Mobile: Carousel */}
          <div className="md:hidden w-full relative">
            <Carousel opts={{ loop: true, align: 'center' }} setApi={setCarouselApi}>
              <CarouselContent className="flex items-stretch">
                {openingData.map((card: any, idx: number) => (
                  <CarouselItem key={idx} className="flex-shrink-0 w-[91vw] max-w-[350px]">
                    <CareerOpeningCard {...card} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div
                className="flex md:hidden gap-2 absolute
                          inset-x-0 justify-center -bottom-16"
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

        {/* Right: Form */}
        <div className="md:col-span-1 mt-10 md:mt-0">
          <CareerOpeningForm />
        </div>
      </div>
    </section>
  )
}
