import EligibilityCriteria from '@/components/custom/shared/plans/EligibilityCriteria'
import { PlanInfoDesign07BlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PlanInfoDesign07BlockType
  params: Record<string, string>
}

function PlanInfoDesign07Block({ block }: Props) {
  return (
    <div>
      <EligibilityCriteria data={block} image={block?.imageOrder} />
    </div>
  )
}

export default PlanInfoDesign07Block
