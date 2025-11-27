import CareerProcessingFlow from '@/components/custom/career/CareerProcessingFlow'
import { CareerPageProcessingBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CareerPageProcessingBlockType
  params: Record<string, string>
}

function CareerProcessingBlock({block, params}: Props) {
  return <div>
    <CareerProcessingFlow processData={block}/>
  </div>
}

export default CareerProcessingBlock
