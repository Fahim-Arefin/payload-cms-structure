'use client'

import CarouselArrowButton from '@/components/custom/sagar-ropes-shared/buttons/CarouselArrowButton'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { Article } from '@/payload-types'
import { FeaturedArticleBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import FeaturedCard from './FeaturedCard'

type Props = {
  block: FeaturedArticleBlockType
  featuredArticles?: Article['articles']
  featuredArticle?: Article['articles']
  articles?: Article['articles']
  data?: Article['articles']
  detailsPage?: boolean
}

function FeaturedArticleCarousal({
  block,
  featuredArticles,
  featuredArticle,
  articles,
  data,
  detailsPage = false,
}: Props) {
  const autoplayPlugin = useRef(
    Autoplay({
      delay: sliderDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  )

  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const carouselItems = useMemo(() => {
    const articleItems = featuredArticles ?? featuredArticle ?? articles ?? data ?? []

    return Array.isArray(articleItems) ? articleItems.filter((item) => item?.id) : []
  }, [articles, data, featuredArticle, featuredArticles])

  const hasMultiple = carouselItems.length > 1
  const shouldShowArrows = hasMultiple && (canScrollPrev || canScrollNext)

  useEffect(() => {
    if (!api) return

    const updateArrowState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateArrowState()

    api.on('select', updateArrowState)
    api.on('reInit', updateArrowState)

    return () => {
      api.off('select', updateArrowState)
      api.off('reInit', updateArrowState)
    }
  }, [api])

  if (!carouselItems.length) return null

  return (
    <div className="relative w-full">
      {/* bottom glow */}
      <div
        className={` ${!shouldShowArrows && 'hidden'}
          pointer-events-none absolute left-1/2 z-0
          bottom-[-70px]
          h-[190px] w-[88%]
          -translate-x-1/2
          rounded-full bg-primary-1/50
          blur-[70px]
          md:bottom-[-86px] md:h-[230px] md:w-[78%] md:blur-[86px]
          lg:bottom-[-96px] lg:h-[260px] lg:w-[70%] lg:blur-[100px]
          xl:bottom-[-110px] xl:h-[300px] xl:w-[72%] xl:blur-[118px]
        `}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={hasMultiple ? [autoplayPlugin.current] : []}
        className="relative z-10 w-full"
      >
        <CarouselContent>
          {carouselItems.map((articleItem, index) => (
            <CarouselItem key={articleItem?.id ?? index} className="basis-full">
              <FeaturedCard block={block} data={articleItem} detailsPage={detailsPage} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {shouldShowArrows && (
        <div
          className="
            relative z-10
            mt-[24px] flex items-center justify-center gap-[12px]
            md:mt-[28px]
            xl:mt-[34px]
          "
        >
          <CarouselArrowButton
            direction="prev"
            ariaLabel="Previous featured article"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            buttonClassName="
              size-[34px]
              md:size-[38px]
              xl:size-[44px]
            "
          />

          <CarouselArrowButton
            direction="next"
            ariaLabel="Next featured article"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            buttonClassName="
              size-[34px]
              md:size-[38px]
              xl:size-[44px]
            "
          />
        </div>
      )}
    </div>
  )
}

export default FeaturedArticleCarousal
