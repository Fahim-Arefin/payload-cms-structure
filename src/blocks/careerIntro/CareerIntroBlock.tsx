import CareerIntro from '@/components/custom/career/CareerIntro'
import { CareerPageIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
    block: CareerPageIntroBlockType
    params: Record<string, string>
}

function CareerIntroBlock({block, params}: Props) {
  return (
    <div>
      <CareerIntro data={block}/>
    </div>
  )
}

export default CareerIntroBlock