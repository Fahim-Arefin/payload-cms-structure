import React from 'react'
import { LearningMediaSectionBlockType } from '@/types/payloadCustomTypes'
import LearningMediaSection from '@/components/custom/learning/LearningPlatformSection'

type Props = {
  block: LearningMediaSectionBlockType
  params: Record<string, string>
}

function LearningPlatformBlock({ block, params }: Props) {
  return (
    <div>
      <LearningMediaSection block={block} />
    </div>
  )
}

export default LearningPlatformBlock
