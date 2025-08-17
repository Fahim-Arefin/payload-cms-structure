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
  ci_premium_yearly_25: number
  ci_premium_half_yearly_25: number
  ci_premium_quarterly_25: number
  ci_premium_monthly_25: number
  ci_premium_single_25: number
  life_rate: number
  accident_rate: number
  ci_rate: number
  accidental_coverage: number
  ci_coverage: number
  message: string
}

type resParam = {
  monthly: number
  quarterly: number
  half_yearly: number
  yearly: number
  single: number
}

export interface ApiResToShow {
  lifePremium: resParam
  accidentPremium: resParam
  ciPremium: resParam
  ci25Premium: resParam
}

// Helper function to get total premium for a specific payment mode
export const getTotalPremium = (
  apiResponse: ApiResponse | null,
  paymentMode: string,
): ApiResToShow => {
  if (!apiResponse)
    return {
      lifePremium: {
        monthly: 0,
        quarterly: 0,
        half_yearly: 0,
        yearly: 0,
        single: 0,
      },
      accidentPremium: {
        monthly: 0,
        quarterly: 0,
        half_yearly: 0,
        yearly: 0,
        single: 0,
      },
      ciPremium: {
        monthly: 0,
        quarterly: 0,
        half_yearly: 0,
        yearly: 0,
        single: 0,
      },
      ci25Premium: {
        monthly: 0,
        quarterly: 0,
        half_yearly: 0,
        yearly: 0,
        single: 0,
      },
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

  const accidentPremium = {
    monthly: (apiResponse as any)[`accident_premium_monthly`] || 0,
    quarterly: (apiResponse as any)[`accident_premium_quarterly`] || 0,
    half_yearly: (apiResponse as any)[`accident_premium_half_yearly`] || 0,
    yearly: (apiResponse as any)[`accident_premium_yearly`] || 0,
    single: (apiResponse as any)[`accident_premium_single`] || 0,
  }

  const ciPremium = {
    monthly: (apiResponse as any)[`ci_premium_monthly`] || 0,
    quarterly: (apiResponse as any)[`ci_premium_quarterly`] || 0,
    half_yearly: (apiResponse as any)[`ci_premium_half_yearly`] || 0,
    yearly: (apiResponse as any)[`ci_premium_yearly`] || 0,
    single: (apiResponse as any)[`ci_premium_single`] || 0,
  }

  const ci25Premium = {
    monthly: (apiResponse as any)[`ci_premium_monthly_25`] || 0,
    quarterly: (apiResponse as any)[`ci_premium_quarterly_25`] || 0,
    half_yearly: (apiResponse as any)[`ci_premium_half_yearly_25`] || 0,
    yearly: (apiResponse as any)[`ci_premium_yearly_25`] || 0,
    single: (apiResponse as any)[`ci_premium_single_25`] || 0,
  }

  return {
    lifePremium: lifePremium,
    accidentPremium: accidentPremium,
    ciPremium: ciPremium,
    ci25Premium: ci25Premium,
  }
}
