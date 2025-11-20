import { BoardOfDirector } from '@/payload-types'
import { BoardOfDirectorsListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import { ProfileSection } from './ProfileSection'

type Props = {
  directorProfileData: BoardOfDirector
  blockData: BoardOfDirectorsListBlockType
}

function AllDirectorListSectionClient({ directorProfileData, blockData }: Props) {
  return (
    <div className="">
      {directorProfileData?.directors.map((director, i) => (
        // <div key={director.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'} py-10`}>
        <div
          key={director.id}
          style={{
            backgroundColor:
              (i % 2 === 0 ? blockData?.oddBackgroundColor : blockData?.evenBackgroundColor) || '',
          }}
        >
          <ProfileSection
            titleColor="#ED7125"
            data={director}
            reverse={i % 2 === 1}
            block={blockData}
          />
        </div>
      ))}
    </div>
  )
}

export default AllDirectorListSectionClient
