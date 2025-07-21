export interface ApiResponse {
  life_premium_yearly: number
  life_premium_half_yearly: number
  life_premium_quarterly: number
  life_premium_monthly: number
  life_premium_single: number
  accident_premium_yearly: number
  accident_premium_half_yearly: number
  accident_premium_quarterly: number
  accident_premium_monthly: number
  accident_premium_single: number
  ci_premium_yearly: number
  ci_premium_half_yearly: number
  ci_premium_quarterly: number
  ci_premium_monthly: number
  ci_premium_single: number
  life_rate: number
  accident_rate: number
  ci_rate: number
  accidental_coverage: number
  ci_coverage: number
  message: string
}

export interface ApiResToShow {
  lifePremium: {
    monthly: number
    quarterly: number
    half_yearly: number
    yearly: number
    single: number
  }
  accidentPremium: number
  ciPremium: number
}

// Helper function to get total premium for a specific payment mode
export const getTotalPremium = (apiResponse: ApiResponse | null, paymentMode: string): ApiResToShow => {
  if (!apiResponse)
    return {
      lifePremium: {
        monthly: 0,
        quarterly: 0,
        half_yearly: 0,
        yearly: 0,
        single: 0,
      },
      accidentPremium: 0,
      ciPremium: 0,
    }

  const suffix =
    paymentMode === 'Monthly'
      ? '_monthly'
      : paymentMode === 'Quarterly'
        ? '_quarterly'
        : paymentMode === 'Semi-annually'
          ? '_half_yearly'
          : paymentMode === 'Yearly'
            ? '_yearly'
            : paymentMode === 'Single'
              ? '_single'
              : '_monthly'

  const lifePremium = {
    monthly: (apiResponse as any)[`life_premium_monthly`] || 0,
    quarterly: (apiResponse as any)[`life_premium_quarterly`] || 0,
    half_yearly: (apiResponse as any)[`life_premium_half_yearly`] || 0,
    yearly: (apiResponse as any)[`life_premium_yearly`] || 0,
    single: (apiResponse as any)[`life_premium_single`] || 0,
  }
  
  const accidentPremium = (apiResponse as any)[`accident_premium${suffix}`] || 0
  const ciPremium = (apiResponse as any)[`ci_premium${suffix}`] || 0

  return {
    lifePremium: lifePremium,
    accidentPremium: accidentPremium,
    ciPremium: ciPremium,
  }
}