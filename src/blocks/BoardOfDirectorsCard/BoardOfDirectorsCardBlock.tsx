import DirectorCardSection from '@/components/custom/about-us/DirectorCardSection'
import { BoardOfDirectorsCardBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: BoardOfDirectorsCardBlockType
  params: Record<string, string>
}

async function BoardOfDirectorsCardBlock({ block }: Props) {
  return (
    <div>{block?.useSharedData ? <DirectorCardSection blockData={block} /> : 'Data Not Found'}</div>
  )
}

export default BoardOfDirectorsCardBlock
