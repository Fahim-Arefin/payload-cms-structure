// src/payload/blocks/BrochureButton.ts
import {
  CALCULATOR_MODAL_BLOCK_LABEL,
  CALCULATOR_MODAL_BLOCK_THUMBNAIL_URL,
  CALCULATOR_MODAL_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

const LABEL_MAX = 60
const DESC_MAX = 400

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

function lexicalHasRealText(root: any): boolean {
  if (!root) return false
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
      if (stripped.length > 0) return true
    }
    if (Array.isArray(node)) {
      for (const c of node) stack.push(c)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push((node as any)[k])
      }
    }
  }
  return false
}

function lexicalCharCount(root: any): number {
  let count = 0
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      count += node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').length
    }
    if (Array.isArray(node)) {
      for (const c of node) stack.push(c)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push((node as any)[k])
      }
    }
  }
  return count
}

/** Single source-of-truth validator for richText fields (handles required + max) */
const validateRichText =
  (label: string, { required, max }: { required: boolean; max: number }) =>
  (val: unknown) => {
    const root = (val as any)?.root ?? val
    if (required && !lexicalHasRealText(root)) return `${label} is required.`
    if (!root) return true
    const chars = lexicalCharCount(root)
    if (max && chars > max) return `${label} must be at most ${max} characters.`
    return true
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
    {
      name: 'premiumCalculatorForm',
      type: 'group',
      label: 'Premium Calculater Form',
      admin: {
        description: 'Consent line shown under the premium calculator form submit/CTA.',
      },
      fields: [
        {
          name: 'consentText',
          type: 'richText',
          label: 'Consent Text (EN)',
          validate: validateRichText('Description', { required: true, max: DESC_MAX }),
        },
        {
          name: 'consentTextBN',
          type: 'richText',
          label: 'Consent Text (BN)',
          validate: validateRichText('Description', { required: true, max: DESC_MAX }),
        },
      ],
    },
  ],
}

export default CalculatorModalSchema
