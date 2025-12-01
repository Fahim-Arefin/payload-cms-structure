// src/payload/blocks/CareerOpening.ts
import type { Block } from 'payload'
import {
  CAREER_PAGE_OPENINGS_SLUG_AND_TAG,
  CAREER_PAGE_OPENINGS_BLOCK_LABEL,
  CAREER_PAGE_OPENINGS_BLOCK_THUMBNAIL_URL,
  CAREER_PAGE,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'

/* ---------------- limits ---------------- */
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const TYPE_MAX = 40
const CARD_TITLE_MAX = 80
const DESC_MAX = 300
const BTN_TEXT_MAX = 24
const DETAILS_TITLE_MAX = 80
const LOCATION_MAX = 60
const SUBJECT_MAX = 120
const FOOTER_MAX = 200
const FILENAME_MAX = 80

/* ---------------- validators ---------------- */

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateEmail = (val: unknown) => {
  const s = (val ?? '').toString().trim()
  if (!s) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? true : 'Provide a valid email address.'
}

/* ---------------- rich text defaults (Lexical) ---------------- */

const CONSENT_EN_DEFAULT: any = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        direction: 'ltr',
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'By clicking Send Feedback, you agree to our terms and conditions and privacy policy.',
            version: 1,
          },
        ],
      },
    ],
  },
}

const CONSENT_BN_DEFAULT: any = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        direction: 'ltr',
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'এখানে ক্লিক করার মাধ্যমে, আপনি আমাদের টার্মস এন্ড কন্ডিশনস , ও প্রাইভেসি পলিসিতে সম্মত করছেন।',
            version: 1,
          },
        ],
      },
    ],
  },
}

/* ---------------- block ---------------- */

const CareerOpeningSchema: Block = {
  slug: CAREER_PAGE_OPENINGS_SLUG_AND_TAG,
  labels: {
    singular: CAREER_PAGE_OPENINGS_BLOCK_LABEL,
    plural: CAREER_PAGE_OPENINGS_BLOCK_LABEL,
  },
  admin: {
    group: CAREER_PAGE,
  },

  imageURL: CAREER_PAGE_OPENINGS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CAREER_PAGE_OPENINGS_BLOCK_LABEL} preview`,

  fields: [
    // Header (EN/BN)
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
          admin: {
            width: '50%',
            description: `Primary heading. Max ${TITLE_MAX} (${bnNum(TITLE_MAX)}) characters.`,
          },
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
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          required: true,
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Supporting line. Max ${SUBTITLE_MAX} (${bnNum(
              SUBTITLE_MAX,
            )}) characters.`,
          },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          label: 'উপশিরোনাম (বাংলা)',
          required: true,
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Cards ---------- */
    {
      name: 'cards',
      type: 'array',
      label: 'Opening Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      required: true,
      minRows: 2,
      admin: {
        description: 'Add one or more opening cards with details.',
      },
      fields: [
        // Type (like Full-time / Internship)
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'text',
              label: 'Type',
              maxLength: TYPE_MAX,
              validate: validateShortText('Type', TYPE_MAX, true),
              admin: {
                width: '50%',
                description: `e.g., Full-time, Contract, Internship. Max ${TYPE_MAX} characters.`,
              },
            },
            {
              name: 'typeBN',
              type: 'text',
              label: 'ধরন (বাংলা)',
              maxLength: TYPE_MAX,
              validate: validateShortText('Type (BN)', TYPE_MAX, true),
              admin: {
                width: '50%',
                description: `যেমন: ফুল-টাইম, কন্ট্রাক্ট, ইন্টার্নশিপ। সর্বোচ্চ ${bnNum(
                  TYPE_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        // Title + Description (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Card Title',
              required: true,
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Job title. Max ${CARD_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              label: 'কার্ড শিরোনাম (বাংলা)',
              required: true,
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `পদের নাম। সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Short Description',
              required: true,
              maxLength: DESC_MAX,
              validate: validateShortText('Short Description', DESC_MAX, true),
              admin: {
                width: '50%',
                description: `1–2 lines summary. Max ${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'textarea',
              label: 'সংক্ষিপ্ত বর্ণনা (বাংলা)',
              required: true,
              maxLength: DESC_MAX,
              validate: validateShortText('Short Description (BN)', DESC_MAX, true),
              admin: {
                width: '50%',
                description: `১–২ লাইনের সারমর্ম। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Buttons (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'btnText',
              type: 'text',
              label: 'Apply Button Text',
              maxLength: BTN_TEXT_MAX,
              validate: validateShortText('Apply Button Text', BTN_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `Main CTA (e.g., Apply Now). Max ${BTN_TEXT_MAX} chars.`,
              },
            },
            {
              name: 'btnTextBN',
              type: 'text',
              label: 'বাটন টেক্সট (বাংলা)',
              maxLength: BTN_TEXT_MAX,
              validate: validateShortText('Apply Button Text (BN)', BTN_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `প্রধান CTA (যেমন, এখন আবেদন করুন)। সর্বোচ্চ ${bnNum(
                  BTN_TEXT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'detailsBtnText',
              type: 'text',
              label: 'Details Button Text',
              maxLength: BTN_TEXT_MAX,
              validate: validateShortText('Details Button Text', BTN_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `Secondary CTA (e.g., View Details). Max ${BTN_TEXT_MAX} chars.`,
              },
            },
            {
              name: 'detailsBtnTextBN',
              type: 'text',
              label: 'ডিটেইলস বাটন টেক্সট (বাংলা)',
              maxLength: BTN_TEXT_MAX,
              validate: validateShortText('Details Button Text (BN)', BTN_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `সেকেন্ডারি CTA (যেমন, বিস্তারিত দেখুন)। সর্বোচ্চ ${bnNum(
                  BTN_TEXT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        /* ---- Details (single group instead of array) ---- */
        {
          name: 'details',
          type: 'group',
          label: 'Details',
          admin: {
            description:
              'Single details object for this opening (overview text, responsibilities, requirements, etc.).',
          },
          fields: [
            // Top Title (EN / BN) - richText
            {
              type: 'row',
              fields: [
                {
                  name: 'topTitle',
                  type: 'richText',
                  label: 'Top Title',
                  admin: {
                    width: '50%',
                    description: 'Intro heading above details (rich text, English).',
                  },
                },
                {
                  name: 'topTitleBN',
                  type: 'richText',
                  label: 'টপ শিরোনাম (বাংলা)',
                  admin: {
                    width: '50%',
                    description: 'ডিটেইলস-এর উপরে ইন্ট্রো শিরোনাম (রিচ টেক্সট, বাংলা)।',
                  },
                },
              ],
            },

            // Top Description (EN / BN, richText)
            {
              type: 'row',
              fields: [
                {
                  name: 'topDescription',
                  type: 'richText',
                  label: 'Top Description',
                  admin: {
                    width: '50%',
                    description: 'Intro rich text above responsibilities/requirements.',
                  },
                },
                {
                  name: 'topDescriptionBN',
                  type: 'richText',
                  label: 'টপ বর্ণনা (বাংলা)',
                  admin: {
                    width: '50%',
                    description: 'বিস্তারিতের আগে ইন্ট্রো বর্ণনা (রিচ টেক্সট)।',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                // Details Title (plain text, EN)
                {
                  name: 'title',
                  type: 'text',
                  label: 'Details Title',
                  required: true,
                  maxLength: DETAILS_TITLE_MAX,
                  validate: validateShortText('Details Title', DETAILS_TITLE_MAX, true),
                  admin: {
                    description: `Section title (e.g., “Role Overview”). Max ${DETAILS_TITLE_MAX} characters.`,
                  },
                },

                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: true,
                  maxLength: DETAILS_TITLE_MAX,
                  validate: validateShortText('Details Title (BN)', DETAILS_TITLE_MAX, true),
                  admin: {
                    width: '50%',
                    description: `পদের নাম। সর্বোচ্চ ${bnNum(DETAILS_TITLE_MAX)} অক্ষর।`,
                  },
                },
              ],
            },

            // Responsibilities EN / BN
            {
              type: 'row',
              fields: [
                {
                  name: 'responsibilities',
                  type: 'richText',
                  label: 'Responsibilities',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Key responsibilities for this role (English).',
                  },
                },
                {
                  name: 'responsibilitiesBN',
                  type: 'richText',
                  label: 'দায়িত্বসমূহ (বাংলা)',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'এই পদের মূল দায়িত্বসমূহ (বাংলা)।',
                  },
                },
              ],
            },

            // Requirements EN / BN
            {
              type: 'row',
              fields: [
                {
                  name: 'requirements',
                  type: 'richText',
                  label: 'Requirements',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Job requirements / qualifications (English).',
                  },
                },
                {
                  name: 'requirementsBN',
                  type: 'richText',
                  label: 'যোগ্যতা ও শর্তাবলি (বাংলা)',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'পদের জন্য প্রয়োজনীয় যোগ্যতা ও শর্তাবলি (বাংলা)।',
                  },
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  label: 'Location',
                  maxLength: LOCATION_MAX,
                  validate: validateShortText('Location', LOCATION_MAX, true),
                  admin: {
                    width: '33%',
                    description: `City/Office. Max ${LOCATION_MAX} characters.`,
                  },
                },
                {
                  name: 'locationBN',
                  type: 'text',
                  label: 'অবস্থান (বাংলা)',
                  maxLength: LOCATION_MAX,
                  validate: validateShortText('Location (BN)', LOCATION_MAX, true),
                  admin: {
                    width: '33%',
                    description: `শহর/অফিসের নাম। সর্বোচ্চ ${bnNum(LOCATION_MAX)} অক্ষর।`,
                  },
                },
                {
                  name: 'deadline',
                  type: 'date',
                  label: 'Application Deadline',
                  admin: { width: '34%' },
                  required: true,
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'applyEmail',
                  type: 'text',
                  label: 'Apply Email',
                  required: true,
                  validate: validateEmail,
                  admin: {
                    width: '50%',
                    description: 'Email to receive applications.',
                  },
                },
                {
                  name: 'subjectLine',
                  type: 'text',
                  label: 'Email Subject Line',
                  maxLength: SUBJECT_MAX,
                  validate: validateShortText('Email Subject Line', SUBJECT_MAX, false),
                  admin: {
                    width: '50%',
                    description: `Optional. Max ${SUBJECT_MAX} characters.`,
                  },
                },
              ],
            },

            {
              name: 'footer',
              type: 'text',
              label: 'Footer Note',
              maxLength: FOOTER_MAX,
              validate: validateShortText('Footer Note', FOOTER_MAX, false),
              admin: {
                description: `Optional closing note. Max ${FOOTER_MAX} characters.`,
              },
            },
            {
              name: 'filename',
              type: 'text',
              label: 'Attachment Filename',
              maxLength: FILENAME_MAX,
              validate: validateShortText('Attachment Filename', FILENAME_MAX, false),
              admin: {
                description:
                  'Optional. Example: it-project-manager.pdf — this should match the name of the PDF users will download.',
              },
            },
          ],
        },
      ],
    },

    /* ---------- Career Opening Form (consent) ---------- */
    {
      name: 'careerOpeningForm',
      type: 'group',
      label: 'Career Opening Form', // header in admin
      admin: {
        description: 'Consent text shown with the application form CTA.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'consentText',
              type: 'richText',
              label: 'Consent Text (EN)',
              defaultValue: CONSENT_EN_DEFAULT,
              admin: {
                width: '50%',
                description: 'Default can be edited. Appears near the Apply/Submit action.',
              },
            },
            {
              name: 'consentTextBN',
              type: 'richText',
              label: 'কনসেন্ট টেক্সট (বাংলা)',
              defaultValue: CONSENT_BN_DEFAULT,
              admin: {
                width: '50%',
                description:
                  'ডিফল্ট লেখা প্রয়োজনমতো পরিবর্তন করতে পারেন। এটি Apply/Submit বাটনের পাশে দেখাবে।',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CareerOpeningSchema
