'use client'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { BankingFacilitiesDataType } from '@/types'
import PartnersCard from './PartnersCard'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../CarousalNavButtons'

type Props = { data: BankingFacilitiesDataType[] }

function Partners({ data }: Props) {
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
      className="container-padding bg-white 
    space-y-6 md:space-y-12 lg:space-y-20 xl:space-y-24"
    >
      {/* heading */}
      <div>
        <div className="flex space-x-2 uppercase">
          <h3 className="global-h3 uppercase font-medium text-[#434343]">oUR Valued </h3>
          <h3 className="global-h3 uppercase font-medium text-[#ED7125]"> partners</h3>
        </div>
      </div>
      {/* carousal */}
      <Carousel className="w-full" setApi={setCarouselApi}>
        <CarouselContent className="-ml-1">
          {data?.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 
               basis-1/2 md:basis-1/3 lg:basis-1/4
              pr-1 lg:pr-2 xl:pr-6 2xl::pr-10"
            >
              <PartnersCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        <div
          className="flex gap-2 absolute h-fit
            inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-8 xl:-top-10 2xl:-top-12 lg:right-0"
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

export default Partners
