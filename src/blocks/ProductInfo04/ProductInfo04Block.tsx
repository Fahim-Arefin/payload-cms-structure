import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProductInfo04BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import Pattern01 from '/public/assets/images/BOpattern.png'
import Pattern02 from '/public/assets/images/BOpattern.png'
import Blur3 from '/public/assets/images/Blur3.png'
import InfoCard04 from './components/InfoCard04'

type Props = {
  block: ProductInfo04BlockType
  params: Record<string, string>
}

function ProductInfo04Block({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div className="container-padding">
          <IntroSection block={block} />
          <div
            className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 
          grid grid-cols-1 lg:grid-cols-2
          gap-3 lg:gap-2.5 xl:gap-[30px] 2xl:gap-[35px]
          "
          >
            {block?.cards05?.map((item, index) => (
              <InfoCard04
                key={index}
                data={item}
                index={index}
                className="bg-white-1 hover:bg-cyan "
                padding="p-[15px] lg:p-[20px] xl:p-[25px] 2xl:p-[30px]"
              />
            ))}
          </div>
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 bottom-0 z-30 h-[30%]
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
            className="invisible md:visible absolute right-0 top-0 z-30 h-[30%]
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
        {/* blur 2 */}
        {block?.showPatternDesign && (
          <div className="invisible md:visible absolute left-0 bottom-0 -z-10 h-full w-full xl:w-[50%]">
            <Image
              fill
              src={Blur3}
              alt="Blur image 02"
              quality={90}
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Blur3?.blurDataURL}
            />
          </div>
        )}
      </div>
    </WithHashScroller>
  )
}

export default ProductInfo04Block
