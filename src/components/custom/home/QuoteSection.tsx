// 'use client'
// import AnimatedCounter from '@/components/ui/AnimatedCounter'
// import { ApiResponse, ApiResToShow, getTotalPremium } from '@/utils/premiumCalculator'
// import { useRef, useState } from 'react'
// import GlobalButton from '../shared/GlobalButton'
// import QuoteForm from './QuoteForm'
// import Image from 'next/image'
// import { Checkbox } from '@/components/ui/checkbox'
// import LocalizedText from '../shared/LocalizedText'
// import LocalizedHighlighted from '../shared/LocalizedHighlighted'
// import { PremiumCalculatorBlockType } from '@/types/payloadCustomTypes'

// type Props = {
//   data: PremiumCalculatorBlockType
// }

// function QuoteSection({ data }: Props) {
//   const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
//   const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
//   const [ciSelection, setCiSelection] = useState<'ci19' | 'ci25' | null>(null)
//   const [isAccidentSelected, setIsAccidentSelected] = useState<boolean>(false)
//   const resultRef = useRef<HTMLDivElement>(null)
//   const formRef = useRef<HTMLDivElement>(null)
//   const brandCheckbox =
//     'w-4 h-4 md:w-5 md:h-5 rounded-sm border-[#ED7125] data-[state=checked]:bg-[#ED7125] data-[state=checked]:border-[#ED7125] focus-visible:ring-0 focus-visible:ring-offset-0'

//   const handleApiResponse = (response: ApiResponse, paymentMode: string) => {
//     setApiResponse(response)
//     setConfirmedPaymentMode(paymentMode)

//     // Scroll to results on mobile after API response
//     if (window.innerWidth < 1024 && resultRef.current) {
//       setTimeout(() => {
//         resultRef.current?.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start',
//         })
//       }, 300) // Small delay to ensure DOM update
//     }
//   }

//   const handleCalculateAgain = () => {
//     if (window.innerWidth < 1024 && formRef.current) {
//       const y = formRef.current.getBoundingClientRect().top + window.scrollY
//       const offset = 80 // Add some offset from top
//       window.scrollTo({ top: y - offset, behavior: 'smooth' })
//     }
//   }

//   // Helper function to get the correct key for payment mode
//   const getPaymentModeKey = (paymentMode: string): keyof ApiResToShow['lifePremium'] => {
//     switch (paymentMode) {
//       case 'Monthly':
//         return 'monthly'
//       case 'Quarterly':
//         return 'quarterly'
//       case 'Semi-annually':
//       case 'Half Yearly':
//         return 'half_yearly'
//       case 'Yearly':
//         return 'yearly'
//       case 'Single':
//         return 'single'
//       default:
//         return 'monthly'
//     }
//   }

//   const handleCriticalIllness19Toggle = () => {
//     setCiSelection((prev) => (prev === 'ci19' ? null : 'ci19')) // mutually exclusive within CI
//   }

//   const handleCriticalIllness25Toggle = () => {
//     setCiSelection((prev) => (prev === 'ci25' ? null : 'ci25'))
//   }

//   const handleAccidentToggle = () => {
//     setIsAccidentSelected((prev) => !prev) // independent toggle
//   }

//   // Helper function to get the total premium including selected coverage if any
//   const getTotalPremiumWithCoverage = (paymentMode: string): number => {
//     if (!apiResponse) return 0
//     const premiums = getTotalPremium(apiResponse, paymentMode)
//     const paymentKey = getPaymentModeKey(paymentMode)

//     const life = premiums.lifePremium[paymentKey]
//     const ci =
//       ciSelection === 'ci19'
//         ? premiums.ciPremium[paymentKey]
//         : ciSelection === 'ci25'
//           ? premiums.ci25Premium[paymentKey]
//           : 0
//     const accident = isAccidentSelected ? premiums.accidentPremium[paymentKey] : 0

//     return life + ci + accident
//   }

//   return (
//     // mb-12 md:mb-24 lg:mb-32 xl:mb-[150px]
//     <div className="relative font-avenir container-width container-padding-y px-2 lg:px-0">
//       <div className=" lg:hidden space-y-1 md:space-y-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto text-center mb-8">
//         <div className="uppercase text-[#434342] global-h4 font-light">
//           <LocalizedText en={data?.heading} bn={data?.headingBN} />
//         </div>
//         <div className="uppercase text-[#434342] global-h1 font-semibold ">
//           {/* Tomorrow, <span className="md:text-[#FF6600]">Today!</span> */}
//           <LocalizedHighlighted
//             textEn={data?.title}
//             textBn={data?.titleBN}
//             highlightEn={data?.highlightedText}
//             highlightBn={data?.highlightedTextBN}
//             highlightClassName="text-[#FF6600]"
//           />
//         </div>
//         <p className="global-p1 text-[#434342] font-light">
//           <LocalizedText en={data?.description} bn={data?.descriptionBN} />
//         </p>
//       </div>
//       <div
//         className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] z-10
//       gap-4 lg:gap-0 2xl:gap-10"
//       >
//         {/* Left Side - Results Section (order-2 on mobile, order-1 on lg+) */}
//         <div
//           ref={resultRef}
//           className="lg:p-1 xl:p-2 2xl:p-3
//           lg:pl-0 space-y-8 xl:space-y-11 z-10 order-2 lg:order-1"
//         >
//           {/* Text Container */}
//           <div className="hidden lg:block space-y-2 text-center lg:text-left ">
//             <div className="uppercase text-[#434342] text-[16px] md:text-[18px] 2xl:text-2xl font-light ">
//               <LocalizedText en={data?.heading} bn={data?.headingBN} />
//             </div>
//             <div className="uppercase text-[#434342] global-h1 font-semibold ">
//               {/* Tomorrow, <span className="md:text-[#FF6600]">Today!</span> */}
//               <LocalizedHighlighted
//                 textEn={data?.title}
//                 textBn={data?.titleBN}
//                 highlightEn={data?.highlightedText}
//                 highlightBn={data?.highlightedTextBN}
//                 highlightClassName="text-[#FF6600]"
//               />
//             </div>
//             <p className="global-p1 text-[#434342] font-light">
//               <LocalizedText en={data?.description} bn={data?.descriptionBN} />
//             </p>
//           </div>
//           {/* Info Container - Show on all screens when API response is available */}
//           {apiResponse && (
//             <div className="bg-[#FFFFFFCC] rounded-b-lg border-t-2 border-[#FF6600] py-2">
//               <h2
//                 className="text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] font-normal mb-6 p-2
//               xl:py-3 lg:my-3 xl:my-4 text-center"
//               >
//                 Your Desired Premium is Highlighted
//               </h2>

//               {/* Regular 4-column grid for non-Single payment modes */}
//               {confirmedPaymentMode !== 'Single' && (
//                 <div className="grid grid-cols-2 md:grid-cols-4">
//                   <div className="col-span-1 md:col-span-1 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:my-3 xl:my-4">
//                     <div
//                       className={`font-medium text-center ${
//                         confirmedPaymentMode === 'Monthly'
//                           ? 'text-[#ED7125] result-selected-header-size'
//                           : 'text-[#434342] result-not-selected-header-size'
//                       }`}
//                     >
//                       Monthly
//                     </div>
//                     <div
//                       className={`font-bold text-center ${
//                         confirmedPaymentMode === 'Monthly'
//                           ? 'text-[#ED7125] result-selected-text-size '
//                           : 'text-[#434342] result-not-selected-text-size'
//                       }`}
//                     >
//                       <AnimatedCounter
//                         value={Math.ceil(
//                           confirmedPaymentMode === 'Monthly'
//                             ? getTotalPremiumWithCoverage('Monthly')
//                             : getTotalPremium(apiResponse, 'Monthly')?.lifePremium.monthly || 0,
//                         )}
//                         prefix="৳"
//                         showAnimation={confirmedPaymentMode === 'Monthly'}
//                         duration={800}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-span-1 md:col-span-1 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
//                     <div
//                       className={`font-medium text-center ${
//                         confirmedPaymentMode === 'Quarterly'
//                           ? 'text-[#ED7125] result-selected-header-size'
//                           : 'text-[#434342] result-not-selected-header-size'
//                       }`}
//                     >
//                       Quarterly
//                     </div>
//                     <div
//                       className={`font-bold text-center ${
//                         confirmedPaymentMode === 'Quarterly'
//                           ? 'text-[#ED7125] result-selected-text-size '
//                           : 'text-[#434342] result-not-selected-text-size'
//                       }`}
//                     >
//                       <AnimatedCounter
//                         value={Math.ceil(
//                           confirmedPaymentMode === 'Quarterly'
//                             ? getTotalPremiumWithCoverage('Quarterly')
//                             : getTotalPremium(apiResponse, 'Quarterly')?.lifePremium.quarterly || 0,
//                         )}
//                         prefix="৳"
//                         showAnimation={confirmedPaymentMode === 'Quarterly'}
//                         duration={800}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-span-1 md:col-span-1 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
//                     <div
//                       className={`font-medium text-center ${
//                         confirmedPaymentMode === 'Half Yearly'
//                           ? 'text-[#ED7125] result-selected-header-size'
//                           : 'text-[#434342] result-not-selected-header-size'
//                       }`}
//                     >
//                       Half Yearly
//                     </div>
//                     <div
//                       className={`font-bold text-center ${
//                         confirmedPaymentMode === 'Half Yearly'
//                           ? 'text-[#ED7125] result-selected-text-size '
//                           : 'text-[#434342] result-not-selected-text-size'
//                       }`}
//                     >
//                       <AnimatedCounter
//                         value={Math.ceil(
//                           confirmedPaymentMode === 'Half Yearly'
//                             ? getTotalPremiumWithCoverage('Half Yearly')
//                             : getTotalPremium(apiResponse, 'Half Yearly')?.lifePremium
//                                 .half_yearly || 0,
//                         )}
//                         prefix="৳"
//                         showAnimation={confirmedPaymentMode === 'Half Yearly'}
//                         duration={800}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-span-1 md:col-span-1 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
//                     <div
//                       className={`font-medium text-center ${
//                         confirmedPaymentMode === 'Yearly'
//                           ? 'text-[#ED7125] result-selected-header-size'
//                           : 'text-[#434342] result-not-selected-header-size'
//                       }`}
//                     >
//                       Yearly
//                     </div>
//                     <div
//                       className={`font-bold text-center ${
//                         confirmedPaymentMode === 'Yearly'
//                           ? 'text-[#ED7125] result-selected-text-size '
//                           : 'text-[#434342] result-not-selected-text-size'
//                       }`}
//                     >
//                       <AnimatedCounter
//                         value={Math.ceil(
//                           confirmedPaymentMode === 'Yearly'
//                             ? getTotalPremiumWithCoverage('Yearly')
//                             : getTotalPremium(apiResponse, 'Yearly')?.lifePremium.yearly || 0,
//                         )}
//                         prefix="৳"
//                         showAnimation={confirmedPaymentMode === 'Yearly'}
//                         duration={800}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Single Payment section */}
//               {confirmedPaymentMode === 'Single' && (
//                 <div className="p-6 py-8 bg-gradient-to-br from-[#ED7125]/10 to-[#ED7125]/20 rounded-lg border border-[#ED7125]/30 mx-4">
//                   <div className="text-center">
//                     <div className="text-[#ED7125] text-[18px] lg:text-[24px] xl:text-[28px] font-bold mb-3">
//                       Single Payment
//                     </div>
//                     <div className="text-[#ED7125] text-[24px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] font-bold">
//                       <AnimatedCounter
//                         value={Math.ceil(getTotalPremiumWithCoverage('Single'))}
//                         prefix="৳"
//                         showAnimation={true}
//                         duration={800}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="p-2 md:py-3 md:px-6 xl:py-4 xl:px-8 space-y-2 mt-2 xl:mt-6">
//                 {getTotalPremium(apiResponse, confirmedPaymentMode).ciPremium[
//                   getPaymentModeKey(confirmedPaymentMode)
//                 ] > 0 && (
//                   <div className="bg-[#F6EDDD] px-2 md:px-4 lg:px-1 py-1.5 lg:py-1 xl:px-4 xl:py-1.5 w-full 2xl:w-[80%] mx-auto rounded-full flex items-center space-x-2">
//                     <Checkbox
//                       className={brandCheckbox}
//                       checked={ciSelection === 'ci19'}
//                       onCheckedChange={handleCriticalIllness19Toggle}
//                       aria-label="Toggle CI-19 coverage"
//                       id="ci19-left"
//                     />
//                     <div
//                       className="underline underline-offset-4 text-[10px] xl:text-xs cursor-pointer hover:text-blue-600 transition-colors"
//                       onClick={handleCriticalIllness19Toggle}
//                     >
//                       <>
//                         {ciSelection === 'ci19' ? 'Remove' : 'Add'}{' '}
//                         {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).ciPremium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
//                         taka <span className="font-bold">{confirmedPaymentMode}</span> to Cover 19
//                         Critical Illness!
//                       </>
//                     </div>
//                     {/* this belwo div will be align right of the flex*/}
//                     <div className="flex-1 flex justify-end">
//                       <svg
//                         width="16"
//                         height="16"
//                         viewBox="0 0 16 16"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
//                           fill="#1F1F1F"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//                 {getTotalPremium(apiResponse, confirmedPaymentMode).ci25Premium[
//                   getPaymentModeKey(confirmedPaymentMode)
//                 ] > 0 && (
//                   <div className="bg-[#F6EDDD] px-2 md:px-4 lg:px-1 py-1.5 lg:py-1 xl:px-4 xl:py-1.5 w-full 2xl:w-[80%] mx-auto rounded-full flex items-center space-x-2">
//                     <Checkbox
//                       className={brandCheckbox}
//                       checked={ciSelection === 'ci25'}
//                       onCheckedChange={handleCriticalIllness25Toggle}
//                       aria-label="Toggle CI-25 coverage"
//                       id="ci25-left"
//                     />
//                     <div
//                       className="underline underline-offset-4 text-[10px] xl:text-xs cursor-pointer hover:text-blue-600 transition-colors"
//                       onClick={handleCriticalIllness25Toggle}
//                     >
//                       <>
//                         {ciSelection === 'ci25' ? 'Remove' : 'Add'}{' '}
//                         {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).ci25Premium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
//                         taka <span className="font-bold">{confirmedPaymentMode}</span> to Cover 25
//                         Critical Illness!
//                       </>
//                     </div>
//                     {/* this belwo div will be align right of the flex*/}
//                     <div className="flex-1 flex justify-end">
//                       <svg
//                         width="16"
//                         height="16"
//                         viewBox="0 0 16 16"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
//                           fill="#1F1F1F"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//                 {getTotalPremium(apiResponse, confirmedPaymentMode).accidentPremium[
//                   getPaymentModeKey(confirmedPaymentMode)
//                 ] > 0 && (
//                   <div className="bg-[#F6EDDD] px-2 md:px-4 lg:px-1 py-1.5 lg:py-1 xl:px-4 xl:py-1.5 w-full 2xl:w-[80%] mx-auto rounded-full flex items-center space-x-2">
//                     <Checkbox
//                       className={brandCheckbox}
//                       checked={isAccidentSelected}
//                       onCheckedChange={handleAccidentToggle}
//                       aria-label="Toggle Accident coverage"
//                       id="acc-left"
//                     />
//                     <div
//                       className="underline underline-offset-4 text-[10px] xl:text-xs cursor-pointer hover:text-blue-600 transition-colors"
//                       onClick={handleAccidentToggle}
//                     >
//                       {isAccidentSelected
//                         ? 'Remove accident coverage for'
//                         : "Prone to accidents? Let's get you covered in"}{' '}
//                       {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).accidentPremium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
//                       taka <span className="font-bold">{confirmedPaymentMode}</span>!
//                     </div>
//                     <div className="flex-1 flex justify-end">
//                       <svg
//                         width="16"
//                         height="16"
//                         viewBox="0 0 16 16"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
//                           fill="#1F1F1F"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//           {/* Calculate Again Button - Only show on mobile when results are available */}
//           {apiResponse && (
//             <div className="flex justify-center items-center lg:hidden ">
//               <GlobalButton
//                 onClick={handleCalculateAgain}
//                 className=""
//                 variant="secondary"
//                 text="Calculate Again"
//               />
//             </div>
//           )}
//         </div>
//         {/* Right Side - Form Section (order-1 on mobile, order-2 on lg+) */}
//         <div ref={formRef} className="lg:p-1 xl:p-2 2xl:p-3 lg:pr-0 z-10 order-1 lg:order-2">
//           <QuoteForm onApiResponse={handleApiResponse} payloadData={data} />
//         </div>
//       </div>
//       {/* bg image */}
//       {/* left rotate image */}
//       <div
//         className="hidden lg:block
//         lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px] rounded-[20px] z-0
//         absolute lg:top-[90px] xl:top-[100px] 2xl:top-[150px] lg:right-[140px] xl:right-[230px] 2xl:right-[200px] opacity-20"
//       >
//         {typeof data?.backgroundImage1 === 'object' && data?.backgroundImage1?.url && (
//           <Image
//             // src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/quotebg.jpg`}
//             src={data?.backgroundImage1?.url || ''}
//             alt="Quote background"
//             fill
//             className="
//         inset-0
//         rounded-[20px] z-0
//         object-cover object-center object-no-repeat"
//             style={{
//               transform: 'rotate(-7deg)',
//               transformOrigin: 'top left',
//             }}
//             sizes="(max-width: 1349px) 300px , 500px"
//             placeholder="blur"
//             blurDataURL={data?.backgroundImage1BlurDataURL || ''}
//           />
//         )}
//       </div>
//       {/* right rotate image */}
//       <div
//         className="hidden lg:block
//         lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px] rounded-[20px] z-0 opacity-20
//         absolute lg:top-[90px] xl:top-[100px] 2xl:top-[150px] lg:-right-[50px] xl:-right-[90px] 2xl:-right-[200px]"
//       >
//         {typeof data?.backgroundImage2 === 'object' && data?.backgroundImage2?.url && (
//           <Image
//             // src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/quotebg.jpg`}
//             src={data?.backgroundImage2?.url || ''}
//             alt="Quote background"
//             fill
//             className="
//         inset-0
//         rounded-[20px] z-0
//         object-cover object-center object-no-repeat"
//             style={{
//               transform: 'rotate(7deg)',
//               transformOrigin: 'top right',
//             }}
//             sizes="(max-width: 1349px) 300px , 500px"
//             placeholder="blur"
//             blurDataURL={data?.backgroundImage2BlurDataURL || ''}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default QuoteSection
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

'use client'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { ApiResponse, ApiResToShow, getTotalPremium } from '@/utils/premiumCalculator'
import { useEffect, useRef, useState } from 'react'
import GlobalButton from '../shared/GlobalButton'
import QuoteForm from './QuoteForm'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import LocalizedText from '../shared/LocalizedText'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { PremiumCalculatorBlockType } from '@/types/payloadCustomTypes'
import LocalizedString from '../shared/LocalizedString'
import QuotePdfModal from './QuotePdfModal'
import { GlobalFooter } from '@/payload-types'

type Props = {
  data: PremiumCalculatorBlockType
  footerData: GlobalFooter
}

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

type AddOnKey = 'ci19' | 'ci25' | 'accident'

type AddOnInfo = {
  key: AddOnKey
  label: string
  amount: number
}

type PremiumBreakdown = {
  paymentMode: string
  paymentKey: keyof ApiResToShow['lifePremium'] // monthly | quarterly | half_yearly | yearly | single
  basicPremium: number // life only
  addOns: AddOnInfo[] // selected add-ons only
  totalPremium: number // basic + addOns sum
}

// Optional: store for every mode (Monthly/Quarterly/...)
type PremiumBreakdownMap = Record<string, PremiumBreakdown>

type QuoteMeta = {
  lang?: 'en' | 'bn'
  plan?: { code: number; name: string; displayName?: string }
  payment?: { id: number; name: string; displayName?: string }
  gender?: { id: number; name: string; displayName?: string }
  term?: { value: number; label: string }
}

function QuoteSection({ data, footerData }: Props) {
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
  const [quoteMeta, setQuoteMeta] = useState<QuoteMeta>({})
  const mergeQuoteMeta = (prev: QuoteMeta, patch: Partial<QuoteMeta>): QuoteMeta => ({
    ...prev,
    ...patch,
    // keep previous nested objects unless explicitly overwritten
    plan: patch.plan ?? prev.plan,
    payment: patch.payment ?? prev.payment,
    gender: patch.gender ?? prev.gender,
    term: patch.term ?? prev.term,
  })

  const [premiumBreakdownByMode, setPremiumBreakdownByMode] = useState<PremiumBreakdownMap | null>(
    null,
  )

  const [showApiResponse, setShowApiResponse] = useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<string>('')
  const [ciSelection, setCiSelection] = useState<'ci19' | 'ci25' | null>(null)
  const [isAccidentSelected, setIsAccidentSelected] = useState<boolean>(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const brandCheckbox =
    'w-4 h-4 md:w-5 md:h-5 rounded-sm border-[#ED7125] data-[state=checked]:bg-[#ED7125] data-[state=checked]:border-[#ED7125] focus-visible:ring-0 focus-visible:ring-offset-0'

  const [pdfOpen, setPdfOpen] = useState(false)

  const pdfRequestBody = apiResponse
    ? {
        formData,
        apiResponse,
        confirmedPaymentMode,
        ciSelection,
        isAccidentSelected,
        meta: quoteMeta, // ✅ new
        footerData,
        // ✅ NEW
        premiumBreakdown: premiumBreakdownByMode?.[confirmedPaymentMode] ?? null, // for the chosen mode
        premiumBreakdownAllModes: premiumBreakdownByMode, // if you want all modes in PDF
      }
    : null

  const handleApiResponse = (response: ApiResponse, paymentMode: string) => {
    setApiResponse(response)
    setConfirmedPaymentMode(paymentMode)

    // Scroll to results on mobile after API response
    if (window.innerWidth < 1024 && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 300) // Small delay to ensure DOM update
    }
  }

  const handleCalculateAgain = () => {
    if (window.innerWidth < 1024 && formRef.current) {
      const y = formRef.current.getBoundingClientRect().top + window.scrollY
      const offset = 80 // Add some offset from top
      window.scrollTo({ top: y - offset, behavior: 'smooth' })
    }
  }

  // Helper function to get the correct key for payment mode
  const getPaymentModeKey = (paymentMode: string): keyof ApiResToShow['lifePremium'] => {
    switch (paymentMode) {
      case 'Monthly':
        return 'monthly'
      case 'Quarterly':
        return 'quarterly'
      case 'Semi-annually':
      case 'Half Yearly':
        return 'half_yearly'
      case 'Yearly':
        return 'yearly'
      case 'Single':
        return 'single'
      default:
        return 'monthly'
    }
  }

  const getBreakdownForMode = (mode: string): PremiumBreakdown | null => {
    if (!apiResponse) return null

    const premiums = getTotalPremium(apiResponse, mode)
    const paymentKey = getPaymentModeKey(mode)

    const basic = premiums.lifePremium[paymentKey] || 0

    const addOns: AddOnInfo[] = []

    // CI-19
    if (ciSelection === 'ci19') {
      const amt = premiums.ciPremium[paymentKey] || 0
      if (amt > 0) addOns.push({ key: 'ci19', label: 'Critical Illness (19)', amount: amt })
    }

    // CI-25
    if (ciSelection === 'ci25') {
      const amt = premiums.ci25Premium[paymentKey] || 0
      if (amt > 0) addOns.push({ key: 'ci25', label: 'Critical Illness (25)', amount: amt })
    }

    // Accident
    if (isAccidentSelected) {
      const amt = premiums.accidentPremium[paymentKey] || 0
      if (amt > 0) addOns.push({ key: 'accident', label: 'Accident Coverage', amount: amt })
    }

    const total = basic + addOns.reduce((s, a) => s + a.amount, 0)

    return {
      paymentMode: mode,
      paymentKey,
      basicPremium: basic,
      addOns,
      totalPremium: total,
    }
  }

  const handleCriticalIllness19Toggle = () => {
    setCiSelection((prev) => (prev === 'ci19' ? null : 'ci19')) // mutually exclusive within CI
  }

  const handleCriticalIllness25Toggle = () => {
    setCiSelection((prev) => (prev === 'ci25' ? null : 'ci25'))
  }

  const handleAccidentToggle = () => {
    setIsAccidentSelected((prev) => !prev) // independent toggle
  }

  // Helper function to get the total premium including selected coverage if any
  const getTotalPremiumWithCoverage = (paymentMode: string): number => {
    if (!apiResponse) return 0
    const premiums = getTotalPremium(apiResponse, paymentMode)
    const paymentKey = getPaymentModeKey(paymentMode)

    const life = premiums.lifePremium[paymentKey]
    const ci =
      ciSelection === 'ci19'
        ? premiums.ciPremium[paymentKey]
        : ciSelection === 'ci25'
          ? premiums.ci25Premium[paymentKey]
          : 0
    const accident = isAccidentSelected ? premiums.accidentPremium[paymentKey] : 0

    return life + ci + accident
  }

  useEffect(() => {
    setShowApiResponse(false)
  }, [formData])

  useEffect(() => {
    if (!apiResponse) {
      setPremiumBreakdownByMode(null)
      return
    }

    const modes = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly', 'Single']
    const map: PremiumBreakdownMap = {}

    for (const m of modes) {
      const b = getBreakdownForMode(m)
      if (b) map[m] = b
    }

    setPremiumBreakdownByMode(map)
  }, [apiResponse, ciSelection, isAccidentSelected])

  console.log('formData inside parent', formData)
  // console.log('quoteMeta', quoteMeta)
  console.log('apiResponse', apiResponse)
  // console.log('premiumBreakdownByMode', premiumBreakdownByMode)

  return (
    // mb-12 md:mb-24 lg:mb-32 xl:mb-[150px]
    <div className="relative font-avenir container-width container-padding-y px-2 lg:px-0">
      <div className=" lg:hidden space-y-1 md:space-y-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto text-center mb-8">
        <div className="uppercase text-[#434342] global-h4 font-light">
          <LocalizedText en={data?.heading} bn={data?.headingBN} />
        </div>
        <div className="uppercase text-[#434342] global-h1 font-semibold ">
          {/* Tomorrow, <span className="md:text-[#FF6600]">Today!</span> */}
          <LocalizedHighlighted
            textEn={data?.title}
            textBn={data?.titleBN}
            highlightEn={data?.highlightedText}
            highlightBn={data?.highlightedTextBN}
            highlightClassName="text-[#FF6600]"
          />
        </div>
        <p className="global-p1 text-[#434342] font-light">
          <LocalizedText en={data?.description} bn={data?.descriptionBN} />
        </p>
      </div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.3fr,1fr] z-10 
      gap-4 lg:gap-0 2xl:gap-10"
      >
        {/* Left Side - Results Section (order-2 on mobile, order-1 on lg+) */}
        <div
          ref={resultRef}
          className="lg:p-1 xl:p-2 2xl:p-3 
          lg:pl-0 space-y-8 xl:space-y-11 z-10 order-2 lg:order-1"
        >
          {/* Text Container */}
          <div className="hidden lg:block space-y-2 text-center lg:text-left ">
            <div className="uppercase text-[#434342] text-[16px] md:text-[18px] 2xl:text-2xl font-light ">
              <LocalizedText en={data?.heading} bn={data?.headingBN} />
            </div>
            <div className="uppercase text-[#434342] global-h1 font-semibold ">
              {/* Tomorrow, <span className="md:text-[#FF6600]">Today!</span> */}
              <LocalizedHighlighted
                textEn={data?.title}
                textBn={data?.titleBN}
                highlightEn={data?.highlightedText}
                highlightBn={data?.highlightedTextBN}
                highlightClassName="text-[#FF6600]"
              />
            </div>
            <p className="global-p1 text-[#434342] font-light">
              <LocalizedText en={data?.description} bn={data?.descriptionBN} />
            </p>
          </div>
          {/* Info Container - Show on all screens when API response is available */}
          {apiResponse && (
            <div className="bg-[#FFFFFFCC] rounded-b-lg border-t-2 border-[#FF6600] py-2">
              <h2
                className="text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] font-normal mb-6 p-2
              xl:py-3 lg:my-3 xl:my-4 text-center"
              >
                Your Desired Premium is Highlighted
              </h2>

              {/* Regular 4-column grid for non-Single payment modes */}
              {confirmedPaymentMode !== 'Single' && (
                <div className="grid grid-cols-2 md:grid-cols-4">
                  <div className="col-span-1 md:col-span-1 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:my-3 xl:my-4">
                    <div
                      className={`font-medium text-center ${
                        confirmedPaymentMode === 'Monthly'
                          ? 'text-[#ED7125] result-selected-header-size'
                          : 'text-[#434342] result-not-selected-header-size'
                      }`}
                    >
                      Monthly
                    </div>
                    <div
                      className={`font-bold text-center ${
                        confirmedPaymentMode === 'Monthly'
                          ? 'text-[#ED7125] result-selected-text-size '
                          : 'text-[#434342] result-not-selected-text-size'
                      }`}
                    >
                      <AnimatedCounter
                        value={Math.ceil(
                          confirmedPaymentMode === 'Monthly'
                            ? getTotalPremiumWithCoverage('Monthly')
                            : getTotalPremium(apiResponse, 'Monthly')?.lifePremium.monthly || 0,
                        )}
                        prefix="৳"
                        showAnimation={confirmedPaymentMode === 'Monthly'}
                        duration={800}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
                    <div
                      className={`font-medium text-center ${
                        confirmedPaymentMode === 'Quarterly'
                          ? 'text-[#ED7125] result-selected-header-size'
                          : 'text-[#434342] result-not-selected-header-size'
                      }`}
                    >
                      Quarterly
                    </div>
                    <div
                      className={`font-bold text-center ${
                        confirmedPaymentMode === 'Quarterly'
                          ? 'text-[#ED7125] result-selected-text-size '
                          : 'text-[#434342] result-not-selected-text-size'
                      }`}
                    >
                      <AnimatedCounter
                        value={Math.ceil(
                          confirmedPaymentMode === 'Quarterly'
                            ? getTotalPremiumWithCoverage('Quarterly')
                            : getTotalPremium(apiResponse, 'Quarterly')?.lifePremium.quarterly || 0,
                        )}
                        prefix="৳"
                        showAnimation={confirmedPaymentMode === 'Quarterly'}
                        duration={800}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
                    <div
                      className={`font-medium text-center ${
                        confirmedPaymentMode === 'Half Yearly'
                          ? 'text-[#ED7125] result-selected-header-size'
                          : 'text-[#434342] result-not-selected-header-size'
                      }`}
                    >
                      Half Yearly
                    </div>
                    <div
                      className={`font-bold text-center ${
                        confirmedPaymentMode === 'Half Yearly'
                          ? 'text-[#ED7125] result-selected-text-size '
                          : 'text-[#434342] result-not-selected-text-size'
                      }`}
                    >
                      <AnimatedCounter
                        value={Math.ceil(
                          confirmedPaymentMode === 'Half Yearly'
                            ? getTotalPremiumWithCoverage('Half Yearly')
                            : getTotalPremium(apiResponse, 'Half Yearly')?.lifePremium
                                .half_yearly || 0,
                        )}
                        prefix="৳"
                        showAnimation={confirmedPaymentMode === 'Half Yearly'}
                        duration={800}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
                    <div
                      className={`font-medium text-center ${
                        confirmedPaymentMode === 'Yearly'
                          ? 'text-[#ED7125] result-selected-header-size'
                          : 'text-[#434342] result-not-selected-header-size'
                      }`}
                    >
                      Yearly
                    </div>
                    <div
                      className={`font-bold text-center ${
                        confirmedPaymentMode === 'Yearly'
                          ? 'text-[#ED7125] result-selected-text-size '
                          : 'text-[#434342] result-not-selected-text-size'
                      }`}
                    >
                      <AnimatedCounter
                        value={Math.ceil(
                          confirmedPaymentMode === 'Yearly'
                            ? getTotalPremiumWithCoverage('Yearly')
                            : getTotalPremium(apiResponse, 'Yearly')?.lifePremium.yearly || 0,
                        )}
                        prefix="৳"
                        showAnimation={confirmedPaymentMode === 'Yearly'}
                        duration={800}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Single Payment section */}
              {confirmedPaymentMode === 'Single' && (
                <div className="p-6 py-8 bg-gradient-to-br from-[#ED7125]/10 to-[#ED7125]/20 rounded-lg border border-[#ED7125]/30 mx-4">
                  <div className="text-center">
                    <div className="text-[#ED7125] text-[18px] lg:text-[24px] xl:text-[28px] font-bold mb-3">
                      {formData?.PlanCode === 14 ? 'Sum Assured' : 'Single Payment'}
                    </div>
                    <div className="text-[#ED7125] text-[24px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] font-bold">
                      <AnimatedCounter
                        value={
                          formData?.PlanCode === 14
                            ? Math.ceil(apiResponse?.dps_or_single_payment_sum_assured)
                            : Math.ceil(getTotalPremiumWithCoverage('Single'))
                        }
                        prefix="৳"
                        showAnimation={true}
                        duration={800}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-2 md:py-3 md:px-6 xl:py-4 xl:px-8 space-y-2 mt-2 xl:mt-6">
                {getTotalPremium(apiResponse, confirmedPaymentMode).ciPremium[
                  getPaymentModeKey(confirmedPaymentMode)
                ] > 0 && (
                  <div className="bg-[#F6EDDD] px-2 md:px-4 lg:px-1 py-1.5 lg:py-1 xl:px-4 xl:py-1.5 w-full 2xl:w-[80%] mx-auto rounded-full flex items-center space-x-2">
                    <Checkbox
                      className={brandCheckbox}
                      checked={ciSelection === 'ci19'}
                      onCheckedChange={handleCriticalIllness19Toggle}
                      aria-label="Toggle CI-19 coverage"
                      id="ci19-left"
                    />
                    <div
                      className="underline underline-offset-4 text-[10px] xl:text-xs cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={handleCriticalIllness19Toggle}
                    >
                      <>
                        {ciSelection === 'ci19' ? 'Remove' : 'Add'}{' '}
                        {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).ciPremium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
                        taka <span className="font-bold">{confirmedPaymentMode}</span> to Cover 19
                        Critical Illness!
                      </>
                    </div>
                    {/* this belwo div will be align right of the flex*/}
                    <div className="flex-1 flex justify-end">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
                          fill="#1F1F1F"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {getTotalPremium(apiResponse, confirmedPaymentMode).ci25Premium[
                  getPaymentModeKey(confirmedPaymentMode)
                ] > 0 && (
                  <div className="bg-[#F6EDDD] px-2 md:px-4 lg:px-1 py-1.5 lg:py-1 xl:px-4 xl:py-1.5 w-full 2xl:w-[80%] mx-auto rounded-full flex items-center space-x-2">
                    <Checkbox
                      className={brandCheckbox}
                      checked={ciSelection === 'ci25'}
                      onCheckedChange={handleCriticalIllness25Toggle}
                      aria-label="Toggle CI-25 coverage"
                      id="ci25-left"
                    />
                    <div
                      className="underline underline-offset-4 text-[10px] xl:text-xs cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={handleCriticalIllness25Toggle}
                    >
                      <>
                        {ciSelection === 'ci25' ? 'Remove' : 'Add'}{' '}
                        {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).ci25Premium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
                        taka <span className="font-bold">{confirmedPaymentMode}</span> to Cover 25
                        Critical Illness!
                      </>
                    </div>
                    {/* this belwo div will be align right of the flex*/}
                    <div className="flex-1 flex justify-end">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
                          fill="#1F1F1F"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {getTotalPremium(apiResponse, confirmedPaymentMode).accidentPremium[
                  getPaymentModeKey(confirmedPaymentMode)
                ] > 0 && (
                  <div className="bg-[#F6EDDD] px-2 md:px-4 lg:px-1 py-1.5 lg:py-1 xl:px-4 xl:py-1.5 w-full 2xl:w-[80%] mx-auto rounded-full flex items-center space-x-2">
                    <Checkbox
                      className={brandCheckbox}
                      checked={isAccidentSelected}
                      onCheckedChange={handleAccidentToggle}
                      aria-label="Toggle Accident coverage"
                      id="acc-left"
                    />
                    <div
                      className="underline underline-offset-4 text-[10px] xl:text-xs cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={handleAccidentToggle}
                    >
                      {isAccidentSelected
                        ? 'Remove accident coverage for'
                        : "Prone to accidents? Let's get you covered in"}{' '}
                      {`৳${Math.ceil(getTotalPremium(apiResponse, confirmedPaymentMode).accidentPremium[getPaymentModeKey(confirmedPaymentMode)]).toLocaleString()}`}{' '}
                      taka <span className="font-bold">{confirmedPaymentMode}</span>!
                    </div>
                    <div className="flex-1 flex justify-end">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
                          fill="#1F1F1F"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {(formData?.PlanCode === 15 ||
                  formData?.PlanCode === 16 ||
                  formData?.PlanCode === 17) &&
                  showApiResponse && (
                    <div className="bg-[#F6EDDD] px-2 md:px-4 lg:px-1 py-1.5 lg:py-1 xl:px-4 xl:py-1.5 w-full 2xl:w-[80%] mx-auto rounded-full flex justify-center items-center space-x-2">
                      <div className="text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] font-medium">
                        <div className="flex space-x-3">
                          <div className="text-[#434342]">Sum Assured: </div>
                          <div className="text-[#FF6600]">
                            {' '}
                            ৳{' '}
                            {Math.ceil(
                              apiResponse?.dps_or_single_payment_sum_assured,
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
          {/* Calculate Again Button - Only show on mobile when results are available */}
          {apiResponse && (
            <div className="flex justify-center items-center lg:hidden ">
              <GlobalButton
                onClick={handleCalculateAgain}
                className=""
                variant="secondary"
                text="Calculate Again"
              />
            </div>
          )}
        </div>
        {/* Right Side - Form Section (order-1 on mobile, order-2 on lg+) */}
        <div ref={formRef} className="lg:p-1 xl:p-2 2xl:p-3 lg:pr-0 z-10 order-1 lg:order-2">
          <QuoteForm
            formData={formData}
            setFormData={setFormData}
            onApiResponse={handleApiResponse}
            payloadData={data}
            setShowApiResponse={setShowApiResponse}
            onMetaChange={(patch) => setQuoteMeta((prev) => mergeQuoteMeta(prev, patch))} // ✅ ADD THIS
            onMetaReset={() => setQuoteMeta({})} // ✅ keep/reset meta here
          />
        </div>
      </div>

      {apiResponse &&
        showApiResponse &&
        (formData?.PlanCode === 6 ||
          formData?.PlanCode === 8 ||
          formData?.PlanCode === 9 ||
          formData?.PlanCode === 10) && (
          <div className="flex justify-center items-center mt-4">
            <GlobalButton variant="outline" onClick={() => setPdfOpen(true)}>
              <LocalizedString en="Get A Quote Now" bn="আপনার প্রিমিয়াম ক্যালকুলেট করুন" />
            </GlobalButton>

            {pdfRequestBody && (
              <QuotePdfModal
                open={pdfOpen}
                onOpenChange={setPdfOpen}
                requestBody={pdfRequestBody}
              />
            )}
          </div>
        )}

      {/* bg image */}
      {/* left rotate image */}
      <div
        className="hidden lg:block  
        lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px] rounded-[20px] z-0
        absolute lg:top-[90px] xl:top-[100px] 2xl:top-[150px] lg:right-[140px] xl:right-[230px] 2xl:right-[200px] opacity-20"
      >
        {typeof data?.backgroundImage1 === 'object' && data?.backgroundImage1?.url && (
          <Image
            // src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/quotebg.jpg`}
            src={data?.backgroundImage1?.url || ''}
            alt="Quote background"
            fill
            className="
        inset-0
        rounded-[20px] z-0 
        object-cover object-center object-no-repeat"
            style={{
              transform: 'rotate(-7deg)',
              transformOrigin: 'top left',
            }}
            sizes="(max-width: 1349px) 300px , 500px"
            placeholder="blur"
            blurDataURL={data?.backgroundImage1BlurDataURL || ''}
          />
        )}
      </div>
      {/* right rotate image */}
      <div
        className="hidden lg:block 
        lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px] rounded-[20px] z-0 opacity-20 
        absolute lg:top-[90px] xl:top-[100px] 2xl:top-[150px] lg:-right-[50px] xl:-right-[90px] 2xl:-right-[200px]"
      >
        {typeof data?.backgroundImage2 === 'object' && data?.backgroundImage2?.url && (
          <Image
            // src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/quotebg.jpg`}
            src={data?.backgroundImage2?.url || ''}
            alt="Quote background"
            fill
            className="
        inset-0
        rounded-[20px] z-0 
        object-cover object-center object-no-repeat"
            style={{
              transform: 'rotate(7deg)',
              transformOrigin: 'top right',
            }}
            sizes="(max-width: 1349px) 300px , 500px"
            placeholder="blur"
            blurDataURL={data?.backgroundImage2BlurDataURL || ''}
          />
        )}
      </div>
    </div>
  )
}

export default QuoteSection
