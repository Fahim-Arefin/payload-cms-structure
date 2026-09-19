// 'use client'

// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { gsap, useGSAP } from '@/lib/gsap'
// import { CardInfoBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

// type Props = {
//   block: CardInfoBlockType
// }

// type CardKey = 'worldElite' | 'visaInfinite'

// type MediaLike = {
//   url?: string | null
//   alt?: string | null
// }

// /* =========================================================
//    HELPERS
// ========================================================= */

// function normalizePath(value: string) {
//   const cleaned = String(value || '/').replace(/\/+$/, '')

//   return cleaned || '/'
// }

// function resolvePageHref(relation: unknown) {
//   if (!relation) return '#'

//   if (typeof relation === 'object') {
//     const relationAny = relation as any

//     const slug = relationAny?.slug ?? relationAny?.value?.slug

//     if (typeof slug === 'string') {
//       const cleanSlug = slug.replace(/^\/+|\/+$/g, '').trim()

//       if (!cleanSlug || cleanSlug === 'index' || cleanSlug === 'home') {
//         return '/'
//       }

//       return `/${cleanSlug}`
//     }
//   }

//   if (typeof relation === 'string') {
//     if (relation === 'index' || relation === '/index') {
//       return '/'
//     }

//     if (relation.startsWith('/')) {
//       return relation
//     }
//   }

//   return '#'
// }

// function buildHref(relation: unknown, sectionId?: string | null) {
//   const base = resolvePageHref(relation)

//   const cleanSectionId = String(sectionId ?? '')
//     .trim()
//     .replace(/^#/, '')

//   if (!cleanSectionId) {
//     return base
//   }

//   return `${base}#${cleanSectionId}`
// }

// function getMedia(media: unknown): MediaLike | null {
//   if (!media || typeof media !== 'object') {
//     return null
//   }

//   return media as MediaLike
// }

// /* =========================================================
//    COMPONENT
// ========================================================= */

// function CardInfoSection({ block }: Props) {
//   const rootRef = useRef<HTMLElement | null>(null)

//   const worldCardRef = useRef<HTMLDivElement | null>(null)
//   const visaCardRef = useRef<HTMLDivElement | null>(null)

//   const selector = block?.cardSelector

//   const world = selector?.worldElite
//   const visa = selector?.visaInfinite

//   const defaultCard: CardKey =
//     selector?.defaultCard === 'visaInfinite' ? 'visaInfinite' : 'worldElite'

//   const [activeCard, setActiveCard] = useState<CardKey>(defaultCard)

//   /* =======================================================
//      MEDIA
//   ======================================================= */

//   const worldImage = getMedia(world?.cardImage)

//   const visaImage = getMedia(visa?.cardImage)

//   /* =======================================================
//      URLS
//   ======================================================= */

//   const worldHref = useMemo(
//     () => buildHref(world?.buttonLink, world?.sectionId),
//     [world?.buttonLink, world?.sectionId],
//   )

//   const visaHref = useMemo(
//     () => buildHref(visa?.buttonLink, visa?.sectionId),
//     [visa?.buttonLink, visa?.sectionId],
//   )

//   /* =======================================================
//      HASH -> CARD STATE
//   ======================================================= */

//   const resolveCardFromHash = useCallback((): CardKey | null => {
//     if (typeof window === 'undefined') {
//       return null
//     }

//     const hash = decodeURIComponent(window.location.hash.replace(/^#/, '').trim())

//     if (!hash) return null

//     if (hash === String(world?.sectionId ?? '').trim()) {
//       return 'worldElite'
//     }

//     if (hash === String(visa?.sectionId ?? '').trim()) {
//       return 'visaInfinite'
//     }

//     return null
//   }, [world?.sectionId, visa?.sectionId])

//   useEffect(() => {
//     const applyHash = () => {
//       const card = resolveCardFromHash()

//       if (card) {
//         setActiveCard(card)
//       }
//     }

//     applyHash()

//     window.addEventListener('hashchange', applyHash)

//     window.addEventListener('popstate', applyHash)

//     return () => {
//       window.removeEventListener('hashchange', applyHash)

//       window.removeEventListener('popstate', applyHash)
//     }
//   }, [resolveCardFromHash])

//   /* =======================================================
//      GSAP CARD STACK

//      IMPORTANT:
//      Both cards always use scale: 1.

//      The inactive one only:
//      - goes behind
//      - moves right/down
//      - rotates
//      - gets slightly darker
//   ======================================================= */

//   useGSAP(
//     () => {
//       const worldElement = worldCardRef.current

//       const visaElement = visaCardRef.current

//       if (!worldElement || !visaElement) {
//         return
//       }

//       const activeElement = activeCard === 'worldElite' ? worldElement : visaElement

//       const inactiveElement = activeCard === 'worldElite' ? visaElement : worldElement

//       gsap.killTweensOf([worldElement, visaElement])

//       /*
//        * Set stacking order first.
//        */
//       gsap.set(activeElement, {
//         zIndex: 20,
//       })

//       gsap.set(inactiveElement, {
//         zIndex: 10,
//       })

//       const timeline = gsap.timeline({
//         defaults: {
//           overwrite: 'auto',
//         },
//       })

//       /*
//        * Active card.
//        *
//        * SAME scale as inactive.
//        */
//       timeline.to(
//         activeElement,
//         {
//           xPercent: -8,

//           yPercent: -5,

//           rotation: activeCard === 'worldElite' ? -5 : 5,

//           scale: 1,

//           autoAlpha: 1,

//           filter: 'brightness(1)',

//           duration: 0.72,

//           ease: 'power3.out',
//         },
//         0,
//       )

//       /*
//        * Inactive card.
//        *
//        * SAME SIZE.
//        * Only goes behind.
//        */
//       timeline.to(
//         inactiveElement,
//         {
//           xPercent: 17,

//           yPercent: 8,

//           rotation: activeCard === 'worldElite' ? 8 : -8,

//           scale: 1,

//           autoAlpha: 0.78,

//           filter: 'brightness(0.78)',

//           duration: 0.72,

//           ease: 'power3.inOut',
//         },
//         0,
//       )

//       return () => {
//         timeline.kill()
//       }
//     },
//     {
//       scope: rootRef,

//       dependencies: [activeCard],
//     },
//   )

//   /* =======================================================
//      CHANGE ACTIVE CARD + URL

//      Used everywhere:
//      - buttons
//      - card images
//      - 01 / 02
//   ======================================================= */

//   const activateCard = (card: CardKey, href: string) => {
//     if (typeof window === 'undefined') {
//       return
//     }

//     if (!href || href === '#') {
//       setActiveCard(card)

//       return
//     }

//     const [targetPathRaw] = href.split('#')

//     const targetPath = normalizePath(targetPathRaw || '/')

//     const currentPath = normalizePath(window.location.pathname)

//     /*
//      * Same page:
//      * update card + URL without causing
//      * browser's default anchor jump.
//      */
//     if (targetPath === currentPath) {
//       setActiveCard(card)

//       window.history.pushState(null, '', href)

//       return
//     }

//     /*
//      * If someone later configures another page,
//      * Link itself will handle that navigation.
//      */
//     setActiveCard(card)
//   }

//   /* =======================================================
//      LINK CLICK
//   ======================================================= */

//   const handleCardLinkClick = (
//     event: MouseEvent<HTMLAnchorElement>,
//     card: CardKey,
//     href: string,
//   ) => {
//     if (typeof window === 'undefined') {
//       return
//     }

//     if (!href || href === '#') {
//       event.preventDefault()

//       activateCard(card, href)

//       return
//     }

//     const [targetPathRaw] = href.split('#')

//     const targetPath = normalizePath(targetPathRaw || '/')

//     const currentPath = normalizePath(window.location.pathname)

//     /*
//      * Same page.
//      */
//     if (targetPath === currentPath) {
//       event.preventDefault()

//       activateCard(card, href)
//     }
//   }

//   /* =======================================================
//      SELECTOR BUTTON
//   ======================================================= */

//   const renderSelectorButton = (card: CardKey, label: string, href: string) => {
//     const active = activeCard === card

//     return (
//       <Link
//         href={href}
//         onClick={(event) => handleCardLinkClick(event, card, href)}
//         aria-pressed={active}
//         className={`
//           inline-flex

//           min-h-[46px]
//           min-w-[145px]

//           items-center
//           justify-center

//           rounded-[5px]

//           border

//           px-[20px]
//           py-[11px]

//           font-roboto

//           text-[15px]
//           font-normal

//           transition-all
//           duration-300
//           ease-out

//           md:min-h-[48px]
//           md:min-w-[160px]
//           md:text-[16px]

//           lg:min-h-[50px]
//           lg:min-w-[170px]
//           lg:text-[17px]

//           xl:min-h-[54px]
//           xl:min-w-[190px]
//           xl:px-[26px]
//           xl:text-[19px]

//           2xl:min-h-[58px]
//           2xl:min-w-[210px]
//           2xl:text-[21px]

//           ${
//             active
//               ? `
//                   border-[#F52832]

//                   bg-[#F52832]

//                   text-white

//                   shadow-[0_10px_26px_rgba(245,40,50,0.16)]
//                 `
//               : `
//                   border-white/55

//                   bg-transparent

//                   text-white/85

//                   hover:border-white

//                   hover:bg-white/[0.06]

//                   hover:text-white
//                 `
//           }
//         `}
//       >
//         {label}
//       </Link>
//     )
//   }

//   return (
//     <section
//       ref={rootRef}
//       className="
//         relative

//         overflow-hidden

//         text-white
//       "
//     >
//       {/* =================================================
//           HASH TARGETS
//       ================================================= */}

//       {world?.sectionId && (
//         <span
//           id={world.sectionId}
//           aria-hidden="true"
//           className="
//             pointer-events-none

//             absolute
//             left-0
//             top-0

//             h-px
//             w-px

//             scroll-mt-[100px]
//           "
//         />
//       )}

//       {visa?.sectionId && (
//         <span
//           id={visa.sectionId}
//           aria-hidden="true"
//           className="
//             pointer-events-none

//             absolute
//             left-0
//             top-0

//             h-px
//             w-px

//             scroll-mt-[100px]
//           "
//         />
//       )}

//       {/* =================================================
//           SUBTLE LIGHTING
//       ================================================= */}

//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none

//           absolute
//           inset-0

//           bg-[radial-gradient(circle_at_72%_42%,rgba(255,255,255,0.035),transparent_36%),radial-gradient(circle_at_15%_78%,rgba(255,255,255,0.025),transparent_42%)]
//         "
//       />

//       {/* =================================================
//           INNER WRAPPER

//           IMPORTANT:
//           No vertical container-padding.

//           Only left/right padding is retained.
//       ================================================= */}

//       <div
//         className="
//           container-padding-x

//           relative
//           z-10

//           w-full
//         "
//       >
//         {/* =================================================
//             MAIN GRID
//         ================================================= */}

//         <div
//           className="
//             grid
//             grid-cols-1

//             items-center

//             gap-[32px]

//             md:gap-[40px]

//             lg:grid-cols-2
//             lg:gap-[42px]

//             xl:gap-[58px]

//             2xl:gap-[72px]
//           "
//         >
//           {/* =================================================
//               LEFT CONTENT
//           ================================================= */}

//           <div
//             className="
//               order-2

//               flex
//               min-w-0
//               flex-col

//               lg:order-1
//             "
//           >
//             {/* =============================================
//                 TITLE

//                 Larger than before.
//             ============================================= */}

//             {block?.content?.title && (
//               <h2
//                 className="
//                   font-baltiholm

//                   text-[64px]

//                   font-normal

//                   leading-[0.88]

//                   text-white

//                   sm:text-[76px]

//                   md:text-[88px]

//                   lg:text-[92px]

//                   xl:text-[108px]

//                   2xl:text-[120px]

//                   3xl:text-[132px]
//                 "
//               >
//                 {block.content.title}
//               </h2>
//             )}

//             {/* =============================================
//                 SUBTITLE
//             ============================================= */}

//             {block?.content?.subtitle && (
//               <div
//                 className="
//                   mt-[12px]

//                   font-roboto

//                   text-[19px]

//                   font-normal

//                   leading-[1.3]

//                   text-white

//                   sm:text-[20px]

//                   md:text-[22px]

//                   lg:text-[22px]

//                   xl:text-[25px]

//                   2xl:text-[28px]

//                   3xl:text-[30px]
//                 "
//               >
//                 {block.content.subtitle}
//               </div>
//             )}

//             {/* =============================================
//                 DESCRIPTION

//                 Larger than before.
//             ============================================= */}

//             {block?.content?.description && (
//               <div
//                 className="
//                   mt-[28px]

//                   max-w-[620px]

//                   font-roboto

//                   text-[15px]

//                   font-normal

//                   leading-[1.5]

//                   text-white/75

//                   sm:text-[16px]

//                   md:text-[17px]

//                   lg:mt-[32px]
//                   lg:text-[18px]

//                   xl:max-w-[680px]
//                   xl:text-[20px]

//                   2xl:mt-[38px]
//                   2xl:max-w-[760px]
//                   2xl:text-[22px]
//                 "
//               >
//                 <LocalizedRichText en={block.content.description} bn={block.content.description} />
//               </div>
//             )}

//             {/* =============================================
//                 SELECTOR
//             ============================================= */}

//             <div
//               className="
//                 mt-[34px]

//                 md:mt-[38px]

//                 lg:mt-[42px]

//                 xl:mt-[48px]
//               "
//             >
//               {selector?.title && (
//                 <div
//                   className="
//                     mb-[13px]

//                     font-roboto

//                     text-[15px]

//                     font-normal

//                     text-white/85

//                     md:text-[16px]

//                     lg:text-[17px]

//                     xl:mb-[15px]

//                     xl:text-[19px]

//                     2xl:text-[20px]
//                   "
//                 >
//                   {selector.title}
//                 </div>
//               )}

//               <div
//                 className="
//                   flex

//                   flex-wrap

//                   items-center

//                   gap-[10px]

//                   md:gap-[14px]

//                   xl:gap-[16px]
//                 "
//               >
//                 {renderSelectorButton(
//                   'worldElite',

//                   world?.buttonLabel || world?.cardName || 'World Elite',

//                   worldHref,
//                 )}

//                 {renderSelectorButton(
//                   'visaInfinite',

//                   visa?.buttonLabel || visa?.cardName || 'Visa Infinite',

//                   visaHref,
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* =================================================
//               RIGHT CARD STACK
//           ================================================= */}

//           <div
//             className="
//               order-1

//               flex
//               w-full

//               items-center
//               justify-center

//               lg:order-2
//             "
//           >
//             <div
//               className="
//                 relative

//                 aspect-[1/0.90]

//                 w-full

//                 max-w-[410px]

//                 sm:max-w-[470px]

//                 md:max-w-[530px]

//                 lg:max-w-[540px]

//                 xl:max-w-[620px]

//                 2xl:max-w-[700px]

//                 3xl:max-w-[760px]
//               "
//             >
//               {/* ===========================================
//                   WORLD ELITE CARD

//                   Card itself is clickable.
//               =========================================== */}

//               {worldImage?.url && (
//                 <Link
//                   href={worldHref}
//                   onClick={(event) => handleCardLinkClick(event, 'worldElite', worldHref)}
//                   aria-label={world?.cardName || 'World Elite'}
//                   className="
//                     absolute

//                     inset-0

//                     z-10
//                   "
//                 >
//                   <div
//                     ref={worldCardRef}
//                     className="
//                       absolute

//                       left-1/2
//                       top-[47%]

//                       w-[59%]

//                       -translate-x-1/2
//                       -translate-y-1/2

//                       cursor-pointer

//                       will-change-transform
//                     "
//                   >
//                     <div
//                       className="
//                         relative

//                         aspect-[579/841]

//                         w-full
//                       "
//                     >
//                       <Image
//                         src={worldImage.url}
//                         alt={worldImage.alt || world?.cardName || 'World Elite'}
//                         fill
//                         priority
//                         quality={100}
//                         className="
//                           object-contain
//                           object-center

//                           drop-shadow-[0_28px_34px_rgba(0,0,0,0.30)]
//                         "
//                         placeholder={world?.cardImageBlurDataURL ? 'blur' : 'empty'}
//                         blurDataURL={world?.cardImageBlurDataURL || undefined}
//                         sizes="
//                           (max-width: 1023px) 60vw,
//                           32vw
//                         "
//                       />
//                     </div>
//                   </div>
//                 </Link>
//               )}

//               {/* ===========================================
//                   VISA INFINITE CARD

//                   Card itself is clickable.
//               =========================================== */}

//               {visaImage?.url && (
//                 <Link
//                   href={visaHref}
//                   onClick={(event) => handleCardLinkClick(event, 'visaInfinite', visaHref)}
//                   aria-label={visa?.cardName || 'Visa Infinite'}
//                   className="
//                     absolute

//                     inset-0

//                     z-10
//                   "
//                 >
//                   <div
//                     ref={visaCardRef}
//                     className="
//                       absolute

//                       left-1/2
//                       top-[47%]

//                       w-[59%]

//                       -translate-x-1/2
//                       -translate-y-1/2

//                       cursor-pointer

//                       will-change-transform
//                     "
//                   >
//                     <div
//                       className="
//                         relative

//                         aspect-[579/841]

//                         w-full
//                       "
//                     >
//                       <Image
//                         src={visaImage.url}
//                         alt={visaImage.alt || visa?.cardName || 'Visa Infinite'}
//                         fill
//                         priority
//                         quality={100}
//                         className="
//                           object-contain
//                           object-center

//                           drop-shadow-[0_28px_34px_rgba(0,0,0,0.30)]
//                         "
//                         placeholder={visa?.cardImageBlurDataURL ? 'blur' : 'empty'}
//                         blurDataURL={visa?.cardImageBlurDataURL || undefined}
//                         sizes="
//                           (max-width: 1023px) 60vw,
//                           32vw
//                         "
//                       />
//                     </div>
//                   </div>
//                 </Link>
//               )}

//               {/* ===========================================
//                   01 / 02

//                   BOTH ALWAYS SAME SIZE.

//                   Clicking indicator changes:
//                   - state
//                   - card
//                   - URL
//               =========================================== */}

//               <div
//                 className="
//                   absolute

//                   bottom-[3%]
//                   left-1/2

//                   z-40

//                   flex

//                   -translate-x-1/2

//                   items-center

//                   gap-[12px]

//                   font-roboto

//                   md:gap-[14px]

//                   lg:bottom-[2%]

//                   xl:gap-[16px]
//                 "
//               >
//                 {/* 01 */}

//                 <Link
//                   href={worldHref}
//                   onClick={(event) => handleCardLinkClick(event, 'worldElite', worldHref)}
//                   aria-label="Select World Elite"
//                   aria-current={activeCard === 'worldElite' ? 'true' : undefined}
//                   className={`
//                     text-[16px]

//                     font-semibold

//                     transition-colors
//                     duration-300

//                     md:text-[18px]

//                     xl:text-[20px]

//                     2xl:text-[22px]

//                     ${
//                       activeCard === 'worldElite'
//                         ? 'text-[#F52832]'
//                         : 'text-white/45 hover:text-white/80'
//                     }
//                   `}
//                 >
//                   01
//                 </Link>

//                 {/* 02 */}

//                 <Link
//                   href={visaHref}
//                   onClick={(event) => handleCardLinkClick(event, 'visaInfinite', visaHref)}
//                   aria-label="Select Visa Infinite"
//                   aria-current={activeCard === 'visaInfinite' ? 'true' : undefined}
//                   className={`
//                     text-[16px]

//                     font-semibold

//                     transition-colors
//                     duration-300

//                     md:text-[18px]

//                     xl:text-[20px]

//                     2xl:text-[22px]

//                     ${
//                       activeCard === 'visaInfinite'
//                         ? 'text-[#F52832]'
//                         : 'text-white/45 hover:text-white/80'
//                     }
//                   `}
//                 >
//                   02
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CardInfoSection

'use client'

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { gsap, useGSAP } from '@/lib/gsap'
import { CardInfoBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  block: CardInfoBlockType
}

type CardKey = 'worldElite' | 'visaInfinite'

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

  const defaultCard: CardKey =
    selector?.defaultCard === 'visaInfinite' ? 'visaInfinite' : 'worldElite'

  const [activeCard, setActiveCard] = useState<CardKey>(defaultCard)

  /* =======================================================
     MEDIA
  ======================================================= */

  const worldImage = getMedia(world?.cardImage)

  const visaImage = getMedia(visa?.cardImage)

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
     URL HASH -> ACTIVE CARD
  ======================================================= */

  const resolveCardFromHash = useCallback((): CardKey | null => {
    if (typeof window === 'undefined') {
      return null
    }

    const hash = decodeURIComponent(window.location.hash.replace(/^#/, '').trim())

    if (!hash) return null

    if (hash === String(world?.sectionId ?? '').trim()) {
      return 'worldElite'
    }

    if (hash === String(visa?.sectionId ?? '').trim()) {
      return 'visaInfinite'
    }

    return null
  }, [world?.sectionId, visa?.sectionId])

  useEffect(() => {
    const applyHash = () => {
      const card = resolveCardFromHash()

      if (card) {
        setActiveCard(card)
      }
    }

    applyHash()

    window.addEventListener('hashchange', applyHash)

    window.addEventListener('popstate', applyHash)

    return () => {
      window.removeEventListener('hashchange', applyHash)

      window.removeEventListener('popstate', applyHash)
    }
  }, [resolveCardFromHash])

  /* =======================================================
     GSAP STACK ANIMATION

     IMPORTANT:

     active scale   = 1
     inactive scale = 1

     Cards always remain exactly the same size.

     Depth comes from:
     - z-index
     - x/y movement
     - rotation
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

          rotation: activeCard === 'worldElite' ? -5 : 5,

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

          rotation: activeCard === 'worldElite' ? 7 : -7,

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
      window.history.pushState(null, '', href)
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
    if (typeof window === 'undefined') {
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

            lg:text-[12px]

            xl:text-[13px]

            2xl:text-[14px]

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

            lg:text-[12px]

            xl:text-[13px]

            2xl:text-[14px]

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

            aspect-[579/841]

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
              object-contain
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

            aspect-[579/841]

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
              object-contain
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
                mt-[5px]

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
              rotation
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
                mt-[8px]

                flex

                justify-center

                xl:mt-[10px]
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
