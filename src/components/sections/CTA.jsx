// src/components/sections/CTA.jsx
import { Link } from 'react-router-dom'
export default function CTA() {
  return (
    <section id="cta" style={{ textAlign:'center', padding:'90px 24px', borderTop:'1px solid rgba(60,174,120,.1)', position:'relative', overflow:'hidden', background:'#102019' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(60,174,120,.08),transparent)' }}></div>
      <div style={{ position:'relative', zIndex:1, maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal">
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(26px,5vw,44px)', fontWeight:800, lineHeight:1.08, letterSpacing:-.8, marginBottom:12 }}>
            ¿Eres estudiante de Jurisprudencia?<br/>Esto se construye <em style={{ color:'#3CAE78', fontStyle:'normal' }}>para ti</em>
          </h2>
          <p style={{ color:'#8ABFA3', fontSize:15, marginBottom:30, maxWidth:460, margin:'0 auto 30px' }}>Únete a ACE y forma parte de la transformación digital de la Alianza Colectiva Estudiantil.</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/inscripcion" style={{ background:'#3CAE78', color:'#fff', border:'none', padding:'12px 24px', borderRadius:9, fontSize:14, fontFamily:'DM Sans,sans-serif', fontWeight:500, textDecoration:'none' }}>Unirme a ACE →</Link>
            <Link to="/contacto" style={{ background:'transparent', color:'#E8F5EE', border:'1px solid rgba(255,255,255,.14)', padding:'12px 24px', borderRadius:9, fontSize:14, textDecoration:'none' }}>Contactar al equipo</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
