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
      subtitle: '',
      description: 'When you go further for your people, they go further for you.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/corporateHeroBanner.jpg`,
    },
  ]

  const highlightData = [
    {
      mainDescription: `Deciding on the best package for your team , making sure you’re getting value for money, and staying on top of the available options — it can all add up to a daunting to-do list. We’re here to make that easier for you.`,
    },
  ]

  const benefitsData = [
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose1.svg`,
      text: 'Comprehensive Coverage',
      description:
        'Protection that spans natural demise, accidental fatalities, disabilities, and major health conditions. ',
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose2.svg`,
      text: 'Hospital network 24/7 Online Doctor Consultancy Service',
      description:
        'All-around healthcare support—covering hospitalization, maternity, dental, optical, and more.',
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose3.svg`,
      text: 'Online Claim Settlement Facility',
      description: 'Smart and seamless claims support system with instant cashless access.',
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose4.svg`,
      text: 'Global Care Access',
      description: 'Intelligent healthcare coverage—seamlessly bridging local and global support.',
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose5.svg`,
      text: 'Dedicated Account Management',
      description:
        'Enhance retention with data-backed care solutions, managed by a team of dedicated experts.',
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/corporate-bullet.png`,
      text: 'Lifestyle Benefits',
      description: 'Lifestyle Benefit and Discount facility with the Wellness Pass.',
    },
  ]

  const suitabilityData = [
    {
      img: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/standard1.svg`,
      title: 'FOR LIFE COVERAGE',
      description:
        'All regular, healthy employees aged 18 to 64 are eligible for coverage. New hires receive instant protection from day one, ensuring seamless and hassle-free security from the very start of their journey with your company.',
    },
    {
      img: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/standard2.svg`,
      title: 'FOR HEALH COVERAGE',
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
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg1.jpg`,
      link: `/plans/corporate/cashless-hospitalization-facility`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addonIcon2.svg`,
      description: 'Integrated Healthcare & Hospital Network',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg2.jpg`,
      link: `/plans/corporate/integrated-healthcare-and-hospital-network`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addonIcon3.svg`,
      description: 'Lifestyle Privileges with Digital Loyalty Card',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg3.jpg`,
      link: `/plans/corporate/lifestyle-privileges-with-digital-loyalty-card`,
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addonIcon4.svg`,
      description: 'Telemedicine Services — Healthcare Anytime, Anywhere',
      bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/addOnimg4.jpg`,
      link: `/plans/corporate/telemedicine-services`,
    },
  ]

  const tabItems = [
    {
      value: 'life',
      label: 'Life Insurance Benefits',
    },
    {
      value: 'medical',
      label: 'Medical Insurance Benefits',
    },
  ]

  const tabContent = [
    {
      content: [
        {
          title: 'Group Life Insurance (GL)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon1.png`,
          description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated 
          beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
        },
        {
          title: 'Accidental Death Coverage (AD)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon1.png`,
          description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated 
          beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
        },
        {
          title: 'Permanent and Total Disability (PTD)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon3.png`,
          description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated 
          beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
        },
        {
          title: 'Permanent and Partial Disability (PPD)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon4.png`,
          description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated 
          beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
        },
        {
          title: 'Critical Illness Coverage (CIB)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon5.png`,
          description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated 
          beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
        },
      ],
    },
    {
      content: [
        {
          title: 'In-Patient Coverage (IPC)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon6.png`,
          description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
        },
        {
          title: 'Maternity Benefits',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon7.png`,
          description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
        },
        {
          title: 'Out Patient Coverage (OPC)',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon8.png`,
          description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
        },
        {
          title: 'OPC Dental',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon9.png`,
          description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
        },
        {
          title: 'OPC Optical',
          image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon10.png`,
          description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
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
