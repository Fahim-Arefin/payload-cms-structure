'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { BenefitSliderSectionData } from '@/types'

import { useEffect, useState } from 'react'

import { sliderDelay } from '@/lib/data'
import CarouselNavButtons from '../CarousalNavButtons'
import BenefitSliderItem from './BenefitSliderItem'
import Autoplay from 'embla-carousel-autoplay'

type Props = {
  data: BenefitSliderSectionData
}

function BenefitSliderSection({ data }: Props) {
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
    <div className="container-padding bg-white">
      <div className="space-y-6 md:space-y-10 lg:space-y-12 xl:space-y-16">
        {/* heading */}
        <div className="">
          <div className="flex space-x-2">
            <h3 className="global-h3 uppercase font-bold text-[#434343]">{data?.title} </h3>{' '}
            <h3 className="global-h3 uppercase font-bold text-[#ED7125]">{data?.coloredTitle}</h3>
          </div>
          <div className="global-span text-[#434343]">{data?.description}</div>
        </div>
        {/* carousal */}
        <Carousel
          className="w-full"
          setApi={setCarouselApi}
          opts={{ dragFree: true }}
          plugins={[
            Autoplay({
              delay: sliderDelay,
            }),
          ]}
        >
          <CarouselContent className="-ml-1">
            {data?.item?.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 
               basis-1/2 md:basis-1/3 lg:basis-1/3
              pr-1 lg:pr-2 xl:pr-6 2xl:pr-10"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <BenefitSliderItem data={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation buttons */}
          <div className="flex md:hidden gap-2 justify-center m-6">
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
  )
}

export default BenefitSliderSection
