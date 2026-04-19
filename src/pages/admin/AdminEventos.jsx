// src/pages/admin/AdminEventos.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEventos, actualizarEstadoEvento } from '../../lib/supabase'
import toast from 'react-hot-toast'

const ESTADOS = { pendiente:'#fac832', aprobado:'#3CAE78', rechazado:'#f08080' }

export default function AdminEventos() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro]   = useState('pendiente')

  useEffect(() => { getEventos().then(({data})=>{ setEventos(data||[]); setLoading(false) }) }, [])

  async function cambiarEstado(id, estado) {
    const { error } = await actualizarEstadoEvento(id, estado)
    if (error) { toast.error('Error'); return }
    setEventos(e => e.map(x => x.id===id ? {...x,estado} : x))
    toast.success(`Evento ${estado}`)
  }

  const filtrados = eventos.filter(e => filtro === 'todos' || e.estado === filtro)
  const cardStyle = { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:12, padding:18, marginBottom:10 }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#102019', minHeight:'100vh' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <Link to="/admin" style={{ color:'#8ABFA3', fontSize:12, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5, marginBottom:16 }}>← Volver</Link>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, marginBottom:6 }}>Gestión de eventos</h1>
        <p style={{ color:'#8ABFA3', fontSize:14, marginBottom:28 }}>Aprueba o rechaza las propuestas de eventos enviadas por los miembros.</p>

        <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
          {['pendiente','aprobado','rechazado','todos'].map(f=>(
            <button key={f} onClick={()=>setFiltro(f)}
              style={{ background:filtro===f?'#3CAE78':'transparent', color:filtro===f?'#fff':'#8ABFA3', border:'1px solid rgba(60,174,120,.25)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif', textTransform:'capitalize' }}>
              {f} ({eventos.filter(e=>f==='todos'?true:e.estado===f).length})
            </button>
          ))}
        </div>

        {loading ? <p style={{ color:'#8ABFA3' }}>Cargando eventos...</p>
        : filtrados.length === 0 ? <div style={{ ...cardStyle, textAlign:'center', color:'#8ABFA3', padding:32 }}>No hay eventos con este estado.</div>
        : filtrados.map(evt => (
          <div key={evt.id} style={cardStyle}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:15, fontWeight:600, marginBottom:2 }}>{evt.nombre}</div>
                <div style={{ fontSize:12, color:'#8ABFA3' }}>📅 {evt.fecha} · {evt.hora} · {evt.lugar||'Sin lugar'}</div>
              </div>
              <span style={{ background:`${ESTADOS[evt.estado]}22`, color:ESTADOS[evt.estado], border:`1px solid ${ESTADOS[evt.estado]}44`, fontSize:10, padding:'2px 9px', borderRadius:99, flexShrink:0 }}>{evt.estado}</span>
            </div>
            <p style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.6, marginBottom:10 }}>{evt.descripcion}</p>
            <div style={{ fontSize:11, color:'rgba(138,191,163,.5)', marginBottom:10 }}>Propuesto por: {evt.autor||'Anónimo'} · Tipo: {evt.tipo} {evt.requiere_reg?'· Requiere inscripción':''}</div>
            <div style={{ display:'flex', gap:8 }}>
              {evt.estado !== 'aprobado' && <button onClick={()=>cambiarEstado(evt.id,'aprobado')} style={{ background:'rgba(60,174,120,.15)', color:'#5DC995', border:'1px solid rgba(60,174,120,.3)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer' }}>✓ Aprobar y publicar</button>}
              {evt.estado !== 'rechazado' && <button onClick={()=>cambiarEstado(evt.id,'rechazado')} style={{ background:'rgba(200,50,50,.1)', color:'#f08080', border:'1px solid rgba(200,50,50,.25)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer' }}>✗ Rechazar</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
