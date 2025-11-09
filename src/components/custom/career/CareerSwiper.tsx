'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { CareerCard } from '@/types'
import { useEffect, useState } from 'react'
import SwiperNavButtons from './SwiperNavButtons'
import Autoplay from 'embla-carousel-autoplay'
import LocalizedText from '../shared/LocalizedText'
import { CareerPageSwiperBlockType } from '@/types/payloadCustomTypes'

type CareerSwiperProps = {
  careerCards: CareerPageSwiperBlockType
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
    }, 5000)

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
    <>
      <div
        className="relative py-12 md:py-24
             lg:py-[110px] 
             xl:py-[100px] 
            2xl:py-[100px] w-full"
        style={{
          // background: `${careerCards?.backgroundImage?.url} no-repeat center/cover`,
          background: `url('${careerCards?.backgroundGifUrl ?? ''}') no-repeat center/cover`,
        }}
      >
        <div className="md:pt-4 lg:pt-16 pb-10">
          <div className="mb-6 flex flex-col gap-2 pl-5 md:pl-24 lg:pl-[130px] xl:pl-[200px] 2xl:pl-[300px]">
            <div className="text-white text-lg lg:text-[28px] font-light">
              <LocalizedText en={careerCards?.title} bn={careerCards?.titleBN} />
            </div>
            <div className="text-[#FF8641] text-3xl lg:text-[46px] font-bold mb-2">
              <LocalizedText en={careerCards?.subtitle} bn={careerCards?.subtitleBN} />
            </div>
            <div className="text-white text-[12px] md:text-base lg:text-lg font-[350] uppercase">
              <LocalizedText en={careerCards?.description} bn={careerCards?.descriptionBN} />
            </div>
          </div>
          <div className="relative mt-10 lg:mt-[62px]">
            <Carousel
              opts={{
                align: 'start',
                // loop: true,
              }}
              setApi={setCarouselApi}
              className="w-full"
            >
              <CarouselContent className="gap-6 px-10">
                {careerCards?.cards.map((card, idx) => (
                  <CarouselItem
                    key={card.title}
                    className={cn(
                      'basis-[338px] cursor-pointer md:basis-[400px] p-10 lg:basis-[400px] xl:basis-[420px] 2xl:basis-[460px]',
                      'pr-6 last:pr-0',
                      // Ensure content doesn't overflow out of the card
                    )}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div
                      className={cn(
                        'flex flex-col w-[250px] md:w-[338px] 2xl:w-[380px] h-[150px] md:h-[346px] lg:h-[346px] justify-between items-center rounded-[6px] md:rounded-[18px] border-[0.5px] md:border border-[#FFFFFF] bg-[#0000004D] backdrop-blur-[7.5px] text-center px-6 transition-all duration-500',
                        hoveredIdx === idx
                          ? 'transform scale-y-[1.22] scale-x-[1.1] transition-all duration-500' // Apply scaling only to content
                          : 'scale-100', // Normal size when not hovered
                      )}
                    >
                      <div className="flex-1 flex flex-col gap-4 md:gap-8 justify-center">
                        <div className="text-white text-[14px] md:text-[16px] lg:global-p1 font-bold">
                          <LocalizedText en={card?.title} bn={card?.titleBN} />
                        </div>
                        <div className="text-white global-p2">
                          <LocalizedText en={card?.description} bn={card?.descriptionBN} />
                        </div>
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
    </>
  )
}

export default CareerSwiper
