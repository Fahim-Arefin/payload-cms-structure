import CareerOpening from '@/components/custom/career/CareerOpening'
import { CareerPageOpeningBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CareerPageOpeningBlockType
  params: Record<string, string>
}

function CareerOpeningBlock({ block, params }: Props) {
  return (
    <div>
      <CareerOpening openingData={block} />
    </div>
  )
}

export default CareerOpeningBlock
