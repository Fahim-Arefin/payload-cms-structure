export const HERO_VIDEO_MAX_BYTES = 10 * 1024 * 1024
export const HERO_VIDEO_MIME_TYPES = ['video/mp4', 'video/webm']
export const HERO_VIDEO_DESCRIPTION =
  'Upload an MP4 or WebM video. Maximum file size: 10 MB. Recommended ratio: 1:1 (square), e.g. 1080 × 1080. Other ratios fit without cropping.'

export function validateHeroVideoFile(mimeType?: string | null, size?: number | null) {
  if (!mimeType || !HERO_VIDEO_MIME_TYPES.includes(mimeType)) {
    return 'Please upload an MP4 or WebM video.'
  }
  if (typeof size !== 'number' || size <= 0 || size > HERO_VIDEO_MAX_BYTES) {
    return 'Hero videos must be no larger than 10 MB and must not be empty.'
  }
  return true
}
