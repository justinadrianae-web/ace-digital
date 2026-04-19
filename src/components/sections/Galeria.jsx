// src/components/sections/Galeria.jsx
export default function Galeria() {
  const items = [
    { cls:'lg', n:1 }, { cls:'', n:2 }, { cls:'', n:3 },
    { cls:'tl', n:4 }, { cls:'', n:5 }, { cls:'', n:6 },
  ]
  return (
    <section id="galeria" style={{ padding:'96px 24px', background:'#0C1C15' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:20 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Galería
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>ACE en fotos</h2>
        </div>
        <div className="reveal" style={{ background:'rgba(60,174,120,.06)', border:'1px solid rgba(60,174,120,.16)', borderRadius:9, padding:'11px 16px', fontSize:12, color:'#8ABFA3', display:'flex', alignItems:'center', gap:7, marginBottom:24, maxWidth:540 }}>
          <span>📸</span>
          <span><strong style={{ color:'#5DC995' }}>Admin:</strong> Reemplaza cada celda con una imagen real editando este archivo.</span>
        </div>
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridTemplateRows:'repeat(2,190px)', gap:9 }}>
          {items.map(({ cls, n }) => (
            <div key={n}
              style={{
                background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:11,
                display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
                gap:7, position:'relative', overflow:'hidden', cursor:'pointer', transition:'all .28s',
                gridColumn: cls==='lg'?'span 2':undefined,
                gridRow: cls==='lg'||cls==='tl'?'span 2':undefined,
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)'}}>
              {/* ADMIN: Reemplaza con <img src="foto.jpg" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:11}} /> */}
              <div style={{ fontSize:24, opacity:.18 }}>📸</div>
              <div style={{ fontSize:9, color:'#8ABFA3', opacity:.4 }}>Foto {n}</div>
              <div style={{ position:'absolute', bottom:7, right:8, fontSize:9, color:'#8ABFA3', opacity:.35 }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
