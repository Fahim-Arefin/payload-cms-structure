import WithHashScroller from '@/components/custom/shared/WithHashScroller'
import type { CardPrivilegesBlockType } from '@/types/payloadCustomTypes'
import CardPrivilegesSection from './components/CardPrivilegesSection'

export default function CardPrivilegesBlock({
  block,
  anchorKeys = [],
}: {
  block: CardPrivilegesBlockType
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
      <CardPrivilegesSection block={block} />
    </WithHashScroller>
  )
}
