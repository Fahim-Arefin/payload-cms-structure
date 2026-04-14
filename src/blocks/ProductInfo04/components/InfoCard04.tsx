import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import Button02 from '@/components/custom/sagar-ropes-shared/buttons/Button02'
import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { pageHref, resolvePageSlug } from '@/lib/utils'
import { ProductInfo04BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: NonNullable<ProductInfo04BlockType['cards05']>[number]
  index: number
  className?: string
  height?: string
  padding?: string
}

function InfoCard04({ data, index, className, height, padding }: Props) {
  return (
    <div
      className={`group/testCard 
      space-y-2 lg:space-y-3 xl:space-y-4 2xl:space-y-5 
      transition-all duration-300 ease-in
      ${padding}
      ${height}
      ${className}
      `}
    >
      {typeof data?.icon === 'object' && data?.icon?.url && (
        <div
          className="border-[1.125px] border-[rgba(16,16,83,0.15)] bg-[linear-gradient(135deg,rgba(16,16,83,0.30)_0%,rgba(16,16,83,0)_50%,rgba(16,16,83,0.30)_100%)]
                            w-[45px] md:w-[55px] lg:w-[65px] xl:w-[75px] 2xl:w-[85px]
                            h-[45px] md:h-[55px] lg:h-[65px] xl:h-[75px] 2xl:h-[85px]
                            rounded-full
                            flex items-center justify-center
                            p-1 xl:p-1.5 2xl:p-2
                            group-hover/testCard:bg-[linear-gradient(135deg,rgba(255,255,255)_0%,rgba(255,255,255)_50%,rgba(255,255,255)_100%)]
                            transition-all duration-300 ease-in
              "
        >
          <div className="relative w-full aspect-[5/4] group-hover/testCard:scale-90 transition-all delay-150 duration-300 ease-out">
            <Image
              key={index}
              src={data?.icon?.url}
              alt="icon"
              fill
              sizes="100vw"
              className={`object-cover object-center w-full h-full`}
              placeholder={data?.iconBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.iconBlurDataURL || undefined}
            />
          </div>
        </div>
      )}
      <div>
        {/* titles */}
        {data?.title && (
          <div
            className={`font-proxima global-h5 font-bold text-dark-1 group-hover/testCard:text-white-1 transition-all duration-300 ease-in`}
          >
            {data?.title && <div>{data?.title}</div>}
          </div>
        )}
      </div>
      {data?.description && (
        <div className="relative">
          {/* initial */}
          <div
            className={`opacity-100 group-hover/testCard:opacity-0 group-hover/testCard:scale-110 
                font-manrope global-p5 text-dark-3 transition-all duration-300 ease-in text-justify`}
          >
            <LocalizedRichText en={data?.description} bn={data?.description} />
          </div>
          <div
            className={`absolute inset-0 opacity-0  scale-110 group-hover/testCard:opacity-100 group-hover/testCard:scale-100  
                font-manrope global-p5 text-white-1 transition-all delay-150 duration-300 ease-in text-justify`}
          >
            <LocalizedRichText en={data?.description} bn={data?.description} />
          </div>
        </div>
      )}

      {/* {data?.ctaButtons?.map((block, index) => {
        const href = block?.sectionId
          ? `/${resolvePageSlug(block?.buttonLink)}/#${block?.sectionId}`
          : pageHref(block.buttonLink)
        return (
          <div key={`pageLink-${index}`}>
            
            <Link href={href}>
              {block?.style === 'btn01' && (
                <Button01>
                  <LocalizedText en={block.label} bn={block.label} />
                </Button01>
              )}
              {block?.style === 'btn02' && (
                <Button02 groupName="info">
                  <LocalizedText en={block.label} bn={block.label} />
                </Button02>
              )}
            </Link>
          </div>
        )
      })} */}
      {data?.ctaButtons && (
        <div>
          <CtaButtons
            item={data?.ctaButtons}
            groupName="testCard"
            groupColor="text-dark-1"
            groupBg="bg-dark-1"
          />
        </div>
      )}
    </div>
  )
}

export default InfoCard04
