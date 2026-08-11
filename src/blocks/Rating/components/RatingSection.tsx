import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { RatingBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import RatingFormSection from './RatingFormSection'

type Props = { block: RatingBlockType }

function RatingSection({ block }: Props) {
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
      <RatingFormSection block={block} />
    </div>
  )
}

export default RatingSection
