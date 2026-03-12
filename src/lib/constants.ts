/** UI hint */
export const MAX_TOTAL_SIZE_KB = 1000
/** Keep a margin under Next.js’s ~1 MB request cap */
export const SAFE_MAX_KB = 950

/** ---- helpers ---- */
export const bytesOfJSON = (v: unknown): number => {
  try {
    const json = JSON.stringify(v ?? null)
    return new TextEncoder().encode(json).length
  } catch {
    return 0
  }
}
export const toKB = (n: number) => Math.round(n / 1024)

// thumbnail folder name
const thumbnailFolder = '/assets/block-thumbnails'

// GLOBAL API

export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'navbar' as const
export const GLOBAL_NAVBAR_CACHE_KEY = 'navbar-data'

export const AUDIT_LOG = 'Audit'

// Group
export const HERO_BLOCKS = 'Hero Blocks'
export const COMMON = 'Common Blocks'
export const HOME_PAGE = 'Home Page'
export const ABOUT_US = 'About Us Page'

// Basic Hero Block
export const BASIC_HERO_SLUG_AND_TAG = 'basic-hero'
export const BASIC_HERO_BLOCK_LABEL = 'Hero (Basic)'
export const BASIC_HERO_CACHE_KEY = 'basic-hero-data'
export const BASIC_HERO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/basic-hero-block-thumbnail.jpg`

// Product Hero Block
export const PRODUCT_HERO_SLUG_AND_TAG = 'product-hero'
export const PRODUCT_HERO_BLOCK_LABEL = 'Hero (Product)'
export const PRODUCT_HERO_CACHE_KEY = 'product-hero-data'
export const PRODUCT_HERO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-hero-block-thumbnail.jpg`

// Get To Know Block
export const GET_TO_KNOW_SLUG_AND_TAG = 'get-to-know-hero'
export const GET_TO_KNOW_BLOCK_LABEL = 'Get To Know'
export const GET_TO_KNOW_CACHE_KEY = 'get-to-know-hero-data'
export const GET_TO_KNOW_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/get-to-know-hero-block-thumbnail.jpg`

// Product Intro
export const PRODUCT_INTRO_SLUG_AND_TAG = 'product-intro-hero'
export const PRODUCT_INTRO_BLOCK_LABEL = 'Product Intro'
export const PRODUCT_INTRO_CACHE_KEY = 'product-intro-hero-data'
export const PRODUCT_INTRO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-intro-hero-block-thumbnail.jpg`

// Vision and mission
export const MISSION_VISION_SLUG_AND_TAG = 'mission-vision'
export const MISSION_VISION_BLOCK_LABEL = 'Mission And Vision Section'
export const MISSION_VISION_CACHE_KEY = 'mission-vision-data'
export const MISSION_VISION_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/mission-vision-block-thumbnail.jpg`

// Product Advantage Card
export const PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG = 'product-advantage-card'
export const PRODUCT_ADVANTAGE_CARD_BLOCK_LABEL = 'Product Advantage Card'
export const PRODUCT_ADVANTAGE_CARD_CACHE_KEY = 'product-advantage-card-data'
export const PRODUCT_ADVANTAGE_CARD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-advantage-card-block-thumbnail.jpg`
