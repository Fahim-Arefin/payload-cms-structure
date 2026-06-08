import { CompanyInfoBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: CompanyInfoBlockType['companyInfoItems'][number]
}

function Info({ data }: Props) {
  return (
    <div className="flex items-center justify-center gap-1">
      {typeof data.icon === 'object' && data?.icon?.url && (
        <div className="relative w-[14px] lg:w-[16px] xl:w-[18px]  aspect-square">
          <Image
            src={data?.icon?.url}
            alt="hero image"
            fill
            className="object-center object-cover"
            sizes="100vw"
            quality={100}
            placeholder="blur"
            blurDataURL={data?.iconBlurDataURL || ''}
          />
        </div>
      )}
      <div></div>
      <div className="text-[#0A1128] font-grift global-info uppercase font-extrabold">
        {data?.text}
      </div>
    </div>
  )
}

export default Info
