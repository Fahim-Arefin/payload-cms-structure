import AllAboutSection from '@/components/custom/about-us/AllAboutSection'
import AllOfThemSection from '@/components/custom/about-us/AllOfThemSection'
import DirectorCard from '@/components/custom/about-us/DirectorCard'
import DirectorListSection from '@/components/custom/about-us/DirectorListSection'
import LiscensedInfo from '@/components/custom/about-us/LiscensedInfo'
import ShantaLifeIntroSection from '@/components/custom/about-us/ShantaLifeIntroSection'
import VisionMissionSection from '@/components/custom/about-us/VisionMissionSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'MORE THAN INSURANCE',
      subtitle: '',
      description:
        'At Shanta Life, our values aren\u2019t just nice words — they\u2019re the GPS guiding every decision, every smile, and every we\u2019ve got you covered moment.',
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
    paragraphTitle: 'Trust is our base. The future is our move.',
    image: '/assets/shantaIntroImage.png',
    paragraph:
      'Shanta Life enters the insurance landscape with a singular, powerful advantage: the backing of a financial and industrial powerhouse. Powered by the combined force of Shanta’s unmatched foundation.',
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
      title: 'Trust',
      description:
        'Trust is our foundation. We earn trust not through words, but through consistent action and care.',
    },
    {
      image: '/assets/allAboutIcon3.png',
      title: 'Simplicity',
      description:
        'With easy-to-understand plans and hassle-free service, we empower our customers to make confident decisions about their future.',
    },
    {
      image: '/assets/allAboutIcon2.png',
      title: 'Ownership',
      description:
        'Trust is our foundation. We earn trust not through words, but through consistent action and care.',
    },
    {
      image: '/assets/allAboutIcon1.png',
      title: 'Trust',
      description:
        'Trust is our foundation. We earn trust not through words, but through consistent action and care.',
    },
    {
      image: '/assets/allAboutIcon3.png',
      title: 'Simplicity',
      description:
        'With easy-to-understand plans and hassle-free service, we empower our customers to make confident decisions about their future.',
    },
    {
      image: '/assets/allAboutIcon2.png',
      title: 'Ownership',
      description:
        'Trust is our foundation. We earn trust not through words, but through consistent action and care.',
    },
  ]
  const directorCardData = [
    {
      image: '/assets/director2.png',
      title: 'FUELING ',
      subtitle: 'THE NEXT CHAPTER',
      description:
        'At Shanta, we proudly uphold a legacy of integrity, innovation, and excellence. As we embark on our journey in the insurance sector, we remain focused on our goal to offer unmatched life insurance solutions that ensure peace of mind and long-term financial security for our customers. Our determination to establish trust will remain unshakeable, and so will our commitment to setting a new standard in the quality of life insurance services provided. The initiative of enhancing financial literacy among individuals and boosting confidence in them with services that bring stability is the cornerstone that carries the name of our organization, not only over the financial future of our customers but also over our community as a whole. At Shanta Life, we will continue our four-decade-long legacy of excellence and commitment with utmost sincerity, and I welcome you to explore planning your familys financial security with our trusted team.',
      link: '/',
    },
    {
      image: '/assets/director1.png',
      title: 'Leading  ',
      subtitle: 'Redefinition',
      description:
        'At Shanta Life, we envision a future where financial security and peace of mind are accessible to everyone. Our mission is to promote the desired quality of life through customer-centric solutions, cutting-edge digitalization, and a steadfast adherence to corporate good governance. Every product we design, every service we deliver, and every interaction we have is guided by our core values of trust, simplicity, ownership, transparency and customer centricity. At the heart of Shanta Life is a passionate and dedicated team who believe that insurance is not just about securing lives—it’s about enabling you to take control of your life. As we continue our journey, we remain committed to forging lasting relationships with our clients, partners, and communities. Together, let’s build a legacy of trust and ignite the power of possibilities for a brighter tomorrow.',
      link: '/',
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
    </div>
  )
}

export default page
