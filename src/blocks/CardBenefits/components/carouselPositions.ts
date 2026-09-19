/** A single circular orbit through three fixed card-center positions. */
export function carouselPosition(index: number, progress: number, count: number, aspect = 1.33) {
  const phase = (((index - progress) % count) + count) % count
  const sideX = 0.415
  const centerDrop = 0.45 * aspect
  const radius = (sideX * sideX + centerDrop * centerDrop) / (2 * centerDrop)
  const sideAngle = Math.acos(1 - centerDrop / radius)
  // Unequal angular intervals preserve the exact front / lower-right / lower-left layout.
  let angle: number
  if (phase <= 1) angle = phase * sideAngle
  else if (phase <= 2) angle = sideAngle + (phase - 1) * (2 * Math.PI - 2 * sideAngle)
  else angle = 2 * Math.PI - sideAngle + ((phase - 2) / (count - 2)) * sideAngle
  const depth = (1 - Math.cos(angle)) / (1 - Math.cos(sideAngle))
  const scale = 1 - 0.35 * depth
  const centerY = aspect / 2 + radius * (1 - Math.cos(angle))
  const alpha = Math.max(0, 1 - (phase - 2) * 2, 1 - (count - phase) * 2)
  // For longer lists, only the front and its two immediate successors occupy visible slots.
  const visibility = count <= 3 || phase <= 2 ? 1 : alpha
  return {
    xPercent: 100 * radius * Math.sin(angle),
    yPercent: (100 * (centerY - (aspect * scale) / 2)) / aspect,
    scale,
    rotation: 0,
    autoAlpha: visibility,
    zIndex: Math.round((2 - depth) * 100),
    panelAlpha: Math.max(0, 1 - depth),
  }
}
