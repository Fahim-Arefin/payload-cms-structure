import { EligibilityContentBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import { EligibilityCommonCard } from './EligibilityCommonCard'

type Props = {
  data: EligibilityContentBlockType
}

function EligibilityContentBlock({ data }: Props) {
  const items = data?.eligibilityData ?? []
  const count = items.length

  const gridCols =
    count === 1
      ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1 justify-items-center'
      : count === 2
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' // 3+ items → normal

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6 lg:gap-2 xl:gap-8 `}>
      {items?.map((item, index) => (
        <EligibilityCommonCard key={index} data={item} />
      ))}
    </div>
  )
}

export default EligibilityContentBlock
