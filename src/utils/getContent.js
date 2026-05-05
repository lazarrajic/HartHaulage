import staticContent from '../content.js'

export { staticContent }

export function getContent() {
  try {
    const stored = localStorage.getItem('cms_content')
    if (stored) return JSON.parse(stored)
  } catch {}
  return staticContent
}
