import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { Article, ArticleTag } from '@/payload-types'
import { AllArticlesBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useMemo } from 'react'
import ArticleCardCTA from './ArticleCardCTA'
import { buildNewsHref } from '@/lib/utils'
import Link from 'next/link'
import LineImage from 'public/assets/images/Line.png'

type Props = {
  block: AllArticlesBlockType
  data: NonNullable<Article['articles']>[number]
  tagsData: ArticleTag
  detailsPage?: boolean
  hideDescription?: boolean
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

function ArticleCard({
  block,
  data,
  tagsData,
  detailsPage = false,
  hideDescription = false,
}: Props) {
  const selectedTags = useMemo<TagItem[]>(() => {
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
  }, [data, tagsData?.tags])

  const ctaButton = block?.articleCta?.ctaButtons?.[0]
  const articleHref = buildNewsHref({
    buttonLink: ctaButton?.buttonLink,
    sectionId: ctaButton?.sectionId,
    itemId: data?.id || '',
    detail: !detailsPage,
  })
  return (
    <div
      className="
        group/article-card
        flex h-full flex-col
        bg-white-2
        border-2 border-primary-1/30
        rounded-sm lg:rounded-[6px] xl:rounded-[8px]
        p-5 md:p-4 lg:p-7 2xl:p-9
        transition-all duration-300 ease-out
        hover:border-primary-1
        hover:shadow-[0_18px_50px_rgba(0,108,103,0.12)]
      "
    >
      {/* card image */}
      {/* <div className="relative w-full aspect-[310/182] overflow-hidden rounded-sm lg:rounded-[6px] xl:rounded-[8px]">
        {typeof data?.cardImage === 'object' && data?.cardImage?.url && (
          <Image
            src={data.cardImage.url}
            alt={data?.title || 'Article card image'}
            fill
            className="
              h-full w-full object-cover object-center
              rounded-sm lg:rounded-[6px] xl:rounded-[8px]
              transition-transform duration-500 ease-out
              group-hover/article-card:scale-[1.04]
            "
            quality={100}
            sizes="(max-width: 767px) 100vw, (max-width: 1439px) 33vw, 420px"
            placeholder={data?.cardImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={data?.cardImageBlurDataURL || undefined}
          />
        )}
      </div> */}
      <Link
        href={articleHref}
        aria-label={data?.title ? `Read article: ${data.title}` : 'Read article'}
        className="
    relative block w-full aspect-[310/182]
    overflow-hidden rounded-sm
    outline-none
    lg:rounded-[6px]
    xl:rounded-[8px]
  "
      >
        {typeof data?.cardImage === 'object' && data?.cardImage?.url && (
          <Image
            src={data.cardImage.url}
            alt={data?.title || 'Article card image'}
            fill
            className="
        h-full w-full object-cover object-center
        rounded-sm lg:rounded-[6px] xl:rounded-[8px]
        transition-transform duration-500 ease-out
        group-hover/article-card:scale-[1.04]
      "
            quality={100}
            sizes="(max-width: 767px) 100vw, (max-width: 1439px) 33vw, 420px"
            placeholder={data?.cardImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={data?.cardImageBlurDataURL || undefined}
          />
        )}
      </Link>
      {/* tags + date */}
      <div className="mt-[18px] flex items-center justify-between gap-4 xl:mt-[22px] 2xl:mt-[24px]">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {selectedTags.map((tag, index) => (
            <span
              key={tag?.key ?? tag?.id ?? index}
              className="
                inline-flex items-center justify-center
                rounded-[4px]
                border border-primary-1
                px-[8px] py-[3px]
                font-grift font-semibold global-p5
                text-secondary-1
                transition-all duration-300 ease-out
                group-hover/article-card:bg-primary-1
                group-hover/article-card:border-primary-1
                group-hover/article-card:text-white-1
              "
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="shrink-0 font-grift font-semibold global-p5 text-secondary-2">
          {formatPublishDate(data?.publishDate)}
        </div>
      </div>

      {/* title */}
      {/* {data?.title && (
        <div
          className="
            mt-[18px]
            font-agency text-secondary-1 global-h7
            transition-colors duration-300
            group-hover/article-card:text-primary-1
            xl:mt-[22px]
          "
        >
          {data.title}
        </div>
      )} */}

      {data?.title && (
        <Link
          href={articleHref}
          className="
      mt-[18px]
      block
      font-agency text-secondary-1 global-h7
      transition-colors duration-300
      outline-none
      group-hover/article-card:text-primary-1
      hover:text-primary-1
      xl:mt-[22px]
    "
        >
          {data.title}
        </Link>
      )}
      {/* description */}
      {!hideDescription && data?.description && (
        <div className="mt-[12px] font-grift text-secondary-2 line-clamp-3 global-p5">
          <LocalizedRichText bn={data.description} en={data.description} />
        </div>
      )}

      {/* bottom */}
      <div className="mt-auto pt-[16px] lg:pt-[22px] xl:pt-[26px] 2xl:pt-[30px]">
        {/* horizontal line */}
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
          <ArticleCardCTA ctaButton={ctaButton} itemId={data?.id || ''} detailsPage={detailsPage} />

          {data?.estimatedReadingTime && (
            <div className="shrink-0 font-grift text-secondary-2 global-p5 font-bold">
              {data.estimatedReadingTime}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
