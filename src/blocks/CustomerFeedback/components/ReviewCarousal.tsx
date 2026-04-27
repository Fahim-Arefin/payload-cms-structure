'use client'

import CardsCarousel from '@/components/custom/sagar-ropes-shared/carousal/CardsCarousel'
import { Review } from '@/payload-types'
import ReviewItem from './ReviewItem'

type Props = {
  block: Review[]
}

export default function ReviewCarousal({ block }: Props) {
  const cards = block ?? []

  const items = [...cards.map((c) => ({ type: 'card01' as const, data: c }))]

  return (
    //  showNavigation
    //   navigationWrapperClassName="pointer-events-none absolute inset-y-1/2 left-0 right-0 z-30 -translate-y-1/2"
    //   prevButtonClassName="pointer-events-auto absolute left-2 md:left-3 xl:left-4 h-8 w-8 rounded-none border border-white/40 bg-transparent text-white hover:bg-white/10"
    //   nextButtonClassName="pointer-events-auto absolute right-2 md:right-3 xl:right-4 h-8 w-8 rounded-none border border-white/40 bg-transparent text-white hover:bg-white/10"
    //   paginationClassName="-bottom-6 md:-bottom-8 xl:-bottom-10"

    <CardsCarousel
      items={items}
      className="w-full mx-auto h-full"
      contentClassName="-ml-3 md:-ml-4 h-full"
      itemClassName="pl-3 md:pl-4 basis-[100%] h-full"
      paginationClassName="bottom-2 w-full flex justify-end"
      carousalClassName="min-h-[80%]"

      //   showNavigation
      //   navigationWrapperClassName="absolute right-0 top-0 z-30 flex items-center gap-2"
      //   prevButtonClassName="pointer-events-auto static h-7 w-7 rounded-none border border-[#7B7BA8] bg-transparent text-[#7B7BA8] hover:bg-[#7B7BA8]/10"
      //   nextButtonClassName="pointer-events-auto static h-7 w-7 rounded-none border border-[#7B7BA8] bg-transparent text-[#7B7BA8] hover:bg-[#7B7BA8]/10"

      //   showNavigation
      //   navigationWrapperClassName="pointer-events-none absolute inset-y-1/2 left-0 right-0 z-30 -translate-y-1/2"
      //   prevButtonClassName="pointer-events-auto absolute left-2 md:left-3 xl:left-4 h-8 w-8 rounded-none border border-[#7B7BA8] bg-transparent text-white hover:bg-[#7B7BA8]"
      //   nextButtonClassName="pointer-events-auto absolute right-2 md:right-3 xl:right-4 h-8 w-8 rounded-none border border-[#7B7BA8] bg-transparent text-white hover:bg-[#7B7BA8]"
    >
      {(item, idx) => item.type === 'card01' && <ReviewItem data={item?.data} />}
    </CardsCarousel>
  )
}
