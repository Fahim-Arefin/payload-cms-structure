import React from 'react'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'
import PremiumEligibilitySection from '@/components/custom/shared/plans/PremiumEligibilitySection'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Shanta Waiver of Premium',
      subtitleBN: 'শান্তা ওয়েভার অফ প্রিমিয়াম',
      description: `Secure future for your loved ones, in any situation`,
      descriptionBN: `জীবনের অনিশ্চয়তা কাটিয়ে, নিশ্চিত থাকুক আগামী`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/hero-banner.jpg`,
    },
  ]

  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/intro-banner.png`,
    // mobileImage:
    //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/planInfo4.png',
    description: `Life insurance is essential for the safety of your loved ones, but what if you're unable to pay 
    the premium due to unforeseen circumstances? The Shanta Waiver of Premium Rider will stand by you in such situations—where, 
    even if your income stops, the insurance benefits will continue, ensuring the protection of your family. `,
    descriptionBN: `অনাকাঙ্খিত দুর্ঘটনা আমাদের  প্রিমিয়াম পরিশোধ করতে অক্ষমতার কারনও হতে পারে। 
    শান্তা ওয়েভার অফ প্রিমিয়াম সহযোগী বীমা ঠিক সেই সময় আপনার পাশে দাঁড়াবে। অর্থাৎ, আপনার আয় বন্ধ হলেও—ইনস্যুরেন্স 
    কভারেজ অব্যাহত থাকবে যেন আপনার ও আপনার পরিবারের ভবিষ্যৎ থাকে সুরক্ষিত।`,
  }

  const offersData = [
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer5.png`,
      // mobileImage: '/assets//icons/mobile/offer5.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/offer-banner1.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg5.jpg',
      title: 'Plan 1',
      titleBN: 'পরিকল্পনা ১',
      description: `If the premium payer unexpectedly passes away, all future premiums are waived, 
        keeping the insurance active and your loved ones protected`,
      descriptionBN: `যেসকল ক্ষেত্রে প্রিমিয়াম প্রদানকারী এবং বীমাকৃত ব্যক্তি ভিন্ন সেক্ষেত্রে,
        যদি প্রিমিয়াম প্রদানকারী হঠাৎ মারা যান, তবে ভবিষ্যতের সব প্রিমিয়াম মওকুফ হবে, এবং পলিসি থাকবে সক্রিয়।`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer6.png`,
      // mobileImage: '/assets//icons/mobile/offer6.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/offer-banner2.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg6.jpg',
      title: 'Plan 2',
      titleBN: 'পরিকল্পনা ২',
      description: `If the premium payer suffers a sudden and permanent disability, all future premiums are waived, 
        ensuring the insurance continues to provide coverage.`,
      descriptionBN: `যদি প্রিমিয়াম প্রদানকারী হঠাৎ ও স্থায়ীভাবে অক্ষম হয়ে যান, তবে ভবিষ্যতের সব প্রিমিয়াম মওকুফ হবে 
      এবং পলিসি থাকবে সক্রিয়।` 
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer7.png`,
      // mobileImage: '/assets//icons/mobile/offer7.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/offer-banner3.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg7.jpg',
      title: 'Plan 3',
      titleBN: 'পরিকল্পনা ৩',
      description: `In the unfortunate event of the premium payer’s sudden death or permanent disability, 
        all future premiums are waived, and the insurance remains active, safeguarding your family's future.`,
      descriptionBN: `যেসকল ক্ষেত্রে প্রিমিয়াম প্রদানকারী এবং বীমাকৃত ব্যক্তি ভিন্ন সেক্ষেত্রে 
      মৃত্যু বা স্থায়ী অক্ষমতা—যেটাই ঘটুক না কেন, ভবিষ্যতের সব প্রিমিয়াম মওকুফ হবে। পলিসি চলতে থাকবে নিরবচ্ছিন্নভাবে, পরিবারের ভবিষ্যৎ থাকবে সুরক্ষিত।`
    },
  ]

  const eligibilityData = {
    title: 'Criteria For',
    titleBN: 'বীমা পরিকল্পনার ',
    subTitle: 'elegibility',
    subTitleBN: 'বৈশিষ্ট্য',
    smallTitle: '',
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/eligibility-banner.jpg`,
    bgMobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/mobile/eligibility-banner.jpg`,
    item: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon1.png`,
        // mobileImage: '/assets/icons/mobile/protection1.png',
        description: 'Premiums waived if ill or disabled',
        descriptionBN: `পরিকল্পনায় উল্লেখিত মৃত্যু বা স্থায়ী অক্ষমতার ক্ষেত্রে সুবিধা পাওয়া যাবে`
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon2.png`,
        // mobileImage: '/assets/icons/mobile/protection2.png',
        description: 'Must meet age, health rules',
        descriptionBN: `বয়স ও স্বাস্থ্য সম্পর্কিত যোগ্যতা নির্ধারণ করে সহযোগী বীমাটি অ্যাড করা যাবে`
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon3.png`,
        // mobileImage: '/assets/icons/mobile/protection3.png',
        description: 'For different payor and insured personnel plan 1 and 3 applies, if the payor is the insured personnel or the main plan is child education plan then only plan 2 applies.',
        descriptionBN: `নির্দিষ্ট পরিকল্পনা ও ঝুঁকির ভিত্তিতে অতিরিক্ত চার্জ প্রযোজ্য হতে পারে`
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/waiver-of-premium/web/icon4.png`,
        // mobileImage: '/assets/icons/mobile/protection4.png',
        description: 'Not for pre-existing conditions',
        descriptionBN: `পলিসি শুরুর আগের কোনো রোগ বা ইনজুরি এর জন্য  সুবিধা প্রযোজ্য নয়`
      },
    ],
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <PlanInfoSection data={planInfoData} />
      <OffersClientWrapper
        data={offersData}
        subheading="Shanta Waiver of Premium brings 3 exclusive plans to manage life's unexpected challenges. "
        subHeadingBN="অপ্রত্যাশিত সময়ে পাশে থাকার জন্য শান্তা ওয়েভার অব প্রিমিয়াম এনেছে ৩টি ভিন্ন পরিকল্পনা"
        card={2}
      />
      <PremiumEligibilitySection data={eligibilityData} />
      <ContactUsSection />
    </div>
  )
}

export default page
