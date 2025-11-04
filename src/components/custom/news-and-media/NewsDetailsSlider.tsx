'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import NewsSliderCard from './NewsSliderCard'
import { AllBlockCardType } from '@/types/payloadCustomTypes'
import { GlobalBlog } from '@/payload-types'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: GlobalBlog['blogs']
  block: AllBlockCardType
}

function NewsDetailsSlider({ data, block }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

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
    <div className="container-padding">
      <div>
        <h3 className="global-h3 font-normal uppercase">
          <LocalizedText en={block?.title} bn={block?.titleBN} />
        </h3>
        {/* carousal section */}
        <div className="mt-12 lg:mt-16 xl:mt-20 2xl:mt-32">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-[95%] mx-auto mb-12 lg:mb-0"
            setApi={setCarouselApi} // 👈 capture carousel API
            plugins={[
              Autoplay({
                delay: sliderDelay,
              }),
            ]}
          >
            <CarouselContent>
              {data?.map((item, index) => (
                <CarouselItem key={index} className="lg:basis-1/2 xl:basis-1/3 mx-auto lg:py-4">
                  <NewsSliderCard data={item} block={block} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel Navigation */}
            <div
              className="flex gap-2 absolute h-fit
            inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-8 2xl:-top-12 lg:right-0"
            >
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
    </div>
  )
}

export default NewsDetailsSlider
