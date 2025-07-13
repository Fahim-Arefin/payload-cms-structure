'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import NewsSliderCard from './NewsSliderCard'

type Props = {
  data: {
    title: string
    image: string
    date: string
  }[]
}

function NewsSliderSection({ data }: Props) {
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
      className="w-[95%] lg:w-[85%] xl:w-[72%] mx-auto
            
           py-[70px]
             lg:py-[70px] 
             xl:py-[100px]"
    >
      <Carousel
        opts={{
          align: 'start',
        }}
        className=""
        setApi={setCarouselApi}
      >
        <CarouselContent className="">
          {data?.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/3  md:pl-0 -ml-2 md:ml-2">
              <NewsSliderCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        <div
          className="lg:hidden flex gap-2 absolute h-fit
                  inset-x-0 justify-start px-1 md:px-0 lg:justify-end -bottom-8 md:-bottom-9 lg:-top-8 2xl:-top-12 lg:right-0"
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
  )
}

export default NewsSliderSection
