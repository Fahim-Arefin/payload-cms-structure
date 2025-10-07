// 'use client'
// import { TooltipContent } from '@/components/ui/tooltip'
// import { NAV_ITEMS, NAV_ITEMS_MOBILE } from '@/lib/data'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { RiArrowDownSLine } from 'react-icons/ri'
// import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
// import LocalizedText from '../LocalizedText'

// export default function Navbar() {
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [showNavbar, setShowNavbar] = useState(true)
//   const [lastScrollY, setLastScrollY] = useState(0)
//   const [windowWidth, setWindowWidth] = useState<number>(0)
//   const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({})

//   useEffect(() => {
//     let scrollTimeout: NodeJS.Timeout
//     let lastY = window.scrollY

//     const handleScroll = () => {
//       const currentY = window.scrollY
//       if (scrollTimeout) clearTimeout(scrollTimeout)

//       if (currentY < 300) {
//         setShowNavbar(true)
//         setLastScrollY(currentY)
//         return
//       }
//       if (currentY < lastY) setShowNavbar(true)
//       else if (currentY > lastY) setShowNavbar(false)

//       scrollTimeout = setTimeout(() => {
//         if (currentY > 300) setShowNavbar(true)
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

//   const isActive = (href?: string) => {
//     if (!href) return false
//     return pathname === href || pathname.startsWith(href + '/')
//   }

//   // DESKTOP DROPDOWN - stateful arrow logic
//   function DesktopDropdown({ items, depth = 0 }: { items: any[]; depth?: number }) {
//     const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
//     const positionClass =
//       depth === 0 ? 'absolute left-0 top-full mt-2' : 'absolute left-full top-0 ml-3'
//     const beforeBridge =
//       depth === 0
//         ? 'before:absolute before:-top-2 before:left-0 before:w-full before:h-2 before:content-[""] before:block'
//         : 'before:absolute before:top-0 before:-left-3 before:w-3 before:h-full before:content-[""] before:block'

//     return (
//       <ul
//         className={`shadow-md
//         ${positionClass}
//         rounded-md lg:min-w-[205px] xl:min-w-[245px] z-50
//         space-y-1 p-2 hidden
//         group-hover:block hover:block peer-hover:block
//         transition-all
//         lg:text-[12px] xl:text-sm
//         ${beforeBridge}
//         bg-white/70 backdrop-blur-[16.67px]
//       `}
//         style={{ pointerEvents: 'auto' }}
//       >
//         {items.map((item: any, idx: number) => {
//           const hasChildren = !!item.children && item.children.length > 0
//           const isHovered = hoveredIdx === idx
//           return (
//             <li
//               key={item.label + idx}
//               className="relative "
//               onMouseEnter={() => setHoveredIdx(idx)}
//               onMouseLeave={() => setHoveredIdx(null)}
//             >
//               <Link
//                 href={item.href}
//                 tabIndex={0}
//                 className={`
//                   block lg:px-2 xl:px-4 lg:py-1 xl:py-2
//                   hover:bg-[#ED7125] hover:text-white rounded
//                   ${item.href === '#' ? ' cursor-not-allowed ' : ' cursor-pointer '}
//                   flex items-center justify-between
//                   ${hasChildren ? 'pr-4' : ''}
//                   ${isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''}
//                 `}
//               >
//                 <span>
//                   <LocalizedText en={item?.label} bn={item?.labelBN} />
//                 </span>
//                 {hasChildren && (
//                   <RiArrowDownSLine
//                     className={`
//                       ml-2 w-[16px] h-[16px] transition-transform duration-200
//                       ${isHovered ? '-rotate-90' : 'rotate-0'}
//                     `}
//                   />
//                 )}
//               </Link>
//               {hasChildren && isHovered && (
//                 <DesktopDropdown items={item.children} depth={depth + 1} />
//               )}
//             </li>
//           )
//         })}
//       </ul>
//     )
//   }

//   // MOBILE DROPDOWN - unchanged
//   function MobileDropdown({ items, parentKey = '' }: any) {
//     return (
//       <ul className="ml-4 mt-2 space-y-2 text-sm">
//         {items.map((item: any, i: number) => {
//           const hasChildren = !!item.children && item.children.length > 0
//           const key = parentKey + '-' + item.label
//           return (
//             <li key={key}>
//               <div
//                 className={`flex items-center justify-between cursor-pointer ${
//                   isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''
//                 } ${item.href === '#' ? 'cursor-not-allowed text-gray-400' : ''}`}
//                 onClick={() => {
//                   if (item.href === '#') return
//                   if (hasChildren) {
//                     setMobileDropdowns((prev) => ({
//                       ...prev,
//                       [key]: !prev[key],
//                     }))
//                   } else {
//                     setIsMobileMenuOpen(false)
//                   }
//                 }}
//               >
//                 <Link
//                   href={item.href}
//                   target={item.href.startsWith('https') ? '_blank' : '_self'}
//                   className="w-full"
//                 >
//                   <LocalizedText en={item?.label} bn={item?.labelBN} />
//                 </Link>
//                 {hasChildren && (
//                   <RiArrowDownSLine
//                     className={`ml-1 transition-transform duration-300 ${
//                       mobileDropdowns[key] ? 'rotate-180' : ''
//                     }`}
//                   />
//                 )}
//               </div>
//               {hasChildren && mobileDropdowns[key] && (
//                 <MobileDropdown items={item.children} parentKey={key} />
//               )}
//             </li>
//           )
//         })}
//       </ul>
//     )
//   }

//   // NAVBAR JSX
//   return (
//     <>
//       <nav
//         className={`shadow-md fixed left-0 right-0 transition-all duration-500 ease-in-out font-avenir top-0 lg:top-24 z-50 inset-x-0 container-width
//         px-4 py-2 md:px-8 md:py-3
//         h-[60px] xl:h-[70px] 2xl:h-[80px]
//         w-full lg:w-[81%] xl:w-[76%] 2xl:w-[75%] mx-auto
//         bg-white/70 backdrop-blur-[16.67px]
//         lg:rounded-[12px] xl:rounded-[14px] 2xl:rounded-[16px]
//         flex items-center justify-between ${showNavbar ? 'translate-y-0 lg:translate-y-[-54px] xl:translate-y-[-52px] 2xl:-translate-y-[40px]' : '-translate-y-[220px]'}`}
//       >
//         {/* Logo + Burger */}
//         <div className="flex items-center justify-between w-full lg:w-auto">
//           <div className="flex items-center space-x-1 w-fit 2xl:w-[60px] h-[35px] xl:h-[37px] 2xl:h-[40px]">
//             {/* <Link href="/">
//               <img
//                 src="/assets/logo/mainlogo_2.png"
//                 alt="Website Logo"
//                 className="h-full w-full max-w-[75px]"
//               />
//             </Link> */}
//             <Link href="/" aria-label="Home">
//               <Image
//                 src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/mainlogo_2.png`}
//                 alt="Company logo"
//                 width={75}
//                 height={40}
//                 className="h-full w-full max-w-[75px] object-contain"
//                 priority
//               />
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
//           lg:space-x-2 xl:space-x-3 2xl:space-x-4
//           lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-[#1E1E1E] items-center lg:leading-6 xl:leading-8"
//         >
//           {NAV_ITEMS.map((item, index) => {
//             const hasChildren = !!item.children && item.children.length > 0
//             return (
//               <li key={index} className="relative group">
//                 <Link
//                   href={item.href}
//                   // className={`peer flex items-center space-x-1 relative h-[60px] xl:h-[70px] 2xl:h-[80px] lg:px-1 2xl:px-2 ${
//                   //   isActive(item.href)
//                   //     ? ' after:absolute after:left-0.5 after:w-full after:h-[4px] after:xl:h-[7px] after:bg-[#ED7125] after:rounded-full after:lg:bottom-[1px]'
//                   //     : ''
//                   // } `}
//                   className={`
//   peer flex items-center space-x-1 relative h-[60px] xl:h-[70px] 2xl:h-[80px] lg:px-1 2xl:px-2
//   after:absolute after:bg-[#ED7125] after:rounded-full after:transition-all after:duration-300 after:content-['']
//   after:bottom-[1px] after:h-[4px] after:xl:h-[7px]
//   ${
//     isActive(item.href)
//       ? // Active: underline fully visible, left aligned
//         'after:left-0.5 after:w-full '
//       : // Inactive: animate underline from center outwards on hover
//         'after:left-1/2 after:w-0 after:-translate-x-1/2 group-hover:after:w-full group-hover:after:left-0.5 group-hover:after:-translate-x-0'
//   }
// `}
//                 >
//                   <div
//                     className={`flex items-center space-x-1 ${item.href === '#' ? ' cursor-not-allowed ' : ' cursor-pointer '}`}
//                   >
//                     <div>
//                       <LocalizedText en={item?.label} bn={item?.labelBN} />
//                     </div>
//                     {hasChildren && (
//                       <RiArrowDownSLine
//                         className={`mt-0.5 w-[20px] h-[20px] transition-transform duration-200 rotate-0 group-hover:-rotate-180`}
//                       />
//                     )}
//                   </div>
//                   {item.href === '#' && <TooltipContent>working on this link</TooltipContent>}
//                 </Link>
//                 {/* Only render the submenu on hover */}
//                 {hasChildren && <DesktopDropdown items={item.children} depth={0} />}
//               </li>
//             )
//           })}
//         </ul>
//         {/* Desktop Right Icons */}
//         <div className="hidden lg:flex text-[#1F1F1F]">
//           {/* SVG as link */}
//           <Link
//             href="https://portal.shantalife.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex flex-col justify-center items-center"
//             aria-label="Go to ShantaLife Portal"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="21"
//               height="21"
//               viewBox="0 0 21 21"
//               fill="none"
//               className="cursor-pointer flex mx-auto"
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
//             <div className="text-center lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-[#1E1E1E]">
//               <LocalizedText en="My Portal" bn="মাই পোর্টাল" />
//             </div>
//           </Link>

//           {/* <ToolTip>
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
//           </ToolTip> */}
//         </div>
//       </nav>
//       {/* Mobile Slide-In Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[60%] bg-white/60 backdrop-blur-[16.67px] z-[999] shadow-lg transform transition-transform duration-300 ease-in-out
//   ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
//       >
//         <div className="flex justify-between items-center px-4 py-4 border-b">
//           {/* <img src="/assets/logo/mainlogo_2.png" alt="logo" className="h-[40px]" /> */}
//           <Image
//             src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/mainlogo_2.png`}
//             alt="Company logo"
//             width={120} // adjust as needed
//             height={40} // adjust as needed
//             className="h-[40px] w-auto"
//             priority
//           />
//           <button onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-[#1F1F1F]">
//             <RxCross2 />
//           </button>
//         </div>
//         <ul className="flex flex-col space-y-1 px-4 text-[#1E1E1E]">
//           {NAV_ITEMS_MOBILE.map((item, index) => {
//             const hasChildren = item.children && item.children.length > 0
//             const isDisabled = item.href === '#'
//             const key = item.label

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
//                         [key]: !prev[key],
//                       }))
//                     } else {
//                       setIsMobileMenuOpen(false)
//                     }
//                   }}
//                 >
//                   <Link href={isDisabled ? '#' : item.href} className="w-full">
//                     <LocalizedText en={item?.label} bn={item?.labelBN} />
//                   </Link>
//                   {hasChildren && (
//                     <RiArrowDownSLine
//                       className={`ml-1 transition-transform duration-300 ${
//                         mobileDropdowns[key] ? 'rotate-180' : ''
//                       }`}
//                     />
//                   )}
//                 </div>
//                 {hasChildren && mobileDropdowns[key] && (
//                   <MobileDropdown items={item.children} parentKey={key} />
//                 )}
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     </>
//   )
// }

// =============================================================================================
// =============================================================================================
// =============================================================================================
// =============================================================================================

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
import { TooltipContent } from '@/components/ui/tooltip'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import type { NavbarData, NavItem } from './ServerNavbar'
import { useLanguage } from '@/context/LanguageContext'
import useMounted from '@/hooks/useMounted'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { HeaderData } from '../ServerTopHeader'

type Props = { data: NavbarData; header: HeaderData }

export default function Navbar({ data, header }: Props) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({})

  const { language, setLanguage } = useLanguage()
  const mounted = useMounted()
  const uiLang = mounted ? language : 'en'

  // default scroll behavior (config removed from CMS)
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | undefined
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      if (scrollTimeout) clearTimeout(scrollTimeout)

      if (currentY < 300) {
        setShowNavbar(true)
        lastY = currentY
        return
      }
      setShowNavbar(currentY < lastY)
      scrollTimeout = setTimeout(() => {
        if (currentY > 300) setShowNavbar(true)
      }, 2000)

      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  // ----- Desktop recursive dropdown -----
  function DesktopDropdown({ items, depth = 0 }: { items: NavItem[]; depth?: number }) {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
    const positionClass =
      depth === 0 ? 'absolute left-0 top-full mt-2' : 'absolute left-full top-0 ml-3'
    const beforeBridge =
      depth === 0
        ? 'before:absolute before:-top-2 before:left-0 before:w-full before:h-2 before:content-[""] before:block'
        : 'before:absolute before:top-0 before:-left-3 before:w-3 before:h-full before:content-[""] before:block'

    return (
      <ul
        className={`
          ${positionClass} ${beforeBridge}
          hidden group-hover:block hover:block peer-hover:block
          z-50 rounded-md space-y-1 p-2 shadow-md
          bg-white/70 backdrop-blur-[16.67px]
          lg:min-w-[205px] xl:min-w-[245px]
          transition-all lg:text-[12px] xl:text-sm
        `}
        style={{ pointerEvents: 'auto' }}
      >
        {items.map((item, idx) => {
          const hasChildren = !!item.children && item.children.length > 0
          const isHovered = hoveredIdx === idx
          return (
            <li
              key={`${item.label}-${idx}`}
              className="relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Link
                href={item.href}
                tabIndex={0}
                className={`
                  block lg:px-2 xl:px-4 lg:py-1 xl:py-2 rounded
                  hover:bg-[#ED7125] hover:text-white
                  flex items-center justify-between
                  ${hasChildren ? 'pr-4' : ''}
                  ${item.href === '#' ? 'cursor-not-allowed' : 'cursor-pointer'}
                  ${isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''}
                `}
              >
                <span>
                  <LocalizedText en={item.label} bn={item.labelBN} />
                </span>
                {hasChildren && (
                  <RiArrowDownSLine
                    className={`ml-2 w-[16px] h-[16px] transition-transform duration-200 ${isHovered ? '-rotate-90' : 'rotate-0'}`}
                  />
                )}
              </Link>

              {hasChildren && isHovered && (
                <DesktopDropdown items={item.children!} depth={depth + 1} />
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  // ----- Mobile recursive dropdown -----
  function MobileDropdown({ items, parentKey = '' }: { items: NavItem[]; parentKey?: string }) {
    return (
      <ul className="ml-4 mt-2 space-y-2 text-sm">
        {items.map((item, i) => {
          const hasChildren = !!item.children && item.children.length > 0
          const key = parentKey + '-' + item.label
          const disabled = item.href === '#'
          return (
            <li key={key}>
              <div
                className={`flex items-center justify-between cursor-pointer ${
                  isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''
                } ${disabled ? 'cursor-not-allowed text-gray-400' : ''}`}
                onClick={() => {
                  if (disabled) return
                  if (hasChildren) {
                    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
                  } else {
                    setIsMobileMenuOpen(false)
                  }
                }}
              >
                <Link
                  href={item.href}
                  target={item.href.startsWith('https') ? '_blank' : '_self'}
                  className="w-full"
                >
                  <LocalizedText en={item.label} bn={item.labelBN} />
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
                <MobileDropdown items={item.children!} parentKey={key} />
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN || ''}/mainlogo_2.png`

  const portalHref = data.portal?.href || 'https://portal.shantalife.com/'
  const portalLabel = data.portal?.label || 'My Portal'
  const portalLabelBN = data.portal?.labelBN || 'মাই পোর্টাল'

  return (
    <>
      <nav
        className={`shadow-md fixed left-0 right-0 transition-all duration-500 ease-in-out font-avenir top-0 lg:top-24 z-50 inset-x-0 container-width
        px-4 py-2 md:px-8 md:py-3
        h-[60px] xl:h-[70px] 2xl:h-[80px]
        w-full lg:w-[81%] xl:w-[76%] 2xl:w-[75%] mx-auto
        bg-white/70 backdrop-blur-[16.67px]
        lg:rounded-[12px] xl:rounded-[14px] 2xl:rounded-[16px]
        flex items-center justify-between ${showNavbar ? 'translate-y-0 lg:translate-y-[-54px] xl:translate-y-[-52px] 2xl:-translate-y-[40px]' : '-translate-y-[220px]'}`}
      >
        {/* Logo + Burger */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center space-x-1 w-fit 2xl:w-[60px] h-[35px] xl:h-[37px] 2xl:h-[40px]">
            <Link href="/" aria-label="Home">
              <Image
                src={logoUrl}
                alt="Company logo"
                width={75}
                height={40}
                className="h-full w-full max-w-[75px] object-contain"
                priority
              />
            </Link>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-2xl text-[#1F1F1F]"
            aria-label="Open menu"
          >
            <RxHamburgerMenu />
          </button>
        </div>

        {/* Desktop Menu */}
        <ul
          className="hidden lg:flex
          lg:space-x-2 xl:space-x-3 2xl:space-x-4
          lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-[#1E1E1E] items-center lg:leading-6 xl:leading-8"
        >
          {data.desktop.items.map((item, index) => {
            const hasChildren = !!item.children && item.children.length > 0
            return (
              <li key={index} className="relative group">
                <Link
                  href={item.href}
                  className={`
                    peer flex items-center space-x-1 relative h-[60px] xl:h-[70px] 2xl:h-[80px] lg:px-1 2xl:px-2
                    after:absolute after:bg-[#ED7125] after:rounded-full after:transition-all after:duration-300 after:content-['']
                    after:bottom-[1px] after:h-[4px] after:xl:h-[7px]
                    ${
                      isActive(item.href)
                        ? 'after:left-0.5 after:w-full '
                        : 'after:left-1/2 after:w-0 after:-translate-x-1/2 group-hover:after:w-full group-hover:after:left-0.5 group-hover:after:-translate-x-0'
                    }
                  `}
                >
                  <div
                    className={`flex items-center space-x-1 ${
                      item.href === '#' ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <div>
                      <LocalizedText en={item.label} bn={item.labelBN} />
                    </div>
                    {hasChildren && (
                      <RiArrowDownSLine className="mt-0.5 w-[20px] h-[20px] transition-transform duration-200 rotate-0 group-hover:-rotate-180" />
                    )}
                  </div>
                  {item.href === '#' && <TooltipContent>working on this link</TooltipContent>}
                </Link>

                {hasChildren && <DesktopDropdown items={item.children!} depth={0} />}
              </li>
            )
          })}
        </ul>

        {/* Desktop Right / Portal */}
        <div className="hidden lg:flex text-[#1F1F1F]">
          <Link
            href={portalHref}
            target={portalHref.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="flex flex-col justify-center items-center"
            aria-label="Open portal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              className="cursor-pointer flex mx-auto"
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
            <div className="text-center lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-[#1E1E1E]">
              <LocalizedText en={portalLabel} bn={portalLabelBN} />
            </div>
          </Link>
        </div>
      </nav>

      {/* Mobile Slide-In */}
      {/* <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-white/60 backdrop-blur-[16.67px] z-[999] shadow-lg transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <Image
            src={logoUrl}
            alt="Company logo"
            width={120}
            height={40}
            className="h-[40px] w-auto"
            priority
          />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute right-3 top-3 text-2xl text-[#1F1F1F]"
          aria-label="Close menu"
        >
          <RxCross2 />
        </button>

        <ul className="mt-12 flex flex-col space-y-1 px-4 text-[#1E1E1E]">
          {data.mobile.items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0
            const disabled = item.href === '#'
            const key = item.label || `item-${index}`

            return (
              <li key={index} className="border-b py-2">
                <div
                  className={`flex items-center justify-between cursor-pointer ${
                    isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''
                  } ${disabled ? 'cursor-not-allowed text-gray-400' : ''}`}
                  onClick={() => {
                    if (disabled) return
                    if (hasChildren) {
                      setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
                    } else {
                      setIsMobileMenuOpen(false)
                    }
                  }}
                >
                  <Link href={disabled ? '#' : item.href} className="w-full">
                    <LocalizedText en={item.label} bn={item.labelBN} />
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
                  <MobileDropdown items={item.children!} parentKey={key} />
                )}
              </li>
            )
          })}

          {portalHref && (
            <li className="py-2">
              <Link
                href={portalHref}
                target={portalHref.startsWith('http') ? '_blank' : '_self'}
                className="block text-[#1E1E1E]"
              >
                <LocalizedText en={portalLabel} bn={portalLabelBN} />
              </Link>
            </li>
          )}
        </ul>
      </div> */}

      {/* Mobile Slide-In */}
      <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-white/60 backdrop-blur-[16.67px] z-[999] shadow-lg transform transition-transform duration-300 ease-in-out
  ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b relative">
          <Image
            src={logoUrl}
            alt="Company logo"
            width={120}
            height={40}
            className="h-[40px] w-auto"
            priority
          />
          {/* ⬇️ BN/EN toggle (same style as TopHeader) */}
          {header?.showLocalizationToggle && (
            <div className="flex items-center bg-[rgba(217,217,217,1)] rounded-full h-[30px] w-[100px] px-2 self-end">
              <ToggleGroup
                type="single"
                value={uiLang}
                onValueChange={(val) => (val === 'en' || val === 'bn') && setLanguage(val)}
                className="text-[#535353] text-[14px]"
              >
                <ToggleGroupItem
                  value="bn"
                  aria-label="Toggle Bangla"
                  className="h-[24px] w-[41px] rounded-[17px]
              hover:bg-[rgba(237,113,37,0.28)]
              data-[state=on]:bg-[rgba(237,113,37,0.28)]
              data-[state=on]:text-[rgba(237,113,37,1)]"
                >
                  BN
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="en"
                  aria-label="Toggle English"
                  className="h-[24px] w-[41px] rounded-[17px]
              hover:bg-[rgba(237,113,37,0.28)]
              data-[state=on]:bg-[rgba(237,113,37,0.28)]
              data-[state=on]:text-[rgba(237,113,37,1)]"
                >
                  EN
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}

          {/* Close button stays absolute so it won't shift layout */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-2 top-2 text-lg text-[#1F1F1F]"
            aria-label="Close menu"
          >
            <RxCross2 />
          </button>
        </div>

        <ul className="mt-4 flex flex-col space-y-1 px-4 text-[#1E1E1E]">
          {data.mobile.items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0
            const disabled = item.href === '#'
            const key = item.label || `item-${index}`

            return (
              <li key={index} className="border-b py-2">
                <div
                  className={`flex items-center justify-between cursor-pointer ${
                    isActive(item.href) ? 'text-[#ED7125] font-semibold' : ''
                  } ${disabled ? 'cursor-not-allowed text-gray-400' : ''}`}
                  onClick={() => {
                    if (disabled) return
                    if (hasChildren) {
                      setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
                    } else {
                      setIsMobileMenuOpen(false)
                    }
                  }}
                >
                  <Link href={disabled ? '#' : item.href} className="w-full">
                    <LocalizedText en={item.label} bn={item.labelBN} />
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
                  <MobileDropdown items={item.children!} parentKey={key} />
                )}
              </li>
            )
          })}

          {portalHref && (
            <li className="py-2">
              <Link
                href={portalHref}
                target={portalHref.startsWith('http') ? '_blank' : '_self'}
                className="block text-[#1E1E1E]"
              >
                <LocalizedText en={portalLabel} bn={portalLabelBN} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}
