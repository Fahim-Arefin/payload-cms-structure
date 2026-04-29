import NoDataFound from '@/components/custom/shared/NoDataFound'
import { SINGLE_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { SingleNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import SingleNewsServer from './components/SingleNewsServer'

type Props = {
  block: SingleNewsBlockType
  params: Record<string, string>
}

function SignleNewsBlock({ block, params }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <SingleNewsServer block={block} id={params?.slug} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${SINGLE_NEWS_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default SignleNewsBlock
