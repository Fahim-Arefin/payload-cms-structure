import HeroSection from '@/components/custom/shared/hero/HeroSection'
import BenefitSliderSection from '@/components/custom/shared/plans/BenefitSliderSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Lifestyle Privileges',
      titleBN: 'ডিজিটাল লয়্যালটি কার্ডের সাথে',
      subtitle: 'with Digital Loyalty Card ',
      subtitleBN: 'লাইফস্টাইল প্রিভিলেজ',
      description:
        'Life insurance that rewards you — with lifestyle privileges to enrich every day.',
      descriptionBN: `প্রতিদিনের জীবনকে সমৃদ্ধ করতে লাইফ ইন্স্যুরেন্স, যা আপনাকে দেয় বিশেষ লাইফস্টাইল সুবিধা।`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/LPWDLC-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'Enriching Lifestyles Everyday',
    titleBN: `প্রতিদিনের জীবনকে সমৃদ্ধ করুন`,
    descriptionBN: `শান্তা লাইফের কভারেজের সঙ্গে উপভোগ করুন বিশেষ প্রিভিলেজ। 
    আমাদের এক্সক্লুসিভ পার্টনার নেটওয়ার্কের মাধ্যমে হোটেল, লাইফস্টাইল ব্র্যান্ড এবং আরও 
    নানা সেবায় বিশেষ ছাড় — যা প্রতিদিন আপনার জীবনযাত্রাকে করবে আরও উন্নত ও আরামদায়ক।`,
    description: `
   With Shanta Life, coverage comes with privileges. Enjoy special discounts on hotels, lifestyle brands, and more — with a growing list of enriching partners designed to make your life better every day.
  `,
  }

  const benefitSliderData = {
    title: 'Benefits of',
    titleBN: `প্রিয় মুহূর্তেগুলো এনজয় করুন`,
    coloredTitle: 'Our Hospital Network',
    coloredTitleBN: 'শান্তা লাইফ এর স্পেশাল ডিসকাউন্টে',
    description: 'Discover the benefits that make our hospital service special.',
    descriptionBN: `শান্তা লাইফ এর ওয়েলনেস কার্ড এর সাথে আনলক করুন লাক্সারি ডিসকাউন্টস - আপনার
    অবসরকে করুন আরোও আকর্ষণীয়।`,
    item: [
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage1.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon1.png`,
        description: 'Seagull Hotels Ltd.',
        rateText: 'Save up to 60%',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage2.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon2.png`,
        description: 'Amari Dhaka',
        rateText: '5-star comfort at special prices',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage3.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon3.png`,
        description: 'Seagull resort & spa village',
        rateText: 'Save up to 60%',
      },
      {
        bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFBgImage4.jpg`,
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/CHFIcon4.png`,
        description: 'White hall Hotel',
        rateText: ' Premium luxury at affordable rates',
      },
    ],
  }

  const WCTMSectionData = {
    title: 'Hotel & Resort',
    titleBN: 'হোটেল ও রিসোর্ট',
    coloredTitle: 'Discounts',
    coloredTitleBN: `ডিসকাউন্ট`,
    descriptionBN: `আপনার ছুটি কিংবা ব্যবসায়িক ভ্রমণ হোক এক অনন্য অভিজ্ঞতা। প্রিমিয়াম হোটেল ও রিসোর্টে সর্বোচ্চ ৬০% 
    পর্যন্ত এক্সক্লুসিভ ডিসকাউন্ট উপভোগ করুন শান্তা লাইফ ডিজিটাল লয়্যালটি কার্ডের মাধ্যমে।`,
    description:
      'Turn your holidays and business trips into unforgettable experiences at premium hotels and resorts with exclusive discounts of up to 60% through Digital Loyalty Card. ',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/lifestyle-privileges-with-digital-loyalty-card/web/WCTMImage.png`,
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <WCTMSection data={WCTMSectionData} className="bg-white" />
      <BenefitSliderSection data={benefitSliderData} basis=" basis-1/2 md:basis-1/3 lg:basis-1/4" />
    </div>
  )
}

export default page
