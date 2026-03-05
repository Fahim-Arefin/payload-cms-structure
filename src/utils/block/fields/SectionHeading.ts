import type { Field } from 'payload'

import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { validateHighlightedInField, validateShortText } from '@/utils/block/fields-validation'

type Args = {
  tagMax: number
  heading1Max: number
  heading1HighlightMax: number
  heading2Max: number
  heading2HighlightMax: number
  ctaMaxRows?: number
}

/**
 * Always returns:
 *  - tag
 *  - heading1 + heading1Highlighted
 *  - heading2 + heading2Highlighted
 *  - description
 *  - ctaButtons (common field)
 */
export const SectionHeadingFields = ({
  tagMax,
  heading1Max,
  heading1HighlightMax,
  heading2Max,
  heading2HighlightMax,
  ctaMaxRows = 1,
}: Args): Field[] => {
  return [
    // ===== Tag =====
    {
      name: 'tag',
      type: 'text',
      required: false,
      label: 'Tag',
      maxLength: tagMax,
      validate: validateShortText('Tag', tagMax, false),
      admin: {
        description: `Small label above heading. Max ${tagMax} characters.`,
      },
    },

    // ===== Heading 1 + highlighted =====
    {
      type: 'row',
      fields: [
        {
          name: 'heading1',
          type: 'text',
          required: true,
          label: 'Heading 1',
          maxLength: heading1Max,
          validate: validateShortText('Heading 1', heading1Max, true),
          admin: {
            width: '50%',
            description: `Main heading line 1. Max ${heading1Max} characters.`,
          },
        },
        {
          name: 'heading1Highlighted',
          type: 'text',
          required: false,
          label: 'Highlighted Text (within heading 1)',
          maxLength: heading1HighlightMax,
          validate: validateHighlightedInField(
            'Highlighted Text (Heading 1)',
            'heading1',
            heading1HighlightMax,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must be inside Heading 1. Max ${heading1HighlightMax}.`,
          },
        },
      ],
    },

    // ===== Heading 2 + highlighted =====
    {
      type: 'row',
      fields: [
        {
          name: 'heading2',
          type: 'text',
          required: false,
          label: 'Heading 2',
          maxLength: heading2Max,
          validate: validateShortText('Heading 2', heading2Max, false),
          admin: {
            width: '50%',
            description: `Secondary heading line. Max ${heading2Max} characters.`,
          },
        },
        {
          name: 'heading2Highlighted',
          type: 'text',
          required: false,
          label: 'Highlighted Text (within heading 2)',
          maxLength: heading2HighlightMax,
          validate: validateHighlightedInField(
            'Highlighted Text (Heading 2)',
            'heading2',
            heading2HighlightMax,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must be inside Heading 2. Max ${heading2HighlightMax}.`,
          },
        },
      ],
    },

    // ===== Body content =====
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      admin: {
        description: 'Write the paragraph text (you can add multiple paragraphs).',
      },
    },

    // ===== CTA Buttons (common source) =====
    CtaButtonsField({ maxRows: ctaMaxRows }),
  ]
}
