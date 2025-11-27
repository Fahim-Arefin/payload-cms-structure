import QuoteSection from '@/components/custom/home/QuoteSection'
import { PremiumCalculatorBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PremiumCalculatorBlockType
  params: Record<string, string>
}

function PremiumCalculatorBlock({ block }: Props) {
  return (
    <div style={{ backgroundColor: block?.backgroundColor || '' }}>
      <QuoteSection data={block} />
    </div>
  )
}

export default PremiumCalculatorBlock
