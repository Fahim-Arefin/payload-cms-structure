// src/globals/Navbar.ts
import type { Field, GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cacheTags'
import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants' // export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'global-navbar';
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { revalidateTag } from 'next/cache'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { roleAtLeast } from '@/lib/rbac'
import {
  EMAIL_MAX,
  validateAtLeastOneRecipientEmail,
  validateEmail,
  validateSectionIdOptional,
} from '@/utils/block/fields-validation'

const CTA_TEXT_MAX = 100
const DEPTH_MAX = 1 // max depth for nav items (0 = no children, 1 = one level of children, etc.)

/* -----------------------------------------------------------------------------
   MEDIA LIFECYCLE WIRING
----------------------------------------------------------------------------- */

// ✅ Configure lifecycle for the Navbar global
// CHANGED: track top-level "logo" (not "branding.logo")
const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_NAVBAR_SLUG_AND_TAG, // stamps ownerCollection during finalize
  imageConfigs: [
    {
      fieldName: 'logo', // <— moved out of branding group
      aspectRatio: 1.48, // 1.48 / 1
      quality: 0.92,
      maxKB: 500,
      required: true,
      label: 'Navbar Logo',
      description: 'Primary navbar logo. Transparent PNG/SVG preferred.',
    },
  ],
  onAfterChange: async ({ req }) => {
    await triggerMediaTemporaryPurge(req)
  },
})

// Coerce hooks for GlobalConfig
const pickGlobalHooks = (h: any) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})

const base = pickGlobalHooks(mediaHooks)

/* ------------------------------- nav item fields ------------------------------ */

const navItemFields = (
  levelLabel: string = 'Item',
  depth: number = 0,
  maxDepth: number = 4,
): Field[] => {
  const base: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: `${levelLabel} Label`,
          maxLength: CTA_TEXT_MAX,
          required: true,
          // validate: validateFooterCTAEnglishText,
          admin: {
            width: '50%',
            description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'isTop',
          type: 'select',
          label: 'Show In Top Bar Row',
          required: true,
          defaultValue: 'no',
          options: [
            {
              label: 'No',
              value: 'no',
            },
            {
              label: 'Yes',
              value: 'yes',
            },
          ],
          admin: {
            width: '50%',
            description: 'Select "Yes" to make it appear in the top bar row.',
          },
        },
      ],
    },

    // Internal page relationship (preferred)
    {
      type: 'row',
      fields: [
        {
          name: 'href',
          label: 'Link to (internal page)',
          type: 'relationship',
          relationTo: 'pages',
          // validate: validateFooterCTALinkRequiredIfAnyText,
          required: true,
          admin: {
            description:
              'Pick an internal Page to link to. If CTA text is provided, either this or URL (below) is required.',
          },
        },
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (anchor)',
          required: false,
          admin: {
            width: '50%',
            description:
              'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
          },
          validate: validateSectionIdOptional,
        },
      ],
    },
  ]

  if (depth < maxDepth) {
    base.push({
      name: 'children',
      type: 'array',
      label: 'Children',
      minRows: 0,
      maxRows: 20,
      labels: { singular: 'Child', plural: 'Children' },
      admin: {
        description: `Optional submenu items. You can nest up to ${maxDepth + 1} levels.`,
      },
      fields: navItemFields('Child', depth + 1, maxDepth),
    })
  }

  return base
}

/* --------------------------------- config --------------------------------- */

const Navbar: GlobalConfig = {
  slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
  label: 'Navbar',
  admin: {
    description:
      'Global navbar: logo and multi-level navigation (desktop & mobile), plus an optional portal link.',
  },

  access: {
    read: () => true, // public read
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    // NEW: Top-level logo (not inside "branding")
    ...generateImageFields({
      fieldName: 'logo',
      label: 'Navbar Logo',
      description:
        'Primary navbar logo. Transparent PNG/SVG preferred. Square-ish crop recommended.',
      aspectRatio: 701 / 179,
      quality: 0.92,
      maxKB: 500,
      required: true,
      ownerCollection: GLOBAL_NAVBAR_SLUG_AND_TAG as any,
    } as any),

    /* Desktop navigation */
    {
      name: 'desktop',
      type: 'group',
      label: 'Desktop Navigation',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Menu Items',
          minRows: 1,
          maxRows: 20,
          labels: { singular: 'Menu Item', plural: 'Menu Items' },
          admin: {
            description:
              'Top-level nav items for desktop. Each item can optionally have nested children.',
          },
          fields: navItemFields('Item', 0, DEPTH_MAX),
        },
      ],
    },
    {
      type: 'group',
      name: 'queryFormRecipientEmails',
      label: 'Side Panel Query Form Recipients',
      admin: {
        description:
          'Add the email addresses that should receive query form submissions from the website side panel/navbar query form. At least one recipient is required. These emails are only used for the side panel form, not the page query form block.',
      },
      validate: validateAtLeastOneRecipientEmail,
      fields: [
        {
          name: 'email1',
          type: 'text',
          label: 'Recipient Email 1',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 1', true),
          admin: {
            width: '33%',
            description: 'Primary email address that will receive side panel query submissions.',
          },
        },
        {
          name: 'email2',
          type: 'text',
          label: 'Recipient Email 2',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 2', false),
          admin: {
            width: '33%',
            description: 'Optional additional recipient.',
          },
        },
        {
          name: 'email3',
          type: 'text',
          label: 'Recipient Email 3',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 3', false),
          admin: {
            width: '33%',
            description: 'Optional additional recipient.',
          },
        },
        {
          name: 'email4',
          type: 'text',
          label: 'Recipient Email 4',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 4', false),
          admin: {
            width: '33%',
            description: 'Optional additional recipient.',
          },
        },
        {
          name: 'email5',
          type: 'text',
          label: 'Recipient Email 5',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 5', false),
          admin: {
            width: '33%',
            description: 'Optional additional recipient.',
          },
        },
      ],
    },
  ],

  // Merge in lifecycle hooks & keep your revalidateTag
  hooks: {
    beforeValidate: [...(base.beforeValidate ?? [])],
    beforeChange: [...(base.beforeChange ?? [])],
    afterChange: [
      ...(base.afterChange ?? []),
      async () => {
        // Keep your cache revalidation
        revalidateTag(globalTag(GLOBAL_NAVBAR_SLUG_AND_TAG))
      },
    ],
  },
}

export default Navbar
