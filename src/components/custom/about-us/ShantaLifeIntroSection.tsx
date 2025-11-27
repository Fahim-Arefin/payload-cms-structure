import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'
import { ShantaIntroBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: ShantaIntroBlockType
}

async function ShantaLifeIntroSection({ data }: Props) {
  const shantaIntroContent = {
    heading: 'Advancing',
    subheading: 'A Legacy of Setting Standards',
    paragraphTitle: 'Nurtured with Trust. Built for Tomorrow',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/shantaIntroImage.png`,
    // mobileImage: '/assets/about-us/web/shantaIntroImage.png',
    paragraph:
      'Born from a vision to redefine life insurance in Bangladesh, Shanta Life is backed by a powerful consortium comprised of Shanta Holdings, Shanta Lifestyle, Shanta Securities, Shanta Asset Management, Shanta Equity, Shanta Multiverse, Shanta Property Management, FAR Asset Management, and Nasah Holdings.',
  }

  return (
    <>
      <div
        className="container-padding"
        style={{
          backgroundColor: data?.backgroundColor || '',
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2  
      space-y-6 lg:space-y-0 lg:gap-x-4 xl:gap-x-12"
        >
          {/* left */}
          <div className="grid grid-cols-2 relative lg:min-h-[270px] xl:min-h-[290px] 2xl:min-h-[260px]">
            {/* Background-like image */}

            {/* web */}
            <div
              className=" hidden lg:block absolute inset-x-0  lg:-bottom-6 xl:-bottom-10 2xl:-bottom-[80px]
          lg:w-[90%] xl:w-[78%] 2xl:w-[80%] 
          lg:h-[180px] xl:h-[193px] 2xl:h-[230px]"
            >
              {typeof data?.image === 'object' && data?.image?.url && (
                <Image
                  src={data?.image?.url}
                  alt={data?.heading}
                  // className="w-full object-cover object-center z-0 "
                  className="object-contain z-0 "
                  fill
                  sizes="(max-width: 1349px) 350px, 400px"
                  placeholder="blur"
                  blurDataURL={data?.imageBlurDataURL || ''}
                  quality={85}
                />
              )}
            </div>

            <div
              className="col-span-1 lg:col-span-2
           font-medium lg:font-semibold uppercase
           lg:flex lg:flex-col "
            >
              <h1 className="global-h3 md:global-h1 text-[#ED7125]">
                <LocalizedText en={data?.heading} bn={data?.headingBN} />
              </h1>
              <h1 className="global-h3 md:global-h1 text-black">
                <LocalizedText en={data?.subheading} bn={data?.subheadingBN} />
              </h1>
            </div>

            {/* mobile */}
            <div className="relative w-full max-h-[100px] col-span-1 lg:hidden md:-mt-4">
              {typeof data?.image === 'object' && data?.image?.url && (
                <Image
                  fill
                  src={data?.image?.url}
                  alt={data?.heading}
                  className="object-cover object-center"
                  sizes="(max-width: 767px) 150px, 300px"
                  placeholder="blur"
                  blurDataURL={data?.imageBlurDataURL || ''}
                  quality={85}
                />
              )}
            </div>
          </div>
          {/* right */}
          <div className="space-y-2 md:space-y-5 2xl:space-y-8">
            <h5 className=" text-[#4A4A4A] font-semibold uppercase global-h4 text-center lg:text-left">
              {/* {shantaIntroContent?.paragraphTitle} */}
              <LocalizedText en={data?.paragraphTitle} bn={data?.paragraphTitleBN} />
            </h5>
            <p
              className="
            text-center lg:text-justify 
            text-[#434343] font-normal 
            lg:leading-[30px] xl:leading-[40px]
            global-p1
            h-full
            "
            >
              {/* {shantaIntroContent?.paragraph} */}
              <LocalizedText en={data?.paragraph} bn={data?.paragraphBN} />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShantaLifeIntroSection
