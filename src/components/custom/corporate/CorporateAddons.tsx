'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { OfferDataType } from '@/types'
import AddonsCard from './AddonsCard'

type Props = { data: OfferDataType[] }

function CorporateAddons({ data }: Props) {
  return (
    <div
      className=" min-h-[410px] md:min-h-[550px]
    space-y-6 md:space-y-12 lg:space-y-20 xl:space-y-24] 
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
           lg:px-[64px] "
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
        {/* Carousel Navigation */}
        {/* <div
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
        </div> */}
      </Carousel>
    </div>
  )
}

export default CorporateAddons
