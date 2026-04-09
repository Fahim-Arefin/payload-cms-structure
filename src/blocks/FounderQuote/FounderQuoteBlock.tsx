import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'

import FounderQuoteSection from './components/FounderQuoteSection'

type Props = {
  block: FounderQuoteBlockType
  params: Record<string, string>
}

function FounderQuoteBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding">
        <IntroSectionDesign04 block={block} position="center" />
        <FounderQuoteSection block={block} />
      </div>
    </WithHashScroller>
  )
}

export default FounderQuoteBlock
