import {
  DETAILS_CONTENT_BLOCK_THUMBNAIL_URL,
  DETAILS_CONTENT_PAGE_BLOCK_LABEL,
  DETAILS_CONTENT_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

/* ---- limits ---- */
const DESC_MAX = 5000
const CTA_BUTTON_TEXT_MAX = 24
const URL_MAX = 300 // UPDATED: max length for external URL

/* ---- rich text helpers ---- */
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

/* ---------- CTA helpers ---------- */
const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateRootCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA Button Text (EN) is required when any CTA button text is provided.'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  }
  return true
}

const validateRootCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  }
  return true
}

/* UPDATED: strict absolute http(s) URL validator (disallow javascript:) */
const validateAbsoluteHttpUrl = (val: unknown) => {
  const s = String(val ?? '').trim()
  if (!s) return true
  if (s.length > URL_MAX) return `URL must be at most ${URL_MAX} characters.`
  try {
    const u = new URL(s)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      return 'URL must start with http:// or https://'
    }
    if (/^javascript:/i.test(s)) return 'Forbidden URL scheme.'
    return true
  } catch {
    return 'Must be a valid absolute URL (e.g., https://example.com/path).'
  }
}

/* UPDATED: link required if CTA text, accept EITHER internal relationship OR external URL */
const validateRootCTALinkRequiredIfAnyText = (_: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

  // internal link present?
  let hasInternal = false
  const v = siblingData?.buttonLink
  if (Array.isArray(v)) hasInternal = v.length > 0
  else if (v && typeof v === 'object') hasInternal = Object.keys(v).length > 0
  else hasInternal = Boolean(v)

  // external link present?
  const hasExternal = isNonEmpty(siblingData?.buttonExternalUrl)

  if (hasAnyText && !(hasInternal || hasExternal)) {
    return 'Provide either an internal Page link or an External URL when CTA text is set.'
  }
  return true
}

/* ---- block ---- */

const DetailsContent: Block = {
  slug: DETAILS_CONTENT_SLUG_AND_TAG,
  labels: {
    singular: DETAILS_CONTENT_PAGE_BLOCK_LABEL,
    plural: DETAILS_CONTENT_PAGE_BLOCK_LABEL,
  },

  imageURL: DETAILS_CONTENT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${DETAILS_CONTENT_PAGE_BLOCK_LABEL} preview`,

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

    // CTA text (localized)
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'CTA Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateRootCTAEnglishText,
          admin: {
            width: '50%',
            description: `Text shown on the call-to-action button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'buttonTextBN',
          type: 'text',
          label: 'CTA বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateRootCTABanglaText,
          admin: {
            width: '50%',
            description: `কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* UPDATED: INTERNAL link (kept as-is, so FE stays compatible) */
    {
      name: 'buttonLink',
      label: 'Link to (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      validate: validateRootCTALinkRequiredIfAnyText, // now checks either internal OR external
      admin: {
        description:
          'Pick an internal Page to link to. If you prefer an external link instead, leave this empty and fill the External URL below.',
      },
    },

    /* NEW: EXTERNAL URL */
    {
      name: 'buttonExternalUrl',
      type: 'text',
      label: 'External URL (http/https)',
      maxLength: URL_MAX,
      validate: (val: unknown, ctx: any) => {
        // still participate in "link required if any CTA text" check
        const base = validateRootCTALinkRequiredIfAnyText(val, ctx)
        if (base !== true) return base
        // independently validate URL if provided
        return validateAbsoluteHttpUrl(val)
      },
      admin: {
        description:
          'Absolute URL starting with http:// or https://. If provided, this will be used instead of the internal Page link.',
      },
    },
  ],
}

export default DetailsContent
