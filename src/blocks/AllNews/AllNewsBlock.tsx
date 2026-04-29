import NoDataFound from '@/components/custom/shared/NoDataFound'
import { ALL_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AllNewsServer from './components/AllNewsServer'

type Props = {
  block: AllNewsBlockType
  params: Record<string, string>
}

function AllNewsBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <AllNewsServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${ALL_NEWS_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default AllNewsBlock
