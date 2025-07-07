'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { HeroContentType } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import HeroItem from './HeroItem'

type Props = {
  heroSlides: HeroContentType[]
  children?: React.ReactNode
}

function HeroSection({ heroSlides, children }: Props) {
  return (
    <>
      <Carousel
        className="w-full"
        opts={{
          align: 'start',
          // loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        {/* Carousel Content */}
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative w-full h-[352px] md:h-[452px] lg:h-[628px] 2xl:h-[950px]"
            >
              <HeroItem slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        {heroSlides?.length > 1 && (
          <div className="hidden md:flex absolute bottom-5 right-6 z-30 gap-3">
            <CarouselPrevious className="static w-8 h-8 border border-white rounded-md bg-transparent text-white hover:bg-white/20 transition-colors flex items-center justify-center" />
            <CarouselNext className="static w-8 h-8 border border-white rounded-md bg-transparent text-white hover:bg-white/20 transition-colors flex items-center justify-center" />
          </div>
        )}
        {/* static buttons */}
        {children}
      </Carousel>
    </>
  )
}

export default HeroSection
