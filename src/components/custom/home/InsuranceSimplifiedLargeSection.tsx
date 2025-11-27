'use client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import InsuranceCard from './InsuranceCard'
import { LifeInsuranceSimplifiedBlockType } from '@/types/payloadCustomTypes'

type Props = {
  // data: InsuranceDataType
  data: NonNullable<LifeInsuranceSimplifiedBlockType['sections']>[number]
  content: 'left' | 'right'
  heading: string | null | undefined
  headingBN: string | null | undefined
  sectionHeadingHighlightedText: string | null | undefined
  sectionHeadingHighlightedTextBN: string | null | undefined
  index: number
}

function InsuranceSimplifiedLargeSection({
  data,
  content,
  heading,
  headingBN,
  sectionHeadingHighlightedText,
  sectionHeadingHighlightedTextBN,
  index,
}: Props) {
  return (
    // <div className="">
    <div className="">
      <div className="">
        {/* headline */}
        {heading && index === 0 && (
          <div className="">
            {/* <h1
              className="hidden md:block global-h1 uppercase font-semibold space-x-4 
            mb-[15px] md:mb-[30px] lg:mb-[40px] xl:mb-[80px]"
            >
              {highlightText(heading || '', sectionHeadingHighlightedText || '', {
                highlightClassName: 'text-[#ED7125]',
                all: false,
              })}
            </h1> */}
            <LocalizedHighlighted
              as="h1"
              className="hidden md:block global-h1 uppercase font-semibold space-x-4 mb-[15px] md:mb-[30px] lg:mb-[40px] xl:mb-[80px]"
              textEn={heading}
              textBn={headingBN}
              highlightEn={sectionHeadingHighlightedText}
              highlightBn={sectionHeadingHighlightedTextBN}
              highlightClassName="text-[#ED7125]"
            />
          </div>
        )}
        <div className={cn(` space-y-6`)}>
          {/* 1st row */}
          <div className={cn(`grid grid-cols-1 md:grid-cols-2`)}>
            {/* Left Text Section */}
            <div
              className={cn(
                `text-[#434343] global-h4 py-2 md:p-4 flex flex-col justify-center md:space-y-1 lg:space-y-2 `,
                content === 'left'
                  ? 'md:order-1 md:mr-[16%] lg:mr-[20%] xl:mr-[30%] 2xl:mr-[35%]'
                  : 'md:order-2 md:ml-[16%] lg:ml-[20%] xl:ml-[30%] 2xl:ml-[35%]',
              )}
            >
              <h4 className="font-semibold uppercase ">
                {/* <Link href="/"> */}
                {/* {highlightText(data?.title || '', data?.titleHighlightedText || '', {
                    highlightClassName: 'text-[#ED7125]',
                    all: false,
                  })} */}
                <LocalizedHighlighted
                  textEn={data?.title}
                  textBn={data?.titleBN}
                  highlightEn={data?.titleHighlightedText}
                  highlightBn={data?.titleHighlightedTextBN}
                  highlightClassName="text-[#ED7125]"
                />
                {/* </Link> */}
              </h4>
              {/* <h4 className="">{data?.subtitle}</h4> */}
              <LocalizedText as="h4" en={data?.subtitle} bn={data?.subtitleBN} />
            </div>
            {/* right Section */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label="Play insurance video"
                  // h-[150px] md:h-[180px] lg:h-[210px] xl:h-[280px] 2xl:h-[320px]
                  className={cn(
                    `relative group cursor-pointer 
                    w-full aspect-[660/320]
         overflow-hidden transition-all rounded-[4.333px_4.333px_19.333px_4.333px] lg:rounded-[4.333px_4.333px_29.333px_4.333px] xl:rounded-[4.333px_4.333px_39.333px_4.333px]`,
                    content === 'left' ? 'order-2' : 'order-1',
                  )}
                >
                  {typeof data.mainImage === 'object' && data.mainImage?.url && (
                    <Image
                      src={data.mainImage.url}
                      alt={data?.subtitle ?? 'Video thumbnail'}
                      fill
                      className="object-contain object-center rounded-[4.333px_4.333px_19.333px_4.333px] lg:rounded-[4.333px_4.333px_29.333px_4.333px] xl:rounded-[4.333px_4.333px_39.333px_4.333px]"
                      sizes="(max-width: 1023px) 300px, (max-width: 1349px) 400px, 500px "
                      placeholder="blur"
                      blurDataURL={data.mainImageBlurDataURL || ''}
                      quality={90}
                    />
                  )}
                  <div
                    className="absolute inset-0 group-hover:bg-black/50 transition duration-300 
        rounded-[4.333px_4.333px_19.333px_4.333px] lg:rounded-[4.333px_4.333px_29.333px_4.333px] xl:rounded-[4.333px_4.333px_39.333px_4.333px]"
                  />
                  <div
                    className="absolute 
        bottom-0 lg:bottom-0.5 xl:bottom-0.5 2xl:bottom-0
        -right-0 lg:right-0.5 xl:right-[3px] 2xl:-right-0.5 
         w-[30px] lg:w-[40px] xl:w-[50px] 2xl:w-[60px]  
          h-[30px] lg:h-[40px] xl:h-[50px] 2xl:h-[60px]"
                  >
                    <Image src="/assets/icons/play.svg" alt="Play video" fill className="" />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent
                className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
              >
                <VisuallyHidden>
                  <DialogTitle>Insurance Video</DialogTitle>
                </VisuallyHidden>

                <iframe
                  width="100%"
                  height="100%"
                  src={data.mainVIdeoLink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
          {/* second row */}
          <div className="grid grid-cols-3 gap-1 md:gap-2 xl:gap-6">
            {data?.insuranceCardData?.map((item, i) => (
              <InsuranceCard data={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsuranceSimplifiedLargeSection
