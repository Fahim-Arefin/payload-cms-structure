'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { homeSliderDelay } from '@/lib/data'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import ArrowRight from 'public/assets/icons/arrowright.png'
import { useEffect, useRef, useState } from 'react'
import BasicHeroItem from './BasicHeroItem'

type Props = {
  block: BasicHeroBlockType
}

function BasicHeroSection({ block }: Props) {
  const heroWrapperRef = useRef<HTMLDivElement | null>(null)
  const heroPinRef = useRef<HTMLDivElement | null>(null)

  const autoplay = useRef(
    Autoplay({
      delay: homeSliderDelay,
      stopOnInteraction: true,
    }),
  )

  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [count, setCount] = useState(0)

  const hasMultiple = (block?.heroes?.length ?? 0) > 1

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setActiveIndex(api.selectedScrollSnap())

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

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

      const scrollTrigger = ScrollTrigger.create({
        trigger: heroWrapper,
        start: 'top top',
        end: '+=100%',
        pin: heroPin,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })

      ScrollTrigger.refresh()

      return () => {
        scrollTrigger.kill()
      }
    },
    {
      scope: heroWrapperRef,
      dependencies: [block?.heroes?.length],
    },
  )

  const handlePrev = () => {
    autoplay.current.stop()
    api?.scrollPrev()
  }

  const handleNext = () => {
    autoplay.current.stop()
    api?.scrollNext()
  }

  return (
    <section ref={heroWrapperRef} className="relative z-0 h-screen">
      <div ref={heroPinRef} className="relative h-screen w-full overflow-hidden">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: hasMultiple,
          }}
          plugins={hasMultiple ? [autoplay.current] : []}
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
            <div
              className="
                pointer-events-none absolute inset-x-0 top-1/2 z-30
                flex -translate-y-1/2 items-center justify-between
                px-[14px]
                md:px-[22px]
                lg:px-[32px]
                xl:px-[46px]
                2xl:px-[58px]
              "
            >
              <button
                type="button"
                aria-label="Previous slide"
                onClick={handlePrev}
                className="
                  pointer-events-auto
                  flex items-center justify-center
                  rounded-full bg-primary-1/35
                  shadow-[0_10px_24px_rgba(0,108,103,0.18)]
                  backdrop-blur-[10px]
                  transition-all duration-300 ease-out
                  hover:bg-primary-1
                  active:scale-95
                  size-[34px]
                  md:size-[38px]
                  xl:size-[44px]
                "
              >
                <Image
                  src={ArrowRight}
                  alt=""
                  width={18}
                  height={18}
                  className="
                    rotate-180 object-contain
                    h-[12px] w-[12px]
                    md:h-[14px] md:w-[14px]
                    xl:h-[16px] xl:w-[16px]
                  "
                  placeholder="blur"
                  blurDataURL={ArrowRight.blurDataURL}
                  quality={95}
                />
              </button>

              <button
                type="button"
                aria-label="Next slide"
                onClick={handleNext}
                className="
                  pointer-events-auto
                  flex items-center justify-center
                  rounded-full bg-primary-1/35
                  shadow-[0_10px_24px_rgba(0,108,103,0.18)]
                  backdrop-blur-[10px]
                  transition-all duration-300 ease-out
                  hover:bg-primary-1
                  active:scale-95
                  size-[34px]
                  md:size-[38px]
                  xl:size-[44px]
                "
              >
                <Image
                  src={ArrowRight}
                  alt=""
                  width={18}
                  height={18}
                  className="
                    object-contain
                    h-[12px] w-[12px]
                    md:h-[14px] md:w-[14px]
                    xl:h-[16px] xl:w-[16px]
                  "
                  placeholder="blur"
                  blurDataURL={ArrowRight.blurDataURL}
                  quality={95}
                />
              </button>
            </div>
          )}
        </Carousel>
      </div>
    </section>
  )
}

export default BasicHeroSection
