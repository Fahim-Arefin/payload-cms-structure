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

// Global Navbar
export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'navbar' as const
export const GLOBAL_NAVBAR_CACHE_KEY = 'navbar-data'

// Global Footer
export const GLOBAL_FOOTER_SLUG_AND_TAG = 'footer' as const
export const GLOBAL_FOOTER_CACHE_KEY = 'footer-data'

// News Categories Global
export const GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG = 'news-categories'
export const GLOBAL_NEWS_CATEGORIES_CACHE_KEY = 'news-categories-data'

// News Tags Global
export const GLOBAL_NEWS_TAGS_SLUG_AND_TAG = 'news-tags'
export const GLOBAL_NEWS_TAGS_CACHE_KEY = 'news-tags-data'

// News Global
export const GLOBAL_NEWS_SLUG_AND_TAG = 'news'
export const GLOBAL_NEWS_CACHE_KEY = 'news-data'
export const AUDIT_LOG = 'Audit'

// Group
export const HERO_BLOCKS = 'Hero Blocks'
export const COMMON = 'Common Blocks'
export const FORMS = 'Forms'
export const HOME_PAGE = 'Home Page'
export const ABOUT_US = 'About Us Page'
export const PRODUCT_PAGE = 'Product Page'
export const GET_IN_TOUCH = 'Get In Touch Page'
export const NEWS = 'News And Events'

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
