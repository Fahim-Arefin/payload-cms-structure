import { QueryFormBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Pattern01 from '/public/assets/images/BOpattern2.png'
import Pattern02 from '/public/assets/images/BOpattern2.png'
import WorldMap from '/public/assets/images/worldMap.png'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
import Image from 'next/image'
import QueryForm from './components/QueryForm'

type Props = {
  block: QueryFormBlockType
  params: Record<string, string>
}

function QueryFormBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div className="container-padding ">
          <div
            className="relative z-20 
            grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2
        gap-4 md:gap-3 lg:gap-5 xl:gap-8 2xl:gap-20"
          >
            <IntroSectionDesign04
              block={block}
              position="left"
              justify="justify-start"
              className="relative z-30 
              col-span-1 lg:col-span-1 xl:col-span-1"
            />
            {block?.showQueryForm && (
              <div
                className="relative z-30 mt-4 lg:mt-0 
              col-span-1 lg:col-span-2 xl:col-span-1"
              >
                <QueryForm formId="query-form" recipientEmails={block?.recipientEmails} />
              </div>
            )}

            {/* bg map image */}
            <div className="invisible md:visible absolute inset-0 z-10 w-full h-full ">
              <Image
                fill
                src={WorldMap}
                alt="WorldMap image"
                quality={90}
                sizes="100vw"
                className="object-contain"
                placeholder="blur"
                blurDataURL={WorldMap?.blurDataURL}
              />
            </div>
          </div>
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 top-0 z-30 h-[70%]  opacity-50
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
            className="invisible md:visible absolute right-0 bottom-0 z-30 h-[50%]  opacity-50
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

export default QueryFormBlock
