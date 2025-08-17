// 'use client'

// import React, { useRef, useState, useEffect } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { EffectCoverflow } from 'swiper/modules'
// import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
// import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
// import { LiaArrowRightSolid } from 'react-icons/lia'
// import 'swiper/css'
// import 'swiper/css/effect-coverflow'
// import './slider.css'

// type SlideData = {
//   src: string
//   alt: string
// }

// type GlobalSwiperProps = {
//   slidesData: SlideData[]
// }

// export default function GlobalSwiper({ slidesData }: GlobalSwiperProps) {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [active, setActive] = useState<'left' | 'right'>('right')

//   const swiperRef = useRef<any>(null)
//   const handleSlideChange = () => {
//     if (!swiperRef.current) return
//     const swiper = swiperRef.current.swiper
//     const start = swiper.activeIndex
//   }

//   useEffect(() => {
//     handleSlideChange()
//   }, [])

//   return (
//     <div className="w-full max-w-screen-xl mx-auto py-10">
//       <Swiper
//         modules={[EffectCoverflow]}
//         effect="coverflow"
//         centeredSlides
//         // loop
//         loop={slidesData.length > 6}
//         ref={swiperRef}
//         breakpoints={{
//           0: {
//             slidesPerView: 2, // Mobile: 1 and half slides
//           },
//           568: {
//             slidesPerView: 2.7, // Tablet: 3 slides
//           },
//           1024: {
//             slidesPerView: 3.9, // Desktop: 5 slides
//           },
//         }}
//         spaceBetween={10}
//         coverflowEffect={{
//           rotate: 35,
//           stretch: 0,
//           depth: 160,
//           slideShadows: false,
//         }}
//         className="!py-2 gap-4 h-[20rem] md:h-auto"
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//       >
//         {slidesData.map((slide, i) => {
//           const isActive =
//             i === activeIndex || (i === 0 && activeIndex === 10) || (i === 9 && activeIndex === -1)
//           const verticalClass = isActive ? 'bottom-0' : 'bottom-11'

//           return (
//             <SwiperSlide key={i} className={`flex items-center ${verticalClass} justify-center`}>
//               <div
//                 className={`relative w-60 h-[18rem] md:h-[24rem] overflow-hidden shadow-md rounded-[16px]`}
//               >
//                 <img src={slide.src} alt={slide.alt} className="object-cover" />
//               </div>
//             </SwiperSlide>
//           )
//         })}
//       </Swiper>

//       <div className="flex justify-center gap-1 items-center">
//         {/* Left (Back) Button */}
//         <button
//           onClick={() => swiperRef.current?.swiper.slidePrev()}
//           className="w-8 h-8 rounded-full border border-gray-400 bg-transparent text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
//         >
//           <LuArrowLeft size={20} />
//           {/* <BsArrowLeft size={20} /> */}
//         </button>

//         {/* Right (Next) Button */}
//         <button
//           onClick={() => swiperRef.current?.swiper.slideNext()}
//           className="px-6 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
//         >
//           <BsArrowRight size={20} />
//           {/* <LuArrowRight size={20} /> */}
//         </button>
//       </div>
//     </div>
//   )
// }
'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay } from 'swiper/modules'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { LiaArrowRightSolid } from 'react-icons/lia'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import './slider.css'
import { sliderDelay } from '@/lib/data'
import Image from 'next/image'

type SlideData = {
  src: string
  mobileSrc?: string
  alt: string
}

type GlobalSwiperProps = {
  slidesData: SlideData[]
}

export default function GlobalSwiper({ slidesData }: GlobalSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [active, setActive] = useState<'left' | 'right'>('right')

  const swiperRef = useRef<any>(null)
  const handleSlideChange = () => {
    if (!swiperRef.current) return
    const swiper = swiperRef.current.swiper
    const start = swiper.activeIndex
  }

  useEffect(() => {
    handleSlideChange()
  }, [])

  return (
    <div className="w-full max-w-screen-xl mx-auto py-10">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        centeredSlides
        // loop
        loop={slidesData.length > 6}
        ref={swiperRef}
        breakpoints={{
          0: {
            slidesPerView: 2, // Mobile: 1 and half slides
          },
          568: {
            slidesPerView: 2.7, // Tablet: 3 slides
          },
          1024: {
            slidesPerView: 3.9, // Desktop: 5 slides
          },
        }}
        spaceBetween={10}
        autoplay={{
          delay: sliderDelay,
          disableOnInteraction: false, // keep autoplay after user swipes/clicks
          pauseOnMouseEnter: true, // pause on hover (desktop)
        }}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 160,
          slideShadows: false,
        }}
        className="!py-2 gap-4 h-[20rem] md:h-auto"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slidesData.map((slide, i) => {
          const isActive =
            i === activeIndex || (i === 0 && activeIndex === 10) || (i === 9 && activeIndex === -1)
          const verticalClass = isActive ? 'bottom-0' : 'bottom-11'

          return (
            <SwiperSlide key={i} className={`flex items-center ${verticalClass} justify-center`}>
              <div
                className={`relative w-60 h-[18rem] md:h-[24rem] overflow-hidden shadow-md rounded-[16px]`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  className="object-cover"
                  fill
                  sizes="500px"
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className="flex justify-center gap-1 items-center w-fit mx-auto">
        {/* Left (Back) Button */}
        <button
          onClick={() => {
            swiperRef.current?.swiper.slidePrev()
            setActive('left')
          }}
          className={`transition-all duration-300 flex items-center justify-center rounded-full
          ${active === 'left' ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5 xl:px-6 h-6 lg:h-7 xl:h-8' : 'bg-transparent hover:bg-white/70 text-gray-700 border border-gray-400 w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8'}
        `}
        >
          {active === 'left' ? <BsArrowLeft size={20} /> : <LuArrowLeft size={20} />}
        </button>

        {/* Right (Next) Button */}
        <button
          onClick={() => {
            swiperRef.current?.swiper.slideNext()
            setActive('right')
          }}
          className={`transition-all duration-300 flex items-center justify-center rounded-full
          ${active === 'right' ? 'bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-5 xl:px-6 h-6 lg:h-7 xl:h-8' : 'bg-transparent hover:bg-white/70 text-gray-700 border border-gray-400 w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8'}
        `}
        >
          {active === 'right' ? <BsArrowRight size={20} /> : <LuArrowRight size={20} />}
        </button>
      </div>
    </div>
  )
}
