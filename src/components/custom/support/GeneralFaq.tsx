'use client'

import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import ToolTip from '../shared/ToolTip'
import GlobalButton from '../shared/GlobalButton'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedText from '../shared/LocalizedText'

type Props = {}

type AccordionItemType = {
  value: string
  title: string
  titleBN?: string
  content: string[]
  contentBN?: string[]
}

type FaqKey = 'product' | 'claims' | 'general' | 'policy' | 'customer' | 'insurance'

const faqData: Record<FaqKey, AccordionItemType[]> = {
  general: [
    {
      value: 'item-1',
      title: 'What is Risk?',
      titleBN: 'ঝুঁকি কি?',
      content: [
        'Risk is the possibility of an unfortunate occurrence, an uncertainty of loss.',
        'In Insurance, Risk is the "uncertainty of the occurrence of an event that can cause economic losses".',
      ],
      contentBN: [
        'ঝুঁকি মানে হলো কোনো অপ্রত্যাশিত বা অপ্রীতিকর ঘটনার সম্ভাবনা, অর্থাৎ ক্ষতির অনিশ্চয়তা।',
        'বীমা ক্ষেত্রে ঝুঁকি বলতে বোঝায়—এমন একটি ঘটনার অনিশ্চয়তা, যা ঘটলে অর্থনৈতিক ক্ষতি হতে পারে।',
      ],
    },
    {
      value: 'item-2',
      title: 'What is Insurance?',
      titleBN: 'বীমা কি?',
      content: [
        `Insurance is a financial arrangement in which an individual or entity (known as "insured") receives protection against 
      potential financial losses or damages from an insurance company (known as "insurer"), in exchange for payment/s, known as premium.`,
        `The "insurer" agrees to cover certain risks and compensate the "insured" for covered losses, according to the terms of the policy.`,
      ],
      contentBN: [
        `বীমা হলো একটি আর্থিক ব্যবস্থা, যেখানে কোনো ব্যক্তি বা প্রতিষ্ঠান (যাকে বলা হয় "বীমাকৃত") সম্ভাব্য আর্থিক ক্ষতি বা ক্ষয়ক্ষতির বিরুদ্ধে 
      সুরক্ষা পায় একটি বীমা কোম্পানির (যাকে বলা হয় "বীমা প্রদানকারী") কাছ থেকে।`,
        `এর বিনিময়ে বীমাকৃত ব্যক্তি নির্দিষ্ট টাকা প্রদান করে, যাকে বলা হয় প্রিমিয়াম। বীমা প্রদানকারী নির্দিষ্ট ঝুঁকি বহন করতে এবং বীমা চুক্তির শর্ত 
      অনুযায়ী বীমাকৃতকে ক্ষতিপূরণ দিতে সম্মত হয়।`,
      ],
    },
    {
      value: 'item-3',
      title: 'What is Life Insurance?',
      titleBN: `জীবন বীমা কি?`,
      content: [
        `Life insurance contract may be defined as the contract, whereby the insurer in consideration of a premium undertakes 
      to pay a certain sum of money either on the death of the insured or on the expiry of a fixed period.`,
      ],
      contentBN: [
        `জীবন বীমা চুক্তি হলো এমন একটি চুক্তি, যেখানে বীমা প্রদানকারী প্রিমিয়ামের বিনিময়ে অঙ্গীকার করেন যে, বীমাকৃত ব্যক্তির মৃত্যু হলে বা 
      নির্ধারিত সময়সীমা শেষ হলে তিনি নির্দিষ্ট পরিমাণ অর্থ প্রদান করবেন।`,
      ],
    },
    {
      value: 'item-4',
      title: 'What is Reinsurance?',
      titleBN: 'পুনর্বীমা  কি?',
      content: [
        'Reinsurance is an insurance that is purchased by an insurance company (insurer also sometimes called a “cedant” or “cedent”) from another insurance company (reinsurer) as a means of risk management.',
      ],
      contentBN: [
        `পুনর্বীমা হলো এমন একটি বীমা, যা একটি বীমা কোম্পানি (বীমা প্রদানকারী, যাকে কখনও “সিডান্ট” বা “সিডেন্ট” বলা হয়) 
      ঝুঁকি ব্যবস্থাপনার অংশ হিসেবে আরেকটি বীমা কোম্পানি (পুনর্বীমা প্রদানকারী) থেকে ক্রয় করে।`,
      ],
    },
    {
      value: 'item-5',
      title: 'Why do I need life insurance — why now?',
      titleBN: 'আমার কেন জীবন বীমা প্রয়োজন — কেন এখনই?',
      content: [
        `Life insurance ensures that your family is financially protected in case something happens to you. If you have dependents—like 
      children, a spouse, or aging parents—life insurance can help cover their daily expenses and even educational costs.`,
        `Life insurance is typically more affordable the younger and healthier you are. By getting a policy now, you can lock in a lower 
      premium and save on long-term costs.`,
      ],
      contentBN: [
        `জীবন বীমা নিশ্চিত করে যে, আপনার কিছু হলে আপনার পরিবার আর্থিকভাবে সুরক্ষিত থাকবে। যদি আপনার উপর নির্ভরশীল কেউ থাকে—যেমন সন্তান, 
      স্বামী/স্ত্রী বা বয়স্ক বাবা-মা—তাহলে জীবন বীমা তাদের দৈনন্দিন খরচ এবং এমনকি পড়াশোনার খরচ মেটাতে সাহায্য করবে।`,
        `আপনি যত তরুণ ও সুস্থ থাকবেন, জীবন বীমা তত কম খরচে পাওয়া যায়। এখনই বীমা নিলে আপনি কম প্রিমিয়াম নিশ্চিত করতে পারবেন এবং দীর্ঘমেয়াদে 
      খরচ বাঁচাতে পারবেন।`,
      ],
    },
    {
      value: 'item-6',
      title: 'I want to take out a life insurance policy — where do I begin?',
      titleBN: `আমি জীবন বীমা পলিসি নিতে চাই, কিন্তু কোথা থেকে শুরু করবো?`,
      content: [
        `To take out a life insurance policy, kindly contact us at +8809610889900 or write to us at info@shantalife.com. We shall reach 
      you at once and upon discussion with you, we can recommend the suitable plan.`,
      ],
      contentBN: [
        `জীবন বীমা পলিসি নিতে চাইলে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: +8809610889900 বা info@shantalife.com এ ইমেইল করুন। আমরা দ্রুত 
      আপনার সাথে যোগাযোগ করবো এবং-আলোচনার মাধ্যমে আপনার জন্য উপযুক্ত প্ল্যান সাজেস্ট করবো।`,
      ],
    },
    {
      value: 'item-7',
      title: 'How should I choose an insurance company?',
      titleBN: `আমি কিভাবে একটি বীমা কোম্পানি নির্বাচন করবো?`,
      content: [
        `Choosing the right insurance company is crucial for getting the coverage you need, reliable service, and a good long-term investment. 
      The key factors to consider are Financial Stability and Reputation, Product Offerings which matches to your needs and responsive, 
      efficient, and transparent customer service.`,
      ],
      contentBN: [
        `সঠিক বীমা কোম্পানি নির্বাচন করা খুব গুরুত্বপূর্ণ, যাতে আপনি আপনার প্রয়োজন অনুযায়ী সঠিক সুরক্ষা পান, ভালো পরিষেবা পান এবং দীর্ঘমেয়াদে এটি একটি 
      ভালো বিনিয়োগ হয়। এর জন্য প্রধান বিষয়গুলো হলো— আর্থিক স্থিতিশীলতা ও সুনাম, আপনার চাহিদার সাথে মেলে এমন পণ্য বা প্ল্যান, দ্রুত, দক্ষ এবং স্বচ্ছ গ্রাহক 
      পরিষেবা।`,
      ],
    },
    {
      value: 'item-8',
      title: 'Is there a medical exam required to get a policy?',
      titleBN: `পলিসি নিতে কি একটি মেডিকেল পরীক্ষা প্রয়োজন?`,
      content: [
        `Requirement depends on many factors i.e., age, sum assured etc. To get detailed information about our plans and services, 
      please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us 
      on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.`,
      ],
      contentBN: [
        `মেডিকেল পরীক্ষার প্রয়োজনীয়তা অনেক ফ্যাক্টরের ওপর নির্ভর করে, যেমন: বয়স, নিশ্চিতকৃত অর্থ ইত্যাদি। আমাদের পরিকল্পনা এবং পরিষেবাগুলি
        সম্পর্কে বিস্তারিত তথ্য পেতে, দয়া করে আপনার নাম, জেলা, মোবাইল নম্বর এবং ইমেইল আইডি আমাদের ইনবক্সে বা info@shantalife.com এ 
        শেয়ার করুন। এছাড়া, আপনি যেকোনো কর্মদিবসে (রবিবার থেকে বৃহস্পতিবার) 09610889900 নম্বরে সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে আমাদের 
        কল করতে পারেন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।`,
      ],
    },
    {
      value: 'item-9',
      title: 'Can I purchase a policy online?',
      titleBN: 'আমি কি অনলাইনে একটি পলিসি কিনতে পারি?',
      content: [
        `We don't have this option right now. As our vision is digitalization, we will bring this feature on our website very soon. We will inform about this in our website. For more information write to us at info@shantalife.com or also you can call on any working day at this number 09610889900, between 10 AM to 6 PM.`,
      ],
      contentBN: [
        `আমাদের কাছে এই অপশন বর্তমান নেই। আমাদের ভিশন হল ডিজিটালাইজেশন, আমরা খুব শীঘ্রই আমাদের ওয়েবসাইটে এই ফিচার নিয়ে আসব। আমরা এই বিষয় আমাদের ওয়েবসাইটে তথ্য জানাব। আরো তথ্যের জন্য আমাদের info@shantalife.com এ লিখুন অথবা যেকোনো কর্মদিবসে (রবিবার থেকে বৃহস্পতিবার) 09610889900 নম্বর সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে আমাদের কল করতে পারেন।`,
      ],
    },
    {
      value: 'item-10',
      title:
        'I want to take out insurance. How can I do it, and how much will I need to pay for the insurance policy?',
      titleBN:
        'আমি বীমা নিতে চাই। আমি কীভাবে এটি করতে পারি এবং বীমা পলিসির জন্য আমাকে কত টাকা দিতে হবে?',
      content: [
        `To take out insurance, kindly contact us at +8809610889900 or write to us at info@shantalife.com. We shall reach you at once and upon discussion with you, we can recommend the suitable plan. Premium amount will vary depending on many factors such as age, sum assured, term, etc. Our representative will provide detailed cost breakdown during consultation.`,
      ],
      contentBN: [
        `বীমা নিতে চাইলে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন +8809610889900 নম্বরে অথবা info@shantalife.com এ ইমেইল করুন। আমরা দ্রুত আপনার সাথে যোগাযোগ করব এবং আলোচনার মাধ্যমে আপনার জন্য উপযুক্ত প্ল্যান সাজেস্ট করব। প্রিমিয়ামের পরিমাণ বিভিন্ন বিষয়ের উপর নির্ভর করে যেমন বয়স, বীমার পরিমাণ, মেয়াদ ইত্যাদি। আমাদের প্রতিনিধি পরামর্শের সময় বিস্তারিত খরচের হিসাব প্রদান করবেন।`,
      ],
    },
    {
      value: 'item-11',
      title: 'How quickly will my policy become active?',
      titleBN: 'কত দ্রুত আমার পলিসি সক্রিয় হবে?',
      content: [
        `Policy activation timing can vary depending on the type of insurance and completion of necessary requirements, such as document submission and, if applicable, medical exams. to get detailed information about our plans and services, please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.`,
      ],
      contentBN: [
        `পলিসি সক্রিয় হওয়ার সময়সীমা বীমার ধরন এবং প্রয়োজনীয় শর্ত পূরণের ওপর নির্ভর করে ভিন্ন হতে পারে, যেমন: ডকুমেন্ট জমা দেওয়া এবং প্রযোজ্য হলে মেডিকেল পরীক্ষা। আমাদের পরিকল্পনা এবং পরিষেবা সম্পর্কে বিস্তারিত তথ্য পেতে, দয়া করে আপনার নাম, জেলা, মোবাইল নম্বর এবং ইমেইল আইডি আমাদের ইনবক্সে বা info@shantalife.com এ শেয়ার করুন। এছাড়া, আপনি যেকোনো কর্মদিবসে (রবিবার থেকে বৃহস্পতিবার) 09610889900 নম্বরে সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে আমাদের কল করতে পারেন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।`,
      ],
    },
    {
      value: 'item-12',
      title: 'Do you offer group life insurance plans for businesses?',
      titleBN: 'আপনারা কি ব্যবসার জন্য গ্রুপ জীবন বীমা পরিকল্পনা অফার করেন?',
      content: [
        `Yes, we do offer group life insurance plans for businesses. to get detailed information about our plans and services, please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.`,
      ],
      contentBN: [
        `হ্যাঁ, আমরা ব্যবসার জন্য গ্রুপ জীবন বীমা পরিকল্পনা অফার করি। আমাদের পরিকল্পনা এবং পরিষেবাগুলি সম্পর্কে বিস্তারিত তথ্য পেতে, দয়া করে আপনার নাম, জেলা, মোবাইল নম্বর এবং ইমেইল আইডি আমাদের ইনবক্সে বা info@shantalife.com এ শেয়ার করুন। এছাড়া, আপনি যেকোনো কর্মদিবসে  (রবিবার থেকে বৃহস্পতিবার) 09610889900 নম্বরে সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে আমাদের কল করতে পারেন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।`,
      ],
    },
    {
      value: 'item-13',
      title:
        'Does the health card of Shanta Life provide discounts for tests and examinations at any hospitals?',
      titleBN:
        'Shanta Life এর health card দিয়ে কি ভারতের কোন হসপিটালে পরীক্ষা নিরিক্ষার উপর ছাড় পাওয়া যায়?',
      content: [
        `You can find detailed information about all enlisted hospital in our "Panel Hospital" under our Wellness Card, which was delivered with policy document. Alternatively, you can call with your questions on any working day (Sunday to Thursday) between 10 AM and 6 PM at 09610889900. You can also reach out to us by filling out the 'Contact Us' form on Shanta Life's website (www.shantalife.com).`,
      ],
      contentBN: [
        `আপনি আমাদের ওয়েলনেস কার্ডের “প্যানেল হাসপাতাল”-এর অধীনে থাকা সমস্ত তালিকাভুক্ত হাসপাতালে বিস্তারিত তথ্য পেতে পারেন, যা পলিসির কাগজপত্রের সঙ্গে সরবরাহ করা হয়েছিল। এছাড়া, যেকোনো কার্যদিবসে (রবিবার থেকে বৃহস্পতিবার) 09610889900 নম্বরে সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে আমাদের কল করতে পারেন। আপনি শান্তা লাইফের ওয়েবসাইট (www.shantalife.com) এ ‘Contact Us’ ফর্ম পূরণ করে আমাদের সাথে যোগাযোগ করতেও পারেন।`,
      ],
    },
    {
      value: 'item-14',
      title: 'About Claim Tracker?',
      titleBN: 'ক্লেইম ট্র্যাকার সম্পর্কে কি জানাবেন?',
      content: [
        `You can track your claim by our claim tracker. For more details please inbox us or call our hotline 09610889900.`,
      ],
      contentBN: [
        `আপনি আমাদের ক্লেইম ট্র্যাকার দ্বারা আপনার ক্লেইম ট্র্যাক করতে পারেন। আরো বিস্তারিত জানার জন্য অনুগ্রহ করে আমাদের ইনবক্স করুন অথবা আমাদের হটলাইন 09610889900 নম্বরে কল করুন।`,
      ],
    },
    {
      value: 'item-15',
      title:
        'How can I easily get information about my policy from abroad? Additionally, the number to which the OTP code is sent is also not in use!',
      titleBN:
        'প্রবাস থেকে কিভাবে সহজে পলিসির সবকিছু জানা যাবে..? তাছাড়া ওটিপি কোড যে নাম্বারে যাবে সেটাও ব্যবহৃত হচ্ছে না.!',
      content: [
        `You can now check the status of your Shanta Life policy online. On our website's Customer Portal, you can find information about your policy status, including the maturity date and premium payment date. Additionally, you can download your premium payment certificate from there. To access all information about your policy online, click on this link: https://eclaims.shantalife.com/public/my-policy. Thank you. Request the PO to send an email to info@shantalife.com to add an email to his policy. This way, he can also receive the OTP by email.`,
      ],
      contentBN: [
        `"প্রিয় স্যার, আপনার শান্তা লাইফ পলিসির স্ট্যাটাস এখন আপনি অনলাইনেই দেখতে পারবেন। আমাদের ওয়েবসাইটের কাস্টমার পোর্টালে আপনি পলিসি স্ট্যাটাস সহ আরো জানতে পারবেন মেয়াদপূর্তির তারিখ এবং প্রিমিয়াম দেয়ার তারিখ। এছাড়াও এখান থেকে আপনি প্রিমিয়াম পেমেন্ট সার্টিফিকেট টি ও ডাউনলোড করতে পারবেন। অনলাইনেই পলিসির সকল তথ্য জানতে ক্লিক করুন https://eclaims.shantalife.com/public/my-policy এই লিংকে। ধন্যবাদ।
Request the PO to send an email at info@shantalife.com to add email to his Policy. Thus he can get the OTP by email too (translate)."`,
      ],
    },
    {
      value: 'item-16',
      title: 'Will I get my money after maturity?',
      titleBN: 'মেয়াদপূর্তির পরে কি আমি আমার টাকা পাব?',
      content: [
        `Yes, upon maturity of your insurance policy, you will receive the maturity benefit as specified in the policy terms. To get more information please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.`,
      ],
      contentBN: [
        `হ্যাঁ, আপনার বীমা পলিসির মেয়াদপূর্তির পর, আপনি পলিসির শর্ত অনুযায়ী মেয়াদপূর্তির সুবিধা পাবেন। আরও তথ্যের জন্য দয়া করে আপনার নাম, জেলা, মোবাইল নম্বর এবং ইমেইল আইডি আমাদের ইনবক্সে বা info@shantalife.com এ শেয়ার করুন। এছাড়া, আপনি যেকোনো কর্মদিবসে 09610889900 নম্বরে 10 AM থেকে 6 PM এর মধ্যে আমাদের কল করতে পারেন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।`,
      ],
    },
  ],
  claims: [
    {
      value: 'item-1',
      title: 'What documents are required to submit along with Out Patient Treatment Claim?',
      titleBN: `Out Patient Treatment Claim-এর সাথে জমা দেওয়ার জন্য কী কী কাগজপত্র লাগবে?`,
      content: [
        'Download the “Health Insurance Claim Form” from the Support section of the menu.',
        '1. Original money receipt showing the attending physician’s detailed charges with seal, signature, and date.',
        '2. Photocopy of the physician’s prescription.',
        '3. Original itemized pharmacy bill with date of purchase, patient’s name, quantity, and drug name (must match the prescription).',
        '4. Original receipts for each laboratory test/other examinations, supported by the physician’s written request.',
        '5. Photocopies of the reports of examinations undertaken.',
      ],
      contentBN: [
        `আমাদের মেনু বারের “Support” সেকশন থেকে “Health Insurance Claim Form” ডাউনলোড করুন এবং সাথে জমা দিন—`,
        `১. মূল মানি রিসিপ্ট, যেখানে ডাক্তার কত টাকা নিয়েছেন তার বিস্তারিত, সীল, স্বাক্ষর ও তারিখ থাকবে।`,
        `২. ডাক্তারের প্রেসক্রিপশনের ফটোকপি।`,
        `৩. মূল ফার্মেসি বিল, যেখানে কেনার তারিখ, রোগীর নাম, ওষুধের নাম ও পরিমাণ লেখা থাকবে (ওষুধ অবশ্যই ডাক্তারের প্রেসক্রাইব করা হতে হবে)।`,
        `৪. প্রতিটি ল্যাব টেস্ট ও অন্যান্য পরীক্ষার খরচের মূল রিসিপ্ট, সাথে সেই পরীক্ষার জন্য ডাক্তারের লিখিত সুপারিশ।`,
        `৫. পরীক্ষিত রিপোর্টের ফটোকপি।`,
      ],
    },
    {
      value: 'item-2',
      title: 'What documents are required to submit along with In Patient Treatment Claim?',
      titleBN: `In Patient Treatment Claim-এর সাথে জমা দেওয়ার জন্য কী কী কাগজপত্র লাগবে?`,
      content: [
        'Download the “Health Insurance Claim Form” from the Support section of the menu.',
        '1. Copy of physician’s prescription/advice regarding hospitalization.',
        '2. Itemized original hospital bill supported by the official receipt for the total amount paid.',
        '3. Original receipt showing attending physician’s/surgeon’s charges with stamp and signature.',
        '4. Photocopy of detailed hospital discharge certificate and other treatment documents.',
      ],
      contentBN: [
        `আমাদের মেনু বারের “Support” সেকশন থেকে “Health Insurance Claim Form” ডাউনলোড করুন এবং সাথে জমা দিন—`,
        `১. হাসপাতালে ভর্তি হওয়ার পরামর্শ সম্পর্কিত ডাক্তারের প্রেসক্রিপশনের কপি।`,
        `২. হাসপাতালের খরচের বিস্তারিত মূল বিল ও পুরো টাকা দেওয়ার অফিসিয়াল রিসিপ্ট।`,
        `৩. মূল রিসিপ্ট, যেখানে চিকিৎসক/সার্জনের চার্জ, সীল ও স্বাক্ষর থাকবে।`,
        `৪. হাসপাতালের ডিসচার্জ সার্টিফিকেট ও অন্যান্য চিকিৎসার নথির ফটোকপি।`,
      ],
    },
    {
      value: 'item-3',
      title: 'How can I get my final benefit once the policy reaches its maturity date?',
      titleBN: `পলিসির মেয়াদ শেষ হলে আমি কীভাবে আমার চূড়ান্ত সুবিধা পাব?`,
      content: [
        'You will be notified via SMS and email (if available) when the policy matures.',
        'Submit the following documents to receive maturity benefit:',
        '(a) Original Policy Document.',
        '(b) Duly signed Release Voucher by the Policy Owner.',
        '(c) Photocopy of NID/Passport (must match Shanta Life’s records).',
        '(d) Photocopy of a cheque leaf (for bank details).',
      ],
      contentBN: [
        `আপনার পলিসির মেয়াদ শেষ হলে, আপনাকে এসএমএস ও ইমেইল (যদি থাকে) এর মাধ্যমে জানানো হবে। 
      মেয়াদপূর্তির সুবিধা পেতে হলে নিচের কাগজপত্র জমা দিন—`,
        `(ক) পলিসি ডকুমেন্টের মূল কপি।`,
        `(খ) বীমা গ্রাহক কর্তৃক যথাযথভাবে স্বাক্ষরিত রিলিজ ভাউচার।`,
        `(গ) এনআইডি/পাসপোর্টের ফটোকপি (শান্তা লাইফে বিদ্যমান রেকর্ডের সাথে মিল থাকতে হবে)।`,
        `(ঘ) চেকের পাতার ফটোকপি।`,
      ],
    },
    {
      value: 'item-4',
      title: 'What is a Release Voucher and how to get it?',
      titleBN: `রিলিজ ভাউচার কী এবং এটি কীভাবে পাওয়া যায়?`,
      content: [
        'A Release Voucher is issued by Head Office mentioning the maturity value.',
        'It will be couriered to your correspondence address and emailed (if available) as per records with Shanta Life.',
      ],
      contentBN: [
        `মেয়াদপূর্তির টাকা উল্লেখ করে রিলিজ ভাউচার হেড অফিস থেকে ইস্যু করা হয়। এটি আপনার ঠিকানায় কুরিয়ার করে পাঠানো হবে যা শান্তা 
      লাইফে দেয়া আছে এবং যদি ইমেইল থাকে, তাহলে ইমেইলেও পাঠানো হবে।`,
      ],
    },
    {
      value: 'item-5',
      title: 'If I lost the Policy document, how can I claim maturity benefit?',
      titleBN: `যদি পলিসি ডকুমেন্ট হারিয়ে যায়, তাহলে কীভাবে মেয়াদপূর্তির সুবিধা পাব?`,
      content: [
        'Submit the following documents:',
        '(1) Application regarding loss of document signed by the Policy Owner.',
        '(2) Copy of GD (General Diary) registered at your Police Station.',
        '(3) Copy of any old premium receipt.',
        '(4) Duly signed Release Voucher.',
        'After receipt of the above, payment will be made to your bank account following a 30-day observation period.',
      ],
      contentBN: [
        `যদি পলিসি ডকুমেন্ট হারিয়ে যায়, তাহলে নিচের কাগজপত্র জমা দিতে হবে—`,
        `১. বীমা গ্রাহকের স্বাক্ষরিত পলিসি হারানোর আবেদনপত্র`,
        `২. আপনার থানায় নিবন্ধিত জিডির কপি`,
        `৩. যেকোনো পুরনো প্রিমিয়াম রশিদের কপি`,
        `৪. যথাযথভাবে স্বাক্ষরিত রিলিজ ভাউচার`,
        `উপরের সব কাগজপত্র পাওয়ার পরে ৩০ দিনের পর্যবেক্ষণের পর টাকা আপনার ব্যাংক অ্যাকাউন্টে প্রদান করা হবে।`,
      ],
    },
    {
      value: 'item-6',
      title: 'What are the documents of a Death Claim?',
      titleBN: `মৃত্যু দাবীর জন্য কী কী কাগজপত্র লাগবে?`,
      content: [
        'Death Certificate: Original or attested photocopy from a licensed private/government hospital, or from the municipal authority (Health Dept. of City Corporation/Local Union Parishad Chairman/Ward Commissioner/Councillor on official letterhead).',
        'Proof of Age: Age proof for both the Insured and the Beneficiary.',
        'Accepted age proofs include: Photocopy of National ID; Original Passport (mandatory for remittance earners); Driving License; SSC/Equivalent certificate.',
        'For remittance earners: Original Passport must be submitted with the claim (returned ASAP).',
        'If death is accidental, additionally provide:',
        '– Photocopy of Autopsy (Post-Mortem) Report and burial permission from the police station.',
        '– Photocopy of Police Report (FIR/Final Police Report, if available).',
        '– Newspaper clipping (if any).',
        'For Group Insurance claim: Employment certificate.',
        'For Individual Insurance claim: Original Policy Documents.',
        'For Credit Life claims, additionally provide:',
        '– Photocopy of the initial application for the loan/credit card.',
        '– Transaction details/Bank statements or card outstanding balance as of the date of death.',
      ],
      contentBN: [
        `মৃত্যু দাবির জন্য প্রয়োজনীয় কাগজপত্র নিচে দেওয়া হলো:`,
        `(ক) মৃত্যু সনদ:

লাইসেন্সধারী প্রাইভেট/সরকারি হাসপাতাল থেকে ইস্যু করা মৃত্যু সনদের মূল কপি বা সত্যায়িত ফটোকপি, যেখানে মৃত ব্যক্তিকে চিকিৎসা দেওয়া হয়েছিল, অথবা

সিটি কর্পোরেশন/স্থানীয় ইউনিয়ন পরিষদ চেয়ারম্যান/ওয়ার্ড কমিশনার/কাউন্সিলরের অফিসিয়াল লেটারহেডে ইস্যুকৃত মৃত্যু সনদের আসল বা সত্যায়িত কপি।`,
        `(খ) বয়সের প্রমাণ:

বীমিত ব্যক্তি এবং সুবিধাভোগীর উভয়ের বয়সের প্রমাণ দিতে হবে। নিচের যেকোনো একটি গ্রহণযোগ্য:
» জাতীয় পরিচয়পত্রের ফটোকপি / পাসপোর্ট (রেমিট্যান্স আয়ের জন্য অবশ্যই আসল পাসপোর্ট) / ড্রাইভিং লাইসেন্স / এসএসসি বা সমতুল্য সনদ।
» রেমিট্যান্স আয়ের ক্ষেত্রে দাবী দাখিলের সময় পাসপোর্টের আসল কপি জমা দিতে হবে, যা দ্রুত ফেরত দেওয়া হবে।`,
        `(গ) দুর্ঘটনাজনিত মৃত্যুর ক্ষেত্রে অতিরিক্ত কাগজপত্র:

পোস্টমর্টেম রিপোর্টের ফটোকপি এবং থানার দাফনের অনুমতির কপি

থানায় দাখিলকৃত মামলা (এফআইআর/চূড়ান্ত পুলিশ প্রতিবেদন, যদি থাকে)

সংবাদপত্রের প্রকাশিত অংশ (যদি থাকে)`,
        `(ঘ) গ্রুপ ইন্সুরেন্স দাবীর জন্য:

চাকরির সনদপত্র`,
        `(ঙ) ব্যক্তিগত ইন্সুরেন্স দাবীর জন্য:

মূল পলিসি দলিল`,
        `(চ) ক্রেডিট লাইফ পলিসির ক্ষেত্রে অতিরিক্ত:

ঋণ বা ক্রেডিট কার্ডের প্রাথমিক আবেদনপত্রের ফটোকপি

লেনদেনের বিবরণ/ব্যাংক স্টেটমেন্ট বা মৃত্যুর তারিখের হিসাব অনুযায়ী কার্ড অ্যাকাউন্টের বাকি টাকা`,
      ],
    },
    {
      value: 'item-7',
      title:
        'Can the policyholder request payment to a different bank account? What documents are required?',
      titleBN: `বীমা গ্রাহকের কি অন্য কোনো ব্যাংক অ্যাকাউন্টে টাকা পাঠানোর অনুরোধ করার সুযোগ আছে? যদি থাকে, তাহলে কী ধরনের কাগজপত্র লাগবে?`,
      content: [
        'Shanta Life encourages payment to the policy owner’s own bank account.',
        'In special cases, payment to a different account may be considered at company discretion, upon submission of:',
        '(a) Recipient’s NID and contact number.',
        '(b) Proof of relationship.',
      ],
      contentBN: [
        `শান্তা লাইফ সাধারণত পলিসি মালিকের নিজস্ব ব্যাংক অ্যাকাউন্টে লেনদেন করার পরামর্শ দেয়।`,
        `তবে বিশেষ ক্ষেত্রে নিচের কাগজপত্র জমা দিয়ে আবেদন করা যেতে পারে, কিন্তু এটি সম্পূর্ণ কোম্পানির অনুমতির উপর নির্ভর করবে—`,
        `ক) প্রাপকের এনআইডি এবং যোগাযোগ নম্বর`,
        `খ) সম্পর্কের প্রমাণপত্র`,
      ],
    },
    {
      value: 'item-8',
      title:
        'Is it possible to consolidate medical costs related to more than one health problem in one claim form?',
      titleBN: `একটি দাবী ফর্মে একাধিক স্বাস্থ্য সমস্যার চিকিৎসার খরচ একসঙ্গে জমা দেওয়া সম্ভব কি?`,
      content: [
        'Yes. You may file one claim covering multiple health issues.',
        'Ensure all required details and documents for each cost are provided so the correct amounts are processed.',
        'Note: Group and Individual policy claims cannot be submitted together in one form.',
      ],
      contentBN: [
        `হ্যাঁ, এটি সম্ভব। আপনার দাবী জমা দেওয়ার সময় অবশ্যই সব চিকিৎসার খরচের বিস্তারিত তথ্য দিন।`,
        `এতে ক্লেইম প্রক্রিয়াকরণকারী সঠিক হিসাব করতে পারবে।`,
        `তবে লক্ষ্য রাখবেন, গ্রুপ পলিসি এবং ব্যক্তিগত পলিসির দাবী একসঙ্গে জমা দেওয়া যাবে না।`,
      ],
    },
    {
      value: 'item-9',
      title: 'Are pre-existing conditions covered?',
      titleBN: `আগে থেকেই থাকা রোগ-ব্যাধি (Pre-existing conditions) কভার করা হয় কি?`,
      content: [
        'Generally, pre-existing conditions are not covered, similar to most insurers’ practices.',
        'Please contact our insurance experts to discuss your individual case and available options.',
      ],
      contentBN: [
        `অধিকাংশ বীমাকারীর মতো, আমাদের পলিসিগুলিও সাধারণত আগে থেকে থাকা রোগ-ব্যাধি কভার করে না।`,
        `তবে আপনার ব্যক্তিগত অবস্থার জন্য আমাদের বীমা বিশেষজ্ঞদের সাথে যোগাযোগ করার পরামর্শ দেওয়া হয়।`,
      ],
    },
  ],

  policy: [
    {
      value: 'item-1',
      titleBN: `ব্যক্তিগত বিবৃতি এবং চিকিৎসা পরীক্ষার প্রতিবেদন বা FMR কখন দরকার হয়?`,
      title: 'When is the Personal Statement & Medical Examination Report (FMR) required?',
      content: [
        'A pre-prescribed form indicates if FMR is required based on the coverage amount; our Customer Service will guide you.',
        'The form has two parts:',
        '— Personal Statement: completed by the examining doctor by hand based on the applicant’s responses.',
        '— Doctor’s Confidential Report: completed by the doctor after examining the applicant.',
        'Family history in the form must match any previously submitted proposal forms.',
        'The applicant should sign with the same pen used by the doctor to fill the form.',
        'Validity: up to 3 months from the signature date.',
        'If 30 days pass, a “Declaration of Continued Good Health” is required.',
      ],
      contentBN: [
        `একটি পূর্বনির্ধারিত ফর্ম আছে, যা নির্দেশ করে একজন ব্যক্তি তার প্রয়োজনীয় কভারেজ অনুযায়ী FMR দরকার কিনা। 
      আমাদের কাস্টমার সার্ভিস প্রতিনিধিরা ব্যক্তিকে সাহায্য ও দিকনির্দেশনা দেন।`,
        `এই ফর্মের দুইটি অংশ রয়েছে। প্রথম অংশ হলো ব্যক্তিগত বিবৃতি, যা পরীক্ষামূলক ডাক্তার আবেদনকারীর উত্তর অনুযায়ী হাতে পূরণ করবেন। 
      দ্বিতীয় অংশ হলো “ডাক্তারদের গোপনীয় প্রতিবেদন,” যা ডাক্তার আবেদনকারীকে পরীক্ষা করার পরে পূরণ করবেন।`,
        `আবেদনকারীর পারিবারিক ইতিহাস সম্পর্কিত তথ্য ফর্মে আগের যে কোনো প্রস্তাবনাপত্রে দেওয়া তথ্যের সাথে মিল থাকতে হবে। 
      ডাক্তার যে কলম দিয়ে ফর্মটি পূরণ করবেন, একই কলম ব্যবহার করে আবেদনকারী নির্ধারিত স্থানে স্বাক্ষর করবেন।`,
      ],
    },
    {
      value: 'item-2',
      title: 'What is an Additional Premium for Occupational Risk (Occupation Extra Premium)?',
      titleBN: `পেশাগত ঝুঁকির জন্য অতিরিক্ত প্রিমিয়াম (Occupation Extra Premium) কী অর্থে ব্যবহৃত হয়?`,
      content: [
        'An extra premium applied when a proposal involves a high-risk occupation.',
        'This additional charge compensates for higher risk associated with the insured’s job.',
      ],
      contentBN: [
        `যখন কোনো উচ্চ ঝুঁকিপূর্ণ পেশার জন্য অতিরিক্ত প্রিমিয়াম নিয়ে বীমার প্রস্তাব গৃহীত হয়, 
      তখন সেই অতিরিক্ত প্রিমিয়ামকে পেশাগত ঝুঁকির জন্য অতিরিক্ত প্রিমিয়াম (Occupation Extra Premium) বলা হয়।`,
      ],
    },
    {
      value: 'item-3',
      title: "Is it necessary for a housewife to provide her husband's details?",
      titleBN: `একজন গৃহিনীর জন্য স্বামীর তথ্য প্রদান করা কি আবশ্যক?`,
      content: [
        'Not mandatory.',
        'However, providing the husband’s details in the application form is encouraged to help assess the proposal more accurately and easily.',
      ],
      contentBN: [
        `এটি অবশ্যই বাধ্যতামূলক নয়, তবে আমরা বীমা আবেদন ফর্মে স্বামীর তথ্য দেওয়ার পরামর্শ দিই। 
      এতে আবেদনটি আরও সঠিক ও সহজে মূল্যায়ন করতে সাহায্য করে।`,
      ],
    },
    {
      value: 'item-4',
      title: 'In what frequency can I pay my premiums?',
      titleBN: `আমি কত সময়ে কতবার প্রিমিয়াম দিতে পারি?`,
      content: [
        'Available modes depend on policy type: quarterly, semi-annually, or annually.',
        'Monthly payments are available for DPS policies.',
        'Some policies allow a one-off “single premium” payment.',
        'The initial (first) premium must be paid in advance along with the Proposal Form.',
      ],
      contentBN: [
        `আপনার পলিসির ধরন অনুযায়ী, আপনি প্রিমিয়াম ত্রৈমাসিক, অর্ধবার্ষিক বা বাৎসরিক দিতে পারেন। 
      আপনি আপনার পরিস্থিতি ও বাজেট অনুযায়ী সুবিধাজনক পেমেন্ট মেয়াদ নির্বাচন করতে পারবেন।`,
        `যদি আপনার কাছে DPS পলিসি থাকে, তাহলে মাসিকও প্রিমিয়াম দিতে পারবেন। কিছু পলিসির ক্ষেত্রে এককালীন একবার প্রিমিয়াম পরিশোধ করা হয়,
        যাকে সিঙ্গেল প্রিমিয়াম বলা হয়।`,
        `যেই পেমেন্ট মোড বা পলিসি টাইপই হোক না কেন, প্রথম বা প্রাথমিক প্রিমিয়াম আবেদনপত্র জমা দেওয়ার সাথে সঙ্গে অগ্রিম প্রদান করতে হয়।`,
      ],
    },
  ],
  customer: [
    {
      value: 'item-1',
      title: "What are the media's you will use to connect with me?",
      titleBN: 'আমার সাথে যোগাযোগ করার জন্য আপনারা কোন মাধ্যমগুলো ব্যবহার করবেন?',
      content: [
        'While purchasing the Policy, we will capture your Correspondence address, mobile number, and email ID. All communications related to your Policy i.e., Reminder of Premium or any other payments related to Policy, Notifications on Maturity or Partial Maturity, Receipts generated against Payments made to Shanta Life Policy etc. shall be sent via email, SMS and letter. Therefore, it is required to keep your data updated at our end.',
      ],
      contentBN: [
        'পলিসি কেনার সময় আমরা আপনার যোগাযোগের ঠিকানা, মোবাইল নম্বর, এবং ইমেইল আইডি সংগ্রহ করব। আপনার পলিসি সম্পর্কিত সকল যোগাযোগ যেমন প্রিমিয়াম রিমাইন্ডার বা অন্যান্য পেমেন্টের তথ্য, মেয়াদপূর্তি বা আংশিক মেয়াদপূর্তি সংক্রান্ত অবহিতকরণ, শান্তা লাইফ পলিসিতে প্রদত্ত পেমেন্টের রসিদ ইত্যাদি ইমেইল, এসএমএস ও চিঠির মাধ্যমে পাঠানো হবে। তাই আপনার তথ্য আমাদের কাছে হালনাগাদ রাখা জরুরি।',
      ],
    },
    {
      value: 'item-2',
      title: 'How can I update my information',
      titleBN: 'আমি কীভাবে আমার তথ্য হালনাগাদ করতে পারি?',
      content: [
        'Kindly download the "Personal information change or correction" form which is available in our "Support" section. Duly complete the form, submit documents as mentioned in the second page of the form and send to our head office. You may wish to send us the scanned copy to customer.services@shantalife.com from your registered email.',
      ],
      contentBN: [
        'আমাদের ওয়েবসাইটের ‘সাপোর্ট’ সেকশনে থাকা ‘পার্সোনাল ইনফরমেশন পরিবর্তন বা সংশোধন’ ফর্মটি ডাউনলোড করুন। ফর্মটি সঠিকভাবে পূরণ করে, ফর্মের দ্বিতীয় পাতায় উল্লেখিত প্রয়োজনীয় কাগজপত্রসহ আমাদের হেড অফিসে জমা দিন। চাইলে আপনি আপনার রেজিস্টার্ড ইমেইল থেকে ফর্ম এবং কাগজপত্রের স্ক্যান কপি customer.services@shantalife.com এ পাঠাতে পারেন।',
      ],
    },
    {
      value: 'item-3',
      title: 'How can I Reinstate my Policy, if it lapses?',
      titleBN: 'আমার পলিসি ল্যাপ্স হলে আমি কীভাবে তা পুনরায় চালু করতে পারি?',
      content: [
        'Kindly submit the duly completed "Change or correction in Policy Details" form and submit along with documents as referred in "Reinstatement Requirements Table".',
        'If the Policy was lapsed for less than 06 months, duly completed "Good Health Declaration (GHD)" (download from Support menu bar) is required only. All insured and payor (if any) must submit separate GHD.',
        'Lapsed for more than 06 months will submit requirements as mentioned in Reinstatement Requirement Table.',
        'You may contact us or your customer service representative to know more in details.',
      ],
      contentBN: [
        'দয়া করে সঠিকভাবে পূরণকৃত ‘পলিসির তথ্য পরিবর্তন বা সংশোধন’ ফর্ম এবং ‘রি-ইনস্টেটমেন্ট রিকোয়ারমেন্টস টেবিল’-এ উল্লেখিত প্রয়োজনীয় কাগজপত্র জমা দিন।',
        'যদি পলিসি ৬ মাসের কম সময়ের জন্য ল্যাপ্স হয়ে থাকে, তাহলে শুধু সঠিকভাবে পূরণকৃত ‘গুড হেলথ ডিক্লারেশন (GHD)’ (সাপোর্ট মেনু বার থেকে ডাউনলোড করা যাবে) জমা দিলেই হবে। প্রতিটি বীমাকৃত ব্যক্তি এবং পেমেন্ট প্রদানকারী (যদি থাকে) আলাদা করে GHD জমা দেবেন।',
        'পলিসি যদি ৬ মাসের বেশি সময়ের জন্য ল্যাপ্স হয়, তবে ‘রি-ইনস্টেটমেন্ট রিকোয়ারমেন্টস টেবিল’-এ উল্লেখিত শর্ত অনুযায়ী কাগজপত্র জমা দিতে হবে।',
        'বিস্তারিত জানতে আমাদের সঙ্গে বা আপনার কাস্টমার সার্ভিস প্রতিনিধি’র সঙ্গে যোগাযোগ করতে পারেন।',
      ],
    },
    {
      value: 'item-4',
      title: 'What is the procedure to apply for a duplicate document, if the original is lost?',
      titleBN: 'মূল দলিল হারিয়ে গেলে ডুপ্লিকেট দলিলের জন্য আবেদন করার প্রক্রিয়া কী?',
      content: [
        'Kindly submit the duly completed "Change in Policy Details" form along with below mentioned documents -',
        "a. Copy of GD with Policyowner's signature;",
        'b. One copy Passport Size photo attested by Policy Owner;',
        'c. Any of Previous money receipt;',
        'd. A copy of NID/ Passport (must for remittance earner)/Birth Certificate attested by Policy Owner; and',
        'e. A money receipt of 100 Taka paid to Shanta Life (by MFS or Online Payment) for duplicate document issuance.',
      ],
      contentBN: [
        'দয়া করে সঠিকভাবে পূরণকৃত ‘পলিসির তথ্য পরিবর্তন’ ফর্ম এবং নিচে উল্লেখিত কাগজপত্র জমা দিন—',
        'ক) বীমাগ্রাহকের স্বাক্ষরযুক্ত সাধারণ ডায়েরির (GD) কপি;',
        'খ) বীমাগ্রাহক কর্তৃক সত্যায়িত একটি পাসপোর্ট সাইজ ছবি;',
        'গ) পূর্বের যেকোনো একটি মানি রিসিট;',
        'ঘ) বীমাগ্রাহক কর্তৃক সত্যায়িত জাতীয় পরিচয়পত্র/পাসপোর্ট (প্রবাসী আয় প্রাপক হলে অবশ্যই পাসপোর্ট) বা জন্ম সনদের কপি; এবং',
        'ঙ) ডুপ্লিকেট দলিল ইস্যুর জন্য শান্তা লাইফ-এ (MFS বা অনলাইন পেমেন্টের মাধ্যমে) প্রদত্ত ১০০ টাকার মানি রিসিট।',
      ],
    },
    {
      value: 'item-5',
      title: 'How to apply for a Loan against Policy?',
      titleBN: 'পলিসির বিপরীতে ঋণের জন্য কীভাবে আবেদন করতে হবে?',
      content: [
        "Policy Loan: When the surrender value of a policy is acquired and the policy is active, the policyholder may obtain a loan by pledging the policy as collateral, subject to the company's prevailing regulations.",
        'Kindly download the "Loan request form" from Support section and submit the duly completed form along with main Policy document, a copy of NID and MICR cheque leaf.',
      ],
      contentBN: [
        'পলিসি লোন: যখন কোনো পলিসির সারেন্ডার ভ্যালু অর্জিত হয় এবং পলিসিটি সক্রিয় থাকে, তখন কোম্পানির বিদ্যমান নিয়ম অনুযায়ী পলিসি বন্ধক রেখে বীমাগ্রাহক ঋণ নিতে পারেন।',
        'দয়া করে সাপোর্ট সেকশন থেকে ‘লোন রিকোয়েস্ট ফর্ম’ ডাউনলোড করে সঠিকভাবে পূরণ করুন এবং মূল পলিসি ডকুমেন্ট, জাতীয় পরিচয়পত্রের কপি ও MICR চেক লিফসহ জমা দিন।',
      ],
    },
    {
      value: 'item-6',
      title: 'How can I change coverage amount of my Policy?',
      titleBN: 'আমি কীভাবে আমার পলিসির কভারেজ পরিমাণ পরিবর্তন করতে পারি?',
      content: [
        '> Request to change coverage amount must be submitted within 06 months from Policy inception.',
        '> To increase the amount: Kindly submit the "Good health declaration" and medical requirements as per "Underwriting Requirement Table"',
        '> To decrease the amount: the change shall take effect on Policy Issue date or next Premium due date. ',
      ],
      contentBN: [
        '> কভারেজের পরিমাণ পরিবর্তনের আবেদন অবশ্যই পলিসি চালুর তারিখ থেকে ৬ মাসের মধ্যে জমা দিতে হবে।',
        '> কভারেজের পরিমাণ বাড়াতে চাইলে, ‘গুড হেলথ ডিক্লারেশন’ এবং ‘আন্ডাররাইটিং রিকোয়ারমেন্ট টেবিল’ অনুযায়ী প্রয়োজনীয় মেডিকেল কাগজপত্র জমা দিতে হবে।',
        '> কভারেজের পরিমাণ কমাতে চাইলে, পরিবর্তনটি পলিসি ইস্যুর তারিখ অথবা পরবর্তী প্রিমিয়াম প্রদানের তারিখ থেকে কার্যকর হবে।',
      ],
    },
    {
      value: 'item-7',
      title: 'Can I change the Mode of Payment?',
      titleBN: 'আমি কি প্রিমিয়াম পরিশোধের পদ্ধতি পরিবর্তন করতে পারি?',
      content: [
        'Yes, you can change the mode of payment by paying newly calculated Premium. Any changes shall take effect on next Policy Annivesary Date.',
      ],
      contentBN: [
        'হ্যাঁ, আপনি নতুন হিসাব করা প্রিমিয়াম পরিশোধ করে প্রিমিয়াম পরিশোধের পদ্ধতি পরিবর্তন করতে পারেন। কোনো পরিবর্তন পরবর্তী পলিসি বার্ষিকী তারিখ থেকে কার্যকর হবে।',
      ],
    },
    {
      value: 'item-8',
      title: 'Can I add or cancel a Supplementary Rider to my Policy any time?',
      titleBN:
        'আমি কি যে কোনো সময় আমার পলিসিতে সহযোগী বীমা (Supplementary Rider) যোগ বা বাতিল করতে পারি?',
      content: [
        '> To add a new Rider: Kindly submit the "Good health declaration" and medical requirements as per "Underwriting Requirement Table"',
        '> To cancel a Rider: The change shall take effect on next Premium due date. ',
      ],
      contentBN: [
        '> নতুন রাইডার যোগ করতে চাইলে, ‘গুড হেলথ ডিক্লারেশন’ এবং ‘আন্ডাররাইটিং রিকোয়ারমেন্ট টেবিল’ অনুযায়ী প্রয়োজনীয় মেডিকেল কাগজপত্র জমা দিতে হবে।',
        '> রাইডার বাতিল করতে চাইলে, পরিবর্তনটি পরবর্তী প্রিমিয়াম প্রদানের তারিখ থেকে কার্যকর হবে।',
      ],
    },
    {
      value: 'item-9',
      title: 'How can I apply for Change in my Policy Term?',
      titleBN: 'আমি কীভাবে আমার পলিসির মেয়াদ পরিবর্তনের জন্য আবেদন করতে পারি?',
      content: [
        'To increase the term of the Policy, kindly submit "Good Health Declaration" and a separate application writing the reason of change, in details.',
        'To decrease the term of the Policy, kindly pay the extra premium along with interest and the change will take effect from next Policy Issue Date.',
        'Term change request can be submitted once in policy life cycle and it shall take effect from the next anniversary date.',
      ],
      contentBN: [
        'পলিসির মেয়াদ বাড়াতে চাইলে, দয়া করে ‘গুড হেলথ ডিক্লারেশন’ এবং আলাদা একটি আবেদনপত্র জমা দিন, যাতে পরিবর্তনের কারণ বিস্তারিতভাবে উল্লেখ থাকবে।',
        'পলিসির মেয়াদ কমাতে চাইলে, অতিরিক্ত প্রিমিয়াম এবং সুদ সহ জমা দিতে হবে এবং পরিবর্তনটি পরবর্তী পলিসি ইস্যুর তারিখ থেকে কার্যকর হবে।',
        'মেয়াদ পরিবর্তনের আবেদন পলিসির জীবনের মধ্যে একবারই করা যাবে এবং এটি পরবর্তী বার্ষিকী তারিখ থেকে কার্যকর হবে।',
      ],
    },
    {
      value: 'item-10',
      title: 'How can I Change my beneficiary?',
      titleBN: 'আমি কীভাবে আমার বেনিফিসিয়ারি পরিবর্তন করতে পারি?',
      content: [
        '1. 01 PP size photograph signed by the new beneficiary and attested by Insured/Policy Owner.',
        '2. A copy of National ID/ Birth Registration / Passport (mandatory for remittance earner) of the new beneficiary attested by the insured / Policy Owner.',
        '3. A photocopy of Marriage certificate/ Birth Certificate / Citizenship (if applicable)',
        '4. The beneficiary must have insurable interest on the life of the Policy Owner.',
        '5. If the beneficiary is not of legal age, name of a legal guardian is necessary.',
        'Moreover, the proposed new beneficiary must be acceptable by the company.',
      ],
      contentBN: [
        '১. নতুন বেনিফিসিয়ারির একটি পাসপোর্ট সাইজ ছবি, যা নতুন বেনিফিসিয়ারি স্বাক্ষরিত এবং বীমাগ্রাহক কর্তৃক সত্যায়িত।',
        '২. নতুন বেনিফিসিয়ারির জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন/পাসপোর্টের (প্রবাসী আয় প্রাপকের জন্য বাধ্যতামূলক) কপি, বীমাগ্রাহক কর্তৃক সত্যায়িত।',
        '৩. বিবাহ সনদ/জন্ম সনদ/নাগরিকত্বের ফটোকপি (যদি প্রযোজ্য হয়)।',
        '৪. বেনিফিসিয়ারির বীমাগ্রাহকের জীবনের ওপর বীমাযোগ্য স্বার্থ থাকতে হবে।',
        '৫. বেনিফিসিয়ারি যদি আইনগত বয়সে না পৌঁছায়, তবে একজন বৈধ অভিভাবকের নাম উল্লেখ করা আবশ্যক।',
        'উপরন্তু, প্রস্তাবিত নতুন বেনিফিসিয়ারি কোম্পানির কাছে গ্রহণযোগ্য হতে হবে।',
      ],
    },
    {
      value: 'item-11',
      title: 'How can I make payments against Policy?',
      titleBN: 'আমি কীভাবে পলিসির জন্য প্রিমিয়াম পরিশোধ করতে পারি?',
      content: [
        'You can make payment by using any one of the below method:',
        '1. EFT Debit: Kindly submit the duly completed EFT Debit Authorization Form along with a copy of a cheque leaf. We shall send the due premium advice to your bank at your prescribed date;',
        '2. bKash: If you have a bKash wallet, you pay premium by using "Make Payment" section.',
        '3. Transfer through online banking. Please refer to "Pay Premium" Section.',
      ],
      contentBN: [
        'আপনি নিচের যেকোনো একটি পদ্ধতি ব্যবহার করে পলিসির প্রিমিয়াম পরিশোধ করতে পারেন:',
        '১. EFT ডেবিট: দয়া করে সঠিকভাবে পূরণকৃত EFT ডেবিট অথরাইজেশন ফর্ম এবং একটি চেক লিফের কপি জমা দিন। আমরা নির্ধারিত তারিখে আপনার ব্যাংকে প্রিমিয়ামের তথ্য প্রেরণ করব।',
        '২. bKash: যদি আপনার bKash ওয়ালেট থাকে, ‘Make Payment’ সেকশন ব্যবহার করে প্রিমিয়াম পরিশোধ করতে পারেন।',
        '৩. অনলাইন ব্যাংকিং-এর মাধ্যমে ট্রান্সফার: দয়া করে ‘Pay Premium’ সেকশনটি দেখুন।',
      ],
    },
    {
      value: 'item-12',
      title: 'Will I get my money after maturity?',
      titleBN: 'আপনার পলিসি মেয়াদ পূর্ণ হলে কি আমি আমার টাকা পাব?',
      content: [
        'After you submit your insurance claim at Shanta Life’s head office, you will receive your money within 05 working days.',
      ],
      contentBN: [
        'আপনার বীমা দাবী শান্তা লাইফের হেড অফিসে আবেদনের পর আগামী ০৫ কার্যদিবসের মধ্যে আপনি আপনার টাকা পেয়ে যাবেন।',
      ],
    },
    {
      value: 'item-13',
      title: 'Within how many days at most is the insurance claim settled?',
      titleBN: 'সর্বোচ্চ কত দিনের মধ্যে বীমা দাবী পরিশোধ করা হয়?',
      content: [
        'When your policy reaches maturity or partial maturity, you will receive your money within 07 working days after submitting an application at Shanta Life’s head office.',
      ],
      contentBN: [
        'আপনার পলিসির মেয়াদ / আংশিক মেয়াদ পূর্ণ হলে শান্তা লাইফের হেড অফিসে আবেদনের পর আগামী ০৭ কার্যদিবসের মধ্যে আপনি আপনার টাকা পেয়ে যাবেন।',
      ],
    },
  ],

  product: [
    {
      value: 'item-1',
      title: 'What is Rider / Supplementary Rider?',
      titleBN: 'রাইডার বা সহযোগী বীমা কি?',
      content: [
        'For enhanced protection or security, a supplementary agreement added to the primary life insurance policy for a small additional premium is known as a Rider or Supplementary Insurance. During the term of the policy, the Rider/Supplementary Insurance provides only insurance protection and does not offer any maturity or return benefit at the end of the term.',
      ],
      contentBN: [
        'অতিরিক্ত সুরক্ষা বা নিরাপত্তার জন্য, মূল জীবন বীমা পলিসির সঙ্গে সামান্য অতিরিক্ত প্রিমিয়ামের বিনিময়ে যোগ করা একটি অতিরিক্ত চুক্তিকে রাইডার বা সহযোগী বীমা বলা হয়। পলিসির মেয়াদের মধ্যে, রাইডার/সহযোগী বীমা শুধুমাত্র বীমা সুরক্ষা প্রদান করে এবং মেয়াদ শেষে কোনো মেচুরিটি বা রিটার্ন সুবিধা দেয় না।',
      ],
    },
    {
      value: 'item-2',
      title: 'What is Automatic Premium Loan (APL) ?',
      titleBN: 'অটোমেটিক প্রিমিয়াম লোন (APL) কি?',
      content: [
        `Automatic Premium Loan (APL) helps the policyholder to keep his/her policy active and enjoy the insurance coverage in case of missed premium payment within the Grace Period (31 days from premium payment due date).
The premium is automatically paid from the Cash Value (if available) of the policy when APL occurs. APL will continue until the Cash value is sufficient to deduct the outstanding premium. Interest will be charged from the day the Policy runs with APL.`,
      ],
      contentBN: [
        `অটোমেটিক প্রিমিয়াম লোন (APL) বীমাগ্রাহককে তার পলিসি সক্রিয় রাখতে এবং প্রিমিয়াম পরিশোধের সময়মতো না হওয়ার ক্ষেত্রে (প্রিমিয়ামের নির্ধারিত তারিখ থেকে ৩১ দিনের গ্রেস পিরিয়ডের মধ্যে) বীমার সুরক্ষা উপভোগ করতে সহায়তা করে।`,
        `APL ঘটলে প্রিমিয়াম স্বয়ংক্রিয়ভাবে পলিসির ক্যাশ ভ্যালু (যদি থাকে) থেকে পরিশোধ করা হয়। ক্যাশ ভ্যালু পর্যাপ্ত থাকা পর্যন্ত APL চালু থাকবে। পলিসি APL-এর মাধ্যমে চলার দিন থেকেই সুদের চার্জ প্রযোজ্য হবে।`,
      ],
    },
    {
      value: 'item-3',
      title: 'What types of insurance products do you offer?',
      titleBN: 'আপনারা কোন ধরনের বিমা পণ্য অফার করেন?',
      content: [
        'We offer investment, Child Education Protection, Accident & Health etc products. To get detailed information please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.',
      ],
      contentBN: [
        'আমরা বিনিয়োগ, শিশু শিক্ষা সুরক্ষা, দুর্ঘটনা ও স্বাস্থ্য ইত্যাদি পণ্য অফার করি। দয়া করে আপনার নাম, জেলা, মোবাইল নম্বর এবং ইমেইল আইডি আমাদের ইনবক্সে বা info@shantalife.com এ শেয়ার করুন। এছাড়া, আপনি যেকোনো কর্মদিবসে 09610889900 নম্বরে 10 AM থেকে 6 PM এর মধ্যে আমাদের কল করতে পারেন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
      ],
    },
    {
      value: 'item-4',
      title: 'Can I add my family members to the policy?',
      titleBN: 'আমি কি আমার পরিবার-সদস্যদের পলিসিতে যুক্ত করতে পারি?',
      content: [
        'Yes, in some supplementary contract can be added. To learn more please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.',
      ],
      contentBN: [
        'হ্যাঁ, কিছু সহায়ক চুক্তিতে পরিবার-সদস্যদের যুক্ত করা যেতে পারে। আরও জানতে অনুগ্রহ করে আপনার নাম, জেলা, মোবাইল নম্বর, এবং ইমেইল আইডি আমাদের ইনবক্সে অথবা info@shantalife.com এ পাঠান, অথবা আপনি যেকোনো কার্যদিবসে সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে এই নম্বরে 09610889900 কল করতে পারেন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
      ],
    },
    {
      value: 'item-5',
      title: 'What are the premium payment options?',
      titleBN: 'প্রিমিয়াম প্রদানের বিকল্পগুলো কী কী?',
      content: [
        'There are option to pay premium monthly, quarterly, semi annually and annually. You can also pay one single premium for the entire term. To learn more please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.',
      ],
      contentBN: [
        'প্রিমিয়াম পরিশোধের জন্য মাসিক, ত্রৈমাসিক, অর্ধ-বার্ষিক এবং বার্ষিক বিকল্প রয়েছে। এছাড়াও, আপনি পুরো মেয়াদের জন্য একক প্রিমিয়ামও পরিশোধ করতে পারেন। আরও জানতে অনুগ্রহ করে আপনার নাম, জেলা, মোবাইল নম্বর, এবং ইমেইল আইডি আমাদের ইনবক্সে অথবা info@shantalife.com এ পাঠান, অথবা আপনি যেকোনো কার্যদিবসে সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে এই নম্বরে 09610889900 কল করতে পারেন।',
      ],
    },
    {
      value: 'item-6',
      title: 'What happens if I miss a premium payment?',
      titleBN: 'যদি আমি একটি প্রিমিয়াম পরিশোধ মিস করি তাহলে কী হবে?',
      content: [
        'You have 31 days of grace period to pay the premium. If you do not pay the premium during this period please consider choosing one of the non-forfeiture options to stay under coverage.Please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.',
      ],
      contentBN: [
        'প্রিমিয়াম পরিশোধের জন্য আপনার কাছে ৩১ দিনের গ্রেস পিরিয়ড রয়েছে। যদি আপনি এই সময়ের মধ্যে প্রিমিয়াম পরিশোধ না করেন, তবে অনুগ্রহ করে কভারেজ বজায় রাখতে একটি non-forfeiture বিকল্প বেছে নেওয়ার কথা বিবেচনা করুন। আরও জানতে অনুগ্রহ করে আপনার নাম, জেলা, মোবাইল নম্বর এবং ইমেইল আইডি আমাদের ইনবক্সে অথবা info@shantalife.com এ পাঠান, অথবা যেকোনো কার্যদিবসে সকাল ১০টা থেকে সন্ধ্যা ৬টার মধ্যে এই নম্বরে 09610889900-এ কল করুন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
      ],
    },
    {
      value: 'item-7',
      title: 'Is there a cash value for my policy?',
      titleBN: 'আমার পলিসির জন্য কি ক্যাশ মান আছে?',
      content: [
        ' Some policies accumulate cash value over time. Please share your name, district, mobile number, and email ID in our inbox or at info@shantalife.com or also you can call us on any working day at this number 09610889900, between 10 AM to 6 PM  Our representative will contact you soon.',
      ],
      contentBN: [
        'কিছু পলিসি সময়ের সাথে সাথে ক্যাশ মান জমা করে। দয়া করে আপনার নাম, জেলা, মোবাইল নম্বর এবং ইমেইল আইডি আমাদের ইনবক্সে বা info@shantalife.com এ শেয়ার করুন। এছাড়া, আপনি যেকোনো কর্মদিবসে 09610889900 নম্বরে 10 AM থেকে 6 PM এর মধ্যে আমাদের কল করতে পারেন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
      ],
    },
    {
      value: 'item-8',
      title: 'What are the tax implications of this insurance product?',
      titleBN: 'এই বিমা পণ্যের করের প্রভাব কী?',
      content: [
        "You're eligible for tax rebate as per latest Bangladesh law. Please consult with a tax advisor to learn more.",
      ],
      contentBN: [
        'আপনি সর্বশেষ বাংলাদেশের আইন অনুযায়ী কর ছাড়ের জন্য উপযুক্ত। আরো জানার জন্য দয়া করে একটি ট্যাক্স পরামর্শকের সাথে পরামর্শ করুন।',
      ],
    },
  ],

  insurance: [
    {
      value: 'item-1',
      title:
        'How many dependents can be included as Dependent under Group Medical Insurance Scheme?',
      titleBN:
        'গ্রুপ মেডিকেল ইন্স্যুরেন্স স্কিমে একজন পলিসি হোল্ডারের কতজন নির্ভরশীল (Dependent) অন্তর্ভুক্ত করা যেতে পারে?',
      content: [
        'The spouse and all children up to the age of 25 are considered eligible dependents for the scheme.\nAs per company guideline, maximum 04 children (0-25 yrs) are allowed as dependent.',
      ],
      contentBN: [
        'স্কিমের জন্য যোগ্য নির্ভরশীল হিসেবে স্বামী/স্ত্রী এবং ২৫ বছরের নিচের সকল সন্তানকে বিবেচনা করা হয়।',
        'কোম্পানির নির্দেশনা অনুযায়ী, সর্বোচ্চ ০-২৫ বছরের ৪টি সন্তানকে নির্ভরশীল হিসেবে অন্তর্ভুক্ত করা যেতে পারে।',
      ],
    },
    {
      value: 'item-2',
      title: 'I work for a  company which is operating in Bangladesh. Can I take a group policy ?',
      titleBN: 'আমি কি বাংলাদেশে কার্যরত একটি কোম্পানিতে কাজ করার কারণে গ্রুপ পলিসি নিতে পারি?',
      content: [
        'If you are an employer, you should take a Group Policy. If you would like to discuss this further, please fill out our short contact us form and one of our qualified experts will be happy to contact you to answer any questions you might have.',
      ],
      contentBN: [
        'যদি আপনি একজন নিয়োগকর্তা হন, তাহলে আপনাকে গ্রুপ পলিসি নিতে হবে। যদি আপনি আরও বিস্তারিত আলোচনা করতে চান, দয়া করে আমাদের Contact Us ফর্মটি পূরণ করুন। আমাদের একজন যোগ্য বিশেষজ্ঞ আপনার সঙ্গে যোগাযোগ করে যেকোনো প্রশ্নের উত্তর দিতে আনন্দিত হবেন।',
      ],
    },
  ],
}

const selectorOptions = [
  { key: 'general', label: 'General Query' },
  { key: 'claims', label: 'Claim' },
  { key: 'policy', label: 'New Policy' },
  { key: 'customer', label: 'Customer Care' },
  { key: 'product', label: 'Product' },
  { key: 'insurance', label: 'Group Insurance' },
]

function GeneralFaq({}: Props) {
  const [selectedKey, setSelectedKey] = useState<FaqKey>('general')
  const [showAll, setShowAll] = useState<Record<FaqKey, boolean>>({
    general: false,
    claims: false,
    policy: false,
    customer: false,
    product: false,
    insurance: false,
  })
  const lang = useSSRLanguage()

  const accordionItems = faqData[selectedKey]
  const itemsPerPage = 8
  const hasMoreItems = accordionItems.length > itemsPerPage
  const displayedItems =
    showAll[selectedKey] || !hasMoreItems ? accordionItems : accordionItems.slice(0, itemsPerPage)

  const handleToggle = () => {
    setShowAll((prev) => ({ ...prev, [selectedKey]: !prev[selectedKey] }))
  }

  const handleCategoryChange = (value: FaqKey) => {
    setSelectedKey(value)
    // Reset showAll for the new category if it's not already set
    if (!showAll[value]) {
      setShowAll((prev) => ({ ...prev, [value]: false }))
    }
  }

  return (
    <div
      className="px-5 py-12 
           md:px-24 md:py-[40px] 
           lg:px-[130px]  lg:py-[50px] 
           xl:px-[200px]  xl:py-[70px] 
           2xl:px-[300px] 2xl:py-[100px] bg-[#F6EDDD] "
    >
      <div className="text-[#434343] space-y-8 lg:space-y-12">
        {/* header */}
        {/* <div className="flex items-center justify-between">
          <h3
            className="text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[32px] 
          leading-6 md:leading-7 xl:leading-[35px] 2xl:leading-[45px] 
          uppercase font-semibold lg:font-normal"
          >
            General <span className="text-[#ED7125]">faq</span>
          </h3>
          <div
            onClick={() => window.open('https://www.shantalife.com/support.php')}
            className="flex items-center space-x-4"
          >
            <div className="global-p1 cursor-pointer hover:underline underline-offset-4">
              Download forms
            </div>
            <div className="bg-[#ED7125] p-1 lg:p-1.5 xl:p-2 rounded-sm lg:rounded-md">
              <img
                src="/assets/faqIcon.png"
                alt=""
                className="h-[12px] md:h-[16px] lg:h-[24px] w-[12px] md:w-[16px] lg:w-[24px]"
              />
            </div>
          </div>
        </div> */}

        {/* selector */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="global-h3 font-semibold lg:font-normal">
            <LocalizedText en="I want to learn more about" bn="আমি জানতে চাই" />
          </div>
          <Select
            value={selectedKey}
            onValueChange={(value) => handleCategoryChange(value as FaqKey)}
          >
            <SelectTrigger className="bg-[#FCF4EB] rounded-[6px] p-4 md:p-6 w-[150px] md:w-[260px] lg:w-[300px] xl:w-[460px]">
              <SelectValue placeholder="Select FAQ Topic" />
            </SelectTrigger>
            <SelectContent className="bg-[#FCF4EB] rounded-[6px]">
              {selectorOptions.map(({ key, label }) => (
                <SelectItem key={key} value={key} className="text-[13px] md:text-[15px]">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* faq q/a */}
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {displayedItems.map(({ value, title, titleBN, content, contentBN }, index) => {
            // pick EN content by default, BN when lang==='bn' and BN exists
            const paragraphs =
              lang === 'bn' && Array.isArray(contentBN) && contentBN.length > 0
                ? contentBN
                : content

            return (
              <AccordionItem
                key={value}
                value={value}
                className="bg-[#FCF4EB] px-2 md:px-6 md:py-1 mb-2 rounded-[6px]"
              >
                <AccordionTrigger className="font-semibold hover:no-underline global-p1 !justify-start">
                  <span className="mr-auto text-left flex items-start gap-2 whitespace-normal">
                    <span>{index + 1}.</span>
                    <LocalizedText en={title} bn={titleBN} />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4 text-balance px-2 pb-4 pt-2">
                  {paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-[12px] md:text-[16px]">
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {/* load more/show less btn */}
        {hasMoreItems && (
          <div className="flex justify-center">
            <GlobalButton
              variant="outline"
              text={showAll[selectedKey] ? 'Show less' : 'Load more'}
              onClick={handleToggle}
              className="text-[#3A3A3A] bg-[#F6EDDD] hover:bg-[#F6EEEE]"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneralFaq
