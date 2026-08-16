import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { News, NewsTag } from '@/payload-types'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useMemo } from 'react'
import ArticleCardCTA from '../../AllArticles/components/ArticleCardCTA'

import LineImage from 'public/assets/images/Line.png'

type NewsItem = NonNullable<News['news']>[number]

type Props = {
  block: AllNewsBlockType
  data: NewsItem
  tagsData: NewsTag
  showDivider?: boolean
}

type TagItem = {
  id?: string | null
  label?: string | null
  key?: string | null
}

const eventStatusLabelMap: Record<string, string> = {
  'upcoming-events': 'Upcoming Events',
  'todays-events': 'Todays Events',
  'past-events': 'Past Events',
}

function formatNewsDate(dateValue?: string | Date | null) {
  if (!dateValue) return ''

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function getSelectedTags(data: NewsItem, tagsData: NewsTag): TagItem[] {
  const dataAny = data as any

  if (Array.isArray(dataAny?.tags) && dataAny.tags.length) {
    return dataAny.tags.filter((tag: TagItem) => tag?.label && tag?.key)
  }

  const selectedTagKeys = Array.isArray(dataAny?.tagKeys)
    ? dataAny.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
    : []

  if (!selectedTagKeys.length) return []

  const allTags = Array.isArray(tagsData?.tags) ? tagsData.tags : []

  return allTags.filter((tag: TagItem) => tag?.key && selectedTagKeys.includes(tag.key))
}

function NewsCard({ block, data, tagsData, showDivider = true }: Props) {
  //   const selectedTags = useMemo(() => getSelectedTags(data, tagsData), [data, tagsData])
  const selectedTags = useMemo<TagItem[]>(() => getSelectedTags(data, tagsData), [data, tagsData])

  const ctaButton = block?.newsCta?.ctaButtons?.[0]
  const eventStatusLabel =
    eventStatusLabelMap[String((data as any)?.eventStatus || '')] || 'Upcoming Events'

  return (
    <article
      className={`
        group/news-card
        grid grid-cols-1
        gap-[18px]
        py-[12px] md:py-[26px] xl:py-[36px] 2xl:py-[50px] 
        md:grid-cols-[90px_minmax(0,1fr)]
        md:gap-[24px]
        lg:grid-cols-[120px_minmax(0,1fr)_265px]
        lg:gap-[30px]
        xl:grid-cols-[140px_minmax(0,1fr)_302px]
        xl:gap-[36px]
        2xl:grid-cols-[154px_minmax(0,1fr)_340px]
        2xl:gap-[44px]
        ${showDivider ? 'border-b border-primary-1/55' : ''}
      `}
    >
      {/* left date */}
      <div
        className="
          font-grift global-p5 font-bold
          text-primary-1
          md:pt-[6px]
          lg:pt-[8px]
        "
      >
        {formatNewsDate(data?.publishDate)}
      </div>

      {/* middle content */}
      <div className="flex min-w-0 flex-col">
        {/* tags + event status */}
        <div
          className="
            mb-[8px]
            flex items-start justify-between
            gap-[18px]
          "
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {selectedTags.map((tag: TagItem, index: number) => (
              <span
                key={tag?.key ?? tag?.id ?? index}
                className="
      inline-flex items-center justify-center
      rounded-[4px]
      border border-primary-1
      px-[8px] py-[3px]
      font-grift global-p5 font-semibold
      text-primary-1
      transition-all duration-300 ease-out
      group-hover/news-card:border-primary-2
      group-hover/news-card:bg-primary-2
      group-hover/news-card:text-secondary-1
    "
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div
            className="
              shrink-0
              font-grift global-p5 font-bold
              text-primary-1
            "
          >
            {eventStatusLabel}
          </div>
        </div>

        {data?.title && (
          <h3
            className="
              font-agency global-h5
              text-secondary-1
              transition-colors duration-300
              group-hover/news-card:text-primary-1
            "
          >
            {data.title}
          </h3>
        )}

        {data?.description && (
          <div
            className="
              mt-[12px]
              font-grift global-p4
              text-secondary-1
              line-clamp-3
            "
          >
            <LocalizedRichText bn={data.description} en={data.description} />
          </div>
        )}

        <div className="mt-auto pt-[16px] md:pt-[18px] lg:pt-[20px]">
          <div className="relative h-px w-full overflow-hidden">
            <Image
              src={LineImage}
              alt=""
              fill
              className="object-fill object-center opacity-70"
              placeholder="blur"
              blurDataURL={LineImage.blurDataURL}
              quality={95}
            />
          </div>

          <div className="mt-[12px] flex items-center justify-between gap-4">
            <ArticleCardCTA ctaButton={ctaButton} itemId={data?.id || ''} />

            {data?.estimatedReadingTime && (
              <div
                className="
                  shrink-0
                  font-grift global-p5 font-bold
                  text-secondary-2
                "
              >
                {data.estimatedReadingTime}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* right image */}
      <div
        className="
          flex min-w-0 flex-col
          md:col-start-2
          lg:col-start-auto
        "
      >
        <div
          className="
            relative w-full
            aspect-[265/302]
            overflow-hidden
            rounded-[6px]
            bg-primary-1/10
            xl:rounded-[8px]
          "
        >
          {typeof data?.cardImage === 'object' && data?.cardImage?.url && (
            <Image
              src={data.cardImage.url}
              alt={data?.title || 'News image'}
              fill
              className="
                h-full w-full object-cover object-center
                transition-transform duration-500 ease-out
                group-hover/news-card:scale-[1.04]
              "
              quality={100}
              sizes="
                (max-width: 767px) 100vw,
                (max-width: 1023px) 70vw,
                (max-width: 1439px) 265px,
                340px
              "
              placeholder={data?.cardImageBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.cardImageBlurDataURL || undefined}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export default NewsCard
