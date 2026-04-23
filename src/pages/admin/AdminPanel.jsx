// src/pages/admin/AdminPanel.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signIn, getSession, signOut } from '../../lib/supabase'
import toast from 'react-hot-toast'

const modules = [
  { href:'/admin/miembros',    icon:'👥', title:'Miembros', desc:'Ver, aprobar y gestionar solicitudes de membresía' },
  { href:'/admin/eventos',     icon:'📅', title:'Eventos', desc:'Aprobar o rechazar propuestas del calendario' },
  { href:'/admin/solicitudes', icon:'🌐', title:'Solicitudes externas', desc:'Revisar peticiones de REDMUN y otras organizaciones' },
  { href:'/admin/consultas',   icon:'✉️', title:'Consultas', desc:'Mensajes recibidos desde el formulario de contacto' },
  { href:'/admin/destacados',  icon:'⭐', title:'Miembros Destacados', desc:'Gestionar la sección de miembros destacados del sitio web' },
]

export default function AdminPanel() {
  const [session, setSession] = useState(null)
  const [email, setEmail]     = useState('')
  const [pass, setPass]       = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    getSession().then(s => { setSession(s); setChecking(false) })
  }, [])

  async function handleLogin() {
    if (!email || !pass) { toast.error('Ingresa correo y contraseña'); return }
    setLoading(true)
    const { error } = await signIn(email, pass)
    setLoading(false)
    if (error) { toast.error('Credenciales incorrectas'); return }
    const s = await getSession()
    setSession(s)
    toast.success('Bienvenido al panel de ACE')
  }

  async function handleLogout() {
    await signOut(); setSession(null)
    toast.success('Sesión cerrada')
  }

  if (checking) return <div style={{ paddingTop:160, textAlign:'center', color:'#8ABFA3' }}>Verificando sesión...</div>

  if (!session) return (
    <div style={{ paddingTop:140, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#0C1C15', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.2)', borderRadius:16, padding:36, width:'100%', maxWidth:400 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:48, height:48, borderRadius:10, background:'#3CAE78', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:18, color:'#fff', margin:'0 auto 14px' }}>ACE</div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:22, fontWeight:800, marginBottom:6 }}>Panel de administración</h2>
          <p style={{ fontSize:13, color:'#8ABFA3' }}>Acceso solo para directivos de ACE</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:14 }}>
          <label style={{ fontSize:12, color:'#8ABFA3' }}>Correo institucional</label>
          <input type="email" placeholder="admin@ace-ug.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:20 }}>
          <label style={{ fontSize:12, color:'#8ABFA3' }}>Contraseña</label>
          <input type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
        </div>
        <button style={{ width:'100%', background:'#3CAE78', color:'#fff', border:'none', padding:13, borderRadius:9, fontSize:14, fontFamily:'DM Sans,sans-serif', fontWeight:500, cursor:'pointer', opacity:loading?.7:1 }}
          onClick={handleLogin} disabled={loading}>{loading?'Ingresando...':'Ingresar al panel →'}</button>
        <p style={{ textAlign:'center', fontSize:11, color:'rgba(138,191,163,.4)', marginTop:16 }}>
          La cuenta admin se crea en Supabase → Authentication → Users
        </p>
      </div>
    </div>
  )

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#0C1C15', minHeight:'100vh' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:44 }}>
          <div>
            <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:10 }}>Panel de administración</div>
            <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:32, fontWeight:800 }}>Bienvenido, Admin ⚙</h1>
            <p style={{ color:'#8ABFA3', fontSize:14, marginTop:6 }}>Gestiona todos los módulos de ACE desde aquí.</p>
          </div>
          <button onClick={handleLogout} style={{ background:'transparent', color:'#8ABFA3', border:'1px solid rgba(60,174,120,.2)', borderRadius:8, padding:'8px 16px', fontSize:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>Cerrar sesión</button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:14 }}>
          {modules.map(m => (
            <Link key={m.href} to={m.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:14, padding:24, transition:'all .3s', cursor:'pointer' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.35)';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}>
                <div style={{ fontSize:32, marginBottom:14 }}>{m.icon}</div>
                <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:600, marginBottom:8, color:'#E8F5EE' }}>{m.title}</h3>
                <p style={{ fontSize:13, color:'#8ABFA3', lineHeight:1.6 }}>{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop:32, background:'rgba(60,174,120,.06)', border:'1px solid rgba(60,174,120,.15)', borderRadius:10, padding:'16px 20px', fontSize:13, color:'#8ABFA3', lineHeight:1.7 }}>
          ℹ️ <strong style={{ color:'#5DC995' }}>Tip:</strong> Los datos se guardan en tiempo real en Supabase. Cualquier cambio que hagas aquí se refleja inmediatamente en el sitio público.
        </div>
      </div>
    </div>
  )
}
