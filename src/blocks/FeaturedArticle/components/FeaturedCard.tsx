import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { Article } from '@/payload-types'
import { FeaturedArticleBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useMemo } from 'react'
import ArticleCardCTA from '../../AllArticles/components/ArticleCardCTA'

import LineImage from 'public/assets/images/Line.png'

type Props = {
  block: FeaturedArticleBlockType
  data: NonNullable<Article['articles']>[number]
  detailsPage?: boolean
}

type TagItem = {
  id?: string | null
  label?: string | null
  key?: string | null
}

function formatPublishDate(dateValue?: string | Date | null) {
  if (!dateValue) return ''

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function FeaturedCard({ block, data, detailsPage = false }: Props) {
  const selectedTags = useMemo<TagItem[]>(() => {
    const dataAny = data as any

    if (Array.isArray(dataAny?.tags) && dataAny.tags.length) {
      return dataAny.tags.filter((tag: TagItem) => tag?.label && tag?.key)
    }

    return []
  }, [data])

  const ctaButton = block?.articleCta?.ctaButtons?.[0]

  return (
    <div
      className="
        group/featured-card
        mx-auto grid h-full w-full
        max-w-[1120px]
        grid-cols-1
        gap-[24px]
        rounded-[8px]
        border-2 border-primary-1/60
        bg-white-2
        p-[18px]
        transition-all duration-300 ease-out
        hover:border-primary-1
        hover:shadow-[0_18px_54px_rgba(0,108,103,0.14)]
        md:p-[24px]
        lg:grid-cols-[0.95fr_1fr]
        lg:items-center
        lg:gap-[44px]
        lg:p-[34px]
        xl:gap-[56px]
        xl:p-[38px]
        2xl:p-[42px]
      "
    >
      {/* image */}
      <div
        className="
          relative w-full
          aspect-[500/340]
          overflow-hidden
          rounded-[6px]
          bg-primary-1/10
          xl:rounded-[8px]
        "
      >
        {typeof data?.cardImage === 'object' && data?.cardImage?.url && (
          <Image
            src={data.cardImage.url}
            alt={data?.title || 'Featured article image'}
            fill
            className="
              h-full w-full object-cover object-center
              transition-transform duration-500 ease-out
              group-hover/featured-card:scale-[1.04]
            "
            quality={100}
            sizes="
              (max-width: 767px) 92vw,
              (max-width: 1023px) 80vw,
              (max-width: 1439px) 44vw,
              560px
            "
            placeholder={data?.cardImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={data?.cardImageBlurDataURL || undefined}
          />
        )}
      </div>

      {/* content */}
      <div className="flex min-w-0 flex-col">
        {/* tags + date */}
        <div
          className="
            flex items-center justify-between
            gap-[18px]
          "
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {selectedTags.map((tag, index) => (
              <span
                key={tag?.key ?? tag?.id ?? index}
                className="
                  inline-flex items-center justify-center
                  rounded-[4px]
                  border border-primary-1
                  px-[8px] py-[3px]
                  font-grift global-p5 font-semibold
                  text-secondary-1
                  transition-all duration-300 ease-out
                  group-hover/featured-card:border-primary-2
                  group-hover/featured-card:bg-primary-2
                "
              >
                {tag.label}
              </span>
            ))}
          </div>

          {data?.publishDate && (
            <div
              className="
                shrink-0
                font-grift global-p5 font-semibold
                text-secondary-2
              "
            >
              {formatPublishDate(data.publishDate)}
            </div>
          )}
        </div>

        {/* title */}
        {data?.title && (
          <div
            className="
              mt-[16px]
              font-agency global-h6
              text-secondary-1
              transition-colors duration-300
              group-hover/featured-card:text-primary-1
              md:mt-[18px]
              xl:mt-[20px]
            "
          >
            {data.title}
          </div>
        )}

        {/* description */}
        {data?.description && (
          <div
            className="
              mt-[12px]
              font-grift global-p5
              text-secondary-2
              line-clamp-3
              md:mt-[14px]
            "
          >
            <LocalizedRichText bn={data.description} en={data.description} />
          </div>
        )}

        {/* bottom */}
        <div className="mt-auto pt-[18px] lg:pt-[22px] xl:pt-[26px]">
          <div className="relative h-px w-full overflow-hidden">
            <Image
              src={LineImage}
              alt=""
              fill
              className="object-fill object-center opacity-75"
              placeholder="blur"
              blurDataURL={LineImage.blurDataURL}
              quality={95}
            />
          </div>

          <div className="mt-[12px] flex items-center justify-between gap-4">
            <ArticleCardCTA
              ctaButton={ctaButton}
              itemId={data?.id || ''}
              detailsPage={detailsPage}
            />

            {data?.estimatedReadingTime && (
              <div className="shrink-0 font-grift text-secondary-2 global-p5 font-bold">
                {data.estimatedReadingTime}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCard
