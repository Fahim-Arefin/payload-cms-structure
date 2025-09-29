'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { PartnerType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import Autoplay from 'embla-carousel-autoplay'
import { sliderDelay } from '@/lib/data'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

type Props = { data: PartnerType[] }

function PartnerCarousel({ data }: Props) {
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
    <section className="w-full py-5 md:py-10 lg:py-16 bg-[#FCF4EB]">
      <h2
        className="global-h2 font-semibold text-[#3A3A3C] mb-6 px-5 py-2  
           md:px-24 
           lg:px-[130px]  lg:pt-[100px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[100px]"
      >
        <LocalizedHighlighted
          textEn={`OUR VALUED CLIENTS`}
          textBn={`আমাদের সম্মানিত ক্লায়েন্টবৃন্দ`}
          highlightEn={`OUR VALUED`}
          highlightBn={`আমাদের সম্মানিত`}
          highlightClassName="text-[#ED7125]"
        />
      </h2>

      {/* Wrap the carousel to capture hover */}
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Carousel
          opts={{ align: 'start', dragFree: true }}
          plugins={[autoplay.current]}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-[150px] h-[100px] md:w-[200px] md:h-[120px] lg:w-[340px] lg:h-[250px] flex items-center justify-center ">
                  <img
                    src={item.img}
                    alt={item.title}
                    width={340}
                    height={250}
                    className="object-contain w-full h-full"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                </div>
                <p className="text-xs font-semibold text-center text-black uppercase">
                  {item.title}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <div className="flex md:hidden gap-2 justify-center m-6">
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
