/** Keep the two-card composition; cap larger stacks at three visible cards. */
export function getCardStackPose(
  index: number,
  activeIndex: number,
  count: number,
  mobile: boolean,
) {
  const active = index === activeIndex
  const depth = (index - activeIndex + count) % count
  if (count <= 2) {
    return {
      rotation: count === 1 ? 0 : index === 0 ? -5 : 5,
      xPercent:
        count === 1 ? 0 : active ? (activeIndex === 0 ? -8 : -5) : activeIndex === 0 ? 18 : 15,
      yPercent: count === 1 ? 0 : active ? (mobile ? -2 : -3) : mobile ? 3 : 4,
      scale: 1,
      autoAlpha: active ? 1 : 0.72,
      filter: active ? 'brightness(1)' : 'brightness(0.78)',
      zIndex: active ? 20 : 10,
    }
  }
  return {
    rotation: active ? -5 : Math.min(depth, 2) * 6,
    xPercent: active ? -12 : Math.min(depth, 2) * 14,
    yPercent: active ? -3 : Math.min(depth, 2) * 4,
    scale: 1,
    autoAlpha: depth > 2 ? 0 : active ? 1 : depth === 1 ? 0.72 : 0.5,
    filter: active ? 'brightness(1)' : 'brightness(0.78)',
    zIndex: count - depth,
  }
}
