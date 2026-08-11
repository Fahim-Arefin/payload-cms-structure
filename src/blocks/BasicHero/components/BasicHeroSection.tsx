'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { homeSliderDelay } from '@/lib/data'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import BasicHeroItem from './BasicHeroItem'

type Props = {
  block: BasicHeroBlockType
}

function BasicHeroSection({ block }: Props) {
  const heroWrapperRef = useRef<HTMLDivElement | null>(null)
  const heroPinRef = useRef<HTMLDivElement | null>(null)

  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [count, setCount] = useState(0)

  const hasMultiple = (block?.heroes?.length ?? 0) > 1

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: homeSliderDelay,
        stopOnInteraction: true,
      }),
    [],
  )

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setActiveIndex(api.selectedScrollSnap())

    const onSelect = () => setActiveIndex(api.selectedScrollSnap())
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  useGSAP(
    () => {
      const heroWrapper = heroWrapperRef.current
      const heroPin = heroPinRef.current

      if (!heroWrapper || !heroPin) return

      ScrollTrigger.create({
        trigger: heroWrapper,
        start: 'top top',

        // how long the hero remains pinned while the next block scrolls over it
        end: '+=100%',

        pin: heroPin,

        // ✅ this makes the next section overlap/pass over the hero
        pinSpacing: false,

        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })

      ScrollTrigger.refresh()
    },
    {
      scope: heroWrapperRef,
      dependencies: [block?.heroes?.length],
    },
  )

  return (
    <section ref={heroWrapperRef} className="relative z-0 h-screen">
      <div ref={heroPinRef} className="relative h-screen w-full overflow-hidden">
        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: true }}
          plugins={[autoplay]}
          className="relative h-full w-full"
        >
          <CarouselContent>
            {block?.heroes?.map((item, index) => (
              <CarouselItem key={index}>
                <BasicHeroItem item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {hasMultiple && (
            <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 flex justify-between z-30 px-4 lg:px-8 2xl:px-12">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => api?.scrollPrev()}
                className="w-9 h-9 border border-white rounded-[2px] bg-transparent text-white hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Next slide"
                onClick={() => api?.scrollNext()}
                className="w-9 h-9 border border-white rounded-[2px] bg-transparent text-white hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </Carousel>
      </div>
    </section>
  )
}

export default BasicHeroSection
