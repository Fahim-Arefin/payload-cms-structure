import DirectorCardSection from '@/components/custom/about-us/DirectorCardSection'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { ABOUT_US_PAGE_BOD_CARD_BLOCK_LABEL } from '@/lib/constants'
import { BoardOfDirectorsCardBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: BoardOfDirectorsCardBlockType
  params: Record<string, string>
}

async function BoardOfDirectorsCardBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <DirectorCardSection blockData={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${ABOUT_US_PAGE_BOD_CARD_BLOCK_LABEL}” block and check the “Use shared Board of Directors (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default BoardOfDirectorsCardBlock
