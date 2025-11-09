import CareerSwiper from '@/components/custom/career/CareerSwiper'
import { CareerPageSwiperBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CareerPageSwiperBlockType
  params: Record<string, string>
}

function CareerSwiperBlock({block, params}: Props) {
  return <div>
    <CareerSwiper careerCards={block}/>
  </div>
}

export default CareerSwiperBlock
