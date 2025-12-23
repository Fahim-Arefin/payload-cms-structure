import ProgramInsidersSection from '@/components/custom/career/aura/ProgramInsidersSection'
import { CareerAuraProgramInsidersBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CareerAuraProgramInsidersBlockType
  params: Record<string, string>
}

function CareerAuraProgramInsidersBlock({ block, params }: Props) {
  return (
    <div>
      {/* component here */}
      <ProgramInsidersSection block={block} />
    </div>
  )
}

export default CareerAuraProgramInsidersBlock
