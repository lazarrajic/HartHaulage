import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Schema from './components/Schema'

// Scroll reset on route change. Guarded for SSG: this renders on the server during
// the prerender, where `window` does not exist.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// The shared shell wrapping every route (was App's Layout). Owns the site-wide
// JSON-LD so it ships inside every prerendered page rather than being injected by
// a client-side effect a crawler may never run.
export default function Layout() {
  // Pubd visual-editor bridge — client-only, and deliberately inside an effect
  // rather than at module scope so it never executes during SSG.
  useEffect(() => {
    if (window.self !== window.top && new URLSearchParams(window.location.search).has('pubd-edit')) {
      import('./pubd-edit-bridge.js')
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <Schema />
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
