import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { News } from '@/payload-types'
import { AllNewsBlockType } from '@/types/payloadCustomTypes'
import AllNewsClientCard from './AllNewsClientCard'
import Sidebar from './Sidebar'

type Props = {
  block: AllNewsBlockType
  data: News
}

function AllNewsClient({ block, data }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding ">
        <div
          className="grid grid-cols-1 lg:grid-cols-3
        gap-4 xl:gap-8 2xl:gap-14
        "
        >
          <div
            className="col-span-1 lg:col-span-2 
          space-y-4 xl:space-y-8 2xl:space-y-14
          "
          >
            {data?.newsItems &&
              data?.newsItems?.length > 0 &&
              data?.newsItems?.map((item, index) => (
                <AllNewsClientCard key={index} item={item} block={block} />
              ))}
          </div>
          <div className="col-span-1 lg:col-span-1 border border-black">
            <Sidebar />
          </div>
        </div>
      </div>
    </WithHashScroller>
  )
}

export default AllNewsClient
