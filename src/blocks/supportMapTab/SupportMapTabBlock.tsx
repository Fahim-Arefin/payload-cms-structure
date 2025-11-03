import React from 'react'
import { SupportMapTabBlockType } from '@/types/payloadCustomTypes'
import MapTabBlockSection from '@/components/custom/support/MapTabBlockSection'

type Props = {
  block: SupportMapTabBlockType
  params: Record<string, string>
}

async function fetchHospitals() {
  // Fresh each request; switch to { next: { revalidate: 3600 } } if you prefer caching
  const res = await fetch('https://api.shantalife.com/hospitals', { cache: 'no-store' })
  if (!res.ok) return []
  const json = await res.json()
  return Array.isArray(json) ? json : []
}

async function SupportMapTabBlock({ block, params }: Props) {
  const hospitals = await fetchHospitals()

  return (
    <div>
      <MapTabBlockSection block={block} params={params} hospitals={hospitals} />
    </div>
  )
}

export default SupportMapTabBlock
