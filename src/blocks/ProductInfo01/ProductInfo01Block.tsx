import IntroSectionDesign02 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign02'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProductInfo01BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import { default as Pattern01, default as Pattern02 } from '/public/assets/images/BOpattern.png'

type Props = {
  block: ProductInfo01BlockType
  params: Record<string, string>
}

function ProductInfo01Block({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div
          className="container-padding grid grid-cols-1 md:grid-cols-2 
        gap-3 lg:gap-4 xl:gap-7 2xl:gap-8"
        >
          {/* content */}
          <div
            className="col-span-1 bg-white 
          px-3 lg:px-5 xl:px-11 2xl:px-14
          py-2 lg:py-4 xl:py-9 2xl:py-11
          flex flex-col justify-center
          "
          >
            <IntroSectionDesign02 block={block} />
          </div>
          {/* image */}
          <div className="col-span-1 flex flex-col justify-center overflow-hidden">
            <div className="relative w-full aspect-[477/487] hover:scale-[1.2] transition-all duration-300 ease-in">
              {typeof block?.image === 'object' && block?.image?.url && (
                <Image
                  src={block.image.url}
                  alt="Product Image"
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover object-center w-full h-full"
                  placeholder="blur"
                  blurDataURL={block.imageBlurDataURL || ''}
                />
              )}
            </div>
          </div>
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 bottom-0 z-30 h-[50%]
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
            className="invisible md:visible absolute right-0 top-0 z-30 h-[50%]
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

export default ProductInfo01Block
