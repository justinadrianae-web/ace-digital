// src/pages/admin/AdminConsultas.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AdminConsultas() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('consultas').select('*').order('created_at',{ascending:false})
      .then(({data}) => { setItems(data||[]); setLoading(false) })
  }, [])

  const cardStyle = { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:12, padding:18, marginBottom:10 }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#102019', minHeight:'100vh' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <Link to="/admin" style={{ color:'#8ABFA3', fontSize:12, textDecoration:'none', marginBottom:16, display:'inline-block' }}>← Volver</Link>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, marginBottom:6 }}>Consultas recibidas</h1>
        <p style={{ color:'#8ABFA3', fontSize:14, marginBottom:28 }}>Mensajes enviados desde el formulario de contacto del sitio.</p>
        {loading ? <p style={{ color:'#8ABFA3' }}>Cargando...</p>
        : items.length === 0 ? <div style={{ ...cardStyle, textAlign:'center', color:'#8ABFA3', padding:32 }}>No hay consultas aún.</div>
        : items.map((item,i) => (
          <div key={i} style={{ ...cardStyle, borderLeft: item.leido?'3px solid rgba(60,174,120,.2)':'3px solid #3CAE78' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <div>
                <span style={{ fontWeight:600, fontSize:14 }}>{item.nombre}</span>
                <span style={{ color:'#8ABFA3', fontSize:12, marginLeft:10 }}>{item.correo}</span>
              </div>
              <span style={{ fontSize:11, color:'#8ABFA3' }}>{item.created_at?.slice(0,10)}</span>
            </div>
            <div style={{ fontSize:12, color:'#5DC995', marginBottom:6 }}>Asunto: {item.asunto}</div>
            <p style={{ fontSize:13, color:'#8ABFA3', lineHeight:1.65 }}>{item.mensaje}</p>
            <a href={`mailto:${item.correo}?subject=Re: ${item.asunto}`}
              style={{ display:'inline-block', marginTop:10, background:'rgba(60,174,120,.15)', color:'#5DC995', border:'1px solid rgba(60,174,120,.3)', borderRadius:7, padding:'5px 12px', fontSize:11, textDecoration:'none' }}>
              ✉️ Responder
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
