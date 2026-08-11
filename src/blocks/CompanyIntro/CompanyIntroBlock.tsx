import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
import CompanyIntroSection from './CompanyIntroSection'

type Props = {
  block: CompanyIntroBlockType
  params: Record<string, string>
}

function CompanyIntroBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CompanyIntroSection block={block} />
    </WithHashScroller>
  )
}

export default CompanyIntroBlock
