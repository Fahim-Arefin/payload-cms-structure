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

// GLobal Contact Us
export const GLOBAL_CONTACT_US_SLUG_AND_TAG = 'global-contact-us'
export const GLOBAL_CONTACT_US_LABEL = 'Global Contact Us'

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

// form submission

export const CONTACT_FORM_SUBMISSIONS_SLUG = 'contact-form-submissions'

// Group
export const HERO_BLOCKS = 'Hero Blocks'
export const COMMON = 'Common Blocks'
export const FORMS = 'Form Submissions'
export const HOME_PAGE = 'Home Page'
export const ABOUT_US = 'About Us Page'
export const PRODUCT_PAGE = 'Product Page'
export const GET_IN_TOUCH = 'Get In Touch Page'
export const NEWS = 'News And Events'

export const BASIC_HERO_SLUG_AND_TAG = 'basic-hero'
export const BASIC_HERO_BLOCK_LABEL = 'Hero (Basic)'
export const BASIC_HERO_CACHE_KEY = 'basic-hero-data'
export const BASIC_HERO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/basic-hero-block-thumbnail.jpg`

export const PRODUCT_HERO_SLUG_AND_TAG = 'product-hero'
export const PRODUCT_HERO_BLOCK_LABEL = 'Hero (Product)'
export const PRODUCT_HERO_CACHE_KEY = 'product-hero-data'
export const PRODUCT_HERO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-hero-block-thumbnail.jpg`

export const COMPANY_INFO_SLUG_AND_TAG = 'company-info'
export const COMPANY_INFO_BLOCK_LABEL = 'Company Info'
export const COMPANY_INFO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/company-info-block-thumbnail.jpg`

export const COMPANY_INTRO_SLUG_AND_TAG = 'company-intro'
export const COMPANY_INTRO_BLOCK_LABEL = 'Company Introduction'
export const COMPANY_INTRO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/company-intro-block-thumbnail.webp`

export const PROJECT_APPROACH_SLUG_AND_TAG = 'project-approach'
export const PROJECT_APPROACH_BLOCK_LABEL = 'Project Approach'
export const PROJECT_APPROACH_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/project-approach-block-thumbnail.webp`

export const CODING_LANGUAGE_SLUG_AND_TAG = 'coding-language'
export const CODING_LANGUAGE_BLOCK_LABEL = 'Coding Language'
export const CODING_LANGUAGE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/coding-language-block-thumbnail.webp`

export const FOUNDER_QUOTE_SLUG_AND_TAG = 'founder-quote'
export const FOUNDER_QUOTE_BLOCK_LABEL = 'Founder Quote'
export const FOUNDER_QUOTE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/founder-quote-block-thumbnail.webp`

export const PRODUCT_INFO_SLUG_AND_TAG = 'product-info'
export const PRODUCT_INFO_BLOCK_LABEL = 'Product Info'
export const PRODUCT_INFO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-info-block-thumbnail.webp`

export const CONTACT_US_SLUG_AND_TAG = 'contact-us'
export const CONTACT_US_BLOCK_LABEL = 'Contact Us'
export const CONTACT_US_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/contact-us-block-thumbnail.webp`
