'use client'

import Card02 from '@/components/custom/sagar-ropes-shared/cards/Card02'
import TestLabCard02 from '@/components/custom/sagar-ropes-shared/cards/TestLabCard02'
import CardsCarousel from '@/components/custom/sagar-ropes-shared/carousal/CardsCarousel'
import { PerformanceAndApplicationCardBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: PerformanceAndApplicationCardBlockType
}

export default function PerformanceAndApplicationCardCarousel({ block }: Props) {
  const cards = block?.cards02 ?? []
  const testLabCards = block?.testLabCards ?? []

  const items = [
    ...cards.map((c) => ({ type: 'card01' as const, data: c })),
    ...testLabCards.map((c) => ({ type: 'testLab' as const, data: c })),
  ]

  return (
    <CardsCarousel
      items={items}
      className="w-[90%] mx-auto "
      contentClassName="-ml-3 md:-ml-4"
      itemClassName="pl-3 md:pl-4 basis-[50%] md:basis-[33.33%] xl:basis-[25%]"
      paginationClassName="-bottom-6 md:-bottom-8 xl:-bottom-10"
    >
      {(item, idx) =>
        item.type === 'card01' ? (
          <Card02
            data={item.data}
            index={idx}
            className="bg-transparent border border-border-2 
              hover:border-dashed
              transition-all duration-300 ease-in
              p-2.5 md:p-3 lg:p-[18px] xl:p-[22px] 2xl:p-8
              min-h-[150px] md:min-h-[160px] lg:min-h-[180px] xl:min-h-[230px] 2xl:min-h-[300px]"
          />
        ) : (
          <TestLabCard02
            data={item.data}
            className="bg-white-1 p-2.5 md:p-3.5 xl:p-5 2xl:p-6
              min-h-[170px] md:min-h-[160px] lg:min-h-[210px] xl:min-h-[275px] 2xl:min-h-[300px]"
          />
        )
      }
    </CardsCarousel>
  )
}
