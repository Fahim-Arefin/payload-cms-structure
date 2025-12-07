// src/components/custom/support/FaqTabSection.tsx
'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { useEffect, useMemo, useState, useRef } from 'react'
import GeneralFaq from './GeneralFaq'
import FormsTable from './FormsTable'
import type { SupportFaqTabBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: SupportFaqTabBlockType
  initialTab?: 'general' | 'form'
  onTabChange?: (val: 'general' | 'form') => void
}

const TAB_GENERAL = 'general'
const TAB_FORM = 'form'
type TabValue = typeof TAB_GENERAL | typeof TAB_FORM

export function FaqTabSection({ block, initialTab, onTabChange }: Props) {
  const lang = useSSRLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  // tabs from schema, values are guaranteed: 'general' | 'form'
  const tabs = useMemo(
    () =>
      [
        block?.faqTab && {
          value: TAB_GENERAL as TabValue,
          label: block.faqTab.label ?? 'General FAQ',
          labelBN: block.faqTab.labelBN ?? 'সাধারণ জিজ্ঞাসা',
        },
        block?.forms && {
          value: TAB_FORM as TabValue,
          label: block.formsTabLabel ?? 'Download Forms',
          labelBN: block.formsTabLabelBN ?? 'ডাউনলোড ফরম',
        },
      ].filter(Boolean) as { value: TabValue; label: string; labelBN?: string | null }[],
    [block],
  )

  const allowedValues = useMemo<TabValue[]>(() => tabs.map((t) => t.value), [tabs])

  // Get hash from URL
  const getHashFromUrl = (): TabValue | null => {
    if (typeof window === 'undefined') return null
    const hash = window.location.hash.replace(/^#/, '').toLowerCase()
    if (hash === TAB_GENERAL || hash === TAB_FORM) {
      return hash as TabValue
    }
    return null
  }

  // Determine initial tab value
  const getInitialTab = (): TabValue => {
    const hashValue = getHashFromUrl()
    if (hashValue && allowedValues.includes(hashValue)) {
      return hashValue
    }
    
    if (initialTab && allowedValues.includes(initialTab)) {
      return initialTab
    }
    
    if (tabs.length > 0 && tabs[0]?.value) {
      return tabs[0].value
    }
    
    return TAB_GENERAL
  }

  const [activeTab, setActiveTab] = useState<TabValue>(getInitialTab)

  // Scroll to section
  const scrollToSection = () => {
    if (sectionRef.current) {
      const offset = 80 // Adjust this value based on your header height
      const elementPosition = sectionRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Handle initial load with hash
  useEffect(() => {
    const hashValue = getHashFromUrl()
    if (hashValue && allowedValues.includes(hashValue)) {
      setActiveTab(hashValue)
      onTabChange?.(hashValue)
      
      // Scroll after a short delay to ensure content is rendered
      setTimeout(() => {
        scrollToSection()
      }, 100)
    }
  }, []) // Run only on mount

  // Handle hash changes from browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hashValue = getHashFromUrl()
      if (hashValue && allowedValues.includes(hashValue)) {
        setActiveTab(hashValue)
        onTabChange?.(hashValue)
        scrollToSection()
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [allowedValues, onTabChange])

  // Handle user clicking tabs
  const handleTabChange = (val: string) => {
    const newTab = val as TabValue
    
    if (!allowedValues.includes(newTab)) return
    
    setActiveTab(newTab)
    
    if (typeof window !== 'undefined') {
      const currentHash = window.location.hash.replace(/^#/, '')
      if (currentHash !== newTab) {
        window.history.replaceState(null, '', `#${newTab}`)
      }
    }
    
    onTabChange?.(newTab)
  }

  const renderLabel = (t: { label: string; labelBN?: string | null }) =>
    lang === 'bn' ? t.labelBN || t.label : t.label

  return (
    <>
      <div
        ref={sectionRef}
        className="px-5 pt-12 
           md:px-24 md:pt-[40px] 
           lg:px-[130px]  lg:pt-[50px] 
           xl:px-[200px]  xl:pt-[70px] 
           2xl:px-[300px] 2xl:pt-[100px]"
      >
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div
            className="relative w-full border-b border-[#434343] md:py-[12px] bg-white
            mb-[16px] md:mb-[20px] lg:mb-[40px] xl:mb-[70px]"
          >
            <TabsList
              className={cn(
                'w-full flex md:overflow-x-visible bg-transparent border-none p-0',
                tabs.length === 2
                  ? 'justify-start space-x-[5%] md:space-x-[15%] lg:space-x-[25%]'
                  : 'justify-between',
              )}
            >
              {tabs.map((tab, index) => {
                const label = renderLabel(tab)
                const words = label.trim().split(' ')
                const last = words.pop() ?? ''
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      'global-p1 font-medium px-2 py-2.5 md:py-6 relative flex justify-start uppercase',
                      index === 0 ? 'text-left pl-0' : 'text-left',
                      activeTab === tab.value
                        ? 'text-[#434343] after:content-[""] after:absolute shadow-none data-[state=active]:shadow-none after:border-none after:inset-x-0 after:bottom-0 after:h-[4px] after:md:h-[8px] after:w-full after:bg-orange-500 after:rounded-full'
                        : 'text-[#434343]',
                    )}
                  >
                    {words.join(' ')}{' '}
                    <span
                      className={cn(
                        activeTab === tab.value ? 'text-[#ED7125]' : 'text-[#9C8639]',
                        'ml-1 md:ml-2',
                      )}
                    >
                      {last}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {activeTab === TAB_GENERAL ? (
        <GeneralFaq
          categories={(block?.faqTab?.categories ?? []).map((c: any) => ({
            key: c?.key ?? 'general',
            title: c?.title ?? '',
            titleBN: c?.titleBN ?? null,
            items: (c?.items ?? []).map((q: any) => ({
              title: q?.title ?? '',
              titleBN: q?.titleBN ?? null,
              desc: q?.desc ?? null,
              descBN: q?.descBN ?? null,
            })),
          }))}
          containerBg={block?.faqTab?.backgroundColor || '#F6EDDD'}
          title={block?.faqTab?.title || ''}
          titleBN={block?.faqTab?.titleBN || ''}
        />
      ) : (
        <FormsTable
          forms={block?.forms}
          buttonTextEn={block?.formsButtonText || 'Download'}
          buttonTextBn={block?.formsButtonTextBN || 'ডাউনলোড'}
          containerBg={block?.formsBackgroundColor || '#F6EDDD'}
          headerBg={block?.formsTableHeaderBgColor || '#a08d2c'}
        />
      )}
    </>
  )
}

export default FaqTabSection