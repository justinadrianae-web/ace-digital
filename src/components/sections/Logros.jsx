// src/components/sections/Logros.jsx
export default function Logros() {
  const logros = [
    { badge:'Evento', meta:'<!-- ADMIN: Mes Año -->', title:'<!-- ADMIN: Nombre del evento -->', desc:'<!-- ADMIN: Describe el logro o actividad realizada -->' },
    { badge:'Programa', meta:'<!-- ADMIN: Mes Año -->', title:'<!-- ADMIN: Nombre del programa -->', desc:'<!-- ADMIN: Descripción -->' },
    { badge:'Actividad', meta:'<!-- ADMIN: Mes Año -->', title:'<!-- ADMIN: Nombre de la actividad -->', desc:'<!-- ADMIN: Descripción -->' },
  ]
  return (
    <section id="logros" style={{ padding:'96px 24px', background:'#102019' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:44 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Logros y actividades
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>Lo que ACE ha construido</h2>
          <p style={{ color:'#8ABFA3', fontSize:15, marginTop:10, maxWidth:500 }}>Actividades, eventos y resultados que ACE ha logrado para la comunidad estudiantil.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:12 }}>
          {logros.map((l,i) => (
            <div key={i} className="reveal" style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:13, overflow:'hidden', transition:'all .28s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}>
              <div style={{ width:'100%', height:170, background:'#1A3227', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8, borderBottom:'1px solid rgba(60,174,120,.13)', position:'relative' }}>
                {/* ADMIN: reemplaza con <img src="foto.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
                <div style={{ fontSize:32, opacity:.2 }}>🖼️</div>
                <div style={{ fontSize:10, color:'#8ABFA3', opacity:.5 }}>Agregar foto del evento</div>
                <div style={{ position:'absolute', top:10, right:10, background:'#3CAE78', color:'#fff', fontSize:9, fontWeight:600, padding:'3px 8px', borderRadius:99 }}>{l.badge}</div>
              </div>
              <div style={{ padding:16 }}>
                <div style={{ fontSize:10, color:'#3CAE78', fontWeight:500, marginBottom:4, textTransform:'uppercase', letterSpacing:'.05em' }}>{l.meta}</div>
                <h4 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, marginBottom:4 }}>{l.title}</h4>
                <p style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.55 }}>{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
