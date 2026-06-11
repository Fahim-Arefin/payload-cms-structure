// import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import CodingLanguageImage from './CodingLanguageImage'
// import Marquee from 'react-fast-marquee'

// type Props = {
//   data: CodingLanguageBlockType
// }

// function CodingLanguageImageSection({ data }: Props) {
//   const languages = data?.languageImages?.languages ?? []

//   if (!languages.length) return null

//   return (
//     <Marquee autoFill pauseOnHover speed={35} gradient={false}>
//       <div className="flex items-center gap-[28px] sm:gap-[36px] lg:gap-[48px] xl:gap-[56px] 2xl:gap-[64px] pr-[28px] sm:pr-[36px] lg:pr-[48px] xl:pr-[56px] 2xl:pr-[64px]">
//         {languages.map((image, i) => (
//           <CodingLanguageImage key={i} data={image} />
//         ))}
//       </div>
//     </Marquee>
//   )
// }

// export default CodingLanguageImageSection
import React from 'react'
import Marquee from 'react-fast-marquee'
import CodingLanguageImage from './CodingLanguageImage'
import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'

type LanguageImage1 = NonNullable<
  NonNullable<CodingLanguageBlockType['languageImages']>['languages']
>[number]

type LanguageImage2 = NonNullable<
  NonNullable<CodingLanguageBlockType['languageImages']>['languagesTwo']
>[number]

type Props = {
  languages?: LanguageImage1[] | LanguageImage2[]
  direction?: 'left' | 'right'
  speed?: number
}

function CodingLanguageImageSection({ languages = [], direction = 'left', speed = 35 }: Props) {
  if (!languages.length) return null

  return (
    <Marquee autoFill pauseOnHover speed={speed} gradient={false} direction={direction}>
      <div className="flex items-center gap-[28px] pr-[28px] sm:gap-[36px] sm:pr-[36px] lg:gap-[48px] lg:pr-[48px] xl:gap-[56px] xl:pr-[56px] 2xl:gap-[64px] 2xl:pr-[64px]">
        {languages.map((image, i) => (
          <CodingLanguageImage key={i} data={image} />
        ))}
      </div>
    </Marquee>
  )
}

export default CodingLanguageImageSection
