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
      image: '/assets/banner3.png',
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
      image: '/assets/allAboutIcon1.png',
      hoverImage: '/assets/trustWhite.png',
      title: 'Customer Centricity',
      description: {
        __html:
          'We act with proactiveness, empower our employees, and create experiences that truly put you first.',
      },
    },
    {
      image: '/assets/simplicity.png',
      hoverImage: '/assets/allAboutIcon3.png',
      title: 'Simplicity',
      description: {
        __html:
          'With easy-to-understand plans and hassle-free service, we empower our customers to make confident decisions about their future.',
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
      description: `At Shanta, we proudly uphold a legacy of integrity, innovation and excellence. As we embark on our journey in the insurance sector, we remain focused on our goal to offer unmatched life insurance solutions that ensure peace of mind and long-term financial security for our customers. Our determination to establish trust will remain unshakeable and so will our commitment to setting a new standard in the quality of life insurance services provided.

The initiative of enhancing financial literacy among individuals and boosting confidence in them with services that bring stability is the cornerstone that carries the name of our organization, not only over the financial future of our customers but also over our community as a whole. At Shanta Life, we will continue our four decades long legacy of excellence and commitment with utmost sincerity, and I welcome you to explore planning your family's financial security with our trusted team.  
`,
      link: 'https://shantalife.com/message-form-chairman.php',
    },
    {
      image: '/assets/director1.png',
      title: 'Redefining',
      subtitle: 'Life Insurance',
      description: `I am honored to lead our team in our mission to provide unwavering protection and financial security to our clients. We are committed to innovation, collaboration, and social responsibility, and we strive to set new benchmarks to revolutionize the insurance industry. Our clients can trust us to always prioritize their needs and deliver exceptional service and value. Thank you for choosing Shanta Life Insurance as your trusted partner in safeguarding your future.`,
      link: 'https://shantalife.com/message-form-ceo.php',
    },
  ]

  const directorProfileData = [
    {
      image: '/assets/profile1.png',
      name: 'Khondoker Monir Uddin',
      title: 'Chairman',
    },
    {
      image: '/assets/profile2.png',
      name: 'Jasmine Sultana',
      title: 'Director',
    },
    {
      image: '/assets/profile3.png',
      name: 'Saif Khondoker',
      title: 'Director',
    },
    {
      image: '/assets/profile4.png',
      name: 'Mayesha Khondoker',
      title: 'Chairman',
    },
    {
      image: '/assets/profile5.png',
      name: 'Farzana Hasan',
      title: 'Director',
    },
    {
      image: '/assets/profile6.png',
      name: 'Raiven Hasan',
      title: 'Chairman',
    },
  ]

  const allOfThemData = [
    {
      image: '/assets/allOfThem1.png',
      name: 'Nasif A Ahmed',
      title: 'Chief Executive Officer',
    },
    {
      image: '/assets/allOfThem2.png',
      name: 'M Khurshed Kaisar',
      title: 'Chief Distribution Officer',
    },
    {
      image: '/assets/allOfThem3.png',
      name: 'Mohammad Maksud Hossain',
      title: 'Chief IT Officer',
    },
    {
      image: '/assets/allOfThem1.png',
      name: 'Nasif A Ahmed',
      title: 'Chief Executive Officer',
    },
    {
      image: '/assets/allOfThem2.png',
      name: 'M Khurshed Kaisar',
      title: 'Chief Distribution Officer',
    },
    {
      image: '/assets/allOfThem3.png',
      name: 'Mohammad Maksud Hossain',
      title: 'Chief IT Officer',
    },
  ]

  const footPrintData = [
    {
      image: '/assets/footprint1.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint2.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint3.png',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint4.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint5.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint1.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint2.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint3.png',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint4.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
    },
    {
      image: '/assets/footprint5.jpg',
      title: 'Shanta Holdings',
      description:
        'The premier Real Estate Developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the calibre of the finest developers across the globe.',
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
