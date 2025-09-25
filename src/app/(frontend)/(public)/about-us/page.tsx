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
      titleBN: 'জীবনের',
      subtitleBN: 'পথচলায় এগিয়ে',
      description:
        'At Shanta Life Insurance, our values aren’t just feel-good words — they’re the GPS guiding every decision, every smile, and every ‘we’ve got you covered’ moment.',
      descriptionBN: `শান্তা লাইফ ইন্স্যুরেন্সে আমাদের মূল্যবোধগুলো কেবল সুন্দর কিছু শব্দ নয় বরং আমাদের প্রতিটি সিদ্ধান্ত, 
      প্রতিটি কর্মের জন্য নেয়া প্রত্যয়ের দিকনির্দেশনা`,
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
    headingBN: `বিশ্বাসে গড়া,`,
    subheadingBN: 'আস্থার প্রতিশ্রুতি',
    paragraphTitle: 'Nurtured with Trust. Built for Tomorrow',
    paragraphTitleBN: 'অটুট প্রত্যাশার বাঁধনে, আগামীর স্বপ্ন নির্মাণ',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/shantaIntroImage.png`,
    // mobileImage: '/assets/about-us/web/shantaIntroImage.png',
    paragraph:
      'Born from a vision to redefine life insurance in Bangladesh, Shanta Life is backed by a powerful consortium comprised of Shanta Holdings, Shanta Lifestyle, Shanta Securities, Shanta Asset Management, Shanta Equity, Shanta Multiverse, Shanta Property Management, FAR Asset Management, and Nasah Holdings.',
    paragraphBN: `বাংলাদেশের লাইফ ইন্সুরেন্স সেক্টরে নতুন মানদণ্ড স্থাপনের স্বপ্ন নিয়ে শান্তা লাইফের যাত্রা শুরু। 
    দেশের স্বনামধন্য প্রতিষ্ঠান শান্তা হোল্ডিংস , শান্তা লাইফস্টাইল, শান্তা সিকিউরিটিজ, শান্তা অ্যাসেট ম্যানেজমেন্ট, শান্তা ইকুইটি, 
    শান্তা মাল্টিভার্স, শান্তা প্রোপার্টি ম্যানেজমেন্ট , ফার অ্যাসেট ম্যানেজমেন্ট এবং নাসাহ হোল্ডিংস এর যৌথ উদ্যোগে শান্তা লাইফ ইন্সুরেন্সের যাত্রা শুরু।`,
  }
  const vissionMissionContent = {
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/vision.png`,
    // bgMobileImage: '/assets/about-us/mobile/vision.png',
    visionDescription:
      'To be the most trusted insurance brand by protecting the uncertainties of life through simple solutions and delivering maximum value.',
    visionDescriptionBN: `সহজ সমাধানের মাধ্যমে জীবনের অনিশ্চয়তাকে সুরক্ষা দিয়ে এবং সর্বোচ্চ মূল্য প্রদান করে, 
      দেশের সবচেয়ে নির্ভরযোগ্য লাইফ ইন্সুরেন্স ব্র্যান্ড হওয়াই আমাদের ভিশন।`,
    missionDescription:
      'To promote the desired quality of life through innovation, digitalization and customer centricity.',
    missionDescriptionBN: `ইনোভেশন , ডিজিটালাইজেসন, এবং কাস্টমার সেন্ট্রিসিটি -এর মাধ্যমে মানুষের কাঙ্ক্ষিত জীবনমানকে এগিয়ে নেওয়াই আমাদের লক্ষ্য।`,
  }

  const allAboutData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/allAbout.jpg`,
    // mobileImage: '/assets/about-us/mobile/allAbout.jpg',
    title: 'Values That',
    coloredTitle: 'Shape Us',
    titleBN: 'আমাদের মূল্যবোধসমূহ',
    coloredTitleBN: 'মূল্যবোধসমূহ',
    data: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/allAboutIcon1.png`,
        // mobileImage: '/assets/icons/mobile/allAboutIcon1.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/trustWhite.png`,
        // hoverMobileImage: '/assets/icons/mobile/trustWhite.png',
        title: 'Trust',
        titleBN: 'বিশ্বাস',
        description: {
          __html:
            "For us, trust is more than a word — it's the foundation of every promise we make.",
          __htmlBN: `বিশ্বাস আমাদের জন্য শুধুমাত্র কোনো শব্দ নয়- এটি আমাদের প্রতিশ্রুতির মূল ভিত্তি।`,
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/simplicity.png `,
        // mobileImage: '/assets/icons/mobile/simplicity.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/allAboutIcon3.png`,
        // hoverMobileImage: '/assets/icons/mobile/allAboutIcon3.png',
        title: 'Simplicity',
        titleBN: 'সিম্প্লিসিটি',
        description: {
          __html:
            'We prioritize ease for our customers , making insurance straightforward, accessible, and hassle-free.',
          __htmlBN: `ইন্সুরেন্সকে  সহজ, স্বচ্ছ ও ঝামেলাহীন করা আমাদের লক্ষ্য।`,
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/allAboutIcon2.png`,
        // mobileImage: '/assets/icons/mobile/allAboutIcon2.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/ownershipWhite.png`,
        // hoverMobileImage: '/assets/icons/mobile/ownershipWhite.png',
        title: 'Ownership',
        titleBN: 'দায়িত্ববোধ',
        description: {
          __html:
            'We stay agile, positive, and collaborative — always learning and evolving to deliver the best.',
          __htmlBN: `যেকোনো কাজে নিজেদের সর্বোচ্চ চেষ্টা আমাদের প্রত্যয়।`,
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/GOLDEN-Customer-Centricity.png `,
        // mobileImage: '/assets/icons/mobile/GOLDEN-Customer-Centricity.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/Customer-Centricity.png`,
        // hoverMobileImage: '/assets/icons/mobile/Customer-Centricity.png',
        title: 'Customer Centricity',
        titleBN: 'কাস্টমার সেন্ট্রিসিটি',
        description: {
          __html:
            'We act with proactiveness, empower our employees, and create experiences that truly put you first.',
          __htmlBN: `ভোক্তার চাহিদাকে কেন্দ্র করেই আমাদের সকল কার্যক্রম পরিচালিত হয়।`,
        },
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/ownership-Golden.png `,
        // mobileImage: '/assets/icons/mobile/ownership-Golden.png',
        hoverImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/ownership-White.png`,
        // hoverMobileImage: '/assets/icons/mobile/ownership-White.png',
        title: 'Transparency',
        titleBN: 'স্বচ্ছতা',
        description: {
          __html:
            'We believe in open communication, owning up to our promises, and full visibility.',
          __htmlBN: `আমরা কাজের প্রতিটি ধাপে স্বচ্ছতার সাথে যোগাযোগে বিশ্বাসী।`,
        },
      },
    ],
  }

  const liscensedData = {
    licensedImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/licensed.png`,
    // licensedMobileImage: '/assets/icons/mobile/licensedMobile.png',
    licensedDate: 'November 7, 2023',
    licensedDateBN: '৭ নভেম্বর, ২০২৩',
    launchedImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/rocket.png`,
    // launchedMobileImage: '/assets/icons/mobile/rocketMobile.png',
    launchedDate: 'December 1, 2024',
    launchedDateBN: '১ ডিসেম্বর, ২০২৪',
  }

  const directorCardData = [
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/directoralone.png`,
      // mobileImage: '/assets/about-us/mobile/directoralone.png',
      name: 'Khondoker Monir Uddin',
      nameBN: 'খন্দকার মুনির উদ্দিন',
      designation: 'Chairman',
      designationBN: 'চেয়ারম্যান',
      title: 'Charting the Course',
      titleBN: 'আগামীর পথে',
      subtitle: 'for a Bold Tomorrow',
      subtitleBN: 'নির্ভীক পদক্ষেপ',
      description: `At Shanta, we proudly uphold a legacy of integrity, innovation and excellence. As we embark on our journey in the insurance sector, we remain focused on our goal to offer unmatched life insurance solutions that ensure peace of mind and long-term financial security for our customers. Our determination to establish trust will remain unshakeable and so will our commitment to setting a new standard in the quality of life insurance services provided.The initiative of enhancing financial literacy among individuals and boosting confidence in them with services that bring stability is the cornerstone that carries the name of our organization, not only over the financial future of our customers but also over our community as a whole. At Shanta Life, we will continue our four decades long legacy of excellence and commitment with utmost sincerity, and I welcome you to explore planning your family's financial security with our trusted team.`,
      // link: 'https://shantalife.com/message-form-chairman.php',
      descriptionBN: `শান্তা বিগত কয়েক দশক জুড়ে সততা, নিষ্ঠা এবং উদ্ভাবনী উৎকর্ষতার মাধ্যমে ব্যাবসায়িক কার্যকম পরিচালনা করছে।  
      ইন্সুরেন্স সেক্টর এ নতুন পথচলায় আমাদের লক্ষ্য কাস্টমারদের সর্বোচ্চ ভ্যালু প্রদান করে তাদের অর্থনৈতিক ভবিষ্যৎ সুরক্ষিত করা। 
      আমরা বিশ্বাস করি জীবনবীমা শুধু সুরক্ষা নয়—এটি আস্থা, স্থিতিশীলতা ও এক উজ্জ্বল ভবিষ্যতের প্রতিশ্রুতি। 
      লাইফ ইন্সুরেন্সকে জীবনের বিশ্বস্ততার পার্টনার করে একটি নতুন মাত্রায় রূপান্তর আমাদের প্রতিজ্ঞা। 
      আর্থিক শিক্ষার প্রসার এবং মানুষের সচেতনতা বাড়ানোর মাধ্যমে আমরা শুধু আমাদের গ্রাহকদের আর্থিক ভবিষ্যৎই নয়, 
      পুরো সমাজকেও স্থিতিশীলতার পথে এগিয়ে নিতে চাই। 
      গ্রাহকসমাজ ও আমাদের টীম একত্র হয়ে এক নতুন মানদণ্ড তৈরি করার ব্যাপারে শান্তা অঙ্গীকারবদ্ধ। 
      আপনার ও আপনার পরিবারের আর্থিক নিরাপত্তা নিশ্চিত করার এই যাত্রায় আমাদের বিশ্বস্ত টিমের সাথে যুক্ত হবার আহবান করছি।  `,
      link: '/all-bods#id-1',
    },
    {
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/CEOalone.png`,
      // mobileImage: '/assets/about-us/mobile/CEOalone.png',
      name: 'Nafis Akhter Ahmed',
      nameBN: 'নাফিস আকতার আহমেদ',
      designation: 'Chief Executive Officer',
      designationBN: 'প্রধান নির্বাহী কর্মকর্তা',
      title: 'Redefining',
      titleBN: 'নতুন দৃষ্টিতে',
      subtitle: 'Life Insurance',
      subtitleBN: 'জীবনবীমা',
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
      descriptionBN: `শান্তা লাইফ-এ আমরা এমন এক ভবিষ্যৎ কল্পনা করি যেখানে আর্থিক নিরাপত্তার মাধ্যমে মানসিক শান্তি সবার জন্য সহজ হবে।  আমাদের লক্ষ্য - গ্রাহককেন্দ্রিক সমাধান, আধুনিক প্রযুক্তি, এবং সুশাসনের মাধ্যমে জীবনমানকে আরও উন্নত করা।

      আমাদের প্রতিটি পণ্য, সেবা এবং  যোগাযোগ পরিচালিত হয় আমাদের মূল্যবোধের মাধ্যমে যেন আস্থা, দায়িত্বশীলতা, স্বচ্ছতা এবং গ্রাহককেন্দ্রিকতার মাধ্যমে আমরা গ্রাহকের বিশস্ত পার্টনার হতে পারি।

      শান্তা লাইফের প্রাণ হলো আমাদের নিবেদিত টিম, যারা বিশ্বাস করে - বীমা কেবল জীবন সুরক্ষার নয়—এটি নিজ জীবনের নিয়ন্ত্রণ নেওয়ার শক্তি।

      এ যাত্রায় আমরা গড়ে তুলতে চাই  দীর্ঘস্থায়ী সম্পর্ক —গ্রাহক ও সমাজের সঙ্গে। আমাদের সাথে উজ্জ্বল আগামী গড়ে তুলতে আমন্ত্রণ জানাই।`,
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
      nameBN: 'খন্দকার মনির উদ্দিন',
      title: 'Chairman',
      titleBN: 'চেয়ারম্যান',
    },
    {
      id: 2,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile2.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile2.png',
      name: 'Jasmine Sultana',
      nameBN: 'জেসমিন সুলতানা',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
    {
      id: 3,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile3.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile3.png',
      name: 'Saif Khondoker',
      nameBN: 'সাইফ খন্দকার',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
    {
      id: 4,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile4.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile4.png',
      name: 'Mayesha Khondoker',
      nameBN: 'মাইশা খন্দকার',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
    {
      id: 5,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile5.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile5.png',
      name: 'Farzana Hasan',
      nameBN: 'ফারজানা হাসান',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
    {
      id: 6,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile6.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile6.png',
      name: 'Raiven Hasan',
      nameBN: 'রাইভেন হাসান',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
    {
      id: 7,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile8.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile8.png',
      name: 'Arif Khan, CFA, FCMA',
      nameBN: 'আরিফ খান',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
    {
      id: 8,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile10.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile10.png',
      name: 'Iftekhar Rahman',
      nameBN: 'ইফতেখার রহমান',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
    {
      id: 9,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusdirectors/profile7.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusdirectors/profile7.png',
      name: 'M. Anisul Haque',
      nameBN: 'এম আনিসুল হক',
      title: 'Director',
      titleBN: 'ডিরেক্টর',
    },
  ]

  const allOfThemData = [
    {
      id: 1,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CEO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CEO.png',
      name: 'Nafis A Ahmed',
      nameBN: 'নাফিস আকতার আহমেদ',
      title: 'Chief Executive Officer',
      titleBN: 'প্রধান নির্বাহী কর্মকর্তা (সিইও)',
    },
    {
      id: 2,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CDO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CDO.png',
      name: 'M Khurshed Kaisar',
      nameBN: 'এম খুরশেদ কায়সার',
      title: 'Chief Distribution Officer',
      titleBN: 'চিফ ডিস্ট্রিবিউশন অফিসার',
    },
    {
      id: 3,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CITO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CITO.png',
      name: 'Mohammad Maksud Hossain',
      nameBN: 'মোহাম্মাদ মাকসুদ হোসেইন',
      title: 'Chief IT Officer',
      titleBN: 'চিফ ইনফরমেশন এন্ড টেকনোলোজি অফিসার',
    },
    {
      id: 4,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CMO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CMO.png',
      name: 'Jane Alam Romel',
      nameBN: 'জানে আলম রোমেল',
      title: 'Chief Marketing Officer',
      titleBN: 'চিফ মার্কেটিং অফিসার',
    },
    {
      id: 5,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/aboutusleaders/CFO.png`,
      // mobileImage: '/assets/about-us/mobile/aboutusleaders/CFO.png',
      name: 'Majedur Rashid Chowdhury',
      nameBN: 'মাজেদুর রশীদ চৌধুরী',
      title: 'Chief Financial Officer',
      titleBN: 'চিফ ফিনান্সিয়াল অফিসার',
    },
  ]

  const footPrintData = {
    title: 'Shanta’s FOOTPRINT',
    titleBN: 'শান্তার প্রতিষ্ঠানসমূহ',
    subTitle: 'Where Every Venture Connects',
    subTitleBN: 'সংযুক্ত প্রতিটি পদক্ষেপ',
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
