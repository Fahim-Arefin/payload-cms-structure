import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ContactInfoCardBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import Pattern01 from '/public/assets/images/BOpattern2.png'
import Pattern02 from '/public/assets/images/BOpattern2.png'
import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
import Card03 from '@/components/custom/sagar-ropes-shared/cards/Card03'

type Props = {
  block: ContactInfoCardBlockType
  params: Record<string, string>
}

function ContactInfoCardBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div className="container-padding">
          {/* section intro */}
          <IntroSectionDesign04 block={block} position="center" />
          <div
            className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 
          grid grid-cols-1 md:grid-cols-3 
          gap-3 lg:gap-4 xl:gap-8 2xl:gap-9"
          >
            {block?.contactInfo?.map((info, index) => (
              <Card03
                key={index}
                data={info}
                index={index}
                height="min-h-[120px] md:min-h-[165px] lg:min-h-[200px] xl:min-h-[277px] 2xl:min-h-[340px]"
                padding="p-4 md:p-5 lg:p-6 xl:p-10 2xl:p-12"
                className="bg-white-1"
              />
            ))}
          </div>
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 top-0 z-30 h-[50%] opacity-50
                   md:w-[120px] 
                   lg:w-[170px] 
                   xl:w-[225px] 
                   2xl:w-[280px]
                "
          >
            <Image
              fill
              src={Pattern01}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className=""
              placeholder="blur"
              blurDataURL={Pattern01?.blurDataURL}
            />
          </div>
        )}
        {/* pattern 2 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute right-0 bottom-0 z-30 h-[50%] opacity-50
                   md:w-[120px] 
                   lg:w-[170px] 
                   xl:w-[225px] 
                   2xl:w-[280px]
                "
          >
            <Image
              fill
              src={Pattern02}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className="object-cover rotate-180"
              placeholder="blur"
              blurDataURL={Pattern02?.blurDataURL}
            />
          </div>
        )}
      </div>
    </WithHashScroller>
  )
}

export default ContactInfoCardBlock
