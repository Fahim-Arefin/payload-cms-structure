// src/payload/blocks/CareerResources.ts
import type { Block } from 'payload'
import {
  CAREER_PAGE_RESOURCES_SLUG_AND_TAG,
  CAREER_PAGE_RESOURCES_BLOCK_LABEL,
  CAREER_PAGE_RESOURCES_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const HILITE_MAX = 40
const CARD_TITLE_MAX = 60
const CARD_DESC_MAX = 1000
const DESIGNATION_MAX = 60

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHighlightedInSubtitle = (val: unknown, { siblingData }: any) => {
  const s = (val ?? '').toString().trim()
  if (!s) return true // optional
  if (s.length > HILITE_MAX) return `Highlighted Text must be at most ${HILITE_MAX} characters.`
  const target = (siblingData?.subTitle ?? '').toString()
  return target.includes(s) ? true : 'Highlighted Text must exist within the Subtitle exactly.'
}

const validateHighlightedInSubtitleBN = (val: unknown, { siblingData }: any) => {
  const s = (val ?? '').toString().trim()
  if (!s) return true // optional
  if (s.length > HILITE_MAX) return `হাইলাইটেড টেক্সট সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর হতে পারবে।`
  const target = (siblingData?.subTitleBN ?? '').toString()
  return target.includes(s)
    ? true
    : 'হাইলাইটেড টেক্সটটি উপশিরোনামের ভেতরে হুবহু থাকতে হবে।'
}

/* ---------------- block ---------------- */
const CareerResourcesSchema: Block = {
  slug: CAREER_PAGE_RESOURCES_SLUG_AND_TAG,
  labels: {
    singular: CAREER_PAGE_RESOURCES_BLOCK_LABEL,
    plural: CAREER_PAGE_RESOURCES_BLOCK_LABEL,
  },

  imageURL: CAREER_PAGE_RESOURCES_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CAREER_PAGE_RESOURCES_BLOCK_LABEL} preview`,

  fields: [
    // Title (EN/BN)
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
          admin: { width: '50%', description: `Primary headline. Max ${TITLE_MAX} characters.` },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Subtitle (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'subTitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
          admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
        },
        {
          name: 'subTitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Highlighted (within subtitle) EN/BN — optional
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedSubTitle',
          type: 'text',
          label: 'Highlighted Text (within subtitle)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInSubtitle,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Subtitle. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedSubTitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (উপশিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInSubtitleBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। উপশিরোনামের ভেতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // NEW: Background Image (main-level, not in cards)
    ...generateImageFields({
      fieldName: 'backgroundImage',
      label: 'Background Image',
      description: 'Background image for the section (16:9 recommended).',
      aspectRatio: 16 / 9,
      quality: 0.93,
      maxKB: 500,
      ownerCollection: CAREER_PAGE_RESOURCES_SLUG_AND_TAG as any,
    } as any),

    // Cards array
    {
      name: 'cards',
      type: 'array',
      label: 'Resource Cards',
      required: true,
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: { description: 'Add one or more resource cards.' },
      fields: [
        // Card Title (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Card Title',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Short heading for the card. Max ${CARD_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'কার্ড শিরোনাম (বাংলা)',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `কার্ডের সংক্ষিপ্ত শিরোনাম। সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Card Image (cropper)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Card Image',
          description: 'Thumbnail for the resource card. 4:3 recommended.',
          aspectRatio: 4 / 3,
          quality: 0.96,
          maxKB: 300,
          ownerCollection: CAREER_PAGE_RESOURCES_SLUG_AND_TAG as any,
        } as any),

        // Card Description (EN/BN) — plain text
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'text',
              required: true,
              label: 'Card Description',
              maxLength: CARD_DESC_MAX,
              validate: validateShortText('Card Description', CARD_DESC_MAX, true),
              admin: {
                width: '50%',
                description: `Brief supporting copy. Max ${CARD_DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'text',
              required: true,
              label: 'কার্ড বর্ণনা (বাংলা)',
              maxLength: CARD_DESC_MAX,
              validate: validateShortText('Card Description (BN)', CARD_DESC_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত সহায়ক বর্ণনা। সর্বোচ্চ ${bnNum(CARD_DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Card Designation (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'designation',
              type: 'text',
              required: true,
              label: 'Designation',
              maxLength: DESIGNATION_MAX,
              validate: validateShortText('Designation', DESIGNATION_MAX, true),
              admin: {
                width: '50%',
                description: `e.g., Senior Advisor. Max ${DESIGNATION_MAX} characters.`,
              },
            },
            {
              name: 'designationBN',
              type: 'text',
              required: true,
              label: 'পদবি (বাংলা)',
              maxLength: DESIGNATION_MAX,
              validate: validateShortText('Designation (BN)', DESIGNATION_MAX, true),
              admin: {
                width: '50%',
                description: `যেমন: সিনিয়র অ্যাডভাইজার। সর্বোচ্চ ${bnNum(DESIGNATION_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CareerResourcesSchema
