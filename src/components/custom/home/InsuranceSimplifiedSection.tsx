'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import InsuranceSimplifiedLargeSection from './InsuranceSimplifiedLargeSection'
import { LifeInsuranceSimplifiedBlockType } from '@/types/payloadCustomTypes'

type Props = {
  // data: InsuranceDataType[]
  data: LifeInsuranceSimplifiedBlockType['sections']
  heading: string | null | undefined
  headingBN: string | null | undefined
  sectionHeadingHighlightedText: string | null | undefined
  sectionHeadingHighlightedTextBN: string | null | undefined
}

function InsuranceSimplifiedSection({
  data,
  heading,
  headingBN,
  sectionHeadingHighlightedText,
  sectionHeadingHighlightedTextBN,
}: Props) {
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
    <div className="">
      {/* headline */}
      <div className="w-[95%] mx-auto">
        {/* <h1
          className="global-h1 uppercase font-semibold space-x-2 md:space-x-4 
            mb-[15px] md:mb-[30px] lg:mb-[40px] xl:mb-[80px]"
        >
          {highlightText(heading || '', sectionHeadingHighlightedText || '', {
            highlightClassName: 'text-[#ED7125]',
            all: false,
          })}
        </h1> */}
        <LocalizedHighlighted
          as="h1"
          className="global-h1 uppercase font-semibold space-x-2 md:space-x-4 mb-[15px] md:mb-[30px] lg:mb-[40px] xl:mb-[80px]"
          textEn={heading}
          textBn={headingBN}
          highlightEn={sectionHeadingHighlightedText}
          highlightBn={sectionHeadingHighlightedTextBN}
          highlightClassName="text-[#ED7125]"
        />
      </div>
      <Carousel
        className="w-[95%] mx-auto"
        setApi={setCarouselApi}
        plugins={[
          Autoplay({
            delay: sliderDelay,
          }),
        ]}
      >
        <CarouselContent>
          {data?.map((item, index) => (
            <CarouselItem key={index}>
              <InsuranceSimplifiedLargeSection
                data={item}
                content={index % 2 === 0 ? 'left' : 'right'}
                heading={heading}
                sectionHeadingHighlightedText={sectionHeadingHighlightedText}
                headingBN={headingBN}
                sectionHeadingHighlightedTextBN={sectionHeadingHighlightedTextBN}
                index={index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation */}
        <div
          className="flex gap-2 absolute h-fit
                  inset-x-0 justify-center lg:justify-end -bottom-12 md:-bottom-20 lg:-top-8 2xl:-top-12 lg:right-0"
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
  )
}

export default InsuranceSimplifiedSection
