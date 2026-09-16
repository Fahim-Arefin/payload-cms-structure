'use client'

import CarouselArrowButton from '@/components/custom/sagar-ropes-shared/buttons/CarouselArrowButton'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { gsap, useGSAP } from '@/lib/gsap'
import { ServiceShowcaseBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import LineImage from 'public/assets/images/Line.png'
import VLineImage from 'public/assets/images/VLine.png'

type ServiceTab = NonNullable<
  NonNullable<ServiceShowcaseBlockType['serviceShowcase']>['tabs']
>[number]

type ShowcaseItem = NonNullable<ServiceTab['whatWeBuildItems']>[number]

type Props = {
  items: ShowcaseItem[]

  activeIndex: number

  onActiveIndexChange: (index: number) => void

  onItemSelect: (index: number) => void
}

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

function ServiceWhatWeBuildCarousel({
  items,
  activeIndex,
  onActiveIndexChange,
  onItemSelect,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const imageStageRef = useRef<HTMLDivElement | null>(null)

  const imageInnerRef = useRef<HTMLDivElement | null>(null)

  /*
   * Prevent Embla's select event from overwriting
   * an item we selected programmatically.
   */
  const programmaticScrollRef = useRef(false)

  const programmaticTimerRef = useRef<number | null>(null)

  // const autoplayPlugin = useRef(
  //   Autoplay({
  //     delay: sliderDelay,

  //     stopOnInteraction: false,

  //     stopOnMouseEnter: true,
  //   }),
  // )

  const [api, setApi] = useState<CarouselApi>()

  const [canScrollPrev, setCanScrollPrev] = useState(false)

  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)

  const hasMultipleItems = items.length > 1

  const shouldShowArrows = hasMultipleItems && (canScrollPrev || canScrollNext)

  const safeActiveIndex = Math.min(
    Math.max(activeIndex, 0),

    Math.max(items.length - 1, 0),
  )

  /* =======================================================
   ITEM-BY-ITEM AUTOPLAY

   Unlike Embla Autoplay, this advances the actual active
   content item one by one, exactly like the Next button.

   Example with 5 items:

   0 → 1 → 2 → 3 → 4 → 0 → ...

   Even if items 0-3 are already visible on screen,
   each one becomes active individually.
======================================================= */

  useEffect(() => {
    if (!api) return
    if (items.length <= 1) return
    if (isAutoplayPaused) return

    const timer = window.setTimeout(() => {
      const nextIndex = safeActiveIndex >= items.length - 1 ? 0 : safeActiveIndex + 1

      /*
       * Same active-state change as clicking Next.
       */
      onActiveIndexChange(nextIndex)

      /*
       * Keep the selected item visible in the carousel.
       */
      scrollCarouselToIndex(nextIndex)
    }, sliderDelay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [api, safeActiveIndex, items.length, isAutoplayPaused, onActiveIndexChange])

  /* =======================================================
     PROGRAMMATIC EMBLA SCROLL

     Used after:
     - card click
     - URL deep link
     - parent active-index update

     Embla's select event is temporarily ignored so that
     its snap index doesn't overwrite our selected card.
  ======================================================= */

  const scrollCarouselToIndex = (index: number) => {
    if (!api) return

    const targetIndex = Math.min(Math.max(index, 0), Math.max(items.length - 1, 0))

    programmaticScrollRef.current = true

    api.scrollTo(targetIndex)

    if (programmaticTimerRef.current) {
      window.clearTimeout(programmaticTimerRef.current)
    }

    programmaticTimerRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false
    }, 180)
  }

  /* =======================================================
     EMBLA STATE

     Drag/swipe/carousel navigation can still change the
     active item.

     But programmatic selection does NOT get overwritten.
  ======================================================= */

  useEffect(() => {
    if (!api) return

    const updateControls = () => {
      setCanScrollPrev(api.canScrollPrev())

      setCanScrollNext(api.canScrollNext())
    }

    const handleSelect = () => {
      updateControls()

      /*
       * Ignore Embla's selected snap while we're
       * intentionally scrolling to a selected item.
       */
      if (programmaticScrollRef.current) {
        return
      }

      const selectedIndex = api.selectedScrollSnap()

      onActiveIndexChange(selectedIndex)
    }

    updateControls()

    api.on('select', handleSelect)

    api.on('reInit', updateControls)

    return () => {
      api.off('select', handleSelect)

      api.off('reInit', updateControls)
    }
  }, [api, onActiveIndexChange])

  /* =======================================================
     PARENT / URL ACTIVE INDEX -> CAROUSEL

     Important for:

     /services#ecommerce-platforms
  ======================================================= */

  useEffect(() => {
    if (!api) return
    if (!items.length) return

    /*
     * Don't do anything if Embla is already
     * at the requested position.
     */
    if (api.selectedScrollSnap() === safeActiveIndex) {
      return
    }

    scrollCarouselToIndex(safeActiveIndex)
  }, [api, safeActiveIndex, items.length])

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (programmaticTimerRef.current) {
        window.clearTimeout(programmaticTimerRef.current)
      }
    }
  }, [])

  /* =======================================================
     ACTIVE IMAGE ANIMATION
  ======================================================= */

  useGSAP(
    () => {
      const imageStage = imageStageRef.current

      const imageInner = imageInnerRef.current

      if (!imageStage || !imageInner) {
        return
      }

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

      dependencies: [safeActiveIndex],
    },
  )

  if (!items.length) {
    return null
  }

  const activeItem = items[safeActiveIndex] || items[0]

  const activeImage = getImageMedia(activeItem?.image)

  const activeImageBlurDataURL = activeImage?.blurDataURL || activeItem?.imageBlurDataURL

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const handlePrevious = () => {
    const nextIndex = Math.max(0, safeActiveIndex - 1)

    if (nextIndex === safeActiveIndex) {
      return
    }

    /*
     * Update actual active item first.
     */
    onActiveIndexChange(nextIndex)

    /*
     * Move carousel afterwards.
     */
    scrollCarouselToIndex(nextIndex)
  }

  /* =======================================================
     NEXT
  ======================================================= */

  const handleNext = () => {
    const nextIndex = Math.min(
      items.length - 1,

      safeActiveIndex + 1,
    )

    if (nextIndex === safeActiveIndex) {
      return
    }

    onActiveIndexChange(nextIndex)

    scrollCarouselToIndex(nextIndex)
  }

  /* =======================================================
     CARD CLICK

     This is the important fix.

     We explicitly update:
     1. active item
     2. URL
     3. carousel position

     The active state does NOT depend on Embla's snap.
  ======================================================= */

  const handleItemClick = (index: number) => {
    /*
     * Immediately change:
     * - selected card
     * - selected preview image
     */
    onActiveIndexChange(index)

    /*
     * Update:
     * #ecommerce-platforms
     */
    onItemSelect(index)

    /*
     * Keep clicked card visible.
     */
    scrollCarouselToIndex(index)
  }

  /* =======================================================
     HOVER

     Hover changes preview only.

     It does NOT:
     - change URL
     - move carousel
  ======================================================= */

  return (
    <div
      ref={rootRef}
      className="
        relative
        w-full
      "
    >
      {/* =================================================
          TOP LINE
      ================================================= */}

      <div
        className="
          relative
          mx-auto

          h-px
          w-full
        "
      >
        <Image
          src={LineImage}
          alt=""
          fill
          className="
            object-fill
            object-center

            opacity-70
          "
          placeholder="blur"
          blurDataURL={LineImage.blurDataURL}
          quality={95}
        />
      </div>

      {/* =================================================
          CAROUSEL
      ================================================= */}

      <div
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => setIsAutoplayPaused(false)}
        className="
          relative

          mt-[16px]

          w-full

          px-0

          md:px-[50px]

          lg:mt-[14px]
          lg:px-[54px]

          xl:px-[62px]

          2xl:px-[70px]
        "
      >
        {/* ===============================================
            DESKTOP / TABLET ARROWS
        =============================================== */}

        {shouldShowArrows && (
          <>
            <CarouselArrowButton
              direction="prev"
              ariaLabel="Previous item"
              onClick={handlePrevious}
              disabled={safeActiveIndex <= 0}
              wrapperClassName="
                absolute

                left-0
                top-1/2

                z-20

                hidden

                -translate-y-1/2

                md:inline-flex
              "
              buttonClassName="
                size-[34px]

                lg:size-[36px]

                xl:size-[38px]
              "
            />

            <CarouselArrowButton
              direction="next"
              ariaLabel="Next item"
              onClick={handleNext}
              disabled={safeActiveIndex >= items.length - 1}
              wrapperClassName="
                absolute

                right-0
                top-1/2

                z-20

                hidden

                -translate-y-1/2

                md:inline-flex
              "
              buttonClassName="
                size-[34px]

                lg:size-[36px]

                xl:size-[38px]
              "
            />
          </>
        )}

        {/* ===============================================
            EMBLA
        =============================================== */}

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',

            loop: false,
          }}
          // plugins={hasMultipleItems ? [autoplayPlugin.current] : []}
          className="w-full"
        >
          <CarouselContent
            className="
              -ml-[16px]

              md:-ml-[18px]

              xl:-ml-[22px]
            "
          >
            {items.map((item, index) => {
              const isActive = index === safeActiveIndex

              const showSeparator = index < items.length - 1

              return (
                <CarouselItem
                  key={item?.id ?? item?.itemId ?? index}
                  className="
                      basis-full

                      pl-[16px]

                      md:basis-1/2
                      md:pl-[18px]

                      lg:basis-1/3

                      xl:basis-1/4
                      xl:pl-[22px]

                      2xl:basis-1/4
                    "
                >
                  <div
                    className="
                        relative

                        h-full
                        min-w-0
                      "
                  >
                    {/* =================================
                          CLICKABLE ITEM
                      ================================= */}

                    <button
                      id={item?.itemId || undefined}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleItemClick(index)}
                      // onMouseEnter={() => handleItemHover(index)}
                      className={`
                          group/service-build-card

                          relative

                          flex

                          min-h-[126px]

                          w-full

                          flex-col

                          rounded-[7px]

                          border

                          px-[18px]
                          py-[18px]

                          text-left

                          transition-all
                          duration-300
                          ease-out

                          lg:min-h-[134px]

                          xl:min-h-[146px]
                          xl:px-[22px]
                          xl:py-[20px]

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
        hover:bg-primary-1/15
      `
                          }
                        `}
                    >
                      {/* title */}

                      {item?.title && (
                        <h3
                          className={`
                              font-grift

                              global-p4

                              transition-colors

                              duration-300

                              ${isActive ? 'text-primary-2' : 'text-white-1'}
                            `}
                        >
                          {item.title}
                        </h3>
                      )}

                      {/* description */}

                      {item?.description && (
                        <p
                          className="
                              mt-[12px]

                              font-grift

                              global-p6

                              text-white-1
                            "
                        >
                          {item.description}
                        </p>
                      )}
                    </button>

                    {/* =================================
                          SEPARATOR
                      ================================= */}

                    {showSeparator && (
                      <div
                        className="
                            pointer-events-none

                            absolute

                            right-[-8px]
                            top-1/2

                            hidden

                            h-[80%]

                            w-px

                            -translate-y-1/2

                            md:block

                            xl:right-[-11px]
                          "
                      >
                        <Image
                          src={VLineImage}
                          alt=""
                          fill
                          className="
                              object-fill

                              object-center

                              opacity-55
                            "
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

        {/* ===============================================
            MOBILE ARROWS
        =============================================== */}

        {hasMultipleItems && (
          <div
            className="
              mt-[18px]

              flex

              items-center

              justify-center

              gap-[12px]

              md:hidden
            "
          >
            <CarouselArrowButton
              direction="prev"
              ariaLabel="Previous item"
              onClick={handlePrevious}
              disabled={safeActiveIndex <= 0}
              buttonClassName="size-[34px]"
            />

            <CarouselArrowButton
              direction="next"
              ariaLabel="Next item"
              onClick={handleNext}
              disabled={safeActiveIndex >= items.length - 1}
              buttonClassName="size-[34px]"
            />
          </div>
        )}
      </div>

      {/* =================================================
          ACTIVE IMAGE
      ================================================= */}

      {activeImage?.url && (
        <div
          className="
            relative

            mx-auto

            mt-[34px]

            w-full

            overflow-visible

            lg:mt-[42px]

            xl:mt-[50px]
          "
        >
          {/* glow */}

          <div
            className="
              pointer-events-none

              absolute

              bottom-[-32%]

              z-0

              h-[125%]

              w-full

              rounded-full

              bg-primary-1/45

              blur-[70px]

              lg:blur-[85px]
            "
          />

          {/* image */}

          <div
            ref={imageStageRef}
            className="
              relative

              z-10

              aspect-[1200/340]

              w-full

              overflow-hidden

              rounded-[7px]

              bg-primary-1/10

              shadow-[0_22px_70px_rgba(0,0,0,0.28)]

              lg:rounded-[8px]

              xl:rounded-[10px]
            "
          >
            <div
              ref={imageInnerRef}
              className="
                relative

                h-full

                w-full
              "
            >
              <Image
                key={activeImage.url}
                src={activeImage.url}
                alt={activeImage.alt || activeItem?.title || 'Service image'}
                fill
                className="
                  object-cover

                  object-center
                "
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

export default ServiceWhatWeBuildCarousel
