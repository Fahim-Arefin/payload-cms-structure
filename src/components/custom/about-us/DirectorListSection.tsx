'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { DirectorProfileDataType } from '@/types'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import DirectorProfile from './DirectorProfile'
import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { sliderDelay } from '@/lib/data'

type Props = {
  directorProfileData: DirectorProfileDataType[]
}

function DirectorListSection({ directorProfileData }: Props) {
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
    <div className="bg-white pb-12 lg:pb-0">
      <div className="container-padding">
        {/* top section */}
        <div className="lg:w-[50%] space-y-2 md:space-y-6 2xl:space-y-12 ">
          <div
            className="global-h1 font-medium lg:font-semibold text-[#4A4A4A] 
          flex space-x-1 justify-center lg:block lg:space-x-0 lg:justify-start flex-wrap"
          >
            <h1>The Power of</h1>
            <h1 className="text-[#ED7125]">One Connected Vision</h1>
          </div>
          <p className="global-p1 text-[#4A4A4A] text-center lg:text-justify">
            Spearheaded by dynamic leadership team and a visionary board, Shanta Life is ready to
            power progress today, for a better tommorow.
          </p>
          <div className="hidden lg:flex lg:flex-col xl:flex-row gap-2 xl:gap-4">
            <h2 className="global-h3 font-semibold text-[#4A4A4A] uppercase">Board of directors</h2>
            <Link
              href="/all-bods"
              className="text-sm text-[#ED7125] underline hover:text-[#d65a1a] transition-colors font-medium flex items-center gap-1"
            >
              all board of directors
              <ArrowUpRight size={14} className="inline-block" />
            </Link>
          </div>
        </div>

        {/* profile card list */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 xl:gap-12 2xl:gap-2 mt-12">
          {directorProfileData?.map((data, index) => (
            <DirectorProfile key={index} data={data} />
          ))}
        </div>

        {/* profile card carousal */}
        <div className="lg:hidden mt-6 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-32">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-[95%] mx-auto"
            setApi={setCarouselApi}
            plugins={[
              Autoplay({
                delay: sliderDelay,
              }),
            ]}
          >
            <CarouselContent>
              {directorProfileData?.map((data, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 mx-auto lg:py-4">
                  <DirectorProfile data={data} />
                </CarouselItem>
              ))}
            </CarouselContent>
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
        </div>
      </div>
    </div>
  )
}

export default DirectorListSection
