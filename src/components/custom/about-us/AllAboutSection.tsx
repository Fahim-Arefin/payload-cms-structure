import { ValuesThatShapeUsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import AllAboutCardList from './AllAboutCardList'

type Props = {
  valuesThatSavesUs: ValuesThatShapeUsBlockType
}
async function AllAboutSection({ valuesThatSavesUs }: Props) {
  const allAboutData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/allAbout.jpg`,
    // mobileImage: '/assets/about-us/mobile/allAbout.jpg',
    title: 'Values That',
    coloredTitle: 'Shape Us',
    data: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/allAboutIcon1.png`,
        // mobileImage: '/assets/icons/mobile/allAboutIcon1.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/trustWhite.png`,
        // hoverMobileImage: '/assets/icons/mobile/trustWhite.png',
        title: 'Trust',
        description: {
          __html:
            "For us, trust is more than a word — it's the foundation of every promise we make.",
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/simplicity.png `,
        // mobileImage: '/assets/icons/mobile/simplicity.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/allAboutIcon3.png`,
        // hoverMobileImage: '/assets/icons/mobile/allAboutIcon3.png',
        title: 'Simplicity',
        description: {
          __html:
            'We prioritize ease for our customers , making insurance straightforward, accessible, and hassle-free.',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/allAboutIcon2.png`,
        // mobileImage: '/assets/icons/mobile/allAboutIcon2.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/ownershipWhite.png`,
        // hoverMobileImage: '/assets/icons/mobile/ownershipWhite.png',
        title: 'Ownership',
        description: {
          __html:
            'We stay agile, positive, and collaborative — always learning and evolving to deliver the best.',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/GOLDEN-Customer-Centricity.png `,
        // mobileImage: '/assets/icons/mobile/GOLDEN-Customer-Centricity.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/Customer-Centricity.png`,
        // hoverMobileImage: '/assets/icons/mobile/Customer-Centricity.png',
        title: 'Customer Centricity',
        description: {
          __html:
            'We act with proactiveness, empower our employees, and create experiences that truly put you first.',
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/ownership-Golden.png `,
        // mobileImage: '/assets/icons/mobile/ownership-Golden.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/ownership-White.png`,
        // hoverMobileImage: '/assets/icons/mobile/ownership-White.png',
        title: 'Transparency',
        description: {
          __html:
            'We believe in open communication, owning up to our promises, and full visibility.',
        },
      },
    ],
  }

  return (
    <div className="pb-[150px] lg:padding-bottom lg:padding-top">
      {/* <div className="mb-[150px] lg:margin-bottom lg:margin-top lg:px-2 relative lg:overflow-hidden"> */}
      <div className="lg:px-2 relative lg:overflow-hidden">
        <div>
          {/* left side */}
          <div className="lg:flex lg:gap-12 xl:gap-20 2xl:gap-x-24">
            {/* image with gradient */}
            <div
              className="flex flex-col items-center gap-4 relative overflow-hidden
           w-full lg:w-[350px] xl:w-[500px] 2xl:w-[600px] 
           h-[200px] md:h-[250px] lg:h-[500px] xl:h-[650px] 2xl:h-[820px]
           lg:rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15px]"
            >
              {/* web */}
              {typeof valuesThatSavesUs?.image === 'object' && valuesThatSavesUs?.image?.url && (
                <Image
                  fill
                  src={valuesThatSavesUs?.image?.url}
                  alt={valuesThatSavesUs?.title}
                  className="object-cover object-center"
                  quality={85}
                  sizes="(max-width: 767px) 300px, (max-width: 1023px) 50vw , (max-width: 1349px) 350px, 500px"
                  placeholder="blur"
                  blurDataURL={valuesThatSavesUs?.imageBlurDataURL || ''}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 lg:rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15px] z-10"></div>

              <h1 className="shantaLifeIntroSection-h1 font-medium lg:font-semibold uppercase absolute inset-x-0 top-1/4 text-center z-20 text-white lg:hidden">
                <LocalizedHighlighted
                  textEn={valuesThatSavesUs?.title}
                  textBn={valuesThatSavesUs?.titleBN}
                  highlightEn={valuesThatSavesUs?.highlightedText}
                  highlightBn={valuesThatSavesUs?.highlightedTextBN}
                />
              </h1>
            </div>
            {/* heading */}
            <h1 className="global-h1 font-medium lg:font-semibold text-[#434342] uppercase hidden lg:block mt-6">
              <LocalizedHighlighted
                textEn={valuesThatSavesUs?.title}
                textBn={valuesThatSavesUs?.titleBN}
                highlightEn={valuesThatSavesUs?.highlightedText}
                highlightBn={valuesThatSavesUs?.highlightedTextBN}
              />
            </h1>
          </div>
          {/* right-side */}
          <div
            className="absolute z-40
        top-[60%] md:top-[61%] lg:top-[22%] xl:top-[23%] 2xl:top-1/4 
        left-[2%] md:left-[5%] lg:left-[200px] xl:left-[220px] 2xl:left-[400px] 
        w-[95%] md:w-[90%] lg:w-[80%] xl:w-[83%] 2xl:w-[1500px]"
          >
            <AllAboutCardList allAboutData={valuesThatSavesUs?.values} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllAboutSection
