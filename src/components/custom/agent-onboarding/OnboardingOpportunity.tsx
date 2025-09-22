'use client'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CarouselNextButton } from '../shared/CarouselNextButton'
import { CarouselPrevButton } from '../shared/CarouselPrevButton'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import { sliderDelay } from '@/lib/data'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'

type OpportunityItem = {
  text: string
  src: string
  mobileSrc?: string
}

type ExpectedItem = {
  icon: string
  mobileIcon?: string
  text: string
  textBN?: string
}

type Props = {
  opportunityData: {
    title: string
    subTitle?: string
    items: OpportunityItem[]
  }
  expectedData: {
    title: string
    titleBN?: string
    subTitle?: string
    subTitleBN?: string
    sectionLeft: ExpectedItem[]
    sectionRight: {
      avatar: string
      mobileAvatar?: string
      name: string
      nameBN?: string
      quote: string
      quoteBN?: string
    }
  }
}

export default function OnboardingOpportunity({ opportunityData, expectedData }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

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
    <div className="bg-[#FCF4EB] container-padding">
      <div className="global-h1 hidden md:block font-semibold text-[#434342] uppercase lg:block">
        <LocalizedText en={expectedData?.title} bn={expectedData?.titleBN} />
        <br />
        <LocalizedText
          en={expectedData?.subTitle}
          bn={expectedData?.subTitleBN}
          className="text-[#ED7125]"
        />
      </div>
      <div className="flex flex-col ">
        {/* Opportunity Section */}
        <section className="bg-[#FCF4EB] md:hidden">
          {/* Section Title */}
          <div className="text-[18px] font-medium text-[#434342] uppercase mb-6">
            <LocalizedText en={expectedData?.title} bn={expectedData?.titleBN} />
            <br />
            <LocalizedText
              en={expectedData?.subTitle}
              bn={expectedData?.subTitleBN}
              className="text-[#ED7125]"
            />
          </div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            plugins={[
              Autoplay({
                delay: sliderDelay,
              }),
            ]}
            setApi={setCarouselApi}
            className="w-full mb-12"
          >
            <CarouselContent>
              {opportunityData.items.map((item, idx) => (
                <CarouselItem key={idx} className="basis-[45%] flex flex-col items-center gap-4">
                  <div className="relative w-full aspect-[170/155] rounded-md overflow-hidden">
                    <Image
                      fill
                      src={item.src}
                      alt={item.text}
                      className="object-cover"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4 text-center">
                      {/* <p className="text-white font-medium text-base">{item.text}</p> */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            {/* <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevButton />
              <CarouselNextButton />
            </div> */}
            {/* Carousel Navigation */}
            <div
              className="flex gap-2 absolute
                        inset-x-0 justify-center lg:justify-end -bottom-12 md:-bottom-20 lg:-top-8 2xl:-top-12 lg:right-0"
            >
              <CarouselNavButtons
                onPrev={() => carouselApi?.scrollPrev()}
                onNext={() => carouselApi?.scrollNext()}
                hasPrev={canScrollPrev}
                hasNext={canScrollNext}
              />
            </div>
          </Carousel>
        </section>

        {/* Expected Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 
        md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-20"
        >
          {/* Left list */}
          <div>
            <div
              className="flex flex-col gap-3 md:gap-4 lg:gap-7 xl:gap-8 2xl:gap-10
            py-4"
            >
              {expectedData.sectionLeft.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  {/* web */}
                  <div className="relative w-[40px] h-[34px] lg:w-[48px] lg:h-[42px] mt-1">
                    <Image fill src={item.icon} alt={`icon-${idx}`} className="" />
                  </div>

                  <p className="global-p1 whitespace-pre-line">
                    <LocalizedText en={item.text} bn={item.textBN} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right testimonial */}
          <div className="bg-[#FFFFFF8C] rounded-md p-6 shadow-sm text-center flex flex-col items-center justify-center gap-2 lg:gap-6">
            <div className="relative w-[100px] h-[100px] lg:w-[208px] lg:h-[208px] mb-4">
              <Image
                fill
                src={expectedData.sectionRight.avatar}
                alt={expectedData.sectionRight.name}
                className="object-cover "
                sizes="400px"
              />
            </div>

            <h4 className="global-p2 font-semibold text-[#9A4E46] mb-2 lg:mb-6">
              <LocalizedText
                en={expectedData.sectionRight.name}
                bn={expectedData.sectionRight.nameBN}
              />
            </h4>
            <p className="global-p2 text-[#3A3A3C]">
              <span className="text-[#9A4E46] text-xl leading-none font-bold">“</span>
              <LocalizedText
                en={expectedData.sectionRight.quote}
                bn={expectedData.sectionRight.quoteBN}
              />
              <span className="text-[#9A4E46] text-xl leading-none font-bold">”</span>
            </p>
            <div className="bg-[#9A4E46] w-10 h-2 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
