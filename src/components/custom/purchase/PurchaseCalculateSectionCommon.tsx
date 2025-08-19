// 'use client'

// import AnimatedCounter from '@/components/ui/AnimatedCounter'
// import React, { FC } from 'react'

// type PurchaseCalculateSectionCommonProps = {
//   confirmedPaymentMode: string
//   monthlyPaymentValue: number
//   quaterlyPaymentValue: number
//   halfquaterlyPaymentValue: number
//   yearlyPaymentValue: number
// }

// const PurchaseCalculateSectionCommon: FC<PurchaseCalculateSectionCommonProps> = ({
//   confirmedPaymentMode,
//   monthlyPaymentValue,
//   quaterlyPaymentValue,
//   halfquaterlyPaymentValue,
//   yearlyPaymentValue,
// }) => {
//   return (
//     <>
//       <div className="col-span-2 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:my-3 xl:my-4">
//         <div
//           className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
//             confirmedPaymentMode === 'Monthly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           Monthly
//         </div>
//         <div
//           className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
//             confirmedPaymentMode === 'Monthly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           <AnimatedCounter
//             value={confirmedPaymentMode === 'Monthly' ? monthlyPaymentValue : 0}
//             prefix="৳"
//             showAnimation={confirmedPaymentMode === 'Monthly'}
//             duration={800}
//           />
//         </div>
//       </div>
//       <div className="col-span-2 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
//         <div
//           className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
//             confirmedPaymentMode === 'Quarterly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           Quarterly
//         </div>
//         <div
//           className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
//             confirmedPaymentMode === 'Quarterly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           <AnimatedCounter
//             value={confirmedPaymentMode === 'Quarterly' ? quaterlyPaymentValue : 0}
//             prefix="৳"
//             showAnimation={confirmedPaymentMode === 'Quarterly'}
//             duration={800}
//           />
//         </div>
//       </div>
//       <div className="col-span-2 border-r-2 border-[#D9D9D9] p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
//         <div
//           className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
//             confirmedPaymentMode === 'Half Yearly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           Half Yearly
//         </div>
//         <div
//           className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
//             confirmedPaymentMode === 'Half Yearly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           <AnimatedCounter
//             value={confirmedPaymentMode === 'Half Yearly' ? halfquaterlyPaymentValue : 0}
//             prefix="৳"
//             showAnimation={confirmedPaymentMode === 'Half Yearly'}
//             duration={800}
//           />
//         </div>
//       </div>
//       <div className="col-span-2 p-2 py-2 xl:py-3 lg:mt-2 xl:mt-3">
//         <div
//           className={`text-[12px] lg:text-[14px] xl:text-[16px] font-medium text-center ${
//             confirmedPaymentMode === 'Yearly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           Yearly
//         </div>
//         <div
//           className={`text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-xl font-bold text-center ${
//             confirmedPaymentMode === 'Yearly'
//               ? 'text-[#ED7125] text-[12px] lg:text-[20px] xl:text-[24px] font-bold'
//               : 'text-[#1E1E1E]'
//           }`}
//         >
//           <AnimatedCounter
//             value={confirmedPaymentMode === 'Yearly' ? yearlyPaymentValue : 0}
//             prefix="৳"
//             showAnimation={confirmedPaymentMode === 'Yearly'}
//             duration={800}
//           />
//         </div>
//       </div>
//     </>
//   )
// }

// export default PurchaseCalculateSectionCommon
