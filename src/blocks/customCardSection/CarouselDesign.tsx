// 'use client'
// import CarouselNavButtons from '@/components/custom/shared/CarousalNavButtons'
// import CorporateCardItem from '@/components/custom/shared/plans/CorporateCardItem'
// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import { sliderDelay } from '@/lib/data'
// import { CustomCardSectionBlockType } from '@/types/payloadCustomTypes'
// import { useEffect, useState } from 'react'

// type Props = {
//   block: CustomCardSectionBlockType
//   data: CustomCardSectionBlockType['card'][number]
// }

// function CarouselDesign({ data }: Props) {
//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
//   const [canScrollPrev, setCanScrollPrev] = useState(false)
//   const [canScrollNext, setCanScrollNext] = useState(false)
//   const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

//   // autoplay with hover pause
//   useEffect(() => {
//     if (!carouselApi) return
//     if (hoveredIdx !== null) return
//     const id = setInterval(() => {
//       if (carouselApi.canScrollNext()) carouselApi.scrollNext()
//       else carouselApi.scrollTo(0)
//     }, sliderDelay)
//     return () => clearInterval(id)
//   }, [carouselApi, hoveredIdx])

//   // prev/next button enablement
//   useEffect(() => {
//     if (!carouselApi) return
//     const update = () => {
//       setCanScrollPrev(carouselApi.canScrollPrev())
//       setCanScrollNext(carouselApi.canScrollNext())
//     }
//     update()
//     carouselApi.on('select', update)
//     return () => {
//       carouselApi.off('select', update)
//     }
//   }, [carouselApi])

//   return (
//     <Carousel
//       className="w-full"
//       setApi={setCarouselApi}
//       // 🔧 Key options to fully snap one item at a time
//       opts={{
//         align: 'start',
//         loop: false,
//         dragFree: true,
//         containScroll: 'trimSnaps',
//         slidesToScroll: 1,
//       }}
//     >
//       {/* Make gap via padding on slides; match with negative margin here */}
//       <CarouselContent className="-ml-4">
//         {data?.cards?.map((item, index) => (
//           <CarouselItem
//             key={index}
//             // padding creates the visual gap; negative margin above compensates
//             className="pl-4 shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
//             onMouseEnter={() => setHoveredIdx(index)}
//             onMouseLeave={() => setHoveredIdx(null)}
//           >
//             <CorporateCardItem data={item} />
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       {/* Navigation buttons (mobile) */}
//       <div className="flex md:hidden gap-2 justify-center mt-6">
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

// export default CarouselDesign

// ===========================================
// ===========================================
// ===========================================
'use client'

import { useEffect, useState } from 'react'
import CarouselNavButtons from '@/components/custom/shared/CarousalNavButtons'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { CustomCardSectionBlockType } from '@/types/payloadCustomTypes'

// type ItemOf<T> = T extends { corporateCards: infer A extends any[] }
//   ? A[number]
//   : T extends { planCards: infer B extends any[] }
//     ? B[number]
//     : T extends { offerCards: infer C extends any[] }
//       ? C[number]
//       : never

// add this arm to the conditional
type ItemOf<T> = T extends { corporateCards: infer A extends any[] }
  ? A[number]
  : T extends { planCards: infer B extends any[] }
    ? B[number]
    : T extends { offerCards: infer C extends any[] }
      ? C[number]
      : T extends { hashLinkCards: infer D extends any[] } // ⬅️ add
        ? D[number]
        : never

type Props<T extends CustomCardSectionBlockType['card'][number]> = {
  block: CustomCardSectionBlockType
  data: T
  renderItem: (item: ItemOf<T>, index: number) => React.ReactNode
}

const toBasis = (n?: number) => {
  switch (n) {
    case 1:
      return 'basis-full'
    case 2:
      return 'basis-1/2'
    case 3:
      return 'basis-1/3'
    case 4:
      return 'basis-1/4'
    default:
      return 'basis-1/2'
  }
}

// export default function CarouselDesign({ block, data, renderItem }: Props) {
export default function CarouselDesign<T extends CustomCardSectionBlockType['card'][number]>({
  block,
  data,
  renderItem,
}: Props<T>) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const mobileBasis = toBasis(block?.mobileCardsPerView ?? 1)
  const tabletBasis = toBasis(block?.tabletCardsPerView ?? 2)
  const laptopBasis = toBasis(block?.laptopCardsPerView ?? 3)
  const desktopBasis = toBasis(block?.desktopCardsPerView ?? 3)

  // const items = (
  //   'corporateCards' in data
  //     ? data.corporateCards
  //     : 'planCards' in data
  //       ? data.planCards
  //       : 'offerCards' in data
  //         ? data.offerCards
  //         : []
  // ) as ItemOf<T>[]

  // pick the array from the union, now including hashLinkCards
  const items = (
    'corporateCards' in data
      ? data.corporateCards
      : 'planCards' in data
        ? data.planCards
        : 'offerCards' in data
          ? data.offerCards
          : 'hashLinkCards' in data // ⬅️ add
            ? data.hashLinkCards
            : []
  ) as ItemOf<T>[]

  useEffect(() => {
    if (!carouselApi) return
    if (hoveredIdx !== null) return
    const id = setInterval(() => {
      if (carouselApi.canScrollNext()) carouselApi.scrollNext()
      else carouselApi.scrollTo(0)
    }, sliderDelay)
    return () => clearInterval(id)
  }, [carouselApi, hoveredIdx])

  useEffect(() => {
    if (!carouselApi) return
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }
    update()
    carouselApi.on('select', update)
    return () => {
      carouselApi.off('select', update)
    }
  }, [carouselApi])

  return (
    <Carousel
      className={`${!block?.addHorizontalPadding && `container-padding-b px-5 md:px-12 lg:px-[64px]`} w-full`}
      setApi={setCarouselApi}
      opts={{
        align: 'start',
        loop: false,
        dragFree: false,
        containScroll: 'trimSnaps',
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="-ml-4">
        {items?.map((item, index) => (
          <CarouselItem
            key={index}
            className={`pl-4 shrink-0 ${mobileBasis} md:${tabletBasis} lg:${laptopBasis} xl:${desktopBasis}`}
            onMouseEnter={() => setHoveredIdx(index)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex md:hidden gap-2 justify-center mt-6">
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
