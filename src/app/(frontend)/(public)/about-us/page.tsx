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
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/directoralone.png`,
      // mobileImage: '/assets/about-us/mobile/directoralone.png',
      name: 'Khondoker Monir Uddin',
      designation: 'Chairman',
      title: 'Charting the Course',
      subtitle: 'for a Bold Tomorrow',
      description: `At Shanta, we proudly uphold a legacy of integrity, innovation and excellence. As we embark on our journey in the insurance sector, we remain focused on our goal to offer unmatched life insurance solutions that ensure peace of mind and long-term financial security for our customers. Our determination to establish trust will remain unshakeable and so will our commitment to setting a new standard in the quality of life insurance services provided.The initiative of enhancing financial literacy among individuals and boosting confidence in them with services that bring stability is the cornerstone that carries the name of our organization, not only over the financial future of our customers but also over our community as a whole. At Shanta Life, we will continue our four decades long legacy of excellence and commitment with utmost sincerity, and I welcome you to explore planning your family's financial security with our trusted team.`,
      // link: 'https://shantalife.com/message-form-chairman.php',
      link: '/all-bods#id-1',
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/CEOalone.png`,
      // mobileImage: '/assets/about-us/mobile/CEOalone.png',
      name: 'Nafis Akhter Ahmed',
      designation: 'Chief Executive Officer',
      title: 'Redefining',
      subtitle: 'Life Insurance',
      description: `At Shanta Life, we envision a future where financial
security and peace of mind are accessible to
everyone. Our mission is to promote the desired
quality of life through customer-centric solutions,
cutting-edge digitalization, and a steadfast
adherence to corporate good governance. Every
product we design, every service we deliver, and
every interaction we have is guided by our core
values of trust, simplicity, ownership, transparency
and customer centricity. At the heart of Shanta Life is
a passionate and dedicated team who believe that
insurance is not just about securing lives—it’s about
enabling you to take control of your life. As we
continue our journey, we remain committed to
forging lasting relationships with our clients,
partners, and communities. Together, let’s build a
legacy of trust and ignite the power of possibilities
for a brighter tomorrow.
`,
      // link: 'https://shantalife.com/message-form-ceo.php',
      link: '/all-leaders#id-1',
    },
  ]

  const directorProfileData = [
    {
      id: 1,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile1.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile1.png',
      name: 'Khondoker Monir Uddin',
      title: 'Chairman',
    },
    {
      id: 2,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile2.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile2.png',
      name: 'Jasmine Sultana',
      title: 'Director',
    },
    {
      id: 3,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile3.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile3.png',
      name: 'Saif Khondoker',
      title: 'Director',
    },
    {
      id: 4,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile4.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile4.png',
      name: 'Mayesha Khondoker',
      title: 'Director',
    },
    {
      id: 5,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile5.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile5.png',
      name: 'Farzana Hasan',
      title: 'Director',
    },
    {
      id: 6,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile6.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile6.png',
      name: 'Raiven Hasan',
      title: 'Director',
    },
    {
      id: 7,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile8.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile8.png',
      name: 'Arif Khan, CFA, FCMA',
      title: 'Director',
    },
    {
      id: 8,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile10.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile10.png',
      name: 'Iftekhar Rahman',
      title: 'Director',
    },
    {
      id: 9,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile7.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile7.png',
      name: 'M. Anisul Haque',
      title: 'Director',
    },
  ]

  const allOfThemData = [
    {
      id: 1,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CEO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CEO.png',
      name: 'Nafis A Ahmed',
      title: 'Chief Executive Officer',
    },
    {
      id: 2,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CDO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CDO.png',
      name: 'M Khurshed Kaisar',
      title: 'Chief Distribution Officer',
    },
    {
      id: 3,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CITO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CITO.png',
      name: 'Mohammad Maksud Hossain',
      title: 'Chief IT Officer',
    },
    {
      id: 4,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CMO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CMO.png',
      name: 'Jane Alam Romel',
      title: 'Chief Marketing Officer',
    },
    {
      id: 5,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CFO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CFO.png',
      name: 'Majedur Rashid Chowdhury',
      title: 'Chief Financial Officer',
    },
  ]

  const footPrintData = {
    title: 'Shanta’s FOOTPRINT',
    subTitle: 'Where Every Venture Connects',
    // bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint.mp4`,
    bgImage: `/assets/about-us/web/footprint.mp4`,
    // bgMobileImage: '/assets/about-us/mobile/footprint.gif',
    data: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint3.png`,
        // mobileImage: '/assets/about-us/mobile/footprint3.png',
        title: 'Shanta Holdings',
        link: 'https://shantaholdings.com/',
        description:
          'The premier real estate developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the caliber of the finest developers across the globe.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint4.jpg`,
        // mobileImage: '/assets/about-us/mobile/footprint4.jpg',
        title: 'Shanta Securities',
        link: 'https://www.shantasecurities.com/',
        description:
          'An innovative financial services company offering a range of brokerage and investing solutions.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/assetmanagement.jpg`,
        // mobileImage: '/assets/about-us/mobile/assetmanagement.jpg',
        title: 'Shanta Asset Management',
        link: 'https://www.shanta-aml.com/',
        description:
          'Shanta Asset Management Limited is a leading asset management company in Bangladesh offering corporate and open-end mutual fund management solutions to address the distinct investment objectives of its diverse clientele, including individuals and institutions.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/shanta-equity-img.jpg`,
        // mobileImage: '/assets/about-us/mobile/shanta-equity-img.jpg',
        title: 'Shanta Equity',
        link: 'https://shantaequity.net/',
        description:
          'A full-fledged merchant bank offering a range of investment banking, corporate advisory and portfolio management solutions.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint5.jpg`,
        // mobileImage: '/assets/about-us/mobile/footprint5.jpg',
        title: 'Shanta Lifestyle',
        link: 'https://shantalifestyle.com/',
        description:
          'Luxury home décor company established with an aim to cater to the increasingly sophisticated interior design needs of Bangladeshi consumers searching for customization, luxury and exclusivity.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint2.jpg`,
        // mobileImage: '/assets/about-us/mobile/footprint2.jpg',
        title: 'Shanta Multiverse',
        link: 'https://shantamultiverse.com/',
        description:
          'Shanta Multiverse owns and operates The White Canary Café, a specialty all-day brunch and cafe chain with its presence spanning 5 locations in Dhaka, Bangladesh.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/shanta_property.jpg`,
        // mobileImage: '/assets/about-us/mobile/shanta_property.jpg',
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
