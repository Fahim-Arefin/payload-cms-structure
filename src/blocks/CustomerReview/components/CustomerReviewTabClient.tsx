// 'use client'

// import { gsap, useGSAP } from '@/lib/gsap'
// import Image from 'next/image'
// import React, { useEffect, useRef, useState } from 'react'

// import ArrowRight from 'public/assets/icons/arrowright.png'
// import DummyProfile from 'public/assets/images/dummyProfile.jpg'

// export type CustomerReviewItem = {
//   id: string
//   buyersFullName: string
//   companyName: string
//   position: string
//   rating: number
//   review: string
//   companyIcon: {
//     url: string
//     alt?: string | null
//     blurDataURL?: string | null
//   } | null
//   userProfileImage: {
//     url: string
//     alt?: string | null
//     blurDataURL?: string | null
//   } | null
// }

// type Props = {
//   reviews: CustomerReviewItem[]
// }

// function formatRating(rating: number) {
//   if (!Number.isFinite(rating)) return '5/5'
//   return Number.isInteger(rating) ? `${rating}/5` : `${rating.toFixed(1)}/5`
// }

// function getFilledStarCount(rating: number) {
//   if (!Number.isFinite(rating)) return 5
//   return Math.max(0, Math.min(5, Math.round(rating)))
// }

// function CustomerReviewTabClient({ reviews }: Props) {
//   const [activeIndex, setActiveIndex] = useState(0)

//   const rowRef = useRef<HTMLDivElement | null>(null)
//   const indicatorRef = useRef<HTMLDivElement | null>(null)
//   const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
//   const cardContentRef = useRef<HTMLDivElement | null>(null)
//   const directionRef = useRef(1)
//   const hasMountedRef = useRef(false)

//   const activeReview = reviews[activeIndex] || reviews[0]

//   const profileImage = activeReview?.userProfileImage
//   const companyIcon = activeReview?.companyIcon
//   const filledStarCount = getFilledStarCount(activeReview?.rating)

//   const updateIndicator = (duration = 0.42) => {
//     const row = rowRef.current
//     const indicator = indicatorRef.current
//     const activeTab = tabRefs.current[activeIndex]

//     if (!row || !indicator || !activeTab) return

//     const tabBounds = activeTab.getBoundingClientRect()
//     const rowBounds = row.getBoundingClientRect()
//     const offset = tabBounds.left - rowBounds.left + row.scrollLeft

//     gsap.to(indicator, {
//       x: offset,
//       width: tabBounds.width,
//       autoAlpha: 1,
//       duration,
//       ease: 'back.out(1)',
//       overwrite: 'auto',
//     })
//   }

//   useGSAP(
//     () => {
//       updateIndicator(hasMountedRef.current ? 0.42 : 0)
//       hasMountedRef.current = true

//       const handleResize = () => updateIndicator(0.25)

//       window.addEventListener('resize', handleResize)

//       return () => {
//         window.removeEventListener('resize', handleResize)
//       }
//     },
//     {
//       dependencies: [activeIndex],
//       scope: rowRef,
//     },
//   )

//   useGSAP(
//     () => {
//       const cardContent = cardContentRef.current
//       if (!cardContent) return

//       gsap.fromTo(
//         cardContent,
//         {
//           autoAlpha: 0,
//           x: directionRef.current > 0 ? 46 : -46,
//           filter: 'blur(7px)',
//         },
//         {
//           autoAlpha: 1,
//           x: 0,
//           filter: 'blur(0px)',
//           duration: 0.55,
//           ease: 'power3.out',
//           overwrite: 'auto',
//         },
//       )
//     },
//     {
//       dependencies: [activeIndex],
//     },
//   )

//   useEffect(() => {
//     const row = rowRef.current
//     const activeTab = tabRefs.current[activeIndex]

//     if (!row || !activeTab) return

//     const tabLeft = activeTab.offsetLeft
//     const tabWidth = activeTab.offsetWidth
//     const rowWidth = row.offsetWidth

//     row.scrollTo({
//       left: tabLeft - rowWidth / 2 + tabWidth / 2,
//       behavior: 'smooth',
//     })
//   }, [activeIndex])

//   const handleSelect = (index: number) => {
//     if (index === activeIndex) return

//     directionRef.current = index > activeIndex ? 1 : -1
//     setActiveIndex(index)
//   }

//   const handlePrevious = () => {
//     directionRef.current = -1
//     setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
//   }

//   const handleNext = () => {
//     directionRef.current = 1
//     setActiveIndex((prev) => (prev + 1) % reviews.length)
//   }

//   if (!reviews.length || !activeReview) return null

//   return (
//     <div className="relative w-full max-w-full overflow-hidden">
//       {/* tabs */}
//       <div className="relative w-full overflow-hidden">
//         <div
//           ref={rowRef}
//           className="
//             relative mx-auto flex w-full max-w-[1180px] items-end
//             justify-start gap-[18px]
//             overflow-x-auto overflow-y-hidden
//             px-[16px]
//             [scrollbar-width:none]
//             md:justify-center md:gap-[28px] md:px-[20px]
//             lg:gap-[34px]
//             xl:gap-[44px]
//             [&::-webkit-scrollbar]:hidden
//           "
//         >
//           {/* animated active underline */}
//           <div
//             ref={indicatorRef}
//             className="
//               pointer-events-none absolute bottom-0 left-0 z-20
//               h-px w-0 bg-primary-2 opacity-0
//             "
//           />

//           {reviews.map((review, index) => {
//             const isActive = index === activeIndex

//             return (
//               <button
//                 key={review.id || index}
//                 ref={(el) => {
//                   tabRefs.current[index] = el
//                 }}
//                 type="button"
//                 onClick={() => handleSelect(index)}
//                 className="
//                   group/review-tab
//                   relative z-10 shrink-0
//                   px-[20px] pb-[14px]
//                   font-grift global-p4 font-bold
//                   transition-colors duration-300
//                   md:px-[42px]
//                   lg:px-[56px]
//                   xl:px-[70px]
//                 "
//               >
//                 <span
//                   className={`
//                     block max-w-[150px] truncate whitespace-nowrap
//                     transition-colors duration-300
//                     md:max-w-none
//                     ${
//                       isActive
//                         ? 'text-white-1'
//                         : 'text-white-1/30 group-hover/review-tab:text-white-1/70'
//                     }
//                   `}
//                 >
//                   {review.companyName}
//                 </span>

//                 {/* inactive underline, same bottom position as active indicator */}
//                 <span
//                   className={`
//                     pointer-events-none absolute bottom-0 left-0 h-px w-full
//                     bg-primary-2/35 transition-opacity duration-300
//                     ${isActive ? 'opacity-0' : 'opacity-100'}
//                   `}
//                 />
//               </button>
//             )
//           })}
//         </div>
//       </div>

//       {/* review card area */}
//       <div
//         className="
//           relative mx-auto w-full
//           px-[16px]
//           mt-[28px]
//           max-w-[420px]
//           md:max-w-[1120px] md:px-[42px] md:mt-[34px]
//           lg:px-[78px] lg:mt-[42px]
//           xl:max-w-[900px]
//           2xl:max-w-[1000px] 2xl:mt-[58px]
//         "
//       >
//         {/* previous - desktop/tablet side arrow */}
//         <button
//           type="button"
//           aria-label="Previous review"
//           onClick={handlePrevious}
//           className="
//             absolute left-0 top-1/2 z-20
//             hidden -translate-y-1/2 items-center justify-center
//             rounded-full bg-primary-1/35
//             shadow-[0_10px_24px_rgba(0,108,103,0.18)]
//             backdrop-blur-[10px]
//             transition-all duration-300 ease-out
//             hover:bg-primary-1
//             md:flex md:size-[30px]
//             lg:size-[34px]
//             xl:size-[38px]
//           "
//         >
//           <Image
//             src={ArrowRight}
//             alt=""
//             width={18}
//             height={18}
//             className="
//               h-[11px] w-[11px] rotate-180 object-contain
//               lg:h-[13px] lg:w-[13px]
//               xl:h-[15px] xl:w-[15px]
//             "
//             placeholder="blur"
//             blurDataURL={ArrowRight.blurDataURL}
//             quality={95}
//           />
//         </button>

//         {/* next - desktop/tablet side arrow */}
//         <button
//           type="button"
//           aria-label="Next review"
//           onClick={handleNext}
//           className="
//             absolute right-0 top-1/2 z-20
//             hidden -translate-y-1/2 items-center justify-center
//             rounded-full bg-primary-1/35
//             shadow-[0_10px_24px_rgba(0,108,103,0.18)]
//             backdrop-blur-[10px]
//             transition-all duration-300 ease-out
//             hover:bg-primary-1
//             md:flex md:size-[30px]
//             lg:size-[34px]
//             xl:size-[38px]
//           "
//         >
//           <Image
//             src={ArrowRight}
//             alt=""
//             width={18}
//             height={18}
//             className="
//               h-[11px] w-[11px] object-contain
//               lg:h-[13px] lg:w-[13px]
//               xl:h-[15px] xl:w-[15px]
//             "
//             placeholder="blur"
//             blurDataURL={ArrowRight.blurDataURL}
//             quality={95}
//           />
//         </button>

//         {/* static card */}
//         <div
//           className="
//             relative z-10 mx-auto w-full
//             overflow-hidden
//             rounded-[8px] md:rounded-[14px]
//             bg-primary-1/10
//             shadow-[0_24px_80px_rgba(0,0,0,0.18)]
//             backdrop-blur-[10px]
//           "
//         >
//           <div
//             ref={cardContentRef}
//             className="
//               relative z-10
//               grid grid-cols-[118px_minmax(0,1fr)] gap-[14px]
//               p-[12px]
//               md:grid-cols-[190px_minmax(0,1fr)]
//               md:gap-[24px] md:p-[16px]
//               lg:grid-cols-[215px_minmax(0,1fr)]
//               lg:p-[20px]
//               xl:grid-cols-[235px_minmax(0,1fr)]
//               xl:gap-[28px] xl:p-[22px]
//               2xl:grid-cols-[250px_minmax(0,1fr)]
//             "
//           >
//             {/* profile image */}
//             <div
//               className="
//                 relative w-full
//                 aspect-[240/301]
//                 overflow-hidden
//               "
//             >
//               <Image
//                 src={profileImage?.url || DummyProfile}
//                 alt={profileImage?.alt || activeReview.buyersFullName || 'Customer profile'}
//                 fill
//                 className="object-cover object-center rounded-l-[8px] md:rounded-l-[14px]"
//                 placeholder={profileImage?.blurDataURL ? 'blur' : 'empty'}
//                 blurDataURL={profileImage?.blurDataURL || undefined}
//                 quality={100}
//               />
//             </div>

//             {/* content */}
//             <div
//               className="
//                 flex min-w-0 flex-col
//                 py-[0px]
//                 text-white-1
//                 md:py-[6px]
//               "
//             >
//               <div className="flex items-center gap-[8px] md:gap-[14px]">
//                 <div className="flex items-center gap-[2px] md:gap-[3px]">
//                   {Array.from({ length: 5 }).map((_, index) => {
//                     const isFilled = index < filledStarCount

//                     return (
//                       <span
//                         key={index}
//                         className={`
//                           font-grift leading-none
//                           text-[12px] md:text-[20px]
//                           ${isFilled ? 'text-primary-2' : 'text-white-1/25'}
//                         `}
//                       >
//                         ★
//                       </span>
//                     )
//                   })}
//                 </div>

//                 <div
//                   className="
//                     font-grift font-medium
//                     text-white-1
//                     text-[8px] md:text-[11px]
//                   "
//                 >
//                   {formatRating(activeReview.rating)}
//                 </div>
//               </div>

//               <p
//                 className="
//                   mt-[10px]
//                   font-grift font-semibold leading-[1.5]
//                   text-white-1
//                   md:mt-[18px] global-p6 md:global-p4
//                 "
//                 style={{
//                   display: '-webkit-box',
//                   WebkitLineClamp: 6,
//                   WebkitBoxOrient: 'vertical',
//                   overflow: 'hidden',
//                 }}
//               >
//                 &quot;{activeReview.review}&quot;
//               </p>

//               <div className="mt-auto flex items-center justify-between gap-[10px] pt-[12px] md:gap-[18px] md:pt-[22px]">
//                 <div className="min-w-0">
//                   <h4
//                     className="
//                       truncate
//                       font-grift text-[10px] font-bold
//                       text-white-3
//                       md:global-p5
//                     "
//                   >
//                     {activeReview.buyersFullName}
//                   </h4>

//                   {activeReview.position && (
//                     <p
//                       className="
//                         mt-[2px]
//                         truncate
//                         font-grift
//                         text-white-2
//                         text-[8px] md:text-[10px] xl:text-[12px]
//                       "
//                     >
//                       {activeReview.position}
//                     </p>
//                   )}
//                 </div>

//                 <div
//                   className="
//                     relative shrink-0
//                     min-w-[62px]
//                     text-right
//                     md:min-w-[90px]
//                   "
//                 >
//                   {companyIcon?.url ? (
//                     <div className="relative h-[24px] w-[68px] md:h-[44px] md:w-[124px]">
//                       <Image
//                         src={companyIcon.url}
//                         alt={companyIcon.alt || activeReview.companyName}
//                         fill
//                         className="object-contain object-right"
//                         placeholder={companyIcon.blurDataURL ? 'blur' : 'empty'}
//                         blurDataURL={companyIcon.blurDataURL || undefined}
//                         quality={100}
//                         sizes="124px"
//                       />
//                     </div>
//                   ) : (
//                     <span
//                       className="
//                         block truncate font-agency text-[12px] leading-none
//                         text-white-1
//                         md:text-[18px]
//                         lg:text-[20px]
//                       "
//                     >
//                       {activeReview.companyName}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* mobile arrows */}
//         <div className="relative z-20 mt-[18px] flex items-center justify-center gap-[12px] md:hidden">
//           <button
//             type="button"
//             aria-label="Previous review"
//             onClick={handlePrevious}
//             className="
//               flex size-[30px] items-center justify-center
//               rounded-full bg-primary-1/35
//               shadow-[0_10px_24px_rgba(0,108,103,0.18)]
//               backdrop-blur-[10px]
//               transition-all duration-300 ease-out
//               hover:bg-primary-1
//               active:scale-95
//             "
//           >
//             <Image
//               src={ArrowRight}
//               alt=""
//               width={16}
//               height={16}
//               className="h-[11px] w-[11px] rotate-180 object-contain"
//               placeholder="blur"
//               blurDataURL={ArrowRight.blurDataURL}
//               quality={95}
//             />
//           </button>

//           <button
//             type="button"
//             aria-label="Next review"
//             onClick={handleNext}
//             className="
//               flex size-[30px] items-center justify-center
//               rounded-full bg-primary-1/35
//               shadow-[0_10px_24px_rgba(0,108,103,0.18)]
//               backdrop-blur-[10px]
//               transition-all duration-300 ease-out
//               hover:bg-primary-1
//               active:scale-95
//             "
//           >
//             <Image
//               src={ArrowRight}
//               alt=""
//               width={16}
//               height={16}
//               className="h-[11px] w-[11px] object-contain"
//               placeholder="blur"
//               blurDataURL={ArrowRight.blurDataURL}
//               quality={95}
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CustomerReviewTabClient
'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import ArrowRight from 'public/assets/icons/arrowright.png'
import DummyProfile from 'public/assets/images/dummyProfile.jpg'

export type CustomerReviewItem = {
  id: string
  buyersFullName: string
  companyName: string
  position: string
  rating: number
  review: string
  companyIcon: {
    url: string
    alt?: string | null
    blurDataURL?: string | null
  } | null
  userProfileImage: {
    url: string
    alt?: string | null
    blurDataURL?: string | null
  } | null
}

type Props = {
  reviews: CustomerReviewItem[]
}

function formatRating(rating: number) {
  if (!Number.isFinite(rating)) return '5/5'
  return Number.isInteger(rating) ? `${rating}/5` : `${rating.toFixed(1)}/5`
}

function getFilledStarCount(rating: number) {
  if (!Number.isFinite(rating)) return 5
  return Math.max(0, Math.min(5, Math.round(rating)))
}

function CustomerReviewTabClient({ reviews }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  const rowRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const cardContentRef = useRef<HTMLDivElement | null>(null)
  const directionRef = useRef(1)
  const hasMountedRef = useRef(false)

  const activeReview = reviews[activeIndex] || reviews[0]

  const profileImage = activeReview?.userProfileImage
  const companyIcon = activeReview?.companyIcon
  const filledStarCount = getFilledStarCount(activeReview?.rating)

  const updateIndicator = (duration = 0.42) => {
    const row = rowRef.current
    const indicator = indicatorRef.current
    const activeTab = tabRefs.current[activeIndex]

    if (!row || !indicator || !activeTab) return

    const tabBounds = activeTab.getBoundingClientRect()
    const rowBounds = row.getBoundingClientRect()
    const offset = tabBounds.left - rowBounds.left + row.scrollLeft

    gsap.to(indicator, {
      x: offset,
      width: tabBounds.width,
      autoAlpha: 1,
      duration,
      ease: 'back.out(1)',
      overwrite: 'auto',
    })
  }

  useGSAP(
    () => {
      updateIndicator(hasMountedRef.current ? 0.42 : 0)
      hasMountedRef.current = true

      const handleResize = () => updateIndicator(0.25)

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    {
      dependencies: [activeIndex],
      scope: rowRef,
    },
  )

  useGSAP(
    () => {
      const cardContent = cardContentRef.current
      if (!cardContent) return

      gsap.fromTo(
        cardContent,
        {
          autoAlpha: 0,
          x: directionRef.current > 0 ? 46 : -46,
          filter: 'blur(7px)',
        },
        {
          autoAlpha: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          ease: 'power3.out',
          overwrite: 'auto',
        },
      )
    },
    {
      dependencies: [activeIndex],
    },
  )

  useEffect(() => {
    const row = rowRef.current
    const activeTab = tabRefs.current[activeIndex]

    if (!row || !activeTab) return

    const tabLeft = activeTab.offsetLeft
    const tabWidth = activeTab.offsetWidth
    const rowWidth = row.offsetWidth

    row.scrollTo({
      left: tabLeft - rowWidth / 2 + tabWidth / 2,
      behavior: 'smooth',
    })
  }, [activeIndex])

  const handleSelect = (index: number) => {
    if (index === activeIndex) return

    directionRef.current = index > activeIndex ? 1 : -1
    setActiveIndex(index)
  }

  const handlePrevious = () => {
    directionRef.current = -1
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleNext = () => {
    directionRef.current = 1
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  if (!reviews.length || !activeReview) return null

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      {/* tabs */}
      {/* tabs */}
      <div className="relative w-full max-w-full overflow-hidden">
        <div
          ref={rowRef}
          className="
      relative flex w-full items-end justify-start gap-[18px]
      overflow-x-auto overflow-y-hidden
      px-[16px]
      [scrollbar-width:none]
      md:gap-[28px] md:px-[20px]
      lg:gap-[34px] lg:px-[24px]
      xl:gap-[44px] xl:px-[28px]
      [&::-webkit-scrollbar]:hidden
    "
        >
          {/* animated active underline */}
          <div
            ref={indicatorRef}
            className="
        pointer-events-none absolute bottom-0 left-0 z-20
        h-px w-0 bg-primary-2 opacity-0
      "
          />

          {reviews.map((review, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={review.id || index}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                type="button"
                onClick={() => handleSelect(index)}
                className="
            group/review-tab
            relative z-10 shrink-0
            px-[20px] pb-[14px]
            font-grift global-p4 font-bold
            transition-colors duration-300
            md:px-[34px]
            lg:px-[44px]
            xl:px-[56px]
          "
              >
                <span
                  className={`
              block whitespace-nowrap
              transition-colors duration-300
              ${
                isActive ? 'text-white-1' : 'text-white-1/30 group-hover/review-tab:text-white-1/70'
              }
            `}
                >
                  {review.companyName}
                </span>

                {/* inactive underline, same bottom position as active indicator */}
                <span
                  className={`
              pointer-events-none absolute bottom-0 left-0 h-px w-full
              bg-primary-2/35 transition-opacity duration-300
              ${isActive ? 'opacity-0' : 'opacity-100'}
            `}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* review card area */}
      <div
        className="
          relative mx-auto w-full
          px-[16px]
          mt-[28px]
          max-w-[420px]
          md:max-w-[1120px] md:px-[42px] md:mt-[34px]
          lg:px-[78px] lg:mt-[42px]
          xl:max-w-[900px]
          2xl:max-w-[1000px] 2xl:mt-[58px]
        "
      >
        {/* previous - desktop/tablet side arrow */}
        <button
          type="button"
          aria-label="Previous review"
          onClick={handlePrevious}
          className="
            absolute left-0 top-1/2 z-20
            hidden -translate-y-1/2 items-center justify-center
            rounded-full bg-primary-1/35
            shadow-[0_10px_24px_rgba(0,108,103,0.18)]
            backdrop-blur-[10px]
            transition-all duration-300 ease-out
            hover:bg-primary-1
            md:flex md:size-[30px]
            lg:size-[34px]
            xl:size-[38px]
          "
        >
          <Image
            src={ArrowRight}
            alt=""
            width={18}
            height={18}
            className="
              h-[11px] w-[11px] rotate-180 object-contain
              lg:h-[13px] lg:w-[13px]
              xl:h-[15px] xl:w-[15px]
            "
            placeholder="blur"
            blurDataURL={ArrowRight.blurDataURL}
            quality={95}
          />
        </button>

        {/* next - desktop/tablet side arrow */}
        <button
          type="button"
          aria-label="Next review"
          onClick={handleNext}
          className="
            absolute right-0 top-1/2 z-20
            hidden -translate-y-1/2 items-center justify-center
            rounded-full bg-primary-1/35
            shadow-[0_10px_24px_rgba(0,108,103,0.18)]
            backdrop-blur-[10px]
            transition-all duration-300 ease-out
            hover:bg-primary-1
            md:flex md:size-[30px]
            lg:size-[34px]
            xl:size-[38px]
          "
        >
          <Image
            src={ArrowRight}
            alt=""
            width={18}
            height={18}
            className="
              h-[11px] w-[11px] object-contain
              lg:h-[13px] lg:w-[13px]
              xl:h-[15px] xl:w-[15px]
            "
            placeholder="blur"
            blurDataURL={ArrowRight.blurDataURL}
            quality={95}
          />
        </button>

        {/* static card */}
        <div
          className="
            relative z-10 mx-auto w-full
            overflow-hidden
            rounded-[8px] md:rounded-[14px]
            bg-primary-1/10
            shadow-[0_24px_80px_rgba(0,0,0,0.18)]
            backdrop-blur-[10px]
          "
        >
          <div
            ref={cardContentRef}
            className="
              relative z-10
              grid grid-cols-[118px_minmax(0,1fr)] gap-[14px]
              p-[12px]
              md:grid-cols-[190px_minmax(0,1fr)]
              md:gap-[24px] md:p-[16px]
              lg:grid-cols-[215px_minmax(0,1fr)]
              lg:p-[20px]
              xl:grid-cols-[235px_minmax(0,1fr)]
              xl:gap-[28px] xl:p-[22px]
              2xl:grid-cols-[250px_minmax(0,1fr)]
            "
          >
            {/* profile image */}
            <div
              className="
                relative w-full
                aspect-[240/301]
                overflow-hidden
              "
            >
              <Image
                src={profileImage?.url || DummyProfile}
                alt={profileImage?.alt || activeReview.buyersFullName || 'Customer profile'}
                fill
                className="object-cover object-center rounded-l-[8px] md:rounded-l-[14px]"
                placeholder={profileImage?.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={profileImage?.blurDataURL || undefined}
                quality={100}
              />
            </div>

            {/* content */}
            <div
              className="
                flex min-w-0 flex-col
                py-[0px]
                text-white-1
                md:py-[6px]
              "
            >
              <div className="flex items-center gap-[8px] md:gap-[14px]">
                <div className="flex items-center gap-[2px] md:gap-[3px]">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isFilled = index < filledStarCount

                    return (
                      <span
                        key={index}
                        className={`
                          font-grift leading-none
                          text-[12px] md:text-[20px]
                          ${isFilled ? 'text-primary-2' : 'text-white-1/25'}
                        `}
                      >
                        ★
                      </span>
                    )
                  })}
                </div>

                <div
                  className="
                    font-grift font-medium
                    text-white-1
                    text-[8px] md:text-[11px]
                  "
                >
                  {formatRating(activeReview.rating)}
                </div>
              </div>

              <p
                className="
                  mt-[10px]
                  font-grift font-semibold leading-[1.5]
                  text-white-1
                  md:mt-[18px] global-p6 md:global-p4
                "
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                &quot;{activeReview.review}&quot;
              </p>

              <div className="mt-auto flex items-center justify-between gap-[10px] pt-[12px] md:gap-[18px] md:pt-[22px]">
                <div className="min-w-0">
                  <h4
                    className="
                      truncate
                      font-grift text-[10px] font-bold
                      text-white-3
                      md:global-p5
                    "
                  >
                    {activeReview.buyersFullName}
                  </h4>

                  {activeReview.position && (
                    <p
                      className="
                        mt-[2px]
                        truncate
                        font-grift
                        text-white-2
                        text-[8px] md:text-[10px] xl:text-[12px]
                      "
                    >
                      {activeReview.position}
                    </p>
                  )}
                </div>

                <div
                  className="
                    relative shrink-0
                    min-w-[62px]
                    text-right
                    md:min-w-[90px]
                  "
                >
                  {companyIcon?.url ? (
                    <div className="relative h-[24px] w-[68px] md:h-[44px] md:w-[124px]">
                      <Image
                        src={companyIcon.url}
                        alt={companyIcon.alt || activeReview.companyName}
                        fill
                        className="object-contain object-right"
                        placeholder={companyIcon.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={companyIcon.blurDataURL || undefined}
                        quality={100}
                        sizes="124px"
                      />
                    </div>
                  ) : (
                    <span
                      className="
                        block truncate font-agency text-[12px] leading-none
                        text-white-1
                        md:text-[18px]
                        lg:text-[20px]
                      "
                    >
                      {activeReview.companyName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile arrows */}
        <div className="relative z-20 mt-[18px] flex items-center justify-center gap-[12px] md:hidden">
          <button
            type="button"
            aria-label="Previous review"
            onClick={handlePrevious}
            className="
              flex size-[30px] items-center justify-center
              rounded-full bg-primary-1/35
              shadow-[0_10px_24px_rgba(0,108,103,0.18)]
              backdrop-blur-[10px]
              transition-all duration-300 ease-out
              hover:bg-primary-1
              active:scale-95
            "
          >
            <Image
              src={ArrowRight}
              alt=""
              width={16}
              height={16}
              className="h-[11px] w-[11px] rotate-180 object-contain"
              placeholder="blur"
              blurDataURL={ArrowRight.blurDataURL}
              quality={95}
            />
          </button>

          <button
            type="button"
            aria-label="Next review"
            onClick={handleNext}
            className="
              flex size-[30px] items-center justify-center
              rounded-full bg-primary-1/35
              shadow-[0_10px_24px_rgba(0,108,103,0.18)]
              backdrop-blur-[10px]
              transition-all duration-300 ease-out
              hover:bg-primary-1
              active:scale-95
            "
          >
            <Image
              src={ArrowRight}
              alt=""
              width={16}
              height={16}
              className="h-[11px] w-[11px] object-contain"
              placeholder="blur"
              blurDataURL={ArrowRight.blurDataURL}
              quality={95}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerReviewTabClient
