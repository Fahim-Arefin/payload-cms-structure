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
import BankingCard from './BankingCard'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../CarousalNavButtons'

type Props = { data: BankingFacilitiesDataType[] }

function BankingFacilities({ data }: Props) {
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
      className="container-padding bg-[#FCF4EB] min-h-[350px] md:min-h-[500px]
    space-y-6 md:space-y-12 lg:space-y-20 xl:space-y-24"
    >
      {/* heading */}
      <div>
        <h3 className="global-h1 uppercase font-medium text-[#434343]">Banking Facilities</h3>
        <div className="flex space-x-2">
          <h3 className="global-h1 uppercase font-medium text-[#434343]">Protected under </h3>
          <h3 className="global-h1 uppercase font-medium text-[#ED7125]">Life Insurance</h3>
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
              <BankingCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        <div
          className="flex gap-2 absolute h-fit
            inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-10 xl:-top-12 2xl:-top-14 lg:right-0"
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

export default BankingFacilities
