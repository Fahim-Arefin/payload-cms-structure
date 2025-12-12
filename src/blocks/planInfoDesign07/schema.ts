// src/payload/blocks/PlanInfoDesign03.ts
import {
  COMMON,
  PLAN_INFO_DESIGN_07_BLOCK_LABEL,
  PLAN_INFO_DESIGN_07_BLOCK_THUMBNAIL_URL,
  PLAN_INFO_DESIGN_07_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

/* ---------- limits ---------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 120
const HIGHLIGHT_MAX = 120
const SUBTITLE_MAX = 120
const DESC_MAX = 600
const VALUE_MAX = 60

/* ---------- validators (same style as before) ---------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

const validateShortText =
  (label: string, max: number, required = false) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/* ---------- rich text helpers (Lexical) ---------- */
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
    if (Array.isArray(node)) stack.push(...node)
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
    if (Array.isArray(node)) stack.push(...node)
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

/** Highlight must appear verbatim inside a target text field */
const validateHighlightedInField =
  (label: string, targetField: string, max = TITLE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

/* ---------- block ---------- */
const PlanInfoDesign07Schema: Block = {
  slug: PLAN_INFO_DESIGN_07_SLUG_AND_TAG,
  labels: {
    singular: PLAN_INFO_DESIGN_07_BLOCK_LABEL,
    plural: PLAN_INFO_DESIGN_07_BLOCK_LABEL,
  },

  admin: { group: COMMON },
  imageURL: PLAN_INFO_DESIGN_07_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PLAN_INFO_DESIGN_07_BLOCK_LABEL} preview`,

  fields: [
    // Hidden: upload session id for media lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Appearance ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#FCF4EB',
          admin: {
            width: '50%',
            description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
          },
        },
        {
          name: 'imageOrder',
          type: 'select',
          label: 'Choose Image Alignment',
          defaultValue: 'right',
          options: [
            { label: 'Show left ', value: 'left' },
            { label: 'Show right', value: 'right' },
          ],
          admin: {
            width: '50%',
            description: 'Select where the image align ',
          },
        },
      ],
    },
    /* ---------- Section Title / Subtitle (EN/BN, optional) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, false),
          admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'সেকশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, false),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
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
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HIGHLIGHT_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'titleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
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
          label: 'Section Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle', SUBTITLE_MAX, false),
          admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle (BN)', SUBTITLE_MAX, false),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
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
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Subtitle',
            'subtitle',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Subtitle. Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedSubtitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Subtitle (BN)',
            'subtitleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সাবটাইটেলের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Section Description (rich text, optional EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'richText',
          label: 'Section Description',
          validate: validateRichText('Section Description', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'সেকশন বর্ণনা (বাংলা)',
          validate: validateRichText('Section Description (BN)', {
            required: false,
            max: DESC_MAX,
          }),
          admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।` },
        },
      ],
    },

    /* ---------- Required Images ---------- */
    // 1) 630 x 700  (aspect ≈ 0.9)
    ...generateImageFields({
      fieldName: 'image',
      label: 'Image (640×500)',
      description: 'image (640×500). Required.',
      aspectRatio: 640 / 500,
      quality: 0.9,
      maxKB: 700,
      required: true,
    } as any),

    /* ---- Eligibility Items ---- */
    {
      name: 'eligibilityData',
      type: 'array',
      label: 'Eligibility Data',
      required: true,
      minRows: 1,
      maxRows: 1,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { description: 'Each item may carry its own icon and age/condition fields.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'backGroundColor',
              type: 'text',
              label: 'Background Color',
              maxLength: COLOR_HEX_LEN,
              validate: validateHexColor,
              defaultValue: '#FCF4EB',
              admin: {
                width: '50%',
                description: `Hex color in #FCF4EB. Length ${bnNum(COLOR_HEX_LEN)}.`,
              },
            },
            {
              name: 'borderColor',
              type: 'text',
              label: 'Border Color',
              maxLength: COLOR_HEX_LEN,
              validate: validateHexColor,
              defaultValue: '#FFFFFF',
              admin: {
                width: '50%',
                description: `Hex color in #FFFFFF. Length ${bnNum(COLOR_HEX_LEN)}.`,
              },
            },
          ],
        },
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon (1:1)',
          description:
            'Square icon (PNG/SVG). Blur placeholder generated automatically. Aspect 1:1.',
          aspectRatio: 1,
          quality: 0.95,
          maxKB: 300,
        } as any),

        // title
        {
          type: 'row',
          fields: [
            {
              name: 'iconTitle',
              type: 'text',
              label: 'Icon Title (EN)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Title', TITLE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'iconTitleBN',
              type: 'text',
              label: 'আইকন শিরোনাম (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Title (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        // subtitle
        {
          type: 'row',
          fields: [
            {
              name: 'iconSubtitle',
              type: 'text',
              label: 'Icon Subtitle (EN)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Subtitle', TITLE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'iconSubtitleBN',
              type: 'text',
              label: 'আইকন সাবটাইটেল (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Subtitle (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },

        /* ---- Age group ---- */
        {
          name: 'age',
          type: 'group',
          label: 'Age',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Age Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Age Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'এজ টাইটেল (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Age Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },

            // Min
            {
              type: 'row',
              fields: [
                {
                  name: 'minAgeLabel',
                  type: 'text',
                  label: 'Minimum Label (EN)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Minimum Label', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'minAgeLabelBN',
                  type: 'text',
                  label: 'সর্বনিম্ন লেবেল (বাংলা)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Minimum Label (BN)', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'minAgeValue',
                  type: 'text',
                  label: 'Minimum Age (EN digits)',
                  required: false,
                  maxLength: 4,
                  validate: validateShortText('Minimum Age', 4, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'minAgeValueBN',
                  type: 'text',
                  label: 'সর্বনিম্ন বয়স (বাংলা সংখ্যা)',
                  required: false,
                  maxLength: 8,
                  validate: validateShortText('Minimum Age (BN)', 8, false),
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'minAgeValuePeriod',
                  type: 'text',
                  label: 'Minimum Period (EN)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Minimum Period', 16, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'minAgeValuePeriodBN',
                  type: 'text',
                  label: 'সর্বনিম্ন পিরিয়ড (বাংলা)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Minimum Period (BN)', 16, false),
                  admin: { width: '50%' },
                },
              ],
            },

            // Max
            {
              type: 'row',
              fields: [
                {
                  name: 'maxAgeLabel',
                  type: 'text',
                  label: 'Maximum Label (EN)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Maximum Label', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'maxAgeLabelBN',
                  type: 'text',
                  label: 'সর্বোচ্চ লেবেল (বাংলা)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Maximum Label (BN)', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'maxAgeValue',
                  type: 'text',
                  label: 'Maximum Age (EN digits)',
                  required: false,
                  maxLength: 4,
                  validate: validateShortText('Maximum Age', 4, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'maxAgeValueBN',
                  type: 'text',
                  label: 'সর্বোচ্চ বয়স (বাংলা সংখ্যা)',
                  required: false,
                  maxLength: 8,
                  validate: validateShortText('Maximum Age (BN)', 8, false),
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'maxAgeValuePeriod',
                  type: 'text',
                  label: 'Maximum Period (EN)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Maximum Period', 16, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'maxAgeValuePeriodBN',
                  type: 'text',
                  label: 'সর্বোচ্চ পিরিয়ড (বাংলা)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Maximum Period (BN)', 16, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        /* ---- Policy Term (optional) ---- */
        {
          name: 'policyTerm',
          type: 'group',
          label: 'Policy Term',
          admin: { description: 'Optional. Example: value = "10-20 Years".' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Policy Term Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Policy Term Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value (EN)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Policy Term Value', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'valueBN',
                  type: 'text',
                  label: 'মান (বাংলা)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Policy Term Value (BN)', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        /* ---- Maturity Age (optional) ---- */
        {
          name: 'maturityAge',
          type: 'group',
          label: 'Maturity Age',
          admin: { description: 'Optional. Example: value = "25 Years".' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Maturity Age Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Maturity Age Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value (EN)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Maturity Age Value', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'valueBN',
                  type: 'text',
                  label: 'মান (বাংলা)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Maturity Age Value (BN)', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        /* ---- Physical Condition (optional) ---- */
        {
          name: 'physicalCondition',
          type: 'group',
          label: 'Physical Condition',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Value', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'valueBN',
                  type: 'text',
                  label: 'মান (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Value (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default PlanInfoDesign07Schema
