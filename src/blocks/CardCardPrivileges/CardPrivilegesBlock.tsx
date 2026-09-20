import WithHashScroller from '@/components/custom/shared/WithHashScroller'
import type { CardPrivilegesBlockType } from '@/types/payloadCustomTypes'
import CardPrivilegesSection from './components/CardPrivilegesSection'

export default function CardPrivilegesBlock({ block }: { block: CardPrivilegesBlockType }) {
  return (
    <WithHashScroller
      id={block.sectionSettings?.sectionId}
      bgColor={null}
      className="scroll-mt-24 bg-[#1E1E1E]"
    >
      <CardPrivilegesSection block={block} />
    </WithHashScroller>
  )
}
