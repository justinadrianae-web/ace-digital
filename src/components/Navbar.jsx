// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '/#historia',    label: 'Historia' },
  { href: '/inscripcion',  label: 'Únete' },
  { href: '/eventos',      label: 'Eventos' },
  { href: '/docentes',     label: 'Docentes' },
  { href: '/invitados',    label: 'Invitados' },
  { href: '/contacto',     label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle = {
    position:       'fixed',
    top:            0, left: 0, right: 0,
    zIndex:         200,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    padding:        '13px 40px',
    background:     scrolled ? 'rgba(12,28,21,.95)' : 'rgba(12,28,21,.85)',
    backdropFilter: 'blur(16px)',
    borderBottom:   '1px solid rgba(60,174,120,.13)',
    transition:     'background .3s',
  }

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none' }}>
          <div style={{ width:32, height:32, borderRadius:7, background:'#3CAE78', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:13, color:'#fff' }}>
            ACE
          </div>
          <div>
            <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#E8F5EE', display:'block', lineHeight:1.2 }}>ACE Digital</span>
            <span style={{ fontSize:10, color:'#8ABFA3' }}>Alianza Colectiva Estudiantil</span>
          </div>
        </Link>

        {/* Links desktop */}
        <ul style={{ display:'flex', gap:22, listStyle:'none', alignItems:'center' }} className="desktop-nav">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                color:          location.pathname === l.href ? '#5DC995' : '#8ABFA3',
                textDecoration: 'none',
                fontSize:       12,
                transition:     'color .2s',
              }}
              onMouseEnter={e => e.target.style.color='#5DC995'}
              onMouseLeave={e => e.target.style.color = location.pathname === l.href ? '#5DC995' : '#8ABFA3'}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/admin" style={{ background:'rgba(60,174,120,.12)', color:'#5DC995', border:'1px solid rgba(60,174,120,.25)', padding:'5px 12px', borderRadius:6, fontSize:11, textDecoration:'none' }}>
              Admin ⚙
            </Link>
          </li>
        </ul>

        <Link to="/inscripcion" style={{ background:'#3CAE78', color:'#fff', border:'none', padding:'7px 16px', borderRadius:7, fontSize:12, fontFamily:'DM Sans,sans-serif', cursor:'pointer', textDecoration:'none' }}>
          Unirme a ACE
        </Link>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display:'none', flexDirection:'column', gap:5, background:'none', border:'none', cursor:'pointer', padding:4 }} className="hamburger">
          <span style={{ width:21, height:2, background:'#8ABFA3', borderRadius:2, display:'block' }}></span>
          <span style={{ width:21, height:2, background:'#8ABFA3', borderRadius:2, display:'block' }}></span>
          <span style={{ width:21, height:2, background:'#8ABFA3', borderRadius:2, display:'block' }}></span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position:'fixed', top:59, left:0, right:0, background:'rgba(12,28,21,.97)', padding:'16px 24px', borderBottom:'1px solid rgba(60,174,120,.13)', zIndex:199, display:'flex', flexDirection:'column', gap:12 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ color:'#8ABFA3', textDecoration:'none', fontSize:14, padding:'5px 0', borderBottom:'1px solid rgba(60,174,120,.1)' }}>
              {l.label}
            </a>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)} style={{ color:'#5DC995', textDecoration:'none', fontSize:14 }}>
            ⚙ Panel Admin
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  )
}
