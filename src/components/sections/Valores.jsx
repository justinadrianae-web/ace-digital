// src/components/sections/Valores.jsx
export default function Valores() {
  const vals = [
    ['01','Transparencia','Todo lo que hacemos es visible. Sin agendas ocultas ni decisiones a puertas cerradas.'],
    ['02','Participación','Cada estudiante tiene voz. Fomentamos la inclusión activa en todas nuestras decisiones.'],
    ['03','Compromiso','Cumplimos lo que prometemos. El compromiso con la comunidad estudiantil es nuestra prioridad.'],
    ['04','Innovación','Usamos tecnología y nuevas ideas para mejorar continuamente la experiencia estudiantil.'],
    ['05','Unidad','La fuerza colectiva supera a la individual. Trabajamos juntos sin importar diferencias.'],
    ['06','Respeto','Reconocemos la diversidad y garantizamos un ambiente seguro para todos.'],
  ]
  return (
    <section id="valores" style={{ padding:'96px 24px', background:'#102019' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:44 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Valores
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>Lo que nos define<br/>como colectivo</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:10 }}>
          {vals.map(([num,title,desc]) => (
            <div key={num} className="reveal" style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:11, padding:20, display:'flex', alignItems:'flex-start', gap:12, transition:'all .25s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)';e.currentTarget.style.background='#1A3227'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.background='#132A1E'}}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:26, fontWeight:800, color:'rgba(60,174,120,.18)', lineHeight:1, flexShrink:0, minWidth:30 }}>{num}</div>
              <div>
                <h4 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, marginBottom:4 }}>{title}</h4>
                <p style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.55 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
