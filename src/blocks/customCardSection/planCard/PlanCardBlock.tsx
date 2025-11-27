'use client'
import { CustomCardSectionBlockType, PlanBlock } from '@/types/payloadCustomTypes'
import React from 'react'
import GridDesign from '../GridDesign'
import CarouselDesign from '../CarouselDesign'
import AllPlanCard from '@/components/custom/shared/plans/AllPlanCard'

type Props = {
  block: CustomCardSectionBlockType
  data: PlanBlock
  displayAsCarousel: CustomCardSectionBlockType['displayAsCarousel']
}

function PlanCardBlock({ block, data, displayAsCarousel }: Props) {
  if (!displayAsCarousel)
    return (
      <GridDesign data={data} block={block} renderItem={(item) => <AllPlanCard data={item} />} />
    )

  return (
    <CarouselDesign block={block} data={data} renderItem={(item) => <AllPlanCard data={item} />} />
  )
}

export default PlanCardBlock
