'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Article } from '@/payload-types'
import { FeaturedArticleBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import ArrowRight from 'public/assets/icons/arrowright.png'
import React, { useMemo, useRef, useState } from 'react'
import FeaturedCard from './FeaturedCard'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'

type Props = {
  block: FeaturedArticleBlockType
  feturedArticles: Article['articles']
}

function FeaturedArticleCarousal({ block, feturedArticles }: Props) {
  const autoplayPlugin = useRef(
    Autoplay({
      delay: sliderDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  )
  const [api, setApi] = useState<CarouselApi>()

  const carouselItems = useMemo(() => {
    return Array.isArray(feturedArticles) ? feturedArticles.filter((item) => item?.id) : []
  }, [feturedArticles])

  const shouldLoop = carouselItems.length > 1

  if (!carouselItems.length) return null

  return (
    <div className="relative w-full">
      {/* bottom glow */}
      <div
        className="
          pointer-events-none absolute left-1/2 z-0
          bottom-[-70px]
          h-[190px] w-[88%]
          -translate-x-1/2
          rounded-full bg-primary-1/25
          blur-[70px]
          md:bottom-[-86px] md:h-[230px] md:w-[78%] md:blur-[86px]
          lg:bottom-[-96px] lg:h-[260px] lg:w-[70%] lg:blur-[100px]
          xl:bottom-[-110px] xl:h-[300px] xl:w-[62%] xl:blur-[118px]
        "
      />

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: shouldLoop,
        }}
        className="relative z-10 w-full"
        plugins={[autoplayPlugin.current]}
      >
        <CarouselContent>
          {carouselItems.map((article, index) => (
            <CarouselItem key={article?.id ?? index} className="basis-full">
              <FeaturedCard block={block} data={article} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div
        className="
          relative z-10
          mt-[24px] flex items-center justify-center gap-[12px]
          md:mt-[28px]
          xl:mt-[34px]
        "
      >
        <button
          type="button"
          aria-label="Previous featured article"
          onClick={() => api?.scrollPrev()}
          className="
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
          aria-label="Next featured article"
          onClick={() => api?.scrollNext()}
          className="
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
    </div>
  )
}

export default FeaturedArticleCarousal
