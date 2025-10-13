import ShantaLifeIntroSection from '@/components/custom/about-us/ShantaLifeIntroSection'
import { ShantaIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: ShantaIntroBlockType
  params: Record<string, string>
}

function ShantaIntroBlock({ block }: Props) {
  return <ShantaLifeIntroSection data={block} />
}

export default ShantaIntroBlock
