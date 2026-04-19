export default function Historia() {
  const tl = [
    { year:'FUNDACIÓN', title:'Nace ACE', desc:'Un grupo de estudiantes decide organizarse para representar los intereses estudiantiles en Jurisprudencia.' },
    { year:'PRIMER LOGRO', title:'<!-- Agregar -->',  desc:'<!-- Admin: describe el primer hito importante de ACE -->' },
    { year:'CRECIMIENTO',  title:'<!-- Agregar -->',  desc:'<!-- Admin: describe el crecimiento de la organización -->' },
    { year:'HOY · 2025',  title:'Plataforma Digital ACE', desc:'ACE lanza su primera plataforma web propia con calendario, votaciones, correos automáticos y más.' },
  ]
  return (
    <section id="historia" style={{ padding:'96px 24px', background:'#102019' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start' }}>
        <div className="reveal">
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Nuestra historia
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1, marginBottom:10 }}>Quiénes somos<br/>y de dónde venimos</h2>
          <p style={{ color:'#8ABFA3', fontSize:14, lineHeight:1.8, marginBottom:14 }}>ACE nació de la iniciativa de un grupo de estudiantes de la Facultad de Jurisprudencia comprometidos con transformar la participación estudiantil desde adentro.</p>
          <p style={{ color:'#8ABFA3', fontSize:14, lineHeight:1.8, marginBottom:14 }}>Fundada con la convicción de que los estudiantes merecen una representación activa, transparente y moderna, ACE se ha convertido en un espacio de organización, debate y acción colectiva.</p>
          <blockquote style={{ borderLeft:'3px solid #3CAE78', paddingLeft:18, margin:'24px 0', fontSize:16, fontStyle:'italic', color:'#E8F5EE', lineHeight:1.6 }}>
            "No somos solo una organización política, somos una comunidad estudiantil que construye el cambio desde las aulas."
          </blockquote>
        </div>
        <div className="reveal">
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:20, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Línea de tiempo
          </div>
          {tl.map((item, i) => (
            <div key={i} style={{ display:'flex', gap:14 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:12, height:12, borderRadius:'50%', background:'#3CAE78', flexShrink:0, marginTop:3, boxShadow:'0 0 0 3px rgba(60,174,120,.2)' }}></div>
                {i < tl.length-1 && <div style={{ width:1, flex:1, background:'rgba(60,174,120,.2)', minHeight:24, margin:'4px 0' }}></div>}
              </div>
              <div style={{ paddingBottom:24, flex:1 }}>
                <div style={{ fontSize:10, fontWeight:600, color:'#3CAE78', letterSpacing:'.06em', marginBottom:3 }}>{item.year}</div>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, color:'#E8F5EE', marginBottom:3 }}>{item.title}</div>
                <div style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.55 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
