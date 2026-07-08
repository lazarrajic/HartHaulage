import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Pubd visual editor: when this site is framed by the CMS with ?pubd-edit, load
// the edit bridge (dynamic import — normal visitors never download a byte of it).
if (window.self !== window.top && new URLSearchParams(window.location.search).has('pubd-edit')) {
  import('./pubd-edit-bridge.js')
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
