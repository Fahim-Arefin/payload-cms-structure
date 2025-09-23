import CorporateAddons from '@/components/custom/corporate/CorporateAddons'
import CorporateChoose from '@/components/custom/corporate/CorporateChoose'
import CorporateHighlight from '@/components/custom/corporate/CorporateHighlights'
import CorporateOfferings from '@/components/custom/corporate/CorporateOfferings'
import CorporateSuitability from '@/components/custom/corporate/CorporateSuitability'
import OfferingsTab from '@/components/custom/corporate/OfferingsTab'
import PartnerCarousel from '@/components/custom/corporate/PartnerCarousel'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'

type Props = {}

function page({}: Props) {
  const heroSlides = [
    {
      title: 'Corporate Plans',
      titleBN: 'কর্পোরেট প্ল্যানসমূহ',
      subtitle: '',
      description: 'When you go further for your people, they go further for you.',
      descriptionBN: `আপনি যদি এমপ্লয়ীদের জন্য একটু বাড়তি করেন, তারাও আপনার জন্য বাড়তি করবে`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/corporateHeroBanner.jpg`,
    },
  ]

  const highlightData = [
    {
      mainDescription: `Deciding on the best package for your team , making sure you’re getting value for money, 
      and staying on top of the available options — it can all add up to a daunting to-do list. 
      We’re here to make that easier for you.`,
      mainDescriptionBN: `সঠিক প্যাকেজ বেছে নেওয়া, অর্থের সর্বোত্তম মূল্য নিশ্চিত করা, এবং সব উপলব্ধ বিকল্পের খোঁজ রাখা — 
      অনেক সময় জটিল মনে হতে পারে। শান্তা লাইফ আছে এই প্রক্রিয়াটিকে সহজ করতে।`,
    },
  ]

  const benefitsData = [
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose1.svg`,
      text: 'Comprehensive Coverage',
      textBN: 'সম্পূর্ণ কভারেজ',
      description:
        'Protection that spans natural demise, accidental fatalities, disabilities, and major health conditions. ',
      descriptionBN: `বিস্তৃত কভারেজ: মৃত্যু, দুর্ঘটনাজনিত মৃত্যু, অক্ষমতা ও বড় অসুস্থতা।`,
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose2.svg`,
      text: 'Hospital network 24/7 Online Doctor Consultancy Service',
      textBN: 'হাসপাতাল নেটওয়ার্ক ও ২৪/৭ অনলাইন ডাক্তার কনসালটেশন',
      description:
        'All-around healthcare support—covering hospitalization, maternity, dental, optical, and more.',
      descriptionBN: `সব ধরনের স্বাস্থ্যসেবা সাপোর্ট—হাসপাতালে ভর্তি, মাতৃত্বকালীন, দাঁতের চিকিৎসা, চোখের চিকিৎসা এবং আরও অনেক কিছু।`,
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose3.svg`,
      text: 'Online Claim Settlement Facility',
      textBN: 'অনলাইন ক্লেইম সেটেলমেন্ট সুবিধা',
      description: 'Smart and seamless claims support system with instant cashless access.',
      descriptionBN: `স্মার্ট ও সহজ ক্লেইম সাপোর্ট সিস্টেম, যেখানে সঙ্গে সঙ্গে ক্যাশলেস সুবিধা পাওয়া যায়।`,
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose4.svg`,
      text: 'Global Care Access',
      textBN: 'গ্লোবাল কেয়ার এক্সেস',
      description: 'Intelligent healthcare coverage—seamlessly bridging local and global support.',
      descriptionBN: `বুদ্ধিমান স্বাস্থ্যসেবা কভারেজ—লোকাল ও গ্লোবাল সাপোর্টকে একসাথে যুক্ত করে।`,
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose5.svg`,
      text: 'Dedicated Account Management',
      textBN: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজমেন্ট',
      description:
        'Enhance retention with data-backed care solutions, managed by a team of dedicated experts.',
      descriptionBN: `ডেটা-ভিত্তিক কেয়ার সল্যুশন দিয়ে গ্রাহক ধরে রাখুন, যা একদল বিশেষজ্ঞ টিম দ্বারা পরিচালিত।`,
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/corporate-bullet.png`,
      text: 'Lifestyle Benefits',
      textBN: 'লাইফস্টাইল সুবিধা',
      description: 'Lifestyle Benefit and Discount facility with the Wellness Pass.',
      descriptionBN: `ওয়েলনেস পাসের সাথে লাইফস্টাইল সুবিধা ও ডিসকাউন্ট অফার।`,
    },
  ]

  const suitabilityData = [
    {
      img: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/standard1.svg`,
      title: 'FOR LIFE COVERAGE',
      titleBN: 'লাইফ কভারেজ',
      descriptionBN: `১৮ থেকে ৬৪ বছর বয়সের সকল সুস্থ ইমপ্লয়ি কভারেজের জন্য যোগ্য। 
      নতুন নিয়োগপ্রাপ্ত ইম্পয়ী প্রথম দিন থেকেই তাৎক্ষণিক সুরক্ষা পান, যা তাদের যাত্রার শুরু থেকেই 
      সহজ এবং ঝামেলাহীন নিরাপত্তা নিশ্চিত করে।`,
      description:
        'All regular, healthy employees aged 18 to 64 are eligible for coverage. New hires receive instant protection from day one, ensuring seamless and hassle-free security from the very start of their journey with your company.',
    },
    {
      img: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/standard2.svg`,
      title: 'FOR HEALH COVERAGE',
      titleBN: 'হেলথ কভারেজ',
      descriptionBN: `সব সুস্থ ইমপ্লয়ি এই হেলথ কভারেজের জন্য যোগ্য। 
      এছাড়া তার ওপর নীর্ভরশিল পরিবারের সদস্য (স্বামী/স্ত্রী এবং সন্তানদের)  
      কভারেজ পেতে পারেন, যা পরিবারকেও সুরক্ষা দেয়।`,
      description:
        'All eligible employees qualify for this coverage. Extending it to their dependents adds another layer of support, demonstrating a strong commitment not only to the employee but also to their family—fostering security, care, and well-being for the entire household.',
    },
  ]

  const partnerData = [
    { img: '/assets/valued-clients/ShantaHolding.png', title: 'Shanta Holdings Limited' },
    {
      img: '/assets/valued-clients/shantaMultiverse.png',
      title: 'Shanta Multiverse Limited',
    },
    { img: '/assets/valued-clients/ShantaLifestyle.png', title: 'Shanta Lifestyle Limited' },
    { img: '/assets/valued-clients/amariDhaka.png', title: 'Amari Dhaka' },
    {
      img: '/assets/valued-clients/hohensteiname.png',
      title: 'Hohenstein Laboratories Bangladesh Limited',
    },
    {
      img: '/assets/valued-clients/63a0499788734fea9d45a6a1_Logo-eskimi.png',
      title: 'Eskimi Bangladesh',
    },
    { img: '/assets/valued-clients/seml-bg.png', title: 'Strategic Equity Management' },
    { img: '/assets/valued-clients/STS_Group_logo.png', title: 'STS Capital Limited' },
    { img: '/assets/valued-clients/Golden-Sky-LOGO-3.png', title: 'Golden Sky Footwear' },
    { img: '/assets/valued-clients/Blucheez-Red_Blucheez_logo.png', title: 'Blucheez Fashion' },
    // {
    //   img: '/assets/valued-clients/Eduko_Logo_Transparent_Background.png',
    //   title: 'Eduko Bangladesh',
    // },
    {
      img: '/assets/valued-clients/Glenrich-New-Logo-2048x1016.png',
      title: 'Glenrich International School',
    },
    { img: '/assets/valued-clients/Line2.png', title: 'Bengal Airlift Limited' },
    {
      img: '/assets/valued-clients/acebangladesh-e1729689682400.png',
      title: 'Ace Bangladesh Limited',
    },
    { img: '/assets/valued-clients/Fitsair_logo.png', title: 'FitsAir' },
    { img: '/assets/valued-clients/airAlliance.png', title: 'Air Alliance Ltd. (SP)' },
    { img: '/assets/valued-clients/ups.png', title: 'UPS Authorized Service Contractor' },
    {
      img: '/assets/valued-clients/pixel_speedmark_8fb3bdc46abb8be4b9e2d982fdffea1d-4-4.png',
      title: 'Speedmark Transportation (BD) Limited',
    },
  ]

  const addOnsData = [
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addonIcon1.svg`,
      description: 'Cashless Hospitalization Facility',
      descriptionBN: 'ক্যাশলেস হসপিটালাইজেশন সুবিধা',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg1.jpg`,
      link: `/plans/corporate/cashless-hospitalization-facility`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addonIcon2.svg`,
      description: 'Integrated Healthcare & Hospital Network',
      descriptionBN: 'ইন্টিগ্রেটেড হেলথকেয়ার ও হাসপাতাল নেটওয়ার্ক',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg2.jpg`,
      link: `/plans/corporate/integrated-healthcare-and-hospital-network`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addonIcon3.svg`,
      description: 'Lifestyle Privileges with Digital Loyalty Card',
      descriptionBN: 'ডিজিটাল লয়ালটি কার্ডের মাধ্যমে লাইফস্টাইল প্রিভিলেজ',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg3.jpg`,
      link: `/plans/corporate/lifestyle-privileges-with-digital-loyalty-card`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addonIcon4.svg`,
      description: 'Telemedicine Services — Healthcare Anytime, Anywhere',
      descriptionBN: 'টেলিমেডিসিন সেবা – যেকোনো সময়, যেকোনো স্থানে হেলথকেয়ার',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg4.jpg`,
      link: `/plans/corporate/telemedicine-services`,
    },
  ]

  const tabItems = [
    {
      value: 'life',
      label: 'Life Insurance Benefits',
      labelBN: 'লাইফ ইন্স্যুরেন্স সুবিধাসমূহ',
    },
    {
      value: 'medical',
      label: 'Medical Insurance Benefits',
      labelBN: 'মেডিকেল ইন্স্যুরেন্স সুবিধাসমূহ',
    },
  ]

  const tabContent = [
    {
      content: [
        {
          title: 'Group Life Insurance (GL)',
          titleBN: 'গ্রুপ লাইফ ইন্স্যুরেন্স (GL)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon1.png`,
          description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated 
          beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
          descriptionBN: `বীমাকৃত সদস্যের মৃত্যু ঘটলে, শান্তা লাইফ মনোনীত উত্তরাধিকারী বা প্রতিষ্ঠানে আর্থিক সহায়তা প্রদান করে — 
          নীতির শর্ত অনুযায়ী। এটি কঠিন সময়ে মানসিক শান্তি ও আর্থিক নিরাপত্তা নিশ্চিত করে।`,
        },
        {
          title: 'Accidental Death Coverage (AD)',
          titleBN: 'দুর্ঘটনাজনিত মৃত্যু কভারেজ (AD)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon1.png`,
          description: `In case of death due to an accident, Shanta Life pays an additional benefit on top of the natural death coverage, 
          offering extra financial protection to the nominee or organization.`,
          descriptionBN: `দুর্ঘটনায় মৃত্যু হলে, প্রাকৃতিক মৃত্যুর কভারেজের পাশাপাশি অতিরিক্ত আর্থিক সুবিধা প্রদান করা হয়, 
          যা মনোনীত ব্যক্তি বা প্রতিষ্ঠানের জন্য বাড়তি সুরক্ষা নিশ্চিত করে।`,
        },
        {
          title: 'Permanent and Total Disability (PTD)',
          titleBN: 'স্থায়ী ও সম্পূর্ণ অক্ষমতা (PTD)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon3.png`,
          description: `In case of total and permanent disability due to an accident, the full sum insured is paid, 
          ensuring financial stability for the employee and their family.`,
          descriptionBN: `দুর্ঘটনায় স্থায়ী ও সম্পূর্ণ অক্ষম হলে সম্পূর্ণ বীমা অংক প্রদান করা হয়, যা কর্মচারী ও তার পরিবারের আর্থিক 
          স্থিতিশীলতা নিশ্চিত করে।`,
        },
        {
          title: 'Permanent and Partial Disability (PPD)',
          titleBN: 'স্থায়ী ও আংশিক অক্ষমতা (PPD)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon4.png`,
          description: `In case of partial but permanent disability due to an accident, Shanta Life provides a 
          fixed benefit to the employee or employer, as per Bangladesh labor laws, helping ensure financial support 
          during recovery and adaptation.`,
          descriptionBN: `দুর্ঘটনায় আংশিক কিন্তু স্থায়ী অক্ষমতা হলে কর্মচারী বা নিয়োগকর্তাকে বাংলাদেশ শ্রম আইনের আলোকে 
          নির্ধারিত আর্থিক সহায়তা প্রদান করা হয়।`,
        },
        {
          title: 'Critical Illness Coverage (CIB)',
          titleBN: 'গুরুতর অসুস্থতা কভারেজ (CIB)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon5.png`,
          description: `Shanta Life’s Critical Illness Benefit provides financial support if the insured is diagnosed 
          with a specified serious condition, helping ease the burden of medical expenses so the focus can remain on 
          recovery.`,
          descriptionBN: `গুরুতর অসুস্থতা ধরা পড়লে শান্তা লাইফ আর্থিক সহায়তা প্রদান করে, যাতে চিকিৎসা ব্যয়ের চাপ কমে এবং 
          সুস্থতায় মনোযোগ দেওয়া যায়।`,
        },
      ],
    },
    {
      content: [
        {
          title: 'In-Patient Coverage (IPC)',
          titleBN: 'ইন-পেশেন্ট কভারেজ (IPC)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon6.png`,
          description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
          descriptionBN: `২৪ ঘণ্টা বা তার বেশি হাসপাতালে ভর্তি হওয়ার ক্ষেত্রে (অসুস্থতা বা আঘাতের কারণে) রুম চার্জ, চিকিৎসা বিল 
          ও সম্পর্কিত খরচ কভার করা হয়।`,
        },
        {
          title: 'Maternity Benefits',
          titleBN: `মাতৃত্বকালীন সুবিধা`,
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon7.png`,
          description: `Welcoming a new life should be a moment of joy, not financial stress. Our Maternity Benefit offers coverage for:
          Normal delivery, Caesarean, ectopic, or extra-uterine pregnancies, Legal abortion or miscarriage.
          This benefit is available for female employees and/or spouses up to 45 years of age.`,
          descriptionBN: `একটি নতুন জীবনকে স্বাগত জানান আনন্দের সঙ্গে, আর্থিক চাপ ছাড়াই। কভারেজের আওতায়:
          স্বাভাবিক প্রসব
          সিজারিয়ান, একটপিক বা এক্সট্রা-ইউটেরিন গর্ভধারণ
          বৈধ গর্ভপাত বা গর্ভস্রাব
          এই সুবিধা মহিলা কর্মচারী ও/অথবা স্ত্রীদের জন্য প্রযোজ্য, বয়সসীমা ৪৫ বছর পর্যন্ত।`,
        },
        {
          title: 'Out Patient Coverage (OPC)',
          titleBN: 'আউট-পেশেন্ট কভারেজ (OPC)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon8.png`,
          description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
        },
        {
          title: 'OPC Dental',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon9.png`,
          description: `Not all treatments require hospitalization. Our OPC Plan reimburses expenses for consultations, medicines, and diagnostic tests, helping employees access quality healthcare without added costs. Covered services include:
          a)  Doctor consultation fees,
          b)  Medication,
          c)  Diagnostic tests and procedures.`,
          descriptionBN: `সব চিকিৎসার জন্য হাসপাতালে ভর্তি হওয়া লাগে না। আমাদের OPC সুবিধা পরামর্শ, ওষুধ ও ডায়াগনস্টিক টেস্টের খরচ ফেরত দেয়। কভারেজ অন্তর্ভুক্ত:
          ডাক্তারি ফি,
          ওষুধ,
          ডায়াগনস্টিক টেস্ট।`,
        },
        {
          title: 'OPC Optical',
          titleBN: 'OPC ডেন্টাল',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon10.png`,
          description: `Dental care is essential, and our Dental OPC benefit helps cover common treatments that do not require hospitalization. This includes:
          a) Dental consultations,
          b) Fillings,
          c) Routine extractions,
          d) Medication and X-rays,
          e) Root canal treatment, including bridging and capping,
          f) Scaling & polishing (once a year for each member).`,
          descriptionBN: `দাঁতের চিকিৎসায় কভারেজ, যেমন:
          ডেন্টাল কনসালটেশন,
          ফিলিংস,
          সাধারণ দাঁত তোলা,
          ওষুধ ও এক্স-রে,
          রুট ক্যানাল, ব্রিজিং ও ক্যাপিং,
          স্কেলিং ও পলিশিং (প্রতি সদস্য বছরে একবার)।`,
        },
      ],
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start 
        "
        >
          {/* <Link
            href="/assets/pdf/Required Brochures/Corporate Plans/Shanta Company Profile Brochure.pdf"
            target="_blank"
          >
            <GlobalButton size="large" text="Download Brochure" variant="primary" />
          </Link> */}

          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <CallNowButton />
          </div>
        </div>
      </HeroSection>
      <CorporateHighlight highlightsData={highlightData} />
      <OfferingsTab data={tabContent} config={tabItems} />
      {/* <CorporateOfferings /> */}
      <CorporateChoose benefitsData={benefitsData} />
      <CorporateSuitability data={suitabilityData} />
      <PartnerCarousel data={partnerData} />
      <CorporateAddons data={addOnsData} />
      <ContactUsSection />
    </div>
  )
}

export default page
