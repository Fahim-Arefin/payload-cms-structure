import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
// import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
// import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'
import BankSection from '@/components/custom/pay-premium/BankSection'
import BkashSection from '@/components/custom/pay-premium/BkashSection'
import DebitSection from '@/components/custom/pay-premium/DebitSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'Pay Premium',
      subtitle: '',
      description: '',
      image: '/assets/pay-premium-2.jpg',
    },
  ]

  // const planInfoData = {
  //   image: '/assets/planInfo5.svg',
  //   description:
  //     'Health struggles can come with financial struggles too—making recovery even harder. From rising medical bills to daily expenses, the burden can feel overwhelming. With Shanta Life’s Critical Protection Riders, you get financial security when you need it most—covering up to 25 major illnesses, depending on your plan.',
  // }

  // const offersData = [
  //   {
  //     image: '/assets/offer9.png',
  //     bgImage: '/assets/offerbg9.jpg',
  //     title: 'Living Benefit',
  //     description: 'Helping with treatment costs so you can focus on recovery.',
  //   },
  //   {
  //     image: '/assets/offer10.png',
  //     bgImage: '/assets/offerbg10.jpg',
  //     title: 'Affordable Premium',
  //     description: 'Security for you and your family in case of lifelong disability.',
  //   },
  //   {
  //     image: '/assets/offer11.png',
  //     bgImage: '/assets/offerbg11.jpg',
  //     title: 'One-Time Payout',
  //     description: 'Financial support if an accident limits your abilities.',
  //   },
  //   {
  //     image: '/assets/offer12.png',
  //     bgImage: '/assets/offerbg12.jpg',
  //     title: 'Protection Against 25+ Critical Illnesses',
  //     description:
  //       'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
  //   },
  //   {
  //     image: '/assets/offer9.png',
  //     bgImage: '/assets/offerbg9.jpg',
  //     title: 'Living Benefit',
  //     description: 'Helping with treatment costs so you can focus on recovery.',
  //   },
  //   {
  //     image: '/assets/offer10.png',
  //     bgImage: '/assets/offerbg10.jpg',
  //     title: 'Affordable Premium',
  //     description: 'Security for you and your family in case of lifelong disability.',
  //   },
  //   {
  //     image: '/assets/offer11.png',
  //     bgImage: '/assets/offerbg11.jpg',
  //     title: 'One-Time Payout',
  //     description: 'Financial support if an accident limits your abilities.',
  //   },
  //   {
  //     image: '/assets/offer12.png',
  //     bgImage: '/assets/offerbg12.jpg',
  //     title: 'Protection Against 25+ Critical Illnesses',
  //     description:
  //       'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
  //   },
  // ]

  const bkashData = {
    bgImage: '/assets/bkash-4.png',
    item: [
      {
        // image: '/assets/protection5.png',
        descriptionContent: `<b>Step 1:</b></br> Log into your bKash account.`,
      },
      {
        // image: '/assets/protection6.png',
        descriptionContent: `<b>Step 2:</b></br>Go to “Payment” section and write “Shanta Life” or provide number “01332544799” and search.`,
      },
      {
        descriptionContent: `<b>Step 3:</b></br>Write the Payable amount and proceed.`,
      },
      {
        // image: '/assets/protection8.png',
        descriptionContent: `<b>Step 4:</b> Write your full name in “Reference” field.`,
      },
      {
        // image: '',
        descriptionContent: `<b>Step 5:</b> Enter PIN and Proceed to pay.`,
      },
      {
        // image: '',
        descriptionContent: `<b>Step 6:</b>: Upon successful transaction an acknowledgement SMS will
        be sent to you along with the link to e-receipt the following
        business day.`,
      },
    ],
  }
  const bankData = {
    bgImage: '/assets/bank.jpg',
    item: [
      {
        image: '/assets/protection5.png',
        descriptionContent:
          '<b>Step 1:</b></br> Covers Diagnoses / Surgery for 10 Minor illnesses & 15 Major illnesses',
      },
      {
        image: '/assets/protection6.png',
        descriptionContent:
          '<b>Step 2:</b></br>Go to the menu “Transfer Fund”. You can save the account details from “Add beneficiary” which will help you to smooth future payments as well. You may choose “One time transfer”, if your banking system have this option on their menu.',
      },
      {
        image: '/assets/protection7.png',
        descriptionContent: `<b>Step 3:</b></br>Give below details in respective fields of “Beneficiary details” page.</br>
          <ul class="list-disc ml-8">
            <li><b>Beneficiary Name –</b>SLI XXXXX (provide your Policy Number in place of XXXXX)</li>
            <li><b>Bank Account –</b>2065262900001</li>
            <li><b>Name of Bank –</b> BRAC Bank</li>
            <li><b>Bank Branch –</b>Gulshan Branch</li> 
            <li><b>Routing Number –</b>060261726</li> 
          </ul>
          `,
      },
      {
        image: '/assets/protection8.png',
        descriptionContent: `<b>Step 4:</b> Write your full name in “Reference” field`,
      },
      {
        image: '',
        descriptionContent: `<b>Step 5:</b> Upon successful transaction your payment will be received the following Bank business day.`,
      },
      {
        image: '',
        descriptionContent: `<b>Step 6:</b>: An acknowledgement SMS will be sent to you along with the link to e-receipt.`,
      },
    ],
  }
  const debitData = {
    bgImage: '/assets/debit.jpg',
    content: `You can conveniently pay your premium using EFT (Electronic Funds Transfer) Debit Authorization. 
    This secure and efficient method ensures that the premium amount is automatically debited from your designated bank account on the due date, 
    eliminating the risk of missed payments and keeping your policy active without any hassle. 
    By choosing EFT, you save time and effort, avoiding manual payments or late fees. 
    To activate this service, simply complete the EFT Debit Authorization form and submit it to us with the required bank details. 
    Stay worry-free about missing your premium deadlines!`,
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[480px] xl:h-[500px] 2xl:h-[578px] "
        top=" top-[150px] md:top-[200px] lg:top-[63%]"
      />
      {/* <PlanInfoSection data={planInfoData} /> */}
      {/* <OffersClientWrapper
        data={offersData}
        subheading="Four types of protection to keep you and your loved ones financially secure"
        card={2}
      /> */}
      <BankSection align="right" data={bankData} />
      <BkashSection align="left" bgColor="#FCF4EB" data={bkashData} />
      <DebitSection align="right" data={debitData} />
      <ContactUsSection />
    </div>
  )
}

export default page
