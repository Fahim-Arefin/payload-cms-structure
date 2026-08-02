import { CS_CollaborationProtocalBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = { block: CS_CollaborationProtocalBlockType }

function CollaborationProtocalImage({ block }: Props) {
  return (
    <div
      className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
               w-full aspect-[1200/425] "
    >
      {typeof block?.protocolInfo?.image === 'object' && block?.protocolInfo?.image?.url && (
        <Image
          fill
          src={block?.protocolInfo?.image?.url}
          alt={'Feature Icon'}
          className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
          quality={100}
          placeholder="blur"
          blurDataURL={block?.protocolInfo?.imageBlurDataURL || ''}
        />
      )}
    </div>
  )
}

export default CollaborationProtocalImage
