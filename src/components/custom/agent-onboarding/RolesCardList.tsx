'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { OnboardingRoleType } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import RolesCard from './RolesCard'

type Props = {
  onboardingRoleData: OnboardingRoleType[]
}

function RolesCardList({ onboardingRoleData }: Props) {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      {/* Carousel Content */}
      <CarouselContent>
        {onboardingRoleData?.map((data, index) => (
          <CarouselItem key={index} className="basis-1/3 md:basis-4 lg:basis-4 px-5 py-12 
           md:p-24 
           lg:px-[130px]  lg:py-[110px] 
           xl:px-[150px]  xl:py-[100px] 
           2xl:px-[180px] 2xl:py-[150px]">
            <RolesCard data={data} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Carousel Navigation */}
      {/* <div
        className="hidden lg:flex gap-3 absolute 
      lg:-bottom-[60px] xl:-bottom-20  2xl:-bottom-24 
      lg:left-[210px] xl:left-[360px] 2xl:left-[310px]"
      >
        <CarouselPrevious
          className="
        lg:w-6 xl:w-8 
        lg:h-6 xl:h-8 
        static rounded-full border border-gray-400 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
        />
        <CarouselNext
          className="
        lg:px-6 xl:px-9 
        lg:h-6 xl:h-8
        static rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
        />
      </div> */}
    </Carousel>
  )
}

export default RolesCardList
