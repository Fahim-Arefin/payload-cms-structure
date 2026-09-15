import SectionHeading02 from '@/components/custom/sagar-ropes-shared/others/SectionHeading02'
import { ProductShowcaseBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CS_ProductShowcaseGrid from './CS_ProductShowcaseGrid'

type Props = {
  block: ProductShowcaseBlockType
}

function CS_ProductShowcaseSection({ block }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[80px]
      "
    >
      <SectionHeading02 data={block?.sectionHeading} align="middle" />
      <CS_ProductShowcaseGrid block={block} />
    </div>
  )
}

export default CS_ProductShowcaseSection
