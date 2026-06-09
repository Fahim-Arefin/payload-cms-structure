import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CompanyIntroBlockType
}

function CompanyIntroSection({ block }: Props) {
  const hasDesc =
    !!block?.companyIntroDescription?.description &&
    !!block?.companyIntroDescription?.description?.root?.direction // or lexicalHasRealText(block.description?.root)
  return (
    <div className="container-padding space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10">
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      {hasDesc && (
        <div className="font-grift text-justify text-secondary-1 global-p2">
          <LocalizedRichText
            en={block?.companyIntroDescription?.description}
            bn={block?.companyIntroDescription?.description}
          />
        </div>
      )}
    </div>
  )
}

export default CompanyIntroSection
