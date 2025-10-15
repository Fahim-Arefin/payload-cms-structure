import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
  GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
} from '@/lib/constants'
import { BoardOfDirector } from '@/payload-types'
import { BoardOfDirectorsListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllDirectorListSectionClient from './AllDirectorListSectionClient'
import NoDataFound from '../shared/NoDataFound'

type Props = {
  blockData: BoardOfDirectorsListBlockType
}

async function AllDirectorListSection({ blockData }: Props) {
  const data = await getGlobalCached<BoardOfDirector>(
    GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
    2,
    BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
  )
  return (
    <div>
      {data ? (
        <AllDirectorListSectionClient directorProfileData={data} blockData={blockData} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description="Please fill up Global 'Board of Directors' collection data"
          bgColor={blockData?.oddBackgroundColor || ''}
        />
      )}
    </div>
  )
}

export default AllDirectorListSection
