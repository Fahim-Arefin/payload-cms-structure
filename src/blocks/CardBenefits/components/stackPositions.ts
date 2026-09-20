export function benefitStackPosition(
  index: number,
  active: number,
  count: number,
  desktop: boolean,
  visibleCount: 3 | 4 | 5 = 3,
) {
  const depth = (index - active + count) % count
  const fiveCards = desktop && visibleCount === 5 && count >= 5
  const fourCards = desktop && visibleCount >= 4 && count >= 4
  const limit = fiveCards ? 5 : fourCards ? 4 : 3
  const scales = fiveCards
    ? [1, 0.84, 0.68, 0.53, 0.4]
    : fourCards
      ? [1, 0.8, 0.62, 0.46]
      : [1, 0.72, 0.5]
  const offsetsX = fiveCards
    ? [0, 0.88, 1.62, 2.2, 2.65]
    : fourCards
      ? [0, 0.88, 1.58, 2.12]
      : [0, 0.96, 1.62]
  const offsetsY = fiveCards
    ? [0, 0.12, 0.24, 0.34, 0.43]
    : fourCards
      ? [0, 0.15, 0.28, 0.39]
      : [0, 0.23, 0.37]
  const slot = Math.min(depth, limit - 1)
  return {
    depth,
    scale: desktop ? scales[slot] : [1, 0.96, 0.9][slot],
    x: desktop ? offsetsX[slot] : 0,
    y: desktop ? offsetsY[slot] : [36, 18, 0][slot],
    rotation: desktop || depth === 0 ? 0 : depth === 1 ? 2 : -2,
    autoAlpha: depth < limit ? 1 : 0,
    zIndex: count - depth,
  }
}
