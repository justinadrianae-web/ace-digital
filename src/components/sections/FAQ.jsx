// src/components/sections/FAQ.jsx
import { useState } from 'react'
const QAS = [
  ['¿Quién puede unirse a ACE?','Cualquier estudiante activo de la Facultad de Jurisprudencia de la Universidad de Guayaquil. Solo necesitas estar matriculado en el período actual.'],
  ['¿Tiene costo ser miembro?','No. La membresía en ACE es completamente gratuita. Somos una organización estudiantil sin fines de lucro.'],
  ['¿Cómo propongo un evento?','En la sección Eventos puedes completar el formulario. El equipo directivo lo revisará y, si es aprobado, aparecerá en el calendario público.'],
  ['¿Cómo funciona el portal de invitados?','Organizaciones externas pueden ver los eventos de ACE y enviar solicitudes de participación o invitar a ACE a sus propios eventos.'],
  ['¿Cuándo estará lista la plataforma completa?','El desarrollo está planificado en 8 semanas. Las funciones básicas estarán listas en las primeras 4 semanas.'],
  ['¿Mis datos están seguros?','Sí. Usamos Supabase con estándares de seguridad internacionales. Los datos nunca se comparten con terceros.'],
  ['¿Qué actividades organiza ACE?','Charlas, talleres, programas de apoyo estudiantil, actividades culturales y eventos académicos a lo largo del año.'],
  ['¿Cómo me entero de los próximos eventos?','Inscríbete en ACE y recibirás recordatorios automáticos por correo. También consulta el calendario en la plataforma.'],
]
export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" style={{ padding:'96px 24px', background:'#0C1C15' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:44 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>FAQ
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>Preguntas frecuentes</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {QAS.map(([q,a],i) => (
            <div key={i} className="reveal" style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:12, overflow:'hidden', transition:'border-color .2s', borderColor: open===i?'rgba(60,174,120,.3)':'rgba(60,174,120,.13)' }}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{ width:'100%', background:'none', border:'none', textAlign:'left', padding:'17px 19px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:10, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}>
                <span style={{ fontSize:13, fontWeight:500, color:'#E8F5EE' }}>{q}</span>
                <div style={{ width:20, height:20, borderRadius:'50%', background:'rgba(60,174,120,.1)', border:'1px solid rgba(60,174,120,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:11, color:'#3CAE78', transition:'transform .3s', transform: open===i?'rotate(45deg)':'none' }}>+</div>
              </button>
              {open===i && <div style={{ padding:'0 19px 15px', fontSize:12, color:'#8ABFA3', lineHeight:1.68 }}>{a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
