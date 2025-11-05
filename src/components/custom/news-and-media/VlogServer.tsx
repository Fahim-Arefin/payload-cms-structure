import { VlogBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import VlogClient from './VlogClient'
import NoDataFound from '../shared/NoDataFound'
import {
  GLOBAL_VLOGS_BLOCK_LABEL,
  GLOBAL_VLOGS_SLUG_AND_TAG,
  VLOGS_SLUG_AND_TAG,
} from '@/lib/constants'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GlobalVlog } from '@/payload-types'

type Props = {
  block: VlogBlockType
}

async function VlogServer({ block }: Props) {
  const data = await getGlobalCached<GlobalVlog>(GLOBAL_VLOGS_SLUG_AND_TAG, 2, VLOGS_SLUG_AND_TAG)
  return (
    <div>
      {data ? (
        <VlogClient data={data} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_VLOGS_BLOCK_LABEL} collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default VlogServer
