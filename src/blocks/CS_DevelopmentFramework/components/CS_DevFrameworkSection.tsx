import SectionHeading02 from '@/components/custom/sagar-ropes-shared/others/SectionHeading02'
import { CS_DevelopmentFrameworkBlockType } from '@/types/payloadCustomTypes'
import CS_DevFrameworkGrid from './CS_DevFrameworkGrid'

type Props = { block: CS_DevelopmentFrameworkBlockType }

function CS_DevFrameworkSection({ block }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[80px]
      "
    >
      <SectionHeading02 data={block?.sectionHeading} align="middle" />
      <CS_DevFrameworkGrid block={block} />
    </div>
  )
}

export default CS_DevFrameworkSection
