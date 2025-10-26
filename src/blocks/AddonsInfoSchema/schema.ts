// AddonsInfoSchema
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_LABEL,
  EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_THUMBNAIL_URL,
  EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const HIGHLIGHT_MAX = 40
const INFO_TITLE_MAX = 80
const INFO_SUBTITLE_MAX = 120
const DESC_MAX = 600
const FEATURE_NAME_MAX = 60

/* ---------- basic validators (same style as before) ---------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** require highlight text to be a substring of a sibling text field */
const validateHighlightedInField =
  (label: string, targetField: string, max = HIGHLIGHT_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    return target.includes(s) ? true : `${label} must exist within ${targetField} exactly.`
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
    else if (typeof node === 'object') {
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
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
    if (Array.isArray(node)) stack.push(...node)
    else if (typeof node === 'object') {
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
    }
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

/* ---------- block ---------- */
const AddonsInfoSchema: Block = {
  slug: EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
  labels: {
    singular: EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_LABEL,
    plural: EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_LABEL,
  },
  imageURL: EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_LABEL} preview`,

  fields: [
    // hidden session id for media lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#F6EDDD',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    /* ---------- Section Title / Subtitle (all optional, EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: false,
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, false),
          admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: false,
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
            description: `Optional. Must be inside Title. Max ${HIGHLIGHT_MAX}.`,
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
            description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
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
          required: false,
          label: 'Section Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle', SUBTITLE_MAX, false),
          admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: false,
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
          required: false,
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
            description: `Optional. Must be inside Subtitle. Max ${HIGHLIGHT_MAX}.`,
          },
        },
        {
          name: 'highlightedSubtitleBN',
          type: 'text',
          required: false,
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
            description: `ঐচ্ছিক। সাবটাইটেলের মধ্যে থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
          },
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
          validate: validateRichText('Description', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'বর্ণনা (বাংলা)',
          validate: validateRichText('Description (BN)', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।` },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'imageVariant',
          type: 'select',
          label: 'Choose Image Aspect Ratio',
          defaultValue: 'wide',
          options: [
            { label: 'Show 1:1 image', value: 'square' },
            { label: 'Show 16:9 image', value: 'wide' },
          ],
          admin: {
            width: '50%',
            description: 'Select which image to display on the UI.',
          },
        },
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
            width: '50%',
            description: 'Select where the image align ',
          },
        },
      ],
    },

    /* ---------- Optional images (your generator, stamped by lifecycle) ---------- */
    ...generateImageFields({
      fieldName: 'imageSquare',
      label: 'Optional Image (1:1)',
      description: 'Square image (optional). Recommended 1:1.',
      aspectRatio: 1 / 1,
      quality: 0.92,
      maxKB: 400,
      required: true,
    } as any),
    ...generateImageFields({
      fieldName: 'imageWide',
      label: 'Optional Image (16:9)',
      description: 'Wide image (optional). Recommended 16:9.',
      aspectRatio: 16 / 9,
      quality: 0.92,
      maxKB: 600,
      required: true,
    } as any),

    /* ---------- Info title/subtitle (optional, EN/BN + highlighted) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'infoTitle',
          type: 'text',
          required: false,
          label: 'Info Title',
          maxLength: INFO_TITLE_MAX,
          validate: validateShortText('Info Title', INFO_TITLE_MAX, false),
          admin: { width: '50%', description: `Max ${INFO_TITLE_MAX} characters.` },
        },
        {
          name: 'infoTitleBN',
          type: 'text',
          required: false,
          label: 'ইনফো শিরোনাম (বাংলা)',
          maxLength: INFO_TITLE_MAX,
          validate: validateShortText('Info Title (BN)', INFO_TITLE_MAX, false),
          admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(INFO_TITLE_MAX)} অক্ষর।` },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'infoTitleHighlighted',
          type: 'text',
          required: false,
          label: 'Info Title Highlighted',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Info Title Highlighted',
            'infoTitle',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: { width: '50%', description: `Optional, must appear inside Info Title.` },
        },
        {
          name: 'infoTitleHighlightedBN',
          type: 'text',
          required: false,
          label: 'ইনফো শিরোনামের রঙিন টেক্সট (বাংলা)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Info Title Highlighted (BN)',
            'infoTitleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: { width: '50%', description: `ঐচ্ছিক, ইনফো শিরোনামের মধ্যে থাকতে হবে।` },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'infoSubtitle',
          type: 'text',
          required: false,
          label: 'Info Subtitle',
          maxLength: INFO_SUBTITLE_MAX,
          validate: validateShortText('Info Subtitle', INFO_SUBTITLE_MAX, false),
          admin: { width: '50%', description: `Max ${INFO_SUBTITLE_MAX} characters.` },
        },
        {
          name: 'infoSubtitleBN',
          type: 'text',
          required: false,
          label: 'ইনফো উপশিরোনাম (বাংলা)',
          maxLength: INFO_SUBTITLE_MAX,
          validate: validateShortText('Info Subtitle (BN)', INFO_SUBTITLE_MAX, false),
          admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(INFO_SUBTITLE_MAX)} অক্ষর।` },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'infoSubtitleHighlighted',
          type: 'text',
          required: false,
          label: 'Info Subtitle Highlighted',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Info Subtitle Highlighted',
            'infoSubtitle',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: { width: '50%', description: `Optional, must appear inside Info Subtitle.` },
        },
        {
          name: 'infoSubtitleHighlightedBN',
          type: 'text',
          required: false,
          label: 'ইনফো উপশিরোনামের রঙিন টেক্সট (বাংলা)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Info Subtitle Highlighted (BN)',
            'infoSubtitleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: { width: '50%', description: `ঐচ্ছিক, ইনফো উপশিরোনামের মধ্যে থাকতে হবে।` },
        },
      ],
    },

    /* ---------- Info description (rich text, optional, EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'infoDescription',
          type: 'richText',
          label: 'Info Description',
          validate: validateRichText('Info Description', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
        },
        {
          name: 'infoDescriptionBN',
          type: 'richText',
          label: 'ইনফো বর্ণনা (বাংলা)',
          validate: validateRichText('Info Description (BN)', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।` },
        },
      ],
    },

    /* ---------- Key Features (array) ---------- */
    {
      name: 'keyFeatures',
      type: 'array',
      label: 'Key Features',
      required: false,
      minRows: 0,
      maxRows: 10,
      admin: {
        description: 'Each feature needs an icon (required) and a name (EN/BN, required).',
      },
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [
        // icon (REQUIRED)
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon (required)',
          description: 'Square icon (1:1).',
          aspectRatio: 1 / 1,
          quality: 0.9,
          maxKB: 200,
          // If your generator supports required, add required: true inside it.
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Name',
              maxLength: FEATURE_NAME_MAX,
              validate: validateShortText('Name', FEATURE_NAME_MAX, true),
              admin: { width: '50%', description: `Max ${FEATURE_NAME_MAX} characters.` },
            },
            {
              name: 'nameBN',
              type: 'text',
              required: true,
              label: 'নাম (বাংলা)',
              maxLength: FEATURE_NAME_MAX,
              validate: validateShortText('Name (BN)', FEATURE_NAME_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(FEATURE_NAME_MAX)} অক্ষর।` },
            },
          ],
        },
      ],
    },
  ],
}

export default AddonsInfoSchema
