import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'
import FounderInfoSection from './FounderInfoSection'
import FounderQuote from './FounderQuote'

type Props = {
  block: FounderQuoteBlockType
}

function FounderQuoteSection({ block }: Props) {
  return (
    <div className="container-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3 xl:gap-6 2xl:gap-24">
        <FounderQuote data={block?.founderQuote} />
        <FounderInfoSection data={block?.founderInfo} />
      </div>
    </div>
  )
}

export default FounderQuoteSection
