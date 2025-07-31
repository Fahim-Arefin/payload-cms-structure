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
      className="w-full "
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
            className="w-full basis-1/2 md:basis-1/3 xl:basis-1/4 lg:py-24 lg:px-16 xl:py-20 2xl:py-32 xl:px-20 "
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
