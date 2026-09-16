export const INTRO_STORAGE_KEY = 'xynolab-home-intro-loader-v1'
export const INTRO_READY_EVENT = 'xynolab:home-ready'
export const INTRO_DISMISSED_EVENT = 'xynolab:home-intro-dismissed'
export const INTRO_VIDEO_SRC = '/assets/videos/xynolabLoader.webm'
export const INTRO_MAX_DURATION = 15000

export const isHomePath = (pathname: string) => /^\/(?:index\/?)?$/.test(pathname)

declare global {
  interface Window {
    __xynolabIntroSeen?: boolean
    __xynolabIntroTimer?: number
  }
}

// Runs in the initial head, before content can paint or React hydrates.
// The timeout also releases the page if the client bundle fails to load.
export const introBootstrap = `(() => {
  if (!/^\\/(?:index\\/?)?$/.test(location.pathname)) return;
  try {
    if (sessionStorage.getItem('${INTRO_STORAGE_KEY}') === '1') return;
    sessionStorage.setItem('${INTRO_STORAGE_KEY}', '1');
  } catch (_) {}
  window.__xynolabIntroSeen = true;
  document.documentElement.setAttribute('data-home-intro', 'active');
  window.__xynolabIntroTimer = window.setTimeout(() => {
    document.documentElement.removeAttribute('data-home-intro');
    window.dispatchEvent(new Event('${INTRO_DISMISSED_EVENT}'));
  }, ${INTRO_MAX_DURATION});
})();`

// Discover/start the video as soon as its HTML arrives, without waiting for hydration.
export const introVideoBootstrap = `(() => {
  if (document.documentElement.getAttribute('data-home-intro') !== 'active') return;
  const video = document.getElementById('home-intro-video');
  if (video) {
    video.muted = true;
    video.src = '${INTRO_VIDEO_SRC}';
    video.play().catch(() => {});
  }
})();`
