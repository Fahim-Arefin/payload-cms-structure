'use client'

import { CustomCardSectionBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type ItemType = CustomCardSectionBlockType['card'][number]['cards'][number]
type Props = {
  data: CustomCardSectionBlockType['card'][number]
  block: CustomCardSectionBlockType
  renderItem: (item: ItemType, index: number) => React.ReactNode
}

const toBasis = (n?: number) => {
  switch (n) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-2'
    case 3:
      return 'grid-cols-3'
    case 4:
      return 'grid-cols-4'
    default:
      return 'grid-cols-2'
  }
}

function GridDesign({ data, block, renderItem }: Props) {
  const mobileBasis = toBasis(block?.mobileCardsPerView ?? 1)
  const tabletBasis = toBasis(block?.tabletCardsPerView ?? 2)
  const laptopBasis = toBasis(block?.laptopCardsPerView ?? 3)
  const desktopBasis = toBasis(block?.desktopCardsPerView ?? 3)
  return (
    <div
      className={`${!block?.addHorizontalPadding && `container-padding-b px-5 md:px-12 lg:px-[64px]`} 
      grid ${mobileBasis} sm:${tabletBasis} lg:${laptopBasis} xl:${desktopBasis} 
      gap-4 md:gap-4 lg:gap-4 xl:gap-4`}
    >
      {data?.cards?.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  )
}

export default GridDesign
