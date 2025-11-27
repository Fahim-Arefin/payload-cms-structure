import CorporateChoose from '@/components/custom/corporate/CorporateChoose'
import { CorporateInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CorporateInfoBlockType
  params: Record<string, string>
}

function CorporateInfoBlock({ block }: Props) {
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
      descriptionBN: `ইন্টেলিজেন্ট হেলথকেয়ার কভারেজ—লোকাল ও গ্লোবাল সাপোর্টকে একসাথে যুক্ত করে।`,
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/choose5.svg`,
      text: 'Dedicated Account Management',
      textBN: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজমেন্ট',
      description:
        'Enhance retention with data-backed care solutions, managed by a team of dedicated experts.',
      descriptionBN: `একজন অভিজ্ঞ একাউন্ট ম্যানেজার সর্বদা আপনার সেবার নিশ্চয়তা প্রদানে নিবেদিত থাকবেন।`,
    },
    {
      icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/corporate-bullet.png`,
      text: 'Lifestyle Benefits',
      textBN: 'লাইফস্টাইল সুবিধা',
      description: 'Lifestyle Benefit and Discount facility with the Wellness Pass.',
      descriptionBN: `ওয়েলনেস পাসের সাথে লাইফস্টাইল সুবিধা ও ডিসকাউন্ট অফার।`,
    },
  ]
  return (
    <div>
      <CorporateChoose benefitsData={block} />
    </div>
  )
}

export default CorporateInfoBlock
