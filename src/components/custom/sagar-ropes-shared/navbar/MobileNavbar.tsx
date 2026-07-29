'use client'

import Button02 from '@/components/custom/sagar-ropes-shared/buttons/Button02'
import type { Footer } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import BurgerIconImg from 'public/assets/icons/burger2.png'
import { gsap, useGSAP } from '@/lib/gsap'
import LocalizedText from '../../shared/LocalizedText'
import SearchBarSection from './SearchBarSection'
import type { NavbarData, SearchSuggestion } from './ServerNavbar'

import At from 'public/assets/icons/atC.png'
import Facebook from 'public/assets/icons/fbC.png'
import Linkdin from 'public/assets/icons/lnC.png'
import WhatsApp from 'public/assets/icons/waC.png'

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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function MobileNavbar({ data, blur, suggestions, footerData }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string[]>([])

  const drawerRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const drawerInnerRef = useRef<HTMLDivElement | null>(null)

  const dataAny = data as any
  const footerAny = footerData as any

  const logoMedia = dataAny?.logo ?? dataAny?.branding?.logo
  const logoUrl =
    typeof logoMedia === 'object' && logoMedia?.url
      ? logoMedia.url
      : `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  const email =
    footerAny?.contactInfoSection?.email ||
    footerAny?.factorySection?.email ||
    footerAny?.contactInfo?.email

  const allItems = (data?.desktop?.items ?? []) as NavItem[]
  const mainItems = allItems.filter((item) => item.isTop !== 'yes')

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

  const toggleExpanded = (key: string) => {
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    )
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
      const drawerInner = drawerInnerRef.current

      if (!drawer || !overlay || !drawerInner) return

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
          {
            xPercent: 100,
          },
          {
            xPercent: 0,
            duration: 0.45,
            ease: 'power3.out',
          },
        )

        gsap.fromTo(
          drawerInner.children,
          {
            y: 12,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            stagger: 0.045,
            delay: 0.16,
            ease: 'power3.out',
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

  const mobileMainLinkClass = (isActive: boolean) => `
    relative flex min-h-[42px] w-full items-center justify-between
    rounded-[4px]
    px-[10px] py-[12px]
    font-agency text-[16px] 
    leading-none
    transition-all duration-300 ease-out

    ${
      isActive
        ? `
          border border-primary-2/80
          bg-primary-1
          text-white-1
        `
        : `
          border border-transparent
          text-white-1/90
          hover:border-primary-2/45
          hover:bg-primary-1/20
          hover:text-white-1
        `
    }
  `

  const mobileChildLinkClass = (isActive: boolean) => `
    block rounded-[4px]
    px-[10px] py-[10px]
    font-agency text-[14px] 
    leading-none
    transition-all duration-300 ease-out

    ${
      isActive
        ? `
          bg-primary-1
          text-white-1
        `
        : `
          text-white-1
          hover:bg-primary-1/20
          hover:text-white-1
        `
    }
  `

  const BurgerIcon = ({ open }: { open: boolean }) => (
    <span className="relative block h-[16px] w-[20px] text-white-1">
      <span
        className={`
          absolute left-0 top-0 h-[2px] w-[20px]
          origin-center rounded-full bg-current
          transition-all duration-300 ease-out
          ${open ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'}
        `}
      />

      <span
        className={`
          absolute left-0 top-[7px] h-[2px] w-[20px]
          origin-center rounded-full bg-current
          transition-all duration-300 ease-out
          ${open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}
        `}
      />

      <span
        className={`
          absolute left-0 top-[14px] h-[2px] w-[20px]
          origin-center rounded-full bg-current
          transition-all duration-300 ease-out
          ${open ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'}
        `}
      />
    </span>
  )

  const handleDropQueryClick = () => {
    setOpen(false)
    router.push('/contact')
  }

  return (
    <>
      {/* Mobile top navbar */}
      <div
        className="
          fixed inset-x-0 top-4 z-50 mx-auto
          flex h-[52px] w-[92%] items-center justify-between
          overflow-hidden
          rounded-[12px]
          bg-secondary-1
          px-3 lg:hidden
          shadow-[0_18px_45px_rgba(10,17,40,0.16)]
        "
      >
        {/* logo */}
        <div className="relative z-10 flex h-full w-[38%] items-center justify-start overflow-hidden">
          <Link href="/" aria-label="Home" className="block h-[72%]">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="Company logo"
                width={260}
                height={120}
                className="h-full w-auto object-contain object-center"
                priority
                placeholder={blur ? 'blur' : 'empty'}
                blurDataURL={blur || undefined}
                quality={90}
              />
            )}
          </Link>
        </div>

        {/* burger */}
        <div className="relative z-10 flex h-full w-[38%] items-center justify-end overflow-hidden">
          {/* <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="
              relative flex h-8 w-8 items-center justify-center
              rounded-[7px]
              text-white-1
              transition-transform duration-300 ease-out
              hover:scale-105
              active:scale-95
            "
          >
            <BurgerIcon open={open} />
          </button> */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="
    relative flex h-8 w-8 items-center justify-center
    rounded-[7px]
    transition-transform duration-300 ease-out
    hover:scale-105
    active:scale-95
  "
          >
            <Image
              src={BurgerIconImg}
              alt=""
              width={24}
              height={24}
              placeholder="blur"
              blurDataURL={BurgerIconImg.blurDataURL}
              quality={95}
              className="
      h-[18px] w-[24px]
      object-contain
    "
            />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="
          pointer-events-none fixed inset-0 z-[60]
          bg-secondary-1/60 opacity-0
          backdrop-blur-[5px]
          lg:hidden
        "
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        // max-w-[390px]
        className="
          invisible fixed right-0 top-0 z-[70]
          h-dvh w-[100%] 
          overflow-hidden
          opacity-0
          shadow-[0_24px_90px_rgba(0,0,0,0.45)]
          lg:hidden
        "
        style={{
          background: `
            radial-gradient(circle at 50% 72%, rgba(0,108,103,0.68) 0%, rgba(0,108,103,0.42) 26%, rgba(10,17,40,0.98) 72%),
            linear-gradient(180deg, #0A1128 0%, #0A1128 58%, #006C67 155%)
          `,
        }}
      >
        <div
          ref={drawerInnerRef}
          className="
            relative z-10 flex h-full flex-col
            overflow-y-auto overflow-x-hidden
            px-[14px] pb-[30px] pt-[22px]
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            {logoUrl && (
              <Link
                href="/"
                aria-label="Home"
                onClick={() => setOpen(false)}
                className="relative block w-[122px] aspect-[919/512]"
              >
                <Image
                  src={logoUrl}
                  alt="Company logo"
                  fill
                  className="object-contain object-left"
                  priority
                  placeholder={blur ? 'blur' : 'empty'}
                  blurDataURL={blur || undefined}
                  quality={95}
                />
              </Link>
            )}

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="
                flex size-[28px] items-center justify-center
                text-white-1/90
                transition-colors duration-300
                hover:text-primary-2
              "
            >
              <span className="relative block size-[13px]">
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-[28px] flex flex-col gap-[6px]">
            {mainItems.map((item, index) => {
              const key = `${item.href}-${index}`
              const itemHasChildren = hasChildren(item)
              const itemExpanded = expanded.includes(key)
              const itemActive = isParentActive(item)

              return (
                <div key={key}>
                  <div className="relative flex items-center">
                    <Link
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
                          absolute right-[8px] top-1/2 z-20
                          flex size-[28px] -translate-y-1/2 items-center justify-center
                          rounded-full
                          transition-colors duration-300
                          ${
                            itemActive
                              ? 'text-white-1'
                              : 'text-white-1 hover:bg-primary-1/20 hover:text-white-1'
                          }
                        `}
                      >
                        <ChevronDown
                          className={`size-[14px] transition-transform duration-300 ${
                            itemExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {itemHasChildren && (
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        itemExpanded ? 'grid-rows-[1fr] pt-[6px]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-[10px] flex flex-col gap-[4px] border-l border-primary-2/35 pl-[8px]">
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

          {/* Search */}
          <div className="mt-[28px] z-[999]">
            <div
              className="
      font-grift text-[13px] font-medium leading-none text-white-1/80
    "
            >
              Search
            </div>

            <div className="mt-[12px]  z-[999]">
              <SearchBarSection suggestions={suggestions} center variant="mobileDrawer" />
            </div>
          </div>

          {/* Drop query */}
          <div className="mt-[28px] relative z-[1]  flex justify-center">
            <Button02
              type="button"
              onClick={handleDropQueryClick}
              className="
                !h-[56px]
                !px-[36px]
                !text-[16px]
                !tracking-[0.02em]
              "
            >
              Drop Your Query
            </Button02>
          </div>

          {/* Social */}
          <div className="relative z-[1]  mt-[22px] text-center">
            <div className="font-grift text-[13px] font-medium leading-none text-white-1/80">
              Contact Us
            </div>

            <div className="mt-[14px] flex items-center justify-center gap-[9px]">
              {footerData?.social?.whatsApp && (
                <Link
                  href={footerData.social.whatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="relative block w-[30px] h-[30px]"
                >
                  <Image
                    src={WhatsApp}
                    alt="WhatsApp icon"
                    fill
                    placeholder="blur"
                    blurDataURL={WhatsApp?.blurDataURL}
                    quality={95}
                    className="object-contain"
                  />
                </Link>
              )}

              {email && (
                <Link
                  href={`mailto:${email}`}
                  aria-label="Email"
                  className="relative block w-[30px] h-[30px]"
                >
                  <Image
                    src={At}
                    alt="Email icon"
                    fill
                    placeholder="blur"
                    blurDataURL={At?.blurDataURL}
                    quality={95}
                    className="object-contain"
                  />
                </Link>
              )}

              {footerData?.social?.linkedinUrl && (
                <Link
                  href={footerData.social.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="relative block w-[30px] h-[30px]"
                >
                  <Image
                    src={Linkdin}
                    alt="LinkedIn icon"
                    fill
                    placeholder="blur"
                    blurDataURL={Linkdin?.blurDataURL}
                    quality={95}
                    className="object-contain"
                  />
                </Link>
              )}

              {footerData?.social?.facebookUrl && (
                <Link
                  href={footerData.social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="relative block w-[30px] h-[30px]"
                >
                  <Image
                    src={Facebook}
                    alt="Facebook icon"
                    fill
                    placeholder="blur"
                    blurDataURL={Facebook?.blurDataURL}
                    quality={95}
                    className="object-contain"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileNavbar
