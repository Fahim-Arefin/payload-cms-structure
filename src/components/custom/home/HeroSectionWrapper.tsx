import CTAButtonBlock from '@/blocks/hero/CTAButtonBlock'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { HeroBlockType } from '@/types/payloadCustomTypes'
// import CTAButtonBlock from '../shared/hero/CTAButtonBlock'

type Props = {
  data: HeroBlockType
}

const HeroSectionWrapper = async ({ data }: Props) => {
  const heroSlides = [
    {
      title: 'Empower yourself',
      titleBN: 'নিজেকে ক্ষমতায়িত করুন',
      subtitle: 'to live on your terms',
      subtitleBN: 'নিজের শর্তে বাঁচার জন্য',
      description:
        'Your life evolves, and so should your protection... Shanta Life Insurance ensures you stay ahead.',
      descriptionBN:
        'আপনার জীবন বদলায়, তাই আপনার সুরক্ষাও বদলানো উচিত । শান্তা জীবন বীমা আপনাকে সবসময় এক ধাপ এগিয়ে রাখে।',
      // image: '/assets/banners/banner3.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner3.jpg`,
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',
      description:
        'Your life evolves, and so should your protection... Shanta Life Insurance ensures you stay ahead.',
      // image: '/assets/banners/banner22.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner22.jpg`,
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',
      description:
        'Your life evolves, and so should your protection... Shanta Life Insurance ensures you stay ahead.',
      // image: '/assets/banners/banner1.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner1.jpg`,
    },
  ]

  return (
    <>
      {/* {data && data?.heroes && data?.heroes?.length > 0 ? (
        <HeroSection heroSlides={data?.heroes || []}>
          {data?.ctaButtons && data?.ctaButtons?.length > 0 && (
            <CTAButtonBlock ctaButtons={data?.ctaButtons} />
          )}
        </HeroSection>
      ) : (
        <NoDataFound
          widthHeight="aspect-[16/9] h-[352px] md:h-auto 2xl:h-[958px] w-full"
          bgColor="#FFFFFF"
          message="No Hero Data Found"
          description="Please add data from the admin panel."
        />
      )} */}
      <HeroSection heroSlides={data || []}>
        {data?.ctaButtons && data?.ctaButtons?.length > 0 && (
          <CTAButtonBlock ctaButtons={data?.ctaButtons} />
        )}
      </HeroSection>
    </>
  )
}

export default HeroSectionWrapper
