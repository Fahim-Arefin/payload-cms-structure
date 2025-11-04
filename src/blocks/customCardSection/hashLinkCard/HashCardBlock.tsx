'use client'
import React from 'react'
import GridDesign from '../GridDesign'
import CarouselDesign from '../CarouselDesign'
import { CustomCardSectionBlockType, HashlinkBlock } from '@/types/payloadCustomTypes'
import LevelUpCard from '@/components/custom/support/LevelUpCard'

type Props = {
  block: CustomCardSectionBlockType
  data: HashlinkBlock
  displayAsCarousel: CustomCardSectionBlockType['displayAsCarousel']
}

function HashCardBlock({ block, data, displayAsCarousel }: Props) {
  if (!displayAsCarousel)
    return (
      <GridDesign data={data} block={block} renderItem={(item) => <LevelUpCard item={item} />} />
    )

  return (
    <CarouselDesign block={block} data={data} renderItem={(item) => <LevelUpCard item={item} />} />
  )
}

export default HashCardBlock
