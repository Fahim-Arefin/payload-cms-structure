import AllAboutSection from '@/components/custom/about-us/AllAboutSection'
import AllOfThemSection from '@/components/custom/about-us/AllOfThemSection'
import AwardSection from '@/components/custom/about-us/AwardSection'
import DirectorCard from '@/components/custom/about-us/DirectorCard'
import DirectorListSection from '@/components/custom/about-us/DirectorListSection'
import FootPrintSection from '@/components/custom/about-us/FootPrintSection'
import LiscensedInfo from '@/components/custom/about-us/LiscensedInfo'
import ShantaLifeIntroSection from '@/components/custom/about-us/ShantaLifeIntroSection'
import VisionMissionSection from '@/components/custom/about-us/VisionMissionSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Driven by purpose,',
      subtitle: 'Designed for Life',
      description:
        'At Shanta Life Insurance, our values aren’t just feel-good words — they’re the GPS guiding every decision, every smile, and every ‘we’ve got you covered’ moment.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/aboutUsBanner.jpg`,
    },
    // {
    //   title: 'Building Better Futures',
    //   subtitle: 'One Step at a Time',
    //   description:
    //     'We walk with you on your journey, providing the tools you need to succeed and grow.',
    //   image: '/assets/banner2.jpg',
    // },
    // {
    //   title: 'Innovative Thinking',
    //   subtitle: 'Impactful Living',
    //   description: "Harness innovation to redefine your future. Together, let's make a difference.",
    //   image: '/assets/banner1.jpg',
    // },
  ]

  const shantaIntroContent = {
    heading: 'Advancing',
    subheading: 'A Legacy of Setting Standards',
    paragraphTitle: 'Nurtured with Trust. Built for Tomorrow',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/shantaIntroImage.png`,
    // mobileImage: '/assets/about-us/web/shantaIntroImage.png',
    paragraph:
      'Born from a vision to redefine life insurance in Bangladesh, Shanta Life is backed by a powerful consortium comprised of Shanta Holdings, Shanta Lifestyle, Shanta Securities, Shanta Asset Management, Shanta Equity, Shanta Multiverse, Shanta Property Management, FAR Asset Management, and Nasah Holdings.',
  }
  const vissionMissionContent = {
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/vision.png`,
    // bgMobileImage: '/assets/about-us/mobile/vision.png',
    visionDescription:
      'To be the most trusted insurance brand by protecting the uncertainties of life through simple solutions and delivering maximum value.',
    missionDescription:
      'To promote the desired quality of life through innovation, digitalization and customer centricity.',
  }

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

  const liscensedData = {
    licensedImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/licensed.png`,
    // licensedMobileImage: '/assets/icons/mobile/licensedMobile.png',
    licensedDate: 'November 7, 2023',

    launchedImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/rocket.png`,
    // launchedMobileImage: '/assets/icons/mobile/rocketMobile.png',
    launchedDate: ' December 1, 2024',
  }

  const directorCardData = [
    {
      image: '/assets/about-us/web/directoralone.png',
      mobileImage: '/assets/about-us/mobile/directoralone.png',
      name: 'Khondoker Monir Uddin',
      designation: 'Chairman',
      title: 'Charting the Course',
      subtitle: 'for a Bold Tomorrow',
      description: `
      A highly distinguished and perceptive entrepreneur, Mr. Khondoker Monir Uddin, the founder promoter of Shanta, opts to do business by providing world-class products and services in Bangladesh. With his visionary leadership and extensive business knowledge, Shanta drives forward to not only provide superior quality products and services, but to demonstrate unparalleled foresight by establishing a new standard in every sector in which the company operates. The reputation and success of Shanta are testaments to his high ethical standard and relentless focus on quality, innovation and social responsibility. He is widely regarded as one of the most successful entrepreneurs in Bangladesh, who has brought transformative change in every sector the group has entered from Real Estate to Financial Services, Healthcare, Education and Retail. Mr. Monir completed both his Bachelors with honors and Masters degrees from the Department of Accounting, University of Dhaka. Over the past four decades, he has established Shanta as one of the leading corporate houses in Bangladesh, with successful investments in diversified sectors and thus has been continually recognized as a Commercially Important Person (CIP) by the Government of Bangladesh since 2000 till date. Mr. Monir is also a founder and Managing Director of the prestigious STS Group - which revolutionized the healthcare and education sectors of the country by establishing international standard institutions like Evercare Hospital Dhaka (previously Apollo Hospitals Dhaka), Evercare Hospital Chattogram, International School Dhaka (ISD), the Glenrich International Schools (Previously DPS STS schools). He is also a sponsor Director and former Chairman of Dhaka Bank Limited, and the Managing Director of Shanta Holdings Limited and Shanta Securities Limited.  
`,
      // link: 'https://shantalife.com/message-form-chairman.php',
      link: '/all-bods#id-1',
    },
    {
      image: '/assets/about-us/web/CEOalone.png',
      mobileImage: '/assets/about-us/mobile/CEOalone.png',
      name: 'Nafis Akhter Ahmed',
      designation: 'Chief Executive Officer',
      title: 'Redefining',
      subtitle: 'Life Insurance',
      description: `Prior to stepping into the role of Chief Executive Officer at Shanta Life Insurance, Nafis Akhter Ahmed embarked on his career journey with MetLife in July 2001, serving as a Sales Manager for Agency Operations in Bangladesh. His dedication and performance led to promotions within the company, as he was elevated to the position of Deputy Agency Director in February 2006, and subsequently as Agency Director in June 2013. In these capacities, Nafis was entrusted with the pivotal responsibilities of steering the leadership and fostering the growth of career Agency Channels for MetLife Bangladesh, while also spearheading efforts to achieve profitability targets for the Bangladesh Agency Operation. With a wealth of experience exceeding 20 years in the Life Insurance industry, Nafis commenced his professional odyssey as a sales counselor in New York, USA in 1995. Possessing a remarkable track record, he has proven himself as a successful and talented executive proficient in Sales, Customer Service, Sales Management, Business Development, Distribution, Face-to-Face interactions, Corporate Sales, Key Account Management, Market Expansion, Strategic Planning, and Team Building. His expertise spans across diverse industries including Insurance, Electronics, Education, and Yarn & Fabrics, both in the US and Bangladesh. Prior to his tenure at MetLife, Nafis held significant roles as the Network (Distribution) Head at Axiom Technologies Limited., and as the Sales & Marketing Manager at Integra Communications Limited. (the sole distributor of Motorola GSM). Nafis's academic credentials include a Bachelor of Business Administration with a major in Accounting from Kansas State University in the USA. Additionally, he holds the Fellow, Life Management Institute (FLMI) qualification from LOMA financial services education.`,
      // link: 'https://shantalife.com/message-form-ceo.php',
      link: '/all-leaders#id-1',
    },
  ]

  const directorProfileData = [
    {
      id: 1,
      image: '/assets/about-us/web/aboutusdirectors/profile1.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile1.png',
      name: 'Khondoker Monir Uddin',
      title: 'Chairman',
    },
    {
      id: 2,
      image: '/assets/about-us/web/aboutusdirectors/profile2.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile2.png',
      name: 'Jasmine Sultana',
      title: 'Director',
    },
    {
      id: 3,
      image: '/assets/about-us/web/aboutusdirectors/profile3.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile3.png',
      name: 'Saif Khondoker',
      title: 'Director',
    },
    {
      id: 4,
      image: '/assets/about-us/web/aboutusdirectors/profile4.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile4.png',
      name: 'Mayesha Khondoker',
      title: 'Director',
    },
    {
      id: 5,
      image: '/assets/about-us/web/aboutusdirectors/profile5.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile5.png',
      name: 'Farzana Hasan',
      title: 'Director',
    },
    {
      id: 6,
      image: '/assets/about-us/web/aboutusdirectors/profile6.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile6.png',
      name: 'Raiven Hasan',
      title: 'Director',
    },
    {
      id: 7,
      image: '/assets/about-us/web/aboutusdirectors/profile8.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile8.png',
      name: 'Arif Khan, CFA, FCMA',
      title: 'Director',
    },
    {
      id: 8,
      image: '/assets/about-us/web/aboutusdirectors/profile10.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile10.png',
      name: 'Iftekhar Rahman',
      title: 'Director',
    },
    {
      id: 9,
      image: '/assets/about-us/web/aboutusdirectors/profile7.png',
      mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile7.png',
      name: 'M. Anisul Haque',
      title: 'Director',
    },
  ]

  const allOfThemData = [
    {
      id: 1,
      image: '/assets/about-us/web/aboutusleaders/CEO.png',
      mobileImage: '/assets/about-us/mobile/aboutusleaders/CEO.png',
      name: 'Nasif A Ahmed',
      title: 'Chief Executive Officer',
    },
    {
      id: 2,
      image: '/assets/about-us/web/aboutusleaders/CDO.png',
      mobileImage: '/assets/about-us/mobile/aboutusleaders/CDO.png',
      name: 'M Khurshed Kaisar',
      title: 'Chief Distribution Officer',
    },
    {
      id: 3,
      image: '/assets/about-us/web/aboutusleaders/CITO.png',
      mobileImage: '/assets/about-us/mobile/aboutusleaders/CITO.png',
      name: 'Mohammad Maksud Hossain',
      title: 'Chief IT Officer',
    },
    {
      id: 4,
      image: '/assets/about-us/web/aboutusleaders/CMO.png',
      mobileImage: '/assets/about-us/mobile/aboutusleaders/CMO.png',
      name: 'Jane Alam Romel',
      title: 'Chief Marketing Officer',
    },
    {
      id: 5,
      image: '/assets/about-us/web/aboutusleaders/CFO.png',
      mobileImage: '/assets/about-us/mobile/aboutusleaders/CFO.png',
      name: 'Majedur Rashid Chowdhury',
      title: 'Chief Financial Officer',
    },
  ]

  const footPrintData = {
    title: 'Shanta’s FOOTPRINT',
    subTitle: 'Where Every Venture Connects',
    bgImage: '/assets/about-us/web/footprint.gif',
    bgMobileImage: '/assets/about-us/mobile/footprint.gif',
    data: [
      {
        image: '/assets/about-us/web/footprint3.png',
        mobileImage: '/assets/about-us/mobile/footprint3.png',
        title: 'Shanta Holdings',
        link: 'https://shantaholdings.com/',
        description:
          'The premier real estate developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the caliber of the finest developers across the globe.',
      },
      {
        image: '/assets/about-us/web/footprint4.jpg',
        mobileImage: '/assets/about-us/mobile/footprint4.jpg',
        title: 'Shanta Securities',
        link: 'https://www.shantasecurities.com/',
        description:
          'An innovative financial services company offering a range of brokerage and investing solutions.',
      },
      {
        image: '/assets/about-us/web/assetmanagement.jpg',
        mobileImage: '/assets/about-us/mobile/assetmanagement.jpg',
        title: 'Shanta Asset Management',
        link: 'https://www.shanta-aml.com/',
        description:
          'Shanta Asset Management Limited is a leading asset management company in Bangladesh offering corporate and open-end mutual fund management solutions to address the distinct investment objectives of its diverse clientele, including individuals and institutions.',
      },
      {
        image: '/assets/about-us/web/shanta-equity-img.jpg',
        mobileImage: '/assets/about-us/mobile/shanta-equity-img.jpg',
        title: 'Shanta Equity',
        link: 'https://shantaequity.net/',
        description:
          'A full-fledged merchant bank offering a range of investment banking, corporate advisory and portfolio management solutions.',
      },
      {
        image: '/assets/about-us/web/footprint5.jpg',
        mobileImage: '/assets/about-us/mobile/footprint5.jpg',
        title: 'Shanta Lifestyle',
        link: 'https://shantalifestyle.com/',
        description:
          'Luxury home décor company established with an aim to cater to the increasingly sophisticated interior design needs of Bangladeshi consumers searching for customization, luxury and exclusivity.',
      },
      {
        image: '/assets/about-us/web/footprint2.jpg',
        mobileImage: '/assets/about-us/mobile/footprint2.jpg',
        title: 'Shanta Multiverse',
        link: 'https://shantamultiverse.com/',
        description:
          'Shanta Multiverse owns and operates The White Canary Café, a specialty all-day brunch and cafe chain with its presence spanning 5 locations in Dhaka, Bangladesh.',
      },
      {
        image: '/assets/about-us/web/shanta_property.jpg',
        mobileImage: '/assets/about-us/mobile/shanta_property.jpg',
        title: 'Shanta Property Management',
        link: 'https://www.shantapml.com/',
        description:
          'Shanta Property Management Limited offers integrated property management solutions in Bangladesh, specializing in facilities management, rental services, and buy-sell advisory for a seamless living experience.',
      },
    ],
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} />
      <ShantaLifeIntroSection shantaIntroContent={shantaIntroContent} />
      <VisionMissionSection vissionMissionContent={vissionMissionContent} />
      <AllAboutSection allAboutData={allAboutData} />
      <LiscensedInfo data={liscensedData} />
      {directorCardData?.map((data, index) => {
        return <DirectorCard data={data} index={index} key={index} />
      })}
      <DirectorListSection directorProfileData={directorProfileData} />
      <AllOfThemSection allOfThemData={allOfThemData} />
      <AwardSection />
      <FootPrintSection footPrintData={footPrintData} />
    </div>
  )
}

export default page
