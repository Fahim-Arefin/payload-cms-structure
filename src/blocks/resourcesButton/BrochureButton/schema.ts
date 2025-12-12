// src/payload/blocks/BrochureButton.ts
import {
  BROCHURE_BUTTON_BLOCK_LABEL,
  BROCHURE_BUTTON_BLOCK_THUMBNAIL_URL,
  BROCHURE_BUTTON_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const LABEL_MAX = 60
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const BrochureButtonSchema: Block = {
  slug: BROCHURE_BUTTON_SLUG_AND_TAG,
  labels: { singular: BROCHURE_BUTTON_BLOCK_LABEL, plural: BROCHURE_BUTTON_BLOCK_LABEL },
  imageURL: BROCHURE_BUTTON_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BROCHURE_BUTTON_BLOCK_LABEL} preview`,
  fields: [
    {
      name: 'brochurePDF',
      label: 'Brochure PDF',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Upload/select the brochure PDF.' },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Download Brochure',
          maxLength: LABEL_MAX,
          validate: validateShortText('Button Label', LABEL_MAX, true),
          admin: { width: '50%', description: `Max ${LABEL_MAX} characters.` },
        },
        {
          name: 'labelBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা)',
          defaultValue: 'ডাউনলোড ব্রোশিউর',
          maxLength: LABEL_MAX,
          validate: validateShortText('Button Label (BN)', LABEL_MAX, true),
          admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।` },
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: 'Button Style',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      defaultValue: 'primary',
    },
  ],
}

export default BrochureButtonSchema
