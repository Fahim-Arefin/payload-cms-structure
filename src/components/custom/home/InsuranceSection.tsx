import { LifeInsuranceSimplifiedBlockType } from '@/types/payloadCustomTypes'
import InsuranceSimplifiedLargeSection from './InsuranceSimplifiedLargeSection'
import InsuranceSimplifiedSection from './InsuranceSimplifiedSection'

type Props = {
  lifeInsuranceSimplifiedData: LifeInsuranceSimplifiedBlockType
}

async function InsuranceSection({ lifeInsuranceSimplifiedData }: Props) {
  //   const insuranceData: InsuranceDataType[] = [
  //     {
  //       sectionHeading: 'Life Insurance Simplified',
  //       title: 'Expert Know - How',
  //       subtitle:
  //         'Life can be messy but your insurance doesn’t have to be. Learn how from our experts.',
  //       mainImage: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-1.jpg`,
  //       mainVIdeoLink: 'https://www.youtube.com/embed/rcduE_ff314',
  //       insuranceCardData: [
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-4.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
  //         },
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-1.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/rcduE_ff314',
  //         },
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-4.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
  //         },
  //       ],
  //     },
  //     {
  //       sectionHeading: '',
  //       title: 'demystify Life Insurance',
  //       subtitle: 'Detangle the basics of Life Insurance.',
  //       mainImage: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-2.jpg`,
  //       mainVIdeoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
  //       insuranceCardData: [
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-5.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
  //         },
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-6.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
  //         },
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-7.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/1CuBIcn5Ops',
  //         },
  //       ],
  //     },
  //     {
  //       sectionHeading: '',
  //       title: 'Zero-Hassle protection',
  //       subtitle: 'Get your life covered - fast, simple & smart.',
  //       mainImage: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/1.png`,
  //       mainVIdeoLink: 'https://youtube.com/embed/n9fFhLkJwLg',
  //       insuranceCardData: [
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/1.jpg`,
  //           videoLink: 'https://youtube.com/embed/n9fFhLkJwLg',
  //         },
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/2.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/mUn_HAvpbag',
  //         },
  //         {
  //           image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/3.jpg`,
  //           videoLink: 'https://www.youtube.com/embed/DzMzN76gELM',
  //         },
  //       ],
  //     },
  //   ]

  return (
    <>
      {/* py-12  */}
      <div
        className="pt-12 pb-24 md:hidden "
        // style={{
        //   backgroundColor: lifeInsuranceSimplifiedData?.backgroundColor || '',
        // }}
        style={{
          background:
            lifeInsuranceSimplifiedData?.backgroundColor &&
            lifeInsuranceSimplifiedData?.backgroundColor2
              ? `linear-gradient(to left, ${lifeInsuranceSimplifiedData.backgroundColor2}, ${lifeInsuranceSimplifiedData.backgroundColor})`
              : lifeInsuranceSimplifiedData?.backgroundColor || undefined,
        }}
      >
        <InsuranceSimplifiedSection
          data={lifeInsuranceSimplifiedData?.sections}
          heading={lifeInsuranceSimplifiedData?.sectionHeading}
          headingBN={lifeInsuranceSimplifiedData?.sectionHeadingBN}
          sectionHeadingHighlightedText={lifeInsuranceSimplifiedData?.sectionHeadingHighlightedText}
          sectionHeadingHighlightedTextBN={
            lifeInsuranceSimplifiedData?.sectionHeadingHighlightedTextBN
          }
        />
      </div>
      <div
        className="container-padding hidden md:block space-y-[20px] md:space-y-[40px] lg:space-y-[50px] xl:space-y-[100px] "
        // style={{
        //   backgroundColor: lifeInsuranceSimplifiedData?.backgroundColor || '',
        // }}
        style={{
          background:
            lifeInsuranceSimplifiedData?.backgroundColor &&
            lifeInsuranceSimplifiedData?.backgroundColor2
              ? `linear-gradient(to left, ${lifeInsuranceSimplifiedData.backgroundColor2}, ${lifeInsuranceSimplifiedData.backgroundColor})`
              : lifeInsuranceSimplifiedData?.backgroundColor || undefined,
        }}
      >
        {lifeInsuranceSimplifiedData?.sections?.map((data, i: number) => (
          <InsuranceSimplifiedLargeSection
            key={i}
            data={data}
            content={i % 2 === 0 ? 'left' : 'right'}
            heading={lifeInsuranceSimplifiedData?.sectionHeading}
            sectionHeadingHighlightedText={
              lifeInsuranceSimplifiedData?.sectionHeadingHighlightedText
            }
            headingBN={lifeInsuranceSimplifiedData?.sectionHeadingBN}
            sectionHeadingHighlightedTextBN={
              lifeInsuranceSimplifiedData?.sectionHeadingHighlightedTextBN
            }
            index={i}
          />
        ))}
      </div>
    </>
  )
}

export default InsuranceSection
