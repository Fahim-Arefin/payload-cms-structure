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

export const GLOBAL_FOOTER_SLUG_AND_TAG = 'footer' as const
export const GLOBAL_FOOTER_CACHE_KEY = 'footer-data'

export const AUDIT_LOG = 'Audit'

// Group
export const HERO_BLOCKS = 'Hero Blocks'
export const COMMON = 'Common Blocks'
export const FORMS = 'Forms'
export const HOME_PAGE = 'Home Page'
export const ABOUT_US = 'About Us Page'
export const PRODUCT_PAGE = 'Product Page'
export const GET_IN_TOUCH = 'Get In Touch Page'

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

// Product Advantage Card
export const TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG = 'technical-specifications'
export const TECHNICAL_SPECIFICATIONS_BLOCK_LABEL = 'Technical Specifications'
export const TECHNICAL_SPECIFICATIONS_CACHE_KEY = 'technical-specifications-data'
export const TECHNICAL_SPECIFICATIONS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/technical-specifications-block-thumbnail.jpg`

// Queries
export const QUERIES_SLUG_AND_TAG = 'queries'
export const QUERIES_BLOCK_LABEL = 'Queries'
export const QUERIES_CACHE_KEY = 'queries-data'
export const QUERIES_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/queries-block-thumbnail.jpg`

// Product info 01
export const PRODUCT_INFO_01_SLUG_AND_TAG = 'product-info-01'
export const PRODUCT_INFO_01_BLOCK_LABEL = 'Product Info 01'
export const PRODUCT_INFO_01_CACHE_KEY = 'product-info-01-data'
export const PRODUCT_INFO_01_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-info-01-block-thumbnail.jpg`

// Performance and Application Card
export const PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG = 'performance-and-application-card'
export const PERFORMANCE_AND_APPLICATION_CARD_BLOCK_LABEL = 'Performance and Application Card'
export const PERFORMANCE_AND_APPLICATION_CARD_CACHE_KEY = 'performance-and-application-card-data'
export const PERFORMANCE_AND_APPLICATION_CARD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/performance-and-application-card-block-thumbnail.jpg`

// Performance and Application Card
export const TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG = 'technical-datasheet-card'
export const TECHNICAL_DATASHHEET_CARD_BLOCK_LABEL = 'Technical Datasheet Card'
export const TECHNICAL_DATASHHEET_CARD_CACHE_KEY = 'technical-datasheet-card-data'
export const TECHNICAL_DATASHHEET_CARD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/technical-datasheet-card-block-thumbnail.jpg`

// Quality Benchmark Card
export const QUALITY_BENCHMARK_CARD_SLUG_AND_TAG = 'quality-benchmark-card'
export const QUALITY_BENCHMARK_CARD_BLOCK_LABEL = 'Quality Benchmark Card'
export const QUALITY_BENCHMARK_CARD_CACHE_KEY = 'quality-benchmark-card-data'
export const QUALITY_BENCHMARK_CARD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/quality-benchmark-card-block-thumbnail.jpg`

// Quality Benchmark Card
export const CONTACT_INFO_CARD_SLUG_AND_TAG = 'contact-info-card'
export const CONTACT_INFO_CARD_BLOCK_LABEL = 'Contact Info Card'
export const CONTACT_INFO_CARD_CACHE_KEY = 'contact-info-card-data'
export const CONTACT_INFO_CARD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/contact-info-card-block-thumbnail.jpg`

// Founder Quote
export const FOUNDER_QUOTE_SLUG_AND_TAG = 'founder-quote'
export const FOUNDER_QUOTE_BLOCK_LABEL = 'Founder Quote'
export const FOUNDER_QUOTE_CACHE_KEY = 'founder-quote-data'
export const FOUNDER_QUOTE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/founder-quote-block-thumbnail.jpg`

// Founder Quote
export const RESULT_CARD_SLUG_AND_TAG = 'result-card'
export const RESULT_CARD_BLOCK_LABEL = 'Result Card'
export const RESULT_CARD_CACHE_KEY = 'result-card-data'
export const RESULT_CARD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/result-card-block-thumbnail.jpg`

// Founder Quote
export const SAGAR_VIDEOS_SLUG_AND_TAG = 'sagar-videos'
export const SAGAR_VIDEOS_BLOCK_LABEL = 'Sagar Videos'
export const SAGAR_VIDEOS_CACHE_KEY = 'sagar-videos-data'
export const SAGAR_VIDEOS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/sagar-videos-block-thumbnail.jpg`

// Product info 02
export const PRODUCT_INFO_02_SLUG_AND_TAG = 'product-info-02'
export const PRODUCT_INFO_02_BLOCK_LABEL = 'Product Info 02'
export const PRODUCT_INFO_02_CACHE_KEY = 'product-info-02-data'
export const PRODUCT_INFO_02_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-info-02-block-thumbnail.jpg`

// Product info 03
export const PRODUCT_INFO_03_SLUG_AND_TAG = 'product-info-03'
export const PRODUCT_INFO_03_BLOCK_LABEL = 'Product Info 03'
export const PRODUCT_INFO_03_CACHE_KEY = 'product-info-03-data'
export const PRODUCT_INFO_03_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-info-03-block-thumbnail.jpg`

// Product info 04
export const PRODUCT_INFO_04_SLUG_AND_TAG = 'product-info-04'
export const PRODUCT_INFO_04_BLOCK_LABEL = 'Product Info 04'
export const PRODUCT_INFO_04_CACHE_KEY = 'product-info-04-data'
export const PRODUCT_INFO_04_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/product-info-04-block-thumbnail.jpg`

// office-address
export const OFFICE_ADDRESS_SLUG_AND_TAG = 'office-address'
export const OFFICE_ADDRESS_BLOCK_LABEL = 'Office Address'
export const OFFICE_ADDRESS_CACHE_KEY = 'office-address-data'
export const OFFICE_ADDRESS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/office-address-block-thumbnail.jpg`

// feedback-form
export const FEEDBACK_FORM_SLUG_AND_TAG = 'feedback-form'
export const FEEDBACK_FORM_BLOCK_LABEL = 'Review Form'
export const FEEDBACK_FORM_CACHE_KEY = 'feedback-form-data'
export const FEEDBACK_FORM_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/feedback-form-block-thumbnail.jpg`

// query-form
export const QUERY_FORM_SLUG_AND_TAG = 'query-form'
export const QUERY_FORM_BLOCK_LABEL = 'Query Form'
export const QUERY_FORM_CACHE_KEY = 'query-form-data'
export const QUERY_FORM_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/query-form-block-thumbnail.jpg`

// Product info 03
export const CUSTOMER_FEEDBACK_SLUG_AND_TAG = 'customer-feedback'
export const CUSTOMER_FEEDBACK_BLOCK_LABEL = 'Customer Review'
export const CUSTOMER_FEEDBACK_CACHE_KEY = 'customer-feedback-data'
export const CUSTOMER_FEEDBACK_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/customer-feedback-block-thumbnail.jpg`
