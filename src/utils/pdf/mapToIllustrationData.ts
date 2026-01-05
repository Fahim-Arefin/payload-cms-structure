// src/utils/pdf/mapToIllustrationData.ts
import type { IllustrationData } from './generateQuotePdf'
import { getTotalPremium } from '@/utils/premiumCalculator'

type Payload = {
  formData: any
  apiResponse: any
  confirmedPaymentMode: string
  ciSelection: 'ci19' | 'ci25' | null
  isAccidentSelected: boolean
  meta?: any // ✅ new
}

export function mapToIllustrationData(p: Payload): IllustrationData {
  const premium = getTotalPremium(p.apiResponse, p.confirmedPaymentMode)

  // NOTE: here you’ll map your real values properly.
  return {
    formData: p.formData, // ✅ add this
    meta: p.meta,
    benefits: [
      { type: 'Death Benefit', description: 'As per plan rules', amount: 'Tk …' },
      { type: 'Maturity Benefit', description: 'As per plan rules', amount: 'Tk …' },
    ],
    riders: [
      {
        name: p.ciSelection ? (p.ciSelection === 'ci19' ? 'CI-19' : 'CI-25') : '—',
        description: p.ciSelection ? 'Critical illness coverage' : 'No rider selected',
        coverageAmount: p.ciSelection ? 'Tk …' : '—',
        premium: p.ciSelection
          ? String(
              p.ciSelection === 'ci19' ? premium.ciPremium.monthly : premium.ci25Premium.monthly,
            )
          : '—',
      },
    ],
    projectedValues: Array.from({ length: 12 }).map((_, i) => ({
      year: i + 1,
      annualPremium: 'Tk …',
      deathBenefit: 'Tk …',
      surrenderValue: 'Tk …',
      maturityValue: 'Tk …',
      paidUpValue: 'Tk …',
    })),
  }
}
