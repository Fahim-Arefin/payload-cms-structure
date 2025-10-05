'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import Autoplay from 'embla-carousel-autoplay'
import CueItem from './CueItem'
import { FeaturedPlansBlock } from '@/types/payloadCustomTypes'

type Props = {
  data: FeaturedPlansBlock['plans']
}

const cards = [
  {
    icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue2.png`,
    title: 'Shanta',
    subtitle: 'Child Education Plan',
    description: 'They’re building castles in the sky — we’re here to anchor the ground.',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/child-education.jpg`,
    link: '/plans/individual/child-education',
  },
  {
    icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue1.png`,
    title: 'Shanta',
    subtitle: 'Multi Stage Maturity Plans',
    description: 'Multiple payouts, 2 powerful plans - because your future is in your hands.  ',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/multi-stage.jpg`,
    link: '/plans/individual/saving-and-investment/multistage',
  },
  {
    icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue3.png`,
    title: 'Shanta',
    subtitle: 'Endowment Plan',
    description: 'For the life you’re building and the ones you’re building it for.',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/endowment.jpg`,
    link: '/plans/individual/saving-and-investment/endowment',
  },
]

function CueContent({ data }: Props) {
  return (
    <>
      {/* Mobile View: Grid */}
      <div className="block md:hidden mt-8 space-y-4 ">
        {data.map((card, index) => (
          <CueItem key={index} card={card} index={index} />
        ))}
      </div>

      {/* Desktop View: Carousel */}
      <div className="hidden md:block mt-8 lg:mt-16 xl:mt-20 2xl:mt-24">
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
            {data?.map((card, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CueItem card={card} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Top Center Controls */}
          {data.length > 3 && (
            <div
              className="absolute hidden lg:flex justify-center z-20 gap-2 w-full
               lg:-top-7 xl:-top-9 2xl:-top-10"
            >
              <CarouselPrevious className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
              <CarouselNext className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
            </div>
          )}
        </Carousel>
      </div>
    </>
  )
}

export default CueContent
