import WhyChooseUsContent from '@/components/custom/home/WhyChooseUsContent'
import { WhyChooseUsBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: WhyChooseUsBlockType
  params: Record<string, string>
}

function WhyChooseUsBlock({ block }: Props) {
  return <WhyChooseUsContent whyChooseUsData={block} />
}

export default WhyChooseUsBlock
