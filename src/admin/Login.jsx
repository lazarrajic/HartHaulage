import { useState } from 'react'
import './admin.css'

const PASS = import.meta.env.VITE_CMS_PASSWORD || 'admin'

export default function Login({ onSuccess }) {
  const [val, setVal]   = useState('')
  const [err, setErr]   = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setTimeout(() => {
      if (val === PASS) { onSuccess() }
      else { setErr(true); setBusy(false) }
    }, 400)
  }

  const C = {
    bg: '#0b0f1a', surface: '#131c2e', border: '#1e293b',
    borderMid: '#334155', text: '#f1f5f9', text2: '#94a3b8',
    text3: '#475569', accent: '#ec4899', accentDark: '#be185d',
    font: "-apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: C.bg, fontFamily: C.font,
    }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: C.accent + '22', border: `1px solid ${C.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h1 style={{ color: C.text, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Hart Haulage CMS</h1>
          <p style={{ color: C.text3, fontSize: 13 }}>Enter your password to continue</p>
        </div>

        <form onSubmit={submit} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
          <label style={{ display: 'block', color: C.text2, fontSize: 12, fontWeight: 500, marginBottom: 8 }}>Password</label>
          <input
            type="password"
            value={val}
            onChange={e => { setVal(e.target.value); setErr(false) }}
            placeholder="••••••••"
            autoFocus
            style={{
              width: '100%', background: '#0b0f1a', border: `1px solid ${err ? '#f87171' : C.borderMid}`,
              borderRadius: 10, padding: '11px 14px', color: C.text, fontSize: 14,
              outline: 'none', boxSizing: 'border-box', marginBottom: err ? 8 : 16,
              transition: 'border-color 0.15s',
            }}
          />
          {err && <p style={{ color: '#f87171', fontSize: 12, marginBottom: 16 }}>Incorrect password.</p>}
          <button type="submit" disabled={busy || !val} style={{
            width: '100%', background: C.accentDark, border: 'none', borderRadius: 10,
            padding: '12px 0', color: '#fff', fontSize: 14, fontWeight: 600,
            cursor: busy || !val ? 'not-allowed' : 'pointer',
            opacity: !val ? 0.5 : 1, transition: 'background 0.15s',
          }}>
            {busy ? 'Checking…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
