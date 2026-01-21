// import { NextRequest, NextResponse } from 'next/server'
// import { generateQuotePdf } from '@/utils/pdf/generateQuotePdf'
// import { mapToIllustrationData } from '@/utils/pdf/mapToIllustrationData'

// export const runtime = 'nodejs' // IMPORTANT for fs + pdf-lib reliability

// type ProductFeatureRow = {
//   key_prod_feature?: string | null
//   additional_feature?: string | null
//   td?: string | null
//   maturity_benefit?: string | null
//   death_benefit?: string | null
// }

// async function fetchPlanFeatures(planCode: number) {
//   const res = await fetch(`https://api.shantalife.com/product_feature/${planCode}`, {
//     cache: 'no-store',
//     headers: { Accept: 'application/json' },
//   })

//   if (!res.ok) {
//     // don’t fail PDF generation if this API is down — just return empty arrays
//     return { coreBenefitItems: [], additionalFeatureItems: [], importantTerms: [] }
//   }

//   const rows = (await res.json()) as ProductFeatureRow[]

//   const coreBenefitItems = rows
//     ?.map((row) => row?.key_prod_feature)
//     ?.filter((item) => item && item?.trim())

//   const additionalFeatureItems = rows
//     ?.map((row) => row?.additional_feature)
//     ?.filter((item) => item && item?.trim())

//   const importantTerms = rows?.map((row) => row?.td)?.filter((item) => item && item?.trim())

//   const maturityBenefit = rows
//     ?.map((row) => row?.maturity_benefit)
//     ?.filter((item) => item && item?.trim())

//   const deathBenefit = rows
//     ?.map((row) => row?.death_benefit)
//     ?.filter((item) => item && item?.trim())

//   return { coreBenefitItems, additionalFeatureItems, importantTerms, maturityBenefit, deathBenefit }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()

//     // minimal validation
//     if (!body?.apiResponse || !body?.formData) {
//       return NextResponse.json({ error: 'Missing apiResponse/formData' }, { status: 400 })
//     }

//     // ✅ plan code (prefer meta.plan.code if you send it, fallback to formData.PlanCode)
//     const planCode = Number(body?.meta?.plan?.code ?? body?.formData?.PlanCode ?? 0)

//     // ✅ fetch page-4 dynamic strings
//     const page4 = planCode
//       ? await fetchPlanFeatures(planCode)
//       : { coreBenefitItems: [], additionalFeatureItems: [], importantTerms: [] }

//     const illustrationData = mapToIllustrationData(body)

//     // ✅ inject into illustrationData so generateQuotePdf can use it on page 4
//     ;(illustrationData as any).page4 = page4

//     const pdfBuffer = await generateQuotePdf(illustrationData)

//     return new NextResponse(pdfBuffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'inline; filename="quote-illustration.pdf"',
//         'Cache-Control': 'no-store',
//       },
//     })
//   } catch (e: any) {
//     return NextResponse.json(
//       { error: 'Failed to generate PDF', details: e?.message ?? 'Unknown' },
//       { status: 500 },
//     )
//   }
// }

// ===============================================================================
// ===============================================================================
// ===============================================================================

// src/app/api/quote-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateQuotePdf } from '@/utils/pdf/generateQuotePdf'
import { mapToIllustrationData } from '@/utils/pdf/mapToIllustrationData'

export const runtime = 'nodejs' // IMPORTANT for fs + pdf-lib reliability

/* ----------------------------- product feature API ----------------------------- */
type ProductFeatureRow = {
  key_prod_feature?: string | null
  additional_feature?: string | null
  td?: string | null
  maturity_benefit?: string | null
  death_benefit?: string | null
  brocheure_link?: string | null
  note?: string | null
}

export type Page4Data = {
  coreBenefitItems: string[]
  additionalFeatureItems: string[]
  importantTerms: string[]
  maturityBenefit: string[]
  deathBenefit: string[]
  note?: string[]
  brocheureLink: string | null
}

const emptyPage4 = (): Page4Data => ({
  coreBenefitItems: [],
  additionalFeatureItems: [],
  importantTerms: [],
  maturityBenefit: [],
  deathBenefit: [],
  note: [],
  brocheureLink: null,
})

const cleanStrings = (arr: Array<string | null | undefined> | undefined) =>
  (arr ?? []).map((s) => String(s ?? '').trim()).filter((s) => s.length > 0)

async function fetchPlanFeatures(planCode: number): Promise<Page4Data> {
  if (!Number.isFinite(planCode) || planCode <= 0) return emptyPage4()

  try {
    const res = await fetch(`https://api.shantalife.com/product_feature/${planCode}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) return emptyPage4()

    const rows = (await res.json()) as ProductFeatureRow[]

    return {
      coreBenefitItems: cleanStrings(rows?.map((r) => r?.key_prod_feature)),
      additionalFeatureItems: cleanStrings(rows?.map((r) => r?.additional_feature)),
      importantTerms: cleanStrings(rows?.map((r) => r?.td)),
      maturityBenefit: cleanStrings(rows?.map((r) => r?.maturity_benefit)),
      deathBenefit: cleanStrings(rows?.map((r) => r?.death_benefit)),
      note: cleanStrings(rows?.map((r) => r?.note)),
      brocheureLink: rows?.find((r) => r?.brocheure_link)?.brocheure_link || null,
    }
  } catch {
    return emptyPage4()
  }
}

/* -------------------------- surrender_paidup API (NEW) ------------------------- */
/**
 * ⚠️ I don't know the exact response shape of this endpoint.
 * So we keep it flexible and just pass through what the API returns.
 * You will map it inside generateQuotePdf (page i===4) later.
 */
export type SurrenderPaidupResponse = any

async function fetchSurrenderPaidup(args: {
  plan_code: number
  sum_assured: number
  term: number
  payment_mode: number
}): Promise<SurrenderPaidupResponse | null> {
  try {
    const res = await fetch('https://api.shantalife.com/illustration/surrender_paidup', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })

    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/* ----------------------------------- route ----------------------------------- */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body?.apiResponse || !body?.formData) {
      return NextResponse.json({ error: 'Missing apiResponse/formData' }, { status: 400 })
    }

    // build illustration data first (your mapper creates the main structure used by PDF)
    const illustrationData = mapToIllustrationData(body) as any

    // ✅ extract inputs (prefer your mapped meta if present)
    const planCode = Number(
      illustrationData?.meta?.plan?.code ?? body?.meta?.plan?.code ?? body?.formData?.PlanCode ?? 0,
    )

    const sumAssured = Number(
      illustrationData?.formData?.SumAssured ?? body?.formData?.SumAssured ?? 0,
    )

    const term = Number(illustrationData?.meta?.term?.value ?? body?.meta?.term?.value ?? 0)

    // payment_mode is usually an id/code like 1/2/4 etc
    const paymentMode = Number(
      illustrationData?.meta?.payment?.id ??
        body?.meta?.payment?.id ??
        body?.formData?.payment_mode ??
        0,
    )

    // ✅ API #1 (page-4 strings)
    const page4 = planCode ? await fetchPlanFeatures(planCode) : emptyPage4()
    illustrationData.page4 = page4

    // ✅ API #2 (NEW) (page i===4 projected values table source)
    // Only call if we have minimum required values
    const surrenderPaidup =
      planCode && sumAssured && term && paymentMode
        ? await fetchSurrenderPaidup({
            plan_code: planCode,
            sum_assured: sumAssured,
            term,
            payment_mode: paymentMode,
          })
        : null

    // Inject so generateQuotePdf can use it (i===4 table)
    illustrationData.surrenderPaidup = surrenderPaidup

    const pdfBuffer = await generateQuotePdf(illustrationData)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="quote-illustration.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: e?.message ?? 'Unknown' },
      { status: 500 },
    )
  }
}
