import React from 'react'
import { CareerShapeBlockType } from '@/types/payloadCustomTypes'
import CareerShapeSection from '@/components/custom/career/aura/CareerShapeSection'

type Props = {
  block: CareerShapeBlockType
  params: Record<string, string>
}

function CareerShapeBlock({ block, params }: Props) {
  return (
    <div>
      {/* component CareerShapeSection here */}
      <CareerShapeSection block={block} />
    </div>
  )
}

export default CareerShapeBlock
