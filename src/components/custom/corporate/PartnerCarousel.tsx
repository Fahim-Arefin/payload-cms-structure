// 'use client'

// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import { sliderDelay } from '@/lib/data'
// import { CorporatePartnersBlockType } from '@/types/payloadCustomTypes'
// import Autoplay from 'embla-carousel-autoplay'
// import { useEffect, useRef, useState } from 'react'
// import CarouselNavButtons from '../shared/CarousalNavButtons'
// import LocalizedHighlighted from '../shared/LocalizedHighlighted'
// import LocalizedText from '../shared/LocalizedText'
// import Image from 'next/image'

// type Props = { data: CorporatePartnersBlockType }

// function PartnerCarousel({ data }: Props) {
//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
//   const [canScrollPrev, setCanScrollPrev] = useState(false)
//   const [canScrollNext, setCanScrollNext] = useState(false)

//   // normal autoplay (e.g., 4000ms). Keep interaction running.
//   const autoplay = useRef(
//     Autoplay({
//       delay: sliderDelay,
//       stopOnInteraction: false,
//       stopOnMouseEnter: false, // we’ll manage hover ourselves
//     }),
//   )

//   // faster-on-hover interval
//   const hoverIntervalRef = useRef<number | null>(null)
//   const FAST_DELAY = 800 // “a bit faster” – tweak as you like

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

//   // cleanup interval on unmount, just in case
//   useEffect(() => {
//     return () => {
//       if (hoverIntervalRef.current) {
//         window.clearInterval(hoverIntervalRef.current)
//         hoverIntervalRef.current = null
//       }
//     }
//   }, [])

//   const handleMouseEnter = () => {
//     // stop normal autoplay and start faster ticking
//     autoplay.current?.stop?.()
//     if (!hoverIntervalRef.current) {
//       hoverIntervalRef.current = window.setInterval(() => {
//         carouselApi?.scrollNext()
//       }, FAST_DELAY)
//     }
//   }

//   const handleMouseLeave = () => {
//     // clear faster ticking and resume normal autoplay
//     if (hoverIntervalRef.current) {
//       window.clearInterval(hoverIntervalRef.current)
//       hoverIntervalRef.current = null
//     }
//     autoplay.current?.play?.()
//   }

//   return (
//     // bg-[#FCF4EB]
//     <section
//       className="container-padding-y w-full
//       px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12"
//       style={{
//         backgroundColor: data?.backgroundColor || '',
//       }}
//     >
//       <h2
//         className="global-h2 font-semibold text-[#3A3A3C] container-padding-x
//        mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12"
//       >
//         {/* <LocalizedHighlighted
//           textEn={`OUR VALUED CLIENTS`}
//           textBn={`আমাদের সম্মানিত ক্লায়েন্টবৃন্দ`}
//           highlightEn={`OUR VALUED`}
//           highlightBn={`আমাদের সম্মানিত`}
//           highlightClassName="text-[#ED7125]"
//         /> */}
//         <LocalizedHighlighted
//           textEn={data?.title}
//           textBn={data?.titleBN}
//           highlightEn={data?.highlightedText}
//           highlightBn={data?.highlightedTextBN}
//         />
//       </h2>

//       {/* Wrap the carousel to capture hover */}
//       <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//         <Carousel
//           opts={{ align: 'start', dragFree: true }}
//           plugins={[autoplay.current]}
//           setApi={setCarouselApi}
//           className="w-full"
//         >
//           <CarouselContent className="gap-12 md:gap-16 lg:gap-20 xl:gap-24 2xl:gap-32">
//             {data?.partners?.map((item, index) => (
//               <CarouselItem
//                 key={index}
//                 className="basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 flex flex-col items-center justify-center space-y-3"
//               >
//                 <div className="relative w-full aspect-[340/250] flex items-center justify-center">
//                   {typeof item?.image === 'object' && item?.image?.url && (
//                     <Image
//                       fill
//                       src={item.image?.url}
//                       alt={item.name}
//                       className="object-cover object-center w-full h-full"
//                       loading={index < 4 ? 'eager' : 'lazy'}
//                       placeholder="blur"
//                       blurDataURL={item?.imageBlurDataURL || ''}
//                       quality={80}
//                     />
//                   )}
//                 </div>
//                 <p className="text-xs font-semibold text-center text-black uppercase">
//                   <LocalizedText en={item?.name} bn={item?.nameBN} />
//                 </p>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           {/* Navigation buttons */}
//           <div className="flex md:hidden gap-2 justify-center mt-6">
//             <CarouselNavButtons
//               onPrev={() => carouselApi?.scrollPrev()}
//               onNext={() => carouselApi?.scrollNext()}
//               hasPrev={canScrollPrev}
//               hasNext={canScrollNext}
//             />
//           </div>
//         </Carousel>
//       </div>
//     </section>
//   )
// }

// export default PartnerCarousel

// ==========================================================================
// ==========================================================================
// ==========================================================================
'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { CorporatePartnersBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useRef, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import Image from 'next/image'

type Props = { data: CorporatePartnersBlockType }

function PartnerCarousel({ data }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // normal autoplay (e.g., 4000ms). Keep interaction running.
  const autoplay = useRef(
    Autoplay({
      delay: sliderDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: false, // we’ll manage hover ourselves
    }),
  )

  // faster-on-hover interval
  const hoverIntervalRef = useRef<number | null>(null)
  const FAST_DELAY = 800 // “a bit faster” – tweak as you like

  useEffect(() => {
    if (!carouselApi) return

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollButtons()
    carouselApi.on('select', updateScrollButtons)

    return () => {
      carouselApi.off('select', updateScrollButtons)
    }
  }, [carouselApi])

  // cleanup interval on unmount, just in case
  useEffect(() => {
    return () => {
      if (hoverIntervalRef.current) {
        window.clearInterval(hoverIntervalRef.current)
        hoverIntervalRef.current = null
      }
    }
  }, [])

  const handleMouseEnter = () => {
    // stop normal autoplay and start faster ticking
    autoplay.current?.stop?.()
    if (!hoverIntervalRef.current) {
      hoverIntervalRef.current = window.setInterval(() => {
        carouselApi?.scrollNext()
      }, FAST_DELAY)
    }
  }

  const handleMouseLeave = () => {
    // clear faster ticking and resume normal autoplay
    if (hoverIntervalRef.current) {
      window.clearInterval(hoverIntervalRef.current)
      hoverIntervalRef.current = null
    }
    autoplay.current?.play?.()
  }

  return (
    // bg-[#FCF4EB]
    <section
      // className="container-padding-y w-full px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12"
      className={`${data?.addHorizontalPadding ? 'container-padding' : 'container-padding-y w-full px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12'} `}
      style={{
        backgroundColor: data?.backgroundColor || '',
      }}
    >
      <h2
        // className="global-h2 font-semibold text-[#3A3A3C] container-padding-x mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12"
        className={`global-h2 font-semibold text-[#3A3A3C] mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12
          ${!data?.addHorizontalPadding && ' container-padding-x '}`}
      >
        <LocalizedHighlighted
          textEn={data?.title}
          textBn={data?.titleBN}
          highlightEn={data?.highlightedText}
          highlightBn={data?.highlightedTextBN}
        />
      </h2>

      {/* Wrap the carousel to capture hover */}
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Carousel
          opts={{ align: 'start', dragFree: true }}
          plugins={[autoplay.current]}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent
            className={`${data?.addHorizontalPadding ? 'gap-2 lg:gap-4' : 'gap-2 lg:gap-16 xl:gap-24 2xl:gap-32'} `}
          >
            {data?.partners?.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 flex flex-col items-center justify-center space-y-3"
              >
                <div className="relative w-full aspect-[340/250] flex items-center justify-center">
                  {typeof item?.image === 'object' && item?.image?.url && (
                    <Image
                      fill
                      src={item.image?.url}
                      alt={item.name}
                      className="object-cover object-center w-full h-full"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      placeholder="blur"
                      blurDataURL={item?.imageBlurDataURL || ''}
                      quality={80}
                    />
                  )}
                </div>
                <p className="text-xs font-semibold text-center text-black uppercase">
                  <LocalizedText en={item?.name} bn={item?.nameBN} />
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <div className="flex md:hidden gap-2 justify-center mt-6">
            <CarouselNavButtons
              onPrev={() => carouselApi?.scrollPrev()}
              onNext={() => carouselApi?.scrollNext()}
              hasPrev={canScrollPrev}
              hasNext={canScrollNext}
            />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default PartnerCarousel
