'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import AllAboutCard from './AllAboutCard'
import { ValuesThatShapeUsBlockType } from '@/types/payloadCustomTypes'

type Props = {
  allAboutData: ValuesThatShapeUsBlockType['values']
}

function AllAboutCardList({ allAboutData }: Props) {
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
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
      }}
      plugins={[
        Autoplay({
          delay: sliderDelay,
        }),
      ]}
      setApi={setCarouselApi} // 👈 capture carousel API
    >
      {/* Carousel Content */}
      <CarouselContent>
        {allAboutData?.map((data, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
            <AllAboutCard data={data} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Carousel Navigation */}
      <div
        className="hidden lg:flex gap-3 absolute 
      lg:-bottom-[60px] xl:-bottom-20  2xl:-bottom-24 
      lg:left-[210px] xl:left-[360px] 2xl:left-[310px]"
      >
        <CarouselNavButtons
          onPrev={() => carouselApi?.scrollPrev()}
          onNext={() => carouselApi?.scrollNext()}
          hasPrev={canScrollPrev}
          hasNext={canScrollNext}
        />
      </div>
    </Carousel>
  )
}

export default AllAboutCardList
