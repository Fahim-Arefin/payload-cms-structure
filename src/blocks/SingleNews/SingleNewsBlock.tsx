import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { SINGLE_NEWS_SLUG_AND_TAG } from '@/lib/constants'
import { SingleNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import SingleNewServer from './components/SingleNewServer'

type Props = {
  block: SingleNewsBlockType
  params: Record<string, string>
}

const SingleNewsBlock = ({ block, params }: Props) => {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={bgColor}
      className="rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px] overflow-hidden"
    >
      {block?.sharedDataSettings?.useSharedData ? (
        <SingleNewServer block={block} id={params?.slug} />
      ) : (
        <NoDataFound
          widthHeight="min-h-[500px]"
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${SINGLE_NEWS_SLUG_AND_TAG}” block and check the checkbox.`}
          bgColor={bgColor}
        />
      )}
    </WithHashScroller>
  )
}

export default SingleNewsBlock
