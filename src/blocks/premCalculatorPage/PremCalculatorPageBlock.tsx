import QuoteSection from '@/components/custom/home/QuoteSection'
import CalculatorSection from '@/components/custom/premium-calculator/CalculatorSection'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_FOOTER_SLUG_AND_TAG, PREM_CALC_PAGE_SLUG_AND_TAG } from '@/lib/constants'
import { GlobalFooter } from '@/payload-types'
import { PremCalculatorPageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PremCalculatorPageBlockType
  params: Record<string, string>
}

async function PremCalculatorPageBlock({ block, params }: Props) {
  const footer = await getGlobalCached<GlobalFooter>(
    GLOBAL_FOOTER_SLUG_AND_TAG,
    1,
    PREM_CALC_PAGE_SLUG_AND_TAG,
  )

  return (
    // <div id={block?.sectionId}>
    //   <CalculatorSection block={block} footerData={footer} />
    // </div>
    <div id={block?.sectionId} style={{ backgroundColor: '#FFF' }}>
      <QuoteSection data={block} footerData={footer} homepage={false} />
    </div>
  )
}

export default PremCalculatorPageBlock
