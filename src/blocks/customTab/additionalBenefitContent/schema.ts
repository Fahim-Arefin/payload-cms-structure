import {
  ADDITIONAL_BENEFIT_CONTENT_BLOCK_THUMBNAIL_URL,
  ADDITIONAL_BENEFIT_CONTENT_PAGE_BLOCK_LABEL,
  ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG,
  NORMAL_TAB,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

/* ---- limits ---- */
const TITLE_MAX = 120
const SUBTITLE_MAX = 120
const HIGHLIGHT_MAX = 120
const CTA_BUTTON_TEXT_MAX = 100
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

const validateHighlightedInField =
  (
    label: string,
    targetField: 'title' | 'titleBN' | 'subtitle' | 'subtitleBN',
    max = HIGHLIGHT_MAX,
  ) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true
    if (hl.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    return target.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
  }

// RichText helpers
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

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

/* ---------- PLAN-LEVEL CTA (inside plans[] items) ---------- */
const validatePlanCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.plansButtonText) || isNonEmpty(siblingData?.plansButtonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'Plans Button Text (EN) is required when any plan CTA text is provided.'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `Plans Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  }
  return true
}

const validatePlanCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.plansButtonText) || isNonEmpty(siblingData?.plansButtonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'প্ল্যানের CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন প্ল্যানের CTA টেক্সট দেওয়া হয়।'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `প্ল্যান CTA টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  }
  return true
}

const validatePlanCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.plansButtonText) || isNonEmpty(siblingData?.plansButtonTextBN)

  let hasLink = false
  if (Array.isArray(val)) hasLink = val.length > 0
  else if (val && typeof val === 'object')
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  else hasLink = Boolean(val)

  if (hasAnyText && !hasLink) {
    return 'Plans Button Link is required when plan CTA text is provided.'
  }
  return true
}

/* ---- block ---- */
const AdditionalBenfitContent: Block = {
  slug: ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG,
  labels: {
    singular: ADDITIONAL_BENEFIT_CONTENT_PAGE_BLOCK_LABEL,
    plural: ADDITIONAL_BENEFIT_CONTENT_PAGE_BLOCK_LABEL,
  },
  admin: {
    group: NORMAL_TAB,
  },

  imageURL: ADDITIONAL_BENEFIT_CONTENT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ADDITIONAL_BENEFIT_CONTENT_PAGE_BLOCK_LABEL} preview`,

  fields: [
    // Hidden per-doc session id (keeps parity with your other blocks for media lifecycle)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ===== Items ===== */
    {
      name: 'additionalBenefits',
      type: 'array',
      label: 'Items',
      required: true,
      minRows: 1,
      maxRows: 1,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { description: 'Add one or more items (icon 1:1, EN/BN title + description).' },
      fields: [
        /* ===== Section images ===== */
        ...generateImageFields({
          fieldName: 'mobileImage',
          label: 'Mobile Image (4:3)',
          description:
            'Square image for mobile view. Aspect 4:3. Ideal PNG/JPG. Blur placeholder generated automatically.',
          aspectRatio: 4 / 3, // 1:1
          quality: 0.9,
          maxKB: 400,
          ownerCollection: ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG as any,
        } as any),
        ...generateImageFields({
          fieldName: 'desktopImage',
          label: 'Desktop Image (500×700)',
          description:
            'Portrait image for desktop view. Aspect ≈ 500:700 (~0.714). Blur placeholder generated automatically.',
          aspectRatio: 500 / 700, // ≈ 0.7142857
          quality: 0.9,
          maxKB: 700,
          ownerCollection: ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG as any,
        } as any),

        /* ===== Section heading (EN/BN) ===== */
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Title', TITLE_MAX, false),
              admin: { width: '50%', description: `Max ${TITLE_MAX} characters.` },
            },
            {
              name: 'titleBN',
              type: 'text',
              label: 'শিরোনাম (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Title (BN)', TITLE_MAX, false),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।` },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'highlightedText',
              type: 'text',
              label: 'Highlighted Text (within title)',
              required: false,
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField('Highlighted Text', 'title', HIGHLIGHT_MAX),
              admin: {
                width: '50%',
                description: `Optional. Must appear verbatim inside Title. Max ${HIGHLIGHT_MAX} chars.`,
              },
            },
            {
              name: 'highlightedTextBN',
              type: 'text',
              label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
              required: false,
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (BN)',
                'titleBN',
                HIGHLIGHT_MAX,
              ),
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। শিরোনামের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
                  HIGHLIGHT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtitle',
              required: false,
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Subtitle', SUBTITLE_MAX, false),
              admin: { width: '50%', description: `Max ${SUBTITLE_MAX} characters.` },
            },
            {
              name: 'subtitleBN',
              type: 'text',
              label: 'উপশিরোনাম (বাংলা)',
              required: false,
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, false),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।` },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'highlightedSubtitle',
              type: 'text',
              label: 'Highlighted Text (within subtitle)',
              required: false,
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Subtitle)',
                'subtitle',
                HIGHLIGHT_MAX,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must appear verbatim inside Subtitle. Max ${HIGHLIGHT_MAX} chars.`,
              },
            },
            {
              name: 'highlightedSubtitleBN',
              type: 'text',
              label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
              required: false,
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Subtitle BN)',
                'subtitleBN',
                HIGHLIGHT_MAX,
              ),
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। সাবটাইটেলের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
                  HIGHLIGHT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'All Benefit',
          minRows: 0,
          maxRows: 10,
          labels: { singular: 'Benefit', plural: 'Benefits' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'benefit',
                  type: 'text',
                  label: 'Benefit (EN)',
                  required: true,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Benefit', TITLE_MAX, true),
                  admin: { width: '50%' },
                },
                {
                  name: 'benefitBN',
                  type: 'text',
                  label: 'বেনিফিট (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Benefit (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'plansButtonText',
              type: 'text',
              label: 'Plans Button Text',
              maxLength: CTA_BUTTON_TEXT_MAX,
              // validate: validateButtonText,
              validate: validatePlanCTAEnglishText,
              admin: {
                width: '50%',
                description: `Text shown on the plan’s call-to-action button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
              },
            },
            {
              name: 'plansButtonTextBN',
              type: 'text',
              label: 'প্ল্যানস বাটনের টেক্সট (বাংলা)',
              maxLength: CTA_BUTTON_TEXT_MAX,
              // validate: validateButtonTextBN,
              validate: validatePlanCTABanglaText,
              admin: {
                width: '50%',
                description: `কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'plansButtonLink',
          label: 'Link to (internal page)',
          type: 'relationship',
          relationTo: 'pages',
          // required: true,
          validate: validatePlanCTALinkRequiredIfAnyText,
          admin: {
            description:
              'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
          },
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

export default AdditionalBenfitContent
