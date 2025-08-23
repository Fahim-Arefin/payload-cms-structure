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
      subtitle: '',
      description: 'Powering your protection starts here.',
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
      },
      {
        // image: '/assets/protection6.png',
        descriptionContent:
          '<b>Step 2:</b></br>Go to the menu “Transfer Fund”. You can save the account details from “Add beneficiary” which will help you to smooth future payments as well. You may choose “One time transfer”, if your banking system have this option on their menu.',
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
      },
      {
        // image: '/assets/protection8.png',
        descriptionContent: `<b>Step 4:</b> Write your full name in “Reference” field`,
      },
      {
        // image: '',
        descriptionContent: `<b>Step 5:</b> Upon successful transaction your payment will be received the following Bank business day.`,
      },
      {
        // image: '',
        descriptionContent: `<b>Step 6:</b> An acknowledgement SMS will be sent to you along with the link to e-receipt.`,
      },
    ],
  }

  const tabItems = [
    {
      value: 'bkash',
      label: 'Bkash',
    },
    {
      value: 'rocket',
      label: 'Rocket',
    },
  ]

  const tabContent = {
    bkash: {
      item: [
        {
          descriptionContent: `<b>Step 1:</b></br> Log into your bKash account.`,
        },
        {
          descriptionContent: `<b>Step 2:</b></br>Go to “Payment” section and write “Shanta Life” or provide number “01332544799” and search.`,
        },
        {
          descriptionContent: `<b>Step 3:</b></br>Write the Payable amount and proceed.`,
        },
        {
          descriptionContent: `<b>Step 4:</b> Write your Policy number or Full name in “Reference” field.`,
        },
        {
          descriptionContent: `<b>Step 5:</b> Enter PIN and Proceed to pay.`,
        },
        {
          descriptionContent: `<b>Step 6:</b> Upon successful transaction an acknowledgement SMS will
        be sent to you along with the link to e-receipt the following
        business day.`,
        },
      ],
    },
    rocket: {
      item: [
        {
          descriptionContent: `<b>Step 1:</b></br>Log into your Rocket account.`,
        },
        {
          descriptionContent: `<b>Step 2:</b></br>Go to “Bill Pay” section and search by “5309”.`,
        },
        {
          descriptionContent: `<b>Step 3:</b></br>Select “Shanta Life Insurance PLC”.`,
        },
        {
          descriptionContent: `<b>Step 4:</b></br>Mention either the policy number or proposal number under the 'Bill No' section.`,
        },
        {
          descriptionContent: `<b>Step 5:</b></br>Write the payable amount and submit.`,
        },
        {
          descriptionContent: `<b>Step 6:</b></br>Upon successful transaction an acknowledgement SMS will be sent to you along with the link to e-receipt the following business day.`,
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
