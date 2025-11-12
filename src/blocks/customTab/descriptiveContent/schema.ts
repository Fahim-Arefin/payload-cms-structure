import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  DESCRIPTIVE_CONTENT_BLOCK_THUMBNAIL_URL,
  DESCRIPTIVE_CONTENT_PAGE_BLOCK_LABEL,
  DESCRIPTIVE_CONTENT_SLUG_AND_TAG,
} from '@/lib/constants'

/* ---- limits ---- */
const TITLE_MAX = 100
const DESC_MAX = 5000

/* ---- validators ---- */
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

const DescriptiveContent: Block = {
  slug: DESCRIPTIVE_CONTENT_SLUG_AND_TAG,
  labels: {
    singular: DESCRIPTIVE_CONTENT_PAGE_BLOCK_LABEL,
    plural: DESCRIPTIVE_CONTENT_PAGE_BLOCK_LABEL,
  },

  imageURL: DESCRIPTIVE_CONTENT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${DESCRIPTIVE_CONTENT_PAGE_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      required: true,
      minRows: 1,
      maxRows: 24,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { description: 'Add one or more items (icon 1:1, EN/BN title + description).' },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon (1:1)',
          description: 'Square icon, PNG/SVG preferred. Blur placeholder generated automatically.',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 200,
          ownerCollection: DESCRIPTIVE_CONTENT_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title', TITLE_MAX, true),
              admin: { width: '50%', description: `Max ${TITLE_MAX} characters.` },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'শিরোনাম (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title (BN)', TITLE_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।` },
            },
          ],
        },

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
  ],
}

export default DescriptiveContent
