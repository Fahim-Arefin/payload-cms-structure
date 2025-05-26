// 'use client'

// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect } from 'react'
// import { useState } from 'react'
// type Props = {
//   className?: string
// }

// function Navbar({ className }: Props) {
//   const NAV_ITEMS = [
//     { href: '/', label: 'Home' },
//     { href: '/about-us', label: 'About Us' },
//     {
//       label: 'Solutions',
//       children: [
//         { href: '/solutions/individual', label: 'Individual Plans' },
//         { href: '/solutions/group', label: 'Group Insurance' },
//       ],
//     },
//     { href: '/pay-premium', label: 'Pay Premium' },
//     {
//       label: 'Claims',
//       children: [
//         { href: '/claims/process', label: 'Claim Process' },
//         { href: '/claims/track', label: 'Track Claim' },
//       ],
//     },
//     { href: '/my-policy', label: 'My Policy' },
//     { href: '/support', label: 'Support' },
//   ]

//   const pathname = usePathname()

//   const [showNavbar, setShowNavbar] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setShowNavbar(false) // hide on scroll down
//       } else {
//         setShowNavbar(true) // show on scroll up
//       }

//       setLastScrollY(currentScrollY)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [lastScrollY])

//   return (
//     <div
//       className={`font-avenir h-[60px] md:h-[80px] 2xl:h-[105px] lg:w-[95%] 2xl:w-[90%] mx-auto rounded-[82px] px-4 lg:px-[72px]
//       flex justify-between items-center gap-4 ${className}`}
//     >
//       {/* Background Image Layer */}
//       <div className="absolute inset-0 bg-[url('/assets/navbarimg.jpg')] bg-cover bg-center opacity-75 z-0 lg:rounded-[82px]" />

//       {/* lOGO */}
//       <div className="z-10 w-[80px] h-[70px] md:w-[100px] md:h-[80px] 2xl:w-[150px] 2xl:h-[100px] flex items-center justify-center">
//         <svg
//           // width="165"
//           // height="115"
//           viewBox="0 0 165 115"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M36.0179 25.7485C36.0179 27.5436 35.3752 28.9741 34.1178 30.068C32.9163 31.0777 31.4074 31.5826 29.5911 31.5826H15.2567V28.3009H29.5911C30.4853 28.3009 31.2677 28.1046 31.9383 27.6838C32.6927 27.179 33.056 26.5058 33.056 25.6643C33.056 24.8229 32.6648 24.1497 31.9104 23.7009C31.2677 23.3082 30.4853 23.1119 29.5911 23.1119H20.7334C19.1127 23.1119 17.7435 22.6631 16.6259 21.7655C15.4523 20.7838 14.8655 19.4936 14.8655 17.8948C14.8655 16.296 15.4523 15.0338 16.6259 14.0521C17.7156 13.1546 19.0848 12.7058 20.7334 12.7058H34.9002V15.9875H20.7334C20.1187 15.9875 19.5877 16.1558 19.1407 16.5204C18.6936 16.857 18.498 17.3338 18.498 17.9229C18.498 18.5399 18.7215 19.0168 19.1407 19.3253C19.5877 19.6619 20.1187 19.8302 20.7334 19.8302H29.5911C31.4074 19.8302 32.9163 20.3631 34.1178 21.4009C35.3752 22.5229 36.0179 23.9533 36.0179 25.7485ZM57.9806 31.5826H54.7114V23.729H43.6741V20.4472H54.7114V12.7058H57.9806V31.5826ZM42.1932 31.5826H38.9239V12.7058H42.1932V31.5826ZM85.3922 31.5826L81.2008 31.5546L78.0433 26.2814H69.1297L71.1136 23.0277H76.0873L72.8181 17.5863L64.3515 31.5546H60.1322L70.3312 14.529C70.5827 14.0802 70.9459 13.6875 71.393 13.3229C71.9519 12.9021 72.4269 12.6777 72.874 12.6777C73.349 12.6777 73.8519 12.8741 74.3549 13.2948C74.802 13.6033 75.1652 14.0241 75.4447 14.5009L85.3922 31.5826ZM105.706 29.9277C105.706 31.1338 105.287 31.7509 104.477 31.7509C103.862 31.7509 103.191 31.3863 102.437 30.629L90.3938 18.4838V31.5826H87.1525V14.3326C87.1525 13.8838 87.2643 13.5192 87.5158 13.1826C87.7673 12.8741 88.1026 12.7058 88.5217 12.7058C89.1364 12.7058 89.7512 13.0143 90.3938 13.6875L102.437 25.8046V12.7058H105.706V29.9277ZM127.054 15.9875H119.65V31.5546H116.408V15.9875H108.976V12.7058H127.026V15.9875H127.054ZM147.396 31.5826L137.449 14.529C137.169 14.0521 136.806 13.6314 136.387 13.2948C135.884 12.8741 135.381 12.6777 134.906 12.6777C134.459 12.6777 133.956 12.9021 133.425 13.3229C132.978 13.6875 132.615 14.1082 132.363 14.529L122.164 31.5546H126.384L134.85 17.5863L138.12 23.0277H133.146L131.162 26.2814H140.075L143.233 31.5546L147.396 31.5826Z"
//             fill="#434342"
//           />
//           <path
//             d="M25.8187 90.9899H47.8374V101.2H15.3403V42.4375H25.8187V90.9899Z"
//             fill="#9C8639"
//           />
//           <path d="M66.5029 65.4658H56.4436V101.172H66.5029V65.4658Z" fill="#9C8639" />
//           <path
//             d="M84.1625 101.2V65.4658H77.3167V56.8829H84.1625V53.8536C84.1625 48.861 85.5317 45.0183 88.298 42.2975C91.0643 39.5768 94.9204 38.2305 99.8941 38.2305C101.654 38.2305 103.555 38.4829 105.538 38.9878L105.287 46.8975C104.169 46.6731 102.884 46.561 101.431 46.561C96.6249 46.561 94.2218 49.0292 94.2218 53.9939V56.911H103.331V65.4939H94.2218V101.2H84.1625Z"
//             fill="#9C8639"
//           />
//           <path
//             d="M129.457 102.35C123.086 102.35 117.889 100.331 113.949 96.2917C109.981 92.2526 107.998 86.8953 107.998 80.1636V78.9295C107.998 74.4417 108.864 70.4307 110.596 66.8965C112.329 63.3624 114.76 60.6136 117.861 58.6502C120.991 56.6868 124.456 55.7051 128.312 55.7051C134.431 55.7051 139.125 57.6685 142.451 61.5673C145.776 65.4661 147.452 71.0197 147.452 78.1722V82.2392H118.141C118.448 85.9697 119.677 88.8868 121.857 91.0465C124.037 93.2063 126.747 94.3002 130.044 94.3002C134.655 94.3002 138.427 92.4209 141.305 88.6904L146.726 93.8795C144.937 96.5722 142.534 98.6478 139.545 100.134C136.555 101.593 133.202 102.35 129.457 102.35ZM128.256 63.7831C125.49 63.7831 123.254 64.7648 121.55 66.7002C119.845 68.6356 118.755 71.3563 118.308 74.8063H137.505V74.049C137.281 70.6551 136.387 68.1026 134.822 66.3636C133.23 64.6526 131.05 63.7831 128.256 63.7831Z"
//             fill="#9C8639"
//           />
//           <path
//             d="M61.138 60.137C66.9868 60.137 71.7282 55.3775 71.7282 49.5065C71.7282 43.6354 66.9868 38.876 61.138 38.876C55.2892 38.876 50.5479 43.6354 50.5479 49.5065C50.5479 55.3775 55.2892 60.137 61.138 60.137Z"
//             fill="#ED7125"
//           />
//         </svg>
//       </div>

//       {/* Links */}
//       <div className="z-10 2xl:flex-1 hidden lg:block">
//         <ul className="flex items-center justify-center space-x-6 2xl:space-x-12 text-[12px] lg:text-[14px] xl:text-[22px] text-[#1E1E1E] font-semibold">
//           {NAV_ITEMS.map((item) => (
//             <li key={item.label} className="relative group">
//               {item.children ? (
//                 <div className="relative group">
//                   <button className="bg-transparent font-medium text-[#1E1E1E] hover:text-orange-500 focus:outline-none">
//                     <span className="flex items-center gap-1">
//                       {item.label}
//                       <svg
//                         className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-transform duration-200"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </span>
//                   </button>

//                   {/* Dropdown wrapper must be inside the same group */}
//                   <div className="absolute top-full left-0 mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white shadow-md rounded-md z-50">
//                     <ul className="p-4 grid gap-2 w-48">
//                       {item.children.map((child) => (
//                         <li key={child.href}>
//                           <Link
//                             href={child.href}
//                             className={cn(
//                               'block px-3 py-1 rounded-md text-sm text-[#1E1E1E] hover:bg-orange-50 transition',
//                               pathname === child.href && 'text-orange-600 font-semibold',
//                             )}
//                           >
//                             {child.label}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     'font-medium transition hover:text-orange-500',
//                     pathname === item.href
//                       ? 'text-black font-bold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-orange-500'
//                       : 'text-gray-700',
//                   )}
//                 >
//                   {item.label}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* talk icon */}
//       <div className="z-10 hidden lg:flex items-center space-x-4 ">
//         <div className="w-[40px] h-[40px] 2xl:w-[62px] 2xl:h-[62px] ">
//           <svg
//             // width="62"
//             // height="62"
//             viewBox="0 0 62 62"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {/* <!-- Orange background circle --> */}
//             <circle cx="31" cy="31" r="31" fill="#ED7125" />

//             {/* <!-- Phone icon centered using transform --> */}
//             <g transform="translate(20, 19)">
//               {/* <!-- This moves the phone icon to center visually --> */}
//               <path
//                 d="M19.2732 13.2382C19.0303 13.2382 18.7764 13.1537 18.5335 13.0933C18.0417 12.9747 17.5584 12.8173 17.0873 12.6222C16.5752 12.4184 16.0122 12.429 15.5068 12.6519C15.0014 12.8749 14.5892 13.2945 14.3495 13.8301L14.1066 14.3736C13.0314 13.7191 12.0433 12.9063 11.1701 11.9579C10.3032 11.0025 9.56031 9.92151 8.96216 8.74508L9.42582 8.40689C9.91528 8.14469 10.2988 7.6937 10.5026 7.14071C10.7064 6.58772 10.7161 5.9718 10.5298 5.41147C10.3545 4.89503 10.2107 4.36645 10.0992 3.82921C10.044 3.56349 9.99988 3.28569 9.96677 3.00788C9.8327 2.15711 9.42541 1.38666 8.81822 0.835284C8.21104 0.283906 7.44387 -0.0121675 6.65488 0.000383249H3.34299C2.86721 -0.00450429 2.39606 0.102824 1.96161 0.31506C1.52715 0.527297 1.1396 0.839459 0.82532 1.2303C0.511044 1.62113 0.277428 2.08147 0.140375 2.57997C0.00332148 3.07846 -0.0339507 3.60342 0.0310955 4.11909C0.619219 9.17916 2.73142 13.8806 6.03406 17.4809C9.33671 21.0811 13.6415 23.375 18.2686 24H18.6881C19.5022 24.0013 20.2882 23.6745 20.896 23.082C21.2453 22.7403 21.5243 22.3213 21.7146 21.8529C21.9049 21.3844 22.0021 20.8771 22 20.3644V16.7409C21.9864 15.902 21.7072 15.0941 21.2099 14.4553C20.7126 13.8165 20.0281 13.3863 19.2732 13.2382ZM19.8252 20.4852C19.825 20.6567 19.7914 20.8262 19.7267 20.9824C19.6619 21.1386 19.5676 21.2779 19.4498 21.3911C19.3268 21.5082 19.1826 21.5957 19.0266 21.6477C18.8706 21.6998 18.7064 21.7152 18.5446 21.693C14.4101 21.113 10.5698 19.0436 7.62936 15.8112C4.68893 12.5789 2.81574 8.36744 2.30526 3.84129C2.28769 3.66436 2.30309 3.48538 2.35052 3.31515C2.39796 3.14491 2.47645 2.98697 2.58125 2.85087C2.6847 2.72203 2.81205 2.61877 2.95481 2.54796C3.09757 2.47715 3.25248 2.44042 3.40922 2.4402H6.72111C6.97784 2.43395 7.22852 2.52581 7.43002 2.69997C7.63151 2.87413 7.77121 3.11969 7.82508 3.39439C7.86923 3.72453 7.92443 4.05064 7.99067 4.37273C8.1182 5.00943 8.28792 5.63513 8.49849 6.24487L6.95294 7.02996C6.8208 7.0963 6.70193 7.19054 6.60316 7.30728C6.5044 7.42401 6.42768 7.56094 6.37742 7.71021C6.32715 7.85947 6.30434 8.01813 6.31027 8.17707C6.31621 8.33601 6.35078 8.4921 6.412 8.63638C8.00083 12.3598 10.7365 15.3529 14.1397 17.0912C14.4085 17.212 14.71 17.212 14.9788 17.0912C15.1164 17.0373 15.243 16.9541 15.351 16.8462C15.459 16.7384 15.5464 16.6082 15.608 16.4631L16.2925 14.7722C16.8632 14.9955 17.4457 15.181 18.0367 15.3278C18.3311 15.4002 18.6292 15.4606 18.9309 15.5089C19.182 15.5679 19.4065 15.7207 19.5656 15.9412C19.7248 16.1616 19.8088 16.4359 19.8031 16.7168L19.8252 20.4852Z"
//                 fill="white"
//               />
//             </g>
//           </svg>
//         </div>
//         <div className="text-[12px] lg:text-[14px] xl:text-[22px]">
//           Let’s <span className="text-black font-bold ">Talk</span>
//         </div>
//       </div>

//       {/* mobile menu */}
//       <div className="z-10 lg:hidden">
//         <div className="w-[23px] h-[23px] md:w-[30px] md:h-[30px] ">
//           <svg
//             // width="20"
//             // height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M4 20H0V16H4V20ZM12 20H8V16H12V20ZM20 20H16V16H20V20ZM4 12.001H0V8.00098H4V12.001ZM12 12.001H8V8.00098H12V12.001ZM20 12.001H16V8.00098H20V12.001ZM4 4H0V0H4V4ZM12 4H8V0H12V4ZM20 4H16V0H20V4Z"
//               fill="#9C8639"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

// // update navbar
// 'use client'

// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect } from 'react'
// import { useState } from 'react'
// type Props = {
//   className?: string
// }

// function Navbar({ className }: Props) {
//   const NAV_ITEMS = [
//     { href: '/', label: 'Home' },
//     { href: '/about-us', label: 'About Us' },
//     {
//       label: 'Solutions',
//       children: [
//         { href: '/solutions/individual', label: 'Individual Plans' },
//         { href: '/solutions/group', label: 'Group Insurance' },
//       ],
//     },
//     { href: '/pay-premium', label: 'Pay Premium' },
//     {
//       label: 'Claims',
//       children: [
//         { href: '/claims/process', label: 'Claim Process' },
//         { href: '/claims/track', label: 'Track Claim' },
//       ],
//     },
//     { href: '/my-policy', label: 'My Policy' },
//     { href: '/support', label: 'Support' },
//   ]

//   const pathname = usePathname()

//   const [showNavbar, setShowNavbar] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setShowNavbar(false) // hide on scroll down
//       } else {
//         setShowNavbar(true) // show on scroll up
//       }

//       setLastScrollY(currentScrollY)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [lastScrollY])

//   return (
//     <div
//       // className={`font-avenir h-[60px] md:h-[80px] 2xl:h-[105px] lg:w-[95%] 2xl:w-[90%] mx-auto rounded-[82px] px-4 lg:px-[72px]
//       // flex justify-between items-center gap-4 ${className}`}
//       className={cn(
//         `fixed top-0 lg:top-[80px] 2xl:top-[115px] left-0 right-0 transition-transform duration-500 ease-in-out z-50`,
//         // showNavbar ? 'translate-y-0' : '-translate-y-[220px]',
//         showNavbar ? '-translate-y-[115px]' : '-translate-y-[220px]',
//         `font-avenir h-[60px] md:h-[80px] 2xl:h-[105px] lg:w-[95%] 2xl:w-[90%] mx-auto rounded-[82px] px-4 lg:px-[72px]
//        flex justify-between items-center gap-4`,
//         className,
//       )}
//     >
//       {/* Background Image Layer */}
//       <div className="absolute inset-0 bg-[url('/assets/navbarimg.jpg')] bg-cover bg-center opacity-75 z-0 lg:rounded-[82px]" />

//       {/* lOGO */}
//       <div className="z-10 w-[80px] h-[70px] md:w-[100px] md:h-[80px] 2xl:w-[150px] 2xl:h-[100px] flex items-center justify-center">
//         <svg
//           // width="165"
//           // height="115"
//           viewBox="0 0 165 115"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M36.0179 25.7485C36.0179 27.5436 35.3752 28.9741 34.1178 30.068C32.9163 31.0777 31.4074 31.5826 29.5911 31.5826H15.2567V28.3009H29.5911C30.4853 28.3009 31.2677 28.1046 31.9383 27.6838C32.6927 27.179 33.056 26.5058 33.056 25.6643C33.056 24.8229 32.6648 24.1497 31.9104 23.7009C31.2677 23.3082 30.4853 23.1119 29.5911 23.1119H20.7334C19.1127 23.1119 17.7435 22.6631 16.6259 21.7655C15.4523 20.7838 14.8655 19.4936 14.8655 17.8948C14.8655 16.296 15.4523 15.0338 16.6259 14.0521C17.7156 13.1546 19.0848 12.7058 20.7334 12.7058H34.9002V15.9875H20.7334C20.1187 15.9875 19.5877 16.1558 19.1407 16.5204C18.6936 16.857 18.498 17.3338 18.498 17.9229C18.498 18.5399 18.7215 19.0168 19.1407 19.3253C19.5877 19.6619 20.1187 19.8302 20.7334 19.8302H29.5911C31.4074 19.8302 32.9163 20.3631 34.1178 21.4009C35.3752 22.5229 36.0179 23.9533 36.0179 25.7485ZM57.9806 31.5826H54.7114V23.729H43.6741V20.4472H54.7114V12.7058H57.9806V31.5826ZM42.1932 31.5826H38.9239V12.7058H42.1932V31.5826ZM85.3922 31.5826L81.2008 31.5546L78.0433 26.2814H69.1297L71.1136 23.0277H76.0873L72.8181 17.5863L64.3515 31.5546H60.1322L70.3312 14.529C70.5827 14.0802 70.9459 13.6875 71.393 13.3229C71.9519 12.9021 72.4269 12.6777 72.874 12.6777C73.349 12.6777 73.8519 12.8741 74.3549 13.2948C74.802 13.6033 75.1652 14.0241 75.4447 14.5009L85.3922 31.5826ZM105.706 29.9277C105.706 31.1338 105.287 31.7509 104.477 31.7509C103.862 31.7509 103.191 31.3863 102.437 30.629L90.3938 18.4838V31.5826H87.1525V14.3326C87.1525 13.8838 87.2643 13.5192 87.5158 13.1826C87.7673 12.8741 88.1026 12.7058 88.5217 12.7058C89.1364 12.7058 89.7512 13.0143 90.3938 13.6875L102.437 25.8046V12.7058H105.706V29.9277ZM127.054 15.9875H119.65V31.5546H116.408V15.9875H108.976V12.7058H127.026V15.9875H127.054ZM147.396 31.5826L137.449 14.529C137.169 14.0521 136.806 13.6314 136.387 13.2948C135.884 12.8741 135.381 12.6777 134.906 12.6777C134.459 12.6777 133.956 12.9021 133.425 13.3229C132.978 13.6875 132.615 14.1082 132.363 14.529L122.164 31.5546H126.384L134.85 17.5863L138.12 23.0277H133.146L131.162 26.2814H140.075L143.233 31.5546L147.396 31.5826Z"
//             fill="#434342"
//           />
//           <path
//             d="M25.8187 90.9899H47.8374V101.2H15.3403V42.4375H25.8187V90.9899Z"
//             fill="#9C8639"
//           />
//           <path d="M66.5029 65.4658H56.4436V101.172H66.5029V65.4658Z" fill="#9C8639" />
//           <path
//             d="M84.1625 101.2V65.4658H77.3167V56.8829H84.1625V53.8536C84.1625 48.861 85.5317 45.0183 88.298 42.2975C91.0643 39.5768 94.9204 38.2305 99.8941 38.2305C101.654 38.2305 103.555 38.4829 105.538 38.9878L105.287 46.8975C104.169 46.6731 102.884 46.561 101.431 46.561C96.6249 46.561 94.2218 49.0292 94.2218 53.9939V56.911H103.331V65.4939H94.2218V101.2H84.1625Z"
//             fill="#9C8639"
//           />
//           <path
//             d="M129.457 102.35C123.086 102.35 117.889 100.331 113.949 96.2917C109.981 92.2526 107.998 86.8953 107.998 80.1636V78.9295C107.998 74.4417 108.864 70.4307 110.596 66.8965C112.329 63.3624 114.76 60.6136 117.861 58.6502C120.991 56.6868 124.456 55.7051 128.312 55.7051C134.431 55.7051 139.125 57.6685 142.451 61.5673C145.776 65.4661 147.452 71.0197 147.452 78.1722V82.2392H118.141C118.448 85.9697 119.677 88.8868 121.857 91.0465C124.037 93.2063 126.747 94.3002 130.044 94.3002C134.655 94.3002 138.427 92.4209 141.305 88.6904L146.726 93.8795C144.937 96.5722 142.534 98.6478 139.545 100.134C136.555 101.593 133.202 102.35 129.457 102.35ZM128.256 63.7831C125.49 63.7831 123.254 64.7648 121.55 66.7002C119.845 68.6356 118.755 71.3563 118.308 74.8063H137.505V74.049C137.281 70.6551 136.387 68.1026 134.822 66.3636C133.23 64.6526 131.05 63.7831 128.256 63.7831Z"
//             fill="#9C8639"
//           />
//           <path
//             d="M61.138 60.137C66.9868 60.137 71.7282 55.3775 71.7282 49.5065C71.7282 43.6354 66.9868 38.876 61.138 38.876C55.2892 38.876 50.5479 43.6354 50.5479 49.5065C50.5479 55.3775 55.2892 60.137 61.138 60.137Z"
//             fill="#ED7125"
//           />
//         </svg>
//       </div>

//       {/* Links */}
//       <div className="z-10 2xl:flex-1 hidden lg:block">
//         <ul className="flex items-center justify-center space-x-6 2xl:space-x-12 text-[12px] lg:text-[14px] xl:text-[22px] text-[#1E1E1E] font-semibold">
//           {NAV_ITEMS.map((item) => (
//             <li key={item.label} className="relative group">
//               {item.children ? (
//                 <div className="relative group">
//                   <button className="bg-transparent font-medium text-[#1E1E1E] hover:text-orange-500 focus:outline-none">
//                     <span className="flex items-center gap-1">
//                       {item.label}
//                       <svg
//                         className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-transform duration-200"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </span>
//                   </button>

//                   {/* Dropdown wrapper must be inside the same group */}
//                   <div className="absolute top-full left-0 mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white shadow-md rounded-md z-50">
//                     <ul className="p-4 grid gap-2 w-48">
//                       {item.children.map((child) => (
//                         <li key={child.href}>
//                           <Link
//                             href={child.href}
//                             className={cn(
//                               'block px-3 py-1 rounded-md text-sm text-[#1E1E1E] hover:bg-orange-50 transition',
//                               pathname === child.href && 'text-orange-600 font-semibold',
//                             )}
//                           >
//                             {child.label}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     'font-medium transition hover:text-orange-500',
//                     pathname === item.href
//                       ? 'text-black font-bold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-orange-500'
//                       : 'text-gray-700',
//                   )}
//                 >
//                   {item.label}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* talk icon */}
//       <div className="z-10 hidden lg:flex items-center space-x-4 ">
//         <div className="w-[40px] h-[40px] 2xl:w-[62px] 2xl:h-[62px] ">
//           <svg
//             // width="62"
//             // height="62"
//             viewBox="0 0 62 62"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {/* <!-- Orange background circle --> */}
//             <circle cx="31" cy="31" r="31" fill="#ED7125" />

//             {/* <!-- Phone icon centered using transform --> */}
//             <g transform="translate(20, 19)">
//               {/* <!-- This moves the phone icon to center visually --> */}
//               <path
//                 d="M19.2732 13.2382C19.0303 13.2382 18.7764 13.1537 18.5335 13.0933C18.0417 12.9747 17.5584 12.8173 17.0873 12.6222C16.5752 12.4184 16.0122 12.429 15.5068 12.6519C15.0014 12.8749 14.5892 13.2945 14.3495 13.8301L14.1066 14.3736C13.0314 13.7191 12.0433 12.9063 11.1701 11.9579C10.3032 11.0025 9.56031 9.92151 8.96216 8.74508L9.42582 8.40689C9.91528 8.14469 10.2988 7.6937 10.5026 7.14071C10.7064 6.58772 10.7161 5.9718 10.5298 5.41147C10.3545 4.89503 10.2107 4.36645 10.0992 3.82921C10.044 3.56349 9.99988 3.28569 9.96677 3.00788C9.8327 2.15711 9.42541 1.38666 8.81822 0.835284C8.21104 0.283906 7.44387 -0.0121675 6.65488 0.000383249H3.34299C2.86721 -0.00450429 2.39606 0.102824 1.96161 0.31506C1.52715 0.527297 1.1396 0.839459 0.82532 1.2303C0.511044 1.62113 0.277428 2.08147 0.140375 2.57997C0.00332148 3.07846 -0.0339507 3.60342 0.0310955 4.11909C0.619219 9.17916 2.73142 13.8806 6.03406 17.4809C9.33671 21.0811 13.6415 23.375 18.2686 24H18.6881C19.5022 24.0013 20.2882 23.6745 20.896 23.082C21.2453 22.7403 21.5243 22.3213 21.7146 21.8529C21.9049 21.3844 22.0021 20.8771 22 20.3644V16.7409C21.9864 15.902 21.7072 15.0941 21.2099 14.4553C20.7126 13.8165 20.0281 13.3863 19.2732 13.2382ZM19.8252 20.4852C19.825 20.6567 19.7914 20.8262 19.7267 20.9824C19.6619 21.1386 19.5676 21.2779 19.4498 21.3911C19.3268 21.5082 19.1826 21.5957 19.0266 21.6477C18.8706 21.6998 18.7064 21.7152 18.5446 21.693C14.4101 21.113 10.5698 19.0436 7.62936 15.8112C4.68893 12.5789 2.81574 8.36744 2.30526 3.84129C2.28769 3.66436 2.30309 3.48538 2.35052 3.31515C2.39796 3.14491 2.47645 2.98697 2.58125 2.85087C2.6847 2.72203 2.81205 2.61877 2.95481 2.54796C3.09757 2.47715 3.25248 2.44042 3.40922 2.4402H6.72111C6.97784 2.43395 7.22852 2.52581 7.43002 2.69997C7.63151 2.87413 7.77121 3.11969 7.82508 3.39439C7.86923 3.72453 7.92443 4.05064 7.99067 4.37273C8.1182 5.00943 8.28792 5.63513 8.49849 6.24487L6.95294 7.02996C6.8208 7.0963 6.70193 7.19054 6.60316 7.30728C6.5044 7.42401 6.42768 7.56094 6.37742 7.71021C6.32715 7.85947 6.30434 8.01813 6.31027 8.17707C6.31621 8.33601 6.35078 8.4921 6.412 8.63638C8.00083 12.3598 10.7365 15.3529 14.1397 17.0912C14.4085 17.212 14.71 17.212 14.9788 17.0912C15.1164 17.0373 15.243 16.9541 15.351 16.8462C15.459 16.7384 15.5464 16.6082 15.608 16.4631L16.2925 14.7722C16.8632 14.9955 17.4457 15.181 18.0367 15.3278C18.3311 15.4002 18.6292 15.4606 18.9309 15.5089C19.182 15.5679 19.4065 15.7207 19.5656 15.9412C19.7248 16.1616 19.8088 16.4359 19.8031 16.7168L19.8252 20.4852Z"
//                 fill="white"
//               />
//             </g>
//           </svg>
//         </div>
//         <div className="text-[12px] lg:text-[14px] xl:text-[22px]">
//           Let’s <span className="text-black font-bold ">Talk</span>
//         </div>
//       </div>

//       {/* mobile menu */}
//       <div className="z-10 lg:hidden">
//         <div className="w-[23px] h-[23px] md:w-[30px] md:h-[30px] ">
//           <svg
//             // width="20"
//             // height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M4 20H0V16H4V20ZM12 20H8V16H12V20ZM20 20H16V16H20V20ZM4 12.001H0V8.00098H4V12.001ZM12 12.001H8V8.00098H12V12.001ZM20 12.001H16V8.00098H20V12.001ZM4 4H0V0H4V4ZM12 4H8V0H12V4ZM20 4H16V0H20V4Z"
//               fill="#9C8639"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

// update navbar
'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useState } from 'react'
type Props = {
  className?: string
}

function Navbar({ className }: Props) {
  const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    {
      label: 'Solutions',
      children: [
        { href: '/solutions/individual', label: 'Individual Plans' },
        { href: '/solutions/group', label: 'Group Insurance' },
      ],
    },
    { href: '/pay-premium', label: 'Pay Premium' },
    {
      label: 'Claims',
      children: [
        { href: '/claims/process', label: 'Claim Process' },
        { href: '/claims/track', label: 'Track Claim' },
      ],
    },
    { href: '/my-policy', label: 'My Policy' },
    { href: '/support', label: 'Support' },
  ]

  const pathname = usePathname()

  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [forceTopZero, setForceTopZero] = useState(false)

  // useEffect(() => {
  //   let scrollTimeout: NodeJS.Timeout

  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY

  //     // Cancel idle timeout if user is scrolling
  //     if (scrollTimeout) clearTimeout(scrollTimeout)

  //     // If scroll < 300px, ignore idle behavior
  //     if (currentScrollY < 300) {
  //       setForceTopZero(false)
  //       setShowNavbar(true)
  //       setLastScrollY(currentScrollY)
  //       return
  //     }

  //     // Detect scroll direction
  //     if (currentScrollY > lastScrollY) {
  //       setShowNavbar(false) // scroll down
  //     } else {
  //       setShowNavbar(true) // scroll up
  //     }

  //     // After scroll, wait 2s idle and then show navbar at top-0
  //     scrollTimeout = setTimeout(() => {
  //       setForceTopZero(true)
  //       setShowNavbar(true)
  //     }, 2000)

  //     setLastScrollY(currentScrollY)
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //     if (scrollTimeout) clearTimeout(scrollTimeout)
  //   }
  // }, [lastScrollY])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY

      // Clear idle timeout
      if (scrollTimeout) clearTimeout(scrollTimeout)

      // Case: Inside first 300px — reset all
      if (currentY < 300) {
        setForceTopZero(false)
        setShowNavbar(true)
        setLastScrollY(currentY)
        return
      }

      // Case: Scrolling up past 300px → show at top-0
      if (currentY < lastY) {
        setForceTopZero(true)
        setShowNavbar(true)
      }
      // Case: Scrolling down → hide
      else if (currentY > lastY) {
        setShowNavbar(false)
      }

      // Set idle timer (after 2s of no scroll)
      scrollTimeout = setTimeout(() => {
        if (currentY > 300) {
          setForceTopZero(true)
          setShowNavbar(true)
        }
      }, 2000)

      lastY = currentY
      setLastScrollY(currentY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Set on client only
    setWindowWidth(window.innerWidth)

    // Optional: update on resize too
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      // className={cn(
      //   `fixed left-0 right-0 transition-transform duration-500 ease-in-out z-50`,
      //   forceTopZero ? 'top-[60px]' : 'top-0 lg:top-[80px] 2xl:top-[115px]',
      //   showNavbar ? 'translate-y-0' : '-translate-y-[220px]',
      //   `font-avenir h-[60px] md:h-[80px] 2xl:h-[105px] lg:w-[95%] 2xl:w-[90%] mx-auto rounded-[82px] px-4 lg:px-[72px] flex justify-between items-center gap-4`,
      //   className,
      // )}
      // className={cn(
      //   `fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out`,
      //   showNavbar ? 'translate-y-0' : '-translate-y-[220px]',
      //   `font-avenir h-[60px] md:h-[80px] 2xl:h-[105px] lg:w-[95%] 2xl:w-[90%] mx-auto rounded-[82px] px-4 lg:px-[72px] flex justify-between items-center gap-4`,
      //   className,
      // )}
      // style={{
      //   top: forceTopZero ? 60 : windowWidth >= 1536 ? 115 : windowWidth >= 1024 ? 80 : 0,
      // }}
      className={cn(
        `fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out`,
        showNavbar ? 'translate-y-0' : '-translate-y-[220px]',
        `font-avenir h-[60px] md:h-[80px] 2xl:h-[105px] lg:w-[95%] 2xl:w-[90%] mx-auto rounded-[82px] px-4 lg:px-[72px] flex justify-between items-center gap-4`,
        className,
      )}
      style={{
        top: windowWidth < 1024 ? 0 : forceTopZero ? 60 : windowWidth >= 1536 ? 115 : 80,
      }}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-white shadow-custom-black bg-cover bg-center opacity-75 z-0 lg:rounded-[82px]" />

      {/* lOGO */}
      <div className="z-10 w-[80px] h-[70px] md:w-[100px] md:h-[80px] 2xl:w-[150px] 2xl:h-[100px] flex items-center justify-center">
        <svg
          // width="165"
          // height="115"
          viewBox="0 0 165 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.0179 25.7485C36.0179 27.5436 35.3752 28.9741 34.1178 30.068C32.9163 31.0777 31.4074 31.5826 29.5911 31.5826H15.2567V28.3009H29.5911C30.4853 28.3009 31.2677 28.1046 31.9383 27.6838C32.6927 27.179 33.056 26.5058 33.056 25.6643C33.056 24.8229 32.6648 24.1497 31.9104 23.7009C31.2677 23.3082 30.4853 23.1119 29.5911 23.1119H20.7334C19.1127 23.1119 17.7435 22.6631 16.6259 21.7655C15.4523 20.7838 14.8655 19.4936 14.8655 17.8948C14.8655 16.296 15.4523 15.0338 16.6259 14.0521C17.7156 13.1546 19.0848 12.7058 20.7334 12.7058H34.9002V15.9875H20.7334C20.1187 15.9875 19.5877 16.1558 19.1407 16.5204C18.6936 16.857 18.498 17.3338 18.498 17.9229C18.498 18.5399 18.7215 19.0168 19.1407 19.3253C19.5877 19.6619 20.1187 19.8302 20.7334 19.8302H29.5911C31.4074 19.8302 32.9163 20.3631 34.1178 21.4009C35.3752 22.5229 36.0179 23.9533 36.0179 25.7485ZM57.9806 31.5826H54.7114V23.729H43.6741V20.4472H54.7114V12.7058H57.9806V31.5826ZM42.1932 31.5826H38.9239V12.7058H42.1932V31.5826ZM85.3922 31.5826L81.2008 31.5546L78.0433 26.2814H69.1297L71.1136 23.0277H76.0873L72.8181 17.5863L64.3515 31.5546H60.1322L70.3312 14.529C70.5827 14.0802 70.9459 13.6875 71.393 13.3229C71.9519 12.9021 72.4269 12.6777 72.874 12.6777C73.349 12.6777 73.8519 12.8741 74.3549 13.2948C74.802 13.6033 75.1652 14.0241 75.4447 14.5009L85.3922 31.5826ZM105.706 29.9277C105.706 31.1338 105.287 31.7509 104.477 31.7509C103.862 31.7509 103.191 31.3863 102.437 30.629L90.3938 18.4838V31.5826H87.1525V14.3326C87.1525 13.8838 87.2643 13.5192 87.5158 13.1826C87.7673 12.8741 88.1026 12.7058 88.5217 12.7058C89.1364 12.7058 89.7512 13.0143 90.3938 13.6875L102.437 25.8046V12.7058H105.706V29.9277ZM127.054 15.9875H119.65V31.5546H116.408V15.9875H108.976V12.7058H127.026V15.9875H127.054ZM147.396 31.5826L137.449 14.529C137.169 14.0521 136.806 13.6314 136.387 13.2948C135.884 12.8741 135.381 12.6777 134.906 12.6777C134.459 12.6777 133.956 12.9021 133.425 13.3229C132.978 13.6875 132.615 14.1082 132.363 14.529L122.164 31.5546H126.384L134.85 17.5863L138.12 23.0277H133.146L131.162 26.2814H140.075L143.233 31.5546L147.396 31.5826Z"
            fill="#434342"
          />
          <path
            d="M25.8187 90.9899H47.8374V101.2H15.3403V42.4375H25.8187V90.9899Z"
            fill="#9C8639"
          />
          <path d="M66.5029 65.4658H56.4436V101.172H66.5029V65.4658Z" fill="#9C8639" />
          <path
            d="M84.1625 101.2V65.4658H77.3167V56.8829H84.1625V53.8536C84.1625 48.861 85.5317 45.0183 88.298 42.2975C91.0643 39.5768 94.9204 38.2305 99.8941 38.2305C101.654 38.2305 103.555 38.4829 105.538 38.9878L105.287 46.8975C104.169 46.6731 102.884 46.561 101.431 46.561C96.6249 46.561 94.2218 49.0292 94.2218 53.9939V56.911H103.331V65.4939H94.2218V101.2H84.1625Z"
            fill="#9C8639"
          />
          <path
            d="M129.457 102.35C123.086 102.35 117.889 100.331 113.949 96.2917C109.981 92.2526 107.998 86.8953 107.998 80.1636V78.9295C107.998 74.4417 108.864 70.4307 110.596 66.8965C112.329 63.3624 114.76 60.6136 117.861 58.6502C120.991 56.6868 124.456 55.7051 128.312 55.7051C134.431 55.7051 139.125 57.6685 142.451 61.5673C145.776 65.4661 147.452 71.0197 147.452 78.1722V82.2392H118.141C118.448 85.9697 119.677 88.8868 121.857 91.0465C124.037 93.2063 126.747 94.3002 130.044 94.3002C134.655 94.3002 138.427 92.4209 141.305 88.6904L146.726 93.8795C144.937 96.5722 142.534 98.6478 139.545 100.134C136.555 101.593 133.202 102.35 129.457 102.35ZM128.256 63.7831C125.49 63.7831 123.254 64.7648 121.55 66.7002C119.845 68.6356 118.755 71.3563 118.308 74.8063H137.505V74.049C137.281 70.6551 136.387 68.1026 134.822 66.3636C133.23 64.6526 131.05 63.7831 128.256 63.7831Z"
            fill="#9C8639"
          />
          <path
            d="M61.138 60.137C66.9868 60.137 71.7282 55.3775 71.7282 49.5065C71.7282 43.6354 66.9868 38.876 61.138 38.876C55.2892 38.876 50.5479 43.6354 50.5479 49.5065C50.5479 55.3775 55.2892 60.137 61.138 60.137Z"
            fill="#ED7125"
          />
        </svg>
      </div>

      {/* Links */}
      <div className="z-10 2xl:flex-1 hidden lg:block">
        <ul className="flex items-center justify-center space-x-6 2xl:space-x-12 text-[12px] lg:text-[14px] xl:text-[22px] text-[#1E1E1E] font-semibold">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative group">
              {item.children ? (
                <div className="relative group">
                  <button className="bg-transparent font-medium text-[#1E1E1E] hover:text-orange-500 focus:outline-none">
                    <span className="flex items-center gap-1">
                      {item.label}
                      <svg
                        className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {/* Dropdown wrapper must be inside the same group */}
                  <div className="absolute top-full left-0 mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white shadow-md rounded-md z-50">
                    <ul className="p-4 grid gap-2 w-48">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block px-3 py-1 rounded-md text-sm text-[#1E1E1E] hover:bg-orange-50 transition',
                              pathname === child.href && 'text-orange-600 font-semibold',
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'font-medium transition hover:text-orange-500',
                    pathname === item.href
                      ? 'text-black font-bold relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-orange-500'
                      : 'text-gray-700',
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* talk icon */}
      <div className="z-10 hidden lg:flex items-center space-x-4 ">
        <div className="w-[40px] h-[40px] 2xl:w-[62px] 2xl:h-[62px] ">
          <svg
            // width="62"
            // height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Orange background circle --> */}
            <circle cx="31" cy="31" r="31" fill="#ED7125" />

            {/* <!-- Phone icon centered using transform --> */}
            <g transform="translate(20, 19)">
              {/* <!-- This moves the phone icon to center visually --> */}
              <path
                d="M19.2732 13.2382C19.0303 13.2382 18.7764 13.1537 18.5335 13.0933C18.0417 12.9747 17.5584 12.8173 17.0873 12.6222C16.5752 12.4184 16.0122 12.429 15.5068 12.6519C15.0014 12.8749 14.5892 13.2945 14.3495 13.8301L14.1066 14.3736C13.0314 13.7191 12.0433 12.9063 11.1701 11.9579C10.3032 11.0025 9.56031 9.92151 8.96216 8.74508L9.42582 8.40689C9.91528 8.14469 10.2988 7.6937 10.5026 7.14071C10.7064 6.58772 10.7161 5.9718 10.5298 5.41147C10.3545 4.89503 10.2107 4.36645 10.0992 3.82921C10.044 3.56349 9.99988 3.28569 9.96677 3.00788C9.8327 2.15711 9.42541 1.38666 8.81822 0.835284C8.21104 0.283906 7.44387 -0.0121675 6.65488 0.000383249H3.34299C2.86721 -0.00450429 2.39606 0.102824 1.96161 0.31506C1.52715 0.527297 1.1396 0.839459 0.82532 1.2303C0.511044 1.62113 0.277428 2.08147 0.140375 2.57997C0.00332148 3.07846 -0.0339507 3.60342 0.0310955 4.11909C0.619219 9.17916 2.73142 13.8806 6.03406 17.4809C9.33671 21.0811 13.6415 23.375 18.2686 24H18.6881C19.5022 24.0013 20.2882 23.6745 20.896 23.082C21.2453 22.7403 21.5243 22.3213 21.7146 21.8529C21.9049 21.3844 22.0021 20.8771 22 20.3644V16.7409C21.9864 15.902 21.7072 15.0941 21.2099 14.4553C20.7126 13.8165 20.0281 13.3863 19.2732 13.2382ZM19.8252 20.4852C19.825 20.6567 19.7914 20.8262 19.7267 20.9824C19.6619 21.1386 19.5676 21.2779 19.4498 21.3911C19.3268 21.5082 19.1826 21.5957 19.0266 21.6477C18.8706 21.6998 18.7064 21.7152 18.5446 21.693C14.4101 21.113 10.5698 19.0436 7.62936 15.8112C4.68893 12.5789 2.81574 8.36744 2.30526 3.84129C2.28769 3.66436 2.30309 3.48538 2.35052 3.31515C2.39796 3.14491 2.47645 2.98697 2.58125 2.85087C2.6847 2.72203 2.81205 2.61877 2.95481 2.54796C3.09757 2.47715 3.25248 2.44042 3.40922 2.4402H6.72111C6.97784 2.43395 7.22852 2.52581 7.43002 2.69997C7.63151 2.87413 7.77121 3.11969 7.82508 3.39439C7.86923 3.72453 7.92443 4.05064 7.99067 4.37273C8.1182 5.00943 8.28792 5.63513 8.49849 6.24487L6.95294 7.02996C6.8208 7.0963 6.70193 7.19054 6.60316 7.30728C6.5044 7.42401 6.42768 7.56094 6.37742 7.71021C6.32715 7.85947 6.30434 8.01813 6.31027 8.17707C6.31621 8.33601 6.35078 8.4921 6.412 8.63638C8.00083 12.3598 10.7365 15.3529 14.1397 17.0912C14.4085 17.212 14.71 17.212 14.9788 17.0912C15.1164 17.0373 15.243 16.9541 15.351 16.8462C15.459 16.7384 15.5464 16.6082 15.608 16.4631L16.2925 14.7722C16.8632 14.9955 17.4457 15.181 18.0367 15.3278C18.3311 15.4002 18.6292 15.4606 18.9309 15.5089C19.182 15.5679 19.4065 15.7207 19.5656 15.9412C19.7248 16.1616 19.8088 16.4359 19.8031 16.7168L19.8252 20.4852Z"
                fill="white"
              />
            </g>
          </svg>
        </div>
        <div className="text-[12px] lg:text-[14px] xl:text-[22px]">
          Let’s <span className="text-black font-bold ">Talk</span>
        </div>
      </div>

      {/* mobile menu */}
      <div className="z-10 lg:hidden">
        <div className="w-[23px] h-[23px] md:w-[30px] md:h-[30px] ">
          <svg
            // width="20"
            // height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 20H0V16H4V20ZM12 20H8V16H12V20ZM20 20H16V16H20V20ZM4 12.001H0V8.00098H4V12.001ZM12 12.001H8V8.00098H12V12.001ZM20 12.001H16V8.00098H20V12.001ZM4 4H0V0H4V4ZM12 4H8V0H12V4ZM20 4H16V0H20V4Z"
              fill="#9C8639"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Navbar
