import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import AllOfThemCard from './AllOfThemCard'
import { AllOfThemDataType } from '@/types'
type Props = {
  allOfThemData: AllOfThemDataType[]
}

function AllOfThemSection({ allOfThemData }: Props) {
  return (
    <div className="bg-[#F6EDDD] pb-12 lg:pb-0">
      <div className="container-padding">
        {/* top section */}
        <div className="lg:w-[50%] space-y-6 2xl:space-y-12 ">
          <h2 className="global-h3 font-semibold text-[#4A4A4A] text-center lg:text-start">
            AT THE HELM
          </h2>
          <p className="global-p1 text-[#4A4A4A] text-center lg:text-justify ">
            Guided by Visionaries, Driven by Purpose. Meet Our Leadership Team, creating a new
            future of Life Insurance in Bangladesh
          </p>
        </div>
        {/* carousal section */}
        <div className="mt-12 lg:mt-16 xl:mt-20 2xl:mt-32">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-[95%] mx-auto"
          >
            <CarouselContent>
              {allOfThemData?.map((data, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 mx-auto lg:py-4">
                  <AllOfThemCard data={data} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel Navigation */}
            <div
              className="flex gap-2 absolute
            inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-8 2xl:-top-12 lg:right-0"
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
      </div>
    </div>
  )
}

export default AllOfThemSection
