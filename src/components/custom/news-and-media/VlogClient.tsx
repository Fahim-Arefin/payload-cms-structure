import { GlobalVlog } from '@/payload-types'
import { VlogBlockType } from '@/types/payloadCustomTypes'
import LocalizedText from '../shared/LocalizedText'
import HashScroller from './HashScroller'
import VlogCard from './VlogCard'
import NoDataFound from '../shared/NoDataFound'
import { GLOBAL_VLOGS_BLOCK_LABEL } from '@/lib/constants'

type Props = {
  block: VlogBlockType
  data: GlobalVlog
}

function VlogClient({ block, data }: Props) {
  const filteredVlogs = data?.vlogs?.filter((item) => item?.isHide !== true)
  return (
    <>
      {filteredVlogs && filteredVlogs?.length > 0 ? (
        <div
          id={block?.sectionId}
          style={{
            backgroundColor: block?.backgroundColor || '',
          }}
        >
          <HashScroller vlogSectionId={block?.sectionId} />
          <div
            className={`px-5 
           md:px-24 
           lg:px-[130px]   
           xl:px-[200px]  
           2xl:px-[300px]
            pt-[30px] md:pt-[40px] lg:pt-[50px] xl:pt-[60px] 2xl:pt-[70px]
            pb-12 md:pb-24 lg:pb-[110px] xl:pb-[100px] 2xl:pb-[150px]`}
          >
            <div className="flex justify-center md:justify-end items-center mb-8 md:mb-12">
              <h1 className="global-h1 font-semibold uppercase">
                <LocalizedText en={block?.title} bn={block?.titleBN} />
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-2 lg:gap-6">
              {filteredVlogs?.map((item, i) => (
                <VlogCard data={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NoDataFound
          message="No Visible Vlogs Found"
          description={`In the admin panel, open the Global “${GLOBAL_VLOGS_BLOCK_LABEL}” collection and give some Vlogs data Or Unhide Vlogs if there is any vlogs.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </>
  )
}

export default VlogClient
