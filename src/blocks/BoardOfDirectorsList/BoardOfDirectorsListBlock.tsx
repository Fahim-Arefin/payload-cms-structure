import AllDirectorListSection from '@/components/custom/all-bods/AllDirectorListSection'
import { BoardOfDirectorsListBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: BoardOfDirectorsListBlockType
  params: Record<string, string>
}

function BoardOfDirectorsListBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? <AllDirectorListSection blockData={block} /> : 'Data Not Found'}
    </div>
  )
}

export default BoardOfDirectorsListBlock
