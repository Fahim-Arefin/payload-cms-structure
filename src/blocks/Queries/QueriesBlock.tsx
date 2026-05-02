import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { QueriesBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import Pattern01 from '/public/assets/images/BOpattern.png'
import Pattern02 from '/public/assets/images/BOpattern.png'
import AccordionSection from './components/AccordionSection'

type Props = {
  block: QueriesBlockType
  params: Record<string, string>
}

function QueriesBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div className="container-padding">
          <IntroSection block={block} />
          <AccordionSection data={block?.queries} />
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 bottom-0 z-30 h-[50%] opacity-50
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
              className="object-cover -rotate-180"
              placeholder="blur"
              blurDataURL={Pattern01?.blurDataURL}
            />
          </div>
        )}
        {/* pattern 2 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute right-0 top-0 z-30 h-[50%] opacity-50
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
              className="object-cover"
              placeholder="blur"
              blurDataURL={Pattern02?.blurDataURL}
            />
          </div>
        )}
      </div>
    </WithHashScroller>
  )
}

export default QueriesBlock
