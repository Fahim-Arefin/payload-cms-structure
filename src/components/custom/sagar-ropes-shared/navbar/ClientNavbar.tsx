// import React from 'react'
// import { NavbarData, SearchSuggestion } from './ServerNavbar'
// import Image from 'next/image'
// import Link from 'next/link'
// import Menu from './Menu'
// import MobileNavbar from './MobileNavbar'
// import { Footer } from '@/payload-types'
// import SearchIcon from '/public/assets/icons/search-icon.png'

// type Props = {
//   data: NavbarData
//   blur: string
//   footerData: Footer
//   suggestions: SearchSuggestion[]
// }

// function ClientNavbar({ data, blur, footerData, suggestions }: Props) {
//   const logoUrl =
//     data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

//   return (
//     <div>
//       {/* mobile */}
//       <MobileNavbar data={data} blur={blur} suggestions={suggestions} footerData={footerData} />

//       <div
//         className="hidden lg:flex justify-between
//         fixed inset-x-0 top-6
//         z-50
//         w-[80%] mx-auto
//         h-[60px] lg:h-[65px]
//         rounded-[20px]
//     "
//         style={{
//           // background: 'linear-gradient(180deg, rgba(255, 251, 252, 0) 0%, #006C67 80%)',
//           background: `
//       linear-gradient(0deg, #006C67 0%, rgba(0, 210, 200, 0) 180%),
//       linear-gradient(180deg, rgba(255, 251, 252, 0) 0%, #006C67 80%)

//     `,
//         }}
//       >
//         {/* logo */}
//         <div
//           className="flex items-center justify-center
//           w-[15%]
//        "
//         >
//           <div
//             className="relative aspect-[80/46]
//         scale-110 hover:scale-100 transition-all duration-300 ease-in
//         w-full h-full"
//           >
//             <Link href="/" aria-label="Home">
//               {typeof data.branding.logo === 'object' && data.branding.logo?.url && (
//                 <Image
//                   src={logoUrl}
//                   alt="Company logo"
//                   fill
//                   className="object-contain w-full h-full"
//                   priority
//                   placeholder="blur"
//                   blurDataURL={blur || ''}
//                   quality={90}
//                 />
//               )}
//             </Link>
//           </div>
//         </div>
//         {/* border border-black */}
//         <div className=" grow ">
//           <Menu data={data} footerData={footerData} suggestions={suggestions} />
//         </div>
//         <div className="w-[15%]  flex items-center justify-center">
//           <div className="p-[9px] w-[36px] h-[36px] flex justify-center items-center bg-[#006C67] rounded-md">
//             <Image
//               src={SearchIcon}
//               alt="Search"
//               width={36}
//               height={36}
//               className="object-contain w-full h-full"
//               placeholder="blur"
//               blurDataURL={SearchIcon.blurDataURL}
//               quality={90}
//             />
//           </div>
//         </div>
//       </div>
//       {/* white overlay */}
//       <div
//         className="
//     pointer-events-none
//     fixed inset-x-0 top-0 z-40
//     hidden lg:block
//     h-[95px] w-full
//   "
//         style={{
//           backdropFilter: 'blur(10px)',
//           WebkitBackdropFilter: 'blur(10px)',
//         }}
//       />
//     </div>
//   )
// }

// export default ClientNavbar

'use client'
import React, { useRef } from 'react'
import { NavbarData, SearchSuggestion } from './ServerNavbar'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'
import MobileNavbar from './MobileNavbar'
import { Footer } from '@/payload-types'
import SearchIcon from '/public/assets/icons/search-icon.png'
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap'

type Props = {
  data: NavbarData
  blur: string
  footerData: Footer
  suggestions: SearchSuggestion[]
}

function ClientNavbar({ data, blur, footerData, suggestions }: Props) {
  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  const navbarRef = useRef<HTMLDivElement | null>(null)
  const isHiddenRef = useRef(false)

  useGSAP(() => {
    const navbar = navbarRef.current
    if (!navbar) return

    const showNavbar = () => {
      if (!isHiddenRef.current) return

      isHiddenRef.current = false

      gsap.to(navbar, {
        y: 0,
        duration: 0.4,
        ease: 'back.out',
        overwrite: 'auto',
      })
    }

    const hideNavbar = () => {
      if (isHiddenRef.current) return

      isHiddenRef.current = true

      gsap.to(navbar, {
        y: -110,
        duration: 0.4,
        // ease: 'power3.out',
        ease: 'back.out',
        overwrite: 'auto',
      })
    }

    const scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',

      onUpdate: (self) => {
        if (self.scroll() < 850) {
          showNavbar()
          return
        }

        if (self.direction === 1) {
          hideNavbar()
        }

        if (self.direction === -1) {
          showNavbar()
        }
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [])

  return (
    <div>
      {/* mobile */}
      <MobileNavbar data={data} blur={blur} suggestions={suggestions} footerData={footerData} />

      <div
        ref={navbarRef}
        className="hidden lg:flex justify-between 
        fixed inset-x-0 top-6
        z-50 
        w-[80%] mx-auto
        h-[60px] lg:h-[65px]
        rounded-[20px]
        will-change-transform
    "
        style={{
          // background: 'linear-gradient(180deg, rgba(255, 251, 252, 0) 0%, #006C67 80%)',
          background: `
      linear-gradient(0deg, #006C67 0%, rgba(0, 210, 200, 0) 180%),
      linear-gradient(180deg, rgba(255, 251, 252, 0) 0%, #006C67 80%)
          
    `,
        }}
      >
        {/* logo */}
        <div
          className="flex items-center justify-center
          w-[15%]
       "
        >
          <div
            className="relative aspect-[80/46]
        scale-110 hover:scale-100 transition-all duration-300 ease-in
        w-full h-full"
          >
            <Link href="/" aria-label="Home">
              {typeof data.branding.logo === 'object' && data.branding.logo?.url && (
                <Image
                  src={logoUrl}
                  alt="Company logo"
                  fill
                  className="object-contain w-full h-full"
                  priority
                  placeholder="blur"
                  blurDataURL={blur || ''}
                  quality={90}
                />
              )}
            </Link>
          </div>
        </div>
        {/* border border-black */}
        <div className=" grow ">
          <Menu data={data} footerData={footerData} suggestions={suggestions} />
        </div>
        <div className="w-[15%]  flex items-center justify-center">
          <div className="p-[9px] w-[36px] h-[36px] flex justify-center items-center bg-[#006C67] rounded-md">
            <Image
              src={SearchIcon}
              alt="Search"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              placeholder="blur"
              blurDataURL={SearchIcon.blurDataURL}
              quality={90}
            />
          </div>
        </div>
      </div>
      {/* white overlay */}
      <div
        className="
    pointer-events-none
    fixed inset-x-0 top-0 z-40
    hidden lg:block
    h-[95px] w-full
  "
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />
    </div>
  )
}

export default ClientNavbar
