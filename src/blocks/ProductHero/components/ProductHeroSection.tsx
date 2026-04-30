'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { homeSliderDelay } from '@/lib/data'
import { ProductHeroBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ProductHeroItem from './ProductHeroItem'

type Props = {
  block: ProductHeroBlockType
}

function ProductHeroSection({ block }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [count, setCount] = useState(0)

  const hasMultiple = (block?.heroes?.length ?? 0) > 1

  // keep autoplay instance stable (prevents re-init)
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

  return (
    <div className="">
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: true }}
        plugins={[autoplay]}
        className="relative w-full"
      >
        <CarouselContent>
          {block?.heroes?.map((item, index) => (
            <CarouselItem key={index}>
              <ProductHeroItem item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation (always visible like you asked) */}
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

        {/* left-1/2 -translate-x-1/2 */}
        {/* ✅ Pagination bars (like screenshot) */}
        {hasMultiple && (
          <div
            className="absolute z-30
            left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0
           md:inset-x-0 md:container-padding-left
          bottom-10 md:bottom-[70px] xl:bottom-32 
          "
          >
            <div className="flex items-center gap-1 md:gap-2 md:pl-1">
              {Array.from({ length: count || block.heroes.length }).map((_, idx) => {
                const isActive = idx === activeIndex

                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => api?.scrollTo(idx)}
                    className={[
                      'relative h-[8px] transition-all duration-500 ease-out ',
                      // width animation
                      isActive ? 'w-[50px] md:w-[80px]' : 'w-[13px] md:w-[26px]',
                      // color + visibility
                      isActive ? 'bg-[#2FC6C6]' : 'bg-[#2FC6C6]/40 hover:bg-[#2FC6C6]/70',
                    ].join(' ')}
                  ></button>
                )
              })}
            </div>
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default ProductHeroSection
