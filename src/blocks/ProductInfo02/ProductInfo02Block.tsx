import { ProductInfo02BlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Pattern01 from '/public/assets/images/BOpattern2.png'
import Pattern02 from '/public/assets/images/BOpattern2.png'
import Blur from '/public/assets/images/Blur.png'
import Image from 'next/image'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import IntroSectionDesign03 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign03'
import Card03 from './components/Card03'

type Props = {
  block: ProductInfo02BlockType
  params: Record<string, string>
}

function ProductInfo02Block({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        {/* content */}
        <div
          className={`container-padding grid grid-cols-1 md:grid-cols-12 
          xl:gap-8 2xl:gap-20`}
        >
          {/* section intro */}
          <IntroSectionDesign03
            block={block}
            className={`relative z-20 md:col-span-4`}
            position="left"
            justify="justify-start"
          />

          <div
            className="md:col-span-8 flex flex-col 
           xl:gap-3 2xl:gap-4"
          >
            {block?.cards03?.map((item, index) => (
              <Card03
                key={index}
                data={item}
                index={index}
                padding="
                xl:px-[20px] xl:py-[30px]
                xl:px-[20px] xl:py-[30px]
                2xl:px-[24px] 2xl:py-[34px]
                
                "
                height="
                xl:min-h-[200px] xl:min-h-[240px] 2xl:min-h-[250px] 
                hover:xl:min-h-[250px] hover:2xl:min-h-[260px]
                "
                className="w-[95%] hover:w-full transition-all duration-300 ease-in"
              />
            ))}
          </div>
        </div>
        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 top-0 z-30 h-[70%] opacity-50
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
            className="invisible md:visible absolute right-0 bottom-0 z-30 h-[30%] opacity-50
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

        <div className="invisible md:visible absolute left-0 bottom-0 z-10 h-[40%] w-[50%]">
          <Image
            fill
            src={Blur}
            alt="blur image "
            quality={90}
            sizes="100vw"
            className="object-fill object-center"
            placeholder="blur"
            blurDataURL={Blur?.blurDataURL}
          />
        </div>
      </div>
    </WithHashScroller>
  )
}

export default ProductInfo02Block
