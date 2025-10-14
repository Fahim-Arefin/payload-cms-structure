import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
  GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
} from '@/lib/constants'
import { LeadershipTeam } from '@/payload-types'
import { LeadershipTeamCardBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import LeadershipTeamCardSectionClient from './LeadershipTeamCardSectionClient'

type Props = {
  blockData: LeadershipTeamCardBlockType
}
async function LeadershipTeamCardSection({ blockData }: Props) {
  const data = await getGlobalCached<LeadershipTeam>(
    GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
    2,
    ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
  )

  return (
    <div>
      {data ? (
        <LeadershipTeamCardSectionClient leadersData={data} blockData={blockData} />
      ) : (
        'No Global Data Found'
      )}
    </div>
  )
}

export default LeadershipTeamCardSection
