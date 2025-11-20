import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
  GLOBAL_LEADERSHIP_TEAM_BLOCK_LABEL,
  GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
} from '@/lib/constants'
import { LeadershipTeam } from '@/payload-types'
import { LeadershipTeamCardBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import LeadershipTeamCardSectionClient from './LeadershipTeamCardSectionClient'
import NoDataFound from '../shared/NoDataFound'

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
      {data && data?.leaders && data?.leaders?.length > 0 ? (
        <LeadershipTeamCardSectionClient leadersData={data} blockData={blockData} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global '${GLOBAL_LEADERSHIP_TEAM_BLOCK_LABEL}' collection data`}
          bgColor={blockData?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default LeadershipTeamCardSection
