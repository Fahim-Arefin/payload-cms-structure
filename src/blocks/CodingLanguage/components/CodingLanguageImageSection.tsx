// import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import CodingLanguageImage from './CodingLanguageImage'

// type Props = {
//   data: CodingLanguageBlockType
// }

// function CodingLanguageImageSection({ data }: Props) {
//   return (
//     <div className="flex gap-12">
//       {data?.languageImages?.languages?.map((image, i) => (
//         <CodingLanguageImage key={i} data={image} />
//       ))}
//     </div>
//   )
// }

// export default CodingLanguageImageSection

import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CodingLanguageImage from './CodingLanguageImage'
import Marquee from 'react-fast-marquee'

type Props = {
  data: CodingLanguageBlockType
}

function CodingLanguageImageSection({ data }: Props) {
  const languages = data?.languageImages?.languages ?? []

  if (!languages.length) return null

  return (
    <Marquee autoFill pauseOnHover speed={35} gradient={false}>
      <div className="flex items-center gap-[28px] sm:gap-[36px] lg:gap-[48px] xl:gap-[56px] 2xl:gap-[64px] pr-[28px] sm:pr-[36px] lg:pr-[48px] xl:pr-[56px] 2xl:pr-[64px]">
        {languages.map((image, i) => (
          <CodingLanguageImage key={i} data={image} />
        ))}
      </div>
    </Marquee>
  )
}

export default CodingLanguageImageSection
