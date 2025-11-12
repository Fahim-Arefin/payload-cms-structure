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
import CueItem from '../../home/CueItem'
import { sliderDelay } from '@/lib/data'
// import GlobalButton from '../GlobalButton'
// import LocalizedString from '../LocalizedString'
import CueHeader from '../../home/CueHeader'

type Props = {
  data: {
    sectionHeading: string
    sectionHeadingBN: string
    sectionTitle: string
    highlighedSectionTitle: string
    sectionTitleBN: string
    highlighedSectionTitleBN: string
    description: string
    descriptionBN: string
    cards: {
      icon: string
      title: string
      titleBN: string
      subtitle?: string
      subtitleBN?: string
      description: string
      descriptionBN: string
      image: string
      link?: string
      moreItem?: {
        description: string
        descriptionBN: string
      }[]
    }[]
  }
  bg?: string
}

function OnYourCueSection2({ data, bg }: Props) {
  const { cards } = data
  return (
    // <div className="container-width md:container-padding-y">
    <div className="container-wpm mb-12 md:mb-24 lg:mb-32 xl:mb-[150px]">
      <CueHeader data={data} />

      {/* Mobile View: Grid */}
      <div className="block md:hidden space-y-4">
        {cards.map((card, index) => (
          <CueItem key={index} card={card} index={index} bg={bg} />
        ))}
      </div>

      {/* Desktop View: Carousel */}
      <div className="hidden md:block">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            // loop: true,
          }}
          plugins={[
            Autoplay({
              delay: sliderDelay,
            }),
          ]}
        >
          <CarouselContent className="-ml-4">
            {cards.map((card, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CueItem card={card} index={index} bg={bg} />
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

export default OnYourCueSection2
