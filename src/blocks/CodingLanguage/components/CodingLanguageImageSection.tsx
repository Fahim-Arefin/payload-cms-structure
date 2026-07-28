// import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import CodingLanguageImage from './CodingLanguageImage'

// type LanguageImage = NonNullable<
//   NonNullable<CodingLanguageBlockType['languageImages']>['languages']
// >[number]

// type Props = {
//   languages?: LanguageImage[]
// }

// const stackPositions = [
//   { x: 9, y: 34 },
//   { x: 20, y: 16 },
//   { x: 31, y: 31 },
//   { x: 42, y: 12 },
//   { x: 53, y: 18 },
//   { x: 66, y: 17 },
//   { x: 82, y: 18 },

//   { x: 22, y: 46 },
//   { x: 40, y: 42 },
//   { x: 53, y: 44 },
//   { x: 66, y: 39 },
//   { x: 77, y: 39 },
//   { x: 90, y: 38 },

//   { x: 14, y: 60 },
//   { x: 34, y: 59 },
//   { x: 45, y: 63 },
//   { x: 62, y: 60 },
//   { x: 76, y: 61 },
//   { x: 88, y: 60 },

//   { x: 9, y: 77 },
//   { x: 19, y: 89 },
//   { x: 32, y: 83 },
//   { x: 47, y: 87 },
//   { x: 60, y: 82 },
//   { x: 72, y: 85 },
//   { x: 83, y: 82 },

//   { x: 28, y: 18 },
//   { x: 49, y: 72 },
//   { x: 69, y: 72 },
//   { x: 92, y: 76 },
// ]

// function CodingLanguageImageSection({ languages = [] }: Props) {
//   if (!languages.length) return null

//   return (
//     <div
//       className="
//         relative mx-auto w-full max-w-[1280px]
//         h-[430px]
//         sm:h-[480px]
//         md:h-[470px]
//         lg:h-[500px]
//         xl:h-[540px]
//         2xl:h-[590px]
//       "
//     >
//       {languages.slice(0, 30).map((language, index) => (
//         <CodingLanguageImage
//           key={index}
//           data={language}
//           index={index}
//           position={stackPositions[index % stackPositions.length]}
//         />
//       ))}
//     </div>
//   )
// }

// export default CodingLanguageImageSection

import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CodingLanguageImage from './CodingLanguageImage'

type LanguageImage = NonNullable<
  NonNullable<CodingLanguageBlockType['languageImages']>['languages']
>[number]

type Props = {
  languages?: LanguageImage[]
}

type Position = {
  x: number
  y: number
}

const MAX_STACK_IMAGES = 25

const stackPositions: Position[] = [
  // Row 1 — 7 images
  { x: 4, y: 28 },
  { x: 18, y: 15 },
  { x: 31, y: 24 },
  { x: 43, y: 11 },
  { x: 55, y: 17 },
  { x: 69, y: 16 },
  { x: 86, y: 20 },

  // Row 2 — 6 images
  { x: 20, y: 42 },
  { x: 34, y: 50 },
  { x: 45, y: 35 },
  { x: 61, y: 42 },
  { x: 75, y: 38 },
  { x: 93, y: 43 },

  // Row 3 — 6 images
  { x: 11, y: 58 },
  // { x: 34, y: 65 },
  { x: 24, y: 65 },
  { x: 50, y: 58 },
  { x: 63, y: 70 },
  { x: 78, y: 61 },
  { x: 91, y: 67 },

  // Row 4 — 6 images
  // { x: 10, y: 81 },
  { x: 6, y: 81 },
  { x: 22, y: 91 },
  { x: 37, y: 84 },
  { x: 53, y: 94 },
  { x: 70, y: 98 },
  { x: 86, y: 83 },
]

function CodingLanguageImageSection({ languages = [] }: Props) {
  const validLanguages = languages.slice(0, MAX_STACK_IMAGES).filter((language) => {
    const stackImage =
      typeof language?.transparentColoredImage === 'object'
        ? language.transparentColoredImage
        : null

    return !!stackImage?.url
  })

  if (!validLanguages.length) return null

  return (
    <div
      className="
        relative mx-auto w-full
        max-w-[560px]
        sm:max-w-[640px]
        md:max-w-[760px]
        lg:max-w-[860px]
        xl:max-w-[960px]
        2xl:max-w-[1040px]
        h-[250px]
        sm:h-[285px]
        md:h-[320px]
        lg:h-[355px]
        xl:h-[390px]
        2xl:h-[420px]
        overflow-visible
      "
    >
      {validLanguages.map((language, index) => (
        <CodingLanguageImage
          key={language?.id ?? index}
          data={language}
          index={index}
          position={stackPositions[index] ?? { x: 50, y: 50 }}
        />
      ))}
    </div>
  )
}

export default CodingLanguageImageSection
