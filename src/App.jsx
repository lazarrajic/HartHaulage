import Layout from './Layout.jsx'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Route table (react-router v6 data-route shape, consumed by vite-react-ssg).
// Paths must match the `to` values in content.js `nav_links`. Every non-dynamic
// child path here is prerendered to its own static HTML file at build time; the
// `*` catch-all is client-only (served via the netlify.toml SPA fallback).
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'terms', element: <Terms /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
