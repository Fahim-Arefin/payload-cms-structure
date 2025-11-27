import {
  STEP_CONTENT_BLOCK_THUMBNAIL_URL,
  STEP_CONTENT_PAGE_BLOCK_LABEL,
  STEP_CONTENT_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

/* ---- limits ---- */
const DESC_MAX = 5000

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
    if (Array.isArray(node)) for (const c of node) stack.push(c)
    else if (typeof node === 'object')
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
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
    if (Array.isArray(node)) for (const c of node) stack.push(c)
    else if (typeof node === 'object')
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
  }
  return count
}
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

/* ---- block ---- */

const StepContent: Block = {
  slug: STEP_CONTENT_SLUG_AND_TAG,
  labels: {
    singular: STEP_CONTENT_PAGE_BLOCK_LABEL,
    plural: STEP_CONTENT_PAGE_BLOCK_LABEL,
  },

  imageURL: STEP_CONTENT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${STEP_CONTENT_PAGE_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      required: true,
      minRows: 1,
      maxRows: 24,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { description: 'Add one or more items (description).' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              validate: validateRichText('Description', { required: true, max: DESC_MAX }),
              admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              label: 'বর্ণনা (বাংলা)',
              validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
              admin: { width: '50%', description: `প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।` },
            },
          ],
        },
      ],
    },
    {
      name: 'LargeFont',
      type: 'checkbox',
      label: 'Bigger Font',
      defaultValue: false,
      admin: {
        description: 'if true then font and content gap will be increased',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'additionalDescription',
          type: 'richText',
          label: 'Additional Description',
          validate: validateRichText('Description', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
        },
        {
          name: 'additionalDescriptionBN',
          type: 'richText',
          label: 'অতিরিক্ত বর্ণনা (বাংলা)',
          validate: validateRichText('Description (BN)', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।` },
        },
      ],
    },
  ],
}

export default StepContent
