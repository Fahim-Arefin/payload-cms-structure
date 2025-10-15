import LeadershipTeamCardSection from '@/components/custom/about-us/LeadershipTeamCardSection'
import NoDataFound from '@/components/custom/shared/NoDataFound'
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
          description="In the admin panel, open the “Leadership Team Card” block and check the “Use shared Leadership Team (Global)” checkbox."
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default LeadershipTeamCardBlock
