// 'use client'

// import React, { useState } from 'react'
// import PremiumBreakdown from '../premium-calculator/PremiumBreakdown'
// import CalculateForm from '../premium-calculator/CalculateForm'
// import PurchaseForm from './PurchaseForm'
// import PurchaseCardSection from './PurchaseCardSection'
// import { ApiResponse, ApiResToShow, getTotalPremium } from '@/utils/premiumCalculator'
// import AnimatedCounter from '@/components/ui/AnimatedCounter'
// import PurchaseCalculateSection from './PurchaseCalculateSection'
// import PlanDetailsSection from './PlanDetailsSection'
// import LocalizedText from '../shared/LocalizedText'
// import LocalizedHighlighted from '../shared/LocalizedHighlighted'
// import LocalizedRichText from '../shared/LocalizedRichText'
// import { PurchasePageBlockType } from '@/types/payloadCustomTypes'

// type Props = {
//   block: PurchasePageBlockType
// }

// interface FormData {
//   PlanCode: number
//   Age: number
//   PaymentMode: number
//   Gender: number | null
//   phoneNumber: string
//   name: string
//   email: string
//   city: string
//   occupation: string
// }

// // ✅ Your plans list (restored)
// const plans = [
//   {
//     text: 'Shanta Child Education Plan',
//     videoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
//     code: 1,
//   },
//   {
//     text: 'Shanta Endowment Plan',
//     videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
//     code: 2,
//   },
//   {
//     text: 'Shanta 3 Stage Plan',
//     videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//     code: 3,
//   },
//   {
//     text: 'Shanta 4 Stage Plan',
//     videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//     code: 4,
//   },
//   // {
//   //   text: 'Multi Stage Maturity Plan',
//   //   videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//   //   code: 5,
//   // },
// ]

// const PurchaseSection = ({ block }: Props) => {
//   const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
//   const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
//   const [selectedPlanName, setSelectedPlanName] = useState<string>('')
//   const [selectedPlanCode, setSelectedPlanCode] = useState<number>(0)
//   const [formData, setFormData] = useState<FormData>({
//     PlanCode: 0,
//     Age: 0,
//     PaymentMode: 0,
//     Gender: null,
//     phoneNumber: '',
//     name: '',
//     email: '',
//     city: '',
//     occupation: '',
//   })
//   const [calculatedPlanCode, setCalculatedPlanCode] = useState<number | null>(null)

//   const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
//     setApiResponse(response)
//     setConfirmedPaymentMode(paymentMode)
//     setCalculatedPlanCode(formData.PlanCode)
//     if (planName) setSelectedPlanName(planName)
//   }

//   // Map plan names to PlanDetailsSection expected codes
//   const getPlanDetailsCode = (planName?: string): number => {
//     const planNameToCode: { [key: string]: number } = {
//       'Shanta Child Education Plan (3%)': 1,
//       'Shanta Endowment Plan': 2,
//       'Shanta 3 Stage Plan': 3,
//       'Shanta 4 Stage Plan': 4,
//     }

//     if (selectedPlanName && planNameToCode[selectedPlanName]) {
//       return planNameToCode[selectedPlanName]
//     }
//     if (planName && planNameToCode[planName]) {
//       return planNameToCode[planName]
//     }

//     if (selectedPlanName) {
//       if (selectedPlanName.includes('Child Education')) return 1
//       if (selectedPlanName.includes('Endowment')) return 2
//       if (selectedPlanName.includes('3 Stage')) return 3
//       if (selectedPlanName.includes('4 Stage')) return 4
//     }

//     return 1 // default fallback
//   }

//   // NOTE: Per your instruction — we will only USE `block` data inside the main grid (left side fallback).
//   const schemaCards = Array.isArray(block?.cards) ? block.cards.slice(0, 4) : []

//   return (
//     <div
//       className="px-5 pt-12 py-4
//            md:px-24 md:pt-24
//            lg:px-[130px]  lg:pt-[110px]
//            xl:px-[200px]  xl:pt-[100px]
//            2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
//     >
//       {/* ======= MAIN GRID (block data ONLY used inside this area) ======= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
//         {/* left side box */}
//         <div className=" w-full order-2 lg:order-1">
//           {apiResponse ? (
//             <div>
//               <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
//               <PurchaseCalculateSection
//                 confirmedPaymentMode={confirmedPaymentMode}
//                 getTotalPremium={getTotalPremium}
//                 apiResponse={apiResponse}
//               />
//             </div>
//           ) : selectedPlanCode > 0 ? (
//             <div>
//               <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
//             </div>
//           ) : schemaCards.length > 0 ? (
//             // ✅ Use schema cards ONLY here (inside main grid left column)
//             <div className="mt-0 space-y-0">
//               {schemaCards.map((c, idx) => {
//                 const bg =
//                   c.cardBg || (idx === 0 ? '#9C863940' : idx === 1 ? '#ccbf95' : '#9C8639B2')
//                 const color = idx === 1 ? '#ffffff' : '#3A3A3C'
//                 const titleColor = color
//                 const descColor = color
//                 const rounded =
//                   idx === 0
//                     ? 'rounded-t-xl'
//                     : idx === schemaCards.length - 1
//                       ? 'rounded-b-xl'
//                       : 'rounded-none'

//                 return (
//                   <div
//                     key={idx}
//                     className={`${rounded} px-6 md:px-10 py-4 ${idx === 0 ? 'pt-6 md:pt-10' : ''}`}
//                     style={{ backgroundColor: bg }}
//                   >
//                     {(c.cardText || c.cardTextBN) && (
//                       <h4 className="global-p1 font-semibold mb-1" style={{ color: titleColor }}>
//                         <LocalizedText en={c.cardText ?? ''} bn={c.cardTextBN ?? ''} />
//                       </h4>
//                     )}

//                     <div className="global-p2 font-light" style={{ color: descColor }}>
//                       <LocalizedRichText en={c.cardDesc} bn={c.cardDescBN} />
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           ) : (
//             // Fallback demo (only if schema has no cards and nothing selected/calculated)
//             <div>
//               <div className="px-6 pt-6 md:px-10 md:pt-10 pb-4 rounded-t-xl bg-[#9C863940]">
//                 <h4 className="global-p1 font-semibold text-[#3A3A3C] mb-1">
//                   <LocalizedText en={`For their future`} bn={`তাদের ভবিষ্যতের জন্য`} />
//                 </h4>
//                 <p className="global-p2 text-[#3A3A3C]">
//                   <LocalizedText
//                     en={`Secure your child’s future with a plan that covers both education costs and life
//                   protection—because dreams deserve a safety net.`}
//                     bn={`আপনার সন্তানের ভবিষ্যৎ সুরক্ষিত করুন এমন এক পরিকল্পনায়, যা শিক্ষা ব্যয় ও জীবন সুরক্ষা দুটোই কভার করে।`}
//                   />
//                 </p>
//               </div>

//               <div className="bg-[#ccbf95] px-6 md:px-10 py-4 ">
//                 <h4 className="global-p1 font-bold text-[#fff] mb-1">
//                   <LocalizedText en={`For your growth`} bn={`আপনার উন্নতির জন্য`} />
//                 </h4>
//                 <p className="global-p2 font-light text-[#fff]">
//                   <LocalizedText
//                     en={`Build wealth with guaranteed returns and built-in life insurance`}
//                     bn={`নিশ্চিত অর্থপ্রাপ্তি ও জীবন বীমার মাধ্যমে গড়ে তুলুন সম্পদ।`}
//                   />
//                 </p>
//               </div>

//               <div className="bg-[#9C8639B2] rounded-b-xl px-6 md:px-10 py-4">
//                 <h4 className="global-p1 font-bold text-[#fff] mb-1">
//                   <LocalizedText
//                     en={`When life throws you a curveball`}
//                     bn={`যখন জীবন হঠাৎ আঘাত হানে`}
//                   />
//                 </h4>
//                 <p className="global-p2 font-light text-[#fff]">
//                   <LocalizedText
//                     en={`Because we want you to focus on your recovery.`}
//                     bn={`আমরা চাই আপনি যেন শুধু সুস্থ হয়ে ওঠার দিকেই মনোযোগ দিন।`}
//                   />
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* right form */}
//         <div className="order-1 lg:order-2">
//           <PurchaseForm
//             formData={formData}
//             setFormData={setFormData}
//             onPlanSelect={(planCode: number, planName: string) => {
//               setSelectedPlanCode(planCode)
//               setSelectedPlanName(planName)
//             }}
//             consentEn={block?.purchaseNowForm?.consentText}
//             consentBn={block?.purchaseNowForm?.consentTextBN}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PurchaseSection

// ========================================================================
// ========================================================================
// ========================================================================
'use client'

import { PurchasePageBlockType } from '@/types/payloadCustomTypes'
import { ApiResponse, getTotalPremium } from '@/utils/premiumCalculator'
import { useState } from 'react'
import LocalizedRichText from '../shared/LocalizedRichText'
import LocalizedText from '../shared/LocalizedText'
import PlanDetailsSection from './PlanDetailsSection'
import PurchaseCalculateSection from './PurchaseCalculateSection'
import PurchaseForm from './PurchaseForm'

type Props = {
  block: PurchasePageBlockType
}

interface FormData {
  PlanCode: number
  Age: number
  PaymentMode: number
  Gender: number | null
  phoneNumber: string
  name: string
  email: string
  city: string
  occupation: string
}

const PurchaseSection = ({ block }: Props) => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
  const [selectedPlanName, setSelectedPlanName] = useState<string>('')
  const [selectedPlanCode, setSelectedPlanCode] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>({
    PlanCode: 0,
    Age: 0,
    PaymentMode: 0,
    Gender: null,
    phoneNumber: '',
    name: '',
    email: '',
    city: '',
    occupation: '',
  })
  const [calculatedPlanCode, setCalculatedPlanCode] = useState<number | null>(null)

  const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
    setApiResponse(response)
    setConfirmedPaymentMode(paymentMode)
    setCalculatedPlanCode(formData.PlanCode)
    if (planName) {
      setSelectedPlanName(planName)
    }
  }

  // Map plan names to PlanDetailsSection expected codes
  const getPlanDetailsCode = (planName?: string): number => {
    // Map plan names to PlanDetailsSection codes
    const planNameToCode: { [key: string]: number } = {
      'Shanta Child Education Plan (3%)': 1,
      'Shanta Endowment Plan': 2,
      'Shanta 3 Stage Plan': 3,
      'Shanta 4 Stage Plan': 4,
    }

    // If we have the selected plan name, use it for mapping
    if (selectedPlanName && planNameToCode[selectedPlanName]) {
      return planNameToCode[selectedPlanName]
    }

    // If no plan name is available, try to use the provided plan name parameter
    if (planName && planNameToCode[planName]) {
      return planNameToCode[planName]
    }

    // Fallback: try to match partial names
    if (selectedPlanName) {
      if (selectedPlanName.includes('Child Education')) return 1
      if (selectedPlanName.includes('Endowment')) return 2
      if (selectedPlanName.includes('3 Stage')) return 3
      if (selectedPlanName.includes('4 Stage')) return 4
    }

    return 1 // Default fallback to show something
  }
  const plans = [
    {
      text: 'Shanta Child Education Plan',
      videoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
      code: 1,
    },
    {
      text: 'Shanta Endowment Plan',
      videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
      code: 2,
    },
    {
      text: 'Shanta 3 Stage Plan',
      videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
      code: 3,
    },
    {
      text: 'Shanta 4 Stage Plan',
      videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
      code: 4,
    },
    // {
    //   text: 'Multi Stage Maturity Plan',
    //   videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
    //   code: 5,
    // },
  ]

  // Helper function to get the correct key for payment mode

  // Click handler to toggle critical illness coverage
  // NOTE: Per your instruction — we will only USE `block` data inside the main grid (left side fallback).
  const schemaCards = Array.isArray(block?.cards) ? block.cards.slice(0, 4) : []

  return (
    <div
      className="px-5 pt-12 py-4
           md:px-24 md:pt-24
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
        {/* left side box */}
        {/* <div className=" w-full order-2 lg:order-1">
          {apiResponse ? (
            <div>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
              <PurchaseCalculateSection
                confirmedPaymentMode={confirmedPaymentMode}
                getTotalPremium={getTotalPremium}
                apiResponse={apiResponse}
              />
            </div>
          ) : selectedPlanCode > 0 ? (
            <div>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
            </div>
          ) : (
            <div>
              <div className="px-6 pt-6 md:px-10 md:pt-10 pb-4 rounded-t-xl bg-[#9C863940]">
                <h4 className="global-p1 font-semibold text-[#3A3A3C] mb-1">
                  <LocalizedText en={`For their future`} bn={`তাদের ভবিষ্যতের জন্য`} />
                </h4>
                <p className="global-p2 text-[#3A3A3C]">
                  <LocalizedText
                    en={`Secure your child’s future with a plan that covers both education costs and life
                  protection—because dreams deserve a safety net.`}
                    bn={`আপনার সন্তানের ভবিষ্যৎ সুরক্ষিত করুন এমন এক পরিকল্পনায়, যা শিক্ষা ব্যয় ও জীবন সুরক্ষা দুটোই কভার করে।`}
                  />
                </p>
              </div>

              <div className="bg-[#ccbf95] px-6 md:px-10 py-4 ">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">
                  <LocalizedText en={`For your growth`} bn={`আপনার উন্নতির জন্য`} />
                </h4>
                <p className="global-p2 font-light text-[#fff]">
                  <LocalizedText
                    en={`Build wealth with guaranteed returns and built-in life insurance`}
                    bn={`নিশ্চিত অর্থপ্রাপ্তি ও জীবন বীমার মাধ্যমে গড়ে তুলুন সম্পদ।`}
                  />
                </p>
              </div>

              <div className="bg-[#9C8639B2] rounded-b-xl px-6 md:px-10 py-4">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">
                  <LocalizedText
                    en={`When life throws you a curveball`}
                    bn={`যখন জীবন হঠাৎ আঘাত হানে`}
                  />
                </h4>
                <p className="global-p2 font-light text-[#fff]">
                  <LocalizedText
                    en={`Because we want you to focus on your recovery.`}
                    bn={`আমরা চাই আপনি যেন শুধু সুস্থ হয়ে ওঠার দিকেই মনোযোগ দিন।`}
                  />
                </p>
              </div>
            </div>
          )}
        </div> */}
        <div className=" w-full order-2 lg:order-1">
          {apiResponse ? (
            <div>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
              <PurchaseCalculateSection
                confirmedPaymentMode={confirmedPaymentMode}
                getTotalPremium={getTotalPremium}
                apiResponse={apiResponse}
              />
            </div>
          ) : selectedPlanCode > 0 ? (
            <div>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
            </div>
          ) : schemaCards.length > 0 ? (
            // ✅ Use schema cards ONLY here (inside main grid left column)
            <div className="mt-0 space-y-0">
              {schemaCards.map((c, idx) => {
                const bg =
                  c.cardBg || (idx === 0 ? '#9C863940' : idx === 1 ? '#ccbf95' : '#9C8639B2')
                const color = idx === 1 ? '#ffffff' : '#3A3A3C'
                const titleColor = color
                const descColor = color
                const rounded =
                  idx === 0
                    ? 'rounded-t-xl'
                    : idx === schemaCards.length - 1
                      ? 'rounded-b-xl'
                      : 'rounded-none'

                return (
                  <div
                    key={idx}
                    className={`${rounded} px-6 md:px-10 py-4 ${idx === 0 ? 'pt-6 md:pt-10' : ''}`}
                    style={{ backgroundColor: bg }}
                  >
                    {(c.cardText || c.cardTextBN) && (
                      <h4 className="global-p1 font-semibold mb-1" style={{ color: titleColor }}>
                        <LocalizedText en={c.cardText ?? ''} bn={c.cardTextBN ?? ''} />
                      </h4>
                    )}

                    <div className="global-p2 font-light" style={{ color: descColor }}>
                      <LocalizedRichText en={c.cardDesc} bn={c.cardDescBN} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // Fallback demo (only if schema has no cards and nothing selected/calculated)
            <div>
              <div className="px-6 pt-6 md:px-10 md:pt-10 pb-4 rounded-t-xl bg-[#9C863940]">
                <h4 className="global-p1 font-semibold text-[#3A3A3C] mb-1">
                  <LocalizedText en={`For their future`} bn={`তাদের ভবিষ্যতের জন্য`} />
                </h4>
                <p className="global-p2 text-[#3A3A3C]">
                  <LocalizedText
                    en={`Secure your child’s future with a plan that covers both education costs and life
                  protection—because dreams deserve a safety net.`}
                    bn={`আপনার সন্তানের ভবিষ্যৎ সুরক্ষিত করুন এমন এক পরিকল্পনায়, যা শিক্ষা ব্যয় ও জীবন সুরক্ষা দুটোই কভার করে।`}
                  />
                </p>
              </div>

              <div className="bg-[#ccbf95] px-6 md:px-10 py-4 ">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">
                  <LocalizedText en={`For your growth`} bn={`আপনার উন্নতির জন্য`} />
                </h4>
                <p className="global-p2 font-light text-[#fff]">
                  <LocalizedText
                    en={`Build wealth with guaranteed returns and built-in life insurance`}
                    bn={`নিশ্চিত অর্থপ্রাপ্তি ও জীবন বীমার মাধ্যমে গড়ে তুলুন সম্পদ।`}
                  />
                </p>
              </div>

              <div className="bg-[#9C8639B2] rounded-b-xl px-6 md:px-10 py-4">
                <h4 className="global-p1 font-bold text-[#fff] mb-1">
                  <LocalizedText
                    en={`When life throws you a curveball`}
                    bn={`যখন জীবন হঠাৎ আঘাত হানে`}
                  />
                </h4>
                <p className="global-p2 font-light text-[#fff]">
                  <LocalizedText
                    en={`Because we want you to focus on your recovery.`}
                    bn={`আমরা চাই আপনি যেন শুধু সুস্থ হয়ে ওঠার দিকেই মনোযোগ দিন।`}
                  />
                </p>
              </div>
            </div>
          )}
        </div>

        {/* right form */}
        <div className="order-1 lg:order-2">
          <PurchaseForm
            formData={formData}
            setFormData={setFormData}
            onPlanSelect={(planCode: number, planName: string) => {
              setSelectedPlanCode(planCode)
              setSelectedPlanName(planName)
            }}
            consentEn={block?.purchaseNowForm?.consentText}
            consentBn={block?.purchaseNowForm?.consentTextBN}
          />
        </div>
      </div>
    </div>
  )
}

export default PurchaseSection
