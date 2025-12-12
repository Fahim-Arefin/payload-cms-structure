import { HeroSmallBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import HeroSmallClient from './HeroSmallClient'

type Props = {
  block: HeroSmallBlockType
  params: Record<string, string>
}

function HeroSmallBlock({ block }: Props) {
  return <HeroSmallClient data={block} />
}

export default HeroSmallBlock
