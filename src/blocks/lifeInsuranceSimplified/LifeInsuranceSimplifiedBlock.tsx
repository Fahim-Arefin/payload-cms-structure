import InsuranceSection from '@/components/custom/home/InsuranceSection'
import { LifeInsuranceSimplifiedBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LifeInsuranceSimplifiedBlockType
  params: Record<string, string>
}

function LifeInsuranceSimplifiedBlock({ block }: Props) {
  return (
    // <div className="bg-gradient-to-r from-[#FBFFD3] to-[#F8E4C6]">
    <div className="">
      <InsuranceSection lifeInsuranceSimplifiedData={block} />
    </div>
  )
}

export default LifeInsuranceSimplifiedBlock
