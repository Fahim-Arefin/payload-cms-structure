'use client'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { OfferDataType } from '@/types'
import AddonsCard from './AddonsCard'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import Autoplay from 'embla-carousel-autoplay'

type Props = { data: OfferDataType[] }

function CorporateAddons({ data }: Props) {
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
      className=" min-h-[410px] md:min-h-[550px]
    space-y-6 md:space-y-12 lg:space-y-20 xl:space-y-24]
    mb-0 lg:mb-10 xl:mb-20
    "
    >
      {/* heading */}
      <div
        className="px-5 pt-12 
           md:px-24 md:pt-24 
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px]"
      >
        <div className="flex space-x-2">
          <h3 className="global-h3 uppercase font-bold text-[#434343]">Employee </h3>
          <h3 className="global-h3 uppercase font-bold text-[#ED7125]">Wellness Ad-ons</h3>
        </div>
      </div>
      {/* carousal */}
      <Carousel
        className="w-full px-5 pb-12 
           md:px-12 
           lg:px-[64px]"
        setApi={setCarouselApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {data?.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 
               basis-1/2 md:basis-1/3 lg:basis-1/4
              pr-1 lg:pr-2 xl:pr-6 2xl:pr-10"
            >
              <AddonsCard data={item} />
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
  )
}

export default CorporateAddons
