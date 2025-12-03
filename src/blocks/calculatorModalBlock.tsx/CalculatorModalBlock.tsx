'use client'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import PremiumCalculatorModal from '@/components/custom/shared/PremiumCalculatorModal'
import { CALCULATOR_MODAL_SLUG_AND_TAG } from '@/lib/constants'
import { CustomTabBlockType } from '@/types/payloadCustomTypes'

// Narrow the union to the brochure-button block type
type CalculatorModalType = Extract<
  NonNullable<CustomTabBlockType['resourceButtons']>[number],
  { blockType: typeof CALCULATOR_MODAL_SLUG_AND_TAG }
>

type Props = {
  data: CalculatorModalType
}

function CalculatorModalBlock({ data }: Props) {
  return (
    <PremiumCalculatorModal
      consentEn={data?.premiumCalculatorForm?.consentText}
      consentBn={data?.premiumCalculatorForm?.consentTextBN}
    >
      <GlobalButton
        variant={data?.style ?? 'primary'}
        text=""
        size="medium"
        className={`${
          data?.style === 'outline' &&
          'text-[#9C8639] border-[#9C8639] hover:text-[#d65a1a] hover:border-[#d65a1a] transition-colors'
        }`}
      >
        <LocalizedString en={data.label} bn={data.labelBN} />
      </GlobalButton>
    </PremiumCalculatorModal>
  )
}

export default CalculatorModalBlock
