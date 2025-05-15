'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import HeroItem from './HeroItem'

function HeroSection() {
  const heroSlides = [
    {
      title: 'Driven by Purpose',
      subtitle: 'Designed for Life',
      description:
        'Empower yourself to live on your terms. Enjoy the confidence of your potential and let us take the risk.',
      image: '/assets/banner1.jpg',
    },
    {
      title: 'Building Better Futures',
      subtitle: 'One Step at a Time',
      description:
        'We walk with you on your journey, providing the tools you need to succeed and grow.',
      image: '/assets/banner2.jpg',
    },
    {
      title: 'Innovative Thinking',
      subtitle: 'Impactful Living',
      description: "Harness innovation to redefine your future. Together, let's make a difference.",
      image: '/assets/banner1.jpg',
    },
  ]

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
              className="relative w-full h-[352px] md:h-[452px] lg:h-[628px] 2xl:h-[928px]"
            >
              <HeroItem slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        <div className="hidden md:flex absolute bottom-5 right-6 z-30 gap-3">
          <CarouselPrevious className="static w-8 h-8 border border-white rounded-md bg-transparent text-white hover:bg-white/20 transition-colors flex items-center justify-center" />
          <CarouselNext className="static w-8 h-8 border border-white rounded-md bg-transparent text-white hover:bg-white/20 transition-colors flex items-center justify-center" />
        </div>
      </Carousel>
    </>
  )
}

export default HeroSection
