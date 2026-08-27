import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App.jsx'
import './index.css'

// Prerendered (SSG) entry. `vite-react-ssg build` renders every static route in
// `routes` to real HTML with its own <head> (title, meta, canonical, OG, JSON-LD),
// so crawlers — including AI crawlers that don't run JS — see a full page on first
// byte. In the browser this same export hydrates the app.
//
// The edit-bridge import that used to sit here now lives in Layout's effect: at
// module scope it would run during the prerender, where `window` is undefined.
export const createRoot = ViteReactSSG({ routes })
