import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  LEARN_MORE_BLOG_CONTENT_BLOCK_THUMBNAIL_URL,
  LEARN_MORE_BLOG_CONTENT_PAGE_BLOCK_LABEL,
  LEARN_MORE_BLOG_CONTENT_SLUG_AND_TAG,
  LEARN_MORE_TAB,
} from '@/lib/constants'

/* ---- limits ---- */
const TITLE_MAX = 100
const SUBTITLE_MAX = 140
const HIGHLIGHT_MAX = 80
const DESC_MAX = 5000
const CTA_TEXT_MAX = 50
const COLOR_HEX_LEN = 7

/* ---- validators ---- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHighlightedInside =
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

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

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

/* ---- block (arrays of arrays) ---- */

const LearnMoreBlogContent: Block = {
  slug: LEARN_MORE_BLOG_CONTENT_SLUG_AND_TAG,
  labels: {
    singular: LEARN_MORE_BLOG_CONTENT_PAGE_BLOCK_LABEL,
    plural: LEARN_MORE_BLOG_CONTENT_PAGE_BLOCK_LABEL,
  },
  admin: {
    group: LEARN_MORE_TAB,
  },

  imageURL: LEARN_MORE_BLOG_CONTENT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${LEARN_MORE_BLOG_CONTENT_PAGE_BLOCK_LABEL} preview`,

  fields: [
    // Top-level groups (each group contains meta + its own blogs array)
    {
      name: 'groups',
      type: 'array',
      label: 'Blog Groups',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Group', plural: 'Groups' },
      admin: {
        description:
          'Each group has Title/Subtitle (+ optional highlighted parts), a Description, and an array of Blogs.',
      },
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#FCF4EB',
          admin: {
            width: '33%',
            description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(
              COLOR_HEX_LEN,
            )}).`,
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: false,
              label: 'Title',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title', TITLE_MAX, false),
              admin: { width: '50%', description: `Max ${TITLE_MAX} characters.` },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: false,
              label: 'শিরোনাম (বাংলা)',
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
              name: 'highlightedTitle',
              type: 'text',
              label: 'Highlighted Text (within Title)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInside('Highlighted Title', 'title', HIGHLIGHT_MAX),
              admin: { width: '50%', description: `Optional. Must appear inside Title.` },
            },
            {
              name: 'highlightedTitleBN',
              type: 'text',
              label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInside(
                'Highlighted Title (BN)',
                'titleBN',
                HIGHLIGHT_MAX,
              ),
              admin: { width: '50%', description: `ঐচ্ছিক। শিরোনামের ভিতরে হুবহু থাকতে হবে।` },
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
              label: 'Subtitle',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Subtitle', SUBTITLE_MAX, false),
              admin: { width: '50%', description: `Max ${SUBTITLE_MAX} characters.` },
            },
            {
              name: 'subtitleBN',
              type: 'text',
              required: false,
              label: 'উপশিরোনাম (বাংলা)',
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
              label: 'Highlighted Text (within Subtitle)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInside(
                'Highlighted Subtitle',
                'subtitle',
                HIGHLIGHT_MAX,
              ),
              admin: { width: '50%', description: `Optional. Must appear inside Subtitle.` },
            },
            {
              name: 'highlightedSubtitleBN',
              type: 'text',
              label: 'রঙিন টেক্সট (উপশিরোনামের মধ্যে)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInside(
                'Highlighted Subtitle (BN)',
                'subtitleBN',
                HIGHLIGHT_MAX,
              ),
              admin: { width: '50%', description: `ঐচ্ছিক। উপশিরোনামের ভিতরে হুবহু থাকতে হবে।` },
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
              admin: { width: '50%', description: `প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।` },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'loadMoreText',
              type: 'text',
              label: 'Load More Button Text',
              required: true,
              defaultValue: 'Load More',
              maxLength: CTA_TEXT_MAX,
              validate: validateShortText('Load More Button Text', CTA_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `Label for the list “Load More” button. Max ${CTA_TEXT_MAX} characters.`,
              },
            },
            {
              name: 'loadMoreTextBN',
              type: 'text',
              label: 'বাটনের টেক্সট (বাংলা) — Load More',
              required: true,
              defaultValue: 'আরও দেখুন',
              maxLength: CTA_TEXT_MAX,
              validate: validateShortText('Load More Button Text (BN)', CTA_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `লিস্টের “Load More” বাটনের লেখা। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'loadLessText',
              type: 'text',
              label: 'Load Less Button Text',
              required: true,
              defaultValue: 'Load Less',
              maxLength: CTA_TEXT_MAX,
              validate: validateShortText('Load Less Button Text', CTA_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `Label for the list “Load Less” button. Max ${CTA_TEXT_MAX} characters.`,
              },
            },
            {
              name: 'loadLessTextBN',
              type: 'text',
              label: 'বাটনের টেক্সট (বাংলা) — Load Less',
              required: true,
              defaultValue: 'কম দেখান',
              maxLength: CTA_TEXT_MAX,
              validate: validateShortText('Load Less Button Text (BN)', CTA_TEXT_MAX, true),
              admin: {
                width: '50%',
                description: `লিস্টের “Load Less” বাটনের লেখা। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'style',
          type: 'select',
          label: 'Load More/Less Button Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secendary', value: 'secendary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'outline',
        },

        // Nested blogs array inside each group
        {
          name: 'blogs',
          type: 'array',
          label: 'Blogs in this Group',
          required: true,
          minRows: 1,
          maxRows: 48,
          labels: { singular: 'Blog', plural: 'Blogs' },
          admin: { description: 'Per-blog Title/Description with an image.' },
          fields: [
            ...generateArrayImageFields({
              fieldName: 'image',
              label: 'Blog Image (525:278)',
              description:
                '525:278 image for the blog card. Blur placeholder generated automatically.',
              aspectRatio: 525 / 278,
              quality: 0.93,
              maxKB: 700,
              ownerCollection: LEARN_MORE_BLOG_CONTENT_SLUG_AND_TAG as any,
            } as any),

            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Blog Title',
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Blog Title', TITLE_MAX, true),
                  admin: { width: '50%', description: `Max ${TITLE_MAX} characters.` },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  required: true,
                  label: 'ব্লগ শিরোনাম (বাংলা)',
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Blog Title (BN)', TITLE_MAX, true),
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
                  label: 'Blog Description',
                  validate: validateRichText('Blog Description', { required: true, max: DESC_MAX }),
                  admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
                },
                {
                  name: 'descriptionBN',
                  type: 'richText',
                  label: 'ব্লগ বিবরণ (বাংলা)',
                  validate: validateRichText('Blog Description (BN)', {
                    required: true,
                    max: DESC_MAX,
                  }),
                  admin: { width: '50%', description: `প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।` },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'readMoreText',
                  type: 'text',
                  label: 'Read More Button Text',
                  required: true,
                  defaultValue: 'Read More',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateShortText('Read More Button Text', CTA_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Label for the per-section CTA (e.g., “Read More”). Max ${CTA_TEXT_MAX} characters.`,
                  },
                },
                {
                  name: 'readMoreTextBN',
                  type: 'text',
                  label: 'বাটনের টেক্সট (বাংলা) — Read More',
                  required: true,
                  defaultValue: 'বিস্তারিত পড়ুন',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateShortText('Read More Button Text (BN)', CTA_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                    description: `CTA বাটনের লেখা (যেমন, “বিস্তারিত পড়ুন”). সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'readLessText',
                  type: 'text',
                  label: 'Read Less Button Text',
                  required: true,
                  defaultValue: 'Read Less',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateShortText('Read Less Button Text', CTA_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Label for collapsing long content (e.g., “Read Less”). Max ${CTA_TEXT_MAX} characters.`,
                  },
                },
                {
                  name: 'readLessTextBN',
                  type: 'text',
                  label: 'বাটনের টেক্সট (বাংলা) — Read Less',
                  required: true,
                  defaultValue: 'কম পড়ুন',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateShortText('Read Less Button Text (BN)', CTA_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                    description: `দীর্ঘ কনটেন্ট সংকুচিত করার বাটনের লেখা (যেমন, “কম পড়ুন”)। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default LearnMoreBlogContent
