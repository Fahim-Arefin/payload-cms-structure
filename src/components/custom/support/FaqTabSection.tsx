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
  initialTab?: string
}

export function FaqTabSection({ block, initialTab }: Props) {
  const lang = useSSRLanguage()

  // Build visible tabs from the block (keeps your “value/label/labelBN” parity)
  const tabs = useMemo(() => {
    const list: { value: string; label: string; labelBN?: string | null }[] = []
    if (block?.faqTab) {
      list.push({
        value: block.faqTab.value ?? 'general',
        label: block.faqTab.label ?? 'General Forms',
        labelBN: block.faqTab.labelBN ?? 'সাধারণ জিজ্ঞাসা',
      })
    }
    if (block?.formsTab) {
      list.push({
        value: block.formsTab.value ?? 'form',
        label: block.formsTab.label ?? 'Download Forms',
        labelBN: block.formsTab.labelBN ?? 'ডাউনলোড ফরম',
      })
    }
    return list
  }, [block])

  // Normalize categories (never null) → [{ key, title, titleBN, items: [{...}] }]
  const normalizedCategories = useMemo(() => {
    const cats = block?.faqTab?.categories ?? []
    return cats.map((c) => ({
      key: (c as any)?.key ?? 'general',
      title: (c as any)?.title ?? '',
      titleBN: (c as any)?.titleBN ?? null,
      items: ((c as any)?.items ?? []).map((q: any) => ({
        title: q?.title ?? '',
        titleBN: q?.titleBN ?? null,
        desc: q?.desc ?? null,
        descBN: q?.descBN ?? null,
      })),
    }))
  }, [block])

  const defaultTab = initialTab || tabs?.[0]?.value || 'general'
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab)
  }, [initialTab])

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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div
            className="relative w-full border-b border-[#434343] md:py-[12px] bg-white
            mb-[16px] md:mb-[20px] lg:mb-[40px] xl:mb-[70px]"
          >
            <TabsList
              className={cn(
                'w-full flex md:overflow-x-visible bg-transparent border-none p-0 ',
                tabs.length === 2
                  ? 'justify-start space-x-[5%] md:space-x-[15%] lg:space-x-[25%]'
                  : 'justify-between',
              )}
            >
              {tabs.map((tab, index) => {
                const label = renderLabel(tab)
                const words = label.trim().split(' ')
                const last = words.pop()
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

      {/* TabsContent outside of Tabs */}
      {activeTab === (block?.faqTab?.value ?? 'general') ? (
        <GeneralFaq
          categories={normalizedCategories}
          containerBg={block?.faqTab?.backgroundColor || '#F6EDDD'}
          categoryHeadingEn={block?.faqTab?.categoryTitle || ''}
          categoryHeadingBn={block?.faqTab?.categoryTitleBN || ''}
        />
      ) : (
        <FormsTable
          forms={(block?.formsTab?.forms ?? []).map((f: any) => ({
            title: f?.title ?? '',
            titleBN: f?.titleBN ?? null,
          }))}
          buttonTextEn={block?.formsTab?.buttonText || 'Download'}
          buttonTextBn={block?.formsTab?.buttonTextBN || 'ডাউনলোড'}
          containerBg={block?.formsTab?.backgroundColor || '#F6EDDD'}
          headerBg={block?.formsTab?.tableHeaderBgColor || '#a08d2c'}
        />
      )}
    </>
  )
}

export default FaqTabSection
