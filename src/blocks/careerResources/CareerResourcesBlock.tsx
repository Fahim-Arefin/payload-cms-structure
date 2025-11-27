import React from 'react'
import { CareerPageResourcesBlockType } from '@/types/payloadCustomTypes'
import { CareerResourceSection } from '@/components/custom/career/CareerResources'

type Props = {
  block: CareerPageResourcesBlockType
  params: Record<string, string>
}

function CareerResourcesBlock({ block, params }: Props) {
  return <div>
    <CareerResourceSection data={block}/>
  </div>
}

export default CareerResourcesBlock
