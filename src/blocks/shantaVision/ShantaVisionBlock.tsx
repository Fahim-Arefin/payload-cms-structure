import VisionMissionSection from '@/components/custom/about-us/VisionMissionSection'
import { ShantaVisionBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: ShantaVisionBlockType
  params: Record<string, string>
}

function ShantaVisionBlock({ block }: Props) {
  return <VisionMissionSection data={block} />
}

export default ShantaVisionBlock
