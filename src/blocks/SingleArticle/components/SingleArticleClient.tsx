'use client'

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { Article } from '@/payload-types'
import { SingleArticlesBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import ArticleCardCTA from '../../AllArticles/components/ArticleCardCTA'

type Props = {
  block: SingleArticlesBlockType
  data: NonNullable<Article['articles']>[number]
}

type ArticleTagRuntime = {
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

function getArticleTags(data: NonNullable<Article['articles']>[number]) {
  const dataAny = data as any

  if (Array.isArray(dataAny?.tags) && dataAny.tags.length) {
    return dataAny.tags.filter((tag: ArticleTagRuntime) => tag?.label && tag?.key)
  }

  return []
}

function SingleArticleClient({ block, data }: Props) {
  const [copied, setCopied] = useState(false)

  const articleTags = useMemo(() => getArticleTags(data), [data])
  const ctaButton = block?.articleCta?.ctaButtons?.[0]

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
      <div
        className="
          grid grid-cols-1
          gap-[34px]
          md:gap-[44px]
          lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
          lg:gap-[58px]
          xl:gap-[76px]
          2xl:gap-[96px]
        "
      >
        {/* left content */}
        <div
          className="
            min-w-0
            lg:sticky lg:top-[120px] lg:self-start
          "
        >
          {/* tags + date */}
          <div
            className="
              flex items-center gap-x-[22px] gap-y-[8px]
            "
          >
            <div className="flex flex-wrap items-center gap-x-[6px] gap-y-[8px]">
              {articleTags.map((tag: any, index: any) => (
                <div
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
                </div>
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

          {/* title */}
          {data?.title && (
            <h1
              className="
                mt-[18px]
                max-w-full break-words
                font-agency text-secondary-1
                global-h5
                [overflow-wrap:anywhere]
              "
            >
              {data.title}
            </h1>
          )}

          {/* image */}
          <div
            className="
              relative 
              w-full max-w-[560px]
              aspect-[500/700]
              overflow-hidden
              rounded-[8px]
              bg-primary-1/10
              mt-[24px] xl:mt-[34px] 2xl:mt-[44px]
              xl:rounded-[10px]
            "
          >
            {typeof data?.detailPageImage === 'object' && data?.detailPageImage?.url ? (
              <Image
                src={data.detailPageImage.url}
                alt={data?.title || 'Article detail image'}
                fill
                className="
                  h-full w-full
                  object-cover object-center
                "
                quality={100}
                sizes="
                  (max-width: 767px) 92vw,
                  (max-width: 1023px) 70vw,
                  (max-width: 1439px) 40vw,
                  560px
                "
                placeholder={data?.detailPageImageBlurDataURL ? 'blur' : 'empty'}
                blurDataURL={data?.detailPageImageBlurDataURL || undefined}
              />
            ) : null}
          </div>
        </div>

        {/* right article body */}
        <div
          className="
            flex min-w-0 flex-col
            lg:pt-[42px]
            xl:pt-[54px]
          "
        >
          {data?.description && (
            <article
              className="
                font-grift global-p4
                leading-[1.75]
                text-secondary-1
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
                md:global-p3
                lg:global-p4
                xl:global-p3
              "
            >
              <LocalizedRichText bn={data.description} en={data.description} />
            </article>
          )}

          {/* bottom meta */}
          <div
            className="
              
              grid grid-cols-3
              border-t border-primary-1/20
              pt-[8px] lg:pt-[14px] xl:pt-[24px]
              mt-[24px] lg:mt-[28px] xl:mt-[36px]
            "
          >
            {/* CTA */}
            {ctaButton?.label && (
              <div className="">
                <ArticleCardCTA ctaButton={ctaButton} detailsPage />
              </div>
            )}
            {data?.estimatedReadingTime && (
              <div
                className="flex justify-center items-center
                  font-grift global-p5 font-bold
                  text-secondary-1 lg:mt-1 xl:mt-0
                "
              >
                {data.estimatedReadingTime}
              </div>
            )}

            <div className="flex justify-end">
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
      </div>
    </section>
  )
}

export default SingleArticleClient
