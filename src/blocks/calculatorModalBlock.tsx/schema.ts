// src/payload/blocks/BrochureButton.ts
import {
  CALCULATOR_MODAL_BLOCK_LABEL,
  CALCULATOR_MODAL_BLOCK_THUMBNAIL_URL,
  CALCULATOR_MODAL_SLUG_AND_TAG,
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

const CalculatorModalSchema: Block = {
  slug: CALCULATOR_MODAL_SLUG_AND_TAG,
  labels: { singular: CALCULATOR_MODAL_BLOCK_LABEL, plural: CALCULATOR_MODAL_BLOCK_LABEL },
  imageURL: CALCULATOR_MODAL_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CALCULATOR_MODAL_BLOCK_LABEL} preview`,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Calculate Premium',
          maxLength: LABEL_MAX,
          validate: validateShortText('Button Label', LABEL_MAX, true),
          admin: { width: '50%', description: `Max ${LABEL_MAX} characters.` },
        },
        {
          name: 'labelBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা)',
          defaultValue: 'প্রিমিয়াম ক্যালকুলেট',
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
        { label: 'Outline', value: 'outline' },
      ],
      defaultValue: 'primary',
    },
  ],
}

export default CalculatorModalSchema
