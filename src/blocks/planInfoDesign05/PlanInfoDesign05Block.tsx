import BankSection from '@/components/custom/pay-premium/BankSection'
import { PlanInfoDesign05BlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PlanInfoDesign05BlockType
  params: Record<string, string>
}

function PlanInfoDesign05Block({ block }: Props) {
  return (
    <div>
      <BankSection
        data={block}
        align={block?.imageOrder === 'left' ? 'left' : 'right'}
        bgColor={block?.backgroundColor || ''}
      />
    </div>
  )
}

export default PlanInfoDesign05Block
