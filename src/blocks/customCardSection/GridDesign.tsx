'use client'

import { CustomCardSectionBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

// Infer the item type from either `corporateCards` or `planCards`
// type ItemOf<T> = T extends { corporateCards: infer A extends any[] }
//   ? A[number]
//   : T extends { planCards: infer B extends any[] }
//     ? B[number]
//     : never

// Infer the item type from corporateCards / planCards / offerCards
type ItemOf<T> = T extends { corporateCards: infer A extends any[] }
  ? A[number]
  : T extends { planCards: infer B extends any[] }
    ? B[number]
    : T extends { offerCards: infer C extends any[] }
      ? C[number]
      : never

type Props<T extends CustomCardSectionBlockType['card'][number]> = {
  data: T
  block: CustomCardSectionBlockType
  renderItem: (item: ItemOf<T>, index: number) => React.ReactNode
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

export default function GridDesign<T extends CustomCardSectionBlockType['card'][number]>({
  data,
  block,
  renderItem,
}: Props<T>) {
  const mobileBasis = toBasis(block?.mobileCardsPerView ?? 1)
  const tabletBasis = toBasis(block?.tabletCardsPerView ?? 2)
  const laptopBasis = toBasis(block?.laptopCardsPerView ?? 3)
  const desktopBasis = toBasis(block?.desktopCardsPerView ?? 3)

  // Safely pick the correct array from the union
  // const items = (
  //   'corporateCards' in data ? data.corporateCards : 'planCards' in data ? data.planCards : []
  // ) as ItemOf<T>[]
  const items = (
    'corporateCards' in data
      ? data.corporateCards
      : 'planCards' in data
        ? data.planCards
        : 'offerCards' in data
          ? data.offerCards
          : []
  ) as ItemOf<T>[]

  return (
    <div
      className={`${!block?.addHorizontalPadding && `container-padding-b px-5 md:px-12 lg:px-[64px]`} 
      grid ${mobileBasis} sm:${tabletBasis} lg:${laptopBasis} xl:${desktopBasis} 
      gap-4 md:gap-4 lg:gap-4 xl:gap-4`}
    >
      {items?.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  )
}
