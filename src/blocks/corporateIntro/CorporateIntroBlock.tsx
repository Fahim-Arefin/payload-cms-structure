import CorporateHighlight from '@/components/custom/corporate/CorporateHighlights'
import { CorporateIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CorporateIntroBlockType
  params: Record<string, string>
}

function CorporateIntroBlock({ block }: Props) {
  return (
    <div>
      <CorporateHighlight highlightsData={block} />
    </div>
  )
}

export default CorporateIntroBlock
