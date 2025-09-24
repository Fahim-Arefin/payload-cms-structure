import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import BankSection from '@/components/custom/pay-premium/BankSection'
import BkashSection from '@/components/custom/pay-premium/BkashSection'
import DebitSection from '@/components/custom/pay-premium/DebitSection'
import RocketSection from '@/components/custom/pay-premium/RocketSection'
import PaymentTab from '@/components/custom/pay-premium/PaymentTab'

function page() {
  const heroSlides = [
    {
      title: 'Pay Premium',
      titleBN: 'প্রিমিয়াম প্রদান',
      subtitle: '',
      description: 'Powering your protection starts here.',
      descriptionBN: 'আপনার আগামী সুরক্ষিত রাখুন — প্রিমিয়াম পরিশোধ করুন আজই',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/Pay-prem-2.jpg`,
    },
  ]

  const bankData = {
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/paypremium/web/bank_teller.jpg`,
    bgMobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/paypremium/mobile/bank_teller.jpg`,
    item: [
      {
        // image: '/assets/protection5.png',
        descriptionContent: '<b>Step 1:</b></br> Log into your Internet Banking',
        descriptionContentBN: `<b>স্টেপ ১:</b></br> আপনার ইন্টারনেট ব্যাংকিং-এ লগইন করুন`,
      },
      {
        // image: '/assets/protection6.png',
        descriptionContent:
          '<b>Step 2:</b></br>Go to the menu “Transfer Fund”. You can save the account details from “Add beneficiary” which will help you to smooth future payments as well. You may choose “One time transfer”, if your banking system have this option on their menu.',
        descriptionContentBN: `<b>স্টেপ ২:</b></br>
মেন্যু থেকে “ট্রান্সফার ফান্ড” এ যান। ভবিষ্যতে সহজে পরিশোধের জন্য “অ্যাড বেনিফিশিয়ারি” অপশনে শান্তা লাইফ ইন্স্যুরেন্স অ্যাকাউন্টের তথ্য সংরক্ষণ করতে পারবেন। তবে আপনার ব্যাংকিং সিস্টেমের মেন্যুতে যদি “ওয়ান টাইম ট্রান্সফার” অপশন থাকে, আপনি সেটিও বেছে নিতে পারেন।`,
      },
      {
        // image: '/assets/protection7.png',
        descriptionContent: `<b>Step 3:</b></br>Give below details in respective fields of “Beneficiary details” page.</br>
          <ul class="list-disc ml-8">
            <li><b>Beneficiary Name –</b> XXXXX (provide your Policy Number in place of XXXXX)</li>
            <li><b>Bank Account –</b> 2065262900001</li>
            <li><b>Name of Bank –</b> BRAC Bank</li>
            <li><b>Bank Branch –</b> Gulshan Branch</li> 
            <li><b>Routing Number –</b> 060261726</li> 
          </ul>
          `,
        descriptionContentBN: `<b>স্টেপ ৩:</b></br>
            "বেনিফিশিয়ারি ডিটেইলস" এর নির্ধারিত ঘরগুলোতে নিচের তথ্যগুলো দিন –</br>
            <ul class="list-disc ml-8">
            <li><b>বেনিফিশিয়ারির নাম –</b> আপনার পলিসি নম্বর লিখুন</li>
            <li><b>ব্যাংক অ্যাকাউন্ট –</b> ২০৬৫২৬২৯০০০০১</li>
            <li><b>ব্যাংকের নাম –</b> ব্র্যাক ব্যাংক</li>
            <li><b>ব্যাংক শাখা –</b> গুলশান শাখা</li>
            <li><b>রাউটিং নম্বর –</b> ০৬০২৬১৭২৬</li>
            </ul>
            `,
      },
      {
        // image: '/assets/protection8.png',
        descriptionContent: `<b>Step 4:</b> Write your full name in “Reference” field`,
        descriptionContentBN: `<b>স্টেপ ৪:</b>
          “রেফারেন্স” ঘরে আপনার পুরো নাম লিখুন`,
      },
      {
        // image: '',
        descriptionContent: `<b>Step 5:</b> Upon successful transaction your payment will be received the following Bank business day.`,
        descriptionContentBN: `<b>স্টেপ ৫:</b>
          ট্রানজেকশন সফল হলে পরবর্তী ব্যাংক কার্যদিবসে আপনার পেমেন্ট শান্তা লাইফ ইনস্যুরেন্স এর  ব্যাংক অ্যাকাউন্ট এ পৌঁছাবে।`,
      },
      {
        // image: '',
        descriptionContent: `<b>Step 6:</b> An acknowledgement SMS will be sent to you along with the link to e-receipt.`,
        descriptionContentBN: `<b>স্টেপ ৬:</b>
          প্রিমিয়াম প্রাপ্তির পর ই- রিসিট এর লিঙ্ক সহ একটি প্রাপ্তি স্বীকার এসএমএস শান্তা লাইফ এ রেজিস্টার্ড মোবাইল নম্বরে পাঠানো হবে।`,
      },
    ],
  }

  const tabItems = [
    {
      value: 'bkash',
      label: 'Bkash',
      labelBN: 'বিকাশ',
    },
    {
      value: 'rocket',
      label: 'Rocket',
      labelBN: 'রকেট',
    },
  ]

  const tabContent = {
    bkash: {
      item: [
        {
          descriptionContent: `<b>Step 1:</b></br> Log into your bKash account.`,
          descriptionBN: `<b>স্টেপ ১:</b></br> বিকাশ অ্যাপ এর পেমেন্ট অপশনে যান।`,
        },
        {
          descriptionContent: `<b>Step 2:</b></br>Go to “Payment” section and write “Shanta Life” or provide number “01332544799” and search.`,
          descriptionBN: `<b>স্টেপ ২:</b></br>
            সার্চ বার এ “Shanta Life Insurance PLC” লিখুন কিংবা মার্চেন্ট নম্বর ০১৩৩২৫৪৪৭৯৯ লিখে সার্চ করুন।`,
        },
        {
          descriptionContent: `<b>Step 3:</b></br>Write the Payable amount and proceed.`,
          descriptionBN: `<b>স্টেপ ৩:</b></br>প্রিমিয়াম অ্যামাউন্ট দিয়ে সাবমিট করুন।`,
        },
        {
          descriptionContent: `<b>Step 4:</b></br> Write your Policy number or Full name in “Reference” field.`,
          descriptionBN: `<b>স্টেপ ৪:</b></br>
            “রেফারেন্স” এর ফিল্ডে আপনার পলিসি নম্বর কিংবা পুরো নাম লিখুন এবং বিকাশ পিন দিন।`,
        },
        {
          descriptionContent: `<b>Step 5:</b></br> Enter PIN and Proceed to pay.`,
          descriptionBN: `<b>স্টেপ ৫:</b></br>
          প্রেস এন্ড হোল্ড করে পেমেন্ট সফল করুন।`,
        },
        {
          descriptionContent: `<b>Step 6:</b></br> Upon successful transaction an acknowledgement SMS will
        be sent to you along with the link to e-receipt the following
        business day.`,
          descriptionBN: `<b>স্টেপ ৬:</b></br>
          সফল লেনদেন এর বিবরণ দেখুন। প্রিমিয়াম প্রাপ্তির পর ই- রিসিট এর লিঙ্ক সহ একটি প্রাপ্তি স্বীকার এসএমএস শান্তা লাইফ এ রেজিস্টার্ড মোবাইল নম্বরে পাঠানো হবে।`,
        },
      ],
    },
    rocket: {
      item: [
        {
          descriptionContent: `<b>Step 1:</b></br>Log into your Rocket account.`,
          descriptionBN: `<b>স্টেপ ১:</b></br>
          রকেট অ্যাপের বিল পরিশোধ অপশনে যান।`,
        },
        {
          descriptionContent: `<b>Step 2:</b></br>Go to “Bill Pay” section and search by “5309”.`,
          descriptionBN: `<b>স্টেপ ২:</b></br>
            সিলেক্ট বিলার এর সার্চ বার এ ৫৩০৯ টাইপ করুন এবং শান্তা লাইফ ইনস্যুরেন্স পিএলসি – এ টাইপ করুন। `,
        },
        {
          descriptionContent: `<b>Step 3:</b></br>Select “Shanta Life Insurance PLC”.`,
          descriptionBN: `<b>স্টেপ ৩:</b></br> শান্তা লাইফ ইনস্যুরেন্স পিএলসি – সিলেক্ট করুন। `,
        },
        {
          descriptionContent: `<b>Step 4:</b></br>Mention either the policy number or proposal number under the 'Bill No' section.`,
          descriptionBN: `<b>স্টেপ ৪:</b></br> 
          বিল নম্বরে পলিসি নম্বর দিন `,
        },
        {
          descriptionContent: `<b>Step 5:</b></br>Write the payable amount and submit.`,
          descriptionBN: `<b>স্টেপ ৫:</b></br> টাকার পরিমাণ এ প্রিমিয়াম এর পরিমাণ লিখে সাবমিট করুন।`,
        },
        {
          descriptionContent: `<b>Step 6:</b></br>Upon successful transaction an acknowledgement SMS will be sent to you along with the link to e-receipt the following business day.`,
          descriptionBN: `<b>স্টেপ ৬:</b></br> সফল লেনদেন এর বিবরণ দেখুন। প্রিমিয়াম প্রাপ্তির পর ই- রিসিট 
          এর লিঙ্ক সহ একটি প্রাপ্তি স্বীকার এসএমএস শান্তা লাইফ এ রেজিস্টার্ড মোবাইল নম্বরে পাঠানো হবে।`,
        },
      ],
    },
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/paypremium/mobile/bkash-roket.png`,
    mobileImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/paypremium/mobile/bkash-roket.png`,
  }

  const debitData = {
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/paypremium/web/eft-payment_1.jpg`,
    // bgMobileImage: '/assets/paypremium/mobile/eft-payment_1.jpg',
    content: `You can conveniently pay your premium using EFT (Electronic Funds Transfer) Debit Authorization. 
    This secure and efficient method ensures that the premium amount is automatically debited from your designated bank account on the due date, 
    eliminating the risk of missed payments and keeping your policy active without any hassle. 
    By choosing EFT, you save time and effort, avoiding manual payments or late fees. 
    To activate this service, simply complete the EFT Debit Authorization form and submit it to us with the required bank details. 
    Stay worry-free about missing your premium deadlines!`,
    contentBN: `আপনি সহজেই ইএফটি (ইলেকট্রনিক ফান্ড ট্রান্সফার) ডেবিট অনুমোদনের মাধ্যমে আপনার প্রিমিয়াম পরিশোধ করতে পারেন। 
                এই নিরাপদ ও কার্যকর পদ্ধতিতে নির্ধারিত তারিখে আপনার মনোনীত ব্যাংক অ্যাকাউন্ট থেকে প্রিমিয়ামের টাকা স্বয়ংক্রিয়ভাবে কেটে নেওয়া হয়, 
                ফলে প্রিমিয়াম মিস হওয়ার ঝুঁকি থাকে না এবং কোনো ঝামেলা ছাড়াই আপনার পলিসি সক্রিয় থাকে। ইএফটি বেছে নেওয়ার মাধ্যমে আপনি সময় ও 
                পরিশ্রম দুটোই সাশ্রয় করতে পারবেন। আর প্রিমিয়াম জমা দেওয়ার তারিখ নিয়ে দুশ্চিন্তায় থাকতে হবে না!
                এই সেবা সক্রিয় করতে, শুধু ইএফটি ডেবিট অনুমোদন ফর্ম পূরণ করে প্রয়োজনীয় ব্যাংক তথ্যসহ আমাদের কাছে জমা দিন। কিংবা মাই পোর্টাল এ 
                লগইন করে সার্ভিস অপশনে গিয়ে খুব সহজে ইএফটি এর অনলাইন আবেদন করুন`,
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        top=" top-[200px] md:top-[250px] lg:top-[43%]"
        position="[object-position:40%_50px] md:[object-position:50%_-50%] lg:[object-position:50%_-20%] xl:[object-position:50%_5%] 2xl:[object-position:50%_-10%]"
      />
      <BankSection align="right" data={bankData} />
      {/* <BkashSection align="left" bgColor="#FCF4EB" data={bkashData} />
      <RocketSection align="left" bgColor="#FCF4EB" data={rocketData} /> */}
      <PaymentTab config={tabItems} data={tabContent} />
      <DebitSection align="right" data={debitData} />
      <ContactUsSection />
    </div>
  )
}

export default page
