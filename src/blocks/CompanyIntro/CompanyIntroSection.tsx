import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Eclipse from 'public/assets/images/introDesign.png'
import Image from 'next/image'

type Props = {
  block: CompanyIntroBlockType
}

function CompanyIntroSection({ block }: Props) {
  const hasDesc =
    !!block?.companyIntroDescription?.description &&
    !!block?.companyIntroDescription?.description?.root?.direction // or lexicalHasRealText(block.description?.root)
  return (
    <div className="relative container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      {hasDesc && (
        <div className="font-grift text-justify text-secondary-1 global-p2">
          <LocalizedRichText
            en={block?.companyIntroDescription?.description}
            bn={block?.companyIntroDescription?.description}
          />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-[80%]">
        <Image
          src={Eclipse}
          alt="Eclipse"
          sizes="100vw"
          quality={90}
          placeholder="blur"
          fill
          blurDataURL={Eclipse?.blurDataURL}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default CompanyIntroSection
