// src/components/sections/Stack.jsx
export default function Stack() {
  const tools = [
    { icon:'⚛️', name:'React', role:'Interfaz web', free:'Gratis' },
    { icon:'🗄️', name:'Supabase', role:'Base de datos + Auth', free:'Gratis' },
    { icon:'▲', name:'Vercel', role:'Hosting web', free:'Gratis' },
    { icon:'📧', name:'Brevo', role:'Correos automáticos', free:'300/día gratis' },
    { icon:'🎨', name:'Tailwind', role:'Diseño y estilos', free:'Gratis' },
    { icon:'🐙', name:'GitHub', role:'Código colaborativo', free:'Gratis' },
  ]
  return (
    <section id="tecnologia" style={{ padding:'96px 24px', background:'#102019' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:44 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Tecnología
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>Stack profesional,<br/>costo cero</h2>
          <p style={{ color:'#8ABFA3', fontSize:15, marginTop:10, maxWidth:500 }}>Herramientas usadas por empresas reales, todas en plan gratuito.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(148px,1fr))', gap:9 }}>
          {tools.map(t => (
            <div key={t.name} className="reveal" style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:11, padding:'16px 12px', textAlign:'center', transition:'all .25s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}>
              <div style={{ fontSize:24, marginBottom:7 }}>{t.icon}</div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:13, fontWeight:600, marginBottom:2 }}>{t.name}</div>
              <div style={{ fontSize:10, color:'#8ABFA3' }}>{t.role}</div>
              <div style={{ display:'inline-block', marginTop:6, background:'rgba(60,174,120,.1)', color:'#5DC995', fontSize:9, padding:'2px 7px', borderRadius:99, border:'1px solid rgba(60,174,120,.18)' }}>{t.free}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
