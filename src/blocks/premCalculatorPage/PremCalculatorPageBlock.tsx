import CalculatorSection from '@/components/custom/premium-calculator/CalculatorSection'
import { PremCalculatorPageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PremCalculatorPageBlockType
  params: Record<string, string>
}

function PremCalculatorPageBlock({ block, params }: Props) {
  return (
    <div>
      <CalculatorSection block={block} />
    </div>
  )
}

export default PremCalculatorPageBlock
