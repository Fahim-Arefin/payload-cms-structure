// import QuoteForm from './QuoteForm'
// import React from 'react'

// function QuoteSection() {
//   return (
//     // <div className="relative w-full lg:w-[85%] 2xl:w-[70%] mx-auto px-4 my-24 xl:my-44 font-avenir">
//     <div className="relative font-avenir container-wpm">
//       <div className="grid grid-cols-1 lg:grid-cols-2 z-10">
//         {/* Left Side */}
//         <div className="p-4 lg:pl-0 space-y-8 xl:space-y-11 z-10">
//           {/* Text Container */}
//           <div className="space-y-2 text-center lg:text-left">
//             <div className="text-[#1E1E1E] text-[16px] md:text-[18px] 2xl:text-2xl font-light uppercase">
//               Secure Your
//             </div>
//             <div className="text-[#1E1E1E] global-h1 font-semibold uppercase">
//               Tomorrow, <span className="md:text-[#FF6600]">Today!</span>
//             </div>
//             <p className="global-p1 text-[#1E1E1E] font-light">
//               Get a personalized quote from Shanta Life Insurance and take the first step toward a
//               protected and worry-free future.
//             </p>
//           </div>
//           {/* Info Container */}
//           <div className="hidden md:grid grid-cols-3 bg-[#FFFFFFCC] rounded-b-lg border-t-2 border-[#FF6600]">
//             <div className="col-span-1 border-r-2 border-[#D9D9D9] p-2 py-6 xl:py-9 lg:mt-6 xl:mt-12 ">
//               <div className="text-[#1E1E1E] lg:text-[16px] xl:text-xl font-medium text-center">
//                 Monthly
//               </div>
//               <div className="text-[#1E1E1E] lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-center">
//                 10,000.00
//               </div>
//             </div>
//             <div className="col-span-1 border-r-2 border-[#D9D9D9] p-2 py-6 xl:py-9 lg:mt-6 xl:mt-12">
//               <div className="text-[#ED7125] text-[16px] xl:text-xl font-medium text-center">
//                 Quarterly
//               </div>
//               <div className="text-[#ED7125] text-xl xl:text-2xl 2xl:text-3xl font-bold text-center">
//                 20,000.00
//               </div>
//             </div>
//             <div className="col-span-1 p-2 py-6 xl:py-9 lg:mt-6 xl:mt-12 ">
//               <div className="text-[#1E1E1E] text-[16px] xl:text-xl font-medium text-center">
//                 Yearly
//               </div>
//               <div className="text-[#1E1E1E] text-xl xl:text-2xl 2xl:text-3xl font-bold text-center">
//                 1,00,000.00
//               </div>
//             </div>
//             <div className="col-span-3 py-7 px-10 xl:py-9 xl:px-12 space-y-3">
//               <div className="bg-[#F6EDDD] md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
//                 <div>
//                   <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M7.5 4H16.5V20H7.5V4ZM4.5 8.33333H7.5V20H4.5V8.33333ZM16.5 8.33333H19.5V20H16.5V8.33333Z"
//                       fill="white"
//                     />
//                     <path d="M9.8335 14.666H14.1668V19.9993H9.8335V14.666Z" fill="#92D3F5" />
//                     <path
//                       d="M14.5 7.66667H12.8333V6H11.1667V7.66667H9.5V9.33333H11.1667V11H12.8333V9.33333H14.5V7.66667Z"
//                       fill="#EA5A47"
//                     />
//                     <path
//                       d="M5.6665 10H6.33317V11.6667H5.6665V10ZM5.6665 13.3333H6.33317V15H5.6665V13.3333ZM5.6665 16.6667H6.33317V18.3333H5.6665V16.6667ZM17.6665 10H18.3332V11.6667H17.6665V10ZM17.6665 13.3333H18.3332V15H17.6665V13.3333ZM17.6665 16.6667H18.3332V18.3333H17.6665V16.6667Z"
//                       stroke="#92D3F5"
//                       strokeWidth="0.444444"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M16.5 20V4H7.5V20M16.5 20H7.5M16.5 20H19.5V8.33333H16.5V20ZM7.5 20V8.33333H4.5V20H7.5Z"
//                       stroke="black"
//                       strokeWidth="0.444444"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M11.9998 20V14.6667M6.33317 11.6667H5.6665V10M6.33317 15H5.6665V13.3333M6.33317 18.3333H5.6665V16.6667M18.3332 11.6667H17.6665V10M18.3332 15H17.6665V13.3333M18.3332 18.3333H17.6665V16.6667M9.83317 14.6667H14.1665V20H9.83317V14.6667ZM14.4998 7.66667H12.8332V6H11.1665V7.66667H9.49984V9.33333H11.1665V11H12.8332V9.33333H14.4998V7.66667Z"
//                       stroke="black"
//                       strokeWidth="0.444444"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <div className="underline underline-offset-4 text-xs">
//                   Add 225 taka to Cover 25 Critical Illness!
//                 </div>
//                 {/* this belwo div will be align right of the flex*/}
//                 <div className="flex-1 flex justify-end">
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 16 16"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
//                       fill="#1F1F1F"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <div className="bg-[#F6EDDD]  md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
//                 <div>
//                   <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M7.5 4H16.5V20H7.5V4ZM4.5 8.33333H7.5V20H4.5V8.33333ZM16.5 8.33333H19.5V20H16.5V8.33333Z"
//                       fill="white"
//                     />
//                     <path d="M9.8335 14.666H14.1668V19.9993H9.8335V14.666Z" fill="#92D3F5" />
//                     <path
//                       d="M14.5 7.66667H12.8333V6H11.1667V7.66667H9.5V9.33333H11.1667V11H12.8333V9.33333H14.5V7.66667Z"
//                       fill="#EA5A47"
//                     />
//                     <path
//                       d="M5.6665 10H6.33317V11.6667H5.6665V10ZM5.6665 13.3333H6.33317V15H5.6665V13.3333ZM5.6665 16.6667H6.33317V18.3333H5.6665V16.6667ZM17.6665 10H18.3332V11.6667H17.6665V10ZM17.6665 13.3333H18.3332V15H17.6665V13.3333ZM17.6665 16.6667H18.3332V18.3333H17.6665V16.6667Z"
//                       stroke="#92D3F5"
//                       strokeWidth="0.444444"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M16.5 20V4H7.5V20M16.5 20H7.5M16.5 20H19.5V8.33333H16.5V20ZM7.5 20V8.33333H4.5V20H7.5Z"
//                       stroke="black"
//                       strokeWidth="0.444444"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M11.9998 20V14.6667M6.33317 11.6667H5.6665V10M6.33317 15H5.6665V13.3333M6.33317 18.3333H5.6665V16.6667M18.3332 11.6667H17.6665V10M18.3332 15H17.6665V13.3333M18.3332 18.3333H17.6665V16.6667M9.83317 14.6667H14.1665V20H9.83317V14.6667ZM14.4998 7.66667H12.8332V6H11.1665V7.66667H9.49984V9.33333H11.1665V11H12.8332V9.33333H14.4998V7.66667Z"
//                       stroke="black"
//                       strokeWidth="0.444444"
//                       strokeMiterlimit="10"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <div className="underline underline-offset-4 text-xs">
//                   Add 225 taka to Cover 25 Critical Illness!
//                 </div>
//                 <div className="flex-1 flex justify-end">
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 16 16"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M4.5 3C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V11.5C3 11.8978 3.15804 12.2794 3.43934 12.5607C3.72064 12.842 4.10218 13 4.5 13H11.5C11.8978 13 12.2794 12.842 12.5607 12.5607C12.842 12.2794 13 11.8978 13 11.5V9.27C13 9.13739 13.0527 9.01021 13.1464 8.91645C13.2402 8.82268 13.3674 8.77 13.5 8.77C13.6326 8.77 13.7598 8.82268 13.8536 8.91645C13.9473 9.01021 14 9.13739 14 9.27V11.5C14 12.163 13.7366 12.7989 13.2678 13.2678C12.7989 13.7366 12.163 14 11.5 14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H6.73C6.86261 2 6.98979 2.05268 7.08355 2.14645C7.17732 2.24021 7.23 2.36739 7.23 2.5C7.23 2.63261 7.17732 2.75979 7.08355 2.85355C6.98979 2.94732 6.86261 3 6.73 3H4.5ZM8.77 2.5C8.77 2.36739 8.82268 2.24021 8.91645 2.14645C9.01021 2.05268 9.13739 2 9.27 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.73C14 6.86261 13.9473 6.98979 13.8536 7.08355C13.7598 7.17732 13.6326 7.23 13.5 7.23C13.3674 7.23 13.2402 7.17732 13.1464 7.08355C13.0527 6.98979 13 6.86261 13 6.73V3.708L9.623 7.084C9.57688 7.13176 9.5217 7.16985 9.4607 7.19605C9.3997 7.22226 9.33409 7.23605 9.2677 7.23663C9.20131 7.2372 9.13547 7.22455 9.07402 7.19941C9.01258 7.17427 8.95675 7.13714 8.9098 7.0902C8.86286 7.04325 8.82573 6.98743 8.80059 6.92598C8.77545 6.86453 8.7628 6.79869 8.76337 6.7323C8.76395 6.66591 8.77774 6.6003 8.80395 6.5393C8.83015 6.4783 8.86825 6.42312 8.916 6.377L12.293 3H9.269C9.13639 3 9.00921 2.94732 8.91545 2.85355C8.82168 2.75979 8.769 2.63261 8.769 2.5"
//                       fill="#1F1F1F"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Right Side */}
//         <div className="p-4 lg:pr-0 z-10">
//           <QuoteForm />
//         </div>
//       </div>
//       {/* bg image */}
//       {/* left rotate image */}
//       <div
//         className="hidden lg:block absolute
//         lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px]
//         bg-[url('/assets/quotebg.jpg')] bg-cover bg-center bg-no-repeat rounded-[20px] z-0
//         top-0 lg:right-[140px] xl:right-[230px] 2xl:right-[200px] opacity-20"
//         style={{
//           transform: 'rotate(-7deg)',
//           transformOrigin: 'top left',
//         }}
//       />
//       {/* right rotate image */}
//       <div
//         className="hidden lg:block absolute
//         lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px]
//         bg-[url('/assets/quotebg.jpg')] bg-cover bg-center bg-no-repeat rounded-[20px] z-0
//         top-0 lg:-right-[50px] xl:-right-[90px] 2xl:-right-[200px] opacity-20"
//         style={{
//           transform: 'rotate(7deg)',
//           transformOrigin: 'top right',
//         }}
//       />
//     </div>
//   )
// }

// export default QuoteSection

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import QuoteForm from './QuoteForm'

function QuoteSection() {
  return (
    <div className="relative font-avenir container-wpm md:pb-[70px] lg:pb-[90px] xl:pb-[80px] 2xl:pb-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 z-10">
        {/* Left Side */}
        <div className="p-4 lg:pl-0 space-y-8 xl:space-y-11 z-10">
          {/* Text Container */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="uppercase text-[#1E1E1E] text-[16px] md:text-[18px] 2xl:text-2xl font-light ">
              Secure Your
            </div>
            <div className="uppercase text-[#1E1E1E] global-h1 font-semibold ">
              Tomorrow, <span className="md:text-[#FF6600]">Today!</span>
            </div>
            <p className="global-p1 text-[#1E1E1E] font-light">
              Get a personalized quote from Shanta Life Insurance and take the first step toward a
              protected and worry-free future.
            </p>
          </div>
          {/* Info Container */}
          <div className="hidden md:grid grid-cols-3 bg-[#FFFFFFCC] rounded-b-lg border-t-2 border-[#FF6600]">
            <div className="col-span-1 border-r-2 border-[#D9D9D9] p-2 py-6 xl:py-9 lg:mt-6 xl:mt-12 ">
              <div className="text-[#1E1E1E] lg:text-[16px] xl:text-xl font-medium text-center">
                Monthly
              </div>
              <div className="text-[#1E1E1E] lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-center">
                10,000.00
              </div>
            </div>
            <div className="col-span-1 border-r-2 border-[#D9D9D9] p-2 py-6 xl:py-9 lg:mt-6 xl:mt-12">
              <div className="text-[#ED7125] text-[16px] xl:text-xl font-medium text-center">
                Quarterly
              </div>
              <div className="text-[#ED7125] text-xl xl:text-2xl 2xl:text-3xl font-bold text-center">
                20,000.00
              </div>
            </div>
            <div className="col-span-1 p-2 py-6 xl:py-9 lg:mt-6 xl:mt-12 ">
              <div className="text-[#1E1E1E] text-[16px] xl:text-xl font-medium text-center">
                Yearly
              </div>
              <div className="text-[#1E1E1E] text-xl xl:text-2xl 2xl:text-3xl font-bold text-center">
                1,00,000.00
              </div>
            </div>
            <div className="col-span-3 py-7 px-10 xl:py-9 xl:px-12 space-y-3">
              <div className="bg-[#F6EDDD] md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 4H16.5V20H7.5V4ZM4.5 8.33333H7.5V20H4.5V8.33333ZM16.5 8.33333H19.5V20H16.5V8.33333Z"
                      fill="white"
                    />
                    <path d="M9.8335 14.666H14.1668V19.9993H9.8335V14.666Z" fill="#92D3F5" />
                    <path
                      d="M14.5 7.66667H12.8333V6H11.1667V7.66667H9.5V9.33333H11.1667V11H12.8333V9.33333H14.5V7.66667Z"
                      fill="#EA5A47"
                    />
                    <path
                      d="M5.6665 10H6.33317V11.6667H5.6665V10ZM5.6665 13.3333H6.33317V15H5.6665V13.3333ZM5.6665 16.6667H6.33317V18.3333H5.6665V16.6667ZM17.6665 10H18.3332V11.6667H17.6665V10ZM17.6665 13.3333H18.3332V15H17.6665V13.3333ZM17.6665 16.6667H18.3332V18.3333H17.6665V16.6667Z"
                      stroke="#92D3F5"
                      strokeWidth="0.444444"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 20V4H7.5V20M16.5 20H7.5M16.5 20H19.5V8.33333H16.5V20ZM7.5 20V8.33333H4.5V20H7.5Z"
                      stroke="black"
                      strokeWidth="0.444444"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9998 20V14.6667M6.33317 11.6667H5.6665V10M6.33317 15H5.6665V13.3333M6.33317 18.3333H5.6665V16.6667M18.3332 11.6667H17.6665V10M18.3332 15H17.6665V13.3333M18.3332 18.3333H17.6665V16.6667M9.83317 14.6667H14.1665V20H9.83317V14.6667ZM14.4998 7.66667H12.8332V6H11.1665V7.66667H9.49984V9.33333H11.1665V11H12.8332V9.33333H14.4998V7.66667Z"
                      stroke="black"
                      strokeWidth="0.444444"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="underline underline-offset-4 text-xs">
                  Add 225 taka to Cover 25 Critical Illness!
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
              <div className="bg-[#F6EDDD]  md:px-4 lg:px-1 md:py-1.5 lg:py-1 xl:px-4 xl:py-1.5 md:w-[60%] lg:w-[100%] xl:w-[85%] 2xl:w-[70%] mx-auto rounded-full flex items-center space-x-2">
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 4H16.5V20H7.5V4ZM4.5 8.33333H7.5V20H4.5V8.33333ZM16.5 8.33333H19.5V20H16.5V8.33333Z"
                      fill="white"
                    />
                    <path d="M9.8335 14.666H14.1668V19.9993H9.8335V14.666Z" fill="#92D3F5" />
                    <path
                      d="M14.5 7.66667H12.8333V6H11.1667V7.66667H9.5V9.33333H11.1667V11H12.8333V9.33333H14.5V7.66667Z"
                      fill="#EA5A47"
                    />
                    <path
                      d="M5.6665 10H6.33317V11.6667H5.6665V10ZM5.6665 13.3333H6.33317V15H5.6665V13.3333ZM5.6665 16.6667H6.33317V18.3333H5.6665V16.6667ZM17.6665 10H18.3332V11.6667H17.6665V10ZM17.6665 13.3333H18.3332V15H17.6665V13.3333ZM17.6665 16.6667H18.3332V18.3333H17.6665V16.6667Z"
                      stroke="#92D3F5"
                      strokeWidth="0.444444"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 20V4H7.5V20M16.5 20H7.5M16.5 20H19.5V8.33333H16.5V20ZM7.5 20V8.33333H4.5V20H7.5Z"
                      stroke="black"
                      strokeWidth="0.444444"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9998 20V14.6667M6.33317 11.6667H5.6665V10M6.33317 15H5.6665V13.3333M6.33317 18.3333H5.6665V16.6667M18.3332 11.6667H17.6665V10M18.3332 15H17.6665V13.3333M18.3332 18.3333H17.6665V16.6667M9.83317 14.6667H14.1665V20H9.83317V14.6667ZM14.4998 7.66667H12.8332V6H11.1665V7.66667H9.49984V9.33333H11.1665V11H12.8332V9.33333H14.4998V7.66667Z"
                      stroke="black"
                      strokeWidth="0.444444"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="underline underline-offset-4 text-xs">
                  Add 225 taka to Cover 25 Critical Illness!
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
            </div>
          </div>
          {/* Mobile-only dialog trigger and content */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="md:hidden bg-[#9C8639] text-white rounded-[10px] px-5 py-5 xl:px-6 xl:py-6 w-full">
                Get A Quote Now
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto p-4 md:hidden">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  Get Your Quote
                </DialogTitle>
              </DialogHeader>
              <QuoteForm />
            </DialogContent>
          </Dialog>
        </div>
        {/* Right Side */}
        <div className="hidden md:block p-4 lg:pr-0 z-10">
          <QuoteForm />
        </div>
      </div>
      {/* bg image */}
      {/* left rotate image */}
      <div
        className="hidden lg:block absolute 
        lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px] 
        bg-[url('/assets/quotebg.jpg')] bg-cover bg-center bg-no-repeat rounded-[20px] z-0
        top-0 lg:right-[140px] xl:right-[230px] 2xl:right-[200px] opacity-20"
        style={{
          transform: 'rotate(-7deg)',
          transformOrigin: 'top left',
        }}
      />
      {/* right rotate image */}
      <div
        className="hidden lg:block absolute 
        lg:h-[550px] lg:w-[370px] xl:w-[470px] xl:h-[650px] 2xl:w-[670px] 
        bg-[url('/assets/quotebg.jpg')] bg-cover bg-center bg-no-repeat rounded-[20px] z-0
        top-0 lg:-right-[50px] xl:-right-[90px] 2xl:-right-[200px] opacity-20"
        style={{
          transform: 'rotate(7deg)',
          transformOrigin: 'top right',
        }}
      />
    </div>
  )
}

export default QuoteSection
