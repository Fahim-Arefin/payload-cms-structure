import {
  ELIGIBILITY_CONTENT_BLOCK_THUMBNAIL_URL,
  ELIGIBILITY_CONTENT_PAGE_BLOCK_LABEL,
  ELIGIBILITY_CONTENT_SLUG_AND_TAG,
  NORMAL_TAB,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

/* ---------------- limits ---------------- */
const TITLE_MAX = 120
const VALUE_MAX = 60
const COLOR_HEX_LEN = 7

/* ---------------- validators ---------------- */
const validateHexColor = (val: unknown) => {
  const s = String(val ?? '').trim()
  if (!s) return true
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

/* ---------------- block ---------------- */
const EligibilityContentSchema: Block = {
  slug: ELIGIBILITY_CONTENT_SLUG_AND_TAG,
  labels: {
    singular: ELIGIBILITY_CONTENT_PAGE_BLOCK_LABEL,
    plural: ELIGIBILITY_CONTENT_PAGE_BLOCK_LABEL,
  },
  admin: {
    group: NORMAL_TAB,
  },
  imageURL: ELIGIBILITY_CONTENT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ELIGIBILITY_CONTENT_PAGE_BLOCK_LABEL} preview`,

  fields: [
    // Hidden per-doc session id (used by media lifecycle)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---- Eligibility Items ---- */
    {
      name: 'eligibilityData',
      type: 'array',
      label: 'Eligibility Data',
      required: true,
      minRows: 1,
      maxRows: 6,
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
          ownerCollection: ELIGIBILITY_CONTENT_SLUG_AND_TAG as any,
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

export default EligibilityContentSchema
