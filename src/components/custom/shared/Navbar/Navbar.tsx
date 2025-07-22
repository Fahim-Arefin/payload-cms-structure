// 'use client'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { RiArrowDownSLine } from 'react-icons/ri'
// import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
// import ToolTip from '../ToolTip'

// export default function Navbar() {
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [showNavbar, setShowNavbar] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)
//   const [forceTopZero, setForceTopZero] = useState(false)
//   const [windowWidth, setWindowWidth] = useState<number>(0)
//   const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({})

//   useEffect(() => {
//     let scrollTimeout: NodeJS.Timeout
//     let lastY = window.scrollY

//     const handleScroll = () => {
//       const currentY = window.scrollY
//       if (scrollTimeout) clearTimeout(scrollTimeout)

//       if (currentY < 300) {
//         setForceTopZero(false)
//         setShowNavbar(true)
//         setLastScrollY(currentY)
//         return
//       }

//       if (currentY < lastY) {
//         setForceTopZero(true)
//         setShowNavbar(true)
//       } else if (currentY > lastY) {
//         setShowNavbar(false)
//       }

//       scrollTimeout = setTimeout(() => {
//         if (currentY > 300) {
//           setForceTopZero(true)
//           setShowNavbar(true)
//         }
//       }, 2000)

//       lastY = currentY
//       setLastScrollY(currentY)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//       if (scrollTimeout) clearTimeout(scrollTimeout)
//     }
//   }, [])

//   useEffect(() => {
//     setWindowWidth(window.innerWidth)
//     const handleResize = () => setWindowWidth(window.innerWidth)
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const NAV_ITEMS = [
//     { href: '/', label: 'Home' },
//     { href: '/about-us', label: 'About Us' },
//     {
//       label: 'Solutions',
//       href: '/plans',
//       children: [
//         { href: '/plans/individual', label: 'Individual Plan' },
//         { href: '/plans/corporate', label: 'Corporate Plan' },
//         // { href: '/plans/bancassurance', label: 'Bancassurance Plan' },
//       ],
//     },
//     { href: '/pay-premium', label: 'Pay Premium' },
//     { href: '/claims', label: 'Claims' },
//     { href: '/support', label: 'Support' },
//     { href: '/purchase-now', label: 'Purchase Now' },
//   ]

//   const isActive = (href?: string) => {
//     if (!href) return false
//     return pathname === href || pathname.startsWith(href + '/')
//   }

//   return (
//     <>
//       <nav
//         className={`shadow-md fixed left-0 right-0 transition-all duration-500 ease-in-out font-avenir top-0 lg:top-24 z-50 inset-x-0 container-width
//         px-4 py-2 md:px-8 md:py-3
//         h-[60px] xl:h-[70px] 2xl:h-[80px]
//         w-full lg:w-[81%] xl:w-[76%] 2xl:w-[75%] mx-auto
//         bg-white/70 backdrop-blur-[16.666666px]
//         lg:rounded-[12px] xl:rounded-[14px] 2xl:rounded-[16px]
//         flex items-center justify-between ${showNavbar ? 'translate-y-0 lg:translate-y-[-54px] xl:translate-y-[-52px] 2xl:-translate-y-[40px]' : '-translate-y-[220px]'}`}
//         // style={{
//         //   top: windowWidth < 1024 ? 0 : forceTopZero ? 0 : windowWidth >= 1536 ? 115 : 80,
//         // }}
//       >
//         {/* Logo + Burger */}
//         <div className="flex items-center justify-between w-full lg:w-auto">
//           <div
//             className="flex items-center space-x-1
//           w-fit 2xl:w-[60px]
//           h-[35px] xl:h-[37px] 2xl:h-[40px]"
//           >
//             <Link href="/">
//               <img src="/assets/mainlogo.png" alt="logo" className="h-full w-full max-w-[100px]" />
//             </Link>
//           </div>

//           {/* Burger Icon */}
//           <button
//             onClick={() => setIsMobileMenuOpen(true)}
//             className="lg:hidden text-2xl text-[#1F1F1F]"
//           >
//             <RxHamburgerMenu />
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <ul
//           className="hidden lg:flex
//           lg:space-x-3 xl:space-x-5 2xl:space-x-8
//           lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-[#1E1E1E] items-center lg:leading-6 xl:leading-8"
//         >
//           {NAV_ITEMS.map((item, index) => (
//             <li key={index} className="relative group">
//               {item.children ? (
//                 <>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center space-x-1 relative h-[60px] xl:h-[70px] 2xl:h-[80px]  ${
//                       isActive(item.href)
//                         ? ' after:absolute after:left-0 after:w-full after:h-[4px] after:xl:h-[7px] after:bg-[#ED7125] after:rounded-full after:lg:bottom-[1px]'
//                         : ''
//                     } `}
//                   >
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger
//                           className={`flex items-center space-x-1 ${item.href === '#' ? ' cursor-not-allowed ' : ' cursor-pointer '}`}
//                         >
//                           <span>{item.label}</span>
//                           <RiArrowDownSLine
//                             className={`mt-0.5 w-[20px] h-[20px] ${isActive(item.href) ? '' : ''} `}
//                           />
//                         </TooltipTrigger>
//                         {item.href === '#' && <TooltipContent>working on this link</TooltipContent>}
//                       </Tooltip>
//                     </TooltipProvider>
//                   </Link>

//                   <ul
//                     className="absolute lg:top-[62px] xl:top-[74px] 2xl:top-[84px] left-0 bg-white/70 backdrop-blur-[16.666666px] shadow-md rounded-md
//                     w-48 space-y-1 p-2 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all
//                     lg:text-[12px] xl:text-sm"
//                   >
//                     {item.children.map((child, i) => (
//                       <li key={i}>
//                         <Link
//                           href={child.href}
//                           title={item.href === '#' ? 'This link is disabled' : ''} // Tooltip only when disabled
//                           className={`block lg:px-2 xl:px-4 lg:py-1 xl:py-2 hover:bg-[#ED7125] hover:text-white rounded ${
//                             isActive(child.href) ? 'text-[#ED7125] font-semibold' : ''
//                           } ${item.href === '#' ? ' cursor-not-allowed ' : ' cursor-pointer '}`}
//                         >
//                           {child.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               ) : (
//                 <Link
//                   href={item.href}
//                   className={`relative ${
//                     isActive(item.href)
//                       ? 'after:absolute after:left-0 after:w-full after:h-[4px] after:xl:h-[7px] after:bg-[#ED7125] after:rounded-full after:lg:bottom-[-21px] after:xl:bottom-[-23px] after:2xl:bottom-[-28px]'
//                       : ''
//                   } `}
//                 >
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger
//                         className={`${item.href === '#' ? ' cursor-not-allowed ' : ' cursor-pointer '}`}
//                       >
//                         {item.label}
//                       </TooltipTrigger>
//                       {item.href === '#' && <TooltipContent>working on this link</TooltipContent>}
//                     </Tooltip>
//                   </TooltipProvider>
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Desktop Right Icons */}

//         <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-8 text-[#1F1F1F]">
//           {/* SVG as link */}
//           <a
//             href="https://portal.shantalife.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block"
//             aria-label="Go to ShantaLife Portal"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               className="cursor-pointer"
//             >
//               <path
//                 d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
//                 stroke="#061C3D"
//                 strokeWidth="1.5"
//                 strokeMiterlimit="10"
//               />
//               <path
//                 d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493"
//                 stroke="#061C3D"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </a>
//           <ToolTip>
//             <svg
//               width="22"
//               height="22"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               viewBox="0 0 24 24"
//               className="cursor-not-allowed"
//             >
//               <circle cx="11" cy="11" r="8" />
//               <line x1="21" y1="21" x2="16.65" y2="16.65" />
//             </svg>
//           </ToolTip>
//         </div>
//       </nav>

//       {/* Mobile Slide-In Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[60%] bg-white/60 backdrop-blur-[16.666666px] z-[999] shadow-lg transform transition-transform duration-300 ease-in-out
//   ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
//       >
//         <div className="flex justify-between items-center px-4 py-4 border-b">
//           <img src="/assets/mainlogo.png" alt="logo" className="h-[40px]" />
//           <button onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-[#1F1F1F]">
//             <RxCross2 />
//           </button>
//         </div>

//         <ul className="flex flex-col space-y-1 px-4 text-[#1E1E1E]">
//           {NAV_ITEMS.map((item, index) => {
//             const hasChildren = item.children && item.children.length > 0
//             const isDisabled = item.href === '#'

//             return (
//               <li key={index} className="border-b py-2">
//                 <div
//                   className={`flex items-center justify-between cursor-pointer ${
//                     isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''
//                   } ${isDisabled ? 'cursor-not-allowed text-gray-400' : ''}`}
//                   onClick={() => {
//                     if (isDisabled) return
//                     if (hasChildren) {
//                       setMobileDropdowns((prev) => ({
//                         ...prev,
//                         [item.label]: !prev[item.label],
//                       }))
//                     } else {
//                       setIsMobileMenuOpen(false)
//                     }
//                   }}
//                 >
//                   <Link href={isDisabled ? '#' : item.href} className="w-full">
//                     {item.label}
//                   </Link>
//                   {hasChildren && (
//                     <RiArrowDownSLine
//                       className={`ml-1 transition-transform duration-300 ${
//                         mobileDropdowns[item.label] ? 'rotate-180' : ''
//                       }`}
//                     />
//                   )}
//                 </div>

//                 {hasChildren && mobileDropdowns[item.label] && (
//                   <ul className="ml-4 mt-2 space-y-2 text-sm">
//                     {item.children.map((child, i) => (
//                       <li key={i}>
//                         <Link
//                           href={child.href}
//                           onClick={() => setIsMobileMenuOpen(false)}
//                           className={`block py-1 ${isActive(child.href) ? 'text-[#ED7125]' : ''}`}
//                         >
//                           {child.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     </>
//   )
// }

// // v1
// // ✅ Fixed nested dropdown behavior to only show 1st child at a time on hover, preserving original design

// 'use client'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { RiArrowDownSLine } from 'react-icons/ri'
// import { RxHamburgerMenu } from 'react-icons/rx'
// import ToolTip from '../ToolTip'

// export default function Navbar() {
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [showNavbar, setShowNavbar] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)
//   const [forceTopZero, setForceTopZero] = useState(false)
//   const [windowWidth, setWindowWidth] = useState<number>(0)

//   useEffect(() => {
//     let scrollTimeout: NodeJS.Timeout
//     let lastY = window.scrollY

//     const handleScroll = () => {
//       const currentY = window.scrollY
//       if (scrollTimeout) clearTimeout(scrollTimeout)

//       if (currentY < 300) {
//         setForceTopZero(false)
//         setShowNavbar(true)
//         setLastScrollY(currentY)
//         return
//       }

//       if (currentY < lastY) {
//         setForceTopZero(true)
//         setShowNavbar(true)
//       } else if (currentY > lastY) {
//         setShowNavbar(false)
//       }

//       scrollTimeout = setTimeout(() => {
//         if (currentY > 300) {
//           setForceTopZero(true)
//           setShowNavbar(true)
//         }
//       }, 2000)

//       lastY = currentY
//       setLastScrollY(currentY)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//       if (scrollTimeout) clearTimeout(scrollTimeout)
//     }
//   }, [])

//   useEffect(() => {
//     setWindowWidth(window.innerWidth)
//     const handleResize = () => setWindowWidth(window.innerWidth)
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const NAV_ITEMS = [
//     { href: '/', label: 'Home' },
//     { href: '/about-us', label: 'About Us' },
//     {
//       label: 'Solutions',
//       href: '/plans',
//       children: [
//         {
//           label: 'Individual',
//           href: '/plans/individual',
//           children: [
//             {
//               label: 'Saving & Investment Plans',
//               href: '/plans/individual/saving-and-investment',
//               children: [
//                 {
//                   label: 'Endowment Plans',
//                   href: '/plans/individual/saving-and-investment/endowment',
//                 },
//                 {
//                   label: 'Multi-Stage Maturity Plans',
//                   href: '/plans/individual/saving-and-investment/multistage',
//                 },
//               ],
//             },
//             {
//               label: 'Health & Protection Plans',
//               href: '/plans/individual/health-and-protection',
//               children: [
//                 {
//                   label: 'Accidental Coverage Plan',
//                   href: '/plans/individual/health-and-protection/accidental-coverage',
//                 },
//                 {
//                   label: 'Critical Illness Coverage Plan',
//                   href: '/plans/individual/health-and-protection/critical-illness-coverage',
//                 },
//               ],
//             },
//             { label: 'Child Education Plan', href: '/plans/individual/child-education' },
//           ],
//         },
//         { href: '/plans/corporate', label: 'Corporate Plan' },
//       ],
//     },
//     { href: '/pay-premium', label: 'Pay Premium' },
//     { href: '/claims', label: 'Claims' },
//     { href: '/support', label: 'Support' },
//     { href: '/purchase-now', label: 'Purchase Now' },
//   ]

//   const isActive = (href?: string) => {
//     if (!href) return false
//     return pathname === href || pathname.startsWith(href + '/')
//   }

//   const renderDesktopDropdown = (item: any, depth = 0) => {
//     const hasChildren = item.children?.length > 0
//     const isDisabled = item.href === '#'
//     const dropdownOffset =
//       depth === 0 ? 'lg:top-[62px] xl:top-[74px] 2xl:top-[84px]' : 'top-0 left-full ml-2'

//     return (
//       <li key={item.href + depth} className="relative group/menu">
//         <Link
//           href={item.href}
//           className={`flex items-center space-x-1 relative h-[60px] xl:h-[70px] 2xl:h-[80px] px-1 ${
//             isActive(item.href)
//               ? 'after:absolute after:left-0 after:w-full after:h-[4px] after:xl:h-[7px] after:bg-[#ED7125] after:rounded-full after:lg:bottom-[1px]'
//               : ''
//           }`}
//         >
//           <span>{item.label}</span>
//           {hasChildren && (
//             <RiArrowDownSLine
//               className={`mt-0.5 w-[18px] h-[18px] transition-transform duration-300 group-hover/menu:rotate-180 ${
//                 depth > 0 ? 'rotate-[-90deg]' : ''
//               }`}
//             />
//           )}
//         </Link>

//         {hasChildren && (
//           <ul
//             className={`absolute ${dropdownOffset} z-50 bg-white/70 backdrop-blur-[16.666666px] shadow-md rounded-md w-48 space-y-1 p-2 invisible opacity-0 group-hover/menu:visible group-hover/menu:opacity-100 transition-all`}
//           >
//             {item.children.map((child: any, idx: any) => (
//               <li key={idx} className="relative group/submenu">
//                 <Link
//                   href={child.href}
//                   className={`block lg:px-2 xl:px-4 lg:py-1 xl:py-2 hover:bg-[#ED7125] hover:text-white rounded ${
//                     isActive(child.href) ? 'text-[#ED7125] font-semibold' : ''
//                   }`}
//                 >
//                   <span className="flex items-center justify-between">
//                     {child.label}
//                     {child.children && (
//                       <RiArrowDownSLine className="ml-2 w-[14px] h-[14px] group-hover/submenu:rotate-[-90deg] transition-transform" />
//                     )}
//                   </span>
//                 </Link>
//                 {child.children && (
//                   <ul className="absolute top-0 left-full ml-2 z-50 bg-white/70 backdrop-blur-[16.666666px] shadow-md rounded-md w-48 space-y-1 p-2 invisible opacity-0 group-hover/submenu:visible group-hover/submenu:opacity-100 transition-all">
//                     {child.children.map((sub: any, sIdx: any) => (
//                       <li key={sIdx}>
//                         <Link
//                           href={sub.href}
//                           className={`block lg:px-2 xl:px-4 lg:py-1 xl:py-2 hover:bg-[#ED7125] hover:text-white rounded ${
//                             isActive(sub.href) ? 'text-[#ED7125] font-semibold' : ''
//                           }`}
//                         >
//                           {sub.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </li>
//     )
//   }

//   return (
//     <nav
//       className={`shadow-md fixed left-0 right-0 transition-all duration-500 ease-in-out font-avenir top-0 lg:top-24 z-50 inset-x-0 container-width px-4 py-2 md:px-8 md:py-3 h-[60px] xl:h-[70px] 2xl:h-[80px] w-full lg:w-[81%] xl:w-[76%] 2xl:w-[75%] mx-auto bg-white/70 backdrop-blur-[16.666666px] lg:rounded-[12px] xl:rounded-[14px] 2xl:rounded-[16px] flex items-center justify-between ${
//         showNavbar
//           ? 'translate-y-0 lg:translate-y-[-54px] xl:translate-y-[-52px] 2xl:-translate-y-[40px]'
//           : '-translate-y-[220px]'
//       }`}
//     >
//       <div className="flex items-center justify-between w-full lg:w-auto">
//         <div className="flex items-center space-x-1 w-fit 2xl:w-[60px] h-[35px] xl:h-[37px] 2xl:h-[40px]">
//           <Link href="/">
//             <img src="/assets/mainlogo.png" alt="logo" className="h-full w-full max-w-[100px]" />
//           </Link>
//         </div>
//         <button
//           onClick={() => setIsMobileMenuOpen(true)}
//           className="lg:hidden text-2xl text-[#1F1F1F]"
//         >
//           <RxHamburgerMenu />
//         </button>
//       </div>

//       <ul className="hidden lg:flex lg:space-x-3 xl:space-x-5 2xl:space-x-8 text-[#1E1E1E] items-center">
//         {NAV_ITEMS.map((item) => renderDesktopDropdown(item))}
//       </ul>

//       <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-8 text-[#1F1F1F]">
//         <a
//           href="https://portal.shantalife.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block"
//           aria-label="Go to ShantaLife Portal"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             className="cursor-pointer"
//           >
//             <path
//               d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
//               stroke="#061C3D"
//               strokeWidth="1.5"
//               strokeMiterlimit="10"
//             />
//             <path
//               d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493"
//               stroke="#061C3D"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </a>
//         <ToolTip>
//           <svg
//             width="22"
//             height="22"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             viewBox="0 0 24 24"
//             className="cursor-not-allowed"
//           >
//             <circle cx="11" cy="11" r="8" />
//             <line x1="21" y1="21" x2="16.65" y2="16.65" />
//           </svg>
//         </ToolTip>
//       </div>
//     </nav>
//   )
// }

'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
import ToolTip from '../ToolTip'
import { NAV_ITEMS } from '@/lib/data'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [forceTopZero, setForceTopZero] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({})

  // --- KEEPING YOUR ORIGINAL SCROLL/RESIZE LOGIC ---
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      if (scrollTimeout) clearTimeout(scrollTimeout)

      if (currentY < 300) {
        setForceTopZero(false)
        setShowNavbar(true)
        setLastScrollY(currentY)
        return
      }

      if (currentY < lastY) {
        setForceTopZero(true)
        setShowNavbar(true)
      } else if (currentY > lastY) {
        setShowNavbar(false)
      }

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

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  // === PEER-HOVER, ARROW/OPEN FIXED DESKTOP DROPDOWN ===
  function DesktopDropdown({ items, depth = 0 }: { items: any[]; depth?: number }) {
    if (!items) return null

    const positionClass = depth === 0 ? 'absolute left-0 top-full' : 'absolute left-full top-0'

    return (
      <ul
        className={`
          ${positionClass}
          bg-white backdrop-blur-[16.666666px] shadow-md rounded-md min-w-[220px] z-50
          space-y-1 p-2 hidden
          peer-hover:block hover:block
          transition-all
          lg:text-[12px] xl:text-sm
        `}
      >
        {items.map((item: any, idx: number) => {
          const hasChildren = !!item.children && item.children.length > 0
          return (
            <li key={item.label + idx} className="relative">
              <Link
                href={item.href}
                tabIndex={0}
                className={`
                  peer
                  block lg:px-2 xl:px-4 lg:py-1 xl:py-2
                  hover:bg-[#ED7125] hover:text-white rounded
                  ${item.href === '#' ? ' cursor-not-allowed ' : ' cursor-pointer '}
                  flex items-center justify-between
                  ${hasChildren ? 'pr-4' : ''}
                  ${isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''}
                `}
              >
                <span>{item.label}</span>
                {hasChildren && (
                  <RiArrowDownSLine
                    className={`
                      ml-2 w-[16px] h-[16px] transition-transform duration-200
                      -rotate-90 peer-hover:rotate-0 hover:rotate-0
                    `}
                  />
                )}
              </Link>
              {hasChildren && <DesktopDropdown items={item.children} depth={depth + 1} />}
            </li>
          )
        })}
      </ul>
    )
  }

  // === MOBILE DROPDOWN UNCHANGED ===
  function MobileDropdown({ items, parentKey = '' }: any) {
    return (
      <ul className="ml-4 mt-2 space-y-2 text-sm">
        {items.map((item: any, i: number) => {
          const hasChildren = !!item.children && item.children.length > 0
          const key = parentKey + '-' + item.label

          return (
            <li key={key}>
              <div
                className={`flex items-center justify-between cursor-pointer ${
                  isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''
                } ${item.href === '#' ? 'cursor-not-allowed text-gray-400' : ''}`}
                onClick={() => {
                  if (item.href === '#') return
                  if (hasChildren) {
                    setMobileDropdowns((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  } else {
                    setIsMobileMenuOpen(false)
                  }
                }}
              >
                <Link href={item.href} className="w-full">
                  {item.label}
                </Link>
                {hasChildren && (
                  <RiArrowDownSLine
                    className={`ml-1 transition-transform duration-300 ${
                      mobileDropdowns[key] ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>
              {hasChildren && mobileDropdowns[key] && (
                <MobileDropdown items={item.children} parentKey={key} />
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  // ======= JSX =======
  return (
    <>
      <nav
        className={`shadow-md fixed left-0 right-0 transition-all duration-500 ease-in-out font-avenir top-0 lg:top-24 z-50 inset-x-0 container-width
        px-4 py-2 md:px-8 md:py-3
        h-[60px] xl:h-[70px] 2xl:h-[80px]
        w-full lg:w-[81%] xl:w-[76%] 2xl:w-[75%] mx-auto
        bg-white/70 backdrop-blur-[16.666666px]
        lg:rounded-[12px] xl:rounded-[14px] 2xl:rounded-[16px]
        flex items-center justify-between ${showNavbar ? 'translate-y-0 lg:translate-y-[-54px] xl:translate-y-[-52px] 2xl:-translate-y-[40px]' : '-translate-y-[220px]'}`}
      >
        {/* Logo + Burger */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div
            className="flex items-center space-x-1
          w-fit 2xl:w-[60px]
          h-[35px] xl:h-[37px] 2xl:h-[40px]"
          >
            <Link href="/">
              <img src="/assets/mainlogo.png" alt="logo" className="h-full w-full max-w-[100px]" />
            </Link>
          </div>

          {/* Burger Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-2xl text-[#1F1F1F]"
          >
            <RxHamburgerMenu />
          </button>
        </div>

        {/* Desktop Menu */}
        <ul
          className="hidden lg:flex
          lg:space-x-3 xl:space-x-5 2xl:space-x-8
          lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-[#1E1E1E] items-center lg:leading-6 xl:leading-8"
        >
          {NAV_ITEMS.map((item, index) => {
            const hasChildren = !!item.children && item.children.length > 0
            return (
              <li key={index} className="relative">
                <Link
                  href={item.href}
                  className={`peer flex items-center space-x-1 relative h-[60px] xl:h-[70px] 2xl:h-[80px] ${
                    isActive(item.href)
                      ? ' after:absolute after:left-0 after:w-full after:h-[4px] after:xl:h-[7px] after:bg-[#ED7125] after:rounded-full after:lg:bottom-[1px]'
                      : ''
                  } `}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        className={`flex items-center space-x-1 ${item.href === '#' ? ' cursor-not-allowed ' : ' cursor-pointer '}`}
                      >
                        <span>{item.label}</span>
                        {hasChildren && (
                          <RiArrowDownSLine className="mt-0.5 w-[20px] h-[20px] transition-transform duration-200 peer-hover:rotate-180 hover:rotate-180" />
                        )}
                      </TooltipTrigger>
                      {item.href === '#' && <TooltipContent>working on this link</TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* Submenu as sibling, only visible on peer-hover */}
                {hasChildren && <DesktopDropdown items={item.children} />}
              </li>
            )
          })}
        </ul>

        {/* Desktop Right Icons */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-8 text-[#1F1F1F]">
          {/* SVG as link */}
          <a
            href="https://portal.shantalife.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label="Go to ShantaLife Portal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="cursor-pointer"
            >
              <path
                d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                stroke="#061C3D"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493"
                stroke="#061C3D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <ToolTip>
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="cursor-not-allowed"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </ToolTip>
        </div>
      </nav>

      {/* Mobile Slide-In Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-white/60 backdrop-blur-[16.666666px] z-[999] shadow-lg transform transition-transform duration-300 ease-in-out
  ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <img src="/assets/mainlogo.png" alt="logo" className="h-[40px]" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-[#1F1F1F]">
            <RxCross2 />
          </button>
        </div>

        <ul className="flex flex-col space-y-1 px-4 text-[#1E1E1E]">
          {NAV_ITEMS.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0
            const isDisabled = item.href === '#'
            const key = item.label

            return (
              <li key={index} className="border-b py-2">
                <div
                  className={`flex items-center justify-between cursor-pointer ${
                    isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''
                  } ${isDisabled ? 'cursor-not-allowed text-gray-400' : ''}`}
                  onClick={() => {
                    if (isDisabled) return
                    if (hasChildren) {
                      setMobileDropdowns((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    } else {
                      setIsMobileMenuOpen(false)
                    }
                  }}
                >
                  <Link href={isDisabled ? '#' : item.href} className="w-full">
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <RiArrowDownSLine
                      className={`ml-1 transition-transform duration-300 ${
                        mobileDropdowns[key] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
                {hasChildren && mobileDropdowns[key] && (
                  <MobileDropdown items={item.children} parentKey={key} />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
