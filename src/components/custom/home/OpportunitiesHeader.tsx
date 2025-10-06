import Image from 'next/image'
import Link from 'next/link'
import GlobalButton from '../shared/GlobalButton'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedString from '../shared/LocalizedString'
import LocalizedText from '../shared/LocalizedText'
import { LifeAtShantaBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: LifeAtShantaBlockType
}

function OpportunitiesHeader({ data }: Props) {
  return (
    <div
      className="font-avenir relative text-center w-[95%] md:w-[60%] lg:w-[50%] mx-auto 
    space-y-2 2xl:space-y-6
    2xl:px-24 pb-5 
    mt-12 md:mt-[70px] lg:mt-0"
    >
      {/* Background overlay */}
      {/* <div className="border border-black absolute inset-0 -top-1/2 lg:-top-16 bg-[url('/assets/homepage/web/opportunities.png')] bg-cover bg-center bg-no-repeat opacity-45 z-0" /> */}
      <div
        className="absolute inset-0 -top-1/2 lg:-top-16 z-0 opacity-45 overflow-hidden"
        aria-hidden="true"
      >
        {typeof data?.backgroundImage === 'object' && data?.backgroundImage?.url && (
          <Image
            // src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/opportunities.png`}
            src={data?.backgroundImage?.url || ''}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1023px) 300px, 400px"
            // placeholder="blur"
            // blurDataURL={data?.backgroundImageBlurDataURL || ''}
          />
        )}
      </div>
      {/* Foreground content */}
      <div className="relative z-10 space-y-4 md:space-y-6">
        <div className="space-y-2">
          <h1 className="global-h4 font-medium uppercase">
            {/* {data?.title} */}
            <LocalizedText en={data?.title} bn={data?.titleBN} />
          </h1>
          <h1 className="global-h1 font-semibold uppercase">
            {/* {highlightText(data?.subtitle || '', data?.highlightedSubtitle || '', {
              highlightClassName: 'text-[#ED7125]',
              all: false,
            })} */}
            <LocalizedHighlighted
              textEn={data?.subtitle}
              textBn={data?.subtitleBN}
              highlightEn={data?.highlightedSubtitle}
              highlightBn={data?.highlightedSubtitleBN}
            />
          </h1>
          <p className="global-p1 font-light text-[#1F1F1F]">
            {/* Make a difference everyday- your next chapter starts here */}
            {/* {data?.description} */}
            <LocalizedText en={data?.description} bn={data?.descriptionBN} />
          </p>
        </div>
        {data?.buttonText && data?.buttonLink && (
          <div>
            <Link href={data?.buttonLink}>
              <GlobalButton
                variant="primary"
                // text={data?.buttonText}
                className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[18px] 2xl:text-[20px]"
              >
                <LocalizedString en={data.buttonText} bn={data.buttonTextBN} />
              </GlobalButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default OpportunitiesHeader
