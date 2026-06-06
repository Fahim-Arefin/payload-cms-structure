'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import type { NavbarData, NavItem, SearchSuggestion } from './ServerNavbar'
import type { Footer } from '@/payload-types'

import LocalizedText from '../../shared/LocalizedText'
// import NavbarDialog from './NavbarDialog'
import SearchBarSection from './SearchBarSection'

import Facebook from 'public/assets/icons/facebook.png'
import Linkdin from 'public/assets/icons/linkdin.png'
import At from 'public/assets/icons/attherate.png'
import WhatsApp from 'public/assets/icons/whatsapp.png'
import Blur4 from '/public/assets/images/Blur4.png'
import Burger from '/public/assets/icons/burger.png'

type Props = {
  data: NavbarData
  blur: string
  suggestions: SearchSuggestion[]
  footerData: Footer
  queryFormRecipientEmails: NavbarData['queryFormRecipientEmails']
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

function MobileNavbar({ data, blur, suggestions, footerData, queryFormRecipientEmails }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string[]>([])

  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  const allItems = data?.desktop?.items ?? []

  // Main menu links show at top
  const mainItems = allItems.filter((item) => item.isTop !== 'yes')

  // Top links show below social links
  const topItems = allItems.filter((item) => item.isTop === 'yes')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isItemActive = (href: string) => {
    if (!href) return false

    const cleanHref = href.split('#')[0]

    if (cleanHref === '/') return pathname === '/'

    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`)
  }

  const hasChildren = (item: NavItem) => Array.isArray(item?.children) && item.children.length > 0

  const isChildActive = (children?: NavItem[]) => {
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

  return (
    <>
      {/* top mobile bar */}
      <div
        className="
          fixed inset-x-0 top-0 z-50
          flex h-[60px] items-center justify-between
          border-b-[3px] border-b-dark-3
          px-4 lg:hidden
          backdrop-blur-[15px]
        "
        style={{
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 100%), rgba(255,255,255,0.20)',
        }}
      >
        <Link href="/" aria-label="Home" className="relative block w-[120px] aspect-[701/179]">
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
        </Link>

        {/* <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
          className="relative flex h-10 w-10 items-center justify-center text-dark-3"
        >
          <span
            className={`absolute h-[2px] w-6 bg-current transition-all duration-300 ${
              open ? 'rotate-45' : '-translate-y-[7px]'
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-current transition-all duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-current transition-all duration-300 ${
              open ? '-rotate-45' : 'translate-y-[7px]'
            }`}
          />
        </button> */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
          className="
    relative flex h-10 w-10 items-center justify-center
    transition-transform duration-300 ease-out
    hover:scale-110
  "
        >
          <Image
            src={Burger}
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            quality={80}
            placeholder="blur"
            blurDataURL={Burger?.blurDataURL}
            className="
      h-7 w-7 object-contain
      transition-transform duration-300 ease-out
    "
          />
        </button>
      </div>

      {/* outside click layer */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-transparent transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* mobile drawer */}
      <div
        className={`
          fixed right-0 top-0 z-[70]
          h-screen w-[85%] max-w-[360px]
          overflow-hidden
          bg-dark-1
          transition-transform duration-300
          lg:hidden
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* bg blur image */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-[55%] w-full">
          <Image
            fill
            src={Blur4}
            alt=""
            quality={90}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={Blur4?.blurDataURL}
          />
        </div>

        {/* drawer content */}
        <div
          className="
            relative z-30
            flex h-full flex-col
            overflow-y-auto
            px-7 py-6
          "
        >
          {/* logo */}
          <div className="flex justify-center">
            {typeof footerData.logo === 'object' && footerData.logo?.url && (
              <Link
                href="/"
                aria-label="Home"
                onClick={() => setOpen(false)}
                className="
                  relative block
                  w-[150px]
                  aspect-[701/179]
                "
              >
                <Image
                  src={footerData?.logo?.url}
                  alt="Company logo"
                  fill
                  className="object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL={footerData?.logoBlurDataURL || ''}
                  quality={90}
                />
              </Link>
            )}
          </div>

          {/* main links */}
          <nav className="mt-8 flex flex-col gap-5">
            {mainItems.map((item, index) => {
              const key = `${item.href}-${index}`
              const itemHasChildren = hasChildren(item)
              const itemExpanded = expanded.includes(key)
              const itemActive = isParentActive(item)

              return (
                <div key={key}>
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (!itemHasChildren) setOpen(false)
                      }}
                      className={`
                        relative
                        inline-flex w-fit items-center
                        font-proxima text-[15px] font-bold uppercase
                        leading-none
                        transition-colors duration-300
                        ${
                          itemActive
                            ? 'text-cyan after:w-full'
                            : 'text-white-1 hover:text-cyan after:w-0 hover:after:w-full'
                        }

                        after:content-['']
                        after:absolute
                        after:left-0
                        after:-bottom-[6px]
                        after:h-[2px]
                        after:bg-cyan
                        after:transition-all
                        after:duration-300
                      `}
                    >
                      <LocalizedText en={item.label} bn={item.label} />
                    </Link>

                    {itemHasChildren && (
                      <button
                        type="button"
                        aria-label="Toggle submenu"
                        onClick={() => toggleExpanded(key)}
                        className="flex h-6 w-6 items-center justify-center text-white-1 transition-colors duration-300 hover:text-cyan"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            itemExpanded ? 'rotate-180 text-cyan' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {itemHasChildren && (
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        itemExpanded ? 'grid-rows-[1fr] pt-4' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-3 flex flex-col gap-3 border-l border-cyan/30 pl-4">
                          {item.children?.map((child, childIndex) => {
                            const childActive = isItemActive(child.href)

                            return (
                              <Link
                                key={`${child.href}-${childIndex}`}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className={`
                                  font-proxima text-[13px] font-bold uppercase
                                  transition-colors duration-300
                                  ${childActive ? 'text-cyan' : 'text-white-1/80 hover:text-cyan'}
                                `}
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

          {/* search */}
          <div className="mt-10">
            <SearchBarSection suggestions={suggestions} center />
          </div>

          {/* inquiry */}
          <div className="mt-9 text-center">
            <div className="font-manrope text-[16px] font-bold uppercase leading-[140%] tracking-[-0.4px] text-white-1">
              Make an Inquiry ?
            </div>

            {/* <div className="mt-3 flex justify-center">
              <NavbarDialog
                queryFormRecipientEmails={queryFormRecipientEmails}
                trigger={
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="
                      group
                      relative
                      inline-flex items-center gap-2
                      overflow-visible
                      p-0
                      font-manrope text-[13px] font-bold uppercase leading-[133.333%]
                      text-white-1
                      transition-all duration-300 ease-out
                      hover:text-white-1

                      after:content-['']
                      after:absolute
                      after:left-0
                      after:right-0
                      after:bottom-[-5px]
                      after:h-[1px]
                      after:bg-cyan
                      after:transition-all
                      after:duration-300
                      after:ease-out
                      hover:after:h-[2px]
                    "
                  >
                    <span>ASK US ANYTHING</span>

                    <span
                      className="
                        relative
                        inline-flex h-3 w-3 shrink-0 items-center justify-center
                        overflow-visible
                      "
                    >
                      <Image
                        src="/assets/icons/btn01Icon.png"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="
                          h-full w-full object-contain
                          transition-none
                          group-hover:animate-[askBtnIconDropLeft_0.65s_ease-out_forwards]
                        "
                      />
                    </span>
                  </button>
                }
              />
            </div> */}
          </div>

          {/* social */}
          <div className="mt-10 text-center">
            <div className="font-proxima text-[16px] font-bold uppercase text-white-1">
              Contact Us
            </div>

            <div className="mt-5 flex justify-center gap-4">
              <Link
                href={footerData?.social?.facebookUrl || ''}
                target="_blank"
                className="
                  flex h-10 w-10 items-center justify-center
                  bg-[#33CCCC33]
                  transition-all duration-300 ease-in
                  hover:bg-cyan
                "
              >
                <Image
                  src={Facebook}
                  alt="Facebook icon"
                  width={Facebook?.width}
                  height={Facebook?.height}
                  placeholder="blur"
                  blurDataURL={Facebook?.blurDataURL}
                  quality={90}
                  className="w-[13px] transition-all duration-300"
                />
              </Link>

              <Link
                href={footerData?.social?.whatsApp || ''}
                target="_blank"
                className="
                  flex h-10 w-10 items-center justify-center
                  bg-[#33CCCC33]
                  transition-all duration-300 ease-in
                  hover:bg-cyan
                "
              >
                <Image
                  src={WhatsApp}
                  alt="WhatsApp icon"
                  width={WhatsApp?.width}
                  height={WhatsApp?.height}
                  placeholder="blur"
                  blurDataURL={WhatsApp?.blurDataURL}
                  quality={90}
                  className="w-[22px] transition-all duration-300"
                />
              </Link>

              <Link
                href={`mailto:${footerData?.factorySection?.email}` || ''}
                className="
                  flex h-10 w-10 items-center justify-center
                  bg-[#33CCCC33]
                  transition-all duration-300 ease-in
                  hover:bg-cyan
                "
              >
                <Image
                  src={At}
                  alt="Email icon"
                  width={At?.width}
                  height={At?.height}
                  placeholder="blur"
                  blurDataURL={At?.blurDataURL}
                  quality={90}
                  className="w-[22px] transition-all duration-300"
                />
              </Link>

              <Link
                href={footerData?.social?.linkedinUrl || ''}
                target="_blank"
                className="
                  flex h-10 w-10 items-center justify-center
                  bg-[#33CCCC33]
                  transition-all duration-300 ease-in
                  hover:bg-cyan
                "
              >
                <Image
                  src={Linkdin}
                  alt="LinkedIn icon"
                  width={Linkdin?.width}
                  height={Linkdin?.height}
                  placeholder="blur"
                  blurDataURL={Linkdin?.blurDataURL}
                  quality={90}
                  className="w-[22px] transition-all duration-300"
                />
              </Link>
            </div>
          </div>

          {/* top/isTop links below social */}
          {topItems.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-4 pb-8">
              {topItems.map((item, index) => {
                const itemActive = isParentActive(item)

                return (
                  <React.Fragment key={`${item.href}-${index}`}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`
                        font-manrope text-[11px] font-bold uppercase
                        transition-colors duration-300
                        ${itemActive ? 'text-cyan' : 'text-white-1 hover:text-cyan'}
                      `}
                    >
                      <LocalizedText en={item.label} bn={item.label} />
                    </Link>

                    {index + 1 !== topItems.length && <div className="h-4 w-[1.5px] bg-white-1" />}
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
