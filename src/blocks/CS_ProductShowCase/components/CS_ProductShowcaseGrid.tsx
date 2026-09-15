'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { ProductShowcaseBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  block: ProductShowcaseBlockType
}

type MediaLike = {
  url?: string | null
  alt?: string | null
}

function getMediaUrl(media: unknown) {
  if (!media || typeof media !== 'object') return ''

  const mediaObject = media as MediaLike

  return mediaObject?.url || ''
}

function getMediaAlt(media: unknown, fallback: string) {
  if (!media || typeof media !== 'object') return fallback

  const mediaObject = media as MediaLike

  return mediaObject?.alt || fallback
}

function getBlurDataURL(source: Record<string, any> | null | undefined, key: string) {
  return source?.[`${key}BlurDataURL`] || ''
}

function CS_ProductShowcaseGrid({ block }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const desktopScrollAreaRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])

  const items = useMemo(() => {
    return block?.products?.items?.filter(Boolean) ?? []
  }, [block?.products?.items])

  const initialActiveIndex = useMemo(() => {
    const defaultIndex = items.findIndex((item) => item?.menu?.defaultActive)

    return defaultIndex >= 0 ? defaultIndex : 0
  }, [items])

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)

  const activeIndexRef = useRef(initialActiveIndex)

  const activeItem = items[activeIndex]

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    setActiveIndex(initialActiveIndex)
    activeIndexRef.current = initialActiveIndex
  }, [initialActiveIndex])

  const getDesktopTrackY = () => {
    const activeRow = rowRefs.current[activeIndex]

    if (!activeRow) return 0

    return -activeRow.offsetTop
  }

  const scrollToProductIndex = (index: number) => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 1024) return
    if (items.length <= 1) return

    const scrollArea = desktopScrollAreaRef.current

    if (!scrollArea) return

    const scrollAreaRect = scrollArea.getBoundingClientRect()
    const currentScrollY = window.scrollY

    const stickyTopOffset = window.innerWidth >= 1700 ? 120 : window.innerWidth >= 1439 ? 105 : 90

    const scrollStart = currentScrollY + scrollAreaRect.top - stickyTopOffset

    const scrollEnd = currentScrollY + scrollAreaRect.bottom - window.innerHeight

    const scrollRange = Math.max(0, scrollEnd - scrollStart)

    const progress = items.length > 1 ? index / (items.length - 1) : 0

    const targetY = Math.max(0, scrollStart + scrollRange * progress)

    const lenis = (window as any)?.lenis

    if (lenis?.scrollTo) {
      lenis.scrollTo(targetY, {
        duration: 0.22,
        force: true,
      })

      return
    }

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }

  const handleProductSelect = (index: number) => {
    activeIndexRef.current = index

    setActiveIndex(index)

    scrollToProductIndex(index)
  }

  useGSAP(
    () => {
      const track = trackRef.current
      const activeRow = rowRefs.current[activeIndex]

      if (!track || !activeRow) return

      gsap.to(track, {
        y: getDesktopTrackY(),

        duration: 0.28,

        ease: 'power3.inOut',

        overwrite: 'auto',
      })
    },
    {
      scope: rootRef,
      dependencies: [activeIndex, items.length],
    },
  )

  useGSAP(
    () => {
      const scrollArea = desktopScrollAreaRef.current

      if (!scrollArea || items.length <= 1) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const scrollTrigger = ScrollTrigger.create({
          trigger: scrollArea,

          start: 'top top+=90',

          end: 'bottom bottom',

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const nextIndex = Math.min(
              items.length - 1,

              Math.max(
                0,

                Math.round(self.progress * (items.length - 1)),
              ),
            )

            if (nextIndex === activeIndexRef.current) {
              return
            }

            activeIndexRef.current = nextIndex

            setActiveIndex(nextIndex)
          },
        })

        ScrollTrigger.refresh()

        return () => {
          scrollTrigger.kill()
        }
      })

      return () => {
        mm.revert()
      }
    },
    {
      scope: rootRef,
      dependencies: [items.length],
    },
  )

  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current

      if (!track) return

      gsap.set(track, {
        y: getDesktopTrackY(),
      })

      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [activeIndex, items.length])

  if (!items.length) return null

  const desktopScrollAreaHeight = `calc(100vh + ${Math.max(1, items.length - 1) * 28}vh)`

  const renderMenuIcon = ({
    item,
    isActive,
  }: {
    item: NonNullable<typeof items>[number]
    isActive: boolean
  }) => {
    const coloredIcon = getMediaUrl(item?.mainIcon?.mainIconColored)

    const whiteIcon = getMediaUrl(item?.mainIcon?.mainIconWhite)

    return (
      <>
        {coloredIcon && (
          <Image
            src={coloredIcon}
            alt={getMediaAlt(item?.mainIcon?.mainIconColored, item?.menu?.label || 'Product icon')}
            fill
            quality={100}
            className={`
              object-contain object-center
              transition-opacity duration-300

              ${isActive ? 'opacity-0' : 'opacity-100 group-hover/product-menu:opacity-0'}
            `}
            placeholder={
              getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored')
                ? 'blur'
                : 'empty'
            }
            blurDataURL={
              getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored') || undefined
            }
          />
        )}

        {whiteIcon && (
          <Image
            src={whiteIcon}
            alt={getMediaAlt(item?.mainIcon?.mainIconWhite, item?.menu?.label || 'Product icon')}
            fill
            quality={100}
            className={`
              object-contain object-center
              transition-opacity duration-300

              ${isActive ? 'opacity-100' : 'opacity-0 group-hover/product-menu:opacity-100'}
            `}
            placeholder={
              getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconWhite')
                ? 'blur'
                : 'empty'
            }
            blurDataURL={
              getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconWhite') || undefined
            }
          />
        )}
      </>
    )
  }

  const renderMenuProduct = ({
    item,
    isActive,
  }: {
    item: NonNullable<typeof items>[number]
    isActive: boolean
  }) => {
    const productLogo = getMediaUrl(item?.productLogo)

    return (
      <>
        <span
          className="
            relative
            size-[23px]
            shrink-0

            xl:size-[25px]
            2xl:size-[28px]
          "
        >
          {renderMenuIcon({
            item,
            isActive,
          })}
        </span>

        {productLogo ? (
          <span
            className="
              relative block shrink-0

              aspect-[1216/320]

              w-[75px]

              xl:w-[86px]

              2xl:w-[98px]
            "
          >
            <Image
              src={productLogo}
              alt={getMediaAlt(item?.productLogo, item?.menu?.label || 'Product logo')}
              fill
              quality={100}
              className={`
                object-contain
                object-left

                transition-[filter]
                duration-300

                ${
                  isActive
                    ? 'brightness-0 invert'
                    : 'group-hover/product-menu:brightness-0 group-hover/product-menu:invert'
                }
              `}
              placeholder={
                getBlurDataURL(item as Record<string, any>, 'productLogo') ? 'blur' : 'empty'
              }
              blurDataURL={getBlurDataURL(item as Record<string, any>, 'productLogo') || undefined}
            />
          </span>
        ) : (
          <span className="whitespace-nowrap">{item?.menu?.label}</span>
        )}
      </>
    )
  }

  const renderProductContent = (item: NonNullable<typeof items>[number], mobile = false) => {
    const mainIcon = getMediaUrl(item?.mainIcon?.mainIconColored)

    const productLogo = getMediaUrl(item?.productLogo)

    const productImage = getMediaUrl(item?.productImage)

    const highlights = item?.mainContent?.productHighlights?.filter(Boolean) ?? []

    return (
      <div
        className={`
          w-full min-w-0

          ${
            mobile
              ? `
                  flex flex-col
                  items-center
                  text-center
                `
              : `
                  grid
                  grid-cols-2
                  items-center

                  lg:gap-[36px]

                  xl:gap-[52px]

                  2xl:gap-[68px]
                `
          }
        `}
      >
        {/* =================================================
            LEFT 50%
        ================================================= */}

        <div
          className={`
            min-w-0

            ${
              mobile
                ? `
                    flex w-full
                    flex-col
                    items-center
                  `
                : `
                    flex
                    w-full
                    flex-col
                    items-center
                    justify-center

                    px-[18px]

                    lg:px-[24px]

                    xl:px-[34px]

                    2xl:px-[44px]
                  `
            }
          `}
        >
          {/* icon + product logo */}

          <div
            className={`
              flex
              items-center

              ${
                mobile
                  ? `
                      justify-center
                      gap-[12px]
                    `
                  : `
                      w-full
                      justify-center

                      lg:gap-[13px]

                      xl:gap-[17px]

                      2xl:gap-[20px]
                    `
              }
            `}
          >
            {/* {mainIcon && (
              <div
                className="
                  relative
                  shrink-0

                  aspect-square

                  w-[52px]

                  md:w-[58px]

                  lg:w-[54px]

                  xl:w-[62px]

                  2xl:w-[70px]
                "
              >
                <Image
                  src={mainIcon}
                  alt={getMediaAlt(
                    item?.mainIcon?.mainIconColored,
                    item?.menu?.label || 'Product icon',
                  )}
                  fill
                  quality={100}
                  className="
                    object-contain
                    object-center
                  "
                  placeholder={
                    getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored')
                      ? 'blur'
                      : 'empty'
                  }
                  blurDataURL={
                    getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored') ||
                    undefined
                  }
                />
              </div>
            )} */}

            {mainIcon && (
              <div
                className="
      relative
      shrink-0
      aspect-square

      w-[52px]
      md:w-[58px]
      lg:w-[54px]
      xl:w-[62px]
      2xl:w-[70px]

      overflow-hidden
      rounded-[10px]
      border-2 border-primary-1/30
      bg-white-1/25

      shadow-[0_6px_20px_rgba(0,108,103,0.08)]

      md:rounded-[11px]
      xl:rounded-[13px]
      2xl:rounded-[14px]
    "
              >
                <div
                  className="
        absolute inset-[6px]

        md:inset-[7px]
        xl:inset-[8px]
        2xl:inset-[9px]
      "
                >
                  <Image
                    src={mainIcon}
                    alt={getMediaAlt(
                      item?.mainIcon?.mainIconColored,
                      item?.menu?.label || 'Product icon',
                    )}
                    fill
                    quality={100}
                    className="
          object-contain
          object-center
        "
                    placeholder={
                      getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored')
                        ? 'blur'
                        : 'empty'
                    }
                    blurDataURL={
                      getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored') ||
                      undefined
                    }
                  />
                </div>
              </div>
            )}
            {productLogo && (
              <div
                className="
                  relative

                  aspect-[1216/320]

                  w-[180px]

                  md:w-[220px]

                  lg:w-[190px]

                  xl:w-[225px]

                  2xl:w-[260px]
                "
              >
                <Image
                  src={productLogo}
                  alt={getMediaAlt(item?.productLogo, `${item?.menu?.label || 'Product'} logo`)}
                  fill
                  quality={100}
                  className="
                    object-contain
                    object-center
                  "
                  placeholder={
                    getBlurDataURL(item as Record<string, any>, 'productLogo') ? 'blur' : 'empty'
                  }
                  blurDataURL={
                    getBlurDataURL(item as Record<string, any>, 'productLogo') || undefined
                  }
                />
              </div>
            )}
          </div>

          {/* product title */}

          {item?.mainContent?.title && (
            <h3
              className="
                mt-[14px] xl:mt-[20px]

                text-center
                font-agency

                text-[20px]
                leading-[1.12]

                text-secondary-1

                md:text-[24px]

                lg:text-[22px]

                xl:text-[26px]

                2xl:text-[30px]
              "
            >
              {item.mainContent.title}
            </h3>
          )}

          {/* highlights */}

          {highlights.length > 0 && (
            <div
              className="
                mt-[14px]

                flex
                max-w-full
                flex-wrap
                items-center
                justify-center

                gap-x-[8px]
                gap-y-[5px]

                xl:gap-x-[11px]

                2xl:gap-x-[13px]
              "
            >
              {highlights.map((highlight, index) => (
                <React.Fragment key={highlight?.id ?? `${index}-${highlight?.text ?? ''}`}>
                  <span
                    className="
                        whitespace-nowrap

                        font-grift
                        global-p5

                        text-[#3E4949]
                      "
                  >
                    {highlight?.text}
                  </span>

                  {index < highlights.length - 1 && (
                    <span
                      className="
                          block
                          size-[3px]
                          shrink-0
                          rounded-full

                          bg-primary-1
                        "
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            RIGHT 50%

            EVERY ITEM USES THE EXACT SAME BOX:
            - same width
            - same height
            - same aspect ratio

            This stops MedCore/SellFast/EduSphere rows from
            receiving different layout sizes.
        ================================================= */}

        {productImage && (
          <div
            className={`
              flex
              w-full
              min-w-0
              items-center
              justify-center

              ${mobile ? 'mt-[24px]' : ''}
            `}
          >
            <div
              className="
                relative

                aspect-[1473/965]

                w-full

                max-w-[360px]

                md:max-w-[430px]

                lg:max-w-[330px]

                xl:max-w-[390px]

                2xl:max-w-[455px]
              "
            >
              <Image
                src={productImage}
                alt={getMediaAlt(item?.productImage, `${item?.menu?.label || 'Product'} showcase`)}
                fill
                quality={100}
                className="
                  object-contain
                  object-center
                "
                placeholder={
                  getBlurDataURL(item as Record<string, any>, 'productImage') ? 'blur' : 'empty'
                }
                blurDataURL={
                  getBlurDataURL(item as Record<string, any>, 'productImage') || undefined
                }
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={rootRef} className="min-w-0">
      {/* ===================================================
          MOBILE + TABLET
      =================================================== */}

      <div className="lg:hidden">
        <div className="mt-[26px] text-center">
          {block?.products?.title && (
            <h3
              className="
                font-agency

                text-[24px]
                leading-[1]

                text-secondary-1

                md:text-[30px]
              "
            >
              {block.products.title}
            </h3>
          )}

          {block?.products?.subtitle && (
            <p
              className="
                mt-[7px]

                font-grift
                global-p5

                text-[#3E4949]
              "
            >
              {block.products.subtitle}
            </p>
          )}
        </div>

        {/* mobile product menu */}

        <div
          className="
            no-scrollbar

            mt-[16px]

            flex
            gap-[8px]

            overflow-x-auto

            pb-[5px]
          "
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={item?.id ?? index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`
                  group/product-menu

                  inline-flex
                  shrink-0
                  items-center

                  gap-[7px]

                  rounded-[8px]

                  border
                  border-transparent

                  px-[10px]
                  py-[8px]

                  transition-all
                  duration-300
                  ease-out

                  ${
                    isActive
                      ? `
                          bg-primary-1

                          text-white-1

                          shadow-[0_12px_28px_rgba(0,108,103,0.18)]
                        `
                      : `
                          bg-transparent

                          text-primary-1

                          hover:border-primary-1

                          hover:bg-primary-1
                        `
                  }
                `}
              >
                {renderMenuProduct({
                  item,
                  isActive,
                })}
              </button>
            )
          })}
        </div>

        {activeItem && (
          <div className="mt-[26px] min-w-0">{renderProductContent(activeItem, true)}</div>
        )}
      </div>

      {/* ===================================================
          DESKTOP
      =================================================== */}

      <div
        ref={desktopScrollAreaRef}
        className="hidden lg:block"
        style={{
          height: desktopScrollAreaHeight,
        }}
      >
        <div
          className="
            sticky

            top-[90px]

            xl:top-[105px]

            2xl:top-[120px]
          "
        >
          <div
            className="
              hidden
              min-w-0

              lg:grid

              lg:grid-cols-[145px_1px_minmax(0,1fr)]

              lg:gap-[20px]

              xl:grid-cols-[165px_1px_minmax(0,1fr)]

              xl:gap-[28px]

              2xl:grid-cols-[185px_1px_minmax(0,1fr)]

              2xl:gap-[36px]
            "
          >
            {/* =============================================
                PRODUCT MENU
            ============================================= */}

            <aside
              className="
                flex
                min-w-0
                flex-col

                lg:pt-[4px]
              "
            >
              <div>
                {block?.products?.title && (
                  <h3
                    className="
                      font-agency

                      text-[#191C1E]

                      lg:global-h7
                    "
                  >
                    {block.products.title}
                  </h3>
                )}

                {block?.products?.subtitle && (
                  <p
                    className="
                      mt-[7px]

                      font-grift
                      global-p6

                      text-[#3E4949]
                    "
                  >
                    {block.products.subtitle}
                  </p>
                )}
              </div>

              <div
                className="
                  flex flex-col

                  lg:mt-[26px]
                  lg:gap-[10px]

                  xl:mt-[30px]
                  xl:gap-[12px]

                  2xl:mt-[38px]
                  2xl:gap-[14px]
                "
              >
                {items.map((item, index) => {
                  const isActive = index === activeIndex

                  return (
                    <button
                      key={item?.id ?? index}
                      type="button"
                      onClick={() => handleProductSelect(index)}
                      aria-pressed={isActive}
                      className={`
                          group/product-menu

                          inline-flex
                          w-full
                          shrink-0
                          items-center

                          rounded-[7px]

                          border
                          border-transparent

                          transition-all
                          duration-300
                          ease-out

                          outline-none
                          focus:outline-none
                          focus-visible:outline-none
                          focus-visible:ring-0

                          lg:gap-[7px]
                          lg:px-[8px]
                          lg:py-[8px]

                          xl:gap-[8px]
                          xl:px-[10px]
                          xl:py-[9px]

                          2xl:gap-[9px]
                          2xl:px-[11px]
                          2xl:py-[10px]

                          ${
                            isActive
                              ? `
                                  bg-primary-1

                                  text-white-1

                                  shadow-[0_12px_28px_rgba(0,108,103,0.18)]
                                `
                              : `
                                  bg-transparent

                                  text-primary-1

                                  hover:border-primary-1

                                  hover:bg-primary-1
                                `
                          }
                        `}
                    >
                      {renderMenuProduct({
                        item,
                        isActive,
                      })}
                    </button>
                  )
                })}
              </div>
            </aside>

            {/* divider */}

            <div className="bg-primary-1/70" />

            {/* =============================================
                PRODUCT VIEWPORT
            ============================================= */}

            <div
              className="
                relative
                min-w-0
                overflow-hidden

                lg:h-[650px]
                xl:h-[720px]
                2xl:h-[780px]
              "
            >
              <div
                ref={trackRef}
                className="
                  relative
                  z-10

                  will-change-transform
                "
              >
                {items.map((item, index) => (
                  <div
                    key={item?.id ?? index}
                    ref={(node) => {
                      rowRefs.current[index] = node
                    }}
                    className="
                        relative

                        flex
                        min-w-0
                        items-center

                        lg:min-h-[325px]
                        xl:min-h-[360px]
                        2xl:min-h-[390px]
                      "
                  >
                    {renderProductContent(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CS_ProductShowcaseGrid
