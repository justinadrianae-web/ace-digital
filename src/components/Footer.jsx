// src/components/Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background:'#102019', borderTop:'1px solid rgba(60,174,120,.1)', padding:'36px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, flexWrap:'wrap' }}>
      <div style={{ display:'flex', alignItems:'center', gap:9 }}>
        <div style={{ width:30, height:30, borderRadius:6, background:'#3CAE78', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:12, color:'#fff' }}>ACE</div>
        <div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:600, fontSize:13, color:'#E8F5EE' }}>ACE Digital</div>
          <div style={{ fontSize:10, color:'#8ABFA3' }}>Alianza Colectiva Estudiantil · UG Jurisprudencia</div>
        </div>
      </div>

      <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
        {[
          ['/#historia','Historia'],['/#valores','Valores'],
          ['/inscripcion','Unirse'],['/eventos','Eventos'],
          ['/docentes','Docentes'],['/invitados','Invitados'],['/contacto','Contacto'],
        ].map(([href, label]) => (
          <a key={href} href={href} style={{ color:'#8ABFA3', fontSize:11, textDecoration:'none' }}>{label}</a>
        ))}
      </div>

      <div style={{ fontSize:11, color:'rgba(138,191,163,.35)', textAlign:'right' }}>
        Plataforma en desarrollo · 2025<br/>
        Hecho con <span style={{ color:'#3CAE78' }}>♥</span> por estudiantes de la UG
      </div>
    </footer>
  )
}
