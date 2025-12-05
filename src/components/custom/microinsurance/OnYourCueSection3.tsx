'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
// import Link from 'next/link'
import { sliderDelay } from '@/lib/data'
import CueHeader from '../home/CueHeader'
import CueItem from '../home/CueItem'
import { MicroinsuranceServiceBlockType } from '@/types/payloadCustomTypes'
import CueItem2 from './CueItem2'
// import GlobalButton from '../GlobalButton'
// import LocalizedString from '../LocalizedString'

type Props = {
  data: MicroinsuranceServiceBlockType
  bg?: string
}

function OnYourCueSection3({ data, bg }: Props) {
  const cards = (Array.isArray(data?.plans) ? data?.plans : (data?.plans as any)?.cards) ?? []
  return (
    // <div className="container-width md:container-padding-y">
    <div className="container-wpm mb-12 md:mb-24 lg:mb-32 xl:mb-[150px]">
      {/* Mobile View: Grid */}
      <div className="block md:hidden space-y-4">
        {cards.map((card: any, index: number) => (
          <CueItem2 key={index} data={data} card={card as any} index={index} bg={bg} />
        ))}
      </div>

      {/* Desktop View: Carousel */}
      <div className="hidden md:block ">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            // loop: true,
          }}
          plugins={[]}
        >
          <CarouselContent className="-ml-4">
            {cards.map((card: any, index: number) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CueItem2 card={card as any} data={data} index={index} bg={bg} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Top Center Controls */}
          {cards.length > 3 && (
            <div className="hidden lg:flex absolute -top-10 left-1/2 -translate-x-1/2 z-20 gap-2">
              <CarouselPrevious className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
              <CarouselNext className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default OnYourCueSection3
