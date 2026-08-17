import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { News } from '@/payload-types'
import { FeaturedNewsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import { useMemo } from 'react'

import LineImage from 'public/assets/images/Line.png'
import FearuredCardCTA from './FearuredCardCTA'

type NewsItem = NonNullable<News['news']>[number]

type Props = {
  block: FeaturedNewsBlockType
  data: NewsItem
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

function getSelectedTags(data: NewsItem): TagItem[] {
  const dataAny = data as any

  if (Array.isArray(dataAny?.tags) && dataAny.tags.length) {
    return dataAny.tags.filter((tag: TagItem) => tag?.label && tag?.key)
  }

  return []
}

function FeaturedNewsCard({ block, data }: Props) {
  const selectedTags = useMemo<TagItem[]>(() => getSelectedTags(data), [data])
  const firstTag = selectedTags?.[0]

  const ctaButton = block?.newsCta?.ctaButtons?.[0]
  const eventStatusLabel =
    eventStatusLabelMap[String((data as any)?.eventStatus || '')] || 'Upcoming Events'

  return (
    <article
      className="
        group/featured-news-card
        relative w-full
        overflow-hidden
        rounded-[8px]
        aspect-[335/240]
        bg-secondary-1
        p-[18px]
        shadow-[0_18px_54px_rgba(0,108,103,0.12)]
        md:aspect-[760/380] md:p-[24px]
        lg:aspect-[1000/406] lg:p-[32px]
        xl:aspect-[1200/446] xl:rounded-[10px] xl:p-[38px]
        2xl:aspect-[1200/406] 2xl:rounded-[10px] 2xl:p-[44px]
      "
    >
      {/* background image */}
      {typeof data?.detailPageImage === 'object' && data?.detailPageImage?.url ? (
        <Image
          src={data.detailPageImage.url}
          alt={data?.title || 'Featured news image'}
          fill
          className="
            h-full w-full object-cover object-center
            transition-transform duration-700 ease-out
            group-hover/featured-news-card:scale-[1.035]
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
      ) : typeof data?.cardImage === 'object' && data?.cardImage?.url ? (
        <Image
          src={data.cardImage.url}
          alt={data?.title || 'Featured news image'}
          fill
          className="
            h-full w-full object-cover object-center
            transition-transform duration-700 ease-out
            group-hover/featured-news-card:scale-[1.035]
          "
          quality={100}
          sizes="
            (max-width: 767px) 92vw,
            (max-width: 1023px) 88vw,
            (max-width: 1439px) 82vw,
            1180px
          "
          placeholder={data?.cardImageBlurDataURL ? 'blur' : 'empty'}
          blurDataURL={data?.cardImageBlurDataURL || undefined}
        />
      ) : null}

      {/* overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[linear-gradient(90deg,rgba(10,17,40,0.90)_0%,rgba(10,17,40,0.72)_48%,rgba(10,17,40,0.42)_100%)]
        "
      />
      <div
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[linear-gradient(0deg,rgba(10,17,40,0.78)_0%,rgba(10,17,40,0.22)_52%,rgba(10,17,40,0.18)_100%)]
        "
      />

      {/* content */}
      <div className="relative z-10 flex h-full w-full min-w-0 flex-col">
        {/* top meta */}
        <div
          className="
            flex items-start justify-between
            gap-[18px]
          "
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {firstTag?.label && (
              <span
                className="
                  inline-flex items-center justify-center
                  rounded-[4px]
                  border border-white-1/35
                  bg-white-1/10
                  px-[8px] py-[3px]
                  font-grift global-p5 font-semibold
                  text-white-1
                  backdrop-blur-[10px]
                  transition-all duration-300 ease-out
                  group-hover/featured-news-card:border-white-1
                  group-hover/featured-news-card:bg-white-1/18
                "
              >
                {firstTag.label}
              </span>
            )}
          </div>

          <div
            className="
              shrink-0
              font-grift global-p5 font-bold
              text-white-1
            "
          >
            {eventStatusLabel}
          </div>
        </div>

        {/* title */}
        {data?.title && (
          <h3
            className="
              mt-auto
              pt-[42px]
              font-agency global-h5
              text-white-1
              transition-colors duration-300
              group-hover/featured-news-card:text-white-1
              md:pt-[38px]
              lg:pt-[38px]
              xl:pt-[44px]
            "
          >
            {data.title}
          </h3>
        )}

        {/* description */}
        {data?.description && (
          <div
            className="
              mt-[14px]
              font-grift global-p4
              text-white-1
              line-clamp-3
              md:mt-[16px]
              xl:mt-[18px]
            "
          >
            <LocalizedRichText bn={data.description} en={data.description} />
          </div>
        )}

        {/* bottom */}
        <div className="pt-[16px] md:pt-[20px] xl:pt-[24px]">
          <div className="relative h-px w-full overflow-hidden">
            <Image
              src={LineImage}
              alt=""
              fill
              className="object-fill object-center opacity-60 brightness-0 invert"
              placeholder="blur"
              blurDataURL={LineImage.blurDataURL}
              quality={95}
            />
          </div>

          <div className="mt-[12px] flex items-center justify-between gap-4">
            <FearuredCardCTA ctaButton={ctaButton} itemId={data?.id || ''} />

            {data?.estimatedReadingTime && (
              <div
                className="
                  shrink-0
                  font-grift global-p5 font-bold
                  text-white-1
                "
              >
                {data.estimatedReadingTime}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default FeaturedNewsCard
