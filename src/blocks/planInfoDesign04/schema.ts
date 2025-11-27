// src/payload/blocks/PlanInfoDesign03.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  COMMON,
  PLAN_INFO_DESIGN_04_BLOCK_LABEL,
  PLAN_INFO_DESIGN_04_BLOCK_THUMBNAIL_URL,
  PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'
import BrochureButtonSchema from '../resourcesButton/BrochureButton/schema'
import LinkButtonSchema from '../resourcesButton/LinkButton/schema'

/* ---------- limits ---------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HIGHLIGHT_MAX = 80
const SUBTITLE_MAX = 120
const DESC_MAX = 600
const CARD_TITLE_MAX = 60
const CARD_SUBTITLE_MAX = 120
const ITEM_DESC_MAX = 200

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

// add this helper (near your other validators)
const validateHexColorOrAlpha = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  // #RRGGBB  OR  #RRGGBBAA
  return /^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{8})$/.test(s)
    ? true
    : 'Must be #RRGGBB or #RRGGBBAA (e.g., #FFFFFF or #FFFFFF20).'
}

/* ---------- block ---------- */
const PlanInfoDesign04Schema: Block = {
  slug: PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
  labels: {
    singular: PLAN_INFO_DESIGN_04_BLOCK_LABEL,
    plural: PLAN_INFO_DESIGN_04_BLOCK_LABEL,
  },
  admin: { group: COMMON },
  imageURL: PLAN_INFO_DESIGN_04_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PLAN_INFO_DESIGN_04_BLOCK_LABEL} preview`,

  fields: [
    // Hidden: upload session id for media lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Appearance ---------- */
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FFFFFF',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
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
      fieldName: 'imageTall',
      label: 'Image Tall (630×700)',
      description: 'Tall image (630×700, aspect ≈ 0.9). Required.',
      aspectRatio: 630 / 700,
      quality: 0.9,
      maxKB: 700,
      required: true,
    } as any),

    // 2) 500 x 370 (aspect ≈ 1.351)
    ...generateImageFields({
      fieldName: 'imageWide',
      label: 'Image Wide (500×370)',
      description: 'Wide image (500×370, aspect ≈ 1.351). Required.',
      aspectRatio: 500 / 370,
      quality: 0.9,
      maxKB: 600,
      required: true,
    } as any),

    /* ---------- Which image to show on Desktop & Mobile ---------- */
    // Select which of the above two should render on desktop and on mobile.
    {
      type: 'row',
      fields: [
        {
          name: 'imageOrder',
          type: 'select',
          label: 'Choose Image Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Show left ', value: 'left' },
            { label: 'Show right', value: 'right' },
          ],
          admin: {
            width: '33%',
            description: 'Select where the image align ',
          },
        },
        {
          name: 'desktopImageChoice',
          type: 'select',
          label: 'Desktop Image',
          defaultValue: 'tall',
          options: [
            { label: 'Use 630×700 (tall)', value: 'tall' },
            { label: 'Use 500×370 (wide)', value: 'wide' },
          ],
          admin: { width: '33%', description: 'Which image to display on desktop layouts.' },
        },
        {
          name: 'mobileImageChoice',
          type: 'select',
          label: 'Mobile Image',
          defaultValue: 'wide',
          options: [
            { label: 'Use 630×700 (tall)', value: 'tall' },
            { label: 'Use 500×370 (wide)', value: 'wide' },
          ],
          admin: { width: '33%', description: 'Which image to display on mobile layouts.' },
        },
      ],
    },
    /* ---------- Circular Infographic Data (EN/BN) ---------- */
    {
      name: 'circleInfo',
      type: 'group',
      label: 'Circular Infographic Data',
      admin: {
        description: 'Texts shown around the orange circle and in the center.',
      },
      fields: [
        // Center (inside circle)
        {
          type: 'row',
          fields: [
            {
              name: 'centerTitle',
              type: 'text',
              label: 'Center Title',
              maxLength: TITLE_MAX,
              validate: validateShortText('Center Title', TITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “Minimum Coverage” (max ${TITLE_MAX}).` },
              defaultValue: 'Minimum Coverage',
            },
            {
              name: 'centerTitleBN',
              type: 'text',
              label: 'সেন্টার শিরোনাম (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Center Title (BN)', TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “ন্যূনতম কভারেজ” (সর্বোচ্চ ${bnNum(TITLE_MAX)}).`,
              },
              defaultValue: 'ন্যূনতম কভারেজ',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'centerValue',
              type: 'text',
              label: 'Center Value',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Center Value', SUBTITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “BDT 100,000” (max ${SUBTITLE_MAX}).` },
              defaultValue: 'BDT 100,000',
            },
            {
              name: 'centerValueBN',
              type: 'text',
              label: 'সেন্টার ভ্যালু (বাংলা)',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Center Value (BN)', SUBTITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “বিডিটি ১,০০,০০০” (সর্বোচ্চ ${bnNum(SUBTITLE_MAX)}).`,
              },
              defaultValue: 'বিডিটি ১,০০,০০০',
            },
          ],
        },

        // Top-left: Age At Entry
        {
          type: 'row',
          fields: [
            {
              name: 'topLeftLabel',
              type: 'text',
              label: 'Top Left — Label',
              maxLength: TITLE_MAX,
              validate: validateShortText('Age At Entry Label', TITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “Age At Entry” (max ${TITLE_MAX}).` },
              defaultValue: 'Age At Entry',
            },
            {
              name: 'topLeftLabelBN',
              type: 'text',
              label: 'উপরে বাম দিকের — লেবেল (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Age At Entry Label (BN)', TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “ভর্তির বয়স” (সর্বোচ্চ ${bnNum(TITLE_MAX)}).`,
              },
              defaultValue: 'ভর্তির বয়স',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'topLeftValue',
              type: 'text',
              label: 'Top Left — Value',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Age At Entry Value', SUBTITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “18 - 60 Years” (max ${SUBTITLE_MAX}).` },
              defaultValue: '18 - 60 Years',
            },
            {
              name: 'topLeftValueBN',
              type: 'text',
              label: 'উপরে বাম দিকের — ভ্যালু (বাংলা)',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Age At Entry Value (BN)', SUBTITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “১৮ - ৬০ বছর” (সর্বোচ্চ ${bnNum(SUBTITLE_MAX)}).`,
              },
              defaultValue: '১৮ - ৬০ বছর',
            },
          ],
        },

        // Top-right: Policy Term
        {
          type: 'row',
          fields: [
            {
              name: 'topRightLabel',
              type: 'text',
              label: 'Top Right — Label',
              maxLength: TITLE_MAX,
              validate: validateShortText('Policy Term Label', TITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “Policy Term” (max ${TITLE_MAX}).` },
              defaultValue: 'Policy Term',
            },
            {
              name: 'topRightLabelBN',
              type: 'text',
              label: 'উপরে ডান দিকের — লেবেল (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Policy Term Label (BN)', TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “পলিসির মেয়াদ” (সর্বোচ্চ ${bnNum(TITLE_MAX)}).`,
              },
              defaultValue: 'পলিসির মেয়াদ',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'topRightValue',
              type: 'text',
              label: 'Top Right — Value',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Policy Term Value', SUBTITLE_MAX, false),
              admin: {
                width: '50%',
                description: `e.g., “Same As Your Basic Plan” (max ${SUBTITLE_MAX}).`,
              },
              defaultValue: 'Same As Your Basic Plan',
            },
            {
              name: 'topRightValueBN',
              type: 'text',
              label: 'উপরে ডান দিকের — ভ্যালু (বাংলা)',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Policy Term Value (BN)', SUBTITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “আপনার বেসিক প্ল্যানের সমান” (সর্বোচ্চ ${bnNum(SUBTITLE_MAX)}).`,
              },
              defaultValue: 'আপনার বেসিক প্ল্যানের সমান',
            },
          ],
        },

        // Bottom-left: Maximum Coverage
        {
          type: 'row',
          fields: [
            {
              name: 'bottomLeftLabel',
              type: 'text',
              label: 'Bottom Left — Label',
              maxLength: TITLE_MAX,
              validate: validateShortText('Maximum Coverage Label', TITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “Maximum Coverage” (max ${TITLE_MAX}).` },
              defaultValue: 'Maximum Coverage',
            },
            {
              name: 'bottomLeftLabelBN',
              type: 'text',
              label: 'নিচে বাম দিকের — লেবেল (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Maximum Coverage Label (BN)', TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “সর্বোচ্চ কভারেজ” (সর্বোচ্চ ${bnNum(TITLE_MAX)}).`,
              },
              defaultValue: 'সর্বোচ্চ কভারেজ',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bottomLefValue',
              type: 'text',
              label: 'Bottom Left — Value',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Maximum Coverage Value', SUBTITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “BDT 5,000,000” (max ${SUBTITLE_MAX}).` },
              defaultValue: 'BDT 5,000,000',
            },
            {
              name: 'bottomLefValueBN',
              type: 'text',
              label: 'নিচে বাম দিকের — ভ্যালু (বাংলা)',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Maximum Coverage Value (BN)', SUBTITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “বিডিটি ৫০,০০,০০০” (সর্বোচ্চ ${bnNum(SUBTITLE_MAX)}).`,
              },
              defaultValue: 'বিডিটি ৫০,০০,০০০',
            },
          ],
        },

        // Bottom-right: Premium Rate
        {
          type: 'row',
          fields: [
            {
              name: 'bottomRightLabel',
              type: 'text',
              label: 'Bottom Right — Label',
              maxLength: TITLE_MAX,
              validate: validateShortText('Premium Rate Label', TITLE_MAX, false),
              admin: { width: '50%', description: `e.g., “Premium Rate” (max ${TITLE_MAX}).` },
              defaultValue: 'Premium Rate',
            },
            {
              name: 'bottomRightLabelBN',
              type: 'text',
              label: 'নিচে ডান দিকের — লেবেল (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Premium Rate Label (BN)', TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “প্রিমিয়াম হার” (সর্বোচ্চ ${bnNum(TITLE_MAX)}).`,
              },
              defaultValue: 'প্রিমিয়াম হার',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bottomRightValue',
              type: 'text',
              label: 'Bottom Right — Value',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Premium Rate Value', SUBTITLE_MAX, false),
              admin: {
                width: '50%',
                description: `e.g., “Affordable Extensive Protection!” (max ${SUBTITLE_MAX}).`,
              },
              defaultValue: 'Affordable Extensive Protection!',
            },
            {
              name: 'bottomRightValueBN',
              type: 'text',
              label: 'নিচে ডান দিকের — ভ্যালু (বাংলা)',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Premium Rate Value (BN)', SUBTITLE_MAX, false),
              admin: {
                width: '50%',
                description: `যেমন: “সাশ্রয়ী, বিস্তৃত সুরক্ষা!” (সর্বোচ্চ ${bnNum(SUBTITLE_MAX)}).`,
              },
              defaultValue: 'সাশ্রয়ী, বিস্তৃত সুরক্ষা!',
            },
          ],
        },
      ],
    },

    // CTA Buttons Block Layout (outside of hero items)
    {
      name: 'resourceButtons',
      type: 'blocks',
      label: 'Resources Button',
      admin: {
        description: 'Add resource buttons that appear below the content (maximum 3 buttons)',
      },
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      minRows: 1,
      maxRows: 3,
      blocks: [BrochureButtonSchema, LinkButtonSchema],
    },
  ],
}

export default PlanInfoDesign04Schema
