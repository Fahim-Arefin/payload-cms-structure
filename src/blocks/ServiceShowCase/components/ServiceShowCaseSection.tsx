'use client'

import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { ServiceShowcaseBlockType } from '@/types/payloadCustomTypes'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ServiceCollaborativeMethod from './ServiceCollaborativeMethod'
import ServiceWhatWeBuild from './ServiceWhatWeBuild'
import Image from 'next/image'
import TabLine from 'public/assets/images/tabLine.png'
type Props = {
  block: ServiceShowcaseBlockType
}

type ServiceTab = NonNullable<
  NonNullable<ServiceShowcaseBlockType['serviceShowcase']>['tabs']
>[number]

/* =========================================================
   BACKGROUND COLORS

   Keep these aligned with your WithHashScroller colors.
========================================================= */

const backgroundColorMap: Record<string, string> = {
  'white-1': 'bg-white-1',
  'white-2': 'bg-white-2',
  'white-3': 'bg-white-3',

  'primary-1': 'bg-primary-1',
  'primary-2': 'bg-primary-2',

  'secondary-1': 'bg-secondary-1',
  'secondary-2': 'bg-secondary-2',

  cyan: 'bg-cyan',
}

/* =========================================================
   HELPERS
========================================================= */

function normalizeId(value?: string | null) {
  return String(value ?? '').trim()
}

function getDefaultTabIndex(tabs: ServiceTab[]) {
  const index = tabs.findIndex((tab) => tab?.defaultActive)

  return index >= 0 ? index : 0
}

function getDefaultItemIndex(tab?: ServiceTab | null) {
  const items = tab?.whatWeBuildItems?.filter(Boolean) ?? []

  if (!items.length) return 0

  const index = items.findIndex((item) => item?.defaultActive)

  return index >= 0 ? index : 0
}

function replaceHash(id?: string | null) {
  if (typeof window === 'undefined') return

  const cleanId = normalizeId(id)

  if (!cleanId) return

  const nextUrl = `${window.location.pathname}` + `${window.location.search}` + `#${cleanId}`

  window.history.replaceState(null, '', nextUrl)
}

function scrollToSectionId(id?: string | null) {
  if (typeof window === 'undefined') {
    return
  }

  const cleanId = normalizeId(id)

  if (!cleanId) return

  const target = document.getElementById(cleanId)

  if (!target) return

  const lenis = (window as any)?.lenis

  if (lenis?.scrollTo) {
    lenis.scrollTo(target, {
      offset: -110,
      duration: 0.9,
      force: true,
    })

    return
  }

  const targetY = window.scrollY + target.getBoundingClientRect().top - 110

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  })
}

/* =========================================================
   SUB SECTION WRAPPER

   Used for:
   Collaborative Method
   What We Build
========================================================= */

function ServiceSubSection({
  id,
  backgroundColor,
  children,
}: {
  id?: string | null
  backgroundColor?: string | null
  children: React.ReactNode
}) {
  const bgClass = backgroundColorMap[String(backgroundColor ?? '')] || ''

  return (
    <section
      id={id || undefined}
      className={`
        relative
        ${bgClass}
      `}
    >
      {children}
    </section>
  )
}

/* =========================================================
   COMPONENT
========================================================= */

function ServiceShowCaseSection({ block }: Props) {
  const tabs = useMemo(
    () => block?.serviceShowcase?.tabs?.filter(Boolean) ?? [],
    [block?.serviceShowcase?.tabs],
  )

  const defaultTabIndex = useMemo(() => getDefaultTabIndex(tabs as ServiceTab[]), [tabs])

  const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex)

  const [activeItemIndex, setActiveItemIndex] = useState(() =>
    getDefaultItemIndex(tabs[defaultTabIndex]),
  )

  const activeTab = tabs[activeTabIndex]

  /* =======================================================
     RESET IF CMS DATA CHANGES
  ======================================================= */

  useEffect(() => {
    if (!tabs.length) return

    if (activeTabIndex >= tabs.length) {
      setActiveTabIndex(defaultTabIndex)

      setActiveItemIndex(getDefaultItemIndex(tabs[defaultTabIndex]))
    }
  }, [tabs, activeTabIndex, defaultTabIndex])

  useEffect(() => {
    if (!activeTab) return

    const itemCount = activeTab?.whatWeBuildItems?.length ?? 0

    if (itemCount && activeItemIndex >= itemCount) {
      setActiveItemIndex(getDefaultItemIndex(activeTab))
    }
  }, [activeTab, activeItemIndex])

  /* =======================================================
     HASH RESOLUTION
  ======================================================= */

  const resolveHash = useCallback(
    (hashValue: string) => {
      const id = normalizeId(hashValue)

      if (!id) return null

      /* outer Service Showcase */

      if (normalizeId(block?.sectionSettings?.sectionId) === id) {
        return {
          tabIndex: defaultTabIndex,

          itemIndex: getDefaultItemIndex(tabs[defaultTabIndex]),

          scrollTargetId: id,
        }
      }

      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex += 1) {
        const tab = tabs[tabIndex]

        /* ----------------------------
             direct tab ID
          ---------------------------- */

        if (normalizeId(tab?.tabId) === id) {
          return {
            tabIndex,

            itemIndex: getDefaultItemIndex(tab),

            scrollTargetId: id,
          }
        }

        /* ----------------------------
             Collaborative Method ID
          ---------------------------- */

        const collaborativeId = normalizeId(tab?.collaborativeMethod?.sectionSettings?.sectionId)

        if (collaborativeId === id) {
          return {
            tabIndex,

            itemIndex: getDefaultItemIndex(tab),

            scrollTargetId: collaborativeId,
          }
        }

        /* ----------------------------
             What We Build section ID
          ---------------------------- */

        const whatWeBuildId = normalizeId(tab?.whatWeBuild?.sectionSettings?.sectionId)

        if (whatWeBuildId === id) {
          return {
            tabIndex,

            itemIndex: getDefaultItemIndex(tab),

            scrollTargetId: whatWeBuildId,
          }
        }

        /* ----------------------------
             What We Build item ID
          ---------------------------- */

        const items = tab?.whatWeBuildItems?.filter(Boolean) ?? []

        const itemIndex = items.findIndex((item) => normalizeId(item?.itemId) === id)

        if (itemIndex >= 0) {
          return {
            tabIndex,

            itemIndex,

            /*
             * Scroll to the What We Build
             * section rather than the tiny
             * carousel card itself.
             */
            scrollTargetId: whatWeBuildId || id,
          }
        }
      }

      return null
    },
    [block?.sectionSettings?.sectionId, tabs, defaultTabIndex],
  )

  /* =======================================================
     URL -> STATE

     Supports:
     initial load
     browser back/forward hash change
     direct links
  ======================================================= */

  useEffect(() => {
    const applyHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))

      if (!hash) return

      const resolution = resolveHash(hash)

      if (!resolution) return

      setActiveTabIndex(resolution.tabIndex)

      setActiveItemIndex(resolution.itemIndex)

      /*
       * Wait for the active tab's content
       * to exist before attempting scroll.
       */
      window.setTimeout(() => {
        scrollToSectionId(resolution.scrollTargetId)
      }, 120)
    }

    applyHash()

    window.addEventListener('hashchange', applyHash)

    return () => {
      window.removeEventListener('hashchange', applyHash)
    }
  }, [resolveHash])

  /* =======================================================
     TAB CLICK
  ======================================================= */

  const handleTabSelect = (index: number) => {
    const tab = tabs[index]

    if (!tab) return

    setActiveTabIndex(index)

    setActiveItemIndex(getDefaultItemIndex(tab))

    replaceHash(tab?.tabId)
  }

  /* =======================================================
     CAROUSEL ACTIVE STATE
  ======================================================= */

  const handleItemActiveChange = (index: number) => {
    setActiveItemIndex(index)
  }

  const handleItemSelect = (index: number) => {
    setActiveItemIndex(index)

    const item = activeTab?.whatWeBuildItems?.[index]

    replaceHash(item?.itemId)
  }

  if (!tabs.length || !activeTab) {
    return null
  }

  return (
    <div className="relative">
      {/* ===================================================
          MAIN SERVICE SHOWCASE HEADING
      =================================================== */}

      <div
        className="
          container-padding-x

          pt-9

          md:pt-[48px]

          lg:pt-[68px]

          xl:pt-[90px]

          2xl:pt-[112px]
        "
      >
        {/* smaller heading than normal SectionHeading01 */}

        <div
          className="
            [&_h1]:!text-[28px]
            [&_h2]:!text-[28px]
            [&_h3]:!text-[28px]
            [&_.global-h2]:!text-[28px]

            md:[&_h1]:!text-[34px]
            md:[&_h2]:!text-[34px]
            md:[&_h3]:!text-[34px]
            md:[&_.global-h2]:!text-[34px]

            lg:[&_h1]:!text-[38px]
            lg:[&_h2]:!text-[38px]
            lg:[&_h3]:!text-[38px]
            lg:[&_.global-h2]:!text-[38px]

            xl:[&_h1]:!text-[44px]
            xl:[&_h2]:!text-[44px]
            xl:[&_h3]:!text-[44px]
            xl:[&_.global-h2]:!text-[44px]

            2xl:[&_h1]:!text-[50px]
            2xl:[&_h2]:!text-[50px]
            2xl:[&_h3]:!text-[50px]
            2xl:[&_.global-h2]:!text-[50px]
          "
        >
          <SectionHeading01 data={block?.sectionHeading} align="middle" />
        </div>

        {/* =================================================
            SERVICE TABS
        ================================================= */}

        {/* <div
          className="
            no-scrollbar

            mt-[28px]

            flex
            w-full

            overflow-x-auto

            border-b
            border-primary-1/35

            md:mt-[34px]

            lg:mt-[42px]

            xl:mt-[48px]
          "
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeTabIndex

            return (
              <button
                id={tab?.tabId || undefined}
                key={tab?.id ?? tab?.tabId ?? index}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleTabSelect(index)}
                className={`
                    relative

                    flex
                    min-h-[44px]
                    min-w-[170px]

                    shrink-0

                    items-center
                    justify-center

                    px-[14px]
                    py-[10px]

                    text-center

                    font-grift
                    global-p5
                    font-semibold

                    uppercase

                    transition-all
                    duration-300
                    ease-out

                    md:min-w-[190px]

                    lg:min-w-0
                    lg:flex-1

                    xl:px-[18px]
                    xl:py-[12px]

                    ${
                      isActive
                        ? `
                            bg-primary-1

                            text-white-1
                          `
                        : `
                            bg-transparent

                            text-primary-1/70

                            hover:bg-primary-1/10

                            hover:text-primary-1
                          `
                    }
                  `}
              >
                {tab?.tabLabel}
              </button>
            )
          })}
        </div> */}

        <div
          className="
    mt-[28px]
    w-full

    md:mt-[34px]
    lg:mt-[42px]
    xl:mt-[48px]
  "
        >
          {/* tabs */}
          <div
            className="
      no-scrollbar

      flex
      w-full
      items-end

      overflow-x-auto

      gap-[4px]

      md:gap-[6px]
      lg:gap-[8px]
    "
          >
            {tabs.map((tab, index) => {
              const isActive = index === activeTabIndex

              return (
                <button
                  id={tab?.tabId || undefined}
                  key={tab?.id ?? tab?.tabId ?? index}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleTabSelect(index)}
                  className={`
            relative

            flex
            min-h-[44px]
            min-w-[170px]

            shrink-0

            items-center
            justify-center

            px-[14px]
            py-[9px]

            text-center

            font-grift
            global-p5
            font-semibold
            uppercase

            transition-all
            duration-300
            ease-out

            md:min-w-[190px]
            md:px-[16px]

            lg:min-w-0
            lg:flex-1
            lg:px-[16px]

            xl:px-[18px]
            xl:py-[10px]

            2xl:px-[20px]
            2xl:py-[11px]

            ${
              isActive
                ? `
                    mb-[5px]

                    rounded-[5px]

                    bg-primary-1
                    text-white-1

                    shadow-[0_8px_20px_rgba(0,108,103,0.10)]
                  `
                : `
                    mb-[5px]

                    rounded-[5px]

                    bg-transparent

                    text-primary-1/70

                    hover:bg-primary-1/10
                    hover:text-primary-1
                  `
            }
          `}
                >
                  {tab?.tabLabel}
                </button>
              )
            })}
          </div>

          {/* line image */}
          <div
            className="
      relative
      h-[2px]
      w-full
    "
          >
            <Image
              src={TabLine}
              alt=""
              fill
              sizes="100vw"
              quality={100}
              placeholder="blur"
              blurDataURL={TabLine.blurDataURL}
              className="
        object-fill
        object-center
      "
            />
          </div>
        </div>
      </div>

      {/* ===================================================
          COLLABORATIVE METHOD

          independent:
          background color
          section id
      =================================================== */}

      <ServiceSubSection
        id={activeTab?.collaborativeMethod?.sectionSettings?.sectionId}
        backgroundColor={activeTab?.collaborativeMethod?.sectionSettings?.backgroundColor}
      >
        <ServiceCollaborativeMethod tab={activeTab} />
      </ServiceSubSection>

      {/* ===================================================
          WHAT WE BUILD

          independent:
          background color
          section id
      =================================================== */}

      <ServiceSubSection
        id={activeTab?.whatWeBuild?.sectionSettings?.sectionId}
        backgroundColor={activeTab?.whatWeBuild?.sectionSettings?.backgroundColor}
      >
        <ServiceWhatWeBuild
          key={activeTab?.id ?? activeTab?.tabId}
          tab={activeTab}
          activeItemIndex={activeItemIndex}
          onActiveItemChange={handleItemActiveChange}
          onItemSelect={handleItemSelect}
        />
      </ServiceSubSection>
    </div>
  )
}

export default ServiceShowCaseSection
