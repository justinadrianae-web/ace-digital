// src/components/sections/Equipo.jsx
export default function Equipo() {
  const miembros = [
    { iniciales:'--', nombre:'<!-- ADMIN: Nombre -->', cargo:'Presidente/a', carrera:'<!-- Carrera · Semestre -->' },
    { iniciales:'--', nombre:'<!-- ADMIN: Nombre -->', cargo:'Vicepresidente/a', carrera:'<!-- Carrera · Semestre -->' },
    { iniciales:'--', nombre:'<!-- ADMIN: Nombre -->', cargo:'Secretario/a', carrera:'<!-- Carrera · Semestre -->' },
    { iniciales:'--', nombre:'<!-- ADMIN: Nombre -->', cargo:'Tesorero/a', carrera:'<!-- Carrera · Semestre -->' },
  ]
  return (
    <section id="equipo" style={{ padding:'96px 24px', background:'#102019' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:44 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Equipo directivo
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>Las personas detrás de ACE</h2>
          <p style={{ color:'#8ABFA3', fontSize:15, marginTop:10, maxWidth:500 }}>El equipo que hace posible cada actividad y decisión de la Alianza.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:12 }}>
          {miembros.map((m,i) => (
            <div key={i} className="reveal" style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:13, padding:'22px 16px', textAlign:'center', transition:'all .3s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)';e.currentTarget.style.transform='translateY(-3px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}>
              <div style={{ width:66, height:66, borderRadius:'50%', margin:'0 auto 12px', background:'#1A3227', border:'2px solid rgba(60,174,120,.13)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontSize:19, fontWeight:700, color:'#3CAE78', position:'relative' }}>
                {m.iniciales}
                <div style={{ position:'absolute', bottom:2, right:2, width:11, height:11, background:'#3CAE78', borderRadius:'50%', border:'2px solid #132A1E' }}></div>
              </div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, marginBottom:3 }}>{m.nombre}</div>
              <div style={{ fontSize:11, color:'#5DC995', fontWeight:500, marginBottom:6 }}>{m.cargo}</div>
              <div style={{ fontSize:11, color:'#8ABFA3' }}>{m.carrera}</div>
            </div>
          ))}
          <button className="reveal" style={{ border:'2px dashed rgba(60,174,120,.22)', background:'transparent', borderRadius:13, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:7, color:'#8ABFA3', cursor:'pointer', minHeight:166, fontFamily:'DM Sans,sans-serif', fontSize:12 }}
            onClick={()=>alert('Agrega miembros desde el panel de administración.')}>
            <span style={{ fontSize:24, opacity:.35 }}>＋</span>Agregar miembro
          </button>
        </div>
      </div>
    </section>
  )
}
