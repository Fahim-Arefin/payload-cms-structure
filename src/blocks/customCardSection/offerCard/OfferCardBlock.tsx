'use client'
import { CustomCardSectionBlockType, OfferBlock } from '@/types/payloadCustomTypes'
import React from 'react'
import GridDesign from '../GridDesign'
import CarouselDesign from '../CarouselDesign'
import OfferCard2 from '@/components/custom/shared/plans/OfferCard2'

type Props = {
  block: CustomCardSectionBlockType
  data: OfferBlock
  displayAsCarousel: CustomCardSectionBlockType['displayAsCarousel']
}

function OfferCardBlock({ block, data, displayAsCarousel }: Props) {
  if (!displayAsCarousel)
    return (
      <GridDesign data={data} block={block} renderItem={(item) => <OfferCard2 data={item} />} />
    )

  return (
    <CarouselDesign block={block} data={data} renderItem={(item) => <OfferCard2 data={item} />} />
  )
}

export default OfferCardBlock
