// src/components/sections/Mision.jsx
export default function Mision() {
  const cards = [
    { icon:'🎯', title:'Misión', text:'Representar activamente a los estudiantes de Jurisprudencia, fomentando su participación, derechos y desarrollo académico dentro de la Universidad de Guayaquil.' },
    { icon:'🔭', title:'Visión', text:'Ser la organización estudiantil de referencia de la UG: moderna, transparente, tecnológica y comprometida con el bienestar colectivo.' },
    { icon:'💡', title:'Propósito', text:'Transformar la cultura de participación estudiantil: demostrar que organizarse, comunicarse y decidir juntos es posible y necesario.' },
  ]
  return (
    <section id="mision" style={{ padding:'96px 24px', background:'#0C1C15' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal">
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Misión · Visión · Propósito
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1, marginBottom:44 }}>El norte que guía<br/>cada decisión</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {cards.map(c => (
            <div key={c.title} className="reveal" style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:14, padding:24, position:'relative', overflow:'hidden', transition:'all .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.35)';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'#3CAE78', borderRadius:'14px 14px 0 0' }}></div>
              <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
              <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16, fontWeight:700, marginBottom:8 }}>{c.title}</h3>
              <p style={{ fontSize:13, color:'#8ABFA3', lineHeight:1.65 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
