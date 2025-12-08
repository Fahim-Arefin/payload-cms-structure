// // src/components/custom/career/CareerOpening.tsx
// 'use client'

// import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import CareerOpeningForm from './CareerOpeningForm'

// import { useEffect, useMemo, useState } from 'react'
// import CareerOpeningCard from './CareerOpeningCard'
// import CarouselNavButtons from '../shared/CarousalNavButtons'
// import { JoinOurTeamMobile } from './JoinOurTeamMobile'
// import Autoplay from 'embla-carousel-autoplay'
// import CareerDetailsModal from './CareerDetailsModal'
// import LocalizedText from '../shared/LocalizedText'
// import { CareerPageOpeningBlockType } from '@/types/payloadCustomTypes'
// import { sliderDelay } from '@/lib/data'

// type CareerOpeningDataProps = {
//   openingData: CareerPageOpeningBlockType
// }
// type OpeningDetail = CareerPageOpeningBlockType['cards'][number]['details']

// // type OpeningDetail = {
// //   title?: string
// //   titleBN?: string
// //   responsibilities?: any
// //   responsibilitiesBN?: any
// //   requirements?: any
// //   requirementsBN?: any
// //   location?: string
// //   locationBN?: string
// //   deadline?: string
// //   applyEmail?: string
// //   subjectLine?: string
// //   footer?: string
// //   filename?: string
// // }

// export default function CareerOpening({ openingData }: CareerOpeningDataProps) {
//   const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
//   const [canScrollPrev, setCanScrollPrev] = useState(false)
//   const [canScrollNext, setCanScrollNext] = useState(false)
//   const [pos, setPos] = useState('')

//   const [openDetails, setOpenDetails] = useState<{
//     open: boolean
//     details?: OpeningDetail[]
//   }>({ open: false })

//   // ✅ Normalize details (group or array)
//   const handleViewDetails = (rawDetails?: OpeningDetail | OpeningDetail[] | null) => {
//     if (!rawDetails) return
//     const normalized = Array.isArray(rawDetails) ? rawDetails : [rawDetails]
//     if (!normalized.length) return
//     setOpenDetails({ open: true, details: normalized })
//   }

//   const handleApply = (_type: string, title: string) => {
//     setPos(title)
//   }

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

//   // ✅ Build positions from cards (value + localized labels)
//   const positions = useMemo(() => {
//     const seen = new Set<string>()
//     return (openingData?.cards ?? [])
//       .map((c: any) => {
//         const value = (c?.title ?? '').trim()
//         if (!value) return null
//         if (seen.has(value)) return null
//         seen.add(value)
//         return {
//           value,
//           labelEn: c?.title ?? '',
//           labelBn: c?.titleBN ?? c?.title ?? '',
//         }
//       })
//       .filter(Boolean) as { value: string; labelEn: string; labelBn?: string }[]
//   }, [openingData?.cards])

//   // ✅ Read consent richtext from block.careerOpeningForm
//   const consentEN = (openingData as any)?.careerOpeningForm?.consentText ?? null
//   const consentBN = (openingData as any)?.careerOpeningForm?.consentTextBN ?? null

//   return (
//     <section id="career-opening-section" className="container-padding w-full bg-[#F6EDDD] py-12">
//       <div className="mb-8 lg:mb-10">
//         <div>
//           <span className="block text-[#343434] font-light text-[18px] md:text-[22px] xl:text-[24px]">
//             <LocalizedText en={openingData?.title} bn={openingData?.titleBN} />
//           </span>
//           <span className="block text-[#ED7125] font-bold text-[18px] md:text-[34px] xl:text-[50px] -mt-1">
//             <LocalizedText en={openingData?.subtitle} bn={openingData?.subtitleBN} />
//           </span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
//         {/* Cards */}
//         <div className="flex flex-col items-center w-full self-stretch">
//           {/* Desktop grid */}
//           <div className="hidden md:grid grid-cols-2 gap-4 w-full">
//             {openingData?.cards?.map((card: any, idx: number) => (
//               <CareerOpeningCard
//                 key={idx}
//                 {...card}
//                 onApply={handleApply}
//                 onViewDetails={() => handleViewDetails(card?.details)}
//               />
//             ))}
//           </div>

//           {/* Mobile carousel */}
//           <div className="md:hidden w-full relative mb-8">
//             <Carousel
//               opts={{ align: 'start' }}
//               setApi={setCarouselApi}
//               plugins={[Autoplay({ delay: sliderDelay })]}
//             >
//               <CarouselContent className="flex items-stretch">
//                 {openingData?.cards?.map((card: any, idx: number) => (
//                   <CarouselItem key={idx} className="flex-shrink-0 w-[91vw] max-w-[350px]">
//                     <CareerOpeningCard
//                       {...card}
//                       onApply={handleApply}
//                       onViewDetails={() => handleViewDetails(card?.details)}
//                     />
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>

//               <div className="flex md:hidden gap-2 absolute inset-x-0 justify-center -bottom-16">
//                 <CarouselNavButtons
//                   onPrev={() => carouselApi?.scrollPrev()}
//                   onNext={() => carouselApi?.scrollNext()}
//                   hasPrev={canScrollPrev}
//                   hasNext={canScrollNext}
//                 />
//               </div>
//             </Carousel>
//           </div>

//           {/* Details modal */}
//           <CareerDetailsModal
//             open={openDetails.open}
//             onOpenChange={(o: boolean) =>
//               setOpenDetails((prev) => ({
//                 ...prev,
//                 open: o,
//               }))
//             }
//             details={openDetails.details}
//           />
//         </div>

//         {/* Right: form */}
//         <div className="mt-10 md:mt-0 h-full">
//           <JoinOurTeamMobile />
//           <div className="hidden md:block h-full">
//             <CareerOpeningForm
//               pos={pos}
//               setPos={setPos}
//               positions={positions}
//               consentEN={consentEN}
//               consentBN={consentBN}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// ===========================================================
// ===========================================================
// ===========================================================
// src/components/custom/career/CareerOpening.tsx
'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CareerOpeningForm from './CareerOpeningForm'

import { useEffect, useMemo, useState } from 'react'
import CareerOpeningCard from './CareerOpeningCard'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import { JoinOurTeamMobile } from './JoinOurTeamMobile'
import Autoplay from 'embla-carousel-autoplay'
import CareerDetailsModal from './CareerDetailsModal'
import LocalizedText from '../shared/LocalizedText'
import { CareerPageOpeningBlockType } from '@/types/payloadCustomTypes'
import { sliderDelay } from '@/lib/data'

type CareerOpeningDataProps = {
  openingData: CareerPageOpeningBlockType
}

type OpeningDetail = CareerPageOpeningBlockType['cards'][number]['details']
type OpeningFile = CareerPageOpeningBlockType['cards'][number]['filename']

export default function CareerOpening({ openingData }: CareerOpeningDataProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [pos, setPos] = useState('')

  const [openDetails, setOpenDetails] = useState<{
    open: boolean
    details?: OpeningDetail[]
    file?: OpeningFile
  }>({ open: false })

  // ✅ keep your existing "position" behavior
  const handleApply = (_type: string, title: string) => {
    setPos(title)
  }

  // ✅ open modal + carry file
  const handleViewDetails = (card: CareerPageOpeningBlockType['cards'][number]) => {
    const rawDetails = card?.details
    if (!rawDetails) return

    const normalized = Array.isArray(rawDetails) ? rawDetails : [rawDetails]
    if (!normalized.length) return

    setOpenDetails({ open: true, details: normalized, file: card?.filename })
  }

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

  // ✅ Build positions from cards (value + localized labels)
  const positions = useMemo(() => {
    const seen = new Set<string>()
    return (openingData?.cards ?? [])
      .map((c: any) => {
        const value = (c?.title ?? '').trim()
        if (!value) return null
        if (seen.has(value)) return null
        seen.add(value)
        return {
          value,
          labelEn: c?.title ?? '',
          labelBn: c?.titleBN ?? c?.title ?? '',
        }
      })
      .filter(Boolean) as { value: string; labelEn: string; labelBn?: string }[]
  }, [openingData?.cards])

  // ✅ Read consent richtext from block.careerOpeningForm
  const consentEN = (openingData as any)?.careerOpeningForm?.consentText ?? null
  const consentBN = (openingData as any)?.careerOpeningForm?.consentTextBN ?? null

  return (
    <section id={openingData?.sectionId} className="container-padding w-full bg-[#F6EDDD] py-12">
      <div className="mb-8 lg:mb-10">
        <div>
          <span className="block text-[#343434] font-light text-[18px] md:text-[22px] xl:text-[24px]">
            <LocalizedText en={openingData?.title} bn={openingData?.titleBN} />
          </span>
          <span className="block text-[#ED7125] font-bold text-[18px] md:text-[34px] xl:text-[50px] -mt-1">
            <LocalizedText en={openingData?.subtitle} bn={openingData?.subtitleBN} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Cards */}
        <div className="flex flex-col items-center w-full self-stretch">
          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 w-full">
            {openingData?.cards?.map((card: any, idx: number) => (
              <CareerOpeningCard
                key={idx}
                {...card}
                onApply={handleApply}
                onViewDetails={() => handleViewDetails(card)}
              />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden w-full relative mb-8">
            <Carousel
              opts={{ align: 'start' }}
              setApi={setCarouselApi}
              plugins={[Autoplay({ delay: sliderDelay })]}
            >
              <CarouselContent className="flex items-stretch">
                {openingData?.cards?.map((card: any, idx: number) => (
                  <CarouselItem key={idx} className="flex-shrink-0 w-[91vw] max-w-[350px]">
                    <CareerOpeningCard
                      {...card}
                      onApply={handleApply}
                      onViewDetails={() => handleViewDetails(card)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex md:hidden gap-2 absolute inset-x-0 justify-center -bottom-16">
                <CarouselNavButtons
                  onPrev={() => carouselApi?.scrollPrev()}
                  onNext={() => carouselApi?.scrollNext()}
                  hasPrev={canScrollPrev}
                  hasNext={canScrollNext}
                />
              </div>
            </Carousel>
          </div>

          {/* Details modal */}
          <CareerDetailsModal
            open={openDetails.open}
            onOpenChange={(o: boolean) =>
              setOpenDetails((prev) => ({
                ...prev,
                open: o,
              }))
            }
            details={openDetails.details}
            file={openDetails.file}
          />
        </div>

        {/* Right: form */}
        <div className="mt-10 md:mt-0 h-full">
          <JoinOurTeamMobile />
          <div className="hidden md:block h-full">
            <CareerOpeningForm
              pos={pos}
              setPos={setPos}
              positions={positions}
              consentEN={consentEN}
              consentBN={consentBN}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
