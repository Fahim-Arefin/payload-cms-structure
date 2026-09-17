export type NavbarLink = {
  id?: string | null
  label?: string | null
  linkType?: 'page' | 'url' | null
  href?: string | { slug?: string | null } | null
  url?: string | null
  sectionId?: string | null
  newTab?: boolean | null
  children?: NavbarLink[] | null
  appearance?: 'outline' | 'solid' | null
}

export type NavbarData = {
  logo?: string | { url?: string | null } | null
  logoAlt?: string | null
  backgroundImage?: string | { url?: string | null } | null
  desktop?: { items?: NavbarLink[] | null } | null
  applyOnline?: NavbarLink | null
  mobileQuickLinks?: NavbarLink[] | null
  drawerTitle?: string | null
}

export function linkUrl(link: NavbarLink): string | null {
  const page = typeof link.href === 'object' ? link.href?.slug : undefined
  let url =
    link.linkType === 'url'
      ? link.url?.trim()
      : page
        ? page === 'index'
          ? '/'
          : `/${page.replace(/^\/+/, '')}`
        : undefined
  if (!url || /[\\\s]/.test(url)) return null
  if (!/^\/(?!\/)/.test(url)) {
    try {
      if (!['http:', 'https:'].includes(new URL(url).protocol)) return null
    } catch {
      return null
    }
  }
  if (url.includes(':slug')) return null
  if (link.sectionId)
    url = `${url.split('#')[0]}#${encodeURIComponent(link.sectionId.replace(/^#/, ''))}`
  return url
}

export function isNavbarLinkActive(
  item: NavbarLink,
  pathname: string,
  hash: string,
  origin: string,
): boolean {
  const href = linkUrl(item)
  if (!href || !origin) return false
  const target = new URL(href, origin)
  if (target.origin !== origin) return false
  const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/'
  const decodeHash = (value: string) => {
    try {
      return decodeURIComponent(value.replace(/^#/, ''))
    } catch {
      return value.replace(/^#/, '')
    }
  }
  const targetPath = normalizePath(target.pathname)
  const currentPath = normalizePath(pathname)
  if (target.hash || hash) {
    return targetPath === currentPath && decodeHash(target.hash) === decodeHash(hash)
  }
  return (
    currentPath === targetPath || (targetPath !== '/' && currentPath.startsWith(`${targetPath}/`))
  )
}

export const defaultNavbar: NavbarData = {
  logoAlt: 'UCB',
  desktop: {
    items: [
      { label: 'Offers & Deals', linkType: 'url', url: '/offers-and-deals' },
      { label: 'World Elite', linkType: 'url', url: '/world-elite' },
      { label: 'Visa Infinite', linkType: 'url', url: '/visa-infinite' },
      { label: 'Documents', linkType: 'url', url: '/documents' },
      { label: 'FAQ', linkType: 'url', url: '/faq' },
    ],
  },
  applyOnline: { label: 'Apply Online', linkType: 'url', url: '/apply-online' },
  mobileQuickLinks: [
    { label: 'Visa Infinite', linkType: 'url', url: '/visa-infinite', appearance: 'outline' },
    { label: 'World Elite', linkType: 'url', url: '/world-elite', appearance: 'solid' },
  ],
  drawerTitle: 'Explore UCB',
}
