'use client'

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { gsap, useGSAP } from '@/lib/gsap'
import { useActiveCard, type CardKey } from '@/contexts/ActiveCardContext'
import { CardInfoBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEvent, useMemo, useRef } from 'react'

type Props = {
  block: CardInfoBlockType
}

type MediaLike = {
  url?: string | null
  alt?: string | null
}

/* =========================================================
   HELPERS
========================================================= */

function normalizePath(value: string) {
  const cleaned = String(value || '/').replace(/\/+$/, '')

  return cleaned || '/'
}

function resolvePageHref(relation: unknown) {
  if (!relation) return '#'

  if (typeof relation === 'object') {
    const relationAny = relation as any

    const slug = relationAny?.slug ?? relationAny?.value?.slug

    if (typeof slug === 'string') {
      const cleanSlug = slug.replace(/^\/+|\/+$/g, '').trim()

      if (!cleanSlug || cleanSlug === 'index' || cleanSlug === 'home') {
        return '/'
      }

      return `/${cleanSlug}`
    }
  }

  if (typeof relation === 'string') {
    if (relation === 'index' || relation === '/index') {
      return '/'
    }

    if (relation.startsWith('/')) {
      return relation
    }
  }

  return '#'
}

function buildHref(relation: unknown, sectionId?: string | null) {
  const base = resolvePageHref(relation)

  const cleanSectionId = String(sectionId ?? '')
    .trim()
    .replace(/^#/, '')

  if (!cleanSectionId) {
    return base
  }

  return `${base}#${cleanSectionId}`
}

function getMedia(media: unknown): MediaLike | null {
  if (!media || typeof media !== 'object') {
    return null
  }

  return media as MediaLike
}

/* =========================================================
   COMPONENT
========================================================= */

function CardInfoSection({ block }: Props) {
  const rootRef = useRef<HTMLElement | null>(null)
  const { activeCard, setActiveCard } = useActiveCard()

  /*
   * Desktop card refs
   */
  const desktopWorldCardRef = useRef<HTMLAnchorElement | null>(null)

  const desktopVisaCardRef = useRef<HTMLAnchorElement | null>(null)

  /*
   * Mobile / tablet card refs
   */
  const mobileWorldCardRef = useRef<HTMLAnchorElement | null>(null)

  const mobileVisaCardRef = useRef<HTMLAnchorElement | null>(null)

  const selector = block?.cardSelector

  const world = selector?.worldElite
  const visa = selector?.visaInfinite

  /* =======================================================
     MEDIA
  ======================================================= */

  const worldImage = getMedia(world?.cardImage)

  const visaImage = getMedia(visa?.cardImage)
  const groovyDesign = getMedia(block?.groovyDesign)

  /* =======================================================
     URLS
  ======================================================= */

  const worldHref = useMemo(
    () => buildHref(world?.buttonLink, world?.sectionId),
    [world?.buttonLink, world?.sectionId],
  )

  const visaHref = useMemo(
    () => buildHref(visa?.buttonLink, visa?.sectionId),
    [visa?.buttonLink, visa?.sectionId],
  )

  /* =======================================================
     GSAP STACK ANIMATION

     IMPORTANT:

     active scale   = 1
     inactive scale = 1

     Cards always remain exactly the same size.

     Depth comes from:
     - z-index
     - x/y movement
     - opacity
     - brightness

     Both mobile and desktop stacks are animated.
  ======================================================= */

  useGSAP(
    () => {
      const animatePair = (
        worldElement: HTMLElement | null,
        visaElement: HTMLElement | null,
        mobile = false,
      ) => {
        if (!worldElement || !visaElement) {
          return
        }

        const activeElement = activeCard === 'worldElite' ? worldElement : visaElement

        const inactiveElement = activeCard === 'worldElite' ? visaElement : worldElement

        gsap.killTweensOf([worldElement, visaElement])

        // Keep each card's dimensions and angle fixed in either state.
        gsap.set(worldElement, { rotation: -5, scale: 1 })
        gsap.set(visaElement, { rotation: 5, scale: 1 })

        /*
         * Correct stacking order.
         *
         * Because both cards now occupy the SAME CSS grid
         * cell, z-index genuinely puts one above the other.
         */
        gsap.set(activeElement, {
          zIndex: 20,
        })

        gsap.set(inactiveElement, {
          zIndex: 10,
        })

        /*
         * FRONT CARD
         */
        gsap.to(activeElement, {
          xPercent: activeCard === 'worldElite' ? -8 : -5,

          yPercent: mobile ? -2 : -3,

          scale: 1,

          autoAlpha: 1,

          filter: 'brightness(1)',

          duration: 0.72,

          ease: 'power3.out',

          overwrite: 'auto',
        })

        /*
         * BACK CARD
         *
         * SAME SIZE.
         *
         * Moves only a controlled distance behind
         * the active card so they remain visibly stacked.
         */
        gsap.to(inactiveElement, {
          xPercent: activeCard === 'worldElite' ? 18 : 15,

          yPercent: mobile ? 3 : 4,

          scale: 1,

          autoAlpha: 0.72,

          filter: 'brightness(0.78)',

          duration: 0.72,

          ease: 'power3.inOut',

          overwrite: 'auto',
        })
      }

      animatePair(desktopWorldCardRef.current, desktopVisaCardRef.current, false)

      animatePair(mobileWorldCardRef.current, mobileVisaCardRef.current, true)
    },
    {
      scope: rootRef,

      dependencies: [activeCard],
    },
  )

  /* =======================================================
     ACTIVATE CARD

     Used by:

     - card selector buttons
     - card images
     - 01 / 02

     Same-page selection:
     → state changes
     → URL changes
     → no browser anchor jump
  ======================================================= */

  const activateCard = (card: CardKey, href: string) => {
    setActiveCard(card)

    if (typeof window === 'undefined') {
      return
    }

    if (!href || href === '#') {
      return
    }

    const [targetPathRaw] = href.split('#')

    const targetPath = normalizePath(targetPathRaw || '/')

    const currentPath = normalizePath(window.location.pathname)

    if (targetPath === currentPath) {
      if (new URL(href, window.location.href).href !== window.location.href) {
        window.history.pushState(window.history.state, '', href)
      }
    }
  }

  /* =======================================================
     LINK CLICK
  ======================================================= */

  const handleCardLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    card: CardKey,
    href: string,
  ) => {
    if (
      typeof window === 'undefined' ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    if (!href || href === '#') {
      event.preventDefault()

      activateCard(card, href)

      return
    }

    const [targetPathRaw] = href.split('#')

    const targetPath = normalizePath(targetPathRaw || '/')

    const currentPath = normalizePath(window.location.pathname)

    /*
     * Same-page card state.
     */
    if (targetPath === currentPath) {
      event.preventDefault()

      activateCard(card, href)
    }
  }

  /* =======================================================
     BUTTON
  ======================================================= */

  const renderSelectorButton = (card: CardKey, label: string, href: string) => {
    const active = activeCard === card

    return (
      <Link
        href={href}
        onClick={(event) => handleCardLinkClick(event, card, href)}
        aria-pressed={active}
        className={`
          inline-flex

          min-h-[38px]
          min-w-[118px]

          items-center
          justify-center

          rounded-[6px]

          border

          px-[15px]
          py-[8px]

          font-roboto

          text-[13px]

          font-normal

          transition-all
          duration-300
          ease-out

          sm:min-h-[42px]
          sm:min-w-[130px]
          sm:text-[14px]

          md:min-h-[46px]
          md:min-w-[145px]
          md:text-[15px]

          lg:min-h-[48px]
          lg:min-w-[160px]
          lg:text-[16px]

          xl:min-h-[52px]
          xl:min-w-[180px]
          xl:px-[24px]
          xl:text-[18px]

          2xl:min-h-[58px]
          2xl:min-w-[205px]
          2xl:text-[20px]

          ${
            active
              ? `
                  border-[#F52832]

                  bg-[#F52832]

                  text-white

                  shadow-[0_10px_26px_rgba(245,40,50,0.16)]
                `
              : `
                  border-white/55

                  bg-transparent

                  text-white/85

                  hover:border-white

                  hover:bg-white/[0.06]

                  hover:text-white
                `
          }
        `}
      >
        {label}
      </Link>
    )
  }

  /* =======================================================
     STATUS INDICATOR

     01 and 02 always have IDENTICAL dimensions/font-size.
  ======================================================= */

  const renderIndicator = () => {
    return (
      <div
        className="
          flex

          items-center
          justify-center

          gap-[9px]

          font-roboto

          sm:gap-[10px]

          xl:gap-[12px]
        "
      >
        <Link
          href={worldHref}
          onClick={(event) => handleCardLinkClick(event, 'worldElite', worldHref)}
          aria-label="Select World Elite"
          className={`
            text-[9px]

            font-semibold

            leading-none

            transition-colors
            duration-300

            sm:text-[10px]

            md:text-[11px]

            lg:text-[16px]

            xl:text-[18px]

            2xl:text-[20px]

            ${activeCard === 'worldElite' ? 'text-[#F52832]' : 'text-white/45 hover:text-white/80'}
          `}
        >
          01
        </Link>

        <Link
          href={visaHref}
          onClick={(event) => handleCardLinkClick(event, 'visaInfinite', visaHref)}
          aria-label="Select Visa Infinite"
          className={`
            text-[9px]

            font-semibold

            leading-none

            transition-colors
            duration-300

            sm:text-[10px]

            md:text-[11px]

            lg:text-[16px]

            xl:text-[18px]

            2xl:text-[20px]

            ${
              activeCard === 'visaInfinite' ? 'text-[#F52832]' : 'text-white/45 hover:text-white/80'
            }
          `}
        >
          02
        </Link>
      </div>
    )
  }

  /* =======================================================
     WORLD CARD
  ======================================================= */

  const renderWorldCard = (ref: React.RefObject<HTMLAnchorElement | null>, mobile = false) => {
    if (!worldImage?.url) {
      return null
    }

    return (
      <Link
        ref={ref}
        href={worldHref}
        onClick={(event) => handleCardLinkClick(event, 'worldElite', worldHref)}
        aria-label={world?.cardName || 'World Elite'}
        className={`
          relative

          col-start-1
          row-start-1

          block

          cursor-pointer

          will-change-transform

          ${
            mobile
              ? `
                  w-[48%]

                  sm:w-[44%]

                  md:w-[40%]
                `
              : `
                  lg:w-[49%]

                  xl:w-[47%]

                  2xl:w-[45%]

                  3xl:w-[43%]
                `
          }
        `}
      >
        <div
          className="
            relative

            aspect-[3/4]

            w-full
          "
        >
          <Image
            src={worldImage.url}
            alt={worldImage.alt || world?.cardName || 'World Elite'}
            fill
            priority
            quality={100}
            className="
              object-cover
              object-center

              drop-shadow-[0_24px_32px_rgba(0,0,0,0.34)]
            "
            placeholder={world?.cardImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={world?.cardImageBlurDataURL || undefined}
            sizes="
              (max-width: 1023px) 50vw,
              28vw
            "
          />
        </div>
      </Link>
    )
  }

  /* =======================================================
     VISA CARD
  ======================================================= */

  const renderVisaCard = (ref: React.RefObject<HTMLAnchorElement | null>, mobile = false) => {
    if (!visaImage?.url) {
      return null
    }

    return (
      <Link
        ref={ref}
        href={visaHref}
        onClick={(event) => handleCardLinkClick(event, 'visaInfinite', visaHref)}
        aria-label={visa?.cardName || 'Visa Infinite'}
        className={`
          relative

          col-start-1
          row-start-1

          block

          cursor-pointer

          will-change-transform

          ${
            mobile
              ? `
                  w-[48%]

                  sm:w-[44%]

                  md:w-[40%]
                `
              : `
                  lg:w-[49%]

                  xl:w-[47%]

                  2xl:w-[45%]

                  3xl:w-[43%]
                `
          }
        `}
      >
        <div
          className="
            relative

            aspect-[3/4]

            w-full
          "
        >
          <Image
            src={visaImage.url}
            alt={visaImage.alt || visa?.cardName || 'Visa Infinite'}
            fill
            priority
            quality={100}
            className="
              object-cover
              object-center

              drop-shadow-[0_24px_32px_rgba(0,0,0,0.34)]
            "
            placeholder={visa?.cardImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={visa?.cardImageBlurDataURL || undefined}
            sizes="
              (max-width: 1023px) 50vw,
              28vw
            "
          />
        </div>
      </Link>
    )
  }

  return (
    <section
      ref={rootRef}
      className="
        relative
        overflow-hidden
        text-white
      "
    >
      {groovyDesign?.url && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${JSON.stringify(groovyDesign.url)})` }}
        />
      )}
      {/* =================================================
          HASH TARGETS
      ================================================= */}

      {world?.sectionId && (
        <span
          id={world.sectionId}
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            left-0
            top-0

            h-px
            w-px

            scroll-mt-[100px]
          "
        />
      )}

      {visa?.sectionId && (
        <span
          id={visa.sectionId}
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            left-0
            top-0

            h-px
            w-px

            scroll-mt-[100px]
          "
        />
      )}

      {/* =================================================
          NO VERTICAL SECTION PADDING
      ================================================= */}

      <div
        className="
          container-padding

          relative
          z-10

          w-full
        "
      >
        <div
          className="
            grid
            grid-cols-1

            gap-y-[22px]

            sm:gap-y-[26px]

            md:gap-y-[30px]

            lg:grid-cols-[0.92fr_1.08fr]

            lg:grid-rows-[auto_auto_auto]

            lg:gap-x-[54px]

            lg:gap-y-[26px]

            xl:gap-x-[74px]

            2xl:gap-x-[92px]
            
          "
        >
          {/* =================================================
              TITLE + SUBTITLE

              Mobile:
              centered

              Desktop:
              left
          ================================================= */}

          <div
            className="
              order-1
              
              text-center

              lg:col-start-1
              lg:row-start-1

              lg:text-left

              lg:self-end
            "
          >
            {block?.content?.title && (
              <h2
                className="
                  font-baltiholm

                  font-normal

                  leading-[0.85]

                  text-white

                  global-h1
                "
              >
                {block.content.title}
              </h2>
            )}

            {block?.content?.subtitle && (
              <div
                className="
                  mt-[6px]

                  font-roboto

                  font-normal

                  leading-[1.25]

                  text-white

                  sm:mt-[8px]
                  global-p1
                "
              >
                {block.content.subtitle}
              </div>
            )}
          </div>

          {/* =================================================
              MOBILE/TABLET CARD STACK

              True stacking:

              both links:
              col-start-1
              row-start-1

              They occupy THE SAME grid cell.
          ================================================= */}

          <div
            className="
              order-2

              lg:hidden
            "
          >
            <div
              className="
                grid

                w-full

                place-items-center

                overflow-visible

                py-[6px]

              "
            >
              {renderWorldCard(mobileWorldCardRef, true)}

              {renderVisaCard(mobileVisaCardRef, true)}
            </div>

            {/* 01 / 02 immediately under cards */}

            <div
              className="
                mt-[8%]

                flex

                justify-center
              "
            >
              {renderIndicator()}
            </div>
          </div>

          {/* =================================================
              DESCRIPTION

              Mobile:
              LAST, like reference image.

              Desktop:
              directly under title.
          ================================================= */}

          <div
            className="
              order-4
              
              mx-auto

              max-w-[470px]

              text-center

              lg:order-none

              lg:col-start-1
              lg:row-start-2

              lg:mx-0

              lg:max-w-[620px]

              lg:text-left
            "
          >
            {block?.content?.description && (
              <div
                className="
                  font-roboto

                  font-normal

                  leading-[1.38]

                  text-[#D9D9D9]

                  global-p2
                "
              >
                <LocalizedRichText en={block.content.description} bn={block.content.description} />
              </div>
            )}
          </div>

          {/* =================================================
              CARD SELECTOR

              Mobile reference:

              Choose Your Card

              [ Visa Infinite ] [ World Elite ]

              Desktop:

              [ World Elite ] [ Visa Infinite ]
          ================================================= */}

          <div
            className="
              order-3
              
              text-center

              lg:order-none

              lg:col-start-1
              lg:row-start-3

              lg:text-left

              lg:self-start
            "
          >
            {selector?.title && (
              <div
                className="
                  mb-[9px]

                  font-roboto

                  font-normal

                  text-[#D9D9D9]

                  global-p3
                "
              >
                {selector.title}
              </div>
            )}

            <div
              className="
                flex

                flex-row-reverse

                flex-wrap

                items-center
                justify-center

                gap-[8px]

                sm:gap-[10px]

                md:gap-[12px]

                lg:flex-row

                lg:justify-start

                lg:gap-[14px]

                xl:gap-[16px]
              "
            >
              {renderSelectorButton(
                'worldElite',

                world?.buttonLabel || world?.cardName || 'World Elite',

                worldHref,
              )}

              {renderSelectorButton(
                'visaInfinite',

                visa?.buttonLabel || visa?.cardName || 'Visa Infinite',

                visaHref,
              )}
            </div>
          </div>

          {/* =================================================
              DESKTOP CARD STACK

              IMPORTANT:
              CSS grid overlap, not absolute positioning.

              Both cards occupy:
              col 1 / row 1

              GSAP only changes:
              zIndex
              xPercent
              yPercent
              brightness
          ================================================= */}

          <div
            className="
              hidden
              
              lg:col-start-2

              lg:row-start-1
              lg:row-span-3

              lg:flex

              lg:min-w-0

              lg:flex-col

              lg:items-center
              lg:justify-center
            "
          >
            <div
              className="
                grid

                w-full

                place-items-center

                overflow-visible
              "
            >
              {renderWorldCard(desktopWorldCardRef)}

              {renderVisaCard(desktopVisaCardRef)}
            </div>

            <div
              className="
                mt-[8%]

                flex

                justify-center

              "
            >
              {renderIndicator()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardInfoSection
