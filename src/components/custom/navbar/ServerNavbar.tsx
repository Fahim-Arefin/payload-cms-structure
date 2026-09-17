import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants'
import { pagesListTag } from '@/lib/cacheTags'
import Navbar from './Navbar'
import { defaultNavbar, type NavbarData } from './model'

export default async function ServerNavbar() {
  const data = await getGlobalCached<NavbarData>(GLOBAL_NAVBAR_SLUG_AND_TAG, 1, pagesListTag)
  return <Navbar data={{ ...defaultNavbar, ...data }} />
}
