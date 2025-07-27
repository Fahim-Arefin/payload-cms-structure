// 'use client'

// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import { OfferDataType } from '@/types'
// import { useEffect, useState } from 'react'
// import CarouselNavButtons from '../CarousalNavButtons'
// import OfferCard from './OfferCard'

// type Props = {
//   data: OfferDataType[]
//   subheading?: string
// }

// function Offers({ data, subheading }: Props) {
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
//     <div
//       className="container-padding min-h-[410px] md:min-h-[550px]
//     space-y-6 md:space-y-12 lg:space-y-20 xl:space-y-24 bg-[#F6EDDD]
//     "
//     >
//       {/* heading */}
//       <div className="space-y-4">
//         <div className="flex space-x-2">
//           <h3 className="global-h1 uppercase font-medium text-[#434343]">We </h3>
//           <h3 className="global-h1 uppercase font-medium text-[#ED7125]">Offer</h3>
//         </div>
//         {subheading && <div className="global-p1 text-[#434343]">{subheading}</div>}
//       </div>
//       {/* carousal */}
//       <Carousel className="w-full" setApi={setCarouselApi}>
//         <CarouselContent className="-ml-1">
//           {data?.map((item, index) => (
//             <CarouselItem
//               key={index}
//               className="pl-1
//                basis-1/2 md:basis-1/3 lg:basis-1/4
//               pr-1 lg:pr-2 xl:pr-6 2xl::pr-10"
//             >
//               <OfferCard data={item} />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         {/* Carousel Navigation */}
//         <div
//           className="flex gap-2 absolute h-fit
//             inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-8 xl:-top-10 2xl:-top-12 lg:right-0"
//         >
//           <CarouselNavButtons
//             onPrev={() => carouselApi?.scrollPrev()}
//             onNext={() => carouselApi?.scrollNext()}
//             hasPrev={canScrollPrev}
//             hasNext={canScrollNext}
//           />
//         </div>
//       </Carousel>
//     </div>
//   )
// }

// export default Offers

// components/Offers.tsx

'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../CarousalNavButtons'
import Autoplay from 'embla-carousel-autoplay'

type Props<T> = {
  data: T[]
  subheading?: string
  cardComponent: React.ComponentType<{ data: T }>
}

function Offers<T>({ data, subheading, cardComponent: CardComponent }: Props<T>) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

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

  return (
    <div
      className="px-5 py-12 
           md:p-24 
           lg:px-[100px]  lg:py-[100px] 
           xl:px-[200px]  xl:py-[100px] 
           2xl:px-[300px] 2xl:py-[150px] min-h-[440px] md:min-h-[550px] space-y-6 md:space-y-12 lg:space-y-20 xl:space-y-24 bg-[#F6EDDD]"
    >
      <div className="space-y-4">
        <div className="flex space-x-2">
          <h3 className="global-h1 uppercase font-medium text-[#434343]">We</h3>
          <h3 className="global-h1 uppercase font-medium text-[#ED7125]">Offer</h3>
        </div>
        {subheading && <div className="global-p1 text-[#434343]">{subheading}</div>}
      </div>
      <Carousel
        className="w-full"
        setApi={setCarouselApi}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4 pr-1 lg:pr-2 xl:pr-6 2xl::pr-10"
            >
              <CardComponent data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div
          className="flex gap-2 absolute h-fit inset-x-0 justify-center lg:justify-end 
        -bottom-12 md:-bottom-12 lg:-top-10 xl:-top-12 2xl:-top-14 lg:right-0 "
        >
          <CarouselNavButtons
            onPrev={() => carouselApi?.scrollPrev()}
            onNext={() => carouselApi?.scrollNext()}
            hasPrev={canScrollPrev}
            hasNext={canScrollNext}
          />
        </div>
      </Carousel>
    </div>
  )
}

export default Offers
