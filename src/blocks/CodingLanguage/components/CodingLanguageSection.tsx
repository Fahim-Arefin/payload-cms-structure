// import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
// import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import CodingLanguageImageSection from './CodingLanguageImageSection'

// type Props = {
//   block: CodingLanguageBlockType
// }

// function CodingLanguageSection({ block }: Props) {
//   return (
//     <div className="space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
//       <div className="container-padding-x container-padding-t ">
//         <SectionHeading01 data={block?.sectionHeading} align="middle" />
//       </div>
//       <div className="container-padding-b">
//         <CodingLanguageImageSection data={block} />
//       </div>
//     </div>
//   )
// }

// export default CodingLanguageSection

import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CodingLanguageImageSection from './CodingLanguageImageSection'

type Props = {
  block: CodingLanguageBlockType
}

function CodingLanguageSection({ block }: Props) {
  const languages = block?.languageImages?.languages ?? []
  const languagesTwo = block?.languageImages?.languagesTwo ?? []

  return (
    <div className="space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <div className="container-padding-x container-padding-t">
        <SectionHeading01 data={block?.sectionHeading} align="middle" />
      </div>

      <div className="container-padding-b space-y-[20px] lg:space-y-[28px] xl:space-y-[32px] 2xl:space-y-[36px]">
        <CodingLanguageImageSection languages={languages} direction="left" />

        <CodingLanguageImageSection languages={languagesTwo} direction="right" />
      </div>
    </div>
  )
}

export default CodingLanguageSection
