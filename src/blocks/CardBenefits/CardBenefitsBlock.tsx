import WithHashScroller from '@/components/custom/shared/WithHashScroller'
import type { CardBenefitsBlockType } from '@/types/payloadCustomTypes'
import CardBenefitsSection from './components/CardBenefitsSection'

export default function CardBenefitsBlock({
  block,
  anchorKeys = [],
}: {
  block: CardBenefitsBlockType
  anchorKeys?: string[]
}) {
  return (
    <WithHashScroller
      id={block.sectionSettings?.sectionId}
      bgColor={null}
      className="relative scroll-mt-24 bg-[#1E1E1E]"
    >
      {anchorKeys.map((key) => (
        <span
          key={key}
          id={key}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-px w-px scroll-mt-24"
        />
      ))}
      <CardBenefitsSection block={block} />
    </WithHashScroller>
  )
}
