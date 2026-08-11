import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { CS_DeliveryBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CS_DeliveryGrid from './CS_DeliveryGrid'
import CS_DeliveryImage from './CS_DeliveryImage'

type Props = {
  block: CS_DeliveryBlockType
}

function CS_DeliverySection({ block }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[60px]
      "
    >
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      <CS_DeliveryGrid block={block} />
      <CS_DeliveryImage block={block} />
    </div>
  )
}

export default CS_DeliverySection
