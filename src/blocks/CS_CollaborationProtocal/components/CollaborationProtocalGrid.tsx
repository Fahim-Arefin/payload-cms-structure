import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { CS_CollaborationProtocalBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = { block: CS_CollaborationProtocalBlockType }

function CollaborationProtocalGrid({ block }: Props) {
  return (
    <div
      className="grid grid-cols-2 
      gap-y-3 md:gap-y-5 lg:gap-y-6 xl:gap-y-10 2xl:gap-y-12"
    >
      {block?.protocolInfo?.features.map((item, index) => (
        <div
          key={index}
          className="border-l-2 border-[#3E4949] 
        pl-2 md:pl-3 lg:pl-4 xl:pl-6 2xl:pl-8 
        pr-1 lg:pr-2 
        py-1 lg:py-2 
        
        md:ml-6 lg:ml-12 xl:ml-24 2xl:ml-32
        space-y-0.5 md:space-y-1 lg:space-y-2
        "
        >
          <h3 className="font-grift text-[#191C1D] global-p3 font-bold">{item?.title}</h3>
          <div className="font-grift text-[#3E4949] global-p4">
            <LocalizedRichText en={item?.description} bn={item?.description} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CollaborationProtocalGrid
