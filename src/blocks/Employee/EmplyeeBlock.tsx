import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { EmployeeBlockType } from '@/types/payloadCustomTypes'
import EmployeeSection from './components/EmployeeSection'

type Props = {
  block: EmployeeBlockType
  params: Record<string, string>
}

function EmplyeeBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <EmployeeSection block={block} />
    </WithHashScroller>
  )
}

export default EmplyeeBlock
