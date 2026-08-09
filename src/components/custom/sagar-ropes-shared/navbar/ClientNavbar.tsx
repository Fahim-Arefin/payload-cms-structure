// 'use client'

// import React, { useRef } from 'react'
// import { NavbarData, SearchSuggestion } from './ServerNavbar'
// import Image from 'next/image'
// import Link from 'next/link'
// import Menu from './Menu'
// import MobileNavbar from './MobileNavbar'
// import { Footer } from '@/payload-types'
// import SearchIcon from '/public/assets/icons/search-icon.png'
// import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap'

// type Props = {
//   data: NavbarData
//   blur: string
//   footerData: Footer
//   suggestions: SearchSuggestion[]
// }

// function ClientNavbar({ data, blur, footerData, suggestions }: Props) {
//   const logoUrl =
//     data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

//   const navbarRef = useRef<HTMLDivElement | null>(null)

//   const logoBoxRef = useRef<HTMLDivElement | null>(null)
//   const logoInnerRef = useRef<HTMLAnchorElement | null>(null)
//   const logoVisualRef = useRef<HTMLSpanElement | null>(null)

//   const searchBoxRef = useRef<HTMLDivElement | null>(null)
//   const searchInnerRef = useRef<HTMLDivElement | null>(null)
//   const searchIconRef = useRef<HTMLImageElement | null>(null)

//   const isScrolledStyleRef = useRef(false)

//   useGSAP(() => {
//     const navbar = navbarRef.current

//     const logoBox = logoBoxRef.current
//     const logoInner = logoInnerRef.current
//     const logoVisual = logoVisualRef.current

//     const searchBox = searchBoxRef.current
//     const searchInner = searchInnerRef.current
//     const searchIcon = searchIconRef.current

//     if (
//       !navbar ||
//       !logoBox ||
//       !logoInner ||
//       !logoVisual ||
//       !searchBox ||
//       !searchInner ||
//       !searchIcon
//     )
//       return

//     gsap.set(logoVisual, {
//       scale: 1,
//       transformOrigin: 'center center',
//     })

//     gsap.set(searchInner, {
//       backgroundColor: 'rgba(0, 108, 103, 0)',
//     })

//     gsap.set(searchIcon, {
//       scale: 1.15,
//       transformOrigin: 'center center',
//     })

//     const getCenterMoveX = (parent: HTMLElement, child: HTMLElement) => {
//       const parentRect = parent.getBoundingClientRect()
//       const childRect = child.getBoundingClientRect()

//       const parentCenter = parentRect.left + parentRect.width / 2
//       const childCenter = childRect.left + childRect.width / 2

//       return parentCenter - childCenter
//     }

//     const applyScrolledStyle = () => {
//       if (isScrolledStyleRef.current) return

//       isScrolledStyleRef.current = true

//       const logoX = getCenterMoveX(logoBox, logoInner)
//       const searchX = getCenterMoveX(searchBox, searchInner)

//       gsap.to(navbar, {
//         backgroundColor: '#0A1128',
//         duration: 0.65,
//         ease: 'power2.out',
//         overwrite: 'auto',
//       })

//       gsap.to(logoInner, {
//         x: logoX,
//         duration: 0.65,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })

//       gsap.to(searchInner, {
//         x: searchX,
//         duration: 0.65,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     const removeScrolledStyle = () => {
//       if (!isScrolledStyleRef.current) return

//       isScrolledStyleRef.current = false

//       gsap.to(navbar, {
//         backgroundColor: 'transparent',
//         duration: 0.65,
//         ease: 'power2.out',
//         overwrite: 'auto',
//       })

//       gsap.to(logoInner, {
//         x: 0,
//         duration: 0.65,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })

//       gsap.to(searchInner, {
//         x: 0,
//         duration: 0.65,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     const handleResize = () => {
//       if (!isScrolledStyleRef.current) return

//       const logoX = getCenterMoveX(logoBox, logoInner)
//       const searchX = getCenterMoveX(searchBox, searchInner)

//       gsap.set(logoInner, {
//         x: logoX,
//       })

//       gsap.set(searchInner, {
//         x: searchX,
//       })
//     }

//     const handleLogoEnter = () => {
//       gsap.to(logoVisual, {
//         scale: 0.98,
//         duration: 0.55,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     const handleLogoLeave = () => {
//       gsap.to(logoVisual, {
//         scale: 1,
//         duration: 0.55,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     const handleSearchEnter = () => {
//       gsap.to(searchInner, {
//         backgroundColor: '#006C67',
//         duration: 0.55,
//         ease: 'power2.out',
//         overwrite: 'auto',
//       })

//       gsap.to(searchIcon, {
//         scale: 1,
//         duration: 0.55,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     const handleSearchLeave = () => {
//       gsap.to(searchInner, {
//         backgroundColor: 'rgba(0, 108, 103, 0)',
//         duration: 0.55,
//         ease: 'power2.out',
//         overwrite: 'auto',
//       })

//       gsap.to(searchIcon, {
//         scale: 1.15,
//         duration: 0.55,
//         ease: 'power3.out',
//         overwrite: 'auto',
//       })
//     }

//     logoInner.addEventListener('mouseenter', handleLogoEnter)
//     logoInner.addEventListener('mouseleave', handleLogoLeave)

//     searchInner.addEventListener('mouseenter', handleSearchEnter)
//     searchInner.addEventListener('mouseleave', handleSearchLeave)

//     const scrollTrigger = ScrollTrigger.create({
//       start: 0,
//       end: 'max',
//       onUpdate: (self) => {
//         if (self.scroll() >= 850) {
//           applyScrolledStyle()
//         } else {
//           removeScrolledStyle()
//         }
//       },
//     })

//     window.addEventListener('resize', handleResize)

//     if (window.scrollY >= 850) {
//       applyScrolledStyle()
//     }

//     return () => {
//       scrollTrigger.kill()
//       window.removeEventListener('resize', handleResize)

//       logoInner.removeEventListener('mouseenter', handleLogoEnter)
//       logoInner.removeEventListener('mouseleave', handleLogoLeave)

//       searchInner.removeEventListener('mouseenter', handleSearchEnter)
//       searchInner.removeEventListener('mouseleave', handleSearchLeave)
//     }
//   }, [])

//   return (
//     <div>
//       {/* mobile */}
//       <MobileNavbar data={data} blur={blur} suggestions={suggestions} footerData={footerData} />

//       <div
//         ref={navbarRef}
//         className="
//           hidden lg:flex justify-between
//           fixed inset-x-0 top-6
//           z-50
//           w-[85%] xl:w-[80%] mx-auto

//           h-[60px] lg:h-[65px] xl:h-[75px]
//           py-[6px] lg:py-[7px] xl:py-[8px]

//           rounded-[20px]
//           will-change-[background-color]
//         "
//       >
//         {/* logo */}
//         <div
//           ref={logoBoxRef}
//           className="flex h-full w-[15%] xl:w-[20%] items-center justify-start overflow-hidden"
//         >
//           <Link
//             ref={logoInnerRef}
//             href="/"
//             aria-label="Home"
//             className="
//               block
//               h-[58%]
//               lg:h-[82%]
//               xl:h-[90%]
//               2xl:h-[95%]
//               will-change-transform
//             "
//           >
//             <span ref={logoVisualRef} className="block h-full will-change-transform">
//               {typeof data.branding.logo === 'object' && data.branding.logo?.url && (
//                 <Image
//                   src={logoUrl}
//                   alt="Company logo"
//                   width={300}
//                   height={120}
//                   className="
//                     h-full w-auto
//                     object-contain object-left
//                   "
//                   priority
//                   placeholder="blur"
//                   blurDataURL={blur || ''}
//                   quality={90}
//                   sizes="(max-width: 1024px) 90px, (max-width: 1439px) 110px, (max-width: 1700px) 135px, 165px"
//                 />
//               )}
//             </span>
//           </Link>
//         </div>

//         {/* menu */}
//         <div className="grow">
//           <Menu data={data} footerData={footerData} suggestions={suggestions} />
//         </div>

//         {/* search */}
//         <div ref={searchBoxRef} className="w-[10%] xl:w-[15%] flex items-center justify-end">
//           <div
//             ref={searchInnerRef}
//             className="
//               p-[7px] xl:p-[9px]
//               w-[30px] xl:w-[36px]
//               h-[30px] xl:h-[36px]
//               flex justify-center items-center
//               rounded-md
//               will-change-transform
//             "
//           >
//             <Image
//               ref={searchIconRef}
//               src={SearchIcon}
//               alt="Search"
//               width={36}
//               height={36}
//               className="
//                 object-contain
//                 w-full h-full
//                 will-change-transform
//               "
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
//           pointer-events-none
//           fixed inset-x-0 top-0 z-40
//           hidden lg:block
//           h-[140px] w-full
//         "
//         style={{
//           backdropFilter: 'blur(6px)',
//           WebkitBackdropFilter: 'blur(6px)',
//           maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
//           WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
//         }}
//       />
//     </div>
//   )
// }

// export default ClientNavbar

'use client'

import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { Footer } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CloseIcon from 'public/assets/icons/close.png'
import SearchIcon from 'public/assets/icons/search-icon.png'
import React, { useEffect, useRef, useState } from 'react'
import Menu from './Menu'
import MobileNavbar from './MobileNavbar'
import SearchBarSection from './SearchBarSection'
import { NavbarData, SearchSuggestion } from './ServerNavbar'

type Props = {
  data: NavbarData
  blur: string
  footerData: Footer
  suggestions: SearchSuggestion[]
}

function ClientNavbar({ data, blur, footerData, suggestions }: Props) {
  const pathname = usePathname()

  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  const navbarRef = useRef<HTMLDivElement | null>(null)

  const logoBoxRef = useRef<HTMLDivElement | null>(null)
  const logoInnerRef = useRef<HTMLAnchorElement | null>(null)
  const logoVisualRef = useRef<HTMLSpanElement | null>(null)

  const searchBoxRef = useRef<HTMLDivElement | null>(null)
  const searchInnerRef = useRef<HTMLButtonElement | null>(null)
  const searchIconRef = useRef<HTMLImageElement | null>(null)

  const searchPanelRef = useRef<HTMLDivElement | null>(null)
  const searchPanelInnerRef = useRef<HTMLDivElement | null>(null)

  const [searchPanelOpen, setSearchPanelOpen] = useState(false)

  const isScrolledStyleRef = useRef(false)

  const footerAny = footerData as any

  const callPhone =
    footerAny?.branding?.phone ||
    footerAny?.contactInfoSection?.phone ||
    footerAny?.factorySection?.phone ||
    footerAny?.contactInfo?.phone ||
    ''

  const callHref = callPhone ? `tel:${String(callPhone).replace(/[^\d+]/g, '')}` : '/contact'

  useEffect(() => {
    if (!searchPanelOpen) return

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [searchPanelOpen])

  useEffect(() => {
    setSearchPanelOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!searchPanelOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchPanelOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [searchPanelOpen])

  useGSAP(() => {
    const navbar = navbarRef.current

    const logoBox = logoBoxRef.current
    const logoInner = logoInnerRef.current
    const logoVisual = logoVisualRef.current

    const searchBox = searchBoxRef.current
    const searchInner = searchInnerRef.current
    const searchIcon = searchIconRef.current

    if (
      !navbar ||
      !logoBox ||
      !logoInner ||
      !logoVisual ||
      !searchBox ||
      !searchInner ||
      !searchIcon
    ) {
      return
    }

    gsap.set(logoVisual, {
      scale: 1,
      transformOrigin: 'center center',
    })

    gsap.set(searchInner, {
      backgroundColor: 'rgba(0, 108, 103, 0)',
    })

    gsap.set(searchIcon, {
      scale: 1.15,
      transformOrigin: 'center center',
    })

    const getCenterMoveX = (parent: HTMLElement, child: HTMLElement) => {
      const parentRect = parent.getBoundingClientRect()
      const childRect = child.getBoundingClientRect()

      const parentCenter = parentRect.left + parentRect.width / 2
      const childCenter = childRect.left + childRect.width / 2

      return parentCenter - childCenter
    }

    const applyScrolledStyle = () => {
      if (isScrolledStyleRef.current) return

      isScrolledStyleRef.current = true

      const logoX = getCenterMoveX(logoBox, logoInner)
      const searchX = getCenterMoveX(searchBox, searchInner)

      gsap.to(navbar, {
        backgroundColor: '#0A1128',
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      gsap.to(logoInner, {
        x: logoX,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      gsap.to(searchInner, {
        x: searchX,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const removeScrolledStyle = () => {
      if (!isScrolledStyleRef.current) return

      isScrolledStyleRef.current = false

      gsap.to(navbar, {
        backgroundColor: 'transparent',
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      gsap.to(logoInner, {
        x: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      gsap.to(searchInner, {
        x: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handleResize = () => {
      if (!isScrolledStyleRef.current) return

      const logoX = getCenterMoveX(logoBox, logoInner)
      const searchX = getCenterMoveX(searchBox, searchInner)

      gsap.set(logoInner, {
        x: logoX,
      })

      gsap.set(searchInner, {
        x: searchX,
      })
    }

    const handleLogoEnter = () => {
      gsap.to(logoVisual, {
        scale: 0.98,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handleLogoLeave = () => {
      gsap.to(logoVisual, {
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handleSearchEnter = () => {
      gsap.to(searchInner, {
        backgroundColor: '#006C67',
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      gsap.to(searchIcon, {
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const handleSearchLeave = () => {
      gsap.to(searchInner, {
        backgroundColor: 'rgba(0, 108, 103, 0)',
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      gsap.to(searchIcon, {
        scale: 1.15,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    logoInner.addEventListener('mouseenter', handleLogoEnter)
    logoInner.addEventListener('mouseleave', handleLogoLeave)

    searchInner.addEventListener('mouseenter', handleSearchEnter)
    searchInner.addEventListener('mouseleave', handleSearchLeave)

    const scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (self.scroll() >= 850) {
          applyScrolledStyle()
        } else {
          removeScrolledStyle()
        }
      },
    })

    window.addEventListener('resize', handleResize)

    if (window.scrollY >= 850) {
      applyScrolledStyle()
    }

    return () => {
      scrollTrigger.kill()
      window.removeEventListener('resize', handleResize)

      logoInner.removeEventListener('mouseenter', handleLogoEnter)
      logoInner.removeEventListener('mouseleave', handleLogoLeave)

      searchInner.removeEventListener('mouseenter', handleSearchEnter)
      searchInner.removeEventListener('mouseleave', handleSearchLeave)
    }
  }, [])

  useGSAP(
    () => {
      const panel = searchPanelRef.current
      const inner = searchPanelInnerRef.current

      if (!panel || !inner) return

      if (searchPanelOpen) {
        gsap.set(panel, {
          autoAlpha: 1,
          pointerEvents: 'auto',
          xPercent: 100,
        })

        gsap.to(panel, {
          xPercent: 0,
          duration: 0.48,
          ease: 'power3.out',
          overwrite: 'auto',
        })

        gsap.fromTo(
          inner.children,
          {
            autoAlpha: 0,
            y: 14,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.045,
            delay: 0.12,
            ease: 'power3.out',
            overwrite: 'auto',
          },
        )
      } else {
        gsap.to(panel, {
          xPercent: 100,
          autoAlpha: 0,
          duration: 0.36,
          ease: 'power2.inOut',
          pointerEvents: 'none',
          overwrite: 'auto',
        })
      }
    },
    {
      dependencies: [searchPanelOpen],
    },
  )

  return (
    <div>
      {/* mobile */}
      <MobileNavbar data={data} blur={blur} footerData={footerData} suggestions={suggestions} />

      <div
        ref={navbarRef}
        className="
          hidden lg:flex justify-between
          fixed inset-x-0 top-6
          z-50
          w-[85%] xl:w-[80%] mx-auto

          h-[60px] lg:h-[65px] xl:h-[75px]
          py-[6px] lg:py-[7px] xl:py-[8px]

          rounded-[20px]
          will-change-[background-color]
        "
      >
        {/* logo */}
        <div
          ref={logoBoxRef}
          className="flex h-full w-[15%] xl:w-[20%] items-center justify-start overflow-hidden"
        >
          <Link
            ref={logoInnerRef}
            href="/"
            aria-label="Home"
            className="
              block
              h-[58%]
              lg:h-[82%]
              xl:h-[90%]
              2xl:h-[95%]
              will-change-transform
            "
          >
            <span ref={logoVisualRef} className="block h-full will-change-transform">
              {typeof data.branding.logo === 'object' && data.branding.logo?.url && (
                <Image
                  src={logoUrl}
                  alt="Company logo"
                  width={300}
                  height={120}
                  className="
                    h-full w-auto
                    object-contain object-left
                  "
                  priority
                  placeholder="blur"
                  blurDataURL={blur || ''}
                  quality={90}
                  sizes="(max-width: 1024px) 90px, (max-width: 1439px) 110px, (max-width: 1700px) 135px, 165px"
                />
              )}
            </span>
          </Link>
        </div>

        {/* menu */}
        <div className="grow">
          <Menu data={data} footerData={footerData} suggestions={suggestions} />
        </div>

        {/* search */}
        <div ref={searchBoxRef} className="w-[10%] xl:w-[15%] flex items-center justify-end">
          <button
            ref={searchInnerRef}
            type="button"
            aria-label="Open search panel"
            onClick={() => setSearchPanelOpen(true)}
            className="
              p-[7px] xl:p-[9px]
              w-[30px] xl:w-[36px]
              h-[30px] xl:h-[36px]
              flex justify-center items-center
              rounded-md
              will-change-transform
              outline-none
              focus:outline-none
              focus-visible:ring-1
              focus-visible:ring-primary-2
            "
          >
            <Image
              ref={searchIconRef}
              src={SearchIcon}
              alt="Search"
              width={36}
              height={36}
              className="
                object-contain
                w-full h-full
                will-change-transform
              "
              placeholder="blur"
              blurDataURL={SearchIcon.blurDataURL}
              quality={90}
            />
          </button>
        </div>
      </div>

      {/* desktop search drawer */}
      <div
        ref={searchPanelRef}
        className="
          invisible pointer-events-none fixed right-0 top-0 z-[90]
          hidden h-dvh opacity-0 lg:block

          lg:w-[32vw]
          xl:w-[31vw]
          2xl:w-[30vw]
          min-w-[360px]
          max-w-[500px]

          shadow-[-18px_0_70px_rgba(0,0,0,0.22)]
        "
        style={{
          background: `
            radial-gradient(circle at 50% 72%, rgba(0,108,103,0.68) 0%, rgba(0,108,103,0.42) 26%, rgba(10,17,40,0.98) 72%),
            linear-gradient(180deg, #0A1128 0%, #0A1128 58%, #006C67 155%)
          `,
        }}
      >
        <div
          ref={searchPanelInnerRef}
          className="
            relative z-10 flex h-full flex-col
            overflow-y-auto overflow-x-hidden
            px-[28px] pb-[46px] pt-[22px]
            lg:px-[30px]
            xl:px-[36px]
          "
        >
          <button
            type="button"
            aria-label="Close search panel"
            onClick={() => setSearchPanelOpen(false)}
            className="
    absolute right-[12px] top-[20px] z-20
    flex size-[42px] items-center justify-center
    overflow-visible
    rounded-full
    transition-all duration-300 ease-out
    hover:rotate-90 hover:scale-105
    active:scale-95
    xl:right-[16px] xl:top-[24px] xl:size-[46px]
  "
          >
            <Image
              src={CloseIcon}
              alt=""
              width={44}
              height={44}
              className="
      h-[24px] w-[24px]
      scale-[1.9]
      object-contain
      drop-shadow-[0_2px_8px_rgba(255,255,255,0.22)]
      xl:h-[32px] xl:w-[32px]
    "
              quality={100}
            />
          </button>

          <div className="mt-[44px]">
            <div
              className="
                font-grift text-[13px] font-medium leading-none text-white-1/80
              "
            >
              Search
            </div>

            <div className="relative z-[999] mt-[12px]">
              <SearchBarSection suggestions={suggestions} center variant="mobileDrawer" />
            </div>
          </div>

          <div className="mt-auto text-center">
            <h3
              className="
                mx-auto max-w-[330px]
                font-grift font-semibold global-p4
                text-[#FFFBFC]
                xl:max-w-[360px]
              "
            >
              “Big growth steps often bring big challenges”
            </h3>

            <p
              className="
                mx-auto mt-[18px] max-w-[335px]
                font-grift  global-p5
                text-[#FFFBFC]
                xl:max-w-[365px]
              "
            >
              but our team is here to make the transition seamless. Reach out today so we can
              kickstart your success together.
            </p>

            <div className="mt-[26px] flex justify-center">
              <Link
                href={callHref}
                onClick={() => setSearchPanelOpen(false)}
                className="inline-flex"
              >
                <Button01 type="button">Call Instantly</Button01>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* white overlay */}
      <div
        className="
          pointer-events-none
          fixed inset-x-0 top-0 z-40
          hidden lg:block
          h-[140px] w-full
        "
        style={{
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
        }}
      />
    </div>
  )
}

export default ClientNavbar
