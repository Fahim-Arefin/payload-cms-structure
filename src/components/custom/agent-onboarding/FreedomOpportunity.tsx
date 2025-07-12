import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const cards = [
  {
    icon: '/assets/hands.svg',
    title: 'Earn Without Limits',
    description: 'Your income grows with your ambition — no caps, just possibilities.',
  },
  {
    icon: '/assets/crown.svg',
    title: 'Get Recognized, Get Rewarded',
    description: '',
  },
  {
    icon: '/assets/stopwatch.svg',
    title: 'Freedom to Work On Your Time',
    description: '',
  },
  {
    icon: '/assets/freehand.svg',
    title: 'Train. Grow. Lead.',
    description: '',
  },
  {
    icon: '/assets/hands.svg',
    title: 'Earn Without Limits',
    description: 'Your income grows with your ambition — no caps, just possibilities.',
  },
  {
    icon: '/assets/crown.svg',
    title: 'Get Recognized, Get Rewarded',
    description: '',
  },
  {
    icon: '/assets/stopwatch.svg',
    title: 'Freedom to Work On Your Time',
    description: '',
  },
  {
    icon: '/assets/freehand.svg',
    title: 'Train. Grow. Lead.',
    description: '',
  },
]

export default function FreedomOpportunity() {
  return (
    <div
      className="w-full  py-12 
            md:py-24 
             lg:py-[100px] 
            bg-[#F8F0E6] grid grid-cols-2"
    >
      {/* Left Section */}
      <div
        className="pl-5 md:pl-24 lg:pl-[130px] xl:pl-[200px] 2xl:pl-[300px]"
      >
        <h1 className="global-h2 font-medium">
          WHERE FREEDOM <br /> MEETS <span className="text-[#DB6A22]">OPPORTUNITY</span>
        </h1>

              <Carousel className="mt-10 w-full">
        <CarouselContent className="flex gap-6">
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className="basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/3 2xl:basis-1/4"
            >
              <div className="h-full min-h-[280px] bg-white rounded-lg p-6 flex flex-col gap-4 items-center justify-center text-center transition-all duration-300 hover:bg-[#9C8639] hover:text-white shadow-md">
                <div className="w-[84px] h-[84px]">
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-semibold text-lg">{card.title}</h3>
                {card.description && (
                  <p className="text-sm opacity-80">{card.description}</p>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-6 flex gap-3">
          <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button className="rounded-full h-8 w-8 bg-[#DB6A22] text-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Carousel>
      </div>

      {/* Right Section */}
      <div className="relative -z-0">
        <img
          src="/assets/freedomBanner.png"
          alt="Freedom Banner"
          className="object-cover w-full h-fit 2xl:h-[764px]"
        />
      </div>
    </div>
  )
}
