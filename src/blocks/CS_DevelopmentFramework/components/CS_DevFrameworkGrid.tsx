// 'use client'

// import { gsap, useGSAP } from '@/lib/gsap'
// import { CS_DevelopmentFrameworkBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React, { useEffect, useMemo, useRef, useState } from 'react'

// type Props = {
//   block: CS_DevelopmentFrameworkBlockType
// }

// type MediaLike = {
//   url?: string | null
//   alt?: string | null
// }

// function getMediaUrl(media: unknown) {
//   if (!media || typeof media !== 'object') return ''

//   const mediaObject = media as MediaLike
//   return mediaObject?.url || ''
// }

// function getMediaAlt(media: unknown, fallback: string) {
//   if (!media || typeof media !== 'object') return fallback

//   const mediaObject = media as MediaLike
//   return mediaObject?.alt || fallback
// }

// function getBlurDataURL(source: Record<string, any> | null | undefined, key: string) {
//   const blurKey = `${key}BlurDataURL`
//   return source?.[blurKey] || ''
// }

// function CS_DevFrameworkGrid({ block }: Props) {
//   const rootRef = useRef<HTMLDivElement | null>(null)
//   const desktopViewportRef = useRef<HTMLDivElement | null>(null)
//   const trackRef = useRef<HTMLDivElement | null>(null)
//   const rowRefs = useRef<Array<HTMLDivElement | null>>([])

//   const items = useMemo(() => {
//     return block?.lifecycle?.items?.filter(Boolean) ?? []
//   }, [block?.lifecycle?.items])

//   const initialActiveIndex = useMemo(() => {
//     const defaultIndex = items.findIndex((item) => item?.menu?.defaultActive)
//     return defaultIndex >= 0 ? defaultIndex : 0
//   }, [items])

//   const [activeIndex, setActiveIndex] = useState(initialActiveIndex)

//   const activeItem = items[activeIndex]

//   useEffect(() => {
//     setActiveIndex(initialActiveIndex)
//   }, [initialActiveIndex])

//   const getDesktopTrackY = () => {
//     const activeRow = rowRefs.current[activeIndex]

//     if (!activeRow) return 0

//     return -activeRow.offsetTop
//   }

//   useGSAP(
//     () => {
//       const track = trackRef.current
//       const activeRow = rowRefs.current[activeIndex]

//       if (!track || !activeRow) return

//       const y = getDesktopTrackY()

//       const timeline = gsap.timeline()

//       timeline.to(track, {
//         y,
//         duration: 0.82,
//         ease: 'power3.inOut',
//         overwrite: 'auto',
//       })

//       timeline.to(track, {
//         y,
//         duration: 0.82,
//         ease: 'power3.inOut',
//         overwrite: 'auto',
//       })
//     },
//     {
//       scope: rootRef,
//       dependencies: [activeIndex, items.length],
//     },
//   )

//   useEffect(() => {
//     const handleResize = () => {
//       const track = trackRef.current
//       if (!track) return

//       gsap.set(track, {
//         y: getDesktopTrackY(),
//       })
//     }

//     window.addEventListener('resize', handleResize)

//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [activeIndex, items.length])

//   if (!items.length) return null

//   const renderIcon = ({
//     item,
//     isActive,
//     mode,
//     coloredIconAlt,
//     whiteIconAlt,
//   }: {
//     item: NonNullable<typeof items>[number]
//     isActive: boolean
//     mode: 'menu' | 'marker' | 'mobile-marker'
//     coloredIconAlt: string
//     whiteIconAlt: string
//   }) => {
//     const coloredIcon = getMediaUrl(item?.mainIcon?.mainIconColored)
//     const whiteIcon = getMediaUrl(item?.mainIcon?.mainIconWhite)

//     const coloredIconClass =
//       mode === 'menu'
//         ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-0' : 'opacity-100 group-hover/lifecycle-menu:opacity-0'}
//         `
//         : mode === 'marker'
//           ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-0' : 'opacity-100 group-hover/timeline-marker:opacity-0'}
//         `
//           : `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-0' : 'opacity-100'}
//         `

//     const whiteIconClass =
//       mode === 'menu'
//         ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-100' : 'opacity-0 group-hover/lifecycle-menu:opacity-100'}
//         `
//         : mode === 'marker'
//           ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-100' : 'opacity-0 group-hover/timeline-marker:opacity-100'}
//         `
//           : `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-100' : 'opacity-0'}
//         `

//     return (
//       <>
//         {coloredIcon && (
//           <Image
//             src={coloredIcon}
//             alt={coloredIconAlt}
//             fill
//             className={coloredIconClass}
//             quality={100}
//             placeholder={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored')
//                 ? 'blur'
//                 : 'empty'
//             }
//             blurDataURL={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored') || undefined
//             }
//           />
//         )}

//         {whiteIcon && (
//           <Image
//             src={whiteIcon}
//             alt={whiteIconAlt}
//             fill
//             className={whiteIconClass}
//             quality={100}
//             placeholder={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconWhite')
//                 ? 'blur'
//                 : 'empty'
//             }
//             blurDataURL={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconWhite') || undefined
//             }
//           />
//         )}

//         {!coloredIcon && !whiteIcon && (
//           <span
//             className={`
//               block size-full rounded-full
//               transition-colors duration-300
//               ${
//                 isActive
//                   ? 'bg-white-1'
//                   : mode === 'marker'
//                     ? 'bg-primary-1 group-hover/timeline-marker:bg-white-1'
//                     : 'bg-primary-1 group-hover/lifecycle-menu:bg-white-1'
//               }
//             `}
//           />
//         )}
//       </>
//     )
//   }

//   return (
//     <div ref={rootRef} className="min-w-0">
//       {/* mobile + tablet */}
//       <div className="lg:hidden">
//         <div className="text-center mt-[30px]">
//           {block?.lifecycle?.title && (
//             <h3
//               className="
//                 font-agency text-[24px] leading-[1]
//                 text-secondary-1
//                 md:text-[30px]
//               "
//             >
//               {block.lifecycle.title}
//             </h3>
//           )}

//           {block?.lifecycle?.subtitle && (
//             <p className="mt-[8px] font-grift global-p5 text-[#3E4949]">
//               {block.lifecycle.subtitle}
//             </p>
//           )}
//         </div>

//         <div className="no-scrollbar mt-[12px] flex gap-[10px] overflow-x-auto pb-[4px]">
//           {items.map((item, index) => {
//             const isActive = index === activeIndex

//             const coloredIconAlt = getMediaAlt(
//               item?.mainIcon?.mainIconColored,
//               item?.menu?.label || 'Lifecycle icon',
//             )

//             const whiteIconAlt = getMediaAlt(
//               item?.mainIcon?.mainIconWhite,
//               item?.menu?.label || 'Lifecycle icon',
//             )

//             return (
//               <button
//                 key={item?.id ?? index}
//                 type="button"
//                 onClick={() => setActiveIndex(index)}
//                 aria-pressed={isActive}
//                 className={`
//                   group/lifecycle-menu inline-flex shrink-0 items-center gap-[10px]
//                   rounded-[8px] border border-transparent
//                   px-[12px] py-[9px]
//                   font-grift global-p5 font-bold
//                   transition-all duration-300 ease-out
//                   outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0

//                   ${
//                     isActive
//                       ? 'bg-primary-1 text-white-1 shadow-[0_12px_28px_rgba(0,108,103,0.18)]'
//                       : 'bg-transparent text-primary-1 hover:border-primary-1 hover:bg-primary-1 hover:text-white-1'
//                   }
//                 `}
//               >
//                 <span
//                   className={`
//                     relative size-[27px] shrink-0
//                     transition-transform duration-300 ease-out
//                     group-hover/lifecycle-menu:rotate-[16deg]
//                     ${isActive ? 'rotate-[16deg]' : ''}
//                   `}
//                 >
//                   {renderIcon({
//                     item,
//                     isActive,
//                     mode: 'menu',
//                     coloredIconAlt,
//                     whiteIconAlt,
//                   })}
//                 </span>

//                 <span className="whitespace-nowrap text-start">{item?.menu?.label}</span>
//               </button>
//             )
//           })}
//         </div>

//         {activeItem && (
//           <div
//             className="
//               mt-[30px] grid grid-cols-1 gap-[22px]
//               md:grid-cols-2 md:gap-[24px]
//             "
//           >
//             <div
//               className="
//                 flex min-w-0 flex-col justify-center
//                 rounded-[10px] border border-primary-1/35
//                 bg-white-1/25 px-[22px] py-[24px]
//                 backdrop-blur-[10px]
//               "
//             >
//               <div
//                 className="
//                   mb-[18px] flex w-fit items-center gap-[10px]
//                   rounded-full border border-primary-1/40
//                   bg-primary-1 px-[14px] py-[8px]
//                   font-grift global-p5 font-bold text-white-1
//                 "
//               >
//                 <span className="relative size-[27px] rotate-[16deg]">
//                   {renderIcon({
//                     item: activeItem,
//                     isActive: true,
//                     mode: 'mobile-marker',
//                     coloredIconAlt: getMediaAlt(
//                       activeItem?.mainIcon?.mainIconColored,
//                       activeItem?.menu?.label || 'Lifecycle icon',
//                     ),
//                     whiteIconAlt: getMediaAlt(
//                       activeItem?.mainIcon?.mainIconWhite,
//                       activeItem?.menu?.label || 'Lifecycle icon',
//                     ),
//                   })}
//                 </span>

//                 <span>{activeItem?.menu?.label}</span>
//               </div>

//               {activeItem?.mainContent?.title && (
//                 <h3
//                   className="
//                     font-agency text-[30px] leading-[1.05]
//                     text-secondary-1
//                     md:text-[32px]
//                   "
//                 >
//                   {activeItem.mainContent.title}
//                 </h3>
//               )}

//               {activeItem?.mainContent?.description && (
//                 <p className="mt-[14px] font-grift global-p4 leading-[1.6] text-[#3E4949]">
//                   {activeItem.mainContent.description}
//                 </p>
//               )}
//             </div>

//             <div
//               className="
//                 min-w-0 rounded-[10px] border border-primary-1/45
//                 bg-white-1/30 px-[22px] py-[24px]
//                 backdrop-blur-[12px]
//               "
//             >
//               {activeItem?.infoCard?.title && (
//                 <h4
//                   className="
//                     font-grift global-p4 font-bold uppercase
//                     tracking-[0.04em] text-primary-1
//                   "
//                 >
//                   {activeItem.infoCard.title}
//                 </h4>
//               )}

//               {activeItem?.infoCard?.description && (
//                 <p className="mt-[14px] font-grift global-p4 leading-[1.6] text-[#3E4949]">
//                   {activeItem.infoCard.description}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* desktop */}
//       <div
//         className="
//           hidden min-w-0
//           lg:grid lg:grid-cols-[145px_1px_minmax(0,1fr)] lg:gap-[18px]
//           xl:grid-cols-[160px_1px_minmax(0,1fr)] xl:gap-[24px]
//           2xl:grid-cols-[175px_1px_minmax(0,1fr)] 2xl:gap-[30px]
//         "
//       >
//         {/* lifecycle menu */}
//         <aside className="flex min-w-0 flex-col lg:pt-[4px]">
//           <div>
//             {block?.lifecycle?.title && (
//               <h3
//                 className="
//                   font-agency text-[#191C1E]
//                   lg:global-h7
//                 "
//               >
//                 {block.lifecycle.title}
//               </h3>
//             )}

//             {block?.lifecycle?.subtitle && (
//               <p className="mt-[7px] font-grift global-p6 text-[#3E4949]">
//                 {block.lifecycle.subtitle}
//               </p>
//             )}
//           </div>

//           <div
//             className="
//               flex flex-col
//               lg:mt-[26px] lg:gap-[12px]
//               xl:mt-[30px] xl:gap-[14px]
//               2xl:mt-[48px] 2xl:gap-[16px]
//             "
//           >
//             {items.map((item, index) => {
//               const isActive = index === activeIndex

//               const coloredIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconColored,
//                 item?.menu?.label || 'Lifecycle icon',
//               )

//               const whiteIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconWhite,
//                 item?.menu?.label || 'Lifecycle icon',
//               )

//               return (
//                 <button
//                   key={item?.id ?? index}
//                   type="button"
//                   onClick={() => setActiveIndex(index)}
//                   aria-pressed={isActive}
//                   className={`
//                     group/lifecycle-menu inline-flex shrink-0 items-center
//                     rounded-[8px] border border-transparent
//                     font-grift global-p6 font-bold
//                     transition-all duration-300 ease-out
//                     outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0

//                     lg:gap-[8px] lg:px-[9px] lg:py-[9px]
//                     xl:gap-[10px] xl:px-[11px] xl:py-[10px]
//                     2xl:gap-[11px] 2xl:px-[12px] 2xl:py-[11px]

//                     ${
//                       isActive
//                         ? 'bg-primary-1 text-white-1 shadow-[0_12px_28px_rgba(0,108,103,0.18)]'
//                         : 'bg-transparent text-primary-1 hover:border-primary-1 hover:bg-primary-1 hover:text-white-1'
//                     }
//                   `}
//                 >
//                   <span
//                     className={`
//                       relative size-[27px] shrink-0
//                       transition-transform duration-300 ease-out
//                       group-hover/lifecycle-menu:rotate-[16deg]
//                       ${isActive ? 'rotate-[16deg]' : ''}
//                     `}
//                   >
//                     {renderIcon({
//                       item,
//                       isActive,
//                       mode: 'menu',
//                       coloredIconAlt,
//                       whiteIconAlt,
//                     })}
//                   </span>

//                   <span className="whitespace-nowrap text-start">{item?.menu?.label}</span>
//                 </button>
//               )
//             })}
//           </div>
//         </aside>

//         {/* left divider */}
//         <div className="bg-primary-1/70" />

//         {/* rope timeline viewport */}
//         <div
//           ref={desktopViewportRef}
//           className="
//     relative min-w-0 overflow-hidden
//     lg:h-[650px]
//     xl:h-[720px]
//     2xl:h-[780px]
//   "
//         >
//           {/* fixed centre rope line */}
//           <div
//             className="
//               pointer-events-none absolute left-1/2 top-0 z-0
//               h-full w-px -translate-x-1/2 bg-primary-1
//             "
//           />

//           <div ref={trackRef} className="relative z-10 will-change-transform">
//             {items.map((item, index) => {
//               const isActive = index === activeIndex
//               const cardPosition = item?.infoCard?.position === 'left' ? 'left' : 'right'

//               const coloredIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconColored,
//                 item?.menu?.label || 'Timeline icon',
//               )

//               const whiteIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconWhite,
//                 item?.menu?.label || 'Timeline icon',
//               )

//               return (
//                 <div
//                   key={item?.id ?? index}
//                   ref={(node) => {
//                     rowRefs.current[index] = node
//                   }}
//                   className="
//                     relative grid min-w-0
//                     lg:min-h-[325px] lg:grid-cols-[minmax(0,1fr)_74px_minmax(0,1fr)] lg:gap-[18px]
//                     xl:min-h-[360px] xl:grid-cols-[minmax(0,1fr)_86px_minmax(0,1fr)] xl:gap-[24px]
//                     2xl:min-h-[390px] 2xl:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] 2xl:gap-[30px]
//                   "
//                 >
//                   {/* desktop marker */}
//                   <div
//                     className={`
//     group/timeline-marker absolute left-1/2 top-1/2 z-20
//     -translate-x-1/2 -translate-y-1/2
//     items-center justify-center
//     rounded-[14px] xl:rounded-[16px] 2xl:rounded-[18px]
//     transition-all duration-300
//     lg:flex
//     lg:size-[52px]
//     xl:size-[58px]
//     2xl:size-[64px]
//     ${
//       isActive
//         ? 'rotate-45 bg-primary-1 shadow-[0_14px_30px_rgba(0,108,103,0.22)]'
//         : 'border border-primary-1/50 bg-white-1/60 backdrop-blur-[8px] hover:rotate-45 hover:border-primary-1 hover:bg-primary-1 hover:shadow-[0_14px_30px_rgba(0,108,103,0.22)]'
//     }
//   `}
//                   >
//                     <span
//                       className={`
//     relative block
//     transition-transform duration-300
//     lg:size-[26px]
//     xl:size-[29px]
//     2xl:size-[32px]
//     ${isActive ? '-rotate-45' : 'group-hover/timeline-marker:-rotate-45'}
//   `}
//                     >
//                       {renderIcon({
//                         item,
//                         isActive,
//                         mode: 'marker',
//                         coloredIconAlt,
//                         whiteIconAlt,
//                       })}
//                     </span>
//                   </div>

//                   {/* main content */}
//                   <div
//                     className={`
//                       cs-dev-framework-animate flex min-w-0 flex-col justify-center
//                       ${
//                         cardPosition === 'left'
//                           ? 'lg:col-start-3 lg:text-start'
//                           : 'lg:col-start-1 lg:text-end'
//                       }
//                       lg:row-start-1
//                     `}
//                   >
//                     {item?.mainContent?.title && (
//                       <h3
//                         className="
//                           font-agency leading-[1.05] text-secondary-1
//                           lg:text-[35px]
//                           xl:text-[42px]
//                           2xl:text-[50px]
//                         "
//                       >
//                         {item.mainContent.title}
//                       </h3>
//                     )}

//                     {item?.mainContent?.description && (
//                       <p
//                         className={`
//                           mt-[12px] max-w-[430px]
//                           font-grift global-p4 leading-[1.55]
//                           text-[#3E4949]
//                           ${cardPosition === 'left' ? 'lg:mr-auto' : 'lg:ml-auto'}
//                         `}
//                       >
//                         {item.mainContent.description}
//                       </p>
//                     )}
//                   </div>

//                   {/* empty centre column */}
//                   <div className="lg:col-start-2 lg:row-start-1" />

//                   {/* info card */}
//                   <div
//                     className={`
//                       cs-dev-framework-animate flex min-w-0 flex-col justify-center
//                       ${cardPosition === 'left' ? 'lg:col-start-1' : 'lg:col-start-3'}
//                       lg:row-start-1
//                     `}
//                   >
//                     <div
//                       className="
//                         rounded-[10px] border border-primary-1/45
//                         bg-white-1/30 backdrop-blur-[12px]
//                         lg:px-[20px] lg:py-[20px]
//                         xl:px-[24px] xl:py-[22px]
//                         2xl:px-[28px] 2xl:py-[26px]
//                       "
//                     >
//                       {item?.infoCard?.title && (
//                         <h4
//                           className="
//                             font-grift global-p3 font-bold uppercase
//                             tracking-[0.04em] text-primary-1
//                           "
//                         >
//                           {item.infoCard.title}
//                         </h4>
//                       )}

//                       {item?.infoCard?.description && (
//                         <p
//                           className="
//                             mt-[14px]
//                             font-grift global-p4 leading-[1.55]
//                             text-[#3E4949]
//                           "
//                         >
//                           {item.infoCard.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CS_DevFrameworkGrid

// ===========================================================================
// ===========================================================================
// ===========================================================================

// // scroll animation added
// 'use client'

// import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
// import { CS_DevelopmentFrameworkBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React, { useEffect, useMemo, useRef, useState } from 'react'

// type Props = {
//   block: CS_DevelopmentFrameworkBlockType
// }

// type MediaLike = {
//   url?: string | null
//   alt?: string | null
// }

// function getMediaUrl(media: unknown) {
//   if (!media || typeof media !== 'object') return ''

//   const mediaObject = media as MediaLike
//   return mediaObject?.url || ''
// }

// function getMediaAlt(media: unknown, fallback: string) {
//   if (!media || typeof media !== 'object') return fallback

//   const mediaObject = media as MediaLike
//   return mediaObject?.alt || fallback
// }

// function getBlurDataURL(source: Record<string, any> | null | undefined, key: string) {
//   const blurKey = `${key}BlurDataURL`

//   return source?.[blurKey] || ''
// }

// function CS_DevFrameworkGrid({ block }: Props) {
//   const rootRef = useRef<HTMLDivElement | null>(null)
//   const desktopViewportRef = useRef<HTMLDivElement | null>(null)
//   const trackRef = useRef<HTMLDivElement | null>(null)
//   const rowRefs = useRef<Array<HTMLDivElement | null>>([])

//   const items = useMemo(() => {
//     return block?.lifecycle?.items?.filter(Boolean) ?? []
//   }, [block?.lifecycle?.items])

//   const initialActiveIndex = useMemo(() => {
//     const defaultIndex = items.findIndex((item) => item?.menu?.defaultActive)

//     return defaultIndex >= 0 ? defaultIndex : 0
//   }, [items])

//   const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
//   const activeIndexRef = useRef(initialActiveIndex)

//   const activeItem = items[activeIndex]

//   useEffect(() => {
//     activeIndexRef.current = activeIndex
//   }, [activeIndex])

//   useEffect(() => {
//     setActiveIndex(initialActiveIndex)
//     activeIndexRef.current = initialActiveIndex
//   }, [initialActiveIndex])

//   const getDesktopTrackY = () => {
//     const activeRow = rowRefs.current[activeIndex]

//     if (!activeRow) return 0

//     return -activeRow.offsetTop
//   }

//   useGSAP(
//     () => {
//       const track = trackRef.current
//       const activeRow = rowRefs.current[activeIndex]

//       if (!track || !activeRow) return

//       const y = getDesktopTrackY()

//       const timeline = gsap.timeline()

//       timeline.to(track, {
//         y,
//         duration: 0.82,
//         ease: 'power3.inOut',
//         overwrite: 'auto',
//       })

//       //   timeline.fromTo(
//       //     activeRow.querySelectorAll('.cs-dev-framework-animate'),
//       //     {
//       //       autoAlpha: 0,
//       //       y: 22,
//       //       filter: 'blur(5px)',
//       //     },
//       //     {
//       //       autoAlpha: 1,
//       //       y: 0,
//       //       filter: 'blur(0px)',
//       //       duration: 0.52,
//       //       stagger: 0.045,
//       //       ease: 'power3.out',
//       //       overwrite: 'auto',
//       //     },
//       //     0.22,
//       //   )

//       timeline.to(track, {
//         y,
//         duration: 0.82,
//         ease: 'power3.inOut',
//         overwrite: 'auto',
//       })
//     },
//     {
//       scope: rootRef,
//       dependencies: [activeIndex, items.length],
//     },
//   )

//   useGSAP(
//     () => {
//       const root = rootRef.current

//       if (!root || items.length <= 1) return

//       const mm = gsap.matchMedia()

//       mm.add('(min-width: 1024px)', () => {
//         const scrollTrigger = ScrollTrigger.create({
//           trigger: root,
//           start: 'top 16%',
//           end: () => `+=${Math.max(1, items.length - 1) * window.innerHeight * 0.78}`,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//           onUpdate: (self) => {
//             const nextIndex = Math.min(
//               items.length - 1,
//               Math.max(0, Math.round(self.progress * (items.length - 1))),
//             )

//             if (nextIndex === activeIndexRef.current) return

//             activeIndexRef.current = nextIndex
//             setActiveIndex(nextIndex)
//           },
//         })

//         ScrollTrigger.refresh()

//         return () => {
//           scrollTrigger.kill()
//         }
//       })

//       return () => {
//         mm.revert()
//       }
//     },
//     {
//       scope: rootRef,
//       dependencies: [items.length],
//     },
//   )

//   useEffect(() => {
//     const handleResize = () => {
//       const track = trackRef.current

//       if (!track) return

//       gsap.set(track, {
//         y: getDesktopTrackY(),
//       })

//       ScrollTrigger.refresh()
//     }

//     window.addEventListener('resize', handleResize)

//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [activeIndex, items.length])

//   if (!items.length) return null

//   const renderIcon = ({
//     item,
//     isActive,
//     mode,
//     coloredIconAlt,
//     whiteIconAlt,
//   }: {
//     item: NonNullable<typeof items>[number]
//     isActive: boolean
//     mode: 'menu' | 'marker' | 'mobile-marker'
//     coloredIconAlt: string
//     whiteIconAlt: string
//   }) => {
//     const coloredIcon = getMediaUrl(item?.mainIcon?.mainIconColored)
//     const whiteIcon = getMediaUrl(item?.mainIcon?.mainIconWhite)

//     const coloredIconClass =
//       mode === 'menu'
//         ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-0' : 'opacity-100 group-hover/lifecycle-menu:opacity-0'}
//         `
//         : mode === 'marker'
//           ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-0' : 'opacity-100 group-hover/timeline-marker:opacity-0'}
//         `
//           : `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-0' : 'opacity-100'}
//         `

//     const whiteIconClass =
//       mode === 'menu'
//         ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-100' : 'opacity-0 group-hover/lifecycle-menu:opacity-100'}
//         `
//         : mode === 'marker'
//           ? `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-100' : 'opacity-0 group-hover/timeline-marker:opacity-100'}
//         `
//           : `
//           object-contain object-center
//           transition-opacity duration-300
//           ${isActive ? 'opacity-100' : 'opacity-0'}
//         `

//     return (
//       <>
//         {coloredIcon && (
//           <Image
//             src={coloredIcon}
//             alt={coloredIconAlt}
//             fill
//             className={coloredIconClass}
//             quality={100}
//             placeholder={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored')
//                 ? 'blur'
//                 : 'empty'
//             }
//             blurDataURL={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconColored') || undefined
//             }
//           />
//         )}

//         {whiteIcon && (
//           <Image
//             src={whiteIcon}
//             alt={whiteIconAlt}
//             fill
//             className={whiteIconClass}
//             quality={100}
//             placeholder={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconWhite')
//                 ? 'blur'
//                 : 'empty'
//             }
//             blurDataURL={
//               getBlurDataURL(item?.mainIcon as Record<string, any>, 'mainIconWhite') || undefined
//             }
//           />
//         )}

//         {!coloredIcon && !whiteIcon && (
//           <span
//             className={`
//               block size-full rounded-full
//               transition-colors duration-300
//               ${
//                 isActive
//                   ? 'bg-white-1'
//                   : mode === 'marker'
//                     ? 'bg-primary-1 group-hover/timeline-marker:bg-white-1'
//                     : 'bg-primary-1 group-hover/lifecycle-menu:bg-white-1'
//               }
//             `}
//           />
//         )}
//       </>
//     )
//   }

//   return (
//     <div ref={rootRef} className="min-w-0">
//       {/* mobile + tablet */}
//       <div className="lg:hidden">
//         <div className="text-center mt-[30px]">
//           {block?.lifecycle?.title && (
//             <h3
//               className="
//                 font-agency text-[24px] leading-[1]
//                 text-secondary-1
//                 md:text-[30px]
//               "
//             >
//               {block.lifecycle.title}
//             </h3>
//           )}

//           {block?.lifecycle?.subtitle && (
//             <p className="mt-[8px] font-grift global-p5 text-[#3E4949]">
//               {block.lifecycle.subtitle}
//             </p>
//           )}
//         </div>

//         <div className="no-scrollbar mt-[12px] flex gap-[10px] overflow-x-auto pb-[4px]">
//           {items.map((item, index) => {
//             const isActive = index === activeIndex

//             const coloredIconAlt = getMediaAlt(
//               item?.mainIcon?.mainIconColored,
//               item?.menu?.label || 'Lifecycle icon',
//             )

//             const whiteIconAlt = getMediaAlt(
//               item?.mainIcon?.mainIconWhite,
//               item?.menu?.label || 'Lifecycle icon',
//             )

//             return (
//               <button
//                 key={item?.id ?? index}
//                 type="button"
//                 onClick={() => setActiveIndex(index)}
//                 aria-pressed={isActive}
//                 className={`
//                   group/lifecycle-menu inline-flex shrink-0 items-center gap-[10px]
//                   rounded-[8px] border border-transparent
//                   px-[12px] py-[9px]
//                   font-grift global-p5 font-bold
//                   transition-all duration-300 ease-out
//                   outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0

//                   ${
//                     isActive
//                       ? 'bg-primary-1 text-white-1 shadow-[0_12px_28px_rgba(0,108,103,0.18)]'
//                       : 'bg-transparent text-primary-1 hover:border-primary-1 hover:bg-primary-1 hover:text-white-1'
//                   }
//                 `}
//               >
//                 <span
//                   className={`
//                     relative size-[27px] shrink-0
//                     transition-transform duration-300 ease-out
//                     group-hover/lifecycle-menu:rotate-[16deg]
//                     ${isActive ? 'rotate-[16deg]' : ''}
//                   `}
//                 >
//                   {renderIcon({
//                     item,
//                     isActive,
//                     mode: 'menu',
//                     coloredIconAlt,
//                     whiteIconAlt,
//                   })}
//                 </span>

//                 <span className="whitespace-nowrap text-start">{item?.menu?.label}</span>
//               </button>
//             )
//           })}
//         </div>

//         {activeItem && (
//           <div
//             className="
//               mt-[30px] grid grid-cols-1 gap-[22px]
//               md:grid-cols-2 md:gap-[24px]
//             "
//           >
//             <div
//               className="
//                 flex min-w-0 flex-col justify-center
//                 rounded-[10px] border border-primary-1/35
//                 bg-white-1/25 px-[22px] py-[24px]
//                 backdrop-blur-[10px]
//               "
//             >
//               <div
//                 className="
//                   mb-[18px] flex w-fit items-center gap-[10px]
//                   rounded-full border border-primary-1/40
//                   bg-primary-1 px-[14px] py-[8px]
//                   font-grift global-p5 font-bold text-white-1
//                 "
//               >
//                 <span className="relative size-[27px] rotate-[16deg]">
//                   {renderIcon({
//                     item: activeItem,
//                     isActive: true,
//                     mode: 'mobile-marker',
//                     coloredIconAlt: getMediaAlt(
//                       activeItem?.mainIcon?.mainIconColored,
//                       activeItem?.menu?.label || 'Lifecycle icon',
//                     ),
//                     whiteIconAlt: getMediaAlt(
//                       activeItem?.mainIcon?.mainIconWhite,
//                       activeItem?.menu?.label || 'Lifecycle icon',
//                     ),
//                   })}
//                 </span>

//                 <span>{activeItem?.menu?.label}</span>
//               </div>

//               {activeItem?.mainContent?.title && (
//                 <h3
//                   className="
//                     font-agency text-[30px] leading-[1.05]
//                     text-secondary-1
//                     md:text-[32px]
//                   "
//                 >
//                   {activeItem.mainContent.title}
//                 </h3>
//               )}

//               {activeItem?.mainContent?.description && (
//                 <p className="mt-[14px] font-grift global-p4 leading-[1.6] text-[#3E4949]">
//                   {activeItem.mainContent.description}
//                 </p>
//               )}
//             </div>

//             <div
//               className="
//                 min-w-0 rounded-[10px] border border-primary-1/45
//                 bg-white-1/30 px-[22px] py-[24px]
//                 backdrop-blur-[12px]
//               "
//             >
//               {activeItem?.infoCard?.title && (
//                 <h4
//                   className="
//                     font-grift global-p4 font-bold uppercase
//                     tracking-[0.04em] text-primary-1
//                   "
//                 >
//                   {activeItem.infoCard.title}
//                 </h4>
//               )}

//               {activeItem?.infoCard?.description && (
//                 <p className="mt-[14px] font-grift global-p4 leading-[1.6] text-[#3E4949]">
//                   {activeItem.infoCard.description}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* desktop */}
//       <div
//         className="
//           hidden min-w-0
//           lg:grid lg:grid-cols-[145px_1px_minmax(0,1fr)] lg:gap-[18px]
//           xl:grid-cols-[160px_1px_minmax(0,1fr)] xl:gap-[24px]
//           2xl:grid-cols-[175px_1px_minmax(0,1fr)] 2xl:gap-[30px]
//         "
//       >
//         {/* lifecycle menu */}
//         <aside className="flex min-w-0 flex-col lg:pt-[4px]">
//           <div>
//             {block?.lifecycle?.title && (
//               <h3
//                 className="
//                   font-agency text-[#191C1E]
//                   lg:global-h7
//                 "
//               >
//                 {block.lifecycle.title}
//               </h3>
//             )}

//             {block?.lifecycle?.subtitle && (
//               <p className="mt-[7px] font-grift global-p6 text-[#3E4949]">
//                 {block.lifecycle.subtitle}
//               </p>
//             )}
//           </div>

//           <div
//             className="
//               flex flex-col
//               lg:mt-[26px] lg:gap-[12px]
//               xl:mt-[30px] xl:gap-[14px]
//               2xl:mt-[48px] 2xl:gap-[16px]
//             "
//           >
//             {items.map((item, index) => {
//               const isActive = index === activeIndex

//               const coloredIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconColored,
//                 item?.menu?.label || 'Lifecycle icon',
//               )

//               const whiteIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconWhite,
//                 item?.menu?.label || 'Lifecycle icon',
//               )

//               return (
//                 <button
//                   key={item?.id ?? index}
//                   type="button"
//                   onClick={() => {
//                     activeIndexRef.current = index
//                     setActiveIndex(index)
//                   }}
//                   aria-pressed={isActive}
//                   className={`
//                     group/lifecycle-menu inline-flex shrink-0 items-center
//                     rounded-[8px] border border-transparent
//                     font-grift global-p6 font-bold
//                     transition-all duration-300 ease-out
//                     outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0

//                     lg:gap-[8px] lg:px-[9px] lg:py-[9px]
//                     xl:gap-[10px] xl:px-[11px] xl:py-[10px]
//                     2xl:gap-[11px] 2xl:px-[12px] 2xl:py-[11px]

//                     ${
//                       isActive
//                         ? 'bg-primary-1 text-white-1 shadow-[0_12px_28px_rgba(0,108,103,0.18)]'
//                         : 'bg-transparent text-primary-1 hover:border-primary-1 hover:bg-primary-1 hover:text-white-1'
//                     }
//                   `}
//                 >
//                   <span
//                     className={`
//                       relative size-[27px] shrink-0
//                       transition-transform duration-300 ease-out
//                       group-hover/lifecycle-menu:rotate-[16deg]
//                       ${isActive ? 'rotate-[16deg]' : ''}
//                     `}
//                   >
//                     {renderIcon({
//                       item,
//                       isActive,
//                       mode: 'menu',
//                       coloredIconAlt,
//                       whiteIconAlt,
//                     })}
//                   </span>

//                   <span className="whitespace-nowrap text-start">{item?.menu?.label}</span>
//                 </button>
//               )
//             })}
//           </div>
//         </aside>

//         {/* left divider */}
//         <div className="bg-primary-1/70" />

//         {/* rope timeline viewport */}
//         <div
//           ref={desktopViewportRef}
//           className="
//             relative min-w-0 overflow-hidden
//             lg:h-[650px]
//             xl:h-[720px]
//             2xl:h-[780px]
//           "
//         >
//           {/* fixed centre rope line */}
//           <div
//             className="
//               pointer-events-none absolute left-1/2 top-0 z-0
//               h-full w-px -translate-x-1/2 bg-primary-1
//             "
//           />

//           <div ref={trackRef} className="relative z-10 will-change-transform">
//             {items.map((item, index) => {
//               const isActive = index === activeIndex
//               const cardPosition = item?.infoCard?.position === 'left' ? 'left' : 'right'

//               const coloredIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconColored,
//                 item?.menu?.label || 'Timeline icon',
//               )

//               const whiteIconAlt = getMediaAlt(
//                 item?.mainIcon?.mainIconWhite,
//                 item?.menu?.label || 'Timeline icon',
//               )

//               return (
//                 <div
//                   key={item?.id ?? index}
//                   ref={(node) => {
//                     rowRefs.current[index] = node
//                   }}
//                   className="
//                     relative grid min-w-0
//                     lg:min-h-[325px] lg:grid-cols-[minmax(0,1fr)_74px_minmax(0,1fr)] lg:gap-[18px]
//                     xl:min-h-[360px] xl:grid-cols-[minmax(0,1fr)_86px_minmax(0,1fr)] xl:gap-[24px]
//                     2xl:min-h-[390px] 2xl:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] 2xl:gap-[30px]
//                   "
//                 >
//                   {/* desktop marker */}
//                   <div
//                     className={`
//                       group/timeline-marker absolute left-1/2 top-1/2 z-20
//                       -translate-x-1/2 -translate-y-1/2
//                       items-center justify-center
//                       rounded-[14px] xl:rounded-[16px] 2xl:rounded-[18px]
//                       transition-all duration-300
//                       lg:flex
//                       lg:size-[52px]
//                       xl:size-[58px]
//                       2xl:size-[64px]
//                       ${
//                         isActive
//                           ? 'rotate-45 bg-primary-1 shadow-[0_14px_30px_rgba(0,108,103,0.22)]'
//                           : 'border border-primary-1/50 bg-white-1/60 backdrop-blur-[8px] hover:rotate-45 hover:border-primary-1 hover:bg-primary-1 hover:shadow-[0_14px_30px_rgba(0,108,103,0.22)]'
//                       }
//                     `}
//                   >
//                     <span
//                       className={`
//                         relative block
//                         transition-transform duration-300
//                         lg:size-[26px]
//                         xl:size-[29px]
//                         2xl:size-[32px]
//                         ${isActive ? '-rotate-45' : 'group-hover/timeline-marker:-rotate-45'}
//                       `}
//                     >
//                       {renderIcon({
//                         item,
//                         isActive,
//                         mode: 'marker',
//                         coloredIconAlt,
//                         whiteIconAlt,
//                       })}
//                     </span>
//                   </div>

//                   {/* main content */}
//                   <div
//                     className={`
//                       cs-dev-framework-animate flex min-w-0 flex-col justify-center
//                       ${
//                         cardPosition === 'left'
//                           ? 'lg:col-start-3 lg:text-start'
//                           : 'lg:col-start-1 lg:text-end'
//                       }
//                       lg:row-start-1
//                     `}
//                   >
//                     {item?.mainContent?.title && (
//                       <h3
//                         className="
//                           font-agency leading-[1.05] text-secondary-1
//                           lg:text-[35px]
//                           xl:text-[42px]
//                           2xl:text-[50px]
//                         "
//                       >
//                         {item.mainContent.title}
//                       </h3>
//                     )}

//                     {item?.mainContent?.description && (
//                       <p
//                         className={`
//                           mt-[12px] max-w-[430px]
//                           font-grift global-p4 leading-[1.55]
//                           text-[#3E4949]
//                           ${cardPosition === 'left' ? 'lg:mr-auto' : 'lg:ml-auto'}
//                         `}
//                       >
//                         {item.mainContent.description}
//                       </p>
//                     )}
//                   </div>

//                   {/* empty centre column */}
//                   <div className="lg:col-start-2 lg:row-start-1" />

//                   {/* info card */}
//                   <div
//                     className={`
//                       cs-dev-framework-animate flex min-w-0 flex-col justify-center
//                       ${cardPosition === 'left' ? 'lg:col-start-1' : 'lg:col-start-3'}
//                       lg:row-start-1
//                     `}
//                   >
//                     <div
//                       className="
//                         rounded-[10px] border border-primary-1/45
//                         bg-white-1/30 backdrop-blur-[12px]
//                         lg:px-[20px] lg:py-[20px]
//                         xl:px-[24px] xl:py-[22px]
//                         2xl:px-[28px] 2xl:py-[26px]
//                       "
//                     >
//                       {item?.infoCard?.title && (
//                         <h4
//                           className="
//                             font-grift global-p3 font-bold uppercase
//                             tracking-[0.04em] text-primary-1
//                           "
//                         >
//                           {item.infoCard.title}
//                         </h4>
//                       )}

//                       {item?.infoCard?.description && (
//                         <p
//                           className="
//                             mt-[14px]
//                             font-grift global-p4 leading-[1.55]
//                             text-[#3E4949]
//                           "
//                         >
//                           {item.infoCard.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CS_DevFrameworkGrid

// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================
'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { CS_DevelopmentFrameworkBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  block: CS_DevelopmentFrameworkBlockType
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
  const blurKey = `${key}BlurDataURL`

  return source?.[blurKey] || ''
}

function CS_DevFrameworkGrid({ block }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const desktopScrollAreaRef = useRef<HTMLDivElement | null>(null)
  const desktopViewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])

  const items = useMemo(() => {
    return block?.lifecycle?.items?.filter(Boolean) ?? []
  }, [block?.lifecycle?.items])

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

  const scrollToLifecycleIndex = (index: number) => {
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
        duration: 0.65,
        force: true,
      })

      return
    }

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }

  const handleLifecycleSelect = (index: number) => {
    activeIndexRef.current = index
    setActiveIndex(index)
    scrollToLifecycleIndex(index)
  }

  useGSAP(
    () => {
      const track = trackRef.current
      const activeRow = rowRefs.current[activeIndex]

      if (!track || !activeRow) return

      const y = getDesktopTrackY()

      gsap.to(track, {
        y,
        duration: 0.82,
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
              Math.max(0, Math.round(self.progress * (items.length - 1))),
            )

            if (nextIndex === activeIndexRef.current) return

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

  const desktopScrollAreaHeight = `calc(100vh + ${Math.max(1, items.length - 1) * 72}vh)`

  const renderIcon = ({
    item,
    isActive,
    mode,
    coloredIconAlt,
    whiteIconAlt,
  }: {
    item: NonNullable<typeof items>[number]
    isActive: boolean
    mode: 'menu' | 'marker' | 'mobile-marker'
    coloredIconAlt: string
    whiteIconAlt: string
  }) => {
    const coloredIcon = getMediaUrl(item?.mainIcon?.mainIconColored)
    const whiteIcon = getMediaUrl(item?.mainIcon?.mainIconWhite)

    const coloredIconClass =
      mode === 'menu'
        ? `
          object-contain object-center
          transition-opacity duration-300
          ${isActive ? 'opacity-0' : 'opacity-100 group-hover/lifecycle-menu:opacity-0'}
        `
        : mode === 'marker'
          ? `
          object-contain object-center
          transition-opacity duration-300
          ${isActive ? 'opacity-0' : 'opacity-100 group-hover/timeline-marker:opacity-0'}
        `
          : `
          object-contain object-center
          transition-opacity duration-300
          ${isActive ? 'opacity-0' : 'opacity-100'}
        `

    const whiteIconClass =
      mode === 'menu'
        ? `
          object-contain object-center
          transition-opacity duration-300
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover/lifecycle-menu:opacity-100'}
        `
        : mode === 'marker'
          ? `
          object-contain object-center
          transition-opacity duration-300
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover/timeline-marker:opacity-100'}
        `
          : `
          object-contain object-center
          transition-opacity duration-300
          ${isActive ? 'opacity-100' : 'opacity-0'}
        `

    return (
      <>
        {coloredIcon && (
          <Image
            src={coloredIcon}
            alt={coloredIconAlt}
            fill
            className={coloredIconClass}
            quality={100}
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
            alt={whiteIconAlt}
            fill
            className={whiteIconClass}
            quality={100}
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

        {!coloredIcon && !whiteIcon && (
          <span
            className={`
              block size-full rounded-full
              transition-colors duration-300
              ${
                isActive
                  ? 'bg-white-1'
                  : mode === 'marker'
                    ? 'bg-primary-1 group-hover/timeline-marker:bg-white-1'
                    : 'bg-primary-1 group-hover/lifecycle-menu:bg-white-1'
              }
            `}
          />
        )}
      </>
    )
  }

  return (
    <div ref={rootRef} className="min-w-0">
      {/* mobile + tablet */}
      <div className="lg:hidden">
        <div className="text-center mt-[30px]">
          {block?.lifecycle?.title && (
            <h3
              className="
                font-agency text-[24px] leading-[1]
                text-secondary-1
                md:text-[30px]
              "
            >
              {block.lifecycle.title}
            </h3>
          )}

          {block?.lifecycle?.subtitle && (
            <p className="mt-[8px] font-grift global-p5 text-[#3E4949]">
              {block.lifecycle.subtitle}
            </p>
          )}
        </div>

        <div className="no-scrollbar mt-[12px] flex gap-[10px] overflow-x-auto pb-[4px]">
          {items.map((item, index) => {
            const isActive = index === activeIndex

            const coloredIconAlt = getMediaAlt(
              item?.mainIcon?.mainIconColored,
              item?.menu?.label || 'Lifecycle icon',
            )

            const whiteIconAlt = getMediaAlt(
              item?.mainIcon?.mainIconWhite,
              item?.menu?.label || 'Lifecycle icon',
            )

            return (
              <button
                key={item?.id ?? index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`
                  group/lifecycle-menu inline-flex shrink-0 items-center gap-[10px]
                  rounded-[8px] border border-transparent
                  px-[12px] py-[9px]
                  font-grift global-p5 font-bold
                  transition-all duration-300 ease-out
                  outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0

                  ${
                    isActive
                      ? 'bg-primary-1 text-white-1 shadow-[0_12px_28px_rgba(0,108,103,0.18)]'
                      : 'bg-transparent text-primary-1 hover:border-primary-1 hover:bg-primary-1 hover:text-white-1'
                  }
                `}
              >
                <span
                  className={`
                    relative size-[27px] shrink-0
                    transition-transform duration-300 ease-out
                    group-hover/lifecycle-menu:rotate-[16deg]
                    ${isActive ? 'rotate-[16deg]' : ''}
                  `}
                >
                  {renderIcon({
                    item,
                    isActive,
                    mode: 'menu',
                    coloredIconAlt,
                    whiteIconAlt,
                  })}
                </span>

                <span className="whitespace-nowrap text-start">{item?.menu?.label}</span>
              </button>
            )
          })}
        </div>

        {activeItem && (
          <div
            className="
              mt-[30px] grid grid-cols-1 gap-[22px]
              md:grid-cols-2 md:gap-[24px]
            "
          >
            <div
              className="
                flex min-w-0 flex-col justify-center
                rounded-[10px] border border-primary-1/35
                bg-white-1/25 px-[22px] py-[24px]
                backdrop-blur-[10px]
              "
            >
              <div
                className="
                  mb-[18px] flex w-fit items-center gap-[10px]
                  rounded-full border border-primary-1/40
                  bg-primary-1 px-[14px] py-[8px]
                  font-grift global-p5 font-bold text-white-1
                "
              >
                <span className="relative size-[27px] rotate-[16deg]">
                  {renderIcon({
                    item: activeItem,
                    isActive: true,
                    mode: 'mobile-marker',
                    coloredIconAlt: getMediaAlt(
                      activeItem?.mainIcon?.mainIconColored,
                      activeItem?.menu?.label || 'Lifecycle icon',
                    ),
                    whiteIconAlt: getMediaAlt(
                      activeItem?.mainIcon?.mainIconWhite,
                      activeItem?.menu?.label || 'Lifecycle icon',
                    ),
                  })}
                </span>

                <span>{activeItem?.menu?.label}</span>
              </div>

              {activeItem?.mainContent?.title && (
                <h3
                  className="
                    font-agency text-[30px] leading-[1.05]
                    text-secondary-1
                    md:text-[32px]
                  "
                >
                  {activeItem.mainContent.title}
                </h3>
              )}

              {activeItem?.mainContent?.description && (
                <p className="mt-[14px] font-grift global-p4 leading-[1.6] text-[#3E4949]">
                  {activeItem.mainContent.description}
                </p>
              )}
            </div>

            <div
              className="
                min-w-0 rounded-[10px] border border-primary-1/45
                bg-white-1/30 px-[22px] py-[24px]
                backdrop-blur-[12px]
              "
            >
              {activeItem?.infoCard?.title && (
                <h4
                  className="
                    font-grift global-p4 font-bold uppercase
                    tracking-[0.04em] text-primary-1
                  "
                >
                  {activeItem.infoCard.title}
                </h4>
              )}

              {activeItem?.infoCard?.description && (
                <p className="mt-[14px] font-grift global-p4 leading-[1.6] text-[#3E4949]">
                  {activeItem.infoCard.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* desktop sticky scroll area */}
      <div
        ref={desktopScrollAreaRef}
        className="hidden lg:block"
        style={{ height: desktopScrollAreaHeight }}
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
              hidden min-w-0
              lg:grid lg:grid-cols-[145px_1px_minmax(0,1fr)] lg:gap-[18px]
              xl:grid-cols-[160px_1px_minmax(0,1fr)] xl:gap-[24px]
              2xl:grid-cols-[175px_1px_minmax(0,1fr)] 2xl:gap-[30px]
            "
          >
            {/* lifecycle menu */}
            <aside className="flex min-w-0 flex-col lg:pt-[4px]">
              <div>
                {block?.lifecycle?.title && (
                  <h3
                    className="
                      font-agency text-[#191C1E]
                      lg:global-h7
                    "
                  >
                    {block.lifecycle.title}
                  </h3>
                )}

                {block?.lifecycle?.subtitle && (
                  <p className="mt-[7px] font-grift global-p6 text-[#3E4949]">
                    {block.lifecycle.subtitle}
                  </p>
                )}
              </div>

              <div
                className="
                  flex flex-col
                  lg:mt-[26px] lg:gap-[12px]
                  xl:mt-[30px] xl:gap-[14px]
                  2xl:mt-[48px] 2xl:gap-[16px]
                "
              >
                {items.map((item, index) => {
                  const isActive = index === activeIndex

                  const coloredIconAlt = getMediaAlt(
                    item?.mainIcon?.mainIconColored,
                    item?.menu?.label || 'Lifecycle icon',
                  )

                  const whiteIconAlt = getMediaAlt(
                    item?.mainIcon?.mainIconWhite,
                    item?.menu?.label || 'Lifecycle icon',
                  )

                  return (
                    <button
                      key={item?.id ?? index}
                      type="button"
                      onClick={() => handleLifecycleSelect(index)}
                      aria-pressed={isActive}
                      className={`
                        group/lifecycle-menu inline-flex shrink-0 items-center
                        rounded-[8px] border border-transparent
                        font-grift global-p6 font-bold
                        transition-all duration-300 ease-out
                        outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0

                        lg:gap-[8px] lg:px-[9px] lg:py-[9px]
                        xl:gap-[10px] xl:px-[11px] xl:py-[10px]
                        2xl:gap-[11px] 2xl:px-[12px] 2xl:py-[11px]

                        ${
                          isActive
                            ? 'bg-primary-1 text-white-1 shadow-[0_12px_28px_rgba(0,108,103,0.18)]'
                            : 'bg-transparent text-primary-1 hover:border-primary-1 hover:bg-primary-1 hover:text-white-1'
                        }
                      `}
                    >
                      <span
                        className={`
                          relative size-[27px] shrink-0
                          transition-transform duration-300 ease-out
                          group-hover/lifecycle-menu:rotate-[16deg]
                          ${isActive ? 'rotate-[16deg]' : ''}
                        `}
                      >
                        {renderIcon({
                          item,
                          isActive,
                          mode: 'menu',
                          coloredIconAlt,
                          whiteIconAlt,
                        })}
                      </span>

                      <span className="whitespace-nowrap text-start">{item?.menu?.label}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            {/* left divider */}
            <div className="bg-primary-1/70" />

            {/* rope timeline viewport */}
            <div
              ref={desktopViewportRef}
              className="
                relative min-w-0 overflow-hidden
                lg:h-[650px]
                xl:h-[720px]
                2xl:h-[780px]
              "
            >
              {/* fixed centre rope line */}
              <div
                className="
                  pointer-events-none absolute left-1/2 top-0 z-0
                  h-full w-px -translate-x-1/2 bg-primary-1
                "
              />

              <div ref={trackRef} className="relative z-10 will-change-transform">
                {items.map((item, index) => {
                  const isActive = index === activeIndex
                  const cardPosition = item?.infoCard?.position === 'left' ? 'left' : 'right'

                  const coloredIconAlt = getMediaAlt(
                    item?.mainIcon?.mainIconColored,
                    item?.menu?.label || 'Timeline icon',
                  )

                  const whiteIconAlt = getMediaAlt(
                    item?.mainIcon?.mainIconWhite,
                    item?.menu?.label || 'Timeline icon',
                  )

                  return (
                    <div
                      key={item?.id ?? index}
                      ref={(node) => {
                        rowRefs.current[index] = node
                      }}
                      className="
                        relative grid min-w-0
                        lg:min-h-[325px] lg:grid-cols-[minmax(0,1fr)_74px_minmax(0,1fr)] lg:gap-[18px]
                        xl:min-h-[360px] xl:grid-cols-[minmax(0,1fr)_86px_minmax(0,1fr)] xl:gap-[24px]
                        2xl:min-h-[390px] 2xl:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] 2xl:gap-[30px]
                      "
                    >
                      {/* desktop marker */}
                      <div
                        className={`
                          group/timeline-marker absolute left-1/2 top-1/2 z-20
                          -translate-x-1/2 -translate-y-1/2
                          items-center justify-center
                          rounded-[14px] xl:rounded-[16px] 2xl:rounded-[18px]
                          transition-all duration-300
                          lg:flex
                          lg:size-[52px]
                          xl:size-[58px]
                          2xl:size-[64px]
                          ${
                            isActive
                              ? 'rotate-45 bg-primary-1 shadow-[0_14px_30px_rgba(0,108,103,0.22)]'
                              : 'border border-primary-1/50 bg-white-1/60 backdrop-blur-[8px] hover:rotate-45 hover:border-primary-1 hover:bg-primary-1 hover:shadow-[0_14px_30px_rgba(0,108,103,0.22)]'
                          }
                        `}
                      >
                        <span
                          className={`
                            relative block
                            transition-transform duration-300
                            lg:size-[26px]
                            xl:size-[29px]
                            2xl:size-[32px]
                            ${isActive ? '-rotate-45' : 'group-hover/timeline-marker:-rotate-45'}
                          `}
                        >
                          {renderIcon({
                            item,
                            isActive,
                            mode: 'marker',
                            coloredIconAlt,
                            whiteIconAlt,
                          })}
                        </span>
                      </div>

                      {/* main content */}
                      <div
                        className={`
                          cs-dev-framework-animate flex min-w-0 flex-col justify-center
                          ${
                            cardPosition === 'left'
                              ? 'lg:col-start-3 lg:text-start'
                              : 'lg:col-start-1 lg:text-end'
                          }
                          lg:row-start-1
                        `}
                      >
                        {item?.mainContent?.title && (
                          <h3
                            className="
                              font-agency leading-[1.05] text-secondary-1
                              lg:text-[35px]
                              xl:text-[42px]
                              2xl:text-[50px]
                            "
                          >
                            {item.mainContent.title}
                          </h3>
                        )}

                        {item?.mainContent?.description && (
                          <p
                            className={`
                              mt-[12px] max-w-[430px]
                              font-grift global-p4 leading-[1.55]
                              text-[#3E4949]
                              ${cardPosition === 'left' ? 'lg:mr-auto' : 'lg:ml-auto'}
                            `}
                          >
                            {item.mainContent.description}
                          </p>
                        )}
                      </div>

                      {/* empty centre column */}
                      <div className="lg:col-start-2 lg:row-start-1" />

                      {/* info card */}
                      <div
                        className={`
                          cs-dev-framework-animate flex min-w-0 flex-col justify-center
                          ${cardPosition === 'left' ? 'lg:col-start-1' : 'lg:col-start-3'}
                          lg:row-start-1
                        `}
                      >
                        <div
                          className="
                            rounded-[10px] border border-primary-1/45
                            bg-white-1/30 backdrop-blur-[12px]
                            lg:px-[20px] lg:py-[20px]
                            xl:px-[24px] xl:py-[22px]
                            2xl:px-[28px] 2xl:py-[26px]
                          "
                        >
                          {item?.infoCard?.title && (
                            <h4
                              className="
                                font-grift global-p3 font-bold uppercase
                                tracking-[0.04em] text-primary-1
                              "
                            >
                              {item.infoCard.title}
                            </h4>
                          )}

                          {item?.infoCard?.description && (
                            <p
                              className="
                                mt-[14px]
                                font-grift global-p4 leading-[1.55]
                                text-[#3E4949]
                              "
                            >
                              {item.infoCard.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CS_DevFrameworkGrid
