'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useBrowserLocation } from '@/hooks/useBrowserLocation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  defaultNavbar,
  isNavbarLinkActive,
  linkUrl,
  type NavbarData,
  type NavbarLink,
} from './model'
import styles from './navbar.module.css'

function destinationProps(item: NavbarLink) {
  return item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

function Brand({ data, onClick }: { data: NavbarData; onClick?: () => void }) {
  const logo = typeof data.logo === 'object' ? data.logo?.url : undefined
  return (
    <Link
      href="/"
      aria-label={`${data.logoAlt || 'UCB'} home`}
      className={styles.brand}
      onClick={onClick}
    >
      {/* CMS uploads can use external storage URLs. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {logo ? <img src={logo} alt={data.logoAlt || 'UCB'} /> : <span>UCB</span>}
    </Link>
  )
}

function NavLink({
  item,
  className,
  onClick,
  active,
}: {
  item: NavbarLink
  className?: string
  onClick?: () => void
  active?: boolean
}) {
  const href = linkUrl(item)
  if (!href) return <span className={className}>{item.label}</span>
  return (
    <Link
      href={href}
      {...destinationProps(item)}
      className={className}
      onClick={onClick}
      aria-current={active ? (href.includes('#') ? 'location' : 'page') : undefined}
    >
      {item.label}
    </Link>
  )
}

export default function Navbar({ data }: { data: NavbarData }) {
  const pathname = usePathname()
  const location = useBrowserLocation()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const items = data.desktop?.items ?? defaultNavbar.desktop!.items!
  const quickLinks = data.mobileQuickLinks ?? defaultNavbar.mobileQuickLinks!
  const apply = data.applyOnline?.label ? data.applyOnline : defaultNavbar.applyOnline!
  const background =
    typeof data.backgroundImage === 'object' ? data.backgroundImage?.url : undefined
  const active = (item: NavbarLink): boolean =>
    isNavbarLinkActive(
      item,
      location?.pathname ?? pathname,
      location?.hash ?? '',
      location?.origin ?? '',
    )

  const close = () => {
    setOpen(false)
    setExpanded(null)
  }

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [pathname])
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const change = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener('change', change)
    return () => desktop.removeEventListener('change', change)
  }, [])

  return (
    <header className={`${styles.header} sticky top-0 isolate`}>
      {background && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-screen"
          style={{ backgroundImage: `url(${JSON.stringify(background)})` }}
        />
      )}
      <div className={`${styles.inner} ${'container-padding-x'}`}>
        <div className={styles.mobile}>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className={styles.burger} aria-label="Open navigation">
                <Menu size={29} strokeWidth={1.4} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" showOverlay className={styles.drawer} data-lenis-prevent>
              <div className={styles.drawerBrand}>
                <Brand data={data} onClick={close} />
              </div>
              <SheetTitle className={styles.drawerTitle}>
                {data.drawerTitle || 'Explore UCB'}
              </SheetTitle>
              <SheetDescription className={styles.drawerDescription}>
                Cards, privileges and more.
              </SheetDescription>
              <nav aria-label="Mobile navigation" className={styles.drawerNav}>
                {items.map((item, index) => {
                  const key = item.id || String(index)
                  const children = item.children?.filter((child) => linkUrl(child)) ?? []
                  const isExpanded = expanded === key
                  return (
                    <div key={key} className={styles.drawerItem}>
                      <div className={styles.drawerRow}>
                        <NavLink
                          item={item}
                          active={active(item)}
                          onClick={close}
                          className={styles.drawerLink}
                        />
                        {children.length > 0 && (
                          <button
                            aria-label={`Toggle ${item.label} links`}
                            aria-expanded={isExpanded}
                            aria-controls={`navbar-children-${index}`}
                            className={styles.expand}
                            onClick={() => setExpanded(isExpanded ? null : key)}
                          >
                            <ChevronDown size={19} className={isExpanded ? styles.rotated : ''} />
                          </button>
                        )}
                      </div>
                      {children.length > 0 && (
                        <div
                          id={`navbar-children-${index}`}
                          hidden={!isExpanded}
                          className={styles.drawerChildren}
                        >
                          {children.map((child, childIndex) => (
                            <NavLink
                              key={child.id || childIndex}
                              item={child}
                              className={styles.childLink}
                              active={active(child)}
                              onClick={close}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
              <div className={styles.drawerFooter}>
                <NavLink item={apply} onClick={close} className={styles.drawerApply} />
                <p>Discover a world of possibilities.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Brand data={data} />
        <nav aria-label="Main navigation" className={styles.desktopNav}>
          {items.map((item, index) => {
            const children = item.children?.filter((child) => linkUrl(child)) ?? []
            const selected = active(item) || children.some(active)
            return (
              <div key={item.id || index} className={styles.desktopItem} data-active={selected}>
                <NavLink item={item} className={styles.desktopLink} active={active(item)} />
                {children.length > 0 && (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={styles.dropdownTrigger}
                        aria-label={`Open ${item.label} submenu`}
                      >
                        <ChevronDown size={15} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={18}
                      collisionPadding={16}
                      className={styles.dropdown}
                    >
                      {children.map((child, childIndex) => (
                        <DropdownMenuItem
                          key={child.id || childIndex}
                          asChild
                          className={styles.dropdownItem}
                        >
                          <Link
                            href={linkUrl(child)!}
                            {...destinationProps(child)}
                            aria-current={
                              active(child)
                                ? linkUrl(child)!.includes('#')
                                  ? 'location'
                                  : 'page'
                                : undefined
                            }
                          >
                            <span>{child.label}</span>
                            <ArrowUpRight size={15} />
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            )
          })}
        </nav>
        <NavLink item={apply} className={styles.apply} />
        <nav aria-label="Featured cards" className={styles.quickLinks}>
          {quickLinks.slice(0, 2).map((item, index) => (
            <NavLink
              key={item.id || index}
              item={item}
              className={`${styles.quickLink} ${item.appearance === 'solid' ? styles.solid : styles.outline} sm:max-lg:!rounded-[10px] sm:max-lg:!px-2.5 sm:max-lg:!text-base`}
              active={active(item)}
            />
          ))}
        </nav>
      </div>
    </header>
  )
}
