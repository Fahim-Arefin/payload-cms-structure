import WhyChooseUsContent from '@/components/custom/home/WhyChooseUsContent'
import { WhyChooseUsBlockType } from '@/types/payloadCustomTypes'
import InnerSearchbar from './InnerSearchbar'

type Props = {
  block: WhyChooseUsBlockType
  params: Record<string, string>
}

function WhyChooseUsBlock({ block }: Props) {
  return (
    <>
      {block?.useSearchBar && <InnerSearchbar bgColor={block?.backgroundColor || ''} />}
      <WhyChooseUsContent whyChooseUsData={block} />
    </>
  )
}

export default WhyChooseUsBlock
