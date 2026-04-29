import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_NEWS_SLUG_AND_TAG, SAGAR_VIDEOS_SLUG_AND_TAG } from '@/lib/constants'
import { News } from '@/payload-types'
import { SagarVideosBlockType } from '@/types/payloadCustomTypes'
import SagarVideosSectionClient from './SagarVideosSectionClient'
import NoDataFound from '@/components/custom/shared/NoDataFound'

type Props = {
  block: SagarVideosBlockType
}

async function SagarVideosSection({ block }: Props) {
  const data = await getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, SAGAR_VIDEOS_SLUG_AND_TAG)

  return (
    <div>
      {data && data?.newsItems && data?.newsItems?.length > 0 ? (
        <SagarVideosSectionClient newsData={data} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default SagarVideosSection
