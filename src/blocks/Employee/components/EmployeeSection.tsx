import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { EmployeeBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import EmployeeGrid from './EmployeeGrid'

type Props = {
  block: EmployeeBlockType
}

function EmployeeSection({ block }: Props) {
  return (
    <div className="container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      <EmployeeGrid block={block} />
    </div>
  )
}

export default EmployeeSection
