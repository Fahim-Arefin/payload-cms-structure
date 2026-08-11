import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import { MaintainanceBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  block: MaintainanceBlockType
}

function MaintainanceSection({ block }: Props) {
  const info = block?.maintenanceInfo

  const image = typeof info?.image === 'object' && info?.image?.url ? info.image : null

  const imageAlt =
    image && typeof image === 'object' && 'alt' in image && image?.alt
      ? image.alt
      : 'Maintenance illustration'

  const hasCtaButtons = !!info?.ctaButtons && info?.ctaButtons?.length > 0

  return (
    <section
      className="
        relative isolate min-h-[100svh] overflow-hidden
        px-[18px] py-[52px]
        md:px-[32px] md:py-[64px]
        lg:px-[48px] lg:py-[78px]
        xl:px-[64px] xl:py-[88px]
        2xl:py-[100px]
      "
    >
      {/* bottom glow */}
      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0 -z-10
          mx-auto h-[46%] w-full
          bg-[radial-gradient(ellipse_at_center,rgba(0,108,103,0.32)_0%,rgba(0,108,103,0.18)_38%,rgba(0,108,103,0.00)_74%)]
          blur-[14px]
          md:h-[42%]
          lg:h-[40%]
        "
      />

      <div
        className="
          mx-auto flex w-full max-w-[1080px] flex-col items-center text-center
        "
      >
        {/* image */}
        {image?.url && (
          <div
            className="
              relative w-full
              max-w-[360px]
              aspect-[1600/1144]
              md:max-w-[500px]
              lg:max-w-[610px]
              xl:max-w-[660px]
              2xl:max-w-[720px]
            "
          >
            <Image
              src={image.url}
              alt="Maintainance Image"
              fill
              className="object-contain object-center"
              quality={100}
              priority
              placeholder={info?.imageBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={info?.imageBlurDataURL || undefined}
              sizes="
                (max-width: 767px) 90vw,
                (max-width: 1023px) 70vw,
                (max-width: 1439px) 58vw,
                720px
              "
            />
          </div>
        )}

        {/* title */}
        {(info?.title || info?.subtitle) && (
          <div
            className="
              mt-[28px]
              md:mt-[34px]
              lg:mt-[42px]
              xl:mt-[48px]
            "
          >
            {info?.title && (
              <h1
                className="
                  font-agency text-secondary-1
                  global-h2
                "
              >
                {info.title}
              </h1>
            )}

            {info?.subtitle && (
              <h2
                className="
                  font-agency text-secondary-1
                  global-h2
                "
              >
                {info.subtitle}
              </h2>
            )}
          </div>
        )}

        {/* description */}
        {info?.description && (
          <p
            className="
              mt-[20px] max-w-[760px]
              font-grift font-bold text-secondary-1
              global-p4 leading-[1.45]
              md:mt-[24px] md:max-w-[820px]
              lg:global-p3
              xl:max-w-[900px]
            "
          >
            {info.description}
          </p>
        )}

        {/* buttons */}
        {hasCtaButtons && (
          <div
            className="
              mt-[30px] flex flex-wrap items-center justify-center gap-[14px]
              md:mt-[36px]
              lg:mt-[42px]
              xl:mt-[48px]
            "
          >
            <CtaButtons item={info.ctaButtons} />
          </div>
        )}
      </div>
    </section>
  )
}

export default MaintainanceSection
