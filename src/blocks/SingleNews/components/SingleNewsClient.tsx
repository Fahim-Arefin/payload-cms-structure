'use client'

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { News } from '@/payload-types'
import { SingleNewsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import ArticleCardCTA from '../../AllArticles/components/ArticleCardCTA'

type Props = {
  block: SingleNewsBlockType
  data: NonNullable<News['news']>[number]
}

type NewsTagRuntime = {
  id?: string | null
  label?: string | null
  key?: string | null
}

const eventStatusLabelMap: Record<string, string> = {
  'upcoming-events': 'Upcoming Events',
  'todays-events': 'Todays Events',
  'past-events': 'Past Events',
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

function getNewsTags(data: NonNullable<News['news']>[number]): NewsTagRuntime[] {
  const dataAny = data as any

  if (Array.isArray(dataAny?.tags) && dataAny.tags.length) {
    return dataAny.tags.filter((tag: NewsTagRuntime) => tag?.label && tag?.key)
  }

  return []
}

function SingleNewsClient({ block, data }: Props) {
  const [copied, setCopied] = useState(false)

  const newsTags = useMemo<NewsTagRuntime[]>(() => getNewsTags(data), [data])
  const ctaButton = block?.newsCta?.ctaButtons?.[0]

  const eventStatusLabel =
    eventStatusLabelMap[String((data as any)?.eventStatus || '')] || 'Upcoming Events'

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    if (!shareUrl) return

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          url: shareUrl,
        })

        return
      }

      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)

        window.setTimeout(() => {
          setCopied(false)
        }, 1800)
      }
    } catch {
      // User cancelled native share dialog or clipboard failed.
    }
  }

  return (
    <section
      className="
        container-padding
        py-[54px]
        md:py-[70px]
        lg:py-[86px]
        xl:py-[104px]
        2xl:py-[120px]
      "
    >
      <div className="mx-auto w-full max-w-[1180px]">
        {/* tags + publish date */}
        <div
          className="
            flex flex-wrap items-center gap-x-[18px] gap-y-[8px]
            md:gap-x-[22px]
          "
        >
          <div className="flex flex-wrap items-center gap-[8px]">
            {newsTags.map((tag, index) => (
              <span
                key={tag?.key ?? tag?.id ?? index}
                className="
                  inline-flex items-center justify-center
                  rounded-[4px]
                  border border-primary-2 bg-primary-2
                  px-[8px] py-[3px]
                  font-grift global-p5 font-semibold
                  text-secondary-1
                "
              >
                {tag.label}
              </span>
            ))}
          </div>

          {data?.publishDate && (
            <span
              className="
                font-grift global-p5 font-semibold
                text-secondary-1
              "
            >
              {formatPublishDate(data.publishDate)}
            </span>
          )}
        </div>

        {/* hero image with title */}
        <div
          className="
            group/single-news-hero
            relative mt-[18px]
            aspect-[1200/406]
            w-full overflow-hidden
            rounded-[8px]
            bg-primary-1/10
            md:mt-[22px]
            lg:mt-[26px]
            xl:rounded-[10px]
          "
        >
          {typeof data?.detailPageImage === 'object' && data?.detailPageImage?.url ? (
            <Image
              src={data.detailPageImage.url}
              alt={data?.title || 'News detail image'}
              fill
              className="
                h-full w-full object-cover object-center
                transition-transform duration-700 ease-out
                group-hover/single-news-hero:scale-[1.035]
              "
              quality={100}
              sizes="
                (max-width: 767px) 92vw,
                (max-width: 1023px) 88vw,
                (max-width: 1439px) 82vw,
                1180px
              "
              placeholder={data?.detailPageImageBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.detailPageImageBlurDataURL || undefined}
            />
          ) : null}

          <div
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(90deg,rgba(10,17,40,0.82)_0%,rgba(10,17,40,0.52)_42%,rgba(10,17,40,0.06)_100%)]
            "
          />

          {data?.title && (
            <h1
              className="
                absolute bottom-[22px] left-[20px] z-10
                max-w-[860px]
                font-agency global-h5
                text-white-1
                md:bottom-[30px] md:left-[32px]
                lg:bottom-[42px] lg:left-[42px]
                xl:bottom-[50px] xl:left-[52px]
              "
            >
              {data.title}
            </h1>
          )}
        </div>

        {/* rich text */}
        {data?.description && (
          <article
            className="
              mt-[30px]
              font-grift global-p4
              leading-[1.75]
              text-secondary-1
              md:mt-[38px]
              lg:mt-[46px]
              xl:mt-[54px]
              [&_p]:mb-[22px]
              [&_p:last-child]:mb-0
              [&_strong]:font-bold
              [&_h2]:mb-[16px]
              [&_h2]:mt-[32px]
              [&_h2]:font-agency
              [&_h2]:text-[36px]
              [&_h2]:leading-[1]
              [&_h2]:text-secondary-1
              [&_h3]:mb-[12px]
              [&_h3]:mt-[26px]
              [&_h3]:font-agency
              [&_h3]:text-[30px]
              [&_h3]:leading-[1]
              [&_h3]:text-secondary-1
              [&_ul]:mb-[22px]
              [&_ul]:list-disc
              [&_ul]:pl-[22px]
              [&_ol]:mb-[22px]
              [&_ol]:list-decimal
              [&_ol]:pl-[22px]
              [&_li]:mb-[8px]
            "
          >
            <LocalizedRichText bn={data.description} en={data.description} />
          </article>
        )}

        {/* bottom meta */}
        <div
          className="
            flex items-center justify-between gap-[18px]
            border-t border-primary-1/20
            pt-[12px] md:pt-[22px]
            mt-[24px]
            md:mt-[42px] 
            lg:mt-[50px]
            xl:mt-[58px]
          "
        >
          {/* left: all news page link */}
          <div className="flex justify-start">
            {ctaButton?.label && (
              <div className="w-fit">
                <ArticleCardCTA ctaButton={ctaButton} detailsPage />
              </div>
            )}
          </div>

          {/* right: event type + share */}
          <div
            className="
              flex flex-wrap items-center justify-start gap-[18px]
              md:justify-end md:gap-[24px]
            "
          >
            <div
              className="
                font-grift global-p5 font-bold
                text-secondary-2
              "
            >
              {eventStatusLabel}
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="
                group/share-btn
                inline-flex items-center gap-[8px]
                font-grift global-p5 font-bold
                text-secondary-1
                transition-colors duration-300
                hover:text-primary-1
              "
            >
              <span
                className="
                  relative block size-[16px]
                  md:size-[18px]
                "
                aria-hidden="true"
              >
                <span
                  className="
                    absolute left-[2px] top-[6px]
                    h-[2px] w-[10px]
                    rotate-[-35deg]
                    rounded-full bg-current
                    transition-transform duration-300
                    group-hover/share-btn:translate-x-[2px]
                  "
                />
                <span
                  className="
                    absolute left-[2px] top-[9px]
                    h-[2px] w-[10px]
                    rotate-[35deg]
                    rounded-full bg-current
                    transition-transform duration-300
                    group-hover/share-btn:translate-x-[2px]
                  "
                />
                <span className="absolute left-0 top-[6px] size-[5px] rounded-full border-2 border-current bg-transparent" />
                <span className="absolute right-0 top-[1px] size-[5px] rounded-full border-2 border-current bg-transparent" />
                <span className="absolute right-0 bottom-[1px] size-[5px] rounded-full border-2 border-current bg-transparent" />
              </span>

              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleNewsClient
