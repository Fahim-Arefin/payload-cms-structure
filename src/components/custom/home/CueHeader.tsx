import { FeaturedPlansBlock } from '@/types/payloadCustomTypes'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: FeaturedPlansBlock
}

function CueHeader({ data }: Props) {
  return (
    <div className="space-y-1 md:space-y-2 lg:space-y-3 font-avenir text-center">
      {/* <h2 className="global-h4 uppercase text-[#434342]">
        {data?.heading}
      </h2> */}
      <LocalizedText
        as="h2"
        className="global-h4 uppercase text-[#434342]"
        en={data?.heading}
        bn={data?.headingBN}
      />

      {/* <h1 className="global-h1 font-semibold uppercase text-[#434342]">
        {highlightText(data?.title || '', data?.highlightedText || '', {
          highlightClassName: 'text-[#ED7125]',
          all: false,
        })}
      </h1> */}
      <LocalizedHighlighted
        as="h1"
        className="global-h1 font-semibold uppercase text-[#434342]"
        textEn={data?.title}
        textBn={data?.titleBN}
        highlightEn={data?.highlightedText}
        highlightBn={data?.highlightedTextBN}
        highlightClassName="text-[#ED7125]"
      />
      {/* <p className="global-p1 text-[#434342] font-light w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto text-center">
        {data?.description}
      </p> */}
      <LocalizedText
        as="p"
        className="global-p1 text-[#434342] font-light w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto text-center"
        en={data?.description}
        bn={data?.descriptionBN}
      />
    </div>
  )
}

export default CueHeader
