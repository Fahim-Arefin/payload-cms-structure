'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { sliderDelay } from '@/lib/data'
import { LeadershipTeam } from '@/payload-types'
import { LeadershipTeamCardBlockType } from '@/types/payloadCustomTypes'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import AllOfThemCard from './AllOfThemCard'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  blockData: LeadershipTeamCardBlockType
  leadersData: LeadershipTeam
}

function LeadershipTeamCardSectionClient({ blockData, leadersData }: Props) {
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
    // bg-[#F6EDDD]
    <div
      className="pb-12 lg:pb-0"
      style={{
        backgroundColor: blockData?.backgroundColor || '',
      }}
    >
      <div className="container-padding">
        {/* top section */}
        <div className="lg:w-[50%] space-y-2 md:space-y-6 2xl:space-y-12 ">
          <h2 className="global-h1 lg:global-h3 font-medium lg:font-semibold text-[#4A4A4A] text-center lg:text-start uppercase">
            <LocalizedText en={leadersData?.sectionTitle} bn={leadersData?.sectionTitleBN} />
          </h2>
          {/* <p className="global-p1 text-[#4A4A4A] text-center lg:text-justify ">
            Guided by Visionaries, Driven by Purpose. Meet Our Leadership Team, creating a new
            future of Life Insurance in Bangladesh
          </p> */}
        </div>
        {/* carousal section */}
        <div className="mt-6 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-32">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-[95%] mx-auto"
            setApi={setCarouselApi} // 👈 capture carousel API
            plugins={[
              Autoplay({
                delay: sliderDelay,
              }),
            ]}
          >
            <CarouselContent>
              {leadersData?.leaders?.map((data, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 mx-auto lg:py-4 ">
                  <AllOfThemCard data={data} pageLink={blockData?.linkTarget} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel Navigation */}
            <div
              className="flex gap-2 absolute h-fit
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
        </div>
      </div>
    </div>
  )
}

export default LeadershipTeamCardSectionClient
