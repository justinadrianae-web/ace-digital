// src/pages/admin/AdminMiembros.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMiembros, actualizarEstadoMiembro } from '../../lib/supabase'
import toast from 'react-hot-toast'

const ESTADOS = { pendiente:'#fac832', aprobado:'#3CAE78', rechazado:'#f08080' }

export default function AdminMiembros() {
  const [miembros, setMiembros] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filtro, setFiltro]     = useState('todos')
  const [buscar, setBuscar]     = useState('')

  useEffect(() => {
    getMiembros().then(({ data }) => { setMiembros(data||[]); setLoading(false) })
  }, [])

  async function cambiarEstado(id, estado) {
    const { error } = await actualizarEstadoMiembro(id, estado)
    if (error) { toast.error('Error al actualizar'); return }
    setMiembros(m => m.map(x => x.id===id ? {...x, estado} : x))
    toast.success(`Miembro ${estado}`)
  }

  const filtrados = miembros.filter(m => {
    const matchFiltro = filtro === 'todos' || m.estado === filtro
    const matchBuscar = !buscar || m.nombre?.toLowerCase().includes(buscar.toLowerCase()) || m.correo?.toLowerCase().includes(buscar.toLowerCase())
    return matchFiltro && matchBuscar
  })

  const tdStyle = { padding:'12px 14px', fontSize:13, color:'#E8F5EE', borderBottom:'1px solid rgba(60,174,120,.08)' }
  const thStyle = { padding:'10px 14px', fontSize:11, color:'#8ABFA3', fontWeight:500, textAlign:'left', borderBottom:'1px solid rgba(60,174,120,.13)', textTransform:'uppercase', letterSpacing:'.06em' }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#0C1C15', minHeight:'100vh' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ marginBottom:32 }}>
          <Link to="/admin" style={{ color:'#8ABFA3', fontSize:12, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5, marginBottom:16 }}>← Volver al panel</Link>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, marginBottom:6 }}>Gestión de miembros</h1>
          <p style={{ color:'#8ABFA3', fontSize:14 }}>Revisa y aprueba las solicitudes de membresía de ACE.</p>
        </div>

        {/* Filtros */}
        <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
          {['todos','pendiente','aprobado','rechazado'].map(f => (
            <button key={f} onClick={() => setFiltro(f)}
              style={{ background: filtro===f?'#3CAE78':'transparent', color: filtro===f?'#fff':'#8ABFA3', border:'1px solid rgba(60,174,120,.25)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif', textTransform:'capitalize' }}>
              {f} {f!=='todos' && `(${miembros.filter(m=>m.estado===f).length})`}
            </button>
          ))}
          <input type="text" placeholder="Buscar por nombre o correo..." value={buscar} onChange={e=>setBuscar(e.target.value)}
            style={{ marginLeft:'auto', maxWidth:260, background:'#132A1E', border:'1px solid rgba(60,174,120,.2)', borderRadius:8, padding:'7px 12px', fontSize:12, color:'#E8F5EE', outline:'none' }} />
        </div>

        {loading ? <p style={{ color:'#8ABFA3' }}>Cargando miembros...</p> : (
          <div style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:14, overflow:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  {['Nombre','Correo','Carrera','Semestre','Estado','Acciones'].map(h=>(
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.length === 0 ? (
                  <tr><td colSpan={6} style={{ ...tdStyle, textAlign:'center', color:'#8ABFA3', padding:28 }}>No hay miembros con este filtro.</td></tr>
                ) : filtrados.map(m => (
                  <tr key={m.id}>
                    <td style={tdStyle}><div style={{ fontWeight:600 }}>{m.nombre}</div><div style={{ fontSize:11, color:'#8ABFA3' }}>{m.cedula}</div></td>
                    <td style={{ ...tdStyle, color:'#8ABFA3' }}>{m.correo}</td>
                    <td style={{ ...tdStyle, color:'#8ABFA3' }}>{m.carrera}</td>
                    <td style={{ ...tdStyle, color:'#8ABFA3' }}>{m.semestre}</td>
                    <td style={tdStyle}>
                      <span style={{ background:`${ESTADOS[m.estado]}22`, color:ESTADOS[m.estado], border:`1px solid ${ESTADOS[m.estado]}44`, fontSize:11, padding:'2px 10px', borderRadius:99 }}>
                        {m.estado}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display:'flex', gap:6 }}>
                        {m.estado !== 'aprobado' && <button onClick={()=>cambiarEstado(m.id,'aprobado')} style={{ background:'rgba(60,174,120,.15)', color:'#5DC995', border:'1px solid rgba(60,174,120,.3)', borderRadius:6, padding:'4px 10px', fontSize:11, cursor:'pointer' }}>✓ Aprobar</button>}
                        {m.estado !== 'rechazado' && <button onClick={()=>cambiarEstado(m.id,'rechazado')} style={{ background:'rgba(200,50,50,.1)', color:'#f08080', border:'1px solid rgba(200,50,50,.25)', borderRadius:6, padding:'4px 10px', fontSize:11, cursor:'pointer' }}>✗ Rechazar</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
