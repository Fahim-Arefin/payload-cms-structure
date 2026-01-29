import QuoteSection from '@/components/custom/home/QuoteSection'
import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  GLOBAL_FOOTER_SLUG_AND_TAG,
  HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
} from '@/lib/constants'
import { GlobalFooter } from '@/payload-types'
import { PremiumCalculatorBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PremiumCalculatorBlockType
  params: Record<string, string>
}

async function PremiumCalculatorBlock({ block }: Props) {
  const footer = await getGlobalCached<GlobalFooter>(
    GLOBAL_FOOTER_SLUG_AND_TAG,
    1,
    HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
  )

  return (
    <div style={{ backgroundColor: block?.backgroundColor || '' }}>
      <QuoteSection data={block} footerData={footer} homepage />
    </div>
  )
}

export default PremiumCalculatorBlock
