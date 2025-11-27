'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { BenefitSliderSectionData } from '@/types'

import { useEffect, useState } from 'react'

import { sliderDelay } from '@/lib/data'
import CarouselNavButtons from '../CarousalNavButtons'
import BenefitSliderItem from './CorporateCardItem'
import Autoplay from 'embla-carousel-autoplay'
import LocalizedText from '../LocalizedText'

type Props = {
  data: BenefitSliderSectionData
  basis?: string
  bgColor?: string
}

function BenefitSliderSection({ data, basis, bgColor }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!carouselApi) return
    if (hoveredIdx !== null) return // Pause autoplay when hovering

    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext()
      } else {
        carouselApi.scrollTo(0) // Loop back to first slide
      }
    }, sliderDelay)

    return () => clearInterval(interval)
  }, [carouselApi, hoveredIdx])

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

  return (
    <div className={`container-padding ${bgColor ? bgColor : ''} `}>
      <div className="space-y-6 md:space-y-10 lg:space-y-12 xl:space-y-16">
        {/* heading */}
        <div className="">
          <div className="flex space-x-2">
            <h3 className="global-h2 uppercase font-bold text-[#434343]">
              <LocalizedText en={data?.title} bn={data?.titleBN} />
            </h3>{' '}
            <h3 className="global-h2 uppercase font-bold text-[#ED7125]">
              <LocalizedText en={data?.coloredTitle} bn={data?.coloredTitleBN} />
            </h3>
          </div>
          <div className="global-span text-[#434343] font-light">
            <LocalizedText en={data?.description} bn={data?.descriptionBN} />
          </div>
        </div>
        {/* carousal */}
        <Carousel
          className="w-full"
          setApi={setCarouselApi}
          // plugins={[
          //   Autoplay({
          //     delay: sliderDelay,
          //   }),
          // ]}
        >
          <CarouselContent className="-ml-1">
            {data?.item?.map((item, index) => (
              <CarouselItem
                key={index}
                className={`pl-1 
               ${basis ? basis : ' basis-1/2 md:basis-1/3 lg:basis-1/3'} 
              pr-1 lg:pr-2 xl:pr-6 2xl:pr-10`}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <BenefitSliderItem data={item} />
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
    </div>
  )
}

export default BenefitSliderSection
