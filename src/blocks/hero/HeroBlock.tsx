import HeroSectionWrapper from '@/components/custom/home/HeroSectionWrapper'
import { Page } from '@/payload-types'

type Props = {
  block: Extract<Page['layout'][0], { blockType: 'hero' }>
  params: Record<string, string>
}

function HeroBlock({ block, params }: Props) {
  return <HeroSectionWrapper data={block} />
}

export default HeroBlock
