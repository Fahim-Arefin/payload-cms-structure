type CardChoice = { cardKey: string }

export function normalizeCardKey(value?: string | null): string {
  const key = (value ?? '').trim().replace(/^#/, '')
  try {
    return decodeURIComponent(key)
  } catch {
    return key
  }
}

export function resolveCardKey(
  cards: readonly CardChoice[],
  hash: string | null | undefined,
  previousKey?: string | null,
  defaultKey?: string | null,
): string | null {
  const keys = new Set(cards.map((card) => card.cardKey))
  const fallback = defaultKey && keys.has(defaultKey) ? defaultKey : (cards[0]?.cardKey ?? null)
  if (hash === '') return fallback
  const requested = normalizeCardKey(hash)
  if (keys.has(requested)) return requested
  return previousKey && keys.has(previousKey) ? previousKey : fallback
}

export function validateCardKey(value: unknown): true | string {
  return typeof value === 'string' && /^[a-zA-Z][a-zA-Z0-9-]{0,79}$/.test(value)
    ? true
    : 'Enter a key starting with a letter, using only letters, numbers and hyphens (max 80 characters). Do not include #.'
}

export function validateCardChoices(value: unknown): true | string {
  if (!Array.isArray(value) || value.length === 0) return 'Add at least one card.'
  const keys = new Set<string>()
  for (const card of value) {
    const key = card?.cardKey
    const valid = validateCardKey(key)
    if (valid !== true) return valid
    if (keys.has(key)) return `Card key "${key}" is used more than once in this block.`
    keys.add(key)
  }
  return true
}

export function validateDefaultCardKey(value: unknown, cards: unknown): true | string {
  if (value == null || value === '') return true
  return Array.isArray(cards) && cards.some((card) => card?.cardKey === value)
    ? true
    : 'Default card key must match one of the cards in this block.'
}
