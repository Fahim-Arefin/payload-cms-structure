import { LocationBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CompanyLocationLeftImage from './CompanyLocationLeftImage'
import CompanyLocationRightContent from './CompanyLocationRightContent'

type Props = { block: LocationBlockType }

function CompanyLocationGrid({ block }: Props) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 
    gap-10 md:gap-14 lg:gap-28 xl:gap-44 2xl:gap-56"
    >
      {/* left */}
      <CompanyLocationLeftImage block={block} />
      {/* right */}
      <CompanyLocationRightContent block={block} />
    </div>
  )
}

export default CompanyLocationGrid
