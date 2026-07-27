import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CodingLanguageImage from './CodingLanguageImage'

type LanguageImage = NonNullable<
  NonNullable<CodingLanguageBlockType['languageImages']>['languages']
>[number]

type Props = {
  languages?: LanguageImage[]
}

const stackPositions = [
  { x: 9, y: 34 },
  { x: 20, y: 16 },
  { x: 31, y: 31 },
  { x: 42, y: 12 },
  { x: 53, y: 18 },
  { x: 66, y: 17 },
  { x: 82, y: 18 },

  { x: 22, y: 46 },
  { x: 40, y: 42 },
  { x: 53, y: 44 },
  { x: 66, y: 39 },
  { x: 77, y: 39 },
  { x: 90, y: 38 },

  { x: 14, y: 60 },
  { x: 34, y: 59 },
  { x: 45, y: 63 },
  { x: 62, y: 60 },
  { x: 76, y: 61 },
  { x: 88, y: 60 },

  { x: 9, y: 77 },
  { x: 19, y: 89 },
  { x: 32, y: 83 },
  { x: 47, y: 87 },
  { x: 60, y: 82 },
  { x: 72, y: 85 },
  { x: 83, y: 82 },

  { x: 28, y: 18 },
  { x: 49, y: 72 },
  { x: 69, y: 72 },
  { x: 92, y: 76 },
]

function CodingLanguageImageSection({ languages = [] }: Props) {
  if (!languages.length) return null

  return (
    <div
      className="
        relative mx-auto w-full max-w-[1280px]
        h-[430px]
        sm:h-[480px]
        md:h-[470px]
        lg:h-[500px]
        xl:h-[540px]
        2xl:h-[590px]
      "
    >
      {languages.slice(0, 30).map((language, index) => (
        <CodingLanguageImage
          key={index}
          data={language}
          index={index}
          position={stackPositions[index % stackPositions.length]}
        />
      ))}
    </div>
  )
}

export default CodingLanguageImageSection
