// 'use client'

// import React, { useEffect, useState, useCallback } from 'react'
// import useEmblaCarousel from 'embla-carousel-react'
// import FootPrintCard from './FootPrintCard'
// import { FootPrintDataType } from '@/types'
// import CarouselNavButtons from '../shared/CarousalNavButtons'

// type Props = {
//   footPrintData: FootPrintDataType[]
// }

// export function FootPrintSlider({ footPrintData }: Props) {
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     align: 'center',
//     loop: false,
//     containScroll: 'trimSnaps',
//   })

//   const [selectedIndex, setSelectedIndex] = useState(1)
//   const [canScrollPrev, setCanScrollPrev] = useState(false)
//   const [canScrollNext, setCanScrollNext] = useState(false)
//   const [active, setActive] = useState<'left' | 'right'>('right')

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return
//     setSelectedIndex(emblaApi.selectedScrollSnap())
//     setCanScrollPrev(emblaApi.canScrollPrev())
//     setCanScrollNext(emblaApi.canScrollNext())
//   }, [emblaApi])

//   useEffect(() => {
//     if (!emblaApi) return

//     const scrollToInitial = () => {
//       emblaApi.scrollTo(1)
//       emblaApi.on('select', onSelect)
//       onSelect()
//     }

//     requestAnimationFrame(() => {
//       setTimeout(scrollToInitial, 0)
//     })
//   }, [emblaApi, onSelect])

//   useEffect(() => {
//     if (!emblaApi) return
//     emblaApi.reInit()
//   }, [selectedIndex, emblaApi])

//   return (
//     <div className="relative">
//       <div className="overflow-hidden px-[10vw]" ref={emblaRef}>
//         <div className="flex gap-x-4 transition-transform duration-150 ease-in-out will-change-transform">
//           {footPrintData.map((data, index) => (
//             <div
//               key={index}
//               className={`flex-shrink-0 transition-all duration-150 ease-in-out bg-red-200
//                 ${
//                   index === selectedIndex
//                     ? 'basis-[200px] md:basis-[350px] xl:basis-[600px] 2xl:basis-[666px]'
//                     : 'basis-[120px] md:basis-[180px] xl:basis-[320px] 2xl:basis-[380px]'
//                 }
//               `}
//             >
//               <FootPrintCard data={data} isActive={index === selectedIndex} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ✅ Reusable Navigation Buttons */}
//       <div
//         className="flex gap-4 absolute z-20
//              inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-10 xl:-top-12 lg:right-24"
//       >
//         <CarouselNavButtons
//           onPrev={() => {
//             emblaApi?.scrollPrev()
//             setActive('left')
//           }}
//           onNext={() => {
//             emblaApi?.scrollNext()
//             setActive('right')
//           }}
//           hasPrev={canScrollPrev}
//           hasNext={canScrollNext}
//           defaultActive={active}
//         />
//       </div>
//     </div>
//   )
// }

// // v1
// 'use client'

// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import { FootPrintDataType } from '@/types'
// import { useEffect, useState } from 'react'
// import CarouselNavButtons from '../shared/CarousalNavButtons'
// import FootPrintCard from './FootPrintCard'
// import Autoplay from 'embla-carousel-autoplay'
// type Props = {
//   footPrintData: FootPrintDataType[]
// }

// export function FootPrintSlider({ footPrintData }: Props) {
//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
//   const [canScrollPrev, setCanScrollPrev] = useState(false)
//   const [canScrollNext, setCanScrollNext] = useState(false)

//   useEffect(() => {
//     if (!carouselApi) return

//     const updateScrollButtons = () => {
//       setCanScrollPrev(carouselApi.canScrollPrev())
//       setCanScrollNext(carouselApi.canScrollNext())
//     }

//     updateScrollButtons()
//     carouselApi.on('select', updateScrollButtons)

//     return () => {
//       carouselApi.off('select', updateScrollButtons)
//     }
//   }, [carouselApi])

//   return (
//     <Carousel
//       opts={{
//         align: 'start',
//       }}
//       plugins={[
//         Autoplay({
//           delay: 5000,
//         }),
//       ]}
//       className="w-[95%] mx-auto z-30"
//       setApi={setCarouselApi} // 👈 capture carousel API
//     >
//       <CarouselContent className="">
//         {footPrintData?.map((data, index) => (
//           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 ">
//             <FootPrintCard data={data} />
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <div
//         className="flex gap-2 absolute h-fit
//                   inset-x-0 justify-center lg:justify-end -bottom-14 md:-bottom-14 lg:-top-10 xl:-top-12 2xl:-top-16 lg:right-0"
//       >
//         <CarouselNavButtons
//           onPrev={() => carouselApi?.scrollPrev()}
//           onNext={() => carouselApi?.scrollNext()}
//           hasPrev={canScrollPrev}
//           hasNext={canScrollNext}
//         />
//       </div>
//     </Carousel>
//   )
// }

// v1 modifing

// 'use client'

// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import { FootPrintDataType } from '@/types'
// import { useEffect, useState } from 'react'
// import CarouselNavButtons from '../shared/CarousalNavButtons'
// import FootPrintCard from './FootPrintCard'
// import Autoplay from 'embla-carousel-autoplay'

// type Props = {
//   footPrintData: FootPrintDataType[]
// }

// export function FootPrintSlider({ footPrintData }: Props) {
//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
//   const [canScrollPrev, setCanScrollPrev] = useState(false)
//   const [canScrollNext, setCanScrollNext] = useState(false)
//   const [isHovering, setIsHovering] = useState(false)

//   console.log(isHovering)

//   useEffect(() => {
//     if (!carouselApi) return

//     const updateScrollButtons = () => {
//       setCanScrollPrev(carouselApi.canScrollPrev())
//       setCanScrollNext(carouselApi.canScrollNext())
//     }

//     updateScrollButtons()
//     carouselApi.on('select', updateScrollButtons)

//     return () => {
//       carouselApi.off('select', updateScrollButtons)
//     }
//   }, [carouselApi])

//   // Autoplay options
//   const autoplayOptions = {
//     delay: 5000,
//     stopOnHover: isHovering, // Stop autoplay on hover
//   }

//   return (
//     <Carousel
//       opts={{
//         align: 'start',
//       }}
//       plugins={[
//         Autoplay(autoplayOptions), // Dynamically changing autoplay options
//       ]}
//       className="w-[95%] inset-x-0 mx-auto z-30 absolute 2xl:top-[40%]"
//       setApi={setCarouselApi} // 👈 capture carousel API
//       onMouseEnter={() => setIsHovering(true)} // Stop autoplay when mouse enters
//       onMouseLeave={() => setIsHovering(false)} // Start autoplay again when mouse leaves
//     >
//       <CarouselContent className=" mx-0">
//         {footPrintData?.map((data, index) => (
//           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-0">
//             <FootPrintCard data={data} />
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <div
//         className="flex gap-2 absolute h-fit
//                   inset-x-0 justify-center lg:justify-end -bottom-14 md:-bottom-14 lg:-top-10 xl:-top-12 2xl:-top-16 lg:right-0"
//       >
//         <CarouselNavButtons
//           onPrev={() => carouselApi?.scrollPrev()}
//           onNext={() => carouselApi?.scrollNext()}
//           hasPrev={canScrollPrev}
//           hasNext={canScrollNext}
//         />
//       </div>
//     </Carousel>
//   )
// }

// below code is working fine
'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { FootPrintDataType } from '@/types'
import { useEffect, useState, useRef } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import FootPrintCard from './FootPrintCard'
import { sliderDelay } from '@/lib/data'

type Props = {
  footPrintData: FootPrintDataType[]
}

export function FootPrintSlider({ footPrintData }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const autoplayInterval = useRef<NodeJS.Timeout | null>(null) // Store the autoplay interval

  // Autoplay function to move to the next slide every 5 seconds
  const autoplay = () => {
    if (carouselApi && !isHovering) {
      autoplayInterval.current = setInterval(() => {
        if (carouselApi.canScrollNext()) {
          carouselApi.scrollNext() // Move to the next slide
        } else {
          carouselApi.scrollTo(0) // Reset to the first slide
        }
      }, sliderDelay) // Change slide every 5 seconds
    }
  }

  useEffect(() => {
    if (!carouselApi) return

    // Start autoplay when the component mounts
    autoplay()

    // Set up scroll buttons
    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollButtons()
    carouselApi.on('select', updateScrollButtons)

    // Cleanup autoplay on unmount
    return () => {
      carouselApi.off('select', updateScrollButtons)
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current) // Clean up autoplay interval
      }
    }
  }, [carouselApi])

  useEffect(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current) // Clear previous interval if the hover state changes
    }

    if (!isHovering && carouselApi) {
      autoplay() // Start autoplay when the hover ends
    }
  }, [isHovering, carouselApi]) // Restart autoplay when hover state changes

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-[95%] inset-x-0 mx-auto z-30 absolute top-[40%]"
      setApi={setCarouselApi} // Capture carousel API
      onMouseEnter={() => setIsHovering(true)} // Stop autoplay when mouse enters
      onMouseLeave={() => setIsHovering(false)} // Start autoplay when mouse leaves
    >
      <CarouselContent className=" mx-0">
        {footPrintData?.map((data, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/4 pl-0 "
          >
            <FootPrintCard data={data} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className="flex gap-2 absolute h-fit
                  inset-x-0 justify-center lg:justify-end -top-11 md:-top-11 lg:-top-11 xl:-top-12 2xl:-top-16 lg:right-0"
      >
        <CarouselNavButtons
          color="#FFFF"
          onPrev={() => carouselApi?.scrollPrev()}
          onNext={() => carouselApi?.scrollNext()}
          hasPrev={canScrollPrev}
          hasNext={canScrollNext}
        />
      </div>
    </Carousel>
  )
}
