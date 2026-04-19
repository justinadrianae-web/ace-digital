// src/pages/Docentes.jsx
import { useState, useEffect } from 'react'
import { useReveal } from '../lib/useReveal'
import { getDocentes } from '../lib/supabase'

const S = {
  page: { paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#102019', minHeight:'100vh' },
  cont: { maxWidth:1100, margin:'0 auto' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12, marginTop:44 },
  card: { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:13, padding:20, transition:'all .28s' },
  av:   { width:52, height:52, borderRadius:'50%', background:'#1A3227', border:'2px solid rgba(60,174,120,.13)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:700, color:'#3CAE78', marginBottom:12 },
  name: { fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, marginBottom:3 },
  mat:  { fontSize:12, color:'#5DC995', fontWeight:500, marginBottom:10 },
  hrow: { display:'flex', justifyContent:'space-between', fontSize:11, color:'#8ABFA3', padding:'4px 8px', background:'rgba(60,174,120,.05)', borderRadius:5, border:'1px solid rgba(60,174,120,.08)', marginBottom:4 },
}

const DEMO = [
  { id:1, nombre:'Dr. Nombre Apellido', materia:'Derecho Constitucional', horarios:[{dia:'Lunes',hora:'08:00–10:00'},{dia:'Miércoles',hora:'08:00–10:00'}], correo:'' },
  { id:2, nombre:'Dra. Nombre Apellido', materia:'Derecho Civil', horarios:[{dia:'Martes',hora:'10:00–12:00'},{dia:'Jueves',hora:'10:00–12:00'}], correo:'' },
  { id:3, nombre:'Mgs. Nombre Apellido', materia:'Derecho Penal', horarios:[{dia:'Lunes',hora:'14:00–16:00'},{dia:'Viernes',hora:'14:00–16:00'}], correo:'' },
  { id:4, nombre:'Ab. Nombre Apellido', materia:'Derecho Internacional', horarios:[{dia:'Miércoles',hora:'16:00–18:00'}], correo:'' },
  { id:5, nombre:'Dr. Nombre Apellido', materia:'Derecho Administrativo', horarios:[{dia:'Martes',hora:'08:00–10:00'},{dia:'Jueves',hora:'08:00–10:00'}], correo:'' },
  { id:6, nombre:'Dra. Nombre Apellido', materia:'Derecho Laboral', horarios:[{dia:'Lunes',hora:'16:00–18:00'},{dia:'Miércoles',hora:'16:00–18:00'}], correo:'' },
]

function initials(n) { return n.replace(/^(Dr|Dra|Mgs|Ab)\.\s*/i,'').split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase() }

export default function Docentes() {
  useReveal()
  useEffect(() => { document.title = 'Docentes — ACE Digital' }, [])
  const [docentes, setDocentes] = useState([])
  const [loading, setLoading] = useState(true)
  const [buscar, setBuscar] = useState('')

  useEffect(() => {
    getDocentes().then(({ data }) => {
      setDocentes(data && data.length > 0 ? data : DEMO)
      setLoading(false)
    })
  }, [])

  const filtrados = docentes.filter(d =>
    d.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
    d.materia.toLowerCase().includes(buscar.toLowerCase())
  )

  return (
    <div style={S.page}>
      <div style={S.cont}>
        <div className="reveal" style={{ marginBottom:12 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Cuerpo docente
          </div>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, lineHeight:1.1, marginBottom:10 }}>Docentes de Jurisprudencia</h1>
          <p style={{ color:'#8ABFA3', fontSize:15, lineHeight:1.72, maxWidth:500, marginBottom:24 }}>Consulta los docentes por materia y sus horarios de clases y tutorías.</p>
          <input type="text" placeholder="Buscar por nombre o materia..." value={buscar} onChange={e=>setBuscar(e.target.value)}
            style={{ maxWidth:360, background:'#132A1E', border:'1px solid rgba(60,174,120,.2)', borderRadius:9, padding:'10px 14px', fontSize:13, color:'#E8F5EE', outline:'none', width:'100%' }} />
        </div>
        {loading ? <p style={{ color:'#8ABFA3', fontSize:13, paddingTop:32 }}>Cargando...</p> : (
          <div style={S.grid}>
            {filtrados.map(doc => (
              <div key={doc.id} className="reveal" style={S.card}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}>
                <div style={S.av}>{initials(doc.nombre)}</div>
                <div style={S.name}>{doc.nombre}</div>
                <div style={S.mat}>{doc.materia}</div>
                {(doc.horarios||[]).map((h,j)=>(
                  <div key={j} style={S.hrow}><span style={{fontWeight:500,color:'#E8F5EE'}}>{h.dia}</span><span>{h.hora}</span></div>
                ))}
                {doc.correo && <a href={`mailto:${doc.correo}`} style={{display:'block',marginTop:10,fontSize:11,color:'#5DC995',textDecoration:'none'}}>✉️ {doc.correo}</a>}
              </div>
            ))}
            <div className="reveal" style={{...S.card,border:'2px dashed rgba(60,174,120,.22)',background:'transparent',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,color:'#8ABFA3',cursor:'pointer',minHeight:166}}
              onClick={()=>alert('Función disponible en el panel de administración.')}>
              <span style={{fontSize:24,opacity:.35}}>＋</span>
              <span style={{fontSize:12}}>Agregar docente</span>
              <span style={{fontSize:10,color:'rgba(138,191,163,.4)'}}>(Admin)</span>
            </div>
          </div>
        )}
        <div className="reveal" style={{marginTop:40,background:'rgba(60,174,120,.06)',border:'1px solid rgba(60,174,120,.15)',borderRadius:10,padding:'14px 18px',fontSize:13,color:'#8ABFA3',maxWidth:600}}>
          ℹ️ <strong style={{color:'#5DC995'}}>Admin:</strong> Para agregar o editar docentes ve al <a href="/admin" style={{color:'#3CAE78'}}>Panel de Administración</a>.
        </div>
      </div>
    </div>
  )
}
