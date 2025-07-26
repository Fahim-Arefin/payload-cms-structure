'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CareerOpeningForm from './CareerOpeningForm'

import { useEffect, useState } from 'react'
import CareerOpeningCard from './CareerOpeningCard'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import { JoinOurTeamMobile } from './JoinOurTeamMobile'
import Autoplay from 'embla-carousel-autoplay'

type CareerOpeningDataProps = {
  openingData: any
}

const positions = [
  'Junior IT Executive',
  'Mid IT Executive',
  'Senior IT Executive',
  'Management Trainee',
  'Relationship Officer (Internship)',
  'Relationship Officer (Full time)',
  'Campus Ambassador (Part-time)',
  'Campus Ambassador (Full time)',
]

// Map type/title to your form options
function getFormPosition(type: string, title: string) {
  if (type.toLowerCase().includes('intern')) return 'Relationship Officer (Internship)'
  if (type.toLowerCase().includes('part')) return 'Campus Ambassador (Part-time)'
  if (type.toLowerCase().includes('full') && title.toLowerCase().includes('ambassador'))
    return 'Campus Ambassador (Full time)'
  if (type.toLowerCase().includes('full') && title.toLowerCase().includes('relationship'))
    return 'Relationship Officer (Full time)'
  if (title.toLowerCase() === 'management trainee') return 'Management Trainee'
  // add more as needed
  return positions[0]
}

export default function CareerOpening({ openingData }: CareerOpeningDataProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
    const [pos, setPos] = useState(positions[0])


  const handleApply = (type: string, title: string) => {
    setPos(getFormPosition(type, title))
    // Optionally scroll to form
    const formEl = document.querySelector('#career-opening-section form')
    // if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

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
    <section id="career-opening-section" className="container-padding w-full bg-[#F6EDDD] py-12">
      <div className="mb-8 lg:mb-10">
        <div>
          <span className="block text-[#343434] font-light text-[18px] md:text-[22px] xl:text-[24px]">
            CURRENTLY OPENING
          </span>
          <span className="block text-[#ED7125] font-bold text-[18px] md:text-[34px] xl:text-[50px] -mt-1">
            POSITIONS
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-stretch">
        {/* Left: Section Title */}

        {/* Center: Cards (Grid for desktop, Carousel for mobile) */}
        <div className="flex flex-col items-center w-full">
          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-2 gap-5 w-full">
            {openingData.map((card: any, idx: number) => (
              <CareerOpeningCard key={idx} {...card} onApply={handleApply} />
            ))}
          </div>
          {/* Mobile: Carousel */}
          <div className="md:hidden w-full relative mb-8">
            <Carousel
              opts={{ loop: true, align: 'center' }}
              setApi={setCarouselApi}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
            >
              <CarouselContent className="flex items-stretch">
                {openingData.map((card: any, idx: number) => (
                  <CarouselItem key={idx} className="flex-shrink-0 w-[91vw] max-w-[350px]">
                    <CareerOpeningCard {...card} onApply={handleApply}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div
                className="flex md:hidden gap-2 absolute
                          inset-x-0 justify-center -bottom-16"
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
        </div>

        {/* Right: Form */}
        <div className="mt-10 md:mt-0 h-full">
          <JoinOurTeamMobile />
          <div className="hidden md:block h-full">
            <CareerOpeningForm pos={pos} setPos={setPos}/>
          </div>
        </div>
      </div>
    </section>
  )
}
