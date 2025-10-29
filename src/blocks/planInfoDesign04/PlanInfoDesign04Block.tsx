import MatricsSection from '@/components/custom/shared/plans/MatricsSection'
import { PlanInfoDesign04BlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PlanInfoDesign04BlockType
  params: Record<string, string>
}
function PlanInfoDesign04Block({ block }: Props) {
  return (
    <div>
      <MatricsSection data={block} />
    </div>
  )
}

export default PlanInfoDesign04Block
