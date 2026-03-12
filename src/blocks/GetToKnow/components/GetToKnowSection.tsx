import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import Card01 from '@/components/custom/sagar-ropes-shared/cards/Card01'
import VideoThumbnailDialog from '@/components/custom/sagar-ropes-shared/dialog/VideoThumbnailDialog'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import { GetToKnowBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: GetToKnowBlockType
}

function GetToKnowSection({ data }: Props) {
  const cards = data?.cards ?? []

  const card1 = cards?.[0]
  const card2 = cards?.[1]
  const bgCard = cards?.[2]
  const card3 = cards?.[3]
  const card4 = cards?.[4]

  const mainImage =
    typeof (data as any)?.mainImage === 'object'
      ? (data as any).mainImage
      : (data as any)?.mainImage?.[0]

  return (
    <WithHashScroller id={data?.sectionId} bgColor={data?.backgroundColor}>
      <div className="container-padding">
        {/* ===== DESKTOP (lg+) : 12-col, 3-row grid ===== */}
        <div
          className="grid grid-cols-12 
        gap-3 lg:gap-2.5 xl:gap-4 2xl:gap-6 
        auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[200px] xl:auto-rows-[260px] 2xl:auto-rows-[280px]"
        >
          {/* Card 01 */}
          <div className="col-span-6 lg:col-span-4 row-span-1 order-3 lg:order-1 bg-white-1">
            <Card01 data={card1} index={0} className="p-2 md:p-3 xl:p-5 h-full" />
          </div>

          {/* Heading */}
          <div className="col-span-7 md:col-span-6 lg:col-span-4 row-span-2 order-1 lg:order-2 h-full">
            <div className="lg:px-2 2xl:px-3 flex flex-col justify-between h-full">
              {/* tag */}
              <div
                className="font-manrope text-cyan text-xs xl:text-[14px] leading-[157.143%] tracking-[1.4px]
              px-2 py-1 bg-white-1 w-fit"
              >
                {data?.tag}
              </div>
              {/* heading */}
              <div className="global-h2 font-proxima font-bold text-dark-1">
                <LocalizedHighlighted
                  textEn={data?.heading}
                  textBn={data?.heading}
                  highlightEn={data?.headingHighlighted}
                  highlightBn={data?.headingHighlighted}
                  highlightClassName="text-white-3"
                />
              </div>
              {/* cta btns */}
              <div className="flex flex-wrap gap-4">
                <CtaButtons item={data?.ctaButtons} />
              </div>
            </div>
          </div>

          {/* Main Image (spans 2 rows) */}
          {/* <div className="col-span-4 row-span-2 order-3 bg-white-2 overflow-hidden group">
            <div className="relative w-full h-full">
              {typeof data?.mainImage === 'object' && data?.mainImage?.url && (
                <Image
                  src={mainImage.url}
                  alt="thumbneil Image"
                  fill
                  className="object-center object-cover z-10 group-hover:scale-110 transition-all duration-300 ease-in"
                  sizes="(min-width:1024px) 100vw, 50vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={data?.mainImageBlurDataURL || ''}
                />
              )}
              <div className="absolute inset-0 z-30 bg-transparent flex justify-center items-center">
                <PlayButton className="" />
              </div>
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: '#00000020',
                }}
              />
            </div>
          </div> */}

          {/* Main Image (spans 2 rows) + Dialog */}
          <div className="col-span-5 md:col-span-6 lg:col-span-4 row-span-2 order-2 lg:order-3 ">
            {typeof data?.mainImage === 'object' && data?.mainImage?.url && (
              <VideoThumbnailDialog
                className="w-full h-full"
                thumbnailUrl={mainImage.url}
                blurDataURL={data?.mainImageBlurDataURL || ''}
                videoUrl={data?.youtubeUrl}
              />
            )}
          </div>

          {/* Card 02 */}
          <div className="col-span-6 lg:col-span-4 row-span-1 order-4 lg:order-4 bg-white-1">
            <Card01 data={card2} index={1} className="p-2 md:p-3 xl:p-5 h-full" />
          </div>

          {/* BG card (cyan tile) */}
          <div className="col-span-12 lg:col-span-4 row-span-1 order-5">
            <Card01 data={bgCard} index={2} className="p-2 md:p-3 xl:p-5 h-full" />
          </div>

          {/* Card 03 */}
          <div className="col-span-6 lg:col-span-4 row-span-1 order-6 bg-white-1">
            <Card01 data={card3} index={3} className="p-2 md:p-3 xl:p-5 h-full" />
          </div>

          {/* Card 04 */}
          <div className="col-span-6 lg:col-span-4 row-span-1 order-7 bg-white-1">
            <Card01 data={card4} index={4} className="p-2 md:p-3 xl:p-5 h-full" />
          </div>
        </div>
      </div>
    </WithHashScroller>
  )
}

export default GetToKnowSection
