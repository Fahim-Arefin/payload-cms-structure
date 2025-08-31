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

type Props = {}

type AccordionItemType = {
  value: string
  title: string
  content: string[]
}

type FaqKey = 'product' | 'claims' | 'general' | 'policy' | 'customer' | 'insurance'

const faqData: Record<FaqKey, AccordionItemType[]> = {
  general: [
    {
      value: 'item-1',
      title: 'What is Risk?',
      content: [
        'Risk is the possibility of an unfortunate event and the uncertainty of loss.',
        'In insurance, risk is the uncertainty that an event causing economic loss will occur.',
      ],
    },
    {
      value: 'item-2',
      title: 'What is Insurance?',
      content: [
        'An arrangement where an insurer provides protection against specified losses to an insured in exchange for premiums.',
        'The insurer agrees to compensate the insured for covered losses as per the policy terms.',
      ],
    },
    {
      value: 'item-3',
      title: 'What is Life Insurance?',
      content: [
        'A contract where, in return for a premium, the insurer pays a sum of money on the insured’s death or after a fixed period.',
        'Used to secure family income, liabilities, and long-term goals.',
      ],
    },
    {
      value: 'item-4',
      title: 'What is Reinsurance?',
      content: [
        'Insurance purchased by an insurance company (cedant) from another insurer (reinsurer) to manage its own risk.',
        'Helps spread large losses and stabilise the primary insurer’s results.',
      ],
    },
    {
      value: 'item-5',
      title: 'Why do I need life insurance — why now?',
      content: [
        'It protects your dependents by covering ongoing expenses, debts, and goals (e.g., education) if something happens to you.',
        'Premiums are typically lower when you are younger and healthier, so buying now can lock in better rates.',
      ],
    },
    {
      value: 'item-6',
      title: 'I want to take out a life insurance policy — where do I begin?',
      content: [
        'Contact us at XXXXXXXXXXXX or email info@shantalife.com; we’ll discuss your needs and recommend a suitable plan.',
        'You can also request a quote via our website or meet an advisor to compare options.',
      ],
    },
    {
      value: 'item-7',
      title: 'How should I choose an insurance company?',
      content: [
        'Assess financial strength and reputation, including solvency and claims track record.',
        'Ensure product fit (coverage, riders, terms) and look for responsive, efficient, and transparent customer service.',
      ],
    },
  ],
  claims: [
    {
      value: 'item-1',
      title: 'What documents are required to submit along with Out Patient Treatment Claim?',
      content: [
        'Download the “Health Insurance Claim Form” from the Support section of the menu.',
        'Original money receipt showing the attending physician’s detailed charges with seal, signature, and date.',
        'Photocopy of the physician’s prescription.',
        'Original itemized pharmacy bill with date of purchase, patient’s name, quantity, and drug name (must match the prescription).',
        'Original receipts for each laboratory test/other examinations, supported by the physician’s written request.',
        'Photocopies of the reports of examinations undertaken.',
      ],
    },
    {
      value: 'item-2',
      title: 'What documents are required to submit along with In Patient Treatment Claim?',
      content: [
        'Download the “Health Insurance Claim Form” from the Support section of the menu.',
        'Copy of physician’s prescription/advice regarding hospitalization.',
        'Itemized original hospital bill supported by the official receipt for the total amount paid.',
        'Original receipt showing attending physician’s/surgeon’s charges with stamp and signature.',
        'Photocopy of detailed hospital discharge certificate and other treatment documents.',
      ],
    },
    {
      value: 'item-3',
      title: 'How can I get my final benefit once the policy reaches its maturity date?',
      content: [
        'You will be notified via SMS and email (if available) when the policy matures.',
        'Submit the following documents to receive maturity benefit:',
        '(a) Original Policy Document.',
        '(b) Duly signed Release Voucher by the Policy Owner.',
        '(c) Photocopy of NID/Passport (must match Shanta Life’s records).',
        '(d) Photocopy of a cheque leaf (for bank details).',
      ],
    },
    {
      value: 'item-4',
      title: 'What is a Release Voucher and how to get it?',
      content: [
        'A Release Voucher is issued by Head Office mentioning the maturity value.',
        'It will be couriered to your correspondence address and emailed (if available) as per records with Shanta Life.',
      ],
    },
    {
      value: 'item-5',
      title: 'If I lost the Policy document, how can I claim maturity benefit?',
      content: [
        'Submit the following documents:',
        '(1) Application regarding loss of document signed by the Policy Owner.',
        '(2) Copy of GD (General Diary) registered at your Police Station.',
        '(3) Copy of any old premium receipt.',
        '(4) Duly signed Release Voucher.',
        'After receipt of the above, payment will be made to your bank account following a 30-day observation period.',
      ],
    },
    {
      value: 'item-6',
      title: 'What are the documents of a Death Claim?',
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
    },
    {
      value: 'item-7',
      title:
        'Can the policyholder request payment to a different bank account? What documents are required?',
      content: [
        'Shanta Life encourages payment to the policy owner’s own bank account.',
        'In special cases, payment to a different account may be considered at company discretion, upon submission of:',
        '(a) Recipient’s NID and contact number.',
        '(b) Proof of relationship.',
      ],
    },
    {
      value: 'item-8',
      title:
        'Is it possible to consolidate medical costs related to more than one health problem in one claim form?',
      content: [
        'Yes. You may file one claim covering multiple health issues.',
        'Ensure all required details and documents for each cost are provided so the correct amounts are processed.',
        'Note: Group and Individual policy claims cannot be submitted together in one form.',
      ],
    },
    {
      value: 'item-9',
      title: 'Are pre-existing conditions covered?',
      content: [
        'Generally, pre-existing conditions are not covered, similar to most insurers’ practices.',
        'Please contact our insurance experts to discuss your individual case and available options.',
      ],
    },
  ],

  policy: [
    {
      value: 'item-1',
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
    },
    {
      value: 'item-2',
      title: 'What is an Additional Premium for Occupational Risk (Occupation Extra Premium)?',
      content: [
        'An extra premium applied when a proposal involves a high-risk occupation.',
        'This additional charge compensates for higher risk associated with the insured’s job.',
      ],
    },
    {
      value: 'item-3',
      title: "Is it necessary for a housewife to provide her husband's details?",
      content: [
        'Not mandatory.',
        'However, providing the husband’s details in the application form is encouraged to help assess the proposal more accurately and easily.',
      ],
    },
    {
      value: 'item-4',
      title: 'In what frequency can I pay my premiums?',
      content: [
        'Available modes depend on policy type: quarterly, semi-annually, or annually.',
        'Monthly payments are available for DPS policies.',
        'Some policies allow a one-off “single premium” payment.',
        'The initial (first) premium must be paid in advance along with the Proposal Form.',
      ],
    },
  ],
  customer: [
    {
      value: 'item-1',
      title: "What are the media's you will use to connect with me?",
      content: [
        'While purchasing the Policy, we will capture your Correspondence address, mobile number, and email ID. All communications related to your Policy i.e., Reminder of Premium or any other payments related to Policy, Notifications on Maturity or Partial Maturity, Receipts generated against Payments made to Shanta Life Policy etc. shall be sent via email, SMS and letter. Therefore, it is required to keep your data updated at our end.',
      ],
    },
    {
      value: 'item-2',
      title: 'How can I update my information',
      content: [
        'Kindly download the "Personal information change or correction" form which is available in our "Support" section. Duly complete the form, submit documents as mentioned in the second page of the form and send to our head office. You may wish to send us the scanned copy to customer.services@shantalife.com from your registered email.',
      ],
    },
    {
      value: 'item-3',
      title: 'How can I Reinstate my Policy, if it lapses?',
      content: [
        'Kindly submit the duly completed "Change or correction in Policy Details" form and submit along with documents as referred in "Reinstatement Requirements Table".',
        'If the Policy was lapsed for less than 06 months, duly completed "Good Health Declaration (GHD)" (download from Support menu bar) is required only. All insured and payor (if any) must submit separate GHD.',
        'Lapsed for more than 06 months will submit requirements as mentioned in Reinstatement Requirement Table.',
        'You may contact us or your customer service representative to know more in details.',
      ],
    },
    {
      value: 'item-4',
      title: 'What is the procedure to apply for a duplicate document, if the original is lost?',
      content: [
        'Kindly submit the duly completed "Change in Policy Details" form along with below mentioned documents -',
        "a. Copy of GD with Policyowner's signature;",
        'b. One copy Passport Size photo attested by Policy Owner;',
        'c. Any of Previous money receipt;',
        'd. A copy of NID/ Passport (must for remittance earner)/Birth Certificate attested by Policy Owner;',
        'e. A money receipt of 100 Taka paid to Shanta Life (by MFS or Online Payment) for duplicate document issuance.',
      ],
    },
    {
      value: 'item-5',
      title: 'How to apply for a Loan against Policy?',
      content: [
        "Policy Loan: When the surrender value of a policy is acquired and the policy is active, the policyholder may obtain a loan by pledging the policy as collateral, subject to the company's prevailing regulations.",
        'Kindly download the "Loan request form" from Support section and submit the duly completed form along with main Policy document, a copy of NID and MICR cheque leaf.',
      ],
    },
    {
      value: 'item-6',
      title: 'How can I change coverage amount of my Policy?',
      content: [
        '> Request to change coverage amount must be submitted within 06 months from Policy inception.',
        '> To increase the amount: Kindly submit the "Good health declaration" and medical requirements as per "Underwriting Requirement Table"',
        '> To decrease the amount: the change shall take effect on Policy Issue date or next Premium due date.',
      ],
    },
    {
      value: 'item-7',
      title: 'Can I change the Mode of Payment?',
      content: [
        'Yes, you can change the mode of payment by paying newly calculated Premium. Any changes shall take effect on next Policy Annivesary Date.',
      ],
    },
    {
      value: 'item-8',
      title: 'Can I add or cancel a Supplementary Rider to my Policy any time?',
      content: [
        '> To add a new Rider: Kindly submit the "Good health declaration" and medical requirements as per "Underwriting Requirement Table"',
        '> To cancel a Rider: The change shall take effect on next Premium due date.',
      ],
    },
    {
      value: 'item-9',
      title: 'How can I apply for Change in my Policy Term?',
      content: [
        'To increase the term of the Policy, kindly submit "Good Health Declaration" and a separate application writing the reason of change, in details.',
        'To decrease the term of the Policy, kindly pay the extra premium along with interest and the change will take effect from next Policy Issue Date.',
        'Term change request can be submitted once in policy life cycle and it shall take effect from the next anniversary date.',
      ],
    },
    {
      value: 'item-10',
      title: 'How can I Change my beneficiary?',
      content: [
        '1. 01 PP size photograph signed by the new beneficiary and attested by Insured/Policy Owner.',
        '2. A copy of National ID/ Birth Registration / Passport (mandatory for remittance earner) of the new beneficiary attested by the insured / Policy Owner.',
        '3. A photocopy of Marriage certificate/ Birth Certificate / Citizenship (if applicable)',
        '4. The beneficiary must have insurable interest on the life of the Policy Owner.',
        '5. If the beneficiary is not of legal age, name of a legal guardian is necessary.',
        'Moreover, the proposed new beneficiary must be acceptable by the company.',
      ],
    },
    {
      value: 'item-11',
      title: 'How can I make payments against Policy?',
      content: [
        'You can make payment by using any one of the below method:',
        '1. EFT Debit: Kindly submit the duly completed EFT Debit Authorization Form along with a copy of a cheque leaf. We shall send the due premium advice to your bank at your prescribed date;',
        '2. bKash: If you have a bKash wallet, you pay premium by using "Make Payment" section.',
        '3. Transfer through online banking. Please refer to "Pay Premium" Section.',
      ],
    },
  ],
  product: [
    {
      value: 'item-1',
      title: 'What is Rider / Supplementary Rider?',
      content: [
        'For enhanced protection or security, a supplementary agreement added to the primary life insurance policy for a small additional premium is known as a Rider or Supplementary Insurance. During the term of the policy, the Rider/Supplementary Insurance provides only insurance protection and does not offer any maturity or return benefit at the end of the term.',
      ],
    },
    {
      value: 'item-2',
      title: 'What is Automatic Premium Loan (APL) ?',
      content: [
        `Automatic Premium Loan (APL) helps the policyholder to keep his/her policy active and enjoy the insurance coverage in case of missed premium payment within the Grace Period (31 days from premium payment due date).
The premium is automatically paid from the Cash Value (if available) of the policy when APL occurs. APL will continue until the Cash value is sufficient to deduct the outstanding premium. Interest will be charged from the day the Policy runs with APL.`,
      ],
    },
  ],
  insurance: [
    {
      value: 'item-1',
      title:
        'How many dependents can be included as Dependent under Group Medical Insurance Scheme?',
      content: [
        'The spouse and all children up to the age of 25 are considered eligible dependents for the scheme.\nAs per company guideline, maximum 04 children (0-25 yrs) are allowed as dependent.',
      ],
    },
    {
      value: 'item-2',
      title: 'I work for a  company which is operating in Bangladesh. Can I take a group policy ?',
      content: [
        'If you are an employer, you should take a Group Policy. If you would like to discuss this further, please fill out our short contact us form and one of our qualified experts will be happy to contact you to answer any questions you might have.',
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

  const accordionItems = faqData[selectedKey]

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
          <div className="global-h3 font-semibold lg:font-normal">I want to learn more about</div>
          <Select value={selectedKey} onValueChange={(value) => setSelectedKey(value as FaqKey)}>
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
          {accordionItems.map(({ value, title, content }, index) => (
            <AccordionItem
              key={value}
              value={value}
              className="bg-[#FCF4EB] px-2 md:px-6 md:py-1 mb-2 rounded-[6px]"
            >
              <AccordionTrigger className="font-semibold hover:no-underline global-p1">
                {index + 1}. {title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance px-2 pb-4 pt-2">
                {content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[12px] md:text-[16px]">
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* load more btn */}
        <div className="flex justify-center ">
          <ToolTip>
            <GlobalButton
              variant="outline"
              text="Load more"
              className=" text-[#3A3A3A] bg-[#F6EDDD] hover:bg-[#F6EEEE] cursor-not-allowed"
            />
          </ToolTip>
        </div>
      </div>
    </div>
  )
}

export default GeneralFaq
