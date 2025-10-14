import AllLeadershipTeamListSection from '@/components/custom/about-us/AllLeadershipTeamListSection'
import { LeadershipTeamListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LeadershipTeamListBlockType
  params: Record<string, string>
}

function LeadershipTeamListBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? <AllLeadershipTeamListSection blockData={block} /> : 'Data Not Found'}
    </div>
  )
}

export default LeadershipTeamListBlock
