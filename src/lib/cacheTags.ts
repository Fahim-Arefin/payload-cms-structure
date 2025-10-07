// src/lib/cacheTags.ts
export const pageTag = (slug: string) => `page:${slug}` // e.g. page:index, page:about
export const pagesListTag = 'pages:list' // (optional) for listing/pattern queries
export const globalTag = (name: string) => `global:${name}` // e.g. global:global-navbar
