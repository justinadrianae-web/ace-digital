// src/pages/admin/AdminSolicitudes.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSolicitudesExternas } from '../../lib/supabase'

export default function AdminSolicitudes() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { getSolicitudesExternas().then(({data})=>{ setItems(data||[]); setLoading(false) }) }, [])

  const cardStyle = { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:12, padding:18, marginBottom:10 }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#0C1C15', minHeight:'100vh' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <Link to="/admin" style={{ color:'#8ABFA3', fontSize:12, textDecoration:'none', marginBottom:16, display:'inline-block' }}>← Volver</Link>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, marginBottom:6 }}>Solicitudes externas</h1>
        <p style={{ color:'#8ABFA3', fontSize:14, marginBottom:28 }}>Peticiones de REDMUN y otras organizaciones que quieren participar en eventos de ACE o invitar a ACE.</p>
        {loading ? <p style={{ color:'#8ABFA3' }}>Cargando...</p>
        : items.length === 0 ? <div style={{ ...cardStyle, textAlign:'center', color:'#8ABFA3', padding:32 }}>No hay solicitudes aún.</div>
        : items.map((item,i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div>
                <div style={{ fontSize:11, color:'#5DC995', fontWeight:500, marginBottom:3, textTransform:'uppercase', letterSpacing:'.04em' }}>{item.organizacion}</div>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:15, fontWeight:600, marginBottom:3 }}>{item.tipo}</div>
                {item.evento_ace && <div style={{ fontSize:12, color:'#8ABFA3' }}>Evento ACE: {item.evento_ace}</div>}
                {item.evento_propio && <div style={{ fontSize:12, color:'#8ABFA3' }}>Su evento: {item.evento_propio}</div>}
              </div>
              <span style={{ background:'rgba(250,200,50,.1)', color:'#fac832', border:'1px solid rgba(250,200,50,.25)', fontSize:10, padding:'2px 9px', borderRadius:99 }}>pendiente</span>
            </div>
            <div style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.65 }}>
              Rep: <strong style={{ color:'#E8F5EE' }}>{item.representante}</strong> · {item.correo}
              {item.fecha_pref && <> · Fecha: {item.fecha_pref}</>}
              {item.mensaje && <div style={{ marginTop:6, fontStyle:'italic' }}>"{item.mensaje}"</div>}
            </div>
            <div style={{ display:'flex', gap:8, marginTop:10 }}>
              <a href={`mailto:${item.correo}`} style={{ background:'rgba(60,174,120,.15)', color:'#5DC995', border:'1px solid rgba(60,174,120,.3)', borderRadius:7, padding:'5px 12px', fontSize:11, textDecoration:'none' }}>✉️ Responder por correo</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
