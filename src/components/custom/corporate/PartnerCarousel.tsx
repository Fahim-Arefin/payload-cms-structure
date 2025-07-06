'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { PartnerType } from '@/types'

type Props = {
  data: PartnerType[]
}

 function PartnerCarousel({ data }: Props) {
  return (
    <section className="w-full md:py-10 lg:py-16">
      <h2 className="global-h2 font-semibold text-[#3A3A3C] mb-6 px-5 py-5  
           md:px-24 
           lg:px-[130px]  lg:pt-[100px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[100px]">
        <span className="text-[#ED7125]">OUR VALUED</span>{' '}
        PARTNERS
      </h2>

      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-[200px] h-[120px] lg:w-[340px] lg:h-[250px] flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  
                  className="object-contain w-full h-auto"
                />
              </div>
              <p className="text-xs font-semibold text-center text-black uppercase">
                {item.title}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default PartnerCarousel