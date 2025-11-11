import React from 'react'
import LocalizedHighlighted from '../LocalizedHighlighted'

type Props = {
  data: {
    title: string
    titleBN: string
    highlightedTitle: string
    highlightedTitleBN: string
  }
}

function OSAP({ data }: Props) {
  return (
    <div className="container-padding bg-[#F6EDDD] global-h1 font-semibold text-[#434342]">
      <LocalizedHighlighted
        textEn={data?.title}
        textBn={data?.titleBN}
        highlightBn={data?.highlightedTitleBN}
        highlightEn={data?.highlightedTitle}
      />
    </div>
  )
}

export default OSAP
