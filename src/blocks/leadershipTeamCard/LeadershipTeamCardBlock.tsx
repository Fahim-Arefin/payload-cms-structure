import LeadershipTeamCardSection from '@/components/custom/about-us/LeadershipTeamCardSection'
import { LeadershipTeamCardBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LeadershipTeamCardBlockType
  params: Record<string, string>
}

function LeadershipTeamCardBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? <LeadershipTeamCardSection blockData={block} /> : 'Data Not Found'}
    </div>
  )
}

export default LeadershipTeamCardBlock
