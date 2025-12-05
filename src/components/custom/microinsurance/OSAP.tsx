import React from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { MicroinsuranceServiceBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: MicroinsuranceServiceBlockType
}

function OSAP({ data }: Props) {
  
  return (
    <div className="container-padding bg-[#F6EDDD] global-h1 font-semibold text-[#434342]">
      <LocalizedHighlighted
        textEn={data?.heading}
        textBn={data?.headingBN}
        highlightBn={data?.highlightedText}
        highlightEn={data?.highlightedTextBN}
        highlightClassName="text-[#ED7125]"
      />
    </div>
  )
}

export default OSAP
