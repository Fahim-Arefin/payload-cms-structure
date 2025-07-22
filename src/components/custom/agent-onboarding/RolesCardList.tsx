'use client'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { OnboardingRoleType } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import RolesCard from './RolesCard'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'

type Props = {
  onboardingRoleData: OnboardingRoleType[]
}

function RolesCardList({ onboardingRoleData }: Props) {
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
    <Carousel
      
      opts={{
        align: 'start',
      }}
      className="w-full"
      setApi={setCarouselApi} // 👈 capture carousel API
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      {/* Carousel Content */}
      <CarouselContent>
        {onboardingRoleData?.map((data, index) => (
          <CarouselItem
            key={index}
            className="basis-1/3 md:basis-4 lg:basis-4 px-5 py-12 
           md:p-24 
           lg:px-[130px]  lg:py-[110px] 
           xl:px-[150px]  xl:py-[100px] 
           2xl:px-[180px] 2xl:py-[150px]"
          >
            <RolesCard data={data} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Carousel Navigation */}
      <div
        className="hidden lg:flex gap-3 absolute 
      lg:-bottom-[60px] xl:-bottom-20  2xl:-bottom-12 
      lg:left-[210px] xl:left-[360px] 2xl:left-[310px]"
      >
        <CarouselNavButtons
          onPrev={() => carouselApi?.scrollPrev()}
          onNext={() => carouselApi?.scrollNext()}
          hasPrev={canScrollPrev}
          hasNext={canScrollNext}
        />
      </div>
    </Carousel>
  )
}

export default RolesCardList
