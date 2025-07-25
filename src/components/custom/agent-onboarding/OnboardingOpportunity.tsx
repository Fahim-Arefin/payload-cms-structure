'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CarouselNextButton } from '../shared/CarouselNextButton'
import { CarouselPrevButton } from '../shared/CarouselPrevButton'
import Autoplay from 'embla-carousel-autoplay'

type OpportunityItem = {
  text: string
  src: string
}

type ExpectedItem = {
  icon: string
  text: string
}

type Props = {
  opportunityData: {
    title: string
    items: OpportunityItem[]
  }
  expectedData: {
    title: string
    sectionLeft: ExpectedItem[]
    sectionRight: {
      avatar: string
      name: string
      quote: string
    }
  }
}

export default function OnboardingOpportunity({ opportunityData, expectedData }: Props) {
  return (
    <div className="bg-[#FCF4EB] container-padding">
      <h1 className="global-h1 hidden md:block font-semibold text-[#434342] uppercase lg:block mb-12 w-[50%]">
        {expectedData.title}
      </h1>
      <div className="flex flex-col gap-10">
        {/* Opportunity Section */}
        {/* <div className='hidden md:block'>
          <h1 className="global-h1 font-semibold text-[#434342] uppercase lg:block mb-12">
            {opportunityData.title}{' '}
            <span className="text-[#ED7125] font-semibold">OPPORTUNITY FOR</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {opportunityData.items.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-[353/325] rounded-md overflow-hidden"
              >
                <img src={item.src} alt={item.text} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex justify-center items-end py-10">
                  <p className="text-white font-medium text-[16px] lg:text-[20px]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <section className="bg-[#FCF4EB] block md:hidden px-4 py-4">
          {/* Section Title */}
          <h1 className="text-[18px] font-semibold text-[#434342] uppercase mb-6 text-center">
            {opportunityData.title}
          </h1>

          {/* Carousel */}
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {opportunityData.items.map((item, idx) => (
                <CarouselItem key={idx} className="basis-[45%] flex flex-col items-center gap-4">
                  <div className="relative w-full aspect-[170/155] rounded-md overflow-hidden">
                    <img src={item.src} alt={item.text} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4 text-center">
                      {/* <p className="text-white font-medium text-base">{item.text}</p> */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevButton />
              <CarouselNextButton />
            </div>
          </Carousel>
        </section>

        {/* Expected Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:mt-12">
          {/* Left list */}
          <div>
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 py-4">
              {expectedData.sectionLeft.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <img src={item.icon} alt={`icon-${idx}`} className="w-[48px] h-[42px] mt-1" />
                  <p className="global-p1 whitespace-pre-line">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right testimonial */}
          <div className="bg-[#FFFFFF8C] rounded-md p-6 shadow-sm text-center flex flex-col items-center justify-center gap-2 md:gap-6">
            <img
              src={expectedData.sectionRight.avatar}
              alt={expectedData.sectionRight.name}
              className="w-[100px] h-[100px] lg:w-[208px] lg:h-[208px] rounded-full object-cover mb-4"
            />
            <h4 className="global-p2 font-semibold text-[#9A4E46] mb-2 lg:mb-6 ">
              {expectedData.sectionRight.name}
            </h4>
            <p className="global-p2 text-[#3A3A3C]">
              <span className="text-[#9A4E46] text-xl leading-none font-bold">“</span>
              {expectedData.sectionRight.quote}
              <span className="text-[#9A4E46] text-xl leading-none font-bold">”</span>
            </p>
            <div className="bg-[#9A4E46] w-10 h-2 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
