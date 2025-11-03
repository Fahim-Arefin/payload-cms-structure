import LeadershipTeamCardSection from '@/components/custom/about-us/LeadershipTeamCardSection'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_LABEL } from '@/lib/constants'
import { LeadershipTeamCardBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LeadershipTeamCardBlockType
  params: Record<string, string>
}

function LeadershipTeamCardBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <LeadershipTeamCardSection blockData={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_LABEL}” block and check the “Use shared Leadership Team (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default LeadershipTeamCardBlock
