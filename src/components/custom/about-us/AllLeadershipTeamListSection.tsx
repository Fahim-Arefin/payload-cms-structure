import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
} from '@/lib/constants'
import { LeadershipTeam } from '@/payload-types'
import { LeadershipTeamListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllLeadershipTeamListSectionClient from './AllLeadershipTeamListSectionClient'

type Props = {
  blockData: LeadershipTeamListBlockType
}

async function AllLeadershipTeamListSection({ blockData }: Props) {
  const data = await getGlobalCached<LeadershipTeam>(
    GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
    2,
    LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
  )
  return (
    <div>
      {data ? (
        <AllLeadershipTeamListSectionClient leadersData={data} blockData={blockData} />
      ) : (
        'No Global Data Found'
      )}
    </div>
  )
}

export default AllLeadershipTeamListSection
