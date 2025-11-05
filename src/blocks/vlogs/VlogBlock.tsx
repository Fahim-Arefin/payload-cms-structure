import VlogServer from '@/components/custom/news-and-media/VlogServer'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { VLOGS_BLOCK_LABEL } from '@/lib/constants'
import { VlogBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: VlogBlockType
  params: Record<string, string>
}

function VlogBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <VlogServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${VLOGS_BLOCK_LABEL}” block and check the “Use shared Vlogs (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default VlogBlock
