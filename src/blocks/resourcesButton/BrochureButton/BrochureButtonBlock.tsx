import GlobalButton from '@/components/custom/shared/GlobalButton'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import { CorporateInfoBlockType } from '@/types/payloadCustomTypes'
import { BROCHURE_BUTTON_SLUG_AND_TAG } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

// Narrow the union to the brochure-button block type
type BrochureButtonData = Extract<
  NonNullable<CorporateInfoBlockType['resourceButtons']>[number],
  { blockType: typeof BROCHURE_BUTTON_SLUG_AND_TAG }
>

type Props = { data: BrochureButtonData }

function BrochureButtonBlock({ data }: Props) {
  // brochurePDF can be populated object (with url) or just an ID string
  const href =
    (typeof data.brochurePDF === 'object' && data.brochurePDF?.url) ||
    (typeof data.brochurePDF === 'string' ? `/media/${data.brochurePDF}` : '#')

  const hasPdf = href && href !== '#'

  if (!hasPdf) return null

  return (
    <Link href={href} target="_blank" prefetch={false}>
      <GlobalButton variant={data?.style ?? 'primary'} text="" size="medium">
        <LocalizedString en={data.label} bn={data.labelBN} />
      </GlobalButton>
    </Link>
  )
}

export default BrochureButtonBlock
