import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
  GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
} from '@/lib/constants'
import { BoardOfDirector } from '@/payload-types'
import DirectorCardSectionClient from './DirectorCardSectionClient'
import { BoardOfDirectorsCardBlockType } from '@/types/payloadCustomTypes'

type Props = {
  blockData: BoardOfDirectorsCardBlockType
}

async function DirectorCardSection({ blockData }: Props) {
  const data = await getGlobalCached<BoardOfDirector>(
    GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
    2,
    ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
  )

  return (
    <div>
      {data ? (
        <DirectorCardSectionClient directorProfileData={data} blockData={blockData} />
      ) : (
        'No Global Data Found'
      )}
    </div>
  )
}

export default DirectorCardSection
