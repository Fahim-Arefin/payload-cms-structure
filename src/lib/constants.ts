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
export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'navbar'
export const GLOBAL_NAVBAR_LABEL = 'Navbar'

// Global Footer
export const GLOBAL_FOOTER_SLUG_AND_TAG = 'footer' as const
export const GLOBAL_FOOTER_CACHE_KEY = 'footer-data'

// articles
// ================================================================================
// ================================================================================
// export const ARTICLES = 'Articles'
// export const GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG = 'article-tags'
// export const GLOBAL_ARTICLE_SLUG_AND_TAG = 'articles'

// export const ALL_ARTICLE_SLUG_AND_TAG = 'all-article'
// export const ALL_ARTICLE_BLOCK_LABEL = 'All Article'
// export const ALL_ARTICLE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/all-article-block-thumbnail.webp`

// export const SINGLE_ARTICLE_SLUG_AND_TAG = 'single-article'
// export const SINGLE_ARTICLE_BLOCK_LABEL = 'Single Article'
// export const SINGLE_ARTICLE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/single-article-block-thumbnail.webp`

// export const RELATED_ARTICLE_SLUG_AND_TAG = 'related-article'
// export const RELATED_ARTICLE_BLOCK_LABEL = 'Related Article'
// export const RELATED_ARTICLE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/related-article-block-thumbnail.webp`

// export const FEATURED_ARTICLE_SLUG_AND_TAG = 'featured-article'
// export const FEATURED_ARTICLE_BLOCK_LABEL = 'Featured Article'
// export const FEATURED_ARTICLE_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/featured-article-block-thumbnail.webp`
// ================================================================================
// ================================================================================

// news
// ================================================================================
// ================================================================================
// export const NEWS = 'News'
// export const GLOBAL_NEWS_TAGS_SLUG_AND_TAG = 'news-tags'
// export const GLOBAL_NEWS_SLUG_AND_TAG = 'news'

// export const ALL_NEWS_SLUG_AND_TAG = 'all-news'
// export const ALL_NEWS_BLOCK_LABEL = 'All News'
// export const ALL_NEWS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/all-news-block-thumbnail.webp`

// export const SINGLE_NEWS_SLUG_AND_TAG = 'single-news'
// export const SINGLE_NEWS_BLOCK_LABEL = 'Single News'
// export const SINGLE_NEWS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/single-news-block-thumbnail.webp`

// export const RELATED_NEWS_SLUG_AND_TAG = 'related-news'
// export const RELATED_NEWS_BLOCK_LABEL = 'Related News'
// export const RELATED_NEWS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/related-news-block-thumbnail.webp`

// export const FEATURED_NEWS_SLUG_AND_TAG = 'featured-news'
// export const FEATURED_NEWS_BLOCK_LABEL = 'Featured News'
// export const FEATURED_NEWS_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/featured-news-block-thumbnail.webp`
// ================================================================================
// ================================================================================

// audit
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
export const PRODUCT = 'Product'
export const SERVICE = 'Service'

export const INTRO_HERO_SLUG_AND_TAG = 'introHero'
export const INTRO_HERO_BLOCK_LABEL = 'Intro Hero'
export const INTRO_HERO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/intro-hero-block-thumbnail.png`

export const CARD_INFO_SLUG_AND_TAG = 'cardInfo'
export const CARD_BENEFITS_SLUG_AND_TAG = 'cardBenefits'
export const CARD_INFO_BLOCK_LABEL = 'Card Info'
export const CARD_INFO_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/card-info-block-thumbnail.webp`

export const CARD_PRIVILEGES_SLUG_AND_TAG = 'cardPrivileges'
export const CARD_PRIVILEGES_BLOCK_LABEL = 'Card Privileges'
export const CARD_PRIVILEGES_BLOCK_THUMBNAIL_URL = `${thumbnailFolder}/card-privileges-block-thumbnail.webp`
