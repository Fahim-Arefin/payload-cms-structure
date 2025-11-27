// src/components/custom/support/MapTabBlockSection.tsx
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import useHospitalsCache from '@/hooks/useHospitalCache'
import MapTabSection from './MapTabSection'
import { SupportMapTabBlockType } from '@/types/payloadCustomTypes'
import { TabDataType } from '@/types'
import { supportTabContent as staticSupportContent } from '@/lib/data'
import { toSupportTabHospitals } from '@/lib/mapTransform'

type Props = {
  block: SupportMapTabBlockType
  params: Record<string, string>
  hospitals: any[]
}

export default function MapTabBlockSection({ block, params, hospitals }: Props) {
  // ---- Build data (branches local + hospitals API w/ cache) ----
  const mapTabData = [staticSupportContent[0], { content: toSupportTabHospitals(hospitals) }]
  const branchesBlock = mapTabData[0]
  const hospitalsBlock = mapTabData[1]
  const initialHospitals = (hospitalsBlock?.content ?? []) as any[]
  const { data: cachedHospitals } = useHospitalsCache(initialHospitals)
  const finalMapTabData: TabDataType[] = [branchesBlock, { content: cachedHospitals }]

  // ---- Hash-aware tab control (dynamic values from schema) ----
  const containerRef = useRef<HTMLDivElement | null>(null)

  // read allowed tab values from your block schema; fallback to common defaults
  const allowedTabs = useMemo<string[]>(
    () => {
      const vals = (block?.tabItems ?? [])
        .map((t: any) => String(t?.value ?? '').trim())
        .filter(Boolean)
      return vals.length ? vals : ['branches', 'hospitals']
    },
    [block?.tabItems]
  )

  const defaultTab = allowedTabs[0] ?? 'branches'
  const [activeTab, setActiveTab] = useState<string>(defaultTab)

  // apply hash on mount + on hash changes
  useEffect(() => {
    const applyHash = () => {
      const raw = (window.location.hash || '').replace(/^#/, '')
      if (raw && allowedTabs.includes(raw)) {
        setActiveTab(raw)
        // ensure section is visible when hash comes in externally
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [allowedTabs])

  // when user switches tabs in UI, update hash and keep section in view
  const handleTabChange = (val: string) => {
    if (!val) return
    setActiveTab(val)
    if (window.location.hash !== `#${val}`) {
      // keep SPA-ish behavior (no full reload)
      history.replaceState(null, '', `#${val}`)
    }
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div id="map-section" ref={containerRef}>
      <MapTabSection
        data={finalMapTabData}
        config={block}
        /** Your MapTabSection already supported this in the old page */
        initialTab={activeTab}
        /** Make sure MapTabSection calls onTabChange(newValue) when a tab is clicked */
        onTabChange={handleTabChange}
      />
    </div>
  )
}
