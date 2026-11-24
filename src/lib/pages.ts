import { BASE } from './brand'

export type Page = 'home' | 'about' | 'visit'

// Each HTML file (index.html, about/, visit/) names its page on #root.
export const currentPage = (): Page => (document.getElementById('root')?.dataset.page as Page) ?? 'home'

// Links that work under any deploy base ('/' or '/repo/').
export const pageUrl = (page: Page, hash = '') => `${BASE}${page === 'home' ? '' : `${page}/`}${hash}`

// A #section the visitor arrived with (e.g. "Menu" clicked on the About page). main.tsx strips
// it from the address bar so the browser doesn't jump; the app scrolls there itself.
export let arrivalHash = ''
export const setArrivalHash = (h: string) => {
  arrivalHash = h
}

// The door intro plays whenever the site is opened or reloaded. It is skipped only when the
// visitor walks over from another page of the site (About → Home) or comes back with the
// browser's Back button: they've already been through the doors.
export function shouldPlayIntro() {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (nav?.type === 'reload') return true
  if (nav?.type === 'back_forward') return false
  try {
    return !document.referrer || new URL(document.referrer).origin !== location.origin
  } catch {
    return true
  }
}
