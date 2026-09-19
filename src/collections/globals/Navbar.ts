import type { Field, GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { globalTag } from '@/lib/cacheTags'
import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'
import { validateSectionIdOptional } from '@/utils/block/fields-validation'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'

const backgroundImageConfig = {
  fieldName: 'backgroundImage',
  label: 'Groovy Design',
  description:
    'Optional decorative overlay above the navbar linear gradient. Crop ratio: 16:1 panoramic. Recommended size: 1920 x 120 px. Upload a transparent PNG or WebP. Covers the full navbar outside the content padding, with centered cropping on smaller screens. Keep important details near the center.',
  aspectRatio: 16 / 1,
  quality: 0.95,
  maxKB: 500,
  required: false,
  ownerCollection: GLOBAL_NAVBAR_SLUG_AND_TAG,
}

const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_NAVBAR_SLUG_AND_TAG,
  imageConfigs: [
    {
      fieldName: 'logo',
      aspectRatio: 1050 / 508,
      quality: 0.92,
      maxKB: 500,
      required: true,
      label: 'Navbar Logo',
      description: 'Transparent UCB logo.',
    },
    backgroundImageConfig,
  ],
  onAfterChange: async ({ req }) => {
    await triggerMediaTemporaryPurge(req)
  },
})

// The shared lifecycle supports globals at runtime; its public return type uses collection hooks.
const globalMediaHooks = mediaHooks as unknown as NonNullable<GlobalConfig['hooks']>

const linkFields = (): Field[] => [
  { name: 'label', type: 'text', required: true, maxLength: 40 },
  {
    name: 'linkType',
    type: 'select',
    defaultValue: 'page',
    options: [
      { label: 'Internal page', value: 'page' },
      { label: 'URL / path', value: 'url' },
    ],
  },
  {
    name: 'href',
    type: 'relationship',
    relationTo: 'pages',
    label: 'Internal page',
    admin: { condition: (_, siblingData) => siblingData?.linkType !== 'url' },
    validate: (value: unknown, { siblingData }: { siblingData: unknown }) =>
      (siblingData as { linkType?: string })?.linkType === 'url' ||
      Boolean(value) ||
      'Choose an internal page.',
  },
  {
    name: 'url',
    type: 'text',
    label: 'URL or path',
    admin: { condition: (_, siblingData) => siblingData?.linkType === 'url' },
    validate: (value: unknown, { siblingData }: { siblingData: unknown }) => {
      if ((siblingData as { linkType?: string })?.linkType !== 'url') return true
      if (typeof value !== 'string' || value.includes('\\') || /\s/.test(value))
        return 'Enter a valid URL or path.'
      if (/^\/(?!\/)/.test(value)) return true
      try {
        return (
          ['http:', 'https:'].includes(new URL(value).protocol) || 'Use an http:// or https:// URL.'
        )
      } catch {
        return 'Enter a path starting with / or a complete https:// URL.'
      }
    },
  },
  { name: 'sectionId', type: 'text', label: 'Section anchor', validate: validateSectionIdOptional },
  { name: 'newTab', type: 'checkbox', label: 'Open in a new tab', defaultValue: false },
]

const Navbar: GlobalConfig = {
  slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
  label: 'Navbar',
  admin: {
    description: 'UCB navigation, desktop dropdowns, Apply Online, and mobile sidebar shortcuts.',
  },
  access: { read: () => true, update: ({ req }) => roleAtLeast(req.user, 'editor') },
  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },
    ...generateImageFields({
      fieldName: 'logo',
      label: 'Navbar Logo',
      description:
        'Upload the light UCB logo on a transparent background. Recommended ratio: 1050:508.',
      aspectRatio: 1050 / 508,
      quality: 0.92,
      maxKB: 500,
      required: true,
      ownerCollection: GLOBAL_NAVBAR_SLUG_AND_TAG,
    }),
    { name: 'logoAlt', type: 'text', defaultValue: 'UCB', label: 'Logo alternative text' },
    ...generateImageFields(backgroundImageConfig),
    {
      name: 'desktop',
      type: 'group',
      label: 'Navigation',
      fields: [
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          maxRows: 8,
          label: 'Menu items',
          admin: {
            description: 'Shared desktop and sidebar links. Up to one level of child links.',
          },
          fields: [
            ...linkFields(),
            {
              name: 'children',
              type: 'array',
              maxRows: 12,
              label: 'Dropdown links',
              fields: linkFields(),
            },
          ],
        },
      ],
    },
    {
      name: 'applyOnline',
      type: 'group',
      label: 'Apply Online button',
      fields: linkFields(),
      defaultValue: { label: 'Apply Online', linkType: 'url', url: '/apply-online' },
    },
    {
      name: 'mobileQuickLinks',
      type: 'array',
      maxRows: 2,
      label: 'Mobile header shortcuts',
      admin: {
        description: 'Two compact links next to the logo. Short labels work best on small phones.',
      },
      defaultValue: [
        { label: 'Visa Infinite', linkType: 'url', url: '/visa-infinite', appearance: 'outline' },
        { label: 'World Elite', linkType: 'url', url: '/world-elite', appearance: 'solid' },
      ],
      fields: [
        ...linkFields(),
        {
          name: 'appearance',
          type: 'select',
          defaultValue: 'outline',
          options: [
            { label: 'Champagne outline', value: 'outline' },
            { label: 'Red fill', value: 'solid' },
          ],
        },
      ],
    },
    { name: 'drawerTitle', type: 'text', defaultValue: 'Explore UCB', maxLength: 60 },
  ],
  hooks: {
    beforeValidate: globalMediaHooks?.beforeValidate,
    beforeChange: globalMediaHooks?.beforeChange,
    afterChange: [
      ...(globalMediaHooks?.afterChange ?? []),
      async () => {
        revalidateTag(globalTag(GLOBAL_NAVBAR_SLUG_AND_TAG))
      },
    ],
  },
}
export default Navbar
