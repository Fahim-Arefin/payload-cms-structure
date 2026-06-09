import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: CodingLanguageBlockType['languageImages']['languages'][number]
}

function CodingLanguageImage({ data }: Props) {
  return (
    <div className="relative w-[160px] aspect-[1/1] border border-black">
      {typeof data?.transparentNormalImage === 'object' && data?.transparentNormalImage?.url && (
        <Image
          src={data?.transparentNormalImage?.url}
          alt="Normal language image"
          fill
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL={data?.transparentNormalImageBlurDataURL || ''}
          className="w-full h-full"
        />
      )}
    </div>
  )
}

export default CodingLanguageImage
