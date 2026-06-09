import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CodingLanguageImage from './CodingLanguageImage'

type Props = {
  data: CodingLanguageBlockType
}

function CodingLanguageImageSection({ data }: Props) {
  return (
    <div className="flex gap-12">
      {data?.languageImages?.languages?.map((image, i) => (
        <CodingLanguageImage key={i} data={image} />
      ))}
    </div>
  )
}

export default CodingLanguageImageSection
