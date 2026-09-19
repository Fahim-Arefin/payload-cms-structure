import WithHashScroller from '@/components/custom/shared/WithHashScroller'
import type { CardBenefitsBlockType } from '@/types/payloadCustomTypes'
import CardBenefitsSection from './components/CardBenefitsSection'

export default function CardBenefitsBlock({ block }: { block: CardBenefitsBlockType }) {
  return (
    <WithHashScroller id={block.sectionSettings?.sectionId} bgColor={null} className="scroll-mt-24">
      <CardBenefitsSection block={block} />
    </WithHashScroller>
  )
}
