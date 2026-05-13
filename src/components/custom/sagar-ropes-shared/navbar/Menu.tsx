'use client'

import React from 'react'
import { NavbarData, SearchSuggestion } from './ServerNavbar'
import Link from 'next/link'
import LocalizedText from '../../shared/LocalizedText'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import NavbarActions from './NavbarActions'
import { Footer } from '@/payload-types'

type Props = {
  data: NavbarData
  footerData: Footer
  suggestions: SearchSuggestion[]
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

function Menu({ data, footerData, suggestions, queryFormRecipientEmails }: Props) {
  const allItems = data?.desktop?.items
  const topItems = allItems.filter((item) => item.isTop === 'yes')
  const mainItems = allItems.filter((item) => item.isTop !== 'yes')
  const pathname = usePathname()

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

  const navLinkClass = (isActive: boolean) => `
    relative inline-flex items-center justify-center gap-1
    transition-all duration-300 ease-out
    ${isActive ? '-translate-y-[3px] text-border-2' : 'hover:-translate-y-[3px] hover:text-border-2'}

    after:content-['']
    after:absolute
    after:left-1/2 after:-translate-x-1/2
    after:-bottom-[6px]
    after:h-[2px]
    after:bg-border-2
    after:transition-all after:duration-100 after:ease-out
    ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
  `

  const childLinkClass = (isActive: boolean) => `
    block w-full px-4 py-2 text-left whitespace-nowrap
    transition-all duration-300 ease-out
    ${isActive ? 'bg-border-2 text-white-1' : 'hover:bg-border-2 hover:text-white-1'}
  `

  return (
    <div className="h-full font-proxima font-bold text-dark-3 uppercase ">
      {/* top */}
      <div
        className="h-[50%] flex flex-row justify-end items-center gap-6
        pr-4 lg:pr-[35px] xl:pr-12 2xl:pr-[61px] 
        text-[10px] xl:text-[12px] 2xl:text-[14px]"
      >
        {topItems?.map((item, index) => {
          const parentActive = isParentActive(item)
          const itemHasChildren = hasChildren(item)

          return (
            <React.Fragment key={index}>
              <div className="relative group">
                <Link href={item?.href} className={navLinkClass(parentActive)}>
                  <LocalizedText en={item?.label} bn={item?.label} />

                  {itemHasChildren && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {itemHasChildren && (
                  <div
                    className="
                      absolute right-0 top-full z-50 pt-3
                      opacity-0 invisible translate-y-2
                      transition-all duration-300 ease-out
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    "
                  >
                    <div className="min-w-[220px] overflow-hidden border-b-[3px] border-b-dark-3 bg-white/95 backdrop-blur-[15px] shadow-lg">
                      {item.children?.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className={childLinkClass(isItemActive(child.href))}
                        >
                          <LocalizedText en={child.label} bn={child.label} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {index + 1 !== topItems.length && <div className="h-[35%] w-[2px] bg-dark-3" />}
            </React.Fragment>
          )
        })}
      </div>

      {/* main */}
      <div className="h-[50%] flex items-center justify-end global-p3">
        <div className="w-[95%] xl:w-[90%] 2xl:w-[85%]">
          <div className="flex flex-row items-center justify-between w-full h-full ">
            {mainItems?.map((item, index) => {
              const parentActive = isParentActive(item)
              const itemHasChildren = hasChildren(item)

              return (
                <div key={index} className="relative group ">
                  <Link href={item?.href} className={navLinkClass(parentActive)}>
                    <LocalizedText en={item?.label} bn={item?.label} />

                    {itemHasChildren && (
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </Link>

                  {itemHasChildren && (
                    <div
                      className="
                        absolute -left-4 top-full z-50  pt-3
                        opacity-0 invisible translate-y-2
                        transition-all duration-300 ease-out
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                      "
                    >
                      <div
                        className="min-w-[220px] overflow-hidden 
                        border-b-[3px] border-b-dark-3 shadow-lg
                        backdrop-blur-15 bg-[#E8EFF4]"
                        // style={{
                        //   background:
                        //     'linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.20) 100%), rgba(255,255,255,0.20)',
                        // }}
                      >
                        {item.children?.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className={childLinkClass(isItemActive(child.href))}
                          >
                            <LocalizedText en={child.label} bn={child.label} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            <NavbarActions
              footerData={footerData}
              suggestions={suggestions}
              queryFormRecipientEmails={queryFormRecipientEmails}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
