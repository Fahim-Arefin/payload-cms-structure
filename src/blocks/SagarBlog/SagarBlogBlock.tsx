import NoDataFound from '@/components/custom/shared/NoDataFound'
import { SAGAR_BLOGS_BLOCK_LABEL } from '@/lib/constants'
import { SagarBlogBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import SagarBlogServer from './components/SagarBlogServer'

type Props = {
  block: SagarBlogBlockType
  params: Record<string, string>
}

function SagarBlogBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <SagarBlogServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${SAGAR_BLOGS_BLOCK_LABEL}” block and check the “Use shared News (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default SagarBlogBlock
