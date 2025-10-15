import CallNowButton from '@/components/custom/shared/CallNowButton'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import AccidentalIntroSection from '@/components/custom/shared/plans/AccidentalIntroSection'
import AccidentalPermanentPartialDisabilitySection from '@/components/custom/shared/plans/AccidentalPermanentPartialDisabilitySection'
import MatricsSection from '@/components/custom/shared/plans/MatricsSection'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'

function page() {
  const heroSlides = [
    {
      title: 'Shanta Accidental Coverage',
      titleBN: 'শান্তা অ্যাক্সিডেন্টাল কভারেজ',
      subtitle: '',
      description: `We're here to be your grounded force because a stumble should never steal your stride.`,
      descriptionBN: `আমরা আছি আপনার দৃঢ় ভরসা হয়ে, যেন জীবনের ছোট্ট ছোট্ট বাধাও দমাতে না পারে আপনার এগিয়ে যাওয়ার গতি।`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banner10.jpg`,
    },
  ]
  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/accidental-coverage.png`,
    // mobileImage:
    //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/planInfo4.png',
    descriptionBN: `একটি অনাকাঙ্ক্ষিত দুর্ঘটনা মুহূর্তেই বদলে দিতে পারে জীবনের গতি, 
    আপনাকে ও আপনার পরিবারকে ফেলে দিতে পারে অনিশ্চয়তার মুখে। শান্তা লাইফের অ্যাক্সিডেন্টাল 
    কভারেজ সেই অপ্রত্যাশিত ঝড়ের সময় হয়ে ওঠে আপনার ভরসা—যা আর্থিক চাপ লাঘব করে এবং 
    আপনাকে দিবে পুনরায় ঘুরে দাঁড়ানোর শক্তি।`,
    description: `Accidents can bring life to a sudden halt, impacting financial strain and uncertainty for you and your family. With Shanta Life's Accidental Coverage, you get a reliable safety net to help safeguard your future and ease the financial burden of unforeseen events. We've got you covered, so you can focus on the recovery. `,
  }
  const offersData = [
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer5.png`,
      // mobileImage: '/assets//icons/mobile/offer5.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/offerbg5.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg5.jpg',
      title: 'Medical Expense Coverage',
      description: 'Helping with treatment costs so you can focus on recovery.',
      titleBN: 'দুর্ঘটনাজনিত চিকিৎসার আর্থিক খরচ',
      descriptionBN: `চিকিৎসা খরচে সহায়তা, যাতে আপনি সুস্থতার প্রতি পূর্ণ মনোযোগী হতে পারেন।`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer6.png`,
      // mobileImage: '/assets//icons/mobile/offer6.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/offerbg6.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg6.jpg',
      title: 'Permanent Partial Disability',
      description: 'Financial support if an accident limits your abilities.',
      titleBN: 'দুর্ঘটনায় আংশিক চিরস্থায়ী অক্ষমতায় বীমা সুবিধা',
      descriptionBN: `দুর্ঘটনায় আপনার শারীরিক সক্ষমতা সীমিত হলে, আর্থিক সহায়তা।`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer7.png`,
      // mobileImage: '/assets//icons/mobile/offer7.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/offerbg7.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg7.jpg',
      title: 'Permanent Total Disability',
      description: 'Security for you and your family in case of lifelong disability.',
      titleBN: 'দুর্ঘটনায় পূর্ণাঙ্গ চিরস্থায়ী অক্ষমতায় বীমা সুবিধা',
      descriptionBN: `চিরস্থায়ী পূর্ণাঙ্গ শারীরিক অক্ষমতায় আপনার ও আপনার পরিবারের জন্য নির্ভরযোগ্য সুরক্ষা।`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/offer8.png`,
      // mobileImage: '/assets//icons/mobile/offer8.png',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/accidental-coverage/web/offerbg8.jpg`,
      // bgMobileImage:
      //   '/assets/solutions/individual/health-and-protection/accidental-coverage/mobile/offerbg8.jpg',
      title: 'Accidental Death',
      description:
        'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
      titleBN: 'দুর্ঘটনায় মৃত্যুতে মূল পলিসি কভারেজের দ্বিগুণ সুবিধা',
      descriptionBN: `আপনার প্রিয়জনরা পাবে দ্বিগুণ বীমা কভারেজ, যা যোগ করবে এক অতিরিক্ত নিরাপত্তার স্তর। (মূল জীবনবীমা কভারেজসহ)`,
    },
  ]
  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[250px] md:top-[330px] lg:top-[420px] xl:top-[450px]  2xl:top-[700px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <CallNowButton />
          </div>
        </div>
      </HeroSection>
      <AccidentalIntroSection data={planInfoData} />
      <OffersClientWrapper
        data={offersData}
        subheading="Four types of protection to keep you and your loved ones financially secure"
        subHeadingBN="আপনার যেকোনো দুর্ঘটনায় আর্থিক নিশ্চয়তা প্রদানের জন্য শান্তা  অ্যাক্সিডেন্টাল কভারেজ চারটি ভিন্ন বীমা সুবিধা প্রদান করে"
        card={2}
      />
      <AccidentalPermanentPartialDisabilitySection />
      <MatricsSection />
      <ContactUsSection />
    </div>
  )
}

export default page
