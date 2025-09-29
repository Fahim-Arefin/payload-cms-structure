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
import { sliderDelay } from '@/lib/data'

type Props = {
  heroSlides: HeroContentType[]
  children?: React.ReactNode
  height?: string
  top?: string
  position?: string
  isHome?: boolean
}

function HeroSection({ heroSlides, children, height, top, position, isHome }: Props) {
  return (
    <>
      <Carousel
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: sliderDelay,
          }),
        ]}
      >
        {/* Carousel Content */}
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem
              key={index}
              className={`relative w-full ${height ? height : ' h-[352px] md:h-[452px] lg:h-[628px] 2xl:h-[950px] '}`}
              // className="relative w-full h-[352px] md:h-[452px] lg:h-[628px] xl:h-[950px] 2xl:min-h-screen"
            >
              <HeroItem slide={slide} top={top} position={position} isHome={isHome} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        {heroSlides?.length > 1 && (
          <div className="hidden lg:flex absolute bottom-5 inset-x-0 justify-center z-30 gap-3 ">
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
