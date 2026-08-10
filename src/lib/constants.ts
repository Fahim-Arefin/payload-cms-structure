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
export const CASE_STUDY = 'Case Study Page'
export const GET_IN_TOUCH = 'Get In Touch Page'
export const SOLUTION = 'Solution'
export const NEWS = 'News And Events'

export const BASIC_HERO_SLUG_AND_TAG = 'basic-hero'
export const BASIC_HERO_BLOCK_LABEL = 'Hero (Basic)'
export const BASIC_HERO_CACHE_KEY = 'basic-hero-data'
export const BASIC_HERO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/basic-hero-block-thumbnail.webp`

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

export const CLIENT_SUCCESS_STORIES_SLUG_AND_TAG = 'client-success-stories'
export const CLIENT_SUCCESS_STORIES_BLOCK_LABEL = 'Client Success Stories'
export const CLIENT_SUCCESS_STORIES_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/client-success-stories-block-thumbnail.webp`

export const COMPANY_STATS_SLUG_AND_TAG = 'company-stats'
export const COMPANY_STATS_BLOCK_LABEL = 'Company Stats'
export const COMPANY_STATS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/company-stats-block-thumbnail.webp`

export const EMPLOYEE_SLUG_AND_TAG = 'employee'
export const EMPLOYEE_BLOCK_LABEL = 'Employee'
export const EMPLOYEE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/employee-block-thumbnail.webp`

export const FAQ_SLUG_AND_TAG = 'faq'
export const FAQ_BLOCK_LABEL = 'FAQ'
export const FAQ_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/faq-block-thumbnail.webp`

export const ABOUT_US_INTRO_SLUG_AND_TAG = 'about-us-intro'
export const ABOUT_US_INTRO_BLOCK_LABEL = 'About Us Intro'
export const ABOUT_US_INTRO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/about-us-intro-block-thumbnail.webp`

export const OUR_PROJECT_SLUG_AND_TAG = 'our-project'
export const OUR_PROJECT_BLOCK_LABEL = 'Our Project'
export const OUR_PROJECT_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/our-project-block-thumbnail.webp`

export const CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG = 'cs-collaborative-mobbing'
export const CS_COLLABORATIVE_MOBBING_BLOCK_LABEL = 'CS Collaborative Mobbing'
export const CS_COLLABORATIVE_MOBBING_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/cs-collaborative-mobbing-block-thumbnail.webp`

export const CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG = 'cs-collaboration-protocal'
export const CS_COLLABORATION_PROTOCAL_BLOCK_LABEL = 'CS Collaboration Protocal'
export const CS_COLLABORATION_PROTOCAL_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/cs-collaboration-protocal-block-thumbnail.webp`

export const CS_DELIVERY_SLUG_AND_TAG = 'cs-delivery'
export const CS_DELIVERY_BLOCK_LABEL = 'CS Delivery'
export const CS_DELIVERY_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/cs-delivery-block-thumbnail.webp`

export const BOOK_A_CALL_SLUG_AND_TAG = 'book-a-call'
export const BOOK_A_CALL_BLOCK_LABEL = 'Book A Call'
export const BOOK_A_CALL_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/book-a-call-block-thumbnail.webp`

export const CONTACT_INFO_SLUG_AND_TAG = 'contact-info'
export const CONTACT_INFO_BLOCK_LABEL = 'Contact Info'
export const CONTACT_INFO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/contact-info-block-thumbnail.webp`

export const LOCATION_SLUG_AND_TAG = 'location'
export const LOCATION_BLOCK_LABEL = 'Location'
export const LOCATION_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/location-block-thumbnail.webp`

export const RATING_SLUG_AND_TAG = 'rating'
export const RATING_BLOCK_LABEL = 'Rating'
export const RATING_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/rating-block-thumbnail.webp`

export const CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG = 'cs-development-framework'
export const CS_DEVELOPMENT_FRAMEWORK_BLOCK_LABEL = 'CS Development Framework'
export const CS_DEVELOPMENT_FRAMEWORK_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/cs-development-framework-block-thumbnail.webp`

export const MAINTENANCE_SLUG_AND_TAG = 'maintenance'
export const MAINTENANCE_BLOCK_LABEL = 'Maintenance'
export const MAINTENANCE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/maintenance-block-thumbnail.webp`

export const COLLABORATIVE_METHOD_SLUG_AND_TAG = 'collaborative-method'
export const COLLABORATIVE_METHOD_BLOCK_LABEL = 'Collaborative Method'
export const COLLABORATIVE_METHOD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/collaborative-method-block-thumbnail.webp`

export const WHY_CHOOSE_US_SLUG_AND_TAG = 'why-choose-us'
export const WHY_CHOOSE_US_BLOCK_LABEL = 'Why Choose Us'
export const WHY_CHOOSE_US_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/why-choose-us-block-thumbnail.webp`

export const PRODUCTION_PIPELINE_SLUG_AND_TAG = 'production-pipeline'
export const PRODUCTION_PIPELINE_BLOCK_LABEL = 'Production Pipeline'
export const PRODUCTION_PIPELINE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/production-pipeline-block-thumbnail.webp`

export const WHAT_WE_BUILD_SLUG_AND_TAG = 'what-we-build'
export const WHAT_WE_BUILD_BLOCK_LABEL = 'What We Build'
export const WHAT_WE_BUILD_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/what-we-build-block-thumbnail.webp`
