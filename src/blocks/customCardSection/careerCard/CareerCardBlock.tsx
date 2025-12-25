'use client'
import { CareerCardBlockType, CustomCardSectionBlockType } from '@/types/payloadCustomTypes'
import CarouselDesign from '../CarouselDesign'
import GridDesign from '../GridDesign'
import CareerCardItem from './CareerCardItem'

type Props = {
  block: CustomCardSectionBlockType
  data: CareerCardBlockType
  displayAsCarousel: CustomCardSectionBlockType['displayAsCarousel']
}

function CareerCardBlock({ block, data, displayAsCarousel }: Props) {
  if (!displayAsCarousel)
    return (
      <GridDesign data={data} block={block} renderItem={(item) => <CareerCardItem data={item} />} />
    )

  return (
    <CarouselDesign
      block={block}
      data={data}
      renderItem={(item) => <CareerCardItem data={item} />}
    />
  )
}

export default CareerCardBlock
