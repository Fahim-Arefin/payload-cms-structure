import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CHFInfoSection from '@/components/custom/shared/plans/CHFInfoSection'
import KeyBenefits from '@/components/custom/shared/plans/KeyBenefits'
import WCTMSection from '@/components/custom/shared/plans/WCTMSection'

function page() {
  const heroSlides = [
    {
      title: 'Telemedicine Services',
      titleBN: 'টেলিমেডিসিন সেবা',
      subtitle: '',
      descriptionBN: `শান্তা লাইফ ইন্স্যুরেন্স-এ আমাদের টেলিমেডিসিন সেবা স্বাস্থ্যসেবাকে আরও কাছে নিয়ে এসেছে — 
      যা আপনাকে দিনে ২৪ ঘণ্টা, সপ্তাহে ৭ দিন ডাক্তারদের সাথে যেকোনো সময়, যেকোনো স্থান থেকে সংযুক্ত হওয়ার সুযোগ দেয়।`,
      description:
        'At Shanta Life Insurance, our Telemedicine Service brings healthcare closer than ever — giving you 24/7 access to qualified doctors, anytime, anywhere.',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/TS-banner.jpg`,
    },
  ]

  const descriptionHtml = {
    title: 'How Telemedicine Works',
    titleBN: `টেলিমেডিসিন কীভাবে কাজ করে`,
    descriptionBN: `টেলিমেডিসিন শান্তালাইফের গ্রুপ ইন্সুরেন্স এর পলিসি হল্ডারদের ফোন, ভিডিও কলের 
    মাধ্যমে লাইসেন্সপ্রাপ্ত চিকিৎসকদের সঙ্গে দূর থেকে পরামর্শ করার সুযোগ দেয়। 
    সাধারণ স্বাস্থ্য পরামর্শ, ফলো-আপ কনসালটেশন বা ছোটখাটো অসুস্থতার জন্য সদস্যরা হাসপাতাল বা 
    ক্লিনিকে না গিয়েই ডাক্তারের সঙ্গে যোগাযোগ করতে পারেন।`,
    description: `
   Telemedicine allows insured members to consult licensed physicians remotely via phone, video call, or online chat. Whether it’s for general health advice, follow-up consultations, or minor illnesses, members can connect with a doctor without visiting a hospital or clinic. 
  `,
  }

  const WCTMSectionData = {
    title: 'Telemedicine',
    titleBN: 'টেলিমেডিসিন',
    coloredTitle: 'Eligibility and Cost',
    coloredTitleBN: 'সেবা পাবেন যারা এবং খরচ',
    descriptionBN: `শান্তা লাইফের গ্রুপ হেলথ ইন্স্যুরেন্স প্ল্যানের আওতায় থাকা সকল পলিসি হোল্ডার 
    এবং তাদের অন্তর্ভুক্ত নির্ভরশীলরা বিনামূল্যে টেলিমেডিসিন প্ল্যাটফর্ম ব্যবহার করতে পারবেন।`,
    description:
      'All eligible employees and their covered dependents under Shanta Life’s Group Health Insurance Plan are eligible to use the Telemedicine platform, free of charge.',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/WCTMImage.jpg`,
  }
  const keyBenefitsData = {
    title: 'Key Benefits of',
    titleBN: 'শান্তা লাইফের',
    coloredTitle: 'Telemedicine with Shanta Life',
    coloredTitleBN: 'টেলিমেডিসিনের মূল সুবিধাসমূহ',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefit.webp`,
    description: 'Enjoy the facilities you deserve without breaking the bank.',
    descriptionBN: 'ব্যয় বাড়ানো ছাড়াই সে সমস্ত সুবিধা উপভোগ করতে পারেন',
    items: [
      {
        title: 'Instant Doctor Access',
        titleBN: 'তাৎক্ষণিক ডাক্তারি পরামর্শ',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefitIIcon1.png`,
      },
      {
        title: '24/7 Availability',
        titleBN: '২৪/৭ টেলিমেডিসিন সেবা ',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefitIIcon2.png`,
      },
      {
        title: 'E-Prescriptions',
        titleBN: 'ই-প্রেসক্রিপশন',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/telemedicine-services/web/keybenefitIIcon3.png`,
      },
    ],
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} top="top-[150px] md:top-[200px] lg:top-[45%]" />
      <CHFInfoSection data={descriptionHtml} />
      <WCTMSection data={WCTMSectionData} className="bg-white" />
      <KeyBenefits data={keyBenefitsData} />
    </div>
  )
}

export default page
