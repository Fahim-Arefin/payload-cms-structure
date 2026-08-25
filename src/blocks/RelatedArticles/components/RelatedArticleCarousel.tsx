// 'use client'

// import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
// import { Article, ArticleTag } from '@/payload-types'
// import { RelatedArticlesBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import ArrowRight from 'public/assets/icons/arrowright.png'
// import React, { useMemo, useRef, useState } from 'react'
// import ArticleCard from '../../AllArticles/components/ArticleCard'
// import Autoplay from 'embla-carousel-autoplay'
// import { sliderDelay } from '@/lib/data'
// type ArticleItem = NonNullable<Article['articles']>[number]

// type Props = {
//   block: RelatedArticlesBlockType
//   articles: ArticleItem[]
//   tagsData: ArticleTag
// }

// function RelatedArticleCarousel({ block, articles, tagsData }: Props) {
//   const autoplayPlugin = useRef(
//     Autoplay({
//       delay: sliderDelay,
//       stopOnInteraction: false,
//       stopOnMouseEnter: true,
//     }),
//   )
//   const [api, setApi] = useState<CarouselApi>()

//   const carouselItems = useMemo(() => {
//     return articles.filter((item) => item?.id)
//   }, [articles])

//   const shouldLoop = carouselItems.length > 3

//   if (!carouselItems.length) return null

//   return (
//     <div className="relative w-full">
//       <Carousel
//         setApi={setApi}
//         opts={{
//           align: 'start',
//           loop: shouldLoop,
//         }}
//         className="w-full"
//         plugins={[autoplayPlugin.current]}
//       >
//         <CarouselContent
//           className="
//             -ml-[16px]
//             md:-ml-[20px]
//             lg:-ml-[20px]
//             xl:-ml-[30px]
//           "
//         >
//           {carouselItems.map((article, index) => (
//             <CarouselItem
//               key={article?.id ?? index}
//               className="
//                 basis-full pl-[16px]
//                 md:basis-1/2 md:pl-[20px]
//                 xl:basis-1/3 xl:pl-[30px]
//               "
//             >
//               <ArticleCard
//                 data={article}
//                 tagsData={tagsData}
//                 block={block as any}
//                 hideDescription
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>

//       <div
//         className="
//           mt-[24px] flex items-center justify-center gap-[12px]
//           md:mt-[28px]
//           xl:mt-[34px]
//         "
//       >
//         <button
//           type="button"
//           aria-label="Previous related article"
//           onClick={() => api?.scrollPrev()}
//           className="
//             flex items-center justify-center
//             rounded-full bg-primary-1/35
//             shadow-[0_10px_24px_rgba(0,108,103,0.18)]
//             backdrop-blur-[10px]
//             transition-all duration-300 ease-out
//             hover:bg-primary-1
//             active:scale-95
//             size-[34px]
//             md:size-[38px]
//             xl:size-[44px]
//           "
//         >
//           <Image
//             src={ArrowRight}
//             alt=""
//             width={18}
//             height={18}
//             className="
//               rotate-180 object-contain
//               h-[12px] w-[12px]
//               md:h-[14px] md:w-[14px]
//               xl:h-[16px] xl:w-[16px]
//             "
//             placeholder="blur"
//             blurDataURL={ArrowRight.blurDataURL}
//             quality={95}
//           />
//         </button>

//         <button
//           type="button"
//           aria-label="Next related article"
//           onClick={() => api?.scrollNext()}
//           className="
//             flex items-center justify-center
//             rounded-full bg-primary-1/35
//             shadow-[0_10px_24px_rgba(0,108,103,0.18)]
//             backdrop-blur-[10px]
//             transition-all duration-300 ease-out
//             hover:bg-primary-1
//             active:scale-95
//             size-[34px]
//             md:size-[38px]
//             xl:size-[44px]
//           "
//         >
//           <Image
//             src={ArrowRight}
//             alt=""
//             width={18}
//             height={18}
//             className="
//               object-contain
//               h-[12px] w-[12px]
//               md:h-[14px] md:w-[14px]
//               xl:h-[16px] xl:w-[16px]
//             "
//             placeholder="blur"
//             blurDataURL={ArrowRight.blurDataURL}
//             quality={95}
//           />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default RelatedArticleCarousel

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
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
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
