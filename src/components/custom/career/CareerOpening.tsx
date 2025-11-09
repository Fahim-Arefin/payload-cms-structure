'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CareerOpeningForm from './CareerOpeningForm'

import { useEffect, useState } from 'react'
import CareerOpeningCard from './CareerOpeningCard'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import { JoinOurTeamMobile } from './JoinOurTeamMobile'
import Autoplay from 'embla-carousel-autoplay'
import CareerDetailsModal from './CareerDetailsModal'
import LocalizedText from '../shared/LocalizedText'
import { CareerPageOpeningBlockType } from '@/types/payloadCustomTypes'

type CareerOpeningDataProps = {
  openingData: CareerPageOpeningBlockType
}

// shape of a single detail entry inside a card (matches your schema)
type OpeningDetail = {
  title?: string
  responsibilities?: any // Payload RichText JSON
  requirements?: any // Payload RichText JSON
  location?: string
  deadline?: string
  applyEmail?: string
  subjectLine?: string
  footer?: string
  filename?: string
}

export default function CareerOpening({ openingData }: CareerOpeningDataProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [pos, setPos] = useState('')

  const [openDetails, setOpenDetails] = useState<{
    open: boolean
    details?: OpeningDetail[] // ← now we store the clicked card’s detailsData array
  }>({ open: false })

  const handleViewDetails = (detailsFromCard?: OpeningDetail[] | null) => {
    if (detailsFromCard && detailsFromCard.length) {
      setOpenDetails({ open: true, details: detailsFromCard })
    }
  }

  const handleApply = (type: string, title: string) => {
    // keep your existing position mapping logic, or simplify as you wish
    setPos(title)
    // const formEl = document.querySelector('#career-opening-section form')
    // if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
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

  return (
    <section id="career-opening-section" className="container-padding w-full bg-[#F6EDDD] py-12">
      <div className="mb-8 lg:mb-10">
        <div>
          <span className="block text-[#343434] font-light text-[18px] md:text-[22px] xl:text-[24px]">
            <LocalizedText en={openingData?.title} bn={openingData?.titleBN} />
          </span>
          <span className="block text-[#ED7125] font-bold text-[18px] md:text-[34px] xl:text-[50px] -mt-1">
            {/* fixed BN prop (was using subtitle twice) */}
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
                // pass the card’s detailsData to the handler
                onViewDetails={() => handleViewDetails(card?.detailsData)}
              />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden w-full relative mb-8">
            <Carousel
              opts={{ align: 'start' }}
              setApi={setCarouselApi}
              plugins={[Autoplay({ delay: 5000 })]}
            >
              <CarouselContent className="flex items-stretch">
                {openingData?.cards?.map((card: any, idx: number) => (
                  <CarouselItem key={idx} className="flex-shrink-0 w-[91vw] max-w-[350px]">
                    <CareerOpeningCard
                      {...card}
                      onApply={handleApply}
                      onViewDetails={() => handleViewDetails(card?.detailsData)}
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

          {/* Details modal (now uses details array from card) */}
          <CareerDetailsModal
            open={openDetails.open}
            onOpenChange={(o: boolean) => setOpenDetails({ open: o })}
            details={openDetails.details}
          />
        </div>

        {/* Right: form */}
        <div className="mt-10 md:mt-0 h-full">
          <JoinOurTeamMobile />
          <div className="hidden md:block h-full">
            <CareerOpeningForm pos={pos} setPos={setPos} />
          </div>
        </div>
      </div>
    </section>
  )
}
