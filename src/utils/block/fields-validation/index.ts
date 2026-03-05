export const validateSectionIdOptional = (val: unknown) => {
  const raw = String(val ?? '')

  // required
  if (!raw.trim()) {
    return true // optional
  }

  // no leading/trailing spaces
  if (raw !== raw.trim()) {
    return 'Section ID must not have leading or trailing spaces.'
  }

  const s = raw.trim()

  // no spaces at all
  if (/\s/.test(s)) {
    return 'No spaces allowed. Use "-" to separate words (e.g., "blog-section", not "blog section").'
  }

  // allowed chars: letters, numbers, hyphen
  if (!/^[A-Za-z0-9-]+$/.test(s)) {
    return 'Section ID can only contain letters, numbers, and hyphens (e.g., "blog-section").'
  }

  return true
}

export const validateShortText =
  (label: string, max: number, required = false) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    return true
  }

/** require highlight text to be a substring of a sibling text field */
export const validateHighlightedInField =
  (label: string, targetField: string, max: number, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    return target.includes(s) ? true : `${label} must exist within ${targetField} exactly.`
  }

/** Absolute http(s) URL and must be a YouTube host. */
export const validateYouTubeUrl =
  (max: number, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'YouTube URL is required.'
    if (!link) return true
    if (link.length > max) return `YouTube URL must be at most ${max} characters.`
    try {
      const u = new URL(link)
      const host = u.hostname.toLowerCase()
      const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
      const isYouTube =
        host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')
      if (!isHttp) return 'URL must be http(s).'
      if (!isYouTube) return 'Please enter a valid YouTube URL.'
      return true
    } catch {
      return 'Provide a valid absolute http(s) YouTube URL.'
    }
  }

export const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}
