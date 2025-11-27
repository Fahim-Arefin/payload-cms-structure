// src/components/custom/support/MapTabSection.tsx
'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import SupportTabContent from './SupportTabContent'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { SupportMapTabBlockType } from '@/types/payloadCustomTypes'

type Props = {
  config: SupportMapTabBlockType // full block from Payload
  data: any[] // keep as-is (your TabDataType[] datasets)
  initialTab?: string
  bgColor?: string
  onTabChange?: (val: 'hospitals' | 'branches') => void // NEW
}

// Narrowed tabItem type (value can only be 'hospitals' or 'branches')
type TabItemFromBlock = {
  value: 'hospitals' | 'branches'
  label: string
  labelBN?: string
  highlightedLabel?: string | null
  highlightedLabelBN?: string | null
  description?: any
  descriptionBN?: any
  primaryLabelColor?: string
  secondaryLabelColor?: string
}

export function MapTabSection({ config, data, initialTab, bgColor, onTabChange }: Props) { // NEW (accept onTabChange)
  const lang = useSSRLanguage()

  // Normalize & narrow the tabItems to the strict union
  const tabs = useMemo<TabItemFromBlock[]>(() => {
    const items = config?.tabItems ?? []
    // keep incoming order exactly as provided
    return items
      .map((t) => {
        if (t?.value === 'hospitals' || t?.value === 'branches') {
          return { ...t, value: t.value } as TabItemFromBlock
        }
        return null
      })
      .filter(Boolean) as TabItemFromBlock[]
  }, [config])

  const allowedValues = useMemo<('hospitals' | 'branches')[]>(
    () => tabs.map((t) => t.value),
    [tabs]
  ) // NEW

  const firstValue = tabs[0]?.value
  const [activeTab, setActiveTab] = useState<string>(initialTab || firstValue || '')

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab)
    else if (!activeTab && firstValue) setActiveTab(firstValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTab, firstValue])

  // Apply URL hash on mount + when it changes (e.g., /support#hospitals)
  useEffect(() => {
    const applyHash = () => {
      const raw = (window.location.hash || '').replace(/^#/, '')
      if (raw && allowedValues.includes(raw as any)) {
        setActiveTab(raw)
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [allowedValues]) // NEW

  // When user switches tabs, update hash + bubble up
  const handleTabChange = (val: string) => { // NEW
    const v = (val as 'hospitals' | 'branches')
    setActiveTab(v)
    if (typeof window !== 'undefined' && window.location.hash !== `#${v}`) {
      history.replaceState(null, '', `#${v}`)
    }
    onTabChange?.(v)
  }

  // Colors from schema (fallbacks preserved)
  const primaryColor = config?.primaryLabelColor || '#ED7125'
  const secondaryColor = config?.secondaryLabelColor || '#9C8639'

  return (
    <>
      <div
        className={cn(
          'px-5 pt-12',
          'md:px-24 md:pt-[40px]',
          'lg:px-[130px] lg:pt-[50px]',
          'xl:px-[200px] xl:pt-[70px]',
          '2xl:px-[300px] 2xl:pt-[100px]',
        )}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        <Tabs value={activeTab} onValueChange={handleTabChange}> {/* NEW */}
          <div
            className={cn(
              'relative w-full border-b border-[#434343] md:py-[12px] bg-white',
              'mb-[10px] md:mb-[10px] lg:mb-[15px] xl:mb-[20px]',
            )}
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
                const rawLabel = lang === 'bn' ? tab?.labelBN || tab?.label : tab?.label
                const safeLabel = (rawLabel ?? '').trim()
                const words = safeLabel.split(' ').filter(Boolean)
                const last = words.pop() ?? ''
                const firstPart = words.join(' ')

                const isActive = activeTab === tab.value
                const lastWordColor = isActive ? primaryColor : secondaryColor

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      'global-p1 font-medium px-2 py-2.5 md:py-6 relative flex justify-start uppercase',
                      index === 0 ? 'text-left pl-0' : 'text-left',
                      isActive
                        ? 'text-[#434343] after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-[4px] after:md:h-[8px] after:w-full after:bg-orange-500 after:rounded-full data-[state=active]:shadow-none'
                        : 'text-[#434343]',
                    )}
                  >
                    {firstPart}
                    {firstPart && last ? ' ' : null}
                    <span className="ml-1 md:ml-2" style={{ color: lastWordColor }}>
                      {last}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Single, correct render (keep your original behavior outside <Tabs/>) */}
      <SupportTabContent
        data={data} // your TabDataType[] datasets
        activeTab={activeTab as 'branches' | 'hospitals'}
        bgColor={bgColor}
        tabItems={tabs} // strictly typed, available if you need labels/desc/colors
      />
    </>
  )
}

export default MapTabSection
