// 'use client'

// import React, { useEffect, useState, useCallback } from 'react'
// import useEmblaCarousel from 'embla-carousel-react'
// import FootPrintCard from '../about-us/FootPrintCard'
// import OnboardingCard from './OnboardingCard'

// type wayWeAreData = {
//   image: string
//   title: string
//   description: string
// }

// type Props = {
//   wayWeAreData: wayWeAreData[]
// }

// export function WayWeAreSlider({ wayWeAreData }: Props) {
//   //   const [emblaRef, emblaApi] = useEmblaCarousel({
//   //     align: 'center',
//   //     loop: false,
//   //     slidesToScroll: 1,
//   //   })
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     align: 'center',
//     loop: false,
//     containScroll: 'trimSnaps',
//     // slidesToScroll: 1,
//   })

//   const [selectedIndex, setSelectedIndex] = useState(1)

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return
//     const index = emblaApi.selectedScrollSnap()
//     setSelectedIndex(index)
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

//   //   🔁 Trigger re-check of layout after card size changes
//   useEffect(() => {
//     if (!emblaApi) return
//     emblaApi.reInit()
//   }, [selectedIndex, emblaApi])

//   return (
//     <div className="relative">
//       <div className="overflow-hidden px-[10vw]" ref={emblaRef}>
//         <div className="flex gap-x-6 transition-transform duration-500 ease-in-out will-change-transform">
//           {wayWeAreData.map((data, index) => (
//             <div
//               key={index}
//               className={`
//                 flex-shrink-0 transition-all duration-500 ease-in-out
//                 ${
//                   index === selectedIndex
//                     ? 'basis-[200px] md:basis-[350px] xl:basis-[600px] 2xl:basis-[800px]'
//                     : 'basis-[120px] md:basis-[180px] xl:basis-[320px] 2xl:basis-[480px]'
//                 }
//               `}
//             >
//               <OnboardingCard data={data} isActive={index === selectedIndex} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Controls */}
//       {/* <div
//         //   className="absolute top-0 flex justify-center gap-4 mt-6 bg-red-300">
//         className="flex gap-4 absolute z-20
//              inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-10 xl:-top-12 lg:right-24"
//       >
//         <button
//           onClick={() => emblaApi?.scrollPrev()}
//           //   className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 h-fit"
//           className="w-6 xl:w-8
//           h-6 xl:h-8
//           rounded-full border border-gray-400 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
//         >
//           ←
//         </button>
//         <button
//           onClick={() => emblaApi?.scrollNext()}
//           //   className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 h-fit"
//           className="
//           px-6 xl:px-8
//           h-6 xl:h-8
//           rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
//         >
//           →
//         </button>
//       </div> */}
//     </div>
//   )
// }
'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { MoreThanAWorkplaceBlockType } from '@/types/payloadCustomTypes'
import { useEffect, useRef, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import OnboardingCard from './OnboardingCard'

type Props = {
  wayWeAreData: MoreThanAWorkplaceBlockType['gallery']
}

function WayWeAreSlider({ wayWeAreData }: Props) {
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
      // className="w-[95%] inset-x-0 mx-auto z-30 absolute top-[40%]"
      className="w-[95%] inset-x-0 mx-auto z-30 absolute bottom-0"
      setApi={setCarouselApi} // Capture carousel API
      onMouseEnter={() => setIsHovering(true)} // Stop autoplay when mouse enters
      onMouseLeave={() => setIsHovering(false)} // Start autoplay when mouse leaves
    >
      <CarouselContent className=" mx-0">
        {wayWeAreData?.map((data, index) => (
          <CarouselItem
            key={index}
            // border border-black
            className="basis-1/3 md:basis-1/3 lg:basis-1/3 pl-0 flex items-end 
             h-[110px] md:h-[230px] lg:h-[300px] xl:h-[400px] 2xl:h-[480px]"
          >
            <OnboardingCard data={data} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className="flex gap-2 absolute h-fit
                  inset-x-0 justify-center -bottom-[40px] lg:-bottom-[40px] xl:-bottom-[50px] 2xl:-bottom-[60px]"
      >
        <CarouselNavButtons
          onPrev={() => carouselApi?.scrollPrev()}
          onNext={() => carouselApi?.scrollNext()}
          hasPrev={canScrollPrev}
          hasNext={canScrollNext}
        />
      </div>
    </Carousel>
  )
}

export default WayWeAreSlider
