// src/components/custom/support/FaqTabSection.tsx
'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { useEffect, useMemo, useState } from 'react'
import GeneralFaq from './GeneralFaq'
import FormsTable from './FormsTable'
import type { SupportFaqTabBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: SupportFaqTabBlockType
  initialTab?: 'general' | 'form'
  onTabChange?: (val: 'general' | 'form') => void
}

const TAB_GENERAL = 'general' as const
const TAB_FORM = 'form' as const
type TabValue = typeof TAB_GENERAL | typeof TAB_FORM

export function FaqTabSection({ block, initialTab, onTabChange }: Props) {
  const lang = useSSRLanguage()

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

  // choose default: hash ➜ initialTab ➜ first tab ➜ 'general'
  const deriveDefault = (): TabValue => {
    const hash = (typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '') as
      | TabValue
      | ''
    if (hash && (allowedValues as string[]).includes(hash)) return hash
    if (initialTab && (allowedValues as string[]).includes(initialTab)) return initialTab
    return (tabs[0]?.value ?? TAB_GENERAL) as TabValue
  }

  const [activeTab, setActiveTab] = useState<TabValue>(deriveDefault)

  useEffect(() => {
    // react to external hash changes
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, '') as TabValue | ''
      if (raw && (allowedValues as string[]).includes(raw) && raw !== activeTab) {
        setActiveTab(raw as TabValue)
        onTabChange?.(raw as TabValue)
      }
    }
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedValues, activeTab, onTabChange])

  const handleTabChange = (val: string) => {
    const v = (val === TAB_FORM ? TAB_FORM : TAB_GENERAL) as TabValue
    setActiveTab(v)
    if (typeof window !== 'undefined' && window.location.hash !== `#${v}`) {
      history.replaceState(null, '', `#${v}`)
    }
    onTabChange?.(v)
  }

  const renderLabel = (t: { label: string; labelBN?: string | null }) =>
    lang === 'bn' ? t.labelBN || t.label : t.label

  return (
    <>
      <div
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
          // forms={(block?.forms ?? []).map((f: any) => ({
          //   title: f?.title ?? '',
          //   titleBN: f?.titleBN ?? null,
          // }))}
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
