// 'use client'

// import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
// import { sliderDelay } from '@/lib/data'
// import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
// import Autoplay from 'embla-carousel-autoplay'
// import { useEffect, useState } from 'react'
// import BasicHeroItem from './BasicHeroItem'

// // ✅ any icons you want (lucide examples)
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// type Props = {
//   block: BasicHeroBlockType
// }

// function BasicHeroSection({ block }: Props) {
//   const [api, setApi] = useState<CarouselApi>()
//   const [current, setCurrent] = useState(0)
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     if (!api) return
//     setCount(api.scrollSnapList().length)
//     setCurrent(api.selectedScrollSnap() + 1)
//     api.on('select', () => setCurrent(api.selectedScrollSnap() + 1))
//   }, [api])

//   return (
//     <div className="">
//       <Carousel
//         setApi={setApi}
//         opts={{ align: 'start', loop: true }}
//         plugins={[Autoplay({ delay: sliderDelay })]}
//         className="relative w-full"
//       >
//         <CarouselContent>
//           {block?.heroes?.map((item, index) => (
//             <CarouselItem key={index}>
//               <BasicHeroItem item={item} />
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Custom Navigation */}
//         {block?.heroes?.length > 1 && (
//           <div className="hidden lg:flex absolute top-1/2 inset-x-0 -translate-y-1/2 justify-between z-30 2xl:px-12">
//             <button
//               type="button"
//               aria-label="Previous slide"
//               onClick={() => api?.scrollPrev()}
//               className="w-9 h-9 border border-white rounded-[2px] bg-transparent text-white hover:bg-white/30 transition-colors flex items-center justify-center"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>

//             <button
//               type="button"
//               aria-label="Next slide"
//               onClick={() => api?.scrollNext()}
//               className="w-9 h-9 border border-white rounded-[2px] bg-transparent text-white hover:bg-white/30 transition-colors flex items-center justify-center"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </Carousel>

//       <div className="text-muted-foreground py-2 text-center text-sm">
//         Slide {current} of {count}
//       </div>
//     </div>
//   )
// }

// export default BasicHeroSection

// ==============================================================================
// ==============================================================================
// ==============================================================================

'use client'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useMemo, useState } from 'react'
import BasicHeroItem from './BasicHeroItem'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  block: BasicHeroBlockType
}

function BasicHeroSection({ block }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [count, setCount] = useState(0)

  const hasMultiple = (block?.heroes?.length ?? 0) > 1

  // keep autoplay instance stable (prevents re-init)
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: sliderDelay,
        stopOnInteraction: true,
      }),
    [],
  )

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setActiveIndex(api.selectedScrollSnap())

    const onSelect = () => setActiveIndex(api.selectedScrollSnap())
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="">
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: true }}
        plugins={[autoplay]}
        className="relative w-full"
      >
        <CarouselContent>
          {block?.heroes?.map((item, index) => (
            <CarouselItem key={index}>
              <BasicHeroItem item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation (always visible like you asked) */}
        {hasMultiple && (
          <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 flex justify-between z-30 px-4 lg:px-8 2xl:px-12">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="w-9 h-9 border border-white rounded-[2px] bg-transparent text-white hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="w-9 h-9 border border-white rounded-[2px] bg-transparent text-white hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* ✅ Pagination bars (like screenshot) */}
        {hasMultiple && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-3">
              {Array.from({ length: count || block.heroes.length }).map((_, idx) => {
                const isActive = idx === activeIndex

                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => api?.scrollTo(idx)}
                    className={[
                      'relative h-[6px] rounded-full transition-all duration-500 ease-out',
                      // width animation
                      isActive ? 'w-[140px]' : 'w-[26px]',
                      // color + visibility
                      isActive ? 'bg-[#2FC6C6]' : 'bg-[#2FC6C6]/40 hover:bg-[#2FC6C6]/70',
                    ].join(' ')}
                  >
                    {/* optional "cap" dot like the left tiny dot in screenshot */}
                    {/* {isActive && (
                      <span className="absolute -left-[10px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-[#2FC6C6]" />
                    )} */}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </Carousel>

      {/* optional debug text - remove if not needed */}
      {/* <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {activeIndex + 1} of {count}
      </div> */}
    </div>
  )
}

export default BasicHeroSection
