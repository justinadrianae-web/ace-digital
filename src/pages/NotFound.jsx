// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div style={{ paddingTop:160, textAlign:'center', minHeight:'100vh', background:'#0C1C15' }}>
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:72, fontWeight:800, color:'rgba(60,174,120,.18)', lineHeight:1 }}>404</div>
      <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:700, marginBottom:12 }}>Página no encontrada</h2>
      <p style={{ color:'#8ABFA3', fontSize:15, marginBottom:32 }}>La página que buscas no existe o fue movida.</p>
      <Link to="/" style={{ background:'#3CAE78', color:'#fff', padding:'12px 28px', borderRadius:9, textDecoration:'none', fontSize:14 }}>Volver al inicio →</Link>
    </div>
  )
}
