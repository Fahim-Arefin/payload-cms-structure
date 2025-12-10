'use client'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
// import Link from 'next/link'
import { sliderDelay } from '@/lib/data'
import CueHeader from '../home/CueHeader'
import CueItem from '../home/CueItem'
import { MicroinsuranceServiceBlockType } from '@/types/payloadCustomTypes'
import CueItem2 from './CueItem2'
import CueHeaderTwo from '../home/CueHeaderTwo'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import { useEffect, useRef, useState } from 'react'
// import GlobalButton from '../GlobalButton'
// import LocalizedString from '../LocalizedString'

type Props = {
  data: MicroinsuranceServiceBlockType
  bg?: string
}

function OnYourCueSection3({ data, bg }: Props) {
  const cards = (Array.isArray(data?.plans) ? data?.plans : (data?.plans as any)?.cards) ?? []
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const hoverIntervalRef = useRef<number | null>(null)
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
  return (
    // <div className="container-width md:container-padding-y">
    <div className="container-width container-padding-y px-2 lg:px-0">
      <CueHeaderTwo data={data} />
      {/* Mobile View: Grid */}
      {/* <div className="block md:hidden space-y-4">
        {cards.map((card: any, index: number) => (
          <CueItem2 key={index} data={data} card={card as any} index={index} bg={bg} />
        ))}
      </div> */}

      {/* Desktop View: Carousel */}
      <div className="">
        <Carousel
          className="w-full"
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            // loop: true,
          }}
          plugins={[]}
        >
          <CarouselContent className="-ml-4">
            {cards.map((card: any, index: number) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CueItem2 card={card as any} data={data} index={index} bg={bg} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Top Center Controls */}
          {cards.length > 3 && (
            <div className="flex gap-2 justify-center mt-6">
              <CarouselNavButtons
                onPrev={() => carouselApi?.scrollPrev()}
                onNext={() => carouselApi?.scrollNext()}
                hasPrev={canScrollPrev}
                hasNext={canScrollNext}
              />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default OnYourCueSection3
