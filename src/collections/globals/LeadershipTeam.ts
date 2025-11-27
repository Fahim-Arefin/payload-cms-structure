// src/collections/Leaders.ts
import type { GlobalConfig } from 'payload'

import {
  GLOBAL_LEADERSHIP_TEAM_BLOCK_LABEL,
  GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
} from '@/lib/constants'

import { globalTag } from '@/lib/cacheTags'
import { bnNum } from '@/lib/utils'
import { revalidateTag } from 'next/cache'

import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

const TITLE_MAX = 60
const NAME_MAX = 100
const DESIGNATION_MAX = 80
const DESC_MAX = 3000

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

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

/** Media lifecycle for this Global (leaders[] has image + aboutImage) */
const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
  arrayFields: [
    { fieldName: 'leaders', mediaFields: ['image', 'aboutImage'], itemLabelField: 'title' },
  ],
  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
}) as NonNullable<GlobalConfig['hooks']> | undefined

/** Globals only allow: beforeValidate, beforeChange, afterChange */
const pickGlobalHooks = (h: NonNullable<GlobalConfig['hooks']> | undefined) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})

const base = pickGlobalHooks(mediaHooks)

const LeadershipTeam: GlobalConfig = {
  slug: GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
  label: GLOBAL_LEADERSHIP_TEAM_BLOCK_LABEL,
  admin: {
    description:
      'Powers About Us + Leaders. About Us reads Section Title + aboutImage; Leaders page reads leaders[] (portrait, name, designation, bios).',
  },

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    {
      type: 'row',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading for this page. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'sectionTitleBN',
          type: 'text',
          required: true,
          label: 'সেকশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      name: 'leaders',
      type: 'array',
      label: 'Leaders',
      minRows: 1,
      maxRows: 50,
      required: true,
      labels: { singular: 'Leader', plural: 'Leaders' },
      admin: { description: 'Add one card per leader.' },
      fields: [
        // Cropper fields (4:5)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Portrait Image',
          description:
            'Leader portrait (4:5 recommended). Optimized and blur placeholder generated automatically.',
          aspectRatio: 4 / 5,
          quality: 0.93,
          maxKB: 400,
          ownerCollection: GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG as any,
        } as any),

        // Cropper fields (~8:9)
        ...generateArrayImageFields({
          fieldName: 'aboutImage',
          label: 'Portrait Image (BG-removed • ~8:9)',
          description:
            'Upload a background-removed PNG (transparent), framed ~8:9 (e.g., 400×450). Keep subject centered.',
          aspectRatio: 8 / 9,
          quality: 1,
          maxKB: 500,
          ownerCollection: GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Name',
              maxLength: NAME_MAX,
              validate: validateShortText('Name', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `Leader’s full name (English). Max ${NAME_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'নাম (বাংলা)',
              maxLength: NAME_MAX,
              validate: validateShortText('Name (BN)', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `নেতৃত্বের পূর্ণ নাম (বাংলা)। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
              },
            },
          ],
        },

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
                description: `Official designation (English). Max ${DESIGNATION_MAX} characters.`,
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
                description: `আনুষ্ঠানিক পদবি (বাংলা)। সর্বোচ্চ ${bnNum(DESIGNATION_MAX)} অক্ষর।`,
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
              label: 'Bio / Description',
              validate: validateRichText('Description', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `Long bio (English). Up to ~${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              label: 'বায়ো / বর্ণনা (বাংলা)',
              validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `দীর্ঘ বায়ো (বাংলা)। প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।`,
              },
            },
          ],
        },
      ],
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (Array.isArray(data?.leaders)) {
              data.leaders = data.leaders.map((item: any, idx: number) => ({
                ...item,
                id: idx + 1,
              }))
            }
          },
        ],
      },
    },
  ],

  hooks: {
    beforeValidate: [...base.beforeValidate],
    beforeChange: [...base.beforeChange],
    afterChange: [
      ...base.afterChange,
      async () => {
        try {
          revalidateTag(globalTag(GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG))
          revalidateTag(ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG)
          revalidateTag(LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG)
        } catch {}
      },
    ],
  },
}

export default LeadershipTeam
