import LayoutThumbPreview from '@/components/admin/LayoutThumbPreview'
import {
  CUSTOM_CARD_SECTION_BLOCK_LABEL,
  CUSTOM_CARD_SECTION_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

const CustomCardsThumbField: any = () => {
  return (
    <LayoutThumbPreview
      src={CUSTOM_CARD_SECTION_BLOCK_THUMBNAIL_URL}
      alt={`${CUSTOM_CARD_SECTION_BLOCK_LABEL} preview`}
    />
  )
}

export default CustomCardsThumbField
