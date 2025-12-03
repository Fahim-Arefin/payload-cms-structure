'use client'

import React, { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import ResourceCard from './ResourceCard'
import { CareerResourceDataType } from '@/types'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import Autoplay from 'embla-carousel-autoplay'
import LocalizedText from '../shared/LocalizedText'
import { CareerPageResourcesBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { sliderDelay } from '@/lib/data'

type CareerResourceSectionProps = {
  data: CareerPageResourcesBlockType
}

export function CareerResourceSection({ data }: CareerResourceSectionProps) {
  const [desktopCarouselApi, setDesktopCarouselApi] = useState<CarouselApi | null>(null)
  const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrevDesktop, setCanScrollPrevDesktop] = useState(false)
  const [canScrollNextDesktop, setCanScrollNextDesktop] = useState(false)
  const [canScrollPrevMobile, setCanScrollPrevMobile] = useState(false)
  const [canScrollNextMobile, setCanScrollNextMobile] = useState(false)

  // Desktop carousel nav logic
  useEffect(() => {
    if (!desktopCarouselApi) return
    const updateScrollButtons = () => {
      setCanScrollPrevDesktop(desktopCarouselApi.canScrollPrev())
      setCanScrollNextDesktop(desktopCarouselApi.canScrollNext())
    }
    updateScrollButtons()
    desktopCarouselApi.on('select', updateScrollButtons)
    return () => {
      void desktopCarouselApi.off('select', updateScrollButtons)
    }
  }, [desktopCarouselApi])

  // Mobile carousel nav logic
  useEffect(() => {
    if (!mobileCarouselApi) return

    const updateScrollButtons = () => {
      setCanScrollPrevMobile(mobileCarouselApi.canScrollPrev())
      setCanScrollNextMobile(mobileCarouselApi.canScrollNext())
    }

    updateScrollButtons()
    mobileCarouselApi.on('select', updateScrollButtons)

    // Always cleanup
    return () => {
      mobileCarouselApi.off('select', updateScrollButtons)
    }
  }, [mobileCarouselApi])

  return (
    <>
      {typeof data?.backgroundImage === 'object' && data?.backgroundImage?.url && (
        <div className="relative w-full flex flex-col items-center container-padding bg-white overflow-hidden">
          {/* Absolute Human Resource Image - Top Right */}
          <div
            className="hidden lg:block absolute right-4 md:right-8 xl:right-60 top-8 z-0 pointer-events-none select-none 
          md:w-[400px] xl:w-[585px]
          aspect-[585/390]"
          >
            <Image
              src={data?.backgroundImage?.url || ''}
              alt="Human Resource"
              fill
              blurDataURL={data?.backgroundImageBlurDataURL || ''}
              className=""
              placeholder="blur"
              quality={85}
              draggable={false}
              style={{ userSelect: 'none' }}
            />
          </div>
          {/* Mobile: Human resource image background */}
          <div className="block lg:hidden absolute -right-5 top-8 w-[88vw] max-w-[370px] z-0 pointer-events-none select-none">
            <Image
              src={data?.backgroundImage?.url || ''}
              alt="Human Resource"
              width={350}
              height={220}
              blurDataURL={data?.backgroundImageBlurDataURL || ''}
              className=""
              placeholder="blur"
              quality={85}
              draggable={false}
              style={{ userSelect: 'none' }}
            />
          </div>
          {/* Section Title */}
          <div className="mb-7 sm:mb-10 relative z-10 w-full max-w-[1250px]">
            <h3 className="text-[#434342] font-light text-[16px] md:text-[20px] xl:text-[24px]">
              <LocalizedText en={data?.title} bn={data?.titleBN} />
            </h3>
            <div className="flex items-center gap-2 mt-[-4px] font-semibold global-h1">
              <LocalizedHighlighted
                textEn={data?.subTitle}
                textBn={data?.subTitleBN}
                highlightEn={data?.highlightedSubTitle}
                highlightBn={data?.highlightedSubTitleBN}
              />
            </div>
          </div>

          {/* Cards carousel for all screens */}
          <div className="w-full flex justify-center pl-4 xl:pl-20">
            {/* Large screens: Carousel with 2 visible cards per slide */}
            <div className="hidden lg:block w-full z-10 mb-12 relative">
              <Carousel
                opts={{ align: 'start' }}
                setApi={setDesktopCarouselApi}
                plugins={[
                  Autoplay({
                    delay: sliderDelay,
                  }),
                ]}
              >
                <CarouselContent className="gap-12 xl:gap-20">
                  {data?.cards?.map((item, idx) => (
                    <CarouselItem
                      key={idx}
                      className="
                    basis-[46%] max-w-[540px] 2xl:max-w-[600px] shrink-0
                    pl-16
                    py-12
                    flex justify-center
                    transition-all
                  "
                    >
                      <ResourceCard
                        data={item}
                        readMoreButtonText={data.readMoreButtonText ?? 'Read More'}
                        readMoreButtonTextBN={data.readMoreButtonTextBN ?? 'আরও পড়ুন'}
                        readLessButtonText={data.readLessButtonText ?? 'Read Less'}
                        readLessButtonTextBN={data.readLessButtonTextBN ?? 'কম পড়ুন'}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Carousel navigation at bottom center (lg+) */}
                <div
                  className="hidden lg:flex gap-2 absolute
                inset-x-0 justify-center -bottom-12"
                >
                  <CarouselNavButtons
                    onPrev={() => desktopCarouselApi?.scrollPrev()}
                    onNext={() => desktopCarouselApi?.scrollNext()}
                    hasPrev={canScrollPrevDesktop}
                    hasNext={canScrollNextDesktop}
                  />
                </div>
              </Carousel>
            </div>

            {/* Mobile/Tablet carousel (as before) */}
            <div className="block lg:hidden w-full z-10 mb-10">
              <Carousel opts={{ loop: true }} setApi={setMobileCarouselApi}>
                <CarouselContent>
                  {data?.cards?.map((item, idx) => (
                    <CarouselItem key={idx} className="px-16 pb-16 h-full">
                      <ResourceCard
                        data={item}
                        readMoreButtonText={data.readMoreButtonText || 'Read More'}
                        readMoreButtonTextBN={data.readMoreButtonTextBN || 'আরও পড়ুন'}
                        readLessButtonText={data.readLessButtonText || 'Read Less'}
                        readLessButtonTextBN={data.readLessButtonTextBN || 'কম পড়ুন'}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Carousel navigation at bottom center */}
                <div
                  className="flex lg:hidden gap-2 absolute
                inset-x-0 justify-center -bottom-10"
                >
                  <CarouselNavButtons
                    onPrev={() => mobileCarouselApi?.scrollPrev()}
                    onNext={() => mobileCarouselApi?.scrollNext()}
                    hasPrev={canScrollPrevMobile}
                    hasNext={canScrollNextMobile}
                  />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
