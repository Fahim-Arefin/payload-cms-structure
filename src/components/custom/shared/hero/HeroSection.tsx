'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'
import HeroItem from './HeroItem'
import { Page } from '@/payload-types'

type Props = {
  heroSlides: Extract<Page['layout'][0], { blockType: 'hero' }>
  children?: React.ReactNode
  height?: string
  top?: string
  position?: string
}

function HeroSection({ heroSlides, children, height, top, position }: Props) {
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
          {heroSlides?.heroes?.map((slide, index) => (
            <CarouselItem
              key={index}
              // className={`relative w-full ${height ? height : ' h-[352px] md:h-[452px] lg:h-[628px] 2xl:h-[950px] '}`}
              className={`relative w-full ${height ? height : 'aspect-[16/9] h-[352px] md:h-auto 2xl:h-[958px] w-full'}`}
            >
              <HeroItem slide={slide} top={top} position={position} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        {heroSlides?.heroes?.length && heroSlides?.heroes?.length > 1 && (
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
