'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { CareerCard } from '@/types'
import { useEffect, useState } from 'react'
import SwiperNavButtons from './SwiperNavButtons'
import Autoplay from 'embla-carousel-autoplay'

type CareerSwiperProps = {
  careerCards: CareerCard[]
}

function CareerSwiper({ careerCards }: CareerSwiperProps) {
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
  }, 3500)

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
    <div
      className="relative pl-5 py-12 
           md:pl-24 md:py-24
           lg:pl-[130px]  lg:py-[110px] 
           xl:pl-[200px]  xl:py-[100px] 
           2xl:pl-[300px] 2xl:py-[120px] w-full"
      style={{
        background: "url('/assets/careerSwiperBanner.gif') no-repeat center/cover",
      }}
    >
      <div className="pt-16 pb-10">
        <div className="mb-6 flex flex-col gap-2">
          <div className="text-white text-lg lg:text-[28px] font-light">FAST TRACK</div>
          <div className="text-[#FF8641] text-3xl lg:text-[46px] font-bold mb-2">YOUR CAREER</div>
          <div className="text-white text-[12px] md:text-base lg:text-lg font-[350] uppercase">
            Discover a purpose with endless opportunity
          </div>
        </div>
        <div className="relative mt-10 lg:mt-[62px]">
          <Carousel
            opts={{
              align: 'start',
              loop: true
            }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="gap-6">
              {careerCards.map((card, idx) => (
                <CarouselItem
                  key={card.title}
                  className={cn(
                    // For 3.5 cards on desktop: (338 * 3.5 + 18) ~ 1200px fits
                    'basis-[338px] cursor-pointer md:basis-[338px] 2xl:basis-[460px] shrink-0',
                    'pr-6 last:pr-0',
                    // Mobile: 1.5 cards
                  )}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className={cn(
                      'flex flex-col w-[250px] md:w-[338px] 2xl:w-[380px] justify-between items-center rounded-[6px] md:rounded-[18px] border-[0.5px] md:border border-[#FFFFFF] bg-[#0000004D] backdrop-blur-[7.5px] text-center px-6 transition-all duration-300',
                      idx % 2 === 1
                        ? 'h-[150px] md:h-[346px] lg:h-[346px]'
                        : 'h-[150px] md:h-[346px] lg:h-[346px]',
                      'sm:h-[120px] sm:lg:h-[180px]',
                      hoveredIdx === idx
                        ? idx % 2 === 1
                          ? 'h-[180px] md:h-[400px] lg:h-[450px]'
                          : 'h-[180px] md:h-[400px] lg:h-[450px]'
                        : idx % 2 === 1
                          ? 'h-[150px] md:h-[346px] lg:h-[346px]'
                          : 'h-[150px] md:h-[346px] lg:h-[346px]',
                    )}
                  >
                    <div className="flex-1 flex flex-col gap-4 md:gap-8 justify-center">
                      <div className="text-white text-[14px] md:text-[16px] lg:global-p1 font-bold">
                        {card.title}
                      </div>
                      <div className="text-white global-p2">{card.description}</div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel Navigation Buttons */}
            <div
              className="flex gap-2 absolute
                        inset-x-0 justify-center -bottom-16 2xl:-bottom-20 2xl:right-40"
            >
              <SwiperNavButtons
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

export default CareerSwiper
