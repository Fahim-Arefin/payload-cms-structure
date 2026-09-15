import {
  ABOUT_US_INTRO_SLUG_AND_TAG,
  BASIC_HERO_SLUG_AND_TAG,
  CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,
  CODING_LANGUAGE_SLUG_AND_TAG,
  COLLABORATIVE_METHOD_SLUG_AND_TAG,
  COMPANY_INFO_SLUG_AND_TAG,
  CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG,
  CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG,
  CS_DELIVERY_SLUG_AND_TAG,
  CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG,
  CS_PRODUCT_SHOWCASE_SLUG_AND_TAG,
  EMPLOYEE_SLUG_AND_TAG,
  FAQ_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  LOCATION_SLUG_AND_TAG,
  MAINTENANCE_SLUG_AND_TAG,
  OUR_PROJECT_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCTION_PIPELINE_SLUG_AND_TAG,
  WHAT_WE_BUILD_SLUG_AND_TAG,
  WHY_CHOOSE_US_SLUG_AND_TAG,
} from '@/lib/constants'
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
    {
      layoutKey: 'layout',
      blockType: FOUNDER_QUOTE_SLUG_AND_TAG,
      mediaFields: ['founderInfo.founderImage'],
      mediaFieldLabels: {
        'founderInfo.founderImage': 'Founder Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: FAQ_SLUG_AND_TAG,
      mediaFields: ['ctoInfo.image'],
      mediaFieldLabels: {
        'ctoInfo.image': 'CTO Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_INTRO_SLUG_AND_TAG,
      mediaFields: ['companyInfo.thumbnailImage'],
      mediaFieldLabels: {
        'companyInfo.thumbnailImage': 'Thumbnail Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG,
      mediaFields: [
        'otherInfo.mainImage',
        'otherInfo.feature.icon',
        'otherInfo.roles.navigatorIcon',
        'otherInfo.roles.driverIcon',
      ],
      mediaFieldLabels: {
        'otherInfo.mainImage': 'Main Image',
        'otherInfo.feature.icon': 'Feature Icon',
        'otherInfo.roles.navigatorIcon': 'Navigator Icon',
        'otherInfo.roles.driverIcon': 'Driver Icon',
      },
    },
    {
      layoutKey: 'layout',
      blockType: CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG,
      mediaFields: ['protocolInfo.image'],
      mediaFieldLabels: {
        'protocolInfo.image': 'Main Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: CS_DELIVERY_SLUG_AND_TAG,
      mediaFields: [
        'deliveryInfo.imageOneWrapper.imageOne',
        'deliveryInfo.imageTwoWrapper.imageTwo',
      ],
      mediaFieldLabels: {
        'deliveryInfo.imageOneWrapper.imageOne': 'Image One',
        'deliveryInfo.imageTwoWrapper.imageTwo': 'Image Two',
      },
    },
    {
      layoutKey: 'layout',
      blockType: LOCATION_SLUG_AND_TAG,
      mediaFields: ['locationInfo.mapImage'],
      mediaFieldLabels: {
        'locationInfo.mapImage': 'Map Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG,
      mediaFields: ['sectionHeading.downloadButton.file'],
      mediaFieldLabels: {
        'sectionHeading.downloadButton.file': 'Downloadable Case Study PDF',
      },
    },
    {
      layoutKey: 'layout',
      blockType: MAINTENANCE_SLUG_AND_TAG,
      mediaFields: ['maintenanceInfo.image'],
      mediaFieldLabels: {
        'maintenanceInfo.image': 'Maintenance Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: COLLABORATIVE_METHOD_SLUG_AND_TAG,
      mediaFields: [
        'collaborativeMethodInfo.image',
        'collaborativeMethodInfo.designer.designerIcon',
        'collaborativeMethodInfo.builder.builderIcon',
      ],
      mediaFieldLabels: {
        'collaborativeMethodInfo.image': 'Main Image',
        'collaborativeMethodInfo.designer.designerIcon': 'Designer Icon',
        'collaborativeMethodInfo.builder.builderIcon': 'Builder Icon',
      },
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCTION_PIPELINE_SLUG_AND_TAG,
      mediaFields: ['sectionHeading.downloadButton.file'],
      mediaFieldLabels: {
        'sectionHeading.downloadButton.file': 'Downloadable Case Study PDF',
      },
    },
    {
      layoutKey: 'layout',
      blockType: CS_PRODUCT_SHOWCASE_SLUG_AND_TAG,
      mediaFields: ['sectionHeading.downloadButton.file'],
      mediaFieldLabels: {
        'sectionHeading.downloadButton.file': 'Downloadable Case Study PDF',
      },
    },
  ],

  // Blocks with arrays that contain media fields:
  blockArrayFields: [
    {
      layoutKey: 'layout',
      blockType: BASIC_HERO_SLUG_AND_TAG,
      arrayKey: 'heroes',
      mediaFields: ['image', 'video'],
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCT_HERO_SLUG_AND_TAG,
      arrayKey: 'heroes',
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: COMPANY_INFO_SLUG_AND_TAG,
      arrayKey: 'companyInfoItems',
      mediaFields: ['icon'],
    },
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
    {
      layoutKey: 'layout',
      blockType: CODING_LANGUAGE_SLUG_AND_TAG,
      groupKey: 'languageImages',
      arrayKey: 'languages',
      mediaFields: ['transparentColoredImage'],
    },
    // {
    //   layoutKey: 'layout',
    //   blockType: CODING_LANGUAGE_SLUG_AND_TAG,
    //   groupKey: 'languageImages',
    //   arrayKey: 'languagesTwo',
    //   mediaFields: ['transparentNormalImage', 'transparentColoredImage'],
    // },
    {
      layoutKey: 'layout',
      blockType: CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,
      groupKey: 'clientReviews',
      arrayKey: 'companies',
      mediaFields: ['companyLogo'],
      mediaFieldLabels: {
        companyLogo: 'Company Logo',
      },
    },
    {
      layoutKey: 'layout',
      blockType: EMPLOYEE_SLUG_AND_TAG,
      groupKey: 'employeeGroup',
      arrayKey: 'employees',
      mediaFields: ['employeeImage'],
      mediaFieldLabels: {
        employeeImage: 'Employee Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: OUR_PROJECT_SLUG_AND_TAG,
      groupKey: 'projectGroup',
      arrayKey: 'projects',
      mediaFields: ['desktopSiteImage', 'mobileSiteImage'],
      mediaFieldLabels: {
        desktopSiteImage: 'Desktop Site Image',
        mobileSiteImage: 'Mobile Site Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG,
      groupKey: 'lifecycle',
      arrayKey: 'items',
      mediaFields: ['mainIcon.mainIconColored', 'mainIcon.mainIconWhite'],
      mediaFieldLabels: {
        'mainIcon.mainIconColored': 'Main Icon Colored',
        'mainIcon.mainIconWhite': 'Main Icon White',
      },
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCTION_PIPELINE_SLUG_AND_TAG,
      groupKey: 'pipeline',
      arrayKey: 'items',
      mediaFields: ['icon.iconColored', 'icon.iconWhite'],
      mediaFieldLabels: {
        'icon.iconColored': 'Icon Colored',
        'icon.iconWhite': 'Icon White',
      },
    },
    {
      layoutKey: 'layout',
      blockType: WHAT_WE_BUILD_SLUG_AND_TAG,
      groupKey: 'whatWeBuild',
      arrayKey: 'items',
      mediaFields: ['image'],
      mediaFieldLabels: {
        image: 'Item Image',
      },
    },
    {
      layoutKey: 'layout',
      blockType: WHY_CHOOSE_US_SLUG_AND_TAG,
      groupKey: 'choosingCriteria',
      arrayKey: 'criteria',
      mediaFields: ['icon'],
      itemLabelField: 'text',
      mediaFieldLabels: {
        icon: 'Criteria Icon',
      },
    } as any,
    {
      layoutKey: 'layout',
      blockType: CS_PRODUCT_SHOWCASE_SLUG_AND_TAG,
      groupKey: 'products',
      arrayKey: 'items',
      mediaFields: [
        'mainIcon.mainIconColored',
        'mainIcon.mainIconWhite',
        'productLogo',
        'productImage',
      ],
      mediaFieldLabels: {
        'mainIcon.mainIconColored': 'Main Icon Colored',
        'mainIcon.mainIconWhite': 'Main Icon White',
        productLogo: 'Product Logo',
        productImage: 'Product Showcase Image',
      },
    },
  ],

  blockGroupArrayFields: [
    {
      layoutKey: 'layout',
      blockType: CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,
      groupKey: 'clientReviews',
      firstArrayKey: 'companies',
      secondArrayKey: 'reviews',
      mediaFields: ['image'],
      mediaFieldLabels: {
        image: 'Client Image',
      },
    },
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
