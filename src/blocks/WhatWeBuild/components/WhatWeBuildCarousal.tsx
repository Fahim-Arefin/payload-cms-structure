'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { gsap, useGSAP } from '@/lib/gsap'
import { WhatWeBuildBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

// import ArrowRightColored from 'public/assets/icons/arrowRightColored.png'
import ArrowRightWhite from 'public/assets/icons/arrowright.png'
import LineImage from 'public/assets/images/Line.png'
import VLineImage from 'public/assets/images/VLine.png'

type Props = { block: WhatWeBuildBlockType }

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

function WhatWeBuildCarousal({ block }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const imageStageRef = useRef<HTMLDivElement | null>(null)
  const imageInnerRef = useRef<HTMLDivElement | null>(null)

  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)

  const items = block?.whatWeBuild?.items || []

  useEffect(() => {
    if (!items.length) return

    if (activeIndex >= items.length) {
      setActiveIndex(0)
    }
  }, [items.length, activeIndex])

  useGSAP(
    () => {
      const imageStage = imageStageRef.current
      const imageInner = imageInnerRef.current

      if (!imageStage || !imageInner) return

      gsap.fromTo(
        imageStage,
        {
          autoAlpha: 0,
          y: 24,
          scale: 0.985,
          filter: 'blur(8px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.58,
          ease: 'power3.out',
          overwrite: 'auto',
        },
      )

      gsap.fromTo(
        imageInner,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
          overwrite: 'auto',
        },
      )
    },
    {
      scope: rootRef,
      dependencies: [activeIndex],
    },
  )

  if (!items.length) return null

  const activeItem = items[activeIndex] || items[0]
  const activeImage = getImageMedia(activeItem?.image)
  const activeImageBlurDataURL = activeImage?.blurDataURL || activeItem?.imageBlurDataURL

  const handlePrevious = () => {
    api?.scrollPrev()
  }

  const handleNext = () => {
    api?.scrollNext()
  }

  const handleSelect = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div ref={rootRef} className="relative w-full">
      {/* upper horizontal line */}
      <div className="relative mx-auto h-px w-full">
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

      {/* shadcn carousel */}
      <div
        className="
          relative mt-[16px] w-full
          px-[42px]
          md:px-[50px]
          lg:mt-[14px] lg:px-[54px]
          xl:px-[62px]
          2xl:px-[70px]
        "
      >
        <button
          type="button"
          aria-label="Previous item"
          onClick={handlePrevious}
          className="
            absolute left-0 top-1/2 z-20
            flex size-[34px] -translate-y-1/2 items-center justify-center
            rounded-full bg-primary-1/35
            shadow-[0_10px_24px_rgba(0,108,103,0.18)]
            backdrop-blur-[10px]
            transition-all duration-300 ease-out
            hover:scale-105
            hover:bg-primary-1
            active:scale-95
            lg:size-[36px]
            xl:size-[38px]
          "
        >
          <Image
            src={ArrowRightWhite}
            alt=""
            width={18}
            height={18}
            className="
    h-[14px] w-[14px] rotate-180 object-contain
    lg:h-[15px] lg:w-[15px]
  "
            placeholder="blur"
            blurDataURL={ArrowRightWhite.blurDataURL}
            quality={95}
          />
        </button>

        <button
          type="button"
          aria-label="Next item"
          onClick={handleNext}
          className="
            absolute right-0 top-1/2 z-20
            flex size-[34px] -translate-y-1/2 items-center justify-center
            rounded-full bg-primary-1/35
            shadow-[0_10px_24px_rgba(0,108,103,0.18)]
            backdrop-blur-[10px]
            transition-all duration-300 ease-out
            hover:scale-105
            hover:bg-primary-1
            active:scale-95
            lg:size-[36px]
            xl:size-[38px]
          "
        >
          <Image
            src={ArrowRightWhite}
            alt=""
            width={18}
            height={18}
            className="
    h-[14px] w-[14px] object-contain
    lg:h-[15px] lg:w-[15px]
  "
            placeholder="blur"
            blurDataURL={ArrowRightWhite.blurDataURL}
            quality={95}
          />
        </button>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-[16px] md:-ml-[18px] xl:-ml-[22px]">
            {items.map((item, index) => {
              const isActive = index === activeIndex
              const showSeparator = index < items.length - 1

              return (
                <CarouselItem
                  key={item?.id ?? index}
                  //   className="
                  //     basis-full pl-[16px]
                  //     md:basis-1/2 md:pl-[18px]
                  //     lg:basis-1/4
                  //     xl:pl-[22px]
                  //   "
                  className="
    basis-full pl-[16px]
    md:basis-1/2 md:pl-[18px]
    lg:basis-1/3
    xl:basis-1/4 xl:pl-[22px]
    2xl:basis-1/4
  "
                >
                  <div className="relative h-full min-w-0">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleSelect(index)}
                      onMouseEnter={() => handleSelect(index)}
                      className={`
                        group/what-we-build-card
                        relative flex min-h-[126px] w-full flex-col
                        rounded-[7px]
                        border
                        px-[18px] py-[18px]
                        text-left
                        transition-all duration-300 ease-out
                        lg:min-h-[134px]
                        xl:min-h-[146px] xl:px-[22px] xl:py-[20px]
                        2xl:min-h-[154px]
                        ${
                          isActive
                            ? `
                              border-primary-2
                              bg-primary-1/30
                              shadow-[0_14px_34px_rgba(0,108,103,0.14)]
                            `
                            : `
                              border-transparent
                              bg-transparent
                              hover:border-primary-2
                              hover:bg-primary-1/30
                            `
                        }
                      `}
                    >
                      {item?.title && (
                        <h3
                          className={`
                            font-grift global-p4
                            transition-colors duration-300
                            ${
                              isActive
                                ? 'text-primary-2'
                                : 'text-white-1 group-hover/what-we-build-card:text-primary-2'
                            }
                          `}
                        >
                          {item.title}
                        </h3>
                      )}

                      {item?.description && (
                        <p
                          className="
                            mt-[12px]
                            font-grift global-p6
                            text-white-1
                          "
                        >
                          {item.description}
                        </p>
                      )}
                    </button>

                    {/* {showSeparator && (
                      <div
                        className="
                          pointer-events-none absolute right-[-8px] top-[12px]
                          hidden h-[104px] w-px lg:block
                          xl:right-[-11px] xl:h-[116px]
                        "
                      >
                        <Image
                          src={VLineImage}
                          alt=""
                          fill
                          className="object-fill object-center opacity-55"
                          placeholder="blur"
                          blurDataURL={VLineImage.blurDataURL}
                          quality={95}
                        />
                      </div>
                    )} */}
                    {showSeparator && (
                      <div
                        className="
      pointer-events-none absolute right-[-8px] top-1/2
      hidden h-[80%] w-px -translate-y-1/2 md:block
      xl:right-[-11px]
    "
                      >
                        <Image
                          src={VLineImage}
                          alt=""
                          fill
                          className="object-fill object-center opacity-55"
                          placeholder="blur"
                          blurDataURL={VLineImage.blurDataURL}
                          quality={95}
                        />
                      </div>
                    )}
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* active image */}
      {activeImage?.url && (
        <div
          className="
            relative mx-auto
            mt-[34px] w-full
            overflow-visible
            lg:mt-[42px]
            xl:mt-[50px]
          "
        >
          <div
            className="
              pointer-events-none absolute
              bottom-[-32%] z-0
              h-[125%] w-full
              rounded-full bg-primary-1/45
              blur-[70px]
              lg:blur-[85px]
            "
          />

          <div
            ref={imageStageRef}
            className="
              relative z-10
              aspect-[1200/340] w-full
              overflow-hidden rounded-[7px]
              bg-primary-1/10
              shadow-[0_22px_70px_rgba(0,0,0,0.28)]
              lg:rounded-[8px]
              xl:rounded-[10px]
            "
          >
            <div ref={imageInnerRef} className="relative h-full w-full">
              <Image
                key={activeImage.url}
                src={activeImage.url}
                alt={activeImage.alt || activeItem?.title || 'What we build image'}
                fill
                className="object-cover object-center"
                placeholder={activeImageBlurDataURL ? 'blur' : 'empty'}
                blurDataURL={activeImageBlurDataURL || undefined}
                quality={100}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WhatWeBuildCarousal
