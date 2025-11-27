import LocalizedString from '@/components/custom/shared/LocalizedString'
import { LINK_BUTTON_SLUG_AND_TAG } from '@/lib/constants'
import { pageHref } from '@/lib/utils'
import { CorporateInfoBlockType } from '@/types/payloadCustomTypes'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

// Narrow the union to the brochure-button block type
type LinkButtonData = Extract<
  NonNullable<CorporateInfoBlockType['resourceButtons']>[number],
  { blockType: typeof LINK_BUTTON_SLUG_AND_TAG }
>

type Props = { data: LinkButtonData }

function LinkButtonBlock({ data }: Props) {
  return (
    <Link
      href={pageHref(data?.buttonLink)}
      className="capitalize text-[#ED7125] underline hover:text-[#d65a1a] transition-colors font-medium flex items-center gap-1 
                    text-[10px] md:text-[12px] lg:text-[14px] xl:text-[14px]"
    >
      <LocalizedString en={data?.buttonText} bn={data?.buttonTextBN} />
      <ArrowUpRight size={14} className="inline-block" />
    </Link>
  )
}

export default LinkButtonBlock
