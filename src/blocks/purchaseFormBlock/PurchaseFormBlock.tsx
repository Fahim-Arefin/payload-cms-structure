import PurchaseSection from '@/components/custom/purchase/PurchaseSection'
import { PurchasePageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PurchasePageBlockType
  params: Record<string, string>
}

function PurchaseFormBlock({ block, params }: Props) {
  return (
    <div>
      <PurchaseSection block={block} />
    </div>
  )
}

export default PurchaseFormBlock
