import WSLSSection from '@/components/custom/shared/plans/WSLS'
import { PlanInfoDesign06BlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PlanInfoDesign06BlockType
  params: Record<string, string>
}

function PlanInfoDesign06Block({ block }: Props) {
  return (
    <div>
      <WSLSSection data={block} align={block?.imageOrder === 'left' ? 'left' : 'right'} />
    </div>
  )
}

export default PlanInfoDesign06Block
