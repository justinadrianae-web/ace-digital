// src/components/sections/Roadmap.jsx
export default function Roadmap() {
  const fases = [
    { n:'1', wk:'Sem. 1–2', title:'Fundación', items:['Setup del proyecto','Base de datos y auth','Página principal','Deploy en internet'], cls:'border-green-500' },
    { n:'2', wk:'Sem. 3–4', title:'Contenido', items:['Registro de miembros','Panel admin','Noticias y publicaciones','Calendario de eventos'], cls:'' },
    { n:'3', wk:'Sem. 5–6', title:'Automatización', items:['Correo de bienvenida','Recordatorios de eventos','Newsletter semanal','Notificaciones web'], cls:'' },
    { n:'4', wk:'Sem. 7–8', title:'Avanzado', items:['Sistema de votaciones','Dashboard métricas','Roles y permisos','Exportar PDF'], cls:'' },
  ]
  const colors = ['rgba(60,174,120,1)','rgba(60,174,120,.6)','rgba(60,174,120,.4)','rgba(60,174,120,.25)']
  return (
    <section id="roadmap" style={{ padding:'96px 24px', background:'#0C1C15' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:52 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Roadmap
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>De cero a plataforma<br/>en 8 semanas</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, position:'relative' }}>
          <div style={{ position:'absolute', top:25, left:'12.5%', right:'12.5%', height:1, background:'linear-gradient(90deg,transparent,rgba(60,174,120,.4),rgba(60,174,120,.4),rgba(60,174,120,.4),transparent)' }}></div>
          {fases.map((f,i) => (
            <div key={f.n} className="reveal" style={{ paddingRight:18 }}>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:18 }}>
                <div style={{ width:50, height:50, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:800, border:`2px solid ${colors[i]}`, background:`${colors[i]}22`, color:colors[i] }}>{f.n}</div>
                <div style={{ fontSize:10, color:'#8ABFA3' }}>{f.wk}</div>
              </div>
              <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, marginBottom:10 }}>{f.title}</h3>
              {f.items.map(item => (
                <div key={item} style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:'#8ABFA3', marginBottom:6 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:'#3CAE78', opacity:.5, flexShrink:0 }}></div>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
