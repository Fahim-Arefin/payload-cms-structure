'use client'

import React from 'react'
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
  // Index 0 = branches (from your current local data), Index 1 = hospitals (from API)
  const mapTabData = [staticSupportContent[0], { content: toSupportTabHospitals(hospitals) }]
  // ---- LocalStorage caching for hospitals (NEW) ----
  const branchesBlock = mapTabData[0]
  const hospitalsBlock = mapTabData[1]
  const initialHospitals = (hospitalsBlock?.content ?? []) as any[]
  const { data: cachedHospitals } = useHospitalsCache(initialHospitals)

  const finalMapTabData: TabDataType[] = [branchesBlock, { content: cachedHospitals }]
  return (
    <div>
      <MapTabSection data={finalMapTabData} config={block} />
    </div>
  )
}
