import { CARD_INFO_SLUG_AND_TAG, INTRO_HERO_SLUG_AND_TAG } from '@/lib/constants'
import { triggerMediaTemporaryPurge } from './triggerMediaTemporaryPurge'
import { withMediaLifecycle } from './withMediaLifecycle'

export const mediaHooks = withMediaLifecycle({
  collectionSlug: 'pages',

  // Blocks with a media field on the block row itself:
  blockSimpleFields: [
    // {
    //   layoutKey: 'layout',
    //   blockType: GET_TO_KNOW_SLUG_AND_TAG,
    //   mediaFields: ['mainImage'],
    // },
    // {
    //   layoutKey: 'layout',
    //   blockType: FOUNDER_QUOTE_SLUG_AND_TAG,
    //   mediaFields: ['founderInfo.founderImage'],
    //   mediaFieldLabels: {
    //     'founderInfo.founderImage': 'Founder Image',
    //   },
    // },
    {
      layoutKey: 'layout',
      blockType: INTRO_HERO_SLUG_AND_TAG,
      mediaFields: ['video', 'thumbnail', 'groovyDesign'],
      mediaFieldLabels: {
        video: 'Hero Video',
        thumbnail: 'Hero Video Thumbnail',
        groovyDesign: 'Groovy Design',
      },
    },
    {
      layoutKey: 'layout',
      blockType: CARD_INFO_SLUG_AND_TAG,
      mediaFields: [
        'cardSelector.worldElite.cardImage',
        'cardSelector.visaInfinite.cardImage',
        'groovyDesign',
      ],
      mediaFieldLabels: {
        'cardSelector.worldElite.cardImage': 'World Elite Card Image',
        'cardSelector.visaInfinite.cardImage': 'Visa Infinite Card Image',
        groovyDesign: 'Groovy Background Image',
      },
    },
  ],

  // Blocks with arrays that contain media fields:
  blockArrayFields: [
    // {
    //   layoutKey: 'layout',
    //   blockType: BASIC_HERO_SLUG_AND_TAG,
    //   arrayKey: 'heroes',
    //   mediaFields: ['image', 'video'],
    // },
  ],

  // Blocks with nested array (media that inside another array) that contain media fields
  blockGroupFields: [
    // sections[].insuranceCardData[] has a media field: image (without group)
    // {
    //   layoutKey: 'layout',
    //   blockType: GET_TO_KNOW_SLUG_AND_TAG,
    //   groupKey: 'cards',
    //   arrayKey: 'icons',
    //   mediaFields: ['icon'],
    // },
    // block → group → array → image fields
    // {
    //   layoutKey: 'layout',
    //   blockType: CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,
    //   groupKey: 'clientReviews',
    //   arrayKey: 'companies',
    //   mediaFields: ['companyLogo'],
    //   mediaFieldLabels: {
    //     companyLogo: 'Company Logo',
    //   },
    // },
  ],

  blockGroupArrayFields: [
    // {
    //   layoutKey: 'layout',
    //   blockType: CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,
    //   groupKey: 'clientReviews',
    //   firstArrayKey: 'companies',
    //   secondArrayKey: 'reviews',
    //   mediaFields: ['image'],
    //   mediaFieldLabels: {
    //     image: 'Client Image',
    //   },
    // },
  ],

  // otherUploadFields: [
  //   'brochurePDF', // 👈 top-level upload fields to Media (PDFs)
  // ],

  // arrays -> arrays -> arrays --> arrays
  blockNestedDeepFields: [],

  // ✅ NEW: block → tabs[] → content (blocks) → (descriptive-content) items[] → icon
  blockArrayBlocksFields: [],

  blockArrayBlocksGroupFields: [],

  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
})
