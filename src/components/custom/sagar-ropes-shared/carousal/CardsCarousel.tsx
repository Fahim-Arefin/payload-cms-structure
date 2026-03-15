'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useMemo, useState } from 'react'

type Props<T> = {
  items: T[]
  children: (item: T, index: number) => React.ReactNode // ✅ BUT only used inside same client tree
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  align?: 'start' | 'center' | 'end'

  className?: string
  contentClassName?: string
  itemClassName?: string
  paginationClassName?: string
}

export default function CardsCarousel<T>({
  items,
  children,
  autoplay = true,
  autoplayDelay = sliderDelay,
  loop = true,
  align = 'start',
  className,
  contentClassName,
  itemClassName,
  paginationClassName,
}: Props<T>) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [count, setCount] = useState(items.length)

  const hasMultiple = (items?.length ?? 0) > 1

  const autoplayPlugin = useMemo(
    () =>
      autoplay
        ? Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: true,
          })
        : undefined,
    [autoplay, autoplayDelay],
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
    <div className={className}>
      <Carousel
        setApi={setApi}
        opts={{ align, loop }}
        plugins={autoplayPlugin ? [autoplayPlugin] : []}
        className="relative w-full"
      >
        <CarouselContent className={contentClassName}>
          {items.map((item, idx) => (
            <CarouselItem key={idx} className={itemClassName}>
              {children(item, idx)}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ✅ center pagination */}
        {hasMultiple && (
          <div
            className={[
              'absolute z-30 left-1/2 -translate-x-1/2',
              // default position (you can override)
              paginationClassName ?? 'bottom-0',
            ].join(' ')}
          >
            <div className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
              {Array.from({ length: count || items.length }).map((_, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => api?.scrollTo(idx)}
                    className={[
                      'relative h-[4px] md:h-[5px] lg:h-[6px] xl:h-[7px] 2xl:h-[8px] transition-all duration-500 ease-out',
                      isActive
                        ? 'w-[30px] md:w-[40px] lg:w-[50px] xl:w-[60px] 2xl::w-[80px]'
                        : 'w-[13px] md:w-[16px] lg:w-[20px] xl::w-[26px]',
                      isActive ? 'bg-cyan' : 'bg-cyan/40 hover:bg-cyan/70',
                    ].join(' ')}
                  />
                )
              })}
            </div>
          </div>
        )}
      </Carousel>
    </div>
  )
}
