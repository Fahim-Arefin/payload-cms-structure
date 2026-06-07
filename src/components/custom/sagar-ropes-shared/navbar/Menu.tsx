// 'use client'

// import { Footer } from '@/payload-types'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import LocalizedText from '../../shared/LocalizedText'
// import { NavbarData, SearchSuggestion } from './ServerNavbar'

// type Props = {
//   data: NavbarData
//   footerData: Footer
//   suggestions: SearchSuggestion[]
// }

// const ChevronDown = ({ className = '' }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={className}>
//     <path
//       d="M5 7.5L10 12.5L15 7.5"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// )

// function Menu({ data, footerData, suggestions }: Props) {
//   const allItems = data?.desktop?.items
//   // const topItems = allItems.filter((item) => item.isTop === 'yes')
//   // const mainItems = allItems.filter((item) => item.isTop !== 'yes')
//   const mainItems = allItems || []
//   const pathname = usePathname()

//   const isItemActive = (href: string) => {
//     if (!href) return false

//     const cleanHref = href.split('#')[0]

//     if (cleanHref === '/') return pathname === '/'
//     return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`)
//   }

//   const hasChildren = (item: { children?: { href: string }[] }) =>
//     Array.isArray(item?.children) && item.children.length > 0

//   const isChildActive = (children?: { href: string }[]) => {
//     if (!children?.length) return false
//     return children.some((child) => isItemActive(child.href))
//   }

//   const isParentActive = (item: { href: string; children?: { href: string }[] }) => {
//     return isItemActive(item.href) || isChildActive(item.children)
//   }

//   const childLinkClass = (isActive: boolean) => `
//     block w-full px-4 py-2 text-left whitespace-nowrap
//     transition-all duration-300 ease-out
//     ${isActive ? 'bg-border-2 text-white-1' : 'hover:bg-border-2 hover:text-white-1'}
//   `

//   // const navLinkClass = (isActive: boolean) => `

//   //   relative inline-flex items-center justify-center gap-1
//   //   transition-all duration-500 ease-out
//   //   hover:text-[#FFFBFC]
//   //   ${isActive ? 'text-[#FFFBFC] opacity-100 rounded-[16px] border border-[#006C67] bg-[#006C67] px-[24px] py-[4px]' : 'text-secondary-1 opacity-70'}
//   // `

//   const navLinkClass = (isActive: boolean) => `
//   relative inline-flex items-center justify-center gap-1
//   transition-colors duration-500 ease-out
//   rounded-[16px]

//   ${
//     isActive
//       ? `
//         text-white-1
//         opacity-100
//         bg-primary-1
//         border-b border-primary-2/40
//         px-[24px]
//         py-[6px]

//       `
//       : `
//         text-secondary-1
//         opacity-80
//         px-[24px]
//         py-[6px]
//         hover:text-white-1
//         hover:opacity-100
//       `
//   }
// `

//   return (
//     <div className="h-full font-grift global-p4 text-secondary-1  capitalize">
//       {/* main */}
//       <div className="flex flex-row items-center justify-evenly w-full h-full ">
//         {mainItems?.map((item, index) => {
//           const parentActive = isParentActive(item)
//           const itemHasChildren = hasChildren(item)

//           return (
//             <div key={index} className="relative group ">
//               <Link href={item?.href} className={navLinkClass(parentActive)}>
//                 <LocalizedText en={item?.label} bn={item?.label} />

//                 {itemHasChildren && (
//                   <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
//                 )}
//               </Link>

//               {itemHasChildren && (
//                 <div
//                   className="
//                         absolute -left-4 top-full z-50  pt-3
//                         opacity-0 invisible translate-y-2
//                         transition-all duration-300 ease-out
//                         group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
//                       "
//                 >
//                   <div
//                     className="min-w-[220px] overflow-hidden
//                         border-b-[3px] border-b-dark-3 shadow-lg
//                         backdrop-blur-15 bg-[#E8EFF4]"
//                   >
//                     {item.children?.map((child, childIndex) => (
//                       <Link
//                         key={childIndex}
//                         href={child.href}
//                         className={childLinkClass(isItemActive(child.href))}
//                       >
//                         <LocalizedText en={child.label} bn={child.label} />
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Menu

// // gsap version 01
// 'use client'

// import { Footer } from '@/payload-types'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useRef } from 'react'
// import LocalizedText from '../../shared/LocalizedText'
// import { NavbarData, SearchSuggestion } from './ServerNavbar'

// import { gsap, useGSAP } from '@/lib/gsap'

// type Props = {
//   data: NavbarData
//   footerData: Footer
//   suggestions: SearchSuggestion[]
// }

// const ChevronDown = ({ className = '' }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={className}>
//     <path
//       d="M5 7.5L10 12.5L15 7.5"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// )

// function Menu({ data, footerData, suggestions }: Props) {
//   const mainItems = data?.desktop?.items || []
//   const pathname = usePathname()

//   const rowRef = useRef<HTMLDivElement | null>(null)
//   const indicatorRef = useRef<HTMLDivElement | null>(null)
//   const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

//   const isItemActive = (href: string) => {
//     if (!href) return false

//     const cleanHref = href.split('#')[0]

//     if (cleanHref === '/') return pathname === '/'
//     return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`)
//   }

//   const hasChildren = (item: { children?: { href: string }[] }) =>
//     Array.isArray(item?.children) && item.children.length > 0

//   const isChildActive = (children?: { href: string }[]) => {
//     if (!children?.length) return false
//     return children.some((child) => isItemActive(child.href))
//   }

//   const isParentActive = (item: { href: string; children?: { href: string }[] }) => {
//     return isItemActive(item.href) || isChildActive(item.children)
//   }

//   const activeIndex = mainItems.findIndex((item) => isParentActive(item))
//   const hasMountedRef = useRef(false)
//   const updateIndicator = (duration = 0.4) => {
//     const activeLink = linkRefs.current[activeIndex]
//     const indicator = indicatorRef.current
//     const row = rowRef.current

//     if (!activeLink || !indicator || !row) return

//     const tabBounds = activeLink.getBoundingClientRect()
//     const rowBounds = row.getBoundingClientRect()
//     const offset = tabBounds.left - rowBounds.left

//     gsap.to(indicator, {
//       x: offset,
//       yPercent: -50,
//       width: tabBounds.width,
//       height: tabBounds.height,
//       duration,
//       ease: 'back.out(1)',
//       autoAlpha: 1,
//     })
//   }

//   useGSAP(
//     () => {
//       if (activeIndex === -1) {
//         gsap.set(indicatorRef.current, { autoAlpha: 0 })
//         return
//       }

//       updateIndicator(hasMountedRef.current ? 0.4 : 0)
//       hasMountedRef.current = true

//       const handleResize = () => updateIndicator(0.25)

//       window.addEventListener('resize', handleResize)

//       return () => {
//         window.removeEventListener('resize', handleResize)
//       }
//     },
//     {
//       dependencies: [pathname, activeIndex],
//       scope: rowRef,
//     },
//   )

//   const navLinkClass = (isActive: boolean) => `
//     relative z-10 inline-flex items-center justify-center gap-1
//     rounded-[16px]
//     px-[14px] xl:px-[16px] 2xl:px-[20px]
//     py-[4px] xl:py-[4px] 2xl:py-[6px]
//     transition-colors duration-300 ease-out

//     ${
//       isActive
//         ? `
//           text-white-1
//           opacity-100
//         `
//         : `
//           text-secondary-1
//           opacity-80
//           hover:text-white-1
//           hover:opacity-100
//         `
//     }
//   `

//   const childLinkClass = (isActive: boolean) => `
//     block w-full px-4 py-2 text-left whitespace-nowrap
//     transition-all duration-300 ease-out
//     ${isActive ? 'bg-border-2 text-white-1' : 'hover:bg-border-2 hover:text-white-1'}
//   `

//   return (
//     <div className="h-full font-grift global-p4 text-secondary-1 capitalize">
//       <div
//         ref={rowRef}
//         className="relative flex flex-row items-center justify-evenly w-full h-full"
//       >
//         {/* Animated active indicator */}
//         <div
//           ref={indicatorRef}
//           className="
//             pointer-events-none absolute left-0 top-1/2 z-0
//             -translate-y-1/2
//             rounded-[16px]
//             bg-primary-1
//             border border-primary-2/40
//             opacity-0
//             shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
//           "
//         />

//         {mainItems?.map((item, index) => {
//           const parentActive = isParentActive(item)
//           const itemHasChildren = hasChildren(item)

//           return (
//             <div key={index} className="relative group z-10">
//               <Link
//                 ref={(el) => {
//                   linkRefs.current[index] = el
//                 }}
//                 href={item?.href}
//                 className={navLinkClass(parentActive)}
//               >
//                 <LocalizedText en={item?.label} bn={item?.label} />

//                 {itemHasChildren && (
//                   <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
//                 )}
//               </Link>

//               {itemHasChildren && (
//                 <div
//                   className="
//                     absolute -left-4 top-full z-50 pt-3
//                     opacity-0 invisible translate-y-2
//                     transition-all duration-300 ease-out
//                     group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
//                   "
//                 >
//                   <div
//                     className="
//                       min-w-[220px] overflow-hidden
//                       border-b-[3px] border-b-dark-3 shadow-lg
//                       backdrop-blur-15 bg-[#E8EFF4]
//                     "
//                   >
//                     {item.children?.map((child, childIndex) => (
//                       <Link
//                         key={childIndex}
//                         href={child.href}
//                         className={childLinkClass(isItemActive(child.href))}
//                       >
//                         <LocalizedText en={child.label} bn={child.label} />
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Menu

// === ===============================================================
// === ===============================================================
// === ===============================================================

'use client'

import { Footer } from '@/payload-types'
import { gsap, useGSAP } from '@/lib/gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import LocalizedText from '../../shared/LocalizedText'
import { NavbarData, SearchSuggestion } from './ServerNavbar'

type Props = {
  data: NavbarData
  footerData: Footer
  suggestions: SearchSuggestion[]
}

const ChevronDown = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function Menu({ data, footerData, suggestions }: Props) {
  const mainItems = data?.desktop?.items || []
  const pathname = usePathname()

  const rowRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const hasMountedRef = useRef(false)

  const isItemActive = (href: string) => {
    if (!href) return false

    const cleanHref = href.split('#')[0]

    if (cleanHref === '/') return pathname === '/'

    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`)
  }

  const hasChildren = (item: { children?: { href: string }[] }) =>
    Array.isArray(item?.children) && item.children.length > 0

  const isChildActive = (children?: { href: string }[]) => {
    if (!children?.length) return false
    return children.some((child) => isItemActive(child.href))
  }

  const isParentActive = (item: { href: string; children?: { href: string }[] }) => {
    return isItemActive(item.href) || isChildActive(item.children)
  }

  const activeIndex = mainItems.findIndex((item) => isParentActive(item))

  const updateIndicator = (duration = 0.4) => {
    const activeLink = linkRefs.current[activeIndex]
    const indicator = indicatorRef.current
    const row = rowRef.current

    if (!activeLink || !indicator || !row) return

    const tabBounds = activeLink.getBoundingClientRect()
    const rowBounds = row.getBoundingClientRect()
    const offset = tabBounds.left - rowBounds.left

    gsap.to(indicator, {
      x: offset,
      yPercent: -50,
      width: tabBounds.width,
      height: tabBounds.height,
      duration,
      ease: 'back.out(1)',
      autoAlpha: 1,
    })
  }

  useGSAP(
    () => {
      if (activeIndex === -1) {
        gsap.set(indicatorRef.current, { autoAlpha: 0 })
        return
      }

      updateIndicator(hasMountedRef.current ? 0.4 : 0)
      hasMountedRef.current = true

      const handleResize = () => updateIndicator(0.25)

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    {
      dependencies: [pathname, activeIndex],
      scope: rowRef,
    },
  )

  const navLinkClass = (isActive: boolean) => `
    relative z-10 inline-flex items-center justify-center gap-1
    rounded-[16px]
    px-[14px] xl:px-[16px] 2xl:px-[20px]
    py-[4px] xl:py-[4px] 2xl:py-[6px]
    transition-colors duration-300 ease-in

    ${
      isActive
        ? `
          text-white-1
          opacity-100
        `
        : `
          text-secondary-1
          opacity-80
          hover:text-white-1
          hover:opacity-100
        `
    }
  `

  const childLinkClass = (isActive: boolean) => `
    group/child relative block w-full whitespace-nowrap
    px-5 py-3
    text-left
    font-grift global-p5
    transition-all duration-300 ease-out

    ${
      isActive
        ? `
          bg-primary-1
          text-white-1
          opacity-100
        `
        : `
          text-secondary-1/80
          hover:bg-primary-1
          hover:text-white-1
          hover:pl-6
        `
    }
  `

  return (
    <div className="h-full font-grift global-p4 text-secondary-1 capitalize">
      <div
        ref={rowRef}
        className="relative flex h-full w-full flex-row items-center justify-evenly"
      >
        {/* Animated active indicator */}
        <div
          ref={indicatorRef}
          className="
            pointer-events-none absolute left-0 top-1/2 z-0
            rounded-[16px]
            border border-primary-2/40
            bg-primary-1
            opacity-0
            shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
          "
        />

        {mainItems?.map((item, index) => {
          const parentActive = isParentActive(item)
          const itemHasChildren = hasChildren(item)

          return (
            <div key={index} className="relative group z-20">
              <Link
                ref={(el) => {
                  linkRefs.current[index] = el
                }}
                href={item?.href}
                className={navLinkClass(parentActive)}
              >
                <LocalizedText en={item?.label} bn={item?.label} />

                {itemHasChildren && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>

              {itemHasChildren && (
                <div
                  className="
                    invisible absolute left-1/2 top-full z-50
                    min-w-[240px] -translate-x-1/2 translate-y-3 pt-4
                    opacity-0
                    transition-all duration-300 ease-out
                    group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                  "
                >
                  <div
                    className="
                      overflow-hidden rounded-[18px]
                      border border-primary-2/30
                      bg-white-1/95
                      shadow-[0_20px_50px_rgba(10,17,40,0.18)]
                      backdrop-blur-[15px]
                    "
                  >
                    {item.children?.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={childLinkClass(isItemActive(child.href))}
                      >
                        <span className="relative z-10">
                          <LocalizedText en={child.label} bn={child.label} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Menu
