// src/pages/admin/AdminEventos.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from "../lib/supabase";
import toast from 'react-hot-toast'

const ESTADOS = { pendiente:'#fac832', aprobado:'#3CAE78', rechazado:'#f08080' }

export default function AdminEventos() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('pendiente')
  const [editando, setEditando] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: '',
    tipo: 'académico',
    requiere_reg: false,
    estado: 'aprobado',
    autor: 'Admin'
  })

  useEffect(() => { fetchEventos() }, [])

  async function fetchEventos() {
    setLoading(true)
    const { data, error } = await supabase.from('eventos').select('*').order('fecha', { ascending: false })
    if (!error && data) setEventos(data)
    setLoading(false)
  }

  async function cambiarEstado(id, estado) {
    const { error } = await supabase.from('eventos').update({ estado }).eq('id', id)
    if (error) { toast.error('Error'); return }
    setEventos(e => e.map(x => x.id===id ? {...x,estado} : x))
    toast.success(`Evento ${estado}`)
  }

  async function guardarEvento() {
    if (!form.nombre || !form.fecha || !form.hora) {
      toast.error('Completa nombre, fecha y hora')
      return
    }

    if (editando) {
      const { error } = await supabase.from('eventos').update(form).eq('id', editando)
      if (!error) {
        toast.success('Evento actualizado')
        resetForm()
        fetchEventos()
      } else {
        toast.error('Error al actualizar')
      }
    } else {
      const { error } = await supabase.from('eventos').insert([form])
      if (!error) {
        toast.success('Evento creado')
        resetForm()
        fetchEventos()
      } else {
        toast.error('Error al crear')
      }
    }
  }

  async function eliminarEvento(id) {
    if (!confirm('¿Eliminar este evento permanentemente?')) return
    const { error } = await supabase.from('eventos').delete().eq('id', id)
    if (!error) {
      toast.success('Evento eliminado')
      fetchEventos()
    } else {
      toast.error('Error al eliminar')
    }
  }

  function editarEvento(evt) {
    setEditando(evt.id)
    setForm({
      nombre: evt.nombre,
      descripcion: evt.descripcion || '',
      fecha: evt.fecha,
      hora: evt.hora,
      lugar: evt.lugar || '',
      tipo: evt.tipo,
      requiere_reg: evt.requiere_reg || false,
      estado: evt.estado,
      autor: evt.autor || 'Admin'
    })
    setMostrarForm(true)
  }

  function resetForm() {
    setEditando(null)
    setMostrarForm(false)
    setForm({
      nombre: '',
      descripcion: '',
      fecha: '',
      hora: '',
      lugar: '',
      tipo: 'académico',
      requiere_reg: false,
      estado: 'aprobado',
      autor: 'Admin'
    })
  }

  const filtrados = eventos.filter(e => filtro === 'todos' || e.estado === filtro)
  const cardStyle = { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:12, padding:18, marginBottom:10 }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#102019', minHeight:'100vh' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <Link to="/admin" style={{ color:'#8ABFA3', fontSize:12, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5, marginBottom:16 }}>← Volver</Link>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800 }}>Gestión de eventos</h1>
          <button 
            onClick={() => setMostrarForm(!mostrarForm)}
            style={{ background:'#3CAE78', color:'#fff', border:'none', borderRadius:8, padding:'8px 18px', fontSize:13, cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:500 }}
          >
            {mostrarForm ? '✕ Cerrar' : '+ Crear evento'}
          </button>
        </div>
        <p style={{ color:'#8ABFA3', fontSize:14, marginBottom:28 }}>Crea, edita, aprueba o elimina eventos del calendario.</p>

        {/* FORMULARIO */}
        {mostrarForm && (
          <div style={{ ...cardStyle, marginBottom:24 }}>
            <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16, fontWeight:600, marginBottom:16 }}>
              {editando ? 'Editar evento' : 'Crear nuevo evento'}
            </h3>
            
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
              <div>
                <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Nombre del evento *</label>
                <input 
                  type="text" 
                  value={form.nombre}
                  onChange={(e) => setForm({...form, nombre: e.target.value})}
                  placeholder="Ej: Taller de Derecho Constitucional"
                  style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
                />
              </div>
              <div>
                <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Tipo</label>
                <select 
                  value={form.tipo}
                  onChange={(e) => setForm({...form, tipo: e.target.value})}
                  style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
                >
                  <option value="académico">Académico</option>
                  <option value="social">Social</option>
                  <option value="deportivo">Deportivo</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Descripción</label>
              <textarea
                value={form.descripcion}
                onChange={(e) => setForm({...form, descripcion: e.target.value})}
                placeholder="Describe el evento..."
                rows="3"
                style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
              />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:12 }}>
              <div>
                <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Fecha *</label>
                <input 
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({...form, fecha: e.target.value})}
                  style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
                />
              </div>
              <div>
                <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Hora *</label>
                <input 
                  type="time"
                  value={form.hora}
                  onChange={(e) => setForm({...form, hora: e.target.value})}
                  style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
                />
              </div>
              <div>
                <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Lugar</label>
                <input 
                  type="text"
                  value={form.lugar}
                  onChange={(e) => setForm({...form, lugar: e.target.value})}
                  placeholder="Ej: Aula 301"
                  style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
                />
              </div>
            </div>

            <div style={{ display:'flex', gap:16, marginBottom:16 }}>
              <label style={{ fontSize:12, color:'#8ABFA3', display:'flex', alignItems:'center', gap:6, cursor:'pointer' }}>
                <input 
                  type="checkbox"
                  checked={form.requiere_reg}
                  onChange={(e) => setForm({...form, requiere_reg: e.target.checked})}
                />
                Requiere inscripción
              </label>
              <div>
                <label style={{ fontSize:12, color:'#8ABFA3', marginRight:8 }}>Estado:</label>
                <select 
                  value={form.estado}
                  onChange={(e) => setForm({...form, estado: e.target.value})}
                  style={{ background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'4px 10px', color:'#fff', fontSize:12 }}
                >
                  <option value="aprobado">Aprobado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>
            </div>

            <div style={{ display:'flex', gap:8 }}>
              <button 
                onClick={guardarEvento}
                style={{ background:'#3CAE78', color:'#fff', border:'none', borderRadius:7, padding:'8px 18px', fontSize:13, cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:500 }}
              >
                {editando ? 'Actualizar evento' : 'Crear evento'}
              </button>
              {editando && (
                <button 
                  onClick={resetForm}
                  style={{ background:'rgba(200,50,50,.15)', color:'#f08080', border:'1px solid rgba(200,50,50,.3)', borderRadius:7, padding:'8px 18px', fontSize:13, cursor:'pointer' }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        )}

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
              <button onClick={()=>editarEvento(evt)} style={{ background:'rgba(60,120,200,.15)', color:'#7cb5ff', border:'1px solid rgba(60,120,200,.3)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer' }}>✎ Editar</button>
              {evt.estado !== 'aprobado' && <button onClick={()=>cambiarEstado(evt.id,'aprobado')} style={{ background:'rgba(60,174,120,.15)', color:'#5DC995', border:'1px solid rgba(60,174,120,.3)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer' }}>✓ Aprobar</button>}
              {evt.estado !== 'rechazado' && <button onClick={()=>cambiarEstado(evt.id,'rechazado')} style={{ background:'rgba(200,50,50,.1)', color:'#f08080', border:'1px solid rgba(200,50,50,.25)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer' }}>✗ Rechazar</button>}
              <button onClick={()=>eliminarEvento(evt.id)} style={{ background:'rgba(200,50,50,.15)', color:'#f08080', border:'1px solid rgba(200,50,50,.3)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer' }}>🗑 Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}