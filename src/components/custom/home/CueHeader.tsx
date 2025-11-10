import React from 'react'
import LocalizedText from '../shared/LocalizedText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

type Props = {
  data: {
    sectionHeading: string
    sectionHeadingBN: string
    sectionTitle: string
    highlighedSectionTitle: string
    sectionTitleBN: string
    highlighedSectionTitleBN: string
    description: string
    descriptionBN: string
    cards: {
      icon: string
      title: string
      titleBN: string
      subtitle?: string
      subtitleBN?: string
      description: string
      descriptionBN: string
      image: string
      link?: string
      moreItem?: {
        description: string
        descriptionBN: string
      }[]
    }[]
  }
  bg?: string
}

function CueHeader({ data }: Props) {
  return (
    <div
      className={`space-y-1 md:space-y-2 lg:space-y-3 font-avenir text-center
    ${data?.cards?.length > 3 ? ' mb-4 md:mb-6 lg:mb-[70px] xl:mb-20 ' : ' mb-4 md:mb-6  lg:mb-8 2xl:mb-10'}`}
    >
      <h2 className="global-h4 uppercase text-[#434342]">
        <LocalizedText en={data?.sectionHeading} bn={data?.sectionHeadingBN} />
      </h2>
      <h1 className="global-h1 font-semibold uppercase text-[#434342]">
        {/* On Your <span className="md:text-[#ED7125]">Terms</span> */}
        <LocalizedHighlighted
          textEn={data?.sectionTitle}
          textBn={data?.sectionTitleBN}
          highlightEn={data?.highlighedSectionTitle}
          highlightBn={data?.highlighedSectionTitleBN}
        />
      </h1>
      <p className="global-p1 text-[#434342] font-light w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto text-center">
        <LocalizedText en={data?.description} bn={data?.descriptionBN} />
      </p>
    </div>
  )
}

export default CueHeader
