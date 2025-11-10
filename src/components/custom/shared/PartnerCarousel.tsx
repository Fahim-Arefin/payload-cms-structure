'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useRef, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import Image from 'next/image'

type Props = {
  data: {
    title: string
    highlightedText: string
    titleBN: string
    highlightedTextBN: string
    backgroundColor: string
    partners: {
      image: string
      name: string
      nameBN: string
    }[]
  }
  space?: boolean
}

function PartnerCarousel({ data, space = false }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // normal autoplay (e.g., 4000ms). Keep interaction running.
  const autoplay = useRef(
    Autoplay({
      delay: sliderDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: false, // we’ll manage hover ourselves
    }),
  )

  // faster-on-hover interval
  const hoverIntervalRef = useRef<number | null>(null)
  const FAST_DELAY = 800 // “a bit faster” – tweak as you like

  useEffect(() => {
    if (!carouselApi) return

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollButtons()
    carouselApi.on('select', updateScrollButtons)

    return () => {
      carouselApi.off('select', updateScrollButtons)
    }
  }, [carouselApi])

  // cleanup interval on unmount, just in case
  useEffect(() => {
    return () => {
      if (hoverIntervalRef.current) {
        window.clearInterval(hoverIntervalRef.current)
        hoverIntervalRef.current = null
      }
    }
  }, [])

  const handleMouseEnter = () => {
    // stop normal autoplay and start faster ticking
    autoplay.current?.stop?.()
    if (!hoverIntervalRef.current) {
      hoverIntervalRef.current = window.setInterval(() => {
        carouselApi?.scrollNext()
      }, FAST_DELAY)
    }
  }

  const handleMouseLeave = () => {
    // clear faster ticking and resume normal autoplay
    if (hoverIntervalRef.current) {
      window.clearInterval(hoverIntervalRef.current)
      hoverIntervalRef.current = null
    }
    autoplay.current?.play?.()
  }

  return (
    // bg-[#FCF4EB]
    <section
      className="container-padding-y w-full"
      style={{
        backgroundColor: data?.backgroundColor || '',
      }}
    >
      <h2
        className="uppercase global-h2 font-semibold text-[#3A3A3C] container-padding-x 
       mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12"
      >
        <LocalizedHighlighted
          textEn={data?.title}
          textBn={data?.titleBN}
          highlightEn={data?.highlightedText}
          highlightBn={data?.highlightedTextBN}
        />
      </h2>

      {/* Wrap the carousel to capture hover */}
      <div>
        <Carousel
          opts={{ align: 'start', dragFree: true }}
          plugins={[autoplay.current]}
          setApi={setCarouselApi}
          className="w-full container-padding-x"
        >
          <CarouselContent
            className="gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {data?.partners?.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/5  
                 pl-4  "
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative w-full aspect-[14/10] flex items-center justify-center ">
                    {/* {typeof item?.image === 'object' && item?.image?.url && ( */}
                    <Image
                      fill
                      //   src={item.image?.url}
                      src={item.image}
                      alt={item.name}
                      className="object-contain object-center w-full h-full"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      //   placeholder="blur"
                      //   blurDataURL={item?.imageBlurDataURL || ''}
                      //   quality={80}
                    />
                    {/* )} */}
                  </div>
                  <p className="global-p2 font-semibold text-center text-[#374151] uppercase">
                    <LocalizedText en={item?.name} bn={item?.nameBN} />
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <div className="flex gap-2 justify-center mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
            <CarouselNavButtons
              onPrev={() => carouselApi?.scrollPrev()}
              onNext={() => carouselApi?.scrollNext()}
              hasPrev={canScrollPrev}
              hasNext={canScrollNext}
            />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default PartnerCarousel
