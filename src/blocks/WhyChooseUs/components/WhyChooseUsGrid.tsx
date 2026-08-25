import { WCUBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = { block: WCUBlockType }

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

function WhyChooseUsGrid({ block }: Props) {
  const criteriaItems = block?.choosingCriteria?.criteria || []

  if (!criteriaItems.length) return null

  return (
    <div
      className="
        ml-8 grid grid-cols-1 gap-2
        md:grid-cols-2
        lg:ml-8 lg:gap-3
        xl:ml-20 xl:gap-5
        2xl:ml-32 2xl:gap-6
      "
    >
      {criteriaItems.map((item, i) => {
        const icon = getImageMedia(item?.icon)
        const iconBlurDataURL = icon?.blurDataURL || item?.iconBlurDataURL

        return (
          <div key={item?.id ?? i} className="flex items-center gap-2 lg:gap-3">
            {icon?.url && (
              <div
                className="
                  relative shrink-0
                  size-[15px]
                  lg:size-[20px]
                  xl:size-[25px]
                "
              >
                <Image
                  src={icon.url}
                  alt={icon.alt || item?.text || 'Criteria icon'}
                  fill
                  className="object-contain object-center"
                  placeholder={iconBlurDataURL ? 'blur' : 'empty'}
                  blurDataURL={iconBlurDataURL || undefined}
                  quality={100}
                  sizes="25px"
                />
              </div>
            )}

            <div className="font-grift global-p3 text-secondary-1">{item?.text}</div>
          </div>
        )
      })}
    </div>
  )
}

export default WhyChooseUsGrid
