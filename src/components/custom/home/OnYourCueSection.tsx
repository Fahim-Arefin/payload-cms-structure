'use client'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import GlobalButton from '../shared/GlobalButton'
import CueHeader from './CueHeader'
import CueItem from './CueItem'
import { sliderDelay } from '@/lib/data'
import LocalizedString from '../shared/LocalizedString'

const cards = [
  {
    // icon: '/assets/homepage/web/cue2.png',
    icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue2.png`,
    // mobileIcon: '/assets/homepage/mobile/cue2.png',
    title: 'Shanta',
    titleBN: 'শান্তা',
    subtitle: 'Child Education Plan',
    subtitleBN: 'চাইল্ড এডুকেশন প্ল্যান',
    description: 'They’re building castles in the sky — we’re here to anchor the ground.',
    descriptionBN: 'তাদের স্বপ্নের ঘুড়ি যেন উড়ে বাঁধাহীন।',
    // image: '/assets/homepage/web/child-education.jpg',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/child-education.jpg`,
    // mobileImage: '/assets/homepage/mobile/child-education.jpg',
    link: '/plans/individual/child-education',
  },
  {
    // icon: '/assets/homepage/web/cue1.png',
    icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue1.png`,
    // mobileIcon: '/assets/homepage/mobile/cue1.png',
    title: 'Shanta',
    titleBN: 'শান্তা',
    subtitle: 'Multi Stage Maturity Plans',
    subtitleBN: 'মাল্টি স্টেজ ম্যাচুরিটি প্ল্যান ',
    description: 'Multiple payouts, 2 powerful plans - because your future is in your hands.',
    descriptionBN: '২টি পাওয়ারফুল প্ল্যান - ধাপে ধাপে অর্থপ্রাপ্তির নিশ্চয়তা।',
    // image: '/assets/homepage/web/multi-stage.jpg',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/multi-stage.jpg`,
    // mobileImage: '/assets/homepage/mobile/multi-stage.jpg',
    link: '/plans/individual/saving-and-investment/multistage',
  },
  {
    // icon: '/assets/homepage/web/cue3.png',
    icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue3.png`,
    // mobileIcon: '/assets/homepage/mobile/cue3.png',
    title: 'Shanta',
    titleBN: 'শান্তা',
    subtitle: 'Endowment Plan',
    subtitleBN: 'এনডাওমেন্ট প্ল্যান',
    description: 'For the life you’re building and the ones you’re building it for.',
    descriptionBN: 'নিজ ও প্রিয়জনের আর্থিক সুরক্ষায় অবিচল নিশ্চয়তা।',
    // image: '/assets/homepage/web/endowment.jpg',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/endowment.jpg`,
    // mobileImage: '/assets/homepage/mobile/endowment.jpg',
    link: '/plans/individual/saving-and-investment/endowment',
  },
]

function OnYourCueSection() {
  return (
    <div className="container-wpm ">
      <CueHeader />

      {/* Mobile View: Grid */}
      <div className="block md:hidden mt-8 space-y-4">
        {cards.map((card, index) => (
          <CueItem key={index} card={card} index={index} />
        ))}
      </div>

      {/* Desktop View: Carousel */}
      <div className="hidden md:block mt-8 lg:mt-12 xl:mt-16 2xl:mt-24">
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
                <CueItem card={card} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Top Center Controls */}
          {/* <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <CarouselPrevious className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
            <CarouselNext className="static bg-transparent border-2 border-[#1E1E1E80] rounded-md" />
          </div> */}
        </Carousel>
      </div>
      {/* Let’s Find More button */}
      <div className="flex justify-center mt-4 md:mt-6 lg:mt-8 2xl:mt-12 font-avenir">
        <Link href="/plans">
          <GlobalButton variant="primary" className="" text="Lets Find More">
            <LocalizedString en='Lets Find More' bn='আরো জানুন'/>
          </GlobalButton>
        </Link>
      </div>
    </div>
  )
}

export default OnYourCueSection
