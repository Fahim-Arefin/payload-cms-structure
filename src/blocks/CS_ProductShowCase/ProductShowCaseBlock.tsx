import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProductShowcaseBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CS_ProductShowcaseSection from './components/CS_ProductShowcaseSection'

type Props = {
  block: ProductShowcaseBlockType
  params: Record<string, string>
}
function ProductShowCaseBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
      className="rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px]"
    >
      <CS_ProductShowcaseSection block={block} />
    </WithHashScroller>
  )
}

export default ProductShowCaseBlock
