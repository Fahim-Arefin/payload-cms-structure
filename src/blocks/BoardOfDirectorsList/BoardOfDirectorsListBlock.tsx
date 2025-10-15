import AllDirectorListSection from '@/components/custom/all-bods/AllDirectorListSection'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { BoardOfDirectorsListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: BoardOfDirectorsListBlockType
  params: Record<string, string>
}

function BoardOfDirectorsListBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <AllDirectorListSection blockData={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description="In the admin panel, open the “Board of Directors List” block and check the “Use shared Board of Directors (Global)” checkbox."
          bgColor={block?.oddBackgroundColor || ''}
        />
      )}
    </div>
  )
}

export default BoardOfDirectorsListBlock
