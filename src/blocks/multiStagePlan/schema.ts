// src/payload/blocks/MultiStagePlan.ts
import {
  MULTI_STAGE_PLAN_SLUG_AND_TAG,
  MULTI_STAGE_PLAN_BLOCK_LABEL,
  MULTI_STAGE_PLAN_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 80
const HIGHLIGHT_MAX = 40
const DESC_MAX = 300
const SHORT_MAX = 60

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHighlightedInTitle =
  (label: string, targetField: 'title' | 'titleBN', max = HIGHLIGHT_MAX) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true
    if (hl.length > max) return `${label} must be at most ${max} characters.`
    const title = (siblingData?.[targetField] ?? '').toString()
    return title.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
  }

const validateNumber =
  (label: string, { min = 0, max = 100, int = true } = {}) =>
  (val: unknown) => {
    if (val === null || val === undefined || val === '') return `${label} is required.`
    const n = Number(val)
    if (Number.isNaN(n)) return `${label} must be a number.`
    if (int && !Number.isInteger(n)) return `${label} must be an integer.`
    if (n < min || n > max) return `${label} must be between ${min} and ${max}.`
    return true
  }

/* ---------------- block ---------------- */
const MultiStagePlanSchema: Block = {
  slug: MULTI_STAGE_PLAN_SLUG_AND_TAG,
  labels: {
    singular: MULTI_STAGE_PLAN_BLOCK_LABEL,
    plural: MULTI_STAGE_PLAN_BLOCK_LABEL,
  },

  imageURL: MULTI_STAGE_PLAN_BLOCK_THUMBNAIL_URL,
  imageAltText: `${MULTI_STAGE_PLAN_BLOCK_LABEL} preview`,

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: { width: '50%', description: `Main heading. Max ${TITLE_MAX} chars.` },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'শিরোনাম (বাংলা)',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
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
          name: 'highlightedTitle',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInTitle('Highlighted Text', 'title', HIGHLIGHT_MAX),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Title. Max ${HIGHLIGHT_MAX} chars.`,
          },
        },
        {
          name: 'highlightedTitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInTitle('Highlighted Text (BN)', 'titleBN', HIGHLIGHT_MAX),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: false,
          maxLength: DESC_MAX,
          validate: validateShortText('Description', DESC_MAX, false),
          admin: { width: '50%', description: `Short description. Max ${DESC_MAX} chars.` },
        },
        {
          name: 'descriptionBN',
          type: 'text',
          label: 'বর্ণনা (বাংলা)',
          required: false,
          maxLength: DESC_MAX,
          validate: validateShortText('Description (BN)', DESC_MAX, false),
          admin: {
            width: '50%',
            description: `সংক্ষিপ্ত বর্ণনা। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'mainTitle',
          type: 'text',
          label: 'Main Title',
          required: true,
          defaultValue: 'Payout Milestones',
          maxLength: TITLE_MAX,
          validate: validateShortText('Main Title', TITLE_MAX, true),
          admin: { width: '50%', description: `Section label above stages.` },
        },
        {
          name: 'mainTitleBN',
          type: 'text',
          label: 'মেইন টাইটেল (বাংলা)',
          required: false,
          maxLength: TITLE_MAX,
          validate: validateShortText('Main Title (BN)', TITLE_MAX, false),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক বাংলা শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'secondaryTitle',
          type: 'text',
          label: 'Secondary Title (shown before plan timeline)',
          defaultValue: 'Policy Terms',
          maxLength: SHORT_MAX,
          validate: validateShortText('Secondary Title', SHORT_MAX, true),
          admin: { width: '50%' },
        },
        {
          name: 'secondaryTitleBN',
          type: 'text',
          label: 'সেকেন্ডারি শিরোনাম (বাংলা)',
          defaultValue: 'বীমার মেয়াদ',
          maxLength: SHORT_MAX,
          validate: validateShortText('Secondary Title (BN)', SHORT_MAX, true),
          admin: { width: '50%' },
        },
      ],
    },

    // Plan icon (1:1)
    ...generateImageFields({
      fieldName: 'planIcon',
      label: 'Plan Icon',
      ownerCollection: MULTI_STAGE_PLAN_SLUG_AND_TAG as any,
      aspectRatio: 1,
      q: 0.92,
      maxKB: 60,
      adminDescription:
        'Square image (1:1). Design uses about 50×50 px; larger is fine—will be resized on the frontend.',
    } as any),

    // Chart side selector
    {
      name: 'chartSide',
      type: 'select',
      label: 'Chart Side (on desktop)',
      required: true,
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description:
          'Controls which side the pie chart appears on desktop (mobile is stacked automatically).',
        width: '33%',
      },
    },

    // Stage data
    {
      name: 'stageData',
      type: 'array',
      label: 'Stages',
      minRows: 1,
      labels: { singular: 'Stage', plural: 'Stages' },
      admin: {
        description:
          'Define each stage and its percentage. The sum of all stage “value” fields must equal 100.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Stage Name',
              required: true,
              maxLength: TITLE_MAX,
              validate: validateShortText('Stage Name', TITLE_MAX, true),
              admin: { width: '50%' },
            },
            {
              name: 'nameBN',
              type: 'text',
              label: 'স্টেজ নাম (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Stage Name (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'value',
          type: 'number',
          label: 'Value (%)',
          required: true,
          min: 0,
          max: 100,
          admin: {
            step: 1,
            description: 'Percentage for this stage. Overall total across stages must be 100.',
          },
          validate: (val: unknown) => {
            const num = Number(val)
            if (Number.isNaN(num)) return 'Value must be a number.'
            if (num < 0 || num > 100) return 'Value must be between 0 and 100.'
            return true
          },
        },
      ],
      validate: (val: unknown) => {
        const arr = Array.isArray(val) ? val : []
        const sum = arr.reduce((acc, it: any) => acc + (Number(it?.value) || 0), 0)
        return Math.round(sum) === 100
          ? true
          : `Sum of all stage "value" fields must be exactly 100 (current total: ${sum}).`
      },
    },

    // Plan timeline
    {
      name: 'planData',
      type: 'array',
      label: 'Plan Timeline',
      minRows: 1,
      labels: { singular: 'Timeline Item', plural: 'Timeline Items' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'timeline',
              type: 'text',
              label: 'Timeline',
              required: true,
              maxLength: TITLE_MAX,
              validate: validateShortText('Timeline', TITLE_MAX, true),
              admin: { width: '50%', description: 'e.g., “12 YEARS”.' },
            },
            {
              name: 'timelineBN',
              type: 'text',
              label: 'টাইমলাইন (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Timeline (BN)', TITLE_MAX, false),
              admin: { width: '50%', description: 'যেমন: “১২ বছর”.' },
            },
          ],
        },
      ],
    },

    // ===== Eligibility (drives your fixed FE cards) =====
    {
      name: 'eligibility',
      type: 'group',
      label: 'Eligibility Cards',
      admin: {
        description:
          'Populates the “Entry Age” and “Maturity Age” cards. Defaults are provided for minimal input.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            // Entry Age
            {
              name: 'entryAge',
              type: 'group',
              label: 'Entry Age Card',
              admin: { width: '50%' },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  defaultValue: 'Entry Age',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Entry Age Label', SHORT_MAX, true),
                },
                {
                  name: 'labelBN',
                  type: 'text',
                  label: 'লেবেল (বাংলা)',
                  defaultValue: 'আবেদন করার বয়স',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Entry Age Label (BN)', SHORT_MAX, true),
                },

                {
                  name: 'minLabel',
                  type: 'text',
                  label: 'Minimum Label',
                  defaultValue: 'Minimum',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Minimum Label', SHORT_MAX, true),
                },
                {
                  name: 'minLabelBN',
                  type: 'text',
                  label: 'সর্বনিম্ন (বাংলা)',
                  defaultValue: 'সর্বনিম্ন',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Minimum Label (BN)', SHORT_MAX, true),
                },
                {
                  name: 'minValue',
                  type: 'number',
                  label: 'Minimum Value',
                  required: true,
                  defaultValue: 30,
                  validate: validateNumber('Minimum Value', { min: 0, max: 200, int: true }),
                },
                // ⬇️ NEW: Bangla display for minValue
                {
                  name: 'minValueBN',
                  type: 'text',
                  label: 'Minimum Value (BN)',
                  defaultValue: '৩০',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Minimum Value (BN)', SHORT_MAX, true),
                  admin: { description: 'বাংলা অংকে প্রদর্শন (UI-তে দেখানোর জন্য)।' },
                },
                {
                  name: 'minUnit',
                  type: 'text',
                  label: 'Minimum Unit',
                  defaultValue: 'Days',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Minimum Unit', SHORT_MAX, true),
                },
                {
                  name: 'minUnitBN',
                  type: 'text',
                  label: 'ইউনিট (বাংলা)',
                  defaultValue: 'দিন',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Minimum Unit (BN)', SHORT_MAX, true),
                },

                {
                  name: 'maxLabel',
                  type: 'text',
                  label: 'Maximum Label',
                  defaultValue: 'Maximum',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Maximum Label', SHORT_MAX, true),
                },
                {
                  name: 'maxLabelBN',
                  type: 'text',
                  label: 'সর্বোচ্চ (বাংলা)',
                  defaultValue: 'সর্বোচ্চ',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Maximum Label (BN)', SHORT_MAX, true),
                },
                {
                  name: 'maxValue',
                  type: 'number',
                  label: 'Maximum Value',
                  required: true,
                  defaultValue: 60,
                  validate: validateNumber('Maximum Value', { min: 0, max: 120, int: true }),
                },
                // ⬇️ NEW: Bangla display for maxValue
                {
                  name: 'maxValueBN',
                  type: 'text',
                  label: 'Maximum Value (BN)',
                  defaultValue: '৬০',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Maximum Value (BN)', SHORT_MAX, true),
                  admin: { description: 'বাংলা অংকে প্রদর্শন (UI-তে দেখানোর জন্য)।' },
                },
                {
                  name: 'maxUnit',
                  type: 'text',
                  label: 'Maximum Unit',
                  defaultValue: 'Years',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Maximum Unit', SHORT_MAX, true),
                },
                {
                  name: 'maxUnitBN',
                  type: 'text',
                  label: 'ইউনিট (বাংলা)',
                  defaultValue: 'বছর',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Maximum Unit (BN)', SHORT_MAX, true),
                },
              ],
            },

            // Maturity Age
            {
              name: 'maturityAge',
              type: 'group',
              label: 'Maturity Age Card',
              admin: { width: '50%' },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  defaultValue: 'Maturity Age',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Maturity Age Label', SHORT_MAX, true),
                },
                {
                  name: 'labelBN',
                  type: 'text',
                  label: 'লেবেল (বাংলা)',
                  defaultValue: 'পলিসি মেয়াদপূর্তিতে বয়স',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Maturity Age Label (BN)', SHORT_MAX, true),
                },

                {
                  name: 'uptoLabel',
                  type: 'text',
                  label: 'Upto Label',
                  defaultValue: 'Upto',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Upto Label', SHORT_MAX, true),
                },
                {
                  name: 'uptoLabelBN',
                  type: 'text',
                  label: 'সর্বোচ্চ (বাংলা)',
                  defaultValue: 'সর্বোচ্চ',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Upto Label (BN)', SHORT_MAX, true),
                },

                {
                  name: 'uptoValue',
                  type: 'number',
                  label: 'Upto Value',
                  required: true,
                  defaultValue: 70,
                  validate: validateNumber('Upto Value', { min: 0, max: 120, int: true }),
                },
                // ⬇️ NEW: Bangla display for uptoValue
                {
                  name: 'uptoValueBN',
                  type: 'text',
                  label: 'Upto Value (BN)',
                  defaultValue: '৭০',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Upto Value (BN)', SHORT_MAX, true),
                  admin: { description: 'বাংলা অংকে প্রদর্শন (UI-তে দেখানোর জন্য)।' },
                },
                {
                  name: 'uptoUnit',
                  type: 'text',
                  label: 'Unit',
                  defaultValue: 'Years',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Upto Unit', SHORT_MAX, true),
                },
                {
                  name: 'uptoUnitBN',
                  type: 'text',
                  label: 'ইউনিট (বাংলা)',
                  defaultValue: 'বছর',
                  maxLength: SHORT_MAX,
                  validate: validateShortText('Upto Unit (BN)', SHORT_MAX, true),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default MultiStagePlanSchema
