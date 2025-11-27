// // modal view implemented but yet still bug
// 'use client'

// import Image from 'next/image'
// import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
// import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
// import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
// import 'swiper/css'
// import 'swiper/css/effect-coverflow'
// import { Autoplay, EffectCoverflow } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import type { Swiper as SwiperClass } from 'swiper'
// import './slider.css'
// import { LifeAtShantaBlockType } from '@/types/payloadCustomTypes'

// type GlobalSwiperProps = {
//   slidesData: LifeAtShantaBlockType['gallery']
// }

// export default function GlobalSwiper({ slidesData }: GlobalSwiperProps) {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [active, setActive] = useState<'left' | 'right'>('right')
//   const [previewIndex, setPreviewIndex] = useState<number | null>(null)

//   const swiperRef = useRef<SwiperClass | null>(null)

//   // normalize input
//   const items = Array.isArray(slidesData) ? slidesData : []
//   const hasEnoughForLoop = items.length > 3

//   const normalized = useMemo(
//     () =>
//       items
//         .map((slide) => {
//           const rel = slide?.image as any
//           const url = typeof rel === 'object' && rel?.url ? rel.url : undefined
//           const blur = (slide as any)?.imageBlurDataURL as string | undefined
//           return { url, blur }
//         })
//         .filter((s) => !!s.url),
//     [items],
//   )

//   // autoplay helpers
//   const stopAutoplay = useCallback(() => {
//     try {
//       swiperRef.current?.autoplay?.stop()
//     } catch {}
//   }, [])
//   const startAutoplay = useCallback(() => {
//     try {
//       swiperRef.current?.autoplay?.start()
//     } catch {}
//   }, [])

//   // open/close preview
//   const openPreview = useCallback(
//     (i: number) => {
//       setPreviewIndex(i)
//       stopAutoplay()
//     },
//     [stopAutoplay],
//   )

//   const closePreview = useCallback(() => {
//     setPreviewIndex(null)
//     startAutoplay()
//   }, [startAutoplay])

//   // esc to close
//   useEffect(() => {
//     if (previewIndex === null) return
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') closePreview()
//     }
//     window.addEventListener('keydown', onKey)
//     return () => window.removeEventListener('keydown', onKey)
//   }, [previewIndex, closePreview])

//   useEffect(() => {
//     if (swiperRef.current) setActiveIndex(swiperRef.current.realIndex ?? 0)
//   }, [])

//   if (!normalized.length) return null

//   return (
//     <div className="w-full max-w-screen-xl mx-auto py-10">
//       <Swiper
//         modules={[EffectCoverflow, Autoplay]}
//         onSwiper={(sw) => (swiperRef.current = sw)}
//         effect="coverflow"
//         centeredSlides
//         grabCursor
//         loop={hasEnoughForLoop}
//         slidesPerView={1.2}
//         breakpoints={{
//           480: { slidesPerView: 2 },
//           768: { slidesPerView: 2.6 },
//           1024: { slidesPerView: 3.2 },
//         }}
//         spaceBetween={16}
//         autoplay={{
//           delay: 3000, // 3 seconds
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true,
//         }}
//         coverflowEffect={{ rotate: 16, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
//         className="!py-2 h-auto"
//         onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
//       >
//         {normalized.map((slide, i) => {
//           const isActive = i === activeIndex
//           return (
//             <SwiperSlide key={i} className="!h-auto flex items-center justify-center px-1">
//               <div
//                 className={[
//                   'relative w-full max-w-[260px] md:max-w-[300px]',
//                   'aspect-[4/5] rounded-2xl overflow-hidden',
//                   'shadow-lg ring-1 ring-black/5 bg-neutral-100',
//                   'transition-transform duration-300 will-change-transform',
//                   isActive ? 'scale-[1.04]' : 'scale-100',
//                   'cursor-zoom-in',
//                 ].join(' ')}
//                 // Open preview on hover (desktop) …
//                 onMouseEnter={() => openPreview(i)}
//                 // …and also on click (touch devices / fallback)
//                 onClick={() => openPreview(i)}
//               >
//                 <Image
//                   src={slide.url!}
//                   alt="Slide image"
//                   fill
//                   // sizes="(max-width: 768px) 260px, 300px"
//                   className="object-cover object-center"
//                   {...(slide.blur
//                     ? ({ placeholder: 'blur', blurDataURL: slide.blur } as const)
//                     : {})}
//                 />
//               </div>
//             </SwiperSlide>
//           )
//         })}
//       </Swiper>

//       {/* controls */}
//       <div className="mt-6 flex justify-center gap-2 items-center w-fit mx-auto">
//         <button
//           aria-label="Previous slide"
//           onClick={() => {
//             swiperRef.current?.slidePrev()
//             setActive('left')
//           }}
//           className={[
//             'transition-all duration-300 flex items-center justify-center rounded-full',
//             active === 'left'
//               ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5 xl:px-6 h-8'
//               : 'bg-white/80 backdrop-blur hover:bg-white text-gray-700 border border-gray-300 w-8 h-8',
//           ].join(' ')}
//         >
//           {active === 'left' ? <BsArrowLeft size={18} /> : <LuArrowLeft size={18} />}
//         </button>

//         <button
//           aria-label="Next slide"
//           onClick={() => {
//             swiperRef.current?.slideNext()
//             setActive('right')
//           }}
//           className={[
//             'transition-all duration-300 flex items-center justify-center rounded-full',
//             active === 'right'
//               ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5 xl:px-6 h-8'
//               : 'bg-white/80 backdrop-blur hover:bg-white text-gray-700 border border-gray-300 w-8 h-8',
//           ].join(' ')}
//         >
//           {active === 'right' ? <BsArrowRight size={18} /> : <LuArrowRight size={18} />}
//         </button>
//       </div>

//       {/* Modal / dialog overlay */}
//       {/* {previewIndex !== null && normalized[previewIndex] && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
//           onClick={closePreview} // click backdrop to close
//         >
//           <div
//             className="relative w-[92vw] md:w-[72vw] lg:w-[60vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 animate-pop"
//             onClick={(e) => e.stopPropagation()} // don't close when clicking the image
//           >
//             <div className="relative w-full h-[60vh] md:h-[70vh] bg-black">
//               <Image
//                 src={normalized[previewIndex].url!}
//                 alt="Preview"
//                 fill
//                 sizes="100vw"
//                 className="object-contain"
//                 {...(normalized[previewIndex].blur
//                   ? ({ placeholder: 'blur', blurDataURL: normalized[previewIndex].blur } as const)
//                   : {})}
//               />
//             </div>
//             <button
//               onClick={closePreview}
//               className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white text-gray-900 px-3 py-1 text-sm shadow"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )} */}
//       {/* Modal / dialog overlay (16:9, clamps to viewport) */}
//       {previewIndex !== null && normalized[previewIndex] && (
//         <div
//           role="dialog"
//           aria-modal="true"
//           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
//           onClick={closePreview} // click backdrop to close
//         >
//           <div
//             // Always 16:9, sized to fit: min(92vw, 90vh * 16/9)
//             className="relative w-[92vw] md:w-[72vw] lg:w-[60vw] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 animate-pop bg-black aspect-[16/9]"
//             // style={{ width: 'min(60vw, calc(90vh * 16 / 9))' }}
//             onClick={(e) => e.stopPropagation()} // don't close when clicking the content
//           >
//             <Image
//               src={normalized[previewIndex].url!}
//               alt="Preview"
//               fill
//               sizes="100vw"
//               className="object-contain"
//               {...(normalized[previewIndex].blur
//                 ? ({ placeholder: 'blur', blurDataURL: normalized[previewIndex].blur } as const)
//                 : {})}
//             />
//             <button
//               onClick={closePreview}
//               className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white text-gray-900 px-3 py-1 text-sm shadow"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// ======================================================================================
// ======================================================================================
// ======================================================================================
// ======================================================================================

// modal view fixed: hover-delay open, smooth show/hide, close on outside/Esc/leave
'use client'

import { sliderDelay } from '@/lib/data'
import { LifeAtShantaBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import type { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './slider.css'

type GlobalSwiperProps = {
  slidesData: LifeAtShantaBlockType['gallery']
}

const HOVER_DELAY_MS = 1000 // open modal after 1s hover
const HIDE_ANIM_MS = 250 // smooth close duration

export default function GlobalSwiper({ slidesData }: GlobalSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [active, setActive] = useState<'left' | 'right'>('right')

  // modal state
  const [previewIndex, setPreviewIndex] = useState<number | null>(null) // which image
  const [showModal, setShowModal] = useState(false) // controls enter/exit transition

  const swiperRef = useRef<SwiperClass | null>(null)
  const hoverOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // normalize input
  const items = Array.isArray(slidesData) ? slidesData : []
  const hasEnoughForLoop = items.length > 3

  const normalized = useMemo(
    () =>
      items
        .map((slide) => {
          const rel = slide?.image as any
          const url = typeof rel === 'object' && rel?.url ? rel.url : undefined
          const blur = (slide as any)?.imageBlurDataURL as string | undefined
          return { url, blur }
        })
        .filter((s) => !!s.url),
    [items],
  )

  // autoplay helpers
  const stopAutoplay = useCallback(() => {
    try {
      swiperRef.current?.autoplay?.stop()
    } catch {}
  }, [])
  const startAutoplay = useCallback(() => {
    try {
      swiperRef.current?.autoplay?.start()
    } catch {}
  }, [])

  const clearHoverOpenTimer = () => {
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current)
      hoverOpenTimerRef.current = null
    }
  }
  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  // open preview with 1s hover delay
  const openPreviewDelayed = useCallback(
    (i: number) => {
      clearHoverOpenTimer()
      hoverOpenTimerRef.current = setTimeout(() => {
        // mount modal + play enter transition
        setPreviewIndex(i)
        stopAutoplay()
        requestAnimationFrame(() => setShowModal(true))
      }, HOVER_DELAY_MS)
    },
    [stopAutoplay],
  )

  // open immediately (for click)
  const openPreviewNow = useCallback(
    (i: number) => {
      clearHoverOpenTimer()
      setPreviewIndex(i)
      stopAutoplay()
      requestAnimationFrame(() => setShowModal(true))
    },
    [stopAutoplay],
  )

  // close with smooth transition
  const closePreview = useCallback(() => {
    clearHoverOpenTimer()
    clearCloseTimer()
    setShowModal(false)
    // wait for fade-out before unmounting image and resuming autoplay
    closeTimerRef.current = setTimeout(() => {
      setPreviewIndex(null)
      startAutoplay()
    }, HIDE_ANIM_MS)
  }, [startAutoplay])

  // small buffer so accidental tiny mouse leaves don’t flicker
  const closePreviewDelayed = useCallback(
    (ms = 150) => {
      clearCloseTimer()
      closeTimerRef.current = setTimeout(() => {
        closePreview()
      }, ms)
    },
    [closePreview],
  )

  // esc to close
  useEffect(() => {
    if (previewIndex === null) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePreview()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [previewIndex, closePreview])

  // init active index
  useEffect(() => {
    if (swiperRef.current) setActiveIndex(swiperRef.current.realIndex ?? 0)
  }, [])

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearHoverOpenTimer()
      clearCloseTimer()
    }
  }, [])

  if (!normalized.length) return null

  return (
    <div className="w-[95%] max-w-screen-xl mx-auto pt-10">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        onSwiper={(sw) => (swiperRef.current = sw)}
        effect="coverflow"
        centeredSlides
        grabCursor
        loop={hasEnoughForLoop}
        slidesPerView={2.2}
        breakpoints={{
          1024: { slidesPerView: 4 },
        }}
        // spaceBetween={16}
        spaceBetween={20}
        autoplay={{
          delay: sliderDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{ rotate: 16, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
        className="!py-2 h-auto"
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
      >
        {normalized.map((slide, i) => {
          const isActive = i === activeIndex
          return (
            <SwiperSlide key={i} className="!h-auto flex items-center justify-center px-1">
              <div
                className={[
                  'relative w-full max-w-[260px] md:max-w-[300px]',
                  'aspect-[4/5] rounded-2xl overflow-hidden',
                  'shadow-lg ring-1 ring-black/5 bg-neutral-100',
                  'transition-transform duration-300 will-change-transform',
                  isActive ? 'scale-[1.04]' : 'scale-100',
                  'cursor-zoom-in',
                ].join(' ')}
                onMouseEnter={() => openPreviewDelayed(i)} // hover to open (1s)
                onMouseLeave={clearHoverOpenTimer} // cancel if you leave before delay
                onClick={() => openPreviewNow(i)} // click opens immediately
              >
                <Image
                  src={slide.url!}
                  alt="Slide image"
                  fill
                  className="object-cover object-center"
                  {...(slide.blur
                    ? ({ placeholder: 'blur', blurDataURL: slide.blur } as const)
                    : {})}
                  quality={90}
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* controls */}
      <div className="mt-6 flex justify-center gap-2 items-center w-fit mx-auto">
        <button
          aria-label="Previous slide"
          onClick={() => {
            swiperRef.current?.slidePrev()
            setActive('left')
          }}
          className={[
            'transition-all duration-300 flex items-center justify-center rounded-full',
            active === 'left'
              ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5 xl:px-6 h-8'
              : 'bg-white/80 backdrop-blur hover:bg-white text-gray-700 border border-gray-300 w-8 h-8',
          ].join(' ')}
        >
          {active === 'left' ? <BsArrowLeft size={18} /> : <LuArrowLeft size={18} />}
        </button>

        <button
          aria-label="Next slide"
          onClick={() => {
            swiperRef.current?.slideNext()
            setActive('right')
          }}
          className={[
            'transition-all duration-300 flex items-center justify-center rounded-full',
            active === 'right'
              ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5 xl:px-6 h-8'
              : 'bg-white/80 backdrop-blur hover:bg-white text-gray-700 border border-gray-300 w-8 h-8',
          ].join(' ')}
        >
          {active === 'right' ? <BsArrowRight size={18} /> : <LuArrowRight size={18} />}
        </button>
      </div>

      {/* Modal / dialog overlay (16:9, clamps to viewport) */}
      {previewIndex !== null && normalized[previewIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className={[
            'fixed inset-0 z-[60] flex items-center justify-center',
            'bg-black/60 backdrop-blur-sm',
            'transition-opacity duration-300 ease-out',
            showModal ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={closePreview} // outside click closes
          onMouseLeave={() => closePreviewDelayed(150)} // hover out of modal area closes
        >
          <div
            className={[
              'relative w-[92vw] md:w-[72vw] lg:w-[60vw] rounded-2xl overflow-hidden',
              'shadow-2xl ring-1 ring-white/10 bg-black aspect-[16/9]',
              'transition-all duration-300 ease-out',
              showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            ].join(' ')}
            onClick={(e) => e.stopPropagation()} // keep clicks inside from closing
          >
            <Image
              src={normalized[previewIndex].url!}
              alt="Preview"
              fill
              sizes="100vw"
              className="object-contain object-center"
              {...(normalized[previewIndex].blur
                ? ({ placeholder: 'blur', blurDataURL: normalized[previewIndex].blur } as const)
                : {})}
              quality={90}
            />
            <button
              onClick={closePreview}
              className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white text-gray-900 px-3 py-1 text-sm shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
