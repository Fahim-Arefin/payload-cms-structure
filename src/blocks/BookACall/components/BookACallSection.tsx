import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { pageHrefWithAnchor } from '@/lib/utils'
import { BookACallBlockType } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import React from 'react'

type Props = {
  block: BookACallBlockType
}

function BookACallSection({ block }: Props) {
  const info = block?.bookCallInfo

  const buttonHref = pageHrefWithAnchor(info?.buttonLink, info?.sectionId)
  const buttonLink = buttonHref !== '#' ? buttonHref : ''

  const hasDescription = !!info?.description && !!info?.description?.root?.direction

  return (
    <div className="container-padding">
      <div
        className="
          relative overflow-hidden
          bg-secondary-1 text-center 
          rounded-sm lg:rounded-[6px] xl:rounded-[8px]
          px-[18px] py-[44px]
          lg:px-[40px] lg:py-[64px]
          xl:px-[56px] xl:py-[78px]
          2xl:px-[70px] 2xl:py-[88px]
        "
      >
        {/* soft center glow */}
        <div
          className="
            pointer-events-none absolute
            left-1/2 top-0 z-0
            h-[220px] w-[70%]
            -translate-x-1/2 -translate-y-[42%]
            rounded-full
            bg-primary-1/60
            blur-[85px]
            lg:h-[260px] lg:w-[58%]
            xl:h-[320px] xl:w-[52%]
            2xl:h-[360px]
          "
        />

        {/* subtle lower glow */}
        <div
          className="
            pointer-events-none absolute
            left-1/2 bottom-[-48%] z-0
            h-[210px] w-[58%]
            -translate-x-1/2
            rounded-full
            bg-primary-1/20
            blur-[90px]
            lg:h-[260px]
            xl:h-[300px]
          "
        />

        <div className="relative z-10 mx-auto flex flex-col items-center">
          {info?.title && <h2 className="font-agency text-white-1 global-h5">{info.title}</h2>}

          {hasDescription && (
            <div
              className="
                mt-[18px]
                max-w-[90%] md:max-w-[60%] xl:max-w-[640px]
                font-grift global-p6 lg:global-p5
                text-white-3
                lg:mt-[22px]
                xl:mt-[26px]
              "
            >
              <LocalizedRichText en={info.description} bn={info.description} />
            </div>
          )}

          {info?.buttonLabel && buttonLink && (
            <div className="mt-[28px] lg:mt-[34px] xl:mt-[40px]">
              <Link href={buttonLink} className="inline-flex">
                <Button01 type="button">{info.buttonLabel}</Button01>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookACallSection
