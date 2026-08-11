import { ProductionPipelineBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = { block: ProductionPipelineBlockType }

type ImageMedia = {
  url: string
  alt?: string | null
  blurDataURL?: string | null
}

function getImageMedia(media: unknown): ImageMedia | null {
  if (
    media &&
    typeof media === 'object' &&
    'url' in media &&
    typeof (media as ImageMedia).url === 'string'
  ) {
    return media as ImageMedia
  }

  return null
}

function ProductionPipelineGrid({ block }: Props) {
  const items = block?.pipeline?.items || []

  if (!items.length) return null

  const renderMarker = (item: any, index: number) => {
    const coloredIcon = getImageMedia(item?.icon?.iconColored)
    const whiteIcon = getImageMedia(item?.icon?.iconWhite)

    const coloredBlurDataURL = coloredIcon?.blurDataURL || item?.icon?.iconColoredBlurDataURL
    const whiteBlurDataURL = whiteIcon?.blurDataURL || item?.icon?.iconWhiteBlurDataURL

    return (
      <div
        className="
          group/pipeline-marker
          relative z-10 flex shrink-0 items-center justify-center
          rounded-[10px]
          border border-primary-1/45
          bg-white-1/70
          shadow-[0_10px_24px_rgba(0,108,103,0.08)]
          backdrop-blur-[8px]
          transition-all duration-300 ease-out

          size-[42px]
          lg:size-[42px]
          xl:size-[46px]
          2xl:size-[50px]

          group-hover/pipeline-item:rotate-45
          group-hover/pipeline-item:border-primary-1
          group-hover/pipeline-item:bg-primary-1
          group-hover/pipeline-item:shadow-[0_14px_30px_rgba(0,108,103,0.22)]
        "
      >
        <span
          className="
            relative block
            transition-transform duration-300 ease-out

            size-[20px]
            xl:size-[22px]
            2xl:size-[24px]

            group-hover/pipeline-item:-rotate-45
          "
        >
          {coloredIcon?.url ? (
            <Image
              src={coloredIcon.url}
              alt={coloredIcon.alt || ''}
              fill
              className={`
                object-contain object-center
                transition-opacity duration-300
                ${whiteIcon?.url ? 'opacity-100 group-hover/pipeline-item:opacity-0' : ''}
              `}
              placeholder={coloredBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={coloredBlurDataURL || undefined}
              quality={95}
              sizes="50px"
            />
          ) : (
            <span
              className="
                flex h-full w-full items-center justify-center
                font-grift text-[11px] font-bold text-primary-1
                transition-colors duration-300
                group-hover/pipeline-item:text-white-1
              "
            >
              {index + 1}
            </span>
          )}

          {whiteIcon?.url && (
            <Image
              src={whiteIcon.url}
              alt={whiteIcon.alt || ''}
              fill
              className="
                object-contain object-center
                opacity-0 transition-opacity duration-300
                group-hover/pipeline-item:opacity-100
              "
              placeholder={whiteBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={whiteBlurDataURL || undefined}
              quality={95}
              sizes="50px"
            />
          )}
        </span>
      </div>
    )
  }

  const renderContent = (item: any, isLeft = false) => {
    return (
      <div
        className={`
          max-w-[300px]  xl:max-w-[360px] 2xl:max-w-[460px] 
          ${isLeft ? 'lg:ml-auto lg:text-right' : 'lg:mr-auto lg:text-left'}
        `}
      >
        {item?.title && (
          <h3
            className="
              font-agency global-h7 text-secondary-1
            "
          >
            {item.title}
          </h3>
        )}

        {item?.description && (
          <p
            className="
              mt-[10px]
              font-grift global-p5 text-secondary-2
            "
          >
            {item.description}
          </p>
        )}
      </div>
    )
  }

  return (
    <div
      className="
        mx-auto w-full
        max-w-[620px]
        lg:max-w-[840px]
        xl:max-w-[940px]
        2xl:max-w-[1040px]
      "
    >
      {/* mobile/tablet */}
      <div className="relative lg:hidden">
        <div
          className="
            absolute bottom-[20px] top-[20px]
            left-[21px] md:left-[134px]
            w-px bg-primary-1/30
          "
        />

        <div className="flex flex-col gap-[30px] mt-8 md:mt-10 lg:mt-0 md:ml-28 lg:ml-0">
          {items.map((item, index) => (
            <div key={item?.id ?? index} className="group/pipeline-item relative pl-[64px]">
              <div className="absolute left-0 top-0">{renderMarker(item, index)}</div>

              <div className="pt-[2px]">{renderContent(item, false)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* desktop */}
      <div className="relative hidden lg:block">
        <div
          className="
            absolute bottom-[18px] left-1/2 top-[18px]
            w-px -translate-x-1/2 bg-primary-1/30
          "
        />

        <div className="relative z-10 flex flex-col">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0

            return (
              <div
                key={item?.id ?? index}
                className="
                  group/pipeline-item
                  grid items-center
                  grid-cols-[minmax(0,1fr)_70px_minmax(0,1fr)]

                  lg:min-h-[132px] lg:gap-x-[30px]
                  xl:min-h-[148px] xl:grid-cols-[minmax(0,1fr)_78px_minmax(0,1fr)] xl:gap-x-[34px]
                  2xl:min-h-[162px] 2xl:grid-cols-[minmax(0,1fr)_84px_minmax(0,1fr)] 2xl:gap-x-[38px]
                "
              >
                <div className="min-w-0">{isLeft ? renderContent(item, true) : null}</div>

                <div className="flex justify-center">{renderMarker(item, index)}</div>

                <div className="min-w-0">{!isLeft ? renderContent(item, false) : null}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductionPipelineGrid
