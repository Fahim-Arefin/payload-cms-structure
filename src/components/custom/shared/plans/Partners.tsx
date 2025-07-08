'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { BankingFacilitiesDataType } from '@/types'
import PartnersCard from './PartnersCard'

type Props = { data: BankingFacilitiesDataType[] }

function Partners({ data }: Props) {
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
      <Carousel className="w-full">
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
          <CarouselPrevious
            className="
         w-6 xl:w-8 
         h-6 xl:h-8 
        static rounded-full border border-gray-400 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
          />
          <CarouselNext
            className="
         px-6 xl:px-9 
         h-6 xl:h-8
        static rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
          />
        </div>
      </Carousel>
    </div>
  )
}

export default Partners
