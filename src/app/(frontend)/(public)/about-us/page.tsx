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
      image: '/assets/aboutUsBanner.jpg',
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
    image: '/assets/shantaIntroImage.png',
    paragraph:
      'Born from a vision to redefine life insurance in Bangladesh, Shanta Life is backed by a powerful consortium comprised of Shanta Holdings, Shanta Lifestyle, Shanta Securities, Shanta Asset Management, Shanta Equity, Shanta Multiverse, Shanta Property Management, FAR Asset Management, and Nasah Holdings.',
  }
  const vissionMissionContent = {
    visionDescription:
      'To be the most trusted insurance brand by protecting the uncertainties of life through simple solutions and delivering maximum value.',
    missionDescription:
      'To promote the desired quality of life through innovation, digitalization and customer centricity.',
  }

  const allAboutData = [
    {
      image: '/assets/allAboutIcon1.png',
      hoverImage: '/assets/trustWhite.png',
      title: 'Trust',
      description: {
        __html: "For us, trust is more than a word — it's the foundation of every promise we make.",
      },
    },
    {
      image: '/assets/simplicity.png',
      hoverImage: '/assets/allAboutIcon3.png',
      title: 'Simplicity',
      description: {
        __html:
          'We prioritize <b class="font-bold">ease for our customers</b>, making insurance straightforward, accessible, and hassle-free.',
      },
    },
    {
      image: '/assets/allAboutIcon2.png',
      hoverImage: '/assets/ownershipWhite.png',
      title: 'Ownership',
      description: {
        __html:
          'We stay agile, positive, and collaborative — always learning and evolving to deliver the best.',
      },
    },
    {
      image: '/assets/allAboutIcon2.png',
      hoverImage: '/assets/ownershipWhite.png',
      title: 'Customer Centricity',
      description: {
        __html:
          'We act with proactiveness, empower our employees, and create experiences that truly put you first.',
      },
    },
    {
      image: '/assets/allAboutIcon2.png',
      hoverImage: '/assets/ownershipWhite.png',
      title: 'Transparency',
      description: {
        __html: 'We believe in open communication, owning up to our promises, and full visibility.',
      },
    },
  ]

  const directorCardData = [
    {
      image: '/assets/director2.png',
      title: 'Charting the Course',
      subtitle: 'for a Bold Tomorrow',
      description: `
      A highly distinguished and perceptive entrepreneur, Mr. Khondoker Monir Uddin, the founder promoter of Shanta, opts to do business by providing world-class products and services in Bangladesh. With his visionary leadership and extensive business knowledge, Shanta drives forward to not only provide superior quality products and services, but to demonstrate unparalleled foresight by establishing a new standard in every sector in which the company operates. The reputation and success of Shanta are testaments to his high ethical standard and relentless focus on quality, innovation and social responsibility. He is widely regarded as one of the most successful entrepreneurs in Bangladesh, who has brought transformative change in every sector the group has entered from Real Estate to Financial Services, Healthcare, Education and Retail.Mr. Monir completed both his Bachelors with honors and Masters degrees from the Department of Accounting, University of Dhaka. Over the past four decades, he has established Shanta as one of the leading corporate houses in Bangladesh, with successful investments in diversified sectors and thus has been continually recognized as a Commercially Important Person (CIP) by the Government of Bangladesh since 2000 till date. Mr. Monir is also a founder and Managing Director of the prestigious STS Group - which revolutionized the healthcare and education sectors of the country by establishing international standard institutions like Evercare Hospital Dhaka (previously Apollo Hospitals Dhaka), Evercare Hospital Chattogram, International School Dhaka (ISD), the Glenrich International Schools (Previously DPS STS schools). He is also a sponsor Director and former Chairman of Dhaka Bank Limited, and the Managing Director of Shanta Holdings Limited and Shanta Securities Limited.  
`,
      // link: 'https://shantalife.com/message-form-chairman.php',
      link: '/all-bods#id-1',
    },
    {
      image: '/assets/director1.png',
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
      image: '/assets/profile1.png',
      name: 'Khondoker Monir Uddin',
      title: 'Chairman',
    },
    {
      id: 2,
      image: '/assets/profile2.png',
      name: 'Jasmine Sultana',
      title: 'Director',
    },
    {
      id: 3,
      image: '/assets/profile3.png',
      name: 'Saif Khondoker',
      title: 'Director',
    },
    {
      id: 4,
      image: '/assets/profile4.png',
      name: 'Mayesha Khondoker',
      title: 'Director',
    },
    {
      id: 5,
      image: '/assets/profile5.png',
      name: 'Farzana Hasan',
      title: 'Director',
    },
    {
      id: 6,
      image: '/assets/profile6.png',
      name: 'Raiven Hasan',
      title: 'Director',
    },
    {
      id: 7,
      image: '/assets/profile8.png',
      name: 'Arif Khan, CFA, FCMA',
      title: 'Director',
    },
    {
      id: 8,
      image: '/assets/profile9.png',
      name: 'Abrar A. Anwar',
      title: 'Sponsor Shareholder',
    },
    {
      id: 9,
      image: '/assets/profile7.png',
      name: 'M. Anisul Haque',
      title: 'Director',
    },
  ]

  const allOfThemData = [
    {
      id: 1,
      image: '/assets/allOfThem1.png',
      name: 'Nasif A Ahmed',
      title: 'Chief Executive Officer',
    },
    {
      id: 2,
      image: '/assets/allOfThem2.png',
      name: 'M Khurshed Kaisar',
      title: 'Chief Distribution Officer',
    },
    {
      id: 3,
      image: '/assets/allOfThem3.png',
      name: 'Mohammad Maksud Hossain',
      title: 'Chief IT Officer',
    },
    {
      id: 4,
      image: '/assets/CMO.png',
      name: 'Jane Alam Romel',
      title: 'Chief Marketing Officer',
    },
    {
      id: 5,
      image: '/assets/CFO.png',
      name: 'Majedur Rashid Chowdhury',
      title: 'Chief Financial Officer',
    },
  ]

  const footPrintData = [
    {
      image: '/assets/footprint3.png',
      title: 'Shanta Holdings',
      link: 'https://shantaholdings.com/',
      description:
        'The premier real estate developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the caliber of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint4.jpg',
      title: 'Shanta Securities',
      link: 'https://www.shantasecurities.com/',
      description:
        'An innovative financial services company offering a range of brokerage and investing solutions.',
    },
    {
      image: '/assets/assetmanagement.jpg',
      title: 'Shanta Asset Management',
      link: 'https://www.shanta-aml.com/',
      description:
        'Shanta Asset Management Limited is a leading asset management company in Bangladesh offering corporate and open-end mutual fund management solutions to address the distinct investment objectives of its diverse clientele, including individuals and institutions.',
    },
    {
      image: '/assets/shanta-equity-img.jpg',
      title: 'Shanta Equity',
      link: 'https://shantaequity.net/',
      description:
        'A full-fledged merchant bank offering a range of investment banking, corporate advisory and portfolio management solutions.',
    },
    {
      image: '/assets/footprint5.jpg',
      title: 'Shanta Lifestyle',
      link: 'https://shantalifestyle.com/',
      description:
        'Luxury home décor company established with an aim to cater to the increasingly sophisticated interior design needs of Bangladeshi consumers searching for customization, luxury and exclusivity.',
    },
    {
      image: '/assets/footprint2.jpg',
      title: 'Shanta Multiverse',
      link: 'https://shantamultiverse.com/',
      description:
        'Shanta Multiverse owns and operates The White Canary Café, a specialty all-day brunch and cafe chain with its presence spanning 5 locations in Dhaka, Bangladesh.',
    },
    {
      image: '/assets/shanta_property.jpg',
      title: 'Shanta Property Management',
      link: 'https://www.shantapml.com/',
      description:
        'Shanta Property Management Limited offers integrated property management solutions in Bangladesh, specializing in facilities management, rental services, and buy-sell advisory for a seamless living experience.',
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} />
      <ShantaLifeIntroSection shantaIntroContent={shantaIntroContent} />
      <VisionMissionSection vissionMissionContent={vissionMissionContent} />
      <AllAboutSection allAboutData={allAboutData} />
      <LiscensedInfo />
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
