'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import type { Footer } from '@/payload-types'
import type { NavbarData, SearchSuggestion } from './ServerNavbar'

import { gsap, useGSAP } from '@/lib/gsap'
import LocalizedText from '../../shared/LocalizedText'
import SearchBarSection from './SearchBarSection'

import Facebook from 'public/assets/icons/facebook.png'
import Linkdin from 'public/assets/icons/linkdin.png'
import At from 'public/assets/icons/attherate.png'
import WhatsApp from 'public/assets/icons/whatsapp.png'
import Burger from '/public/assets/icons/burger.png'

type Props = {
  data: NavbarData
  blur: string
  suggestions: SearchSuggestion[]
  footerData: Footer
}

type NavChild = {
  href: string
  label: string
}

type NavItem = {
  href: string
  label: string
  isTop?: string
  children?: NavChild[]
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

function MobileNavbar({ data, blur, suggestions, footerData }: Props) {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string[]>([])

  const drawerRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const mainNavRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const hasMountedRef = useRef(false)

  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  const allItems = (data?.desktop?.items ?? []) as NavItem[]
  const mainItems = allItems.filter((item) => item.isTop !== 'yes')
  const topItems = allItems.filter((item) => item.isTop === 'yes')

  const isItemActive = (href: string) => {
    if (!href) return false

    const cleanHref = href.split('#')[0]

    if (cleanHref === '/') return pathname === '/'

    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`)
  }

  const hasChildren = (item: NavItem) => Array.isArray(item.children) && item.children.length > 0

  const isChildActive = (children?: NavChild[]) => {
    if (!children?.length) return false

    return children.some((child) => isItemActive(child.href))
  }

  const isParentActive = (item: NavItem) => {
    return isItemActive(item.href) || isChildActive(item.children)
  }

  const activeIndex = mainItems.findIndex((item) => isParentActive(item))

  const toggleExpanded = (key: string) => {
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    )
  }

  const updateMobileIndicator = (duration = 0.4) => {
    const activeLink = linkRefs.current[activeIndex]
    const indicator = indicatorRef.current
    const nav = mainNavRef.current

    if (!activeLink || !indicator || !nav) return

    const linkBounds = activeLink.getBoundingClientRect()
    const navBounds = nav.getBoundingClientRect()

    const offsetX = linkBounds.left - navBounds.left
    const offsetY = linkBounds.top - navBounds.top

    gsap.to(indicator, {
      x: offsetX,
      y: offsetY,
      width: linkBounds.width,
      height: linkBounds.height,
      duration,
      ease: 'back.out(1)',
      autoAlpha: 1,
    })
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useGSAP(
    () => {
      const drawer = drawerRef.current
      const overlay = overlayRef.current

      if (!drawer || !overlay) return

      if (open) {
        gsap.set(drawer, {
          autoAlpha: 1,
          pointerEvents: 'auto',
        })

        gsap.to(overlay, {
          autoAlpha: 1,
          duration: 0.25,
          ease: 'power2.out',
          pointerEvents: 'auto',
        })

        gsap.fromTo(
          drawer,
          { xPercent: 100 },
          {
            xPercent: 0,
            duration: 0.45,
            ease: 'back.out(1)',
          },
        )
      } else {
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.25,
          ease: 'power2.out',
          pointerEvents: 'none',
        })

        gsap.to(drawer, {
          xPercent: 100,
          duration: 0.35,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(drawer, {
              autoAlpha: 0,
              pointerEvents: 'none',
            })
          },
        })
      }
    },
    {
      dependencies: [open],
    },
  )

  useGSAP(
    () => {
      if (!open) return

      if (activeIndex === -1) {
        gsap.set(indicatorRef.current, { autoAlpha: 0 })
        return
      }

      const timer = window.setTimeout(() => {
        updateMobileIndicator(hasMountedRef.current ? 0.4 : 0)
        hasMountedRef.current = true
      }, 80)

      const handleResize = () => updateMobileIndicator(0.25)

      window.addEventListener('resize', handleResize)

      return () => {
        window.clearTimeout(timer)
        window.removeEventListener('resize', handleResize)
      }
    },
    {
      dependencies: [open, pathname, activeIndex, expanded],
      scope: mainNavRef,
    },
  )

  const mobileMainLinkClass = (isActive: boolean) => `
    relative z-10 flex w-full items-center justify-between
    rounded-[16px]
    px-5 py-3.5
    font-grift text-[13px] uppercase tracking-[0.04em]
    transition-colors duration-300 ease-out

    ${
      isActive
        ? `
          text-white-1
          opacity-100
        `
        : `
          text-secondary-1/85
          hover:text-primary-1
          hover:opacity-100
        `
    }
  `

  const mobileChildLinkClass = (isActive: boolean) => `
    block rounded-[12px]
    px-4 py-2.5
    font-grift text-[12px] uppercase tracking-[0.04em]
    transition-all duration-300 ease-out

    ${
      isActive
        ? `
          bg-primary-1
          text-white-1
        `
        : `
          text-secondary-1/70
          hover:bg-primary-1/10
          hover:text-primary-1
          hover:pl-5
        `
    }
  `

  const BurgerIcon = ({ open }: { open: boolean }) => (
    <span className="relative block h-[20px] w-[24px] text-white-1">
      {/* Top line */}
      <span
        className={`
        absolute left-0 top-0 h-[2px] w-[24px]
        origin-center rounded-full bg-current
        transition-all duration-300 ease-out
        ${open ? 'translate-y-[9px] rotate-45' : 'translate-y-0 rotate-0'}
      `}
      />

      {/* Middle line */}
      <span
        className={`
        absolute left-0 top-[9px] h-[2px] w-[24px]
        origin-center rounded-full bg-current
        transition-all duration-300 ease-out
        ${open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}
      `}
      />

      {/* Bottom line */}
      <span
        className={`
        absolute left-0 top-[18px] h-[2px] w-[24px]
        origin-center rounded-full bg-current
        transition-all duration-300 ease-out
        ${open ? '-translate-y-[9px] -rotate-45' : 'translate-y-0 rotate-0'}
      `}
      />
    </span>
  )

  return (
    <>
      {/* Mobile top navbar */}
      <div
        className="
          fixed inset-x-0 top-4 z-50 mx-auto
          flex h-[58px] w-[92%] items-center justify-between
          rounded-[20px]
          px-4 lg:hidden
          shadow-[0_18px_45px_rgba(10,17,40,0.16)]
          backdrop-blur-[15px]
        "
        style={{
          background: `
            linear-gradient(0deg, #006C67 0%, rgba(0, 210, 200, 0) 100%),
            linear-gradient(180deg, rgba(255, 251, 252, 0) 0%, rgba(0, 108, 103, 0.5) 79.81%)
          `,
        }}
      >
        <Link href="/" aria-label="Home" className="relative block h-full w-[120px]">
          {typeof data.branding.logo === 'object' && data.branding.logo?.url && (
            <Image
              src={logoUrl}
              alt="Company logo"
              fill
              className="object-contain"
              priority
              placeholder="blur"
              blurDataURL={blur || ''}
              quality={90}
            />
          )}
        </Link>{' '}
        {/* <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
          className="
            relative flex h-10 w-10 items-center justify-center
            rounded-[12px] bg-primary-1 text-white-1
            transition-transform duration-300 ease-out
            hover:scale-105
          "
        >
          {open ? (
            <span className="relative h-5 w-5">
              <span className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          ) : (
            <Image
              src={Burger}
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              quality={80}
              placeholder="blur"
              blurDataURL={Burger?.blurDataURL}
              className="h-6 w-6 object-contain"
            />
          )}
        </button> */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="
    relative flex h-10 w-10 items-center justify-center
    rounded-[12px]
    bg-primary-1
    text-white-1
    shadow-[0_8px_24px_rgba(0,108,103,0.28)]
    transition-all duration-300 ease-out
    hover:scale-105
    active:scale-95
  "
        >
          <BurgerIcon open={open} />
        </button>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="
          pointer-events-none fixed inset-0 z-[60]
          bg-secondary-1/50 opacity-0
          backdrop-blur-[5px]
          lg:hidden
        "
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="
          invisible fixed right-0 top-0 z-[70]
          h-screen w-[88%] max-w-[390px]
          overflow-hidden
          
          border-l border-primary-2/30
          bg-white-1
          opacity-0
          shadow-[0_24px_90px_rgba(10,17,40,0.30)]
          lg:hidden
        "
      >
        {/* Header gradient */}
        <div
          className="
            pointer-events-none absolute inset-x-0 top-0 h-[150px]
          "
          style={{
            background: `
              linear-gradient(0deg, rgba(0,108,103,0.92) 0%, rgba(0,210,200,0.02) 100%),
              linear-gradient(180deg, rgba(255,251,252,0.85) 0%, rgba(0,108,103,0.45) 79.81%)
            `,
          }}
        />

        <div className="relative z-10 flex h-full flex-col overflow-y-auto overflow-x-hidden px-5 pb-8 pt-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            {typeof data.branding.logo === 'object' && data.branding.logo?.url && (
              <Link
                href="/"
                aria-label="Home"
                onClick={() => setOpen(false)}
                className="relative block w-[160px] aspect-[80/46]"
              >
                <Image
                  src={logoUrl}
                  alt="Company logo"
                  fill
                  className="object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL={blur || ''}
                  quality={90}
                />
              </Link>
            )}

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-[12px] bg-primary-1 text-white-1
                shadow-[0_10px_30px_rgba(0,108,103,0.25)]
              "
            >
              <span className="relative h-5 w-5">
                <span className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          {/* Menu card */}
          <div className="mt-9 rounded-[22px] bg-white-1/95 p-2 shadow-[0_12px_40px_rgba(10,17,40,0.08)]">
            <nav ref={mainNavRef} className="relative flex flex-col gap-1">
              <div
                ref={indicatorRef}
                className="
                  pointer-events-none absolute left-0 top-0 z-0
                  rounded-[16px]
                  border border-primary-2/40
                  bg-primary-1
                  opacity-0
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
                "
              />

              {mainItems.map((item, index) => {
                const key = `${item.href}-${index}`
                const itemHasChildren = hasChildren(item)
                const itemExpanded = expanded.includes(key)
                const itemActive = isParentActive(item)

                return (
                  <div key={key} className="relative z-10">
                    <div className="relative flex items-center">
                      <Link
                        ref={(el) => {
                          linkRefs.current[index] = el
                        }}
                        href={item.href}
                        onClick={() => {
                          if (!itemHasChildren) setOpen(false)
                        }}
                        className={mobileMainLinkClass(itemActive)}
                      >
                        <LocalizedText en={item.label} bn={item.label} />
                      </Link>

                      {itemHasChildren && (
                        <button
                          type="button"
                          aria-label="Toggle submenu"
                          onClick={() => toggleExpanded(key)}
                          className={`
                            absolute right-3 top-1/2 z-20
                            flex h-7 w-7 -translate-y-1/2 items-center justify-center
                            rounded-full
                            transition-colors duration-300
                            ${
                              itemActive
                                ? 'text-white-1'
                                : 'text-secondary-1/70 hover:bg-primary-1/10 hover:text-primary-1'
                            }
                          `}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              itemExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {itemHasChildren && (
                      <div
                        className={`grid overflow-hidden transition-all duration-300 ${
                          itemExpanded ? 'grid-rows-[1fr] pt-2' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="ml-4 flex flex-col gap-1 border-l border-primary-2/40 pl-3">
                            {item.children?.map((child, childIndex) => {
                              const childActive = isItemActive(child.href)

                              return (
                                <Link
                                  key={`${child.href}-${childIndex}`}
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className={mobileChildLinkClass(childActive)}
                                >
                                  <LocalizedText en={child.label} bn={child.label} />
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          {/* Search */}
          <div
            className="
              relative z-30 mt-7
              rounded-[18px]
              border border-secondary-1/10
              bg-white-1
              p-3
              shadow-[0_10px_35px_rgba(10,17,40,0.07)]

              [&_*]:text-secondary-1
              [&_input]:text-secondary-1
              [&_input]:placeholder:text-secondary-1/45

              [&_[role='listbox']]:z-[999]
              [&_[role='listbox']]:bg-white-1
              [&_[role='listbox']]:text-secondary-1
              [&_[role='listbox']]:shadow-[0_18px_50px_rgba(10,17,40,0.18)]
              [&_[role='listbox']]:border
              [&_[role='listbox']]:border-secondary-1/10
              [&_[role='listbox']]:rounded-[14px]

              [&_ul]:z-[999]
              [&_ul]:bg-white-1
              [&_ul]:text-secondary-1
              [&_ul]:shadow-[0_18px_50px_rgba(10,17,40,0.18)]
              [&_ul]:border
              [&_ul]:border-secondary-1/10
              [&_ul]:rounded-[14px]

              [&_li]:text-secondary-1
              [&_li]:hover:bg-primary-1/10
              [&_li]:hover:text-primary-1
            "
          >
            <div className="font-grift text-[11px] uppercase tracking-[0.12em] text-secondary-1/60">
              Search
            </div>

            <div
              className="
                relative z-40 mt-3
                rounded-[12px]
                bg-white-2
                text-secondary-1

                [&_*]:text-secondary-1
                [&_input]:text-secondary-1
                [&_input]:placeholder:text-secondary-1/45
              "
            >
              <SearchBarSection suggestions={suggestions} center />
            </div>
          </div>

          {/* Inquiry */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="
              relative z-10 mt-7 flex items-center justify-center
              rounded-[18px]
              bg-primary-1
              px-5 py-4
              font-grift text-[13px] uppercase tracking-[0.08em]
              text-white-1
              shadow-[0_12px_35px_rgba(0,108,103,0.24)]
              transition-transform duration-300
              active:scale-[0.98]
            "
          >
            Make an Inquiry?
          </Link>

          {/* Social */}
          <div className="relative z-10 mt-8 text-center">
            <div className="font-grift text-[12px] uppercase tracking-[0.12em] text-secondary-1/70">
              Contact Us
            </div>

            <div className="mt-5 flex justify-center gap-3">
              <Link
                href={footerData?.social?.facebookUrl || '#'}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary-1 text-white-1"
              >
                <Image
                  src={Facebook}
                  alt="Facebook icon"
                  width={Facebook?.width}
                  height={Facebook?.height}
                  placeholder="blur"
                  blurDataURL={Facebook?.blurDataURL}
                  quality={90}
                  className="w-[13px]"
                />
              </Link>

              <Link
                href={footerData?.social?.whatsApp || '#'}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary-1 text-white-1"
              >
                <Image
                  src={WhatsApp}
                  alt="WhatsApp icon"
                  width={WhatsApp?.width}
                  height={WhatsApp?.height}
                  placeholder="blur"
                  blurDataURL={WhatsApp?.blurDataURL}
                  quality={90}
                  className="w-[22px]"
                />
              </Link>

              <Link
                href={
                  footerData?.factorySection?.email
                    ? `mailto:${footerData.factorySection.email}`
                    : '#'
                }
                className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary-1 text-white-1"
              >
                <Image
                  src={At}
                  alt="Email icon"
                  width={At?.width}
                  height={At?.height}
                  placeholder="blur"
                  blurDataURL={At?.blurDataURL}
                  quality={90}
                  className="w-[22px]"
                />
              </Link>

              <Link
                href={footerData?.social?.linkedinUrl || '#'}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary-1 text-white-1"
              >
                <Image
                  src={Linkdin}
                  alt="LinkedIn icon"
                  width={Linkdin?.width}
                  height={Linkdin?.height}
                  placeholder="blur"
                  blurDataURL={Linkdin?.blurDataURL}
                  quality={90}
                  className="w-[22px]"
                />
              </Link>
            </div>
          </div>

          {/* Top links */}
          {topItems.length > 0 && (
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 pb-6">
              {topItems.map((item, index) => {
                const itemActive = isParentActive(item)

                return (
                  <React.Fragment key={`${item.href}-${index}`}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`
                        font-grift text-[11px] uppercase
                        transition-colors duration-300
                        ${
                          itemActive ? 'text-primary-1' : 'text-secondary-1/75 hover:text-primary-1'
                        }
                      `}
                    >
                      <LocalizedText en={item.label} bn={item.label} />
                    </Link>

                    {index + 1 !== topItems.length && (
                      <div className="h-4 w-[1.5px] bg-secondary-1/20" />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MobileNavbar
