import { useState, useEffect } from 'react'
import { getContent, staticContent } from '../utils/getContent'
import './admin.css'

const STORAGE_KEY = 'cms_content'
const HISTORY_KEY = 'cms_history'
const USAGE_KEY   = 'cms_usage'
const MAX_MONTHLY = 15

const SYSTEM_PROMPT = `You are a website content editor for Hart Haulage Ltd, a professional bulk haulage and logistics company in New Zealand. You will be given the current content object of the website and a plain English request from the business owner. You must return ONLY a valid JavaScript object in the exact same structure as the input content object, with only the requested content changed. Never change field names, never add or remove fields, never modify image URLs unless explicitly asked, never change anything structural. If the request is not clearly a content change return the original object completely unchanged. Return only the raw JavaScript object with no explanation, no markdown, no backticks. Additional rules: Never include profanity, offensive content, or competitor references. Never include pricing unless it already exists as a field. Keep all output professional and appropriate for a transport and logistics business.`

const GROUPS = [
  { page: 'Header', sections: [
    { label: 'Brand',      keys: ['logo', 'company_name'] },
    { label: 'Navigation', keys: ['nav_links', 'nav_cta'] },
  ]},
  { page: 'Home', sections: [
    { label: 'Hero',             keys: ['home_hero_image', 'home_hero_region', 'home_hero_heading', 'home_hero_sub', 'home_hero_cta1', 'home_hero_cta2'] },
    { label: 'Stats',            keys: ['home_stats'] },
    { label: 'About Section',    keys: ['home_about_label', 'home_about_heading', 'home_about_body', 'home_about_cta', 'home_about_image', 'home_about_badge'] },
    { label: 'Services Section', keys: ['home_services_label', 'home_services_heading', 'home_services_cta', 'home_services'] },
    { label: 'Why Pink',         keys: ['home_whypink_heading', 'home_whypink_body'] },
    { label: 'Gallery Section',  keys: ['home_gallery_heading', 'home_gallery_link', 'home_gallery_cta', 'home_gallery_photos'] },
    { label: 'CTA Banner',       keys: ['home_cta_heading', 'home_cta_body', 'home_cta_button'] },
  ]},
  { page: 'Services', sections: [
    { label: 'Page Hero',   keys: ['services_hero_title', 'services_hero_subtitle', 'services_hero_image', 'services_hero_accent'] },
    { label: 'Section',     keys: ['services_section_label', 'services_section_heading', 'services_section_sub', 'services_enquire_cta'] },
    { label: 'Service List', keys: ['services'] },
    { label: 'CTA',         keys: ['services_cta_heading', 'services_cta_body', 'services_cta_button'] },
  ]},
  { page: 'About', sections: [
    { label: 'Page Hero',      keys: ['about_hero_title', 'about_hero_subtitle', 'about_hero_image', 'about_hero_accent'] },
    { label: 'Our Story',      keys: ['about_story_label', 'about_story_heading', 'about_story_p1', 'about_story_p2', 'about_story_p3', 'about_story_image'] },
    { label: 'Mission',        keys: ['about_mission_label', 'about_mission_quote'] },
    { label: 'Accreditations', keys: ['about_certs_label', 'about_certs_heading', 'about_certs'] },
    { label: 'Team',           keys: ['about_team_label', 'about_team_heading', 'team'] },
    { label: 'CTA',            keys: ['about_cta_heading', 'about_cta_body', 'about_cta_button'] },
  ]},
  { page: 'Projects', sections: [
    { label: 'Page Hero', keys: ['projects_hero_title', 'projects_hero_subtitle', 'projects_hero_image', 'projects_hero_accent'] },
    { label: 'Section',   keys: ['projects_section_label', 'projects_section_heading', 'projects_section_sub'] },
    { label: 'Projects',  keys: ['projects'] },
    { label: 'CTA',       keys: ['projects_cta_heading', 'projects_cta_body', 'projects_cta_button'] },
  ]},
  { page: 'Gallery', sections: [
    { label: 'Page Hero', keys: ['gallery_hero_title', 'gallery_hero_subtitle', 'gallery_hero_image', 'gallery_hero_accent'] },
    { label: 'Filters',   keys: ['gallery_filters'] },
    { label: 'Photos',    keys: ['gallery_photos'] },
  ]},
  { page: 'Topsoil', sections: [
    { label: 'Page Hero',     keys: ['topsoil_hero_title', 'topsoil_hero_subtitle', 'topsoil_hero_image', 'topsoil_hero_accent'] },
    { label: 'Offer',         keys: ['topsoil_offer_label', 'topsoil_offer_heading', 'topsoil_offer_body', 'topsoil_offer_image', 'topsoil_features'] },
    { label: 'Screening',     keys: ['topsoil_screening_label', 'topsoil_screening_heading', 'topsoil_screening_body'] },
    { label: 'Order Process', keys: ['topsoil_order_label', 'topsoil_order_heading', 'topsoil_steps'] },
    { label: 'CTA',           keys: ['topsoil_cta_heading', 'topsoil_cta_body', 'topsoil_cta_button'] },
  ]},
  { page: 'Contact', sections: [
    { label: 'Page Hero', keys: ['contact_hero_title', 'contact_hero_subtitle', 'contact_hero_image', 'contact_hero_accent'] },
    { label: 'Team',      keys: ['contact_team_label', 'contact_team_heading'] },
    { label: 'Form',      keys: ['contact_form_label', 'contact_form_heading', 'contact_form_button', 'contact_form_fields', 'contact_service_label', 'contact_service_placeholder', 'contact_message_label', 'contact_message_placeholder', 'contact_services'] },
    { label: 'Depots',    keys: ['contact_depots_label', 'contact_depots_heading', 'contact_depots'] },
    { label: 'Success',   keys: ['contact_success_heading', 'contact_success_body'] },
  ]},
  { page: 'Footer', sections: [
    { label: 'Brand',          keys: ['footer_tagline', 'footer_badge', 'footer_credits'] },
    { label: 'Auckland Depot', keys: ['footer_auckland_heading', 'footer_auckland_address', 'footer_auckland_phone', 'footer_auckland_email'] },
    { label: 'Hamilton Depot', keys: ['footer_hamilton_heading', 'footer_hamilton_address', 'footer_hamilton_phone', 'footer_hamilton_email'] },
  ]},
]

const C = {
  pageBg:       '#0b0f1a',
  sidebarBg:    '#080c16',
  surface:      '#131c2e',
  surfaceHover: '#1a2540',
  border:       '#1e293b',
  borderMid:    '#334155',
  text:         '#f1f5f9',
  text2:        '#94a3b8',
  text3:        '#475569',
  accent:       '#ec4899',
  accentDark:   '#be185d',
  red:          '#f87171',
  amber:        '#fbbf24',
  font:         "-apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
}

function usageAccent(pct) {
  if (pct < 0.5) return C.accent
  if (pct < 0.8) return C.amber
  return C.red
}

function getUsage() {
  try {
    const d = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}')
    const m = new Date().toISOString().slice(0, 7)
    if (d.month !== m) return { count: 0, month: m }
    return d
  } catch { return { count: 0, month: new Date().toISOString().slice(0, 7) } }
}
function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') }
  catch { return [] }
}
async function callClaude(prompt, content) {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!key) throw new Error('VITE_ANTHROPIC_API_KEY is not set.')
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001', max_tokens: 4096, system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Here is the current content object: ${JSON.stringify(content)}. The client wants to make the following change: ${prompt}` }],
    }),
  })
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || `API error (${res.status})`) }
  return (await res.json()).content[0].text
}
function parseResponse(text) {
  const s = text.trim().replace(/^```(?:json|javascript|js)?\s*\n?/, '').replace(/\n?```\s*$/, '').trim()
  try { return JSON.parse(s) } catch {}
  try { return new Function('return (' + s + ')')() } catch {}
  throw new Error('AI returned an unparseable response. Please try again.')
}
function validateKeys(orig, upd) {
  if (Object.keys(orig).sort().join() !== Object.keys(upd).sort().join())
    throw new Error('AI response has unexpected structure — content not applied.')
}

function UsageGauge({ count, max }) {
  const pct  = Math.min(count / max, 1)
  const r    = 20
  const circ = 2 * Math.PI * r
  const col  = usageAccent(pct)
  return (
    <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
      <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="#1e293b" strokeWidth="4" />
        <circle cx="28" cy="28" r={r} fill="none" stroke={col} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,0,.2,1), stroke 0.5s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: col, fontSize: 14, fontWeight: 700, lineHeight: 1 }}>{count}</span>
        <span style={{ color: C.text3, fontSize: 9, lineHeight: 1, marginTop: 1 }}>/{max}</span>
      </div>
    </div>
  )
}

function Toast({ toast, onRemove }) {
  const [out, setOut] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 3200)
    const t2 = setTimeout(() => onRemove(toast.id), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  const ok = toast.ok
  return (
    <div className={out ? 'toast-out' : 'toast-in'} style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
      borderRadius: 12, minWidth: 280, maxWidth: 360,
      background: ok ? '#0d2818' : '#1f0f0f',
      border: `1px solid ${ok ? '#166534' : '#7f1d1d'}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
        background: ok ? '#14532d' : '#450a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {ok
          ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round"/></svg>
        }
      </div>
      <p style={{ color: ok ? '#86efac' : '#fca5a5', fontSize: 13, lineHeight: 1.5 }}>{toast.msg}</p>
    </div>
  )
}

function FieldValue({ val }) {
  if (typeof val === 'string') {
    return <span style={{ color: C.text, fontSize: 13, lineHeight: 1.6 }}>{val}</span>
  }
  if (Array.isArray(val)) {
    if (!val.length) return <span style={{ color: C.text3, fontStyle: 'italic', fontSize: 13 }}>Empty</span>
    if (typeof val[0] === 'string') return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {val.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ color: C.borderMid, fontSize: 12, marginTop: 2, flexShrink: 0 }}>–</span>
            <span style={{ color: C.text2, fontSize: 13, lineHeight: 1.5 }}>{s}</span>
          </div>
        ))}
      </div>
    )
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {val.map((obj, i) => (
          <div key={i} style={{ background: '#0b0f1a', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.entries(obj).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: C.accent, fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', width: 60, flexShrink: 0, paddingTop: 2 }}>{k}</span>
                <span style={{ color: C.text2, fontSize: 12, lineHeight: 1.5 }}>{typeof v === 'string' ? v : JSON.stringify(v)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
  if (typeof val === 'object' && val !== null) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {Object.entries(val).map(([k, v]) => (
        <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ color: C.accent, fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', width: 72, flexShrink: 0, paddingTop: 2 }}>{k}</span>
          <span style={{ color: C.text2, fontSize: 13 }}>{String(v)}</span>
        </div>
      ))}
    </div>
  )
  return <span style={{ color: C.text, fontSize: 13 }}>{String(val)}</span>
}

function PageGroup({ group, content }) {
  const [open, setOpen] = useState(false)
  const total = group.sections.reduce((n, s) => n + s.keys.length, 0)
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', background: C.surface }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: C.text, fontSize: 14, fontWeight: 500 }}>{group.page}</span>
          <span style={{ color: C.text3, fontSize: 11, background: C.border, borderRadius: 20, padding: '2px 10px' }}>
            {total} {total === 1 ? 'field' : 'fields'}
          </span>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="section-open" style={{ borderTop: `1px solid ${C.border}` }}>
          {group.sections.map((section, si) => (
            <div key={section.label} style={{ padding: '20px 24px', borderBottom: si < group.sections.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <p style={{ color: C.text3, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                {section.label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {section.keys.map((key, ki) => (
                  <div key={key} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '12px 0', borderBottom: ki < section.keys.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <span style={{ color: C.accent, fontSize: 11, fontFamily: 'monospace', textTransform: 'lowercase', letterSpacing: '0.02em', width: 160, flexShrink: 0, paddingTop: 2, opacity: 0.85 }}>
                      {key}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <FieldValue val={content[key]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function VersionItem({ version, onRollback, isLast }) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.accent, boxShadow: `0 0 0 3px #1a0a12`, flexShrink: 0 }} />
        {!isLast && <div style={{ width: 1, flex: 1, background: C.border, marginTop: 8 }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: C.text3, fontSize: 11, marginBottom: 5 }}>
              {new Date(version.timestamp).toLocaleString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
            <p style={{ color: C.text2, fontSize: 13, lineHeight: 1.5 }}>"{version.prompt}"</p>
          </div>
          <button
            style={{ background: C.border, border: `1px solid ${C.borderMid}`, borderRadius: 8, padding: '7px 14px', color: C.text2, fontSize: 12, fontWeight: 500, cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s' }}
            onClick={() => onRollback(version)}
            onMouseEnter={e => { e.currentTarget.style.background = C.borderMid; e.currentTarget.style.color = C.text }}
            onMouseLeave={e => { e.currentTarget.style.background = C.border; e.currentTarget.style.color = C.text2 }}
          >Rollback</button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ onLogout }) {
  const [content, setContent] = useState(() => getContent())
  const [prompt, setPrompt]   = useState('')
  const [loading, setLoading] = useState(false)
  const [usage, setUsage]     = useState(getUsage)
  const [history, setHistory] = useState(getHistory)
  const [toasts, setToasts]   = useState([])
  const [focused, setFocused] = useState(false)

  const addToast    = (msg, ok) => setToasts(prev => [...prev, { id: Date.now(), msg, ok }])
  const removeToast = id        => setToasts(prev => prev.filter(t => t.id !== id))
  const limitReached = usage.count >= MAX_MONTHLY

  const handleSubmit = async () => {
    const p = prompt.trim()
    if (p.length < 5) { addToast('Please describe the change in at least 5 characters.', false); return }
    setLoading(true)
    try {
      const text = await callClaude(p, content)
      const next = parseResponse(text)
      validateKeys(staticContent, next)
      const newHistory = [{ content, timestamp: new Date().toISOString(), prompt: p }, ...history].slice(0, 5)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory)); setHistory(newHistory)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setContent(next)
      const newUsage = { count: usage.count + 1, month: usage.month }
      localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage)); setUsage(newUsage)
      setPrompt('')
      addToast('Content updated. Refresh the site to see changes.', true)
    } catch (e) { addToast(e.message || 'Something went wrong.', false) }
    finally { setLoading(false) }
  }

  const handleRollback = (v) => { localStorage.setItem(STORAGE_KEY, JSON.stringify(v.content)); setContent(v.content); addToast('Rolled back to previous version.', true) }
  const handleReset    = ()  => { localStorage.removeItem(STORAGE_KEY); setContent(staticContent); addToast('Reset to default content.', true) }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: C.pageBg, fontFamily: C.font, color: C.text }}>

      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 999, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', pointerEvents: 'none' }}>
        {toasts.map(t => <div key={t.id} style={{ pointerEvents: 'auto' }}><Toast toast={t} onRemove={removeToast} /></div>)}
      </div>

      <aside style={{ width: 240, flexShrink: 0, background: C.sidebarBg, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.accent, boxShadow: `0 0 10px ${C.accent}55`, flexShrink: 0 }} />
            <span style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>Site CMS</span>
          </div>
          <p style={{ color: C.text3, fontSize: 12, marginLeft: 18 }}>Hart Haulage Ltd</p>
        </div>

        <div style={{ padding: '24px', borderBottom: `1px solid ${C.border}` }}>
          <p style={{ color: C.text3, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>Monthly Usage</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <UsageGauge count={usage.count} max={MAX_MONTHLY} />
            <div>
              <p style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>
                {usage.count} <span style={{ color: C.text3, fontWeight: 400 }}>of {MAX_MONTHLY}</span>
              </p>
              <p style={{ color: C.text3, fontSize: 11, marginTop: 2 }}>AI requests</p>
              {limitReached && <p style={{ color: C.red, fontSize: 10, marginTop: 6, fontWeight: 500 }}>Resets 1st of month</p>}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', padding: '16px 12px' }}>
          {[['Reset to defaults', handleReset], ['Sign out', onLogout]].map(([label, action]) => (
            <button key={label} onClick={action} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: C.text3, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = C.border; e.currentTarget.style.color = C.text2 }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text3 }}
            >{label}</button>
          ))}
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 40px' }}>

          <section style={{ marginBottom: 40 }}>
            <p style={{ color: C.text3, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Make a Change</p>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <label style={{ color: C.text2, fontSize: 12, fontWeight: 500 }}>Describe what you want changed</label>
                  <span style={{ color: prompt.length >= 180 ? C.amber : C.text3, fontSize: 11 }}>{prompt.length}/200</span>
                </div>
                <textarea
                  rows={4} maxLength={200} value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  disabled={loading || limitReached}
                  placeholder='e.g. "Update the hero heading to Moving New Zealand Forward with Pride"'
                  style={{ width: '100%', background: C.pageBg, border: `1px solid ${focused ? C.accent : C.borderMid}`, borderRadius: 10, padding: '12px 14px', color: C.text, fontSize: 13, resize: 'none', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6, transition: 'border-color 0.15s', caretColor: C.accent, opacity: (loading || limitReached) ? 0.45 : 1 }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </div>
              <button
                onClick={handleSubmit} disabled={loading || limitReached}
                style={{ width: '100%', background: C.accentDark, border: 'none', borderRadius: 10, padding: '12px 0', color: '#fff', fontSize: 14, fontWeight: 600, cursor: loading || limitReached ? 'not-allowed' : 'pointer', opacity: limitReached ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!loading && !limitReached) e.currentTarget.style.background = C.accent }}
                onMouseLeave={e => { e.currentTarget.style.background = C.accentDark }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
                      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                      <path fill="currentColor" style={{ opacity: 0.75 }} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing…
                  </>
                ) : limitReached ? 'Monthly limit reached' : 'Apply with AI'}
              </button>
            </div>
          </section>

          {history.length > 0 && (
            <section style={{ marginBottom: 40 }}>
              <p style={{ color: C.text3, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Version History</p>
              {history.map((v, i) => <VersionItem key={i} version={v} onRollback={handleRollback} isLast={i === history.length - 1} />)}
            </section>
          )}

          <section>
            <p style={{ color: C.text3, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Current Content</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {GROUPS.map(g => <PageGroup key={g.page} group={g} content={content} />)}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
