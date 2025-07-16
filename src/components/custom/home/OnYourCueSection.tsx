'use client'
import { Button } from '@/components/ui/button'
import CueHeader from './CueHeader'
import CueItem from './CueItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import ToolTip from '../shared/ToolTip'
import GlobalButton from '../shared/GlobalButton'
import Link from 'next/link'

const cards = [
  {
    icon: '/assets/cue2.png',
    title: 'Shanta',
    subtitle: 'Child Education Plan',
    description: 'They’re building castles in the sky — we’re here to anchor the ground.',
    image: '/assets/cue4.jpg',
  },
  {
    icon: '/assets/cue1.png',
    title: 'Shanta',
    subtitle: '3 Payment Plan',
    description: 'Multiple payouts, 1 powerful plan - because your future is in your hands.  ',
    image: '/assets/cue5.jpg',
  },
  {
    icon: '/assets/cue3.png',
    title: 'Shanta',
    subtitle: 'Endowment Plan',
    description: 'For the life you’re building and the ones you’re building it for.',
    image: '/assets/cue6.jpg',
  },
  {
    icon: '/assets/cue1.png',
    title: 'Shanta',
    subtitle: '3 Payment Plan',
    description: 'Multiple payouts, 1 powerful plan - because your future is in your hands.  ',
    image: '/assets/cue5.jpg',
  },
  {
    icon: '/assets/cue3.png',
    title: 'Shanta',
    subtitle: 'Endowment Plan',
    description: 'For the life you’re building and the ones you’re building it for.',
    image: '/assets/cue6.jpg',
  },
  // {
  //   icon: '/assets/cue1.png',
  //   title: 'Shanta',
  //   subtitle: 'Test Insurance',
  //   description:
  //     'Your health is your wealth. Protect it with a flexible plan tailored for peace of mind and family care.',
  //   image: '/assets/cue5.jpg',
  // },
  // {
  //   icon: '/assets/cue3.png',
  //   title: 'Fahim',
  //   subtitle: 'Test Insurance',
  //   description:
  //     'Your health is your wealth. Protect it with a flexible plan tailored for peace of mind and family care.',
  //   image: '/assets/cue6.jpg',
  // },
]

function OnYourCueSection() {
  return (
    <div className="container-wpm md:mt-[70px] lg:mt-[90px] xl:mt-[80px] 2xl:mt-40">
      <CueHeader />

      {/* Mobile View: Grid */}
      <div className="block md:hidden mt-12 space-y-4">
        {cards.map((card, index) => (
          <CueItem key={index} card={card} index={index} />
        ))}
      </div>

      {/* Desktop View: Carousel */}
      <div className="hidden md:block mt-24">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            // loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent className="-ml-4">
            {cards.map((card, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CueItem card={card} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Top Center Controls */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <CarouselPrevious className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
            <CarouselNext className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
          </div>
        </Carousel>
      </div>
      {/* Let’s Find More button */}
      <ToolTip className="flex justify-center mt-6 2xl:mt-12 font-avenir">
        {/* <Button
          variant="primary"
          className="cursor-not-allowed p-4 lg xl:p-5 2xl:p-6 text-xs xl:text-sm 2xl:text-lg rounded-lg"
        >
          Let's Find More
        </Button> */}
        <Link href="/plans">
          <GlobalButton variant="primary" className="" text="Lets Find More" />
        </Link>
      </ToolTip>
    </div>
  )
}

export default OnYourCueSection
