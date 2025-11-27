import ProtectionSection from '@/components/custom/shared/plans/ProtectionSection'
import { PlanInfoDesign03BlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PlanInfoDesign03BlockType
  params: Record<string, string>
}

function PlanInfoDesign03Block({ block }: Props) {
  return (
    <div>
      <ProtectionSection data={block} align={block?.imageOrder === 'left' ? 'left' : 'right'} />
    </div>
  )
}

export default PlanInfoDesign03Block
