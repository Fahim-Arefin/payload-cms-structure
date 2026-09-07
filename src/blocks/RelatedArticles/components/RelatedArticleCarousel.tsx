'use client'

import CarouselArrowButton from '@/components/custom/sagar-ropes-shared/buttons/CarouselArrowButton'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { Article, ArticleTag } from '@/payload-types'
import { RelatedArticlesBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ArticleCard from '../../AllArticles/components/ArticleCard'

type ArticleItem = NonNullable<Article['articles']>[number]

type Props = {
  block: RelatedArticlesBlockType
  articles: ArticleItem[]
  tagsData: ArticleTag
}

function RelatedArticleCarousel({ block, articles, tagsData }: Props) {
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
    return articles.filter((item) => item?.id)
  }, [articles])

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
        className="w-full"
        plugins={hasMultiple ? [autoplayPlugin.current] : []}
      >
        <CarouselContent
          className="
            -ml-[16px]
            md:-ml-[20px]
            lg:-ml-[20px]
            xl:-ml-[30px]
          "
        >
          {carouselItems.map((article, index) => (
            <CarouselItem
              key={article?.id ?? index}
              className="
                basis-full pl-[16px]
                md:basis-1/2 md:pl-[20px]
                xl:basis-1/3 xl:pl-[30px]
              "
            >
              <ArticleCard
                data={article}
                tagsData={tagsData}
                block={block as any}
                hideDescription
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {shouldShowArrows && (
        <div
          className="
            mt-[24px] flex items-center justify-center gap-[12px]
            md:mt-[28px]
            xl:mt-[34px]
          "
        >
          <CarouselArrowButton
            direction="prev"
            ariaLabel="Previous related article"
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
            ariaLabel="Next related article"
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

export default RelatedArticleCarousel
