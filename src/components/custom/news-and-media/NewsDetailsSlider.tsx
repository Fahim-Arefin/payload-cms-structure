'use client'
import { AllNewsAndBlogDataType } from '@/types'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React, { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import NewsSliderCard from './NewsSliderCard'
import { sliderDelay } from '@/lib/data'

type Props = {
  id: number
  data: AllNewsAndBlogDataType[]
}

function NewsDetailsSlider({ data, id }: Props) {
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
    <div
      className="px-5 pb-12 
           md:px-24 md:pb-24
           lg:px-[130px]  lg:pb-[110px] 
           xl:px-[200px]  xl:pb-[100px] 
           2xl:px-[300px] 2xl:pb-[150px]
           "
    >
      <div>
        <h3 className="global-h3 font-normal uppercase">You may also like</h3>
        {/* carousal section */}
        <div className="mt-12 lg:mt-16 xl:mt-20 2xl:mt-32">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-[95%] mx-auto mb-12 lg:mb-0"
            setApi={setCarouselApi} // 👈 capture carousel API
            plugins={[
              Autoplay({
                delay: sliderDelay,
              }),
            ]}
          >
            <CarouselContent>
              {data?.map((item, index) => (
                <CarouselItem key={index} className="lg:basis-1/2 xl:basis-1/3 mx-auto lg:py-4">
                  <NewsSliderCard data={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel Navigation */}
            <div
              className="flex gap-2 absolute h-fit
            inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-8 2xl:-top-12 lg:right-0"
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

export default NewsDetailsSlider
