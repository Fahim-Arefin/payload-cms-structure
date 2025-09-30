// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import CalculateForm from './CalculateForm'
// import PremiumBreakdown from './PremiumBreakdown'
// import { ApiResponse, getTotalPremium } from '@/utils/premiumCalculator'
// import PlanDetailsSection from '../purchase/PlanDetailsSection'
// import PurchaseCalculateSection from '../purchase/PurchaseCalculateSection'

// type Props = {}

// interface FormData {
//   PlanCode: number
//   Age: number
//   dateOfBirth: Date | null
//   SumAssured: number
//   Term: number
//   PaymentMode: number
//   Gender: number | null
//   phoneNumber: string
//   annualIncome: number
//   name: string
//   email: string
// }

// const CalculatorSection = (props: Props) => {
//   const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
//   const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
//   const [selectedPlanName, setSelectedPlanName] = useState<string>('')
//   const [formData, setFormData] = useState<FormData>({
//     PlanCode: 0,
//     Age: 0,
//     dateOfBirth: null,
//     SumAssured: 0,
//     Term: 0,
//     PaymentMode: 0,
//     Gender: null,
//     phoneNumber: '',
//     annualIncome: 0,
//     name: '',
//     email: '',
//   })
//   const [calculatedPlanCode, setCalculatedPlanCode] = useState<number | null>(null)
//   const [scrollSignal, setScrollSignal] = useState<number>(0)

//   const resultRef = useRef<HTMLDivElement>(null)
//   const formRef = useRef<HTMLDivElement>(null)

//   const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
//     setApiResponse(response)
//     setConfirmedPaymentMode(paymentMode)
//     setCalculatedPlanCode(formData.PlanCode)
//     if (planName) {
//       setSelectedPlanName(planName)
//     }

//     if (window.innerWidth < 1025) {
//       // Increase counter to trigger scroll
//       setScrollSignal((prev) => prev + 1)
//     }
//   }

//   //   useEffect(() => {
//   //   if (scrollToResult && apiResponse && resultRef.current) {
//   //     const timeout = setTimeout(() => {
//   //       resultRef.current?.scrollIntoView({ behavior: 'smooth' })
//   //     }, 100) // slight delay to ensure DOM is ready
//   //     setScrollToResult(false) // reset
//   //     return () => clearTimeout(timeout)
//   //   }
//   // }, [scrollToResult, apiResponse])

//   // Map plan names to PlanDetailsSection expected codes
//   const getPlanDetailsCode = (planName?: string): number => {
//     // Map plan names to PlanDetailsSection codes
//     const planNameToCode: { [key: string]: number } = {
//       'Shanta Child Education Plan (3%)': 1,
//       'Shanta Endowment Plan': 2,
//       'Shanta 3 Stage Plan': 3,
//       'Shanta 4 Stage Plan': 4,
//     }

//     // If we have the selected plan name, use it for mapping
//     if (selectedPlanName && planNameToCode[selectedPlanName]) {
//       return planNameToCode[selectedPlanName]
//     }

//     // If no plan name is available, try to use the provided plan name parameter
//     if (planName && planNameToCode[planName]) {
//       return planNameToCode[planName]
//     }

//     // Fallback: try to match partial names
//     if (selectedPlanName) {
//       if (selectedPlanName.includes('Child Education')) return 1
//       if (selectedPlanName.includes('Endowment')) return 2
//       if (selectedPlanName.includes('3 Stage')) return 3
//       if (selectedPlanName.includes('4 Stage')) return 4
//     }

//     return 1 // Default fallback to show something
//   }
//   const plans = [
//     {
//       text: 'Shanta Child Education Plan',
//       videoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
//       code: 1,
//     },
//     {
//       text: 'Shanta Endowment Plan',
//       videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
//       code: 2,
//     },
//     {
//       text: 'Shanta 3 Stage Plan',
//       videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//       code: 3,
//     },
//     {
//       text: 'Shanta 4 Stage Plan',
//       videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//       code: 4,
//     },
//     // {
//     //   text: 'Multi Stage Maturity Plan',
//     //   videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
//     //   code: 5,
//     // },
//   ]

//   return (
//     <div
//       className="px-5 pt-12 py-4
//            md:px-24 md:pt-24
//            lg:px-[130px]  lg:pt-[110px]
//            xl:px-[200px]  xl:pt-[100px]
//            2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
//     >
//       <div className="flex flex-col items-start justify-start">
//         <h1 className="global-h1 font-semibold text-[#4A4A4A] text-start uppercase mb-4 lg:mb-10">
//           Let’s calculate <span className="text-[#ED7125] font-semibold">the premium</span>
//         </h1>
//         <p className="text-[12px] md:global-p1 text-start w-full xl:w-[80%] text-[#434343] line-clamp-4 md:line-clamp-2">
//           Our policies provide more than just life coverage. Many plans include savings and
//           investment options, helping you grow your wealth over time while ensuring your loved ones
//           are protected. With affordable premiums, flexible terms, and guaranteed returns, Shanta
//           Life combines security and financial growth in one comprehensive package.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
//         {/* left side box */}
//         <div className=" w-full order-2 lg:order-1">
//           {apiResponse ? (
//             <div ref={resultRef}>
//               <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
//               <PurchaseCalculateSection
//                 confirmedPaymentMode={confirmedPaymentMode}
//                 getTotalPremium={getTotalPremium}
//                 apiResponse={apiResponse}
//                 scrollSignal={scrollSignal}
//                 onCalculateAgain={() => {
//                   if (window.innerWidth < 1025 && formRef.current) {
//                     const y = formRef.current.getBoundingClientRect().top + window.scrollY
//                     const offset = 80
//                     window.scrollTo({ top: y - offset, behavior: 'smooth' })
//                   }
//                 }}
//               />
//             </div>
//           ) : (
//             <>
//               <div className="px-6 pt-6 md:px-10 md:pt-10 pb-4 rounded-t-xl bg-[#9C863940]">
//                 <h4 className="global-p1 font-semibold text-[#3A3A3C] mb-1">For their Future</h4>
//                 <p className="global-p2 text-[#3A3A3C]">
//                   Secure Your Child’s Future With A Plan That Covers Both Education Costs And Life
//                   Protection—Because Dreams Deserve A Safety Net.
//                 </p>
//               </div>

//               <div className="bg-[#ccbf95] px-6 md:px-10 py-4 ">
//                 <h4 className="global-p1 font-bold text-[#fff] mb-1">For Your Growth</h4>
//                 <p className="global-p2 font-light text-[#fff]">
//                   Build Wealth With Guaranteed Returns And Built-in Life Insurance
//                 </p>
//               </div>

//               <div className="bg-[#9C8639B2] rounded-b-xl px-6 md:px-10 py-4">
//                 <h4 className="global-p1 font-bold text-[#fff] mb-1">
//                   When life throws you a Curveball
//                 </h4>
//                 <p className="global-p2 font-light text-[#fff]">
//                   Because We Want You To Focus On Your Recovery
//                 </p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* right form */}
//         <div className="order-1 lg:order-2" ref={formRef}>
//           <CalculateForm
//             onApiResponse={handleApiResponse}
//             formData={formData}
//             setFormData={setFormData}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CalculatorSection

'use client'

import React, { useEffect, useRef, useState } from 'react'
import CalculateForm from './CalculateForm'
import PremiumBreakdown from './PremiumBreakdown'
import { ApiResponse, getTotalPremium } from '@/utils/premiumCalculator'
import PlanDetailsSection from '../purchase/PlanDetailsSection'
import PurchaseCalculateSection from '../purchase/PurchaseCalculateSection'
import LocalizedText from '../shared/LocalizedText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

type Props = {}

interface FormData {
  PlanCode: number
  Age: number
  dateOfBirth: Date | null
  SumAssured: number
  Term: number
  PaymentMode: number
  Gender: number | null
  phoneNumber: string
  annualIncome: number
  name: string
  email: string
}

const CalculatorSection = (props: Props) => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
  const [selectedPlanName, setSelectedPlanName] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    PlanCode: 0,
    Age: 0,
    dateOfBirth: null,
    SumAssured: 0,
    Term: 0,
    PaymentMode: 0,
    Gender: null,
    phoneNumber: '',
    annualIncome: 0,
    name: '',
    email: '',
  })
  const [calculatedPlanCode, setCalculatedPlanCode] = useState<number | null>(null)
  const [scrollSignal, setScrollSignal] = useState<number>(0)

  const resultRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleApiResponse = (response: ApiResponse, paymentMode: string, planName?: string) => {
    setApiResponse(response)
    setConfirmedPaymentMode(paymentMode)
    setCalculatedPlanCode(formData.PlanCode)
    if (planName) {
      setSelectedPlanName(planName)
    }

    if (window.innerWidth < 1025) {
      // Increase counter to trigger scroll
      setScrollSignal((prev) => prev + 1)
    }
  }

  //   useEffect(() => {
  //   if (scrollToResult && apiResponse && resultRef.current) {
  //     const timeout = setTimeout(() => {
  //       resultRef.current?.scrollIntoView({ behavior: 'smooth' })
  //     }, 100) // slight delay to ensure DOM is ready
  //     setScrollToResult(false) // reset
  //     return () => clearTimeout(timeout)
  //   }
  // }, [scrollToResult, apiResponse])

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

  return (
    <div
      className="px-5 pt-12 py-4
           md:px-24 md:pt-24
           lg:px-[130px]  lg:pt-[110px] 
           xl:px-[200px]  xl:pt-[100px] 
           2xl:px-[300px] 2xl:pt-[150px] lg:py-10 mb-4 lg:mb-10 xl:mb-20"
    >
      <div className="flex flex-col items-start justify-start">
        <h1 className="global-h1 font-semibold text-[#4A4A4A] text-start uppercase mb-4 lg:mb-10">
          <LocalizedHighlighted
            textEn={`Let’s calculate the premium`}
            textBn={`সহজ ক্লিকেই আপনার প্রিমিয়াম ক্যালকুলেট করুন`}
            highlightEn={`the premium`}
            highlightBn={`ক্যালকুলেট করুন`}
            highlightClassName="text-[#ED7125] font-semibold"
          />
        </h1>
        <p className="text-[12px] md:global-p1 text-start w-full xl:w-[80%] text-[#434343]">
          <LocalizedText
            en={`Our policies provide more than just life coverage. Many plans include savings and investment options, 
              helping you grow your wealth over time while ensuring your loved ones are protected. With affordable premiums 
              and flexible options tailored to your needs, enjoy lifelong protection, and financial growth- protect what matters 
              the most.`}
            bn={`আমাদের লক্ষ্য আপনার জীবনের আর্থিক নিরাপত্তার সাথে ভবিষ্যতের ফিন্যান্সিয়াল পার্টনার হয়ে জীবনমান বৃদ্ধিতে পাশে থাকা।  
                এজন্য আমাদের পলিসিগুলো শুধু জীবনবীমা নয়, বরং আপনার ফিন্যান্সিয়াল প্রোটিফোলিও মজবুত করতে সাহায্য করে। আপনার চাহিদা 
                অনুযায়ী প্ল্যান এর জন্য  সহজেই প্রিমিয়াম  ক্যালকুলেট করুন।`}
          />
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] gap-4 lg:gap-10 justify-center mt-6 lg:mt-10 xl:mt-20">
        {/* left side box */}
        <div className=" w-full order-2 lg:order-1">
          {apiResponse ? (
            <div ref={resultRef}>
              <PlanDetailsSection planCode={getPlanDetailsCode()} plans={plans} />
              <PurchaseCalculateSection
                confirmedPaymentMode={confirmedPaymentMode}
                getTotalPremium={getTotalPremium}
                apiResponse={apiResponse}
                scrollSignal={scrollSignal}
                onCalculateAgain={() => {
                  if (window.innerWidth < 1025 && formRef.current) {
                    const y = formRef.current.getBoundingClientRect().top + window.scrollY
                    const offset = 80
                    window.scrollTo({ top: y - offset, behavior: 'smooth' })
                  }
                }}
              />
            </div>
          ) : (
            <>
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
                  {' '}
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
            </>
          )}
        </div>

        {/* right form */}
        <div className="order-1 lg:order-2" ref={formRef}>
          <CalculateForm
            onApiResponse={handleApiResponse}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  )
}

export default CalculatorSection
