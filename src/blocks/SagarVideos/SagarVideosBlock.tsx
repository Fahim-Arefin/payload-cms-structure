import NoDataFound from '@/components/custom/shared/NoDataFound'
import { SAGAR_VIDEOS_BLOCK_LABEL } from '@/lib/constants'
import { SagarVideosBlockType } from '@/types/payloadCustomTypes'
import SagarVideosSection from './components/SagarVideosSection'

type Props = {
  block: SagarVideosBlockType
  params: Record<string, string>
}

function SagarVideosBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <SagarVideosSection block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, open the “${SAGAR_VIDEOS_BLOCK_LABEL}” block and check the “Use shared News (Global)” checkbox.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default SagarVideosBlock
