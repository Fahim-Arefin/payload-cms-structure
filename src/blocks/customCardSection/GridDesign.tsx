'use client'

import { CustomCardSectionBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

// add this arm to the conditional
// type ItemOf<T> = T extends { corporateCards: infer A extends any[] }
//   ? A[number]
//   : T extends { planCards: infer B extends any[] }
//     ? B[number]
//     : T extends { offerCards: infer C extends any[] }
//       ? C[number]
//       : T extends { hashLinkCards: infer D extends any[] } // ⬅️ add
//         ? D[number]
//         : never

type ItemOf<T> = T extends { corporateCards: infer A extends any[] }
  ? A[number]
  : T extends { planCards: infer B extends any[] }
    ? B[number]
    : T extends { offerCards: infer C extends any[] }
      ? C[number]
      : T extends { hashLinkCards: infer D extends any[] } // ⬅️ add
        ? D[number]
        : T extends { careerCards: infer E extends any[] } // ⬅️ add
          ? E[number]
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

  // pick the array from the union, now including hashLinkCards
  // const items = (
  //   'corporateCards' in data
  //     ? data.corporateCards
  //     : 'planCards' in data
  //       ? data.planCards
  //       : 'offerCards' in data
  //         ? data.offerCards
  //         : 'hashLinkCards' in data // ⬅️ add
  //           ? data.hashLinkCards
  //           : []
  // ) as ItemOf<T>[]

  const items = (
    'corporateCards' in data
      ? data.corporateCards
      : 'planCards' in data
        ? data.planCards
        : 'offerCards' in data
          ? data.offerCards
          : 'hashLinkCards' in data // ⬅️ add
            ? data.hashLinkCards
            : 'careerCards' in data // ⬅️ add
              ? data.careerCards
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
