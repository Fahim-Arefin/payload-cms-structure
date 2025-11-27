import AllLeadershipTeamListSection from '@/components/custom/about-us/AllLeadershipTeamListSection'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL } from '@/lib/constants'
import { LeadershipTeamListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LeadershipTeamListBlockType
  params: Record<string, string>
}

function LeadershipTeamListBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <AllLeadershipTeamListSection blockData={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL}” block and check the “Use shared Leadership Team (Global)” checkbox.`}
          bgColor={block?.oddBackgroundColor || ''}
        />
      )}
    </div>
  )
}

export default LeadershipTeamListBlock
