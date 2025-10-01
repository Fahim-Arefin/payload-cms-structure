// app/(frontend)/support/page.tsx  <-- SERVER COMPONENT
import { Metadata } from 'next'
import { supportTabContent as staticSupportContent } from '@/lib/data'
import SupportPageClient from '@/components/custom/support/SupportPageClient'
import { toSupportTabHospitals } from '@/lib/mapTransform'

export const metadata: Metadata = {
  title: 'Support',
}

async function fetchHospitals() {
  // Fresh each request; switch to { next: { revalidate: 3600 } } if you prefer caching
  const res = await fetch('https://api.shantalife.com/hospitals', { cache: 'no-store' })
  if (!res.ok) return []
  const json = await res.json()
  return Array.isArray(json) ? json : []
}

export default async function Page() {
  const hospitals = await fetchHospitals()

  // Index 0 = branches (from your current local data), Index 1 = hospitals (from API)
  const mapTabData = [
    staticSupportContent[0],
    { content: toSupportTabHospitals(hospitals) },
  ]

  return <SupportPageClient mapTabData={mapTabData} />
}
