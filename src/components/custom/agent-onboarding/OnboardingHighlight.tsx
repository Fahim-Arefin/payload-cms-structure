import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '@/components/ui/carousel'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { CarouselNextButton } from '../shared/CarouselNextButton'

type Props = {
  highlightSlides: {
    mainDescription: string
    images: {
      src: string
      title: string
    }[]
  }
}

const OnboardingHighlight = ({ highlightSlides }: Props) => {
  return (
    <div className=" bg-[#F6EDDD]">
      {/* Half-white background */}

      <div className="relative z-10 px-5 py-12 lg:px-[130px] lg:py-[110px] 2xl:px-[300px] 2xl:py-[150px]">
        <img
          src="/assets/leftquote.png" // replace with actual path
          alt="Opening Quote"
          className="hidden lg:block w-12 2xl:w-20 absolute right-20 2xl:right-48 2xl:top-28"
        />
        <img
          src="/assets/rightquote.png" // replace with actual path
          alt="Closing Quote"
          className="hidden lg:block w-12 2xl:w-20 absolute left-20 2xl:left-48 2xl:top-28"
        />
        <p className="global-h3 text-gray-800 text-center">{highlightSlides?.mainDescription}</p>
      </div>

      {/* <div className="block xl:hidden px-5 lg:px-[130px]">
        <Carousel className="w-full">
          <CarouselContent>
            {highlightSlides.images.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="w-[170px] basis-1/2 md:basis-1/3  "
              >
                <div className="h-[260px] rounded-lg shadow-md">
                  <img
                    src={item?.src}
                    alt={`highlight-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full text-center global-p1">{item?.title}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNextButton />
        </Carousel>
      </div>
      {/* Cards Section */}
      {/* <div className="px-5 lg:px-[130px] 2xl:px-[300px] xl:mt-28 bg-white">
        <div className="hidden xl:grid lg:grid-cols-4 gap-4 text-center">
          {highlightSlides.images.map((item, idx) => (
            <div
              key={idx}
              className="relative xl:-top-44 w-[256px] h-[326px] mx-auto rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={item?.src}
                alt={`highlight-${idx}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-30 text-white text-sm p-3 leading-snug">
                {item?.title}
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default OnboardingHighlight
