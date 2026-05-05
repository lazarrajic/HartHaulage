import { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

export default function AdminRoute() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('cms_auth') === 'true')

  const handleLogout = () => {
    sessionStorage.removeItem('cms_auth')
    setAuthed(false)
  }

  if (!authed) return <Login onSuccess={() => { sessionStorage.setItem('cms_auth', 'true'); setAuthed(true) }} />
  return <Dashboard onLogout={handleLogout} />
}
