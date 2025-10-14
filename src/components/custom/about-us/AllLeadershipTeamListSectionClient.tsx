import { LeadershipTeam } from '@/payload-types'
import { LeadershipTeamListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import { ProfileSection } from '../all-bods/ProfileSection'

type Props = {
  leadersData: LeadershipTeam
  blockData: LeadershipTeamListBlockType
}

function AllLeadershipTeamListSectionClient({ leadersData, blockData }: Props) {
  return (
    <div className="">
      {leadersData?.leaders.map((leader, i) => (
        // <div key={leader.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'} py-10`}>
        <div
          key={leader.id}
          style={{
            backgroundColor:
              (i % 2 === 0 ? blockData?.oddBackgroundColor : blockData?.evenBackgroundColor) || '',
          }}
        >
          <ProfileSection titleColor="#ED7125" data={leader} reverse={i % 2 === 1} />
        </div>
      ))}
    </div>
  )
}

export default AllLeadershipTeamListSectionClient
