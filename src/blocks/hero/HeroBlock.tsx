import HeroSectionWrapper from '@/components/custom/home/HeroSectionWrapper'
import { HeroBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: HeroBlockType
  params: Record<string, string>
}

function HeroBlock({ block }: Props) {
  return <HeroSectionWrapper data={block} />
}

export default HeroBlock
