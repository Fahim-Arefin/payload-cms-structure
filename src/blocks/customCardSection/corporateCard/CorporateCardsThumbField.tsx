// src/payload/admin/components/CorporateCardsThumbField.tsx
import LayoutThumbPreview from '@/components/admin/LayoutThumbPreview'
import {
  CORPORATE_PAGE_CARDS_BLOCK_LABEL,
  CORPORATE_PAGE_CARDS_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

const CorporateCardsThumbField: any = () => {
  return (
    <LayoutThumbPreview
      src={CORPORATE_PAGE_CARDS_BLOCK_THUMBNAIL_URL}
      alt={`${CORPORATE_PAGE_CARDS_BLOCK_LABEL} preview`}
    />
  )
}

export default CorporateCardsThumbField
