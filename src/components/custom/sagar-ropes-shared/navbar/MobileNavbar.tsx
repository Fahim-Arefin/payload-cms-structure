'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavbarData, NavItem } from './ServerNavbar'
import LocalizedText from '../../shared/LocalizedText'
import NavbarDialog from './NavbarDialog'

type Props = {
  data: NavbarData
  blur: string
}

function MobileNavbar({ data, blur }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string[]>([])

  const logoUrl =
    data.branding.logo?.url ?? `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/images/logo.png`

  const allItems = data?.desktop?.items ?? []
  const topItems = allItems.filter((item) => item.isTop === 'yes')
  const mainItems = allItems.filter((item) => item.isTop !== 'yes')
  const mobileItems = [...mainItems, ...topItems]

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
        className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between border-b-[3px] border-b-dark-3 px-4 lg:hidden backdrop-blur-[15px]"
        style={{
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 100%), rgba(255,255,255,0.20)',
        }}
      >
        {/* logo */}
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
              quality={80}
            />
          )}
        </Link>

        {/* burger */}
        <button
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
        </button>
      </div>

      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] h-screen w-[85%] max-w-[360px] border-l border-dark-3 transition-transform duration-300 lg:hidden backdrop-blur-[15px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        // style={{
        //   background:
        //     'linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 100%), rgba(255,255,255,0.92)',
        // }}
        style={{
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 100%), rgba(255,255,255,0.20)',
        }}
      >
        {/* drawer header */}
        <div className="flex h-[60px] items-center justify-between border-b border-dark-3 px-4">
          <div className="font-proxima text-base font-bold uppercase text-dark-3">Menu</div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-dark-3"
          >
            <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
            <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
          </button>
        </div>

        {/* drawer content */}
        <div className="h-[calc(100vh-60px)] overflow-y-auto px-4 py-4">
          <nav className="flex flex-col gap-2">
            {mobileItems.map((item, index) => {
              const key = `${item.href}-${index}`
              const itemHasChildren = hasChildren(item)
              const itemExpanded = expanded.includes(key)
              const itemActive = isParentActive(item)

              return (
                <div key={key} className="border-b border-dark-3/20 pb-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className={`flex-1 py-2 font-proxima text-sm font-bold uppercase transition-colors duration-300 ${
                        itemActive ? 'text-border-2' : 'text-dark-3 hover:text-border-2'
                      }`}
                    >
                      <LocalizedText en={item.label} bn={item.label} />
                    </Link>

                    {itemHasChildren && (
                      <button
                        type="button"
                        aria-label="Toggle submenu"
                        onClick={() => toggleExpanded(key)}
                        className="flex h-9 w-9 items-center justify-center text-dark-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="none"
                          className={`h-4 w-4 transition-transform duration-300 ${
                            itemExpanded ? 'rotate-180 text-border-2' : ''
                          }`}
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {itemHasChildren && (
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        itemExpanded ? 'grid-rows-[1fr] pt-1' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-3 flex flex-col border-l border-dark-3/20 pl-3">
                          {item.children?.map((child, childIndex) => {
                            const childActive = isItemActive(child.href)

                            return (
                              <Link
                                key={`${child.href}-${childIndex}`}
                                href={child.href}
                                className={`py-2 text-sm font-bold uppercase transition-colors duration-300 ${
                                  childActive
                                    ? 'text-border-2'
                                    : 'text-dark-3/80 hover:text-border-2'
                                }`}
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

            {/* demo dialog button */}
            <div className="mt-6">
              <NavbarDialog
                trigger={
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="
                    w-full
                    border-[2px] border-dark-3
                    bg-transparent
                    px-4 py-3
                    font-proxima text-sm font-bold uppercase
                    text-dark-3
                    transition-all duration-300
                    hover:bg-dark-3 hover:text-white-1
                  "
                  >
                    Open Demo Dialog
                  </button>
                }
              />
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileNavbar
