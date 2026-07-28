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

  const logoBoxRef = useRef<HTMLDivElement | null>(null)
  const logoInnerRef = useRef<HTMLAnchorElement | null>(null)
  const logoVisualRef = useRef<HTMLSpanElement | null>(null)

  const searchBoxRef = useRef<HTMLDivElement | null>(null)
  const searchInnerRef = useRef<HTMLDivElement | null>(null)
  const searchIconRef = useRef<HTMLImageElement | null>(null)

  const isScrolledStyleRef = useRef(false)

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
    )
      return

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

  return (
    <div>
      {/* mobile */}
      <MobileNavbar data={data} blur={blur} suggestions={suggestions} footerData={footerData} />

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
          <div
            ref={searchInnerRef}
            className="
              p-[7px] xl:p-[9px]
              w-[30px] xl:w-[36px]
              h-[30px] xl:h-[36px]
              flex justify-center items-center
              rounded-md
              will-change-transform
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
