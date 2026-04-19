// src/pages/Eventos.jsx
import { useState, useEffect } from 'react'
import { useReveal } from '../lib/useReveal'
import { getEventos, crearEvento, inscribirseEvento } from '../lib/supabase'
import toast from 'react-hot-toast'

const S = {
  page:  { paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#0C1C15', minHeight:'100vh' },
  cont:  { maxWidth:1100, margin:'0 auto' },
  box:   { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:16, padding:26 },
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start' },
  fg:    { display:'flex', flexDirection:'column', gap:5, marginBottom:12 },
  lbl:   { fontSize:12, color:'#8ABFA3', fontWeight:500 },
  btn:   { width:'100%', background:'#3CAE78', color:'#fff', border:'none', padding:'11px', borderRadius:9, fontSize:13, fontFamily:'DM Sans,sans-serif', fontWeight:500, cursor:'pointer', marginTop:14 },
}

export default function Eventos() {
  useReveal()
  useEffect(() => { document.title = 'Eventos — ACE Digital' }, [])

  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [openEvt, setOpenEvt] = useState(null)

  // Form proponer evento
  const [eForm, setEForm] = useState({ nombre:'', tipo:'Académico', fecha:'', hora:'14:00', lugar:'', descripcion:'', autor:'', requiereReg:false })
  const [eSending, setESending] = useState(false)
  const [eSent, setESent] = useState(false)

  // Form inscripción
  const [iForm, setIForm] = useState({ nombre:'', correo:'', carrera:'Derecho', semestre:'1°' })
  const [iSending, setISending] = useState(false)

  useEffect(() => {
    getEventos(true).then(({ data }) => {
      setEventos(data || [])
      setLoading(false)
    })
  }, [])

  async function handleProponer() {
    if (!eForm.nombre || !eForm.fecha || !eForm.descripcion) {
      toast.error('Completa nombre, fecha y descripción'); return
    }
    setESending(true)
    const { error } = await crearEvento(eForm)
    setESending(false)
    if (error) { toast.error('Error al enviar la propuesta'); return }
    toast.success('¡Propuesta enviada! El admin la revisará.')
    setESent(true)
  }

  async function handleInscripcion(eventoId) {
    if (!iForm.nombre || !iForm.correo) {
      toast.error('Ingresa tu nombre y correo'); return
    }
    setISending(true)
    const { error } = await inscribirseEvento({ ...iForm, eventoId })
    setISending(false)
    if (error) {
      if (error.code === '23505') toast.error('Ya estás inscrito a este evento')
      else toast.error('Error al inscribirse')
      return
    }
    toast.success('¡Inscripción exitosa!')
    setOpenEvt(null)
  }

  return (
    <div style={S.page}>
      <div style={S.cont}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom:48 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Gestión de eventos
          </div>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, lineHeight:1.1, marginBottom:10 }}>Propone y participa<br/>en eventos de ACE</h1>
          <p style={{ color:'#8ABFA3', fontSize:15, lineHeight:1.72, maxWidth:500 }}>Cualquier miembro puede proponer un evento. El admin lo revisa antes de publicarlo en el calendario.</p>
        </div>

        <div style={S.grid2}>
          {/* Proponer evento */}
          <div style={S.box} className="reveal">
            <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:600, marginBottom:4 }}>Proponer un evento</h3>
            <p style={{ fontSize:12, color:'#8ABFA3', marginBottom:20 }}>El equipo directivo revisará tu propuesta y te notificará.</p>

            {eSent ? (
              <div style={{ textAlign:'center', padding:'32px 16px' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>📋</div>
                <h4 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, marginBottom:8 }}>¡Propuesta enviada!</h4>
                <p style={{ fontSize:13, color:'#8ABFA3' }}>El equipo directivo la revisará y te notificará.</p>
                <button style={{ ...S.btn, width:'auto', padding:'9px 20px' }} onClick={() => { setESent(false); setEForm({ nombre:'', tipo:'Académico', fecha:'', hora:'14:00', lugar:'', descripcion:'', autor:'', requiereReg:false }) }}>
                  Proponer otro evento
                </button>
              </div>
            ) : (
              <>
                <div style={S.fg}><label style={S.lbl}>Nombre del evento *</label><input type="text" placeholder="Ej: Taller de Oratoria Jurídica" value={eForm.nombre} onChange={e=>setEForm(f=>({...f,nombre:e.target.value}))} /></div>
                <div style={S.fg}><label style={S.lbl}>Tipo</label>
                  <select value={eForm.tipo} onChange={e=>setEForm(f=>({...f,tipo:e.target.value}))}>
                    {['Académico','Cultural','Deportivo','Social','Informativo'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                  <div style={S.fg}><label style={S.lbl}>Fecha *</label><input type="date" value={eForm.fecha} onChange={e=>setEForm(f=>({...f,fecha:e.target.value}))} /></div>
                  <div style={S.fg}><label style={S.lbl}>Hora</label><input type="time" value={eForm.hora} onChange={e=>setEForm(f=>({...f,hora:e.target.value}))} /></div>
                </div>
                <div style={S.fg}><label style={S.lbl}>Lugar / modalidad</label><input type="text" placeholder="Ej: Aula Magna Jurisprudencia" value={eForm.lugar} onChange={e=>setEForm(f=>({...f,lugar:e.target.value}))} /></div>
                <div style={S.fg}><label style={S.lbl}>Descripción *</label><textarea placeholder="¿De qué trata? ¿A quién va dirigido?" value={eForm.descripcion} onChange={e=>setEForm(f=>({...f,descripcion:e.target.value}))} /></div>
                <div style={S.fg}><label style={S.lbl}>Tu nombre</label><input type="text" placeholder="Proponente" value={eForm.autor} onChange={e=>setEForm(f=>({...f,autor:e.target.value}))} /></div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <input type="checkbox" id="req-reg" checked={eForm.requiereReg} onChange={e=>setEForm(f=>({...f,requiereReg:e.target.checked}))} style={{ width:16, height:16, flexShrink:0 }} />
                  <label htmlFor="req-reg" style={{ fontSize:12, color:'#8ABFA3' }}>Este evento necesita formulario de inscripción</label>
                </div>
                <button style={{ ...S.btn, opacity:eSending?.7:1 }} onClick={handleProponer} disabled={eSending}>
                  {eSending ? 'Enviando...' : 'Enviar propuesta →'}
                </button>
              </>
            )}
          </div>

          {/* Eventos aprobados + inscripción */}
          <div className="reveal">
            <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:600, marginBottom:4 }}>Próximos eventos</h3>
            <p style={{ fontSize:12, color:'#8ABFA3', marginBottom:16 }}>Eventos aprobados. Inscríbete directamente desde aquí.</p>

            {loading ? (
              <p style={{ color:'#8ABFA3', fontSize:13, padding:'28px 0' }}>Cargando eventos...</p>
            ) : eventos.length === 0 ? (
              <div style={{ ...S.box, textAlign:'center', padding:'32px 16px', color:'#8ABFA3', fontSize:13 }}>
                No hay eventos aprobados por ahora.<br/>
                <a href="#" onClick={e=>{e.preventDefault()}} style={{ color:'#5DC995' }}>¡Propón el primero!</a>
              </div>
            ) : eventos.map(evt => (
              <div key={evt.id} style={{ ...S.box, marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                  <div>
                    <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, marginBottom:2 }}>{evt.nombre}</div>
                    <div style={{ fontSize:11, color:'#8ABFA3' }}>📅 {evt.fecha} · {evt.hora} · {evt.lugar || 'Por confirmar'}</div>
                  </div>
                  <span style={{ background:'rgba(60,174,120,.1)', color:'#5DC995', fontSize:10, padding:'2px 8px', borderRadius:99, border:'1px solid rgba(60,174,120,.18)' }}>{evt.tipo}</span>
                </div>
                <p style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.6, marginBottom:10 }}>{evt.descripcion}</p>
                {evt.requiere_reg && (
                  <>
                    <button style={{ background:'transparent', color:'#3CAE78', border:'1px solid rgba(60,174,120,.3)', borderRadius:7, padding:'6px 14px', fontSize:12, cursor:'pointer', fontFamily:'DM Sans,sans-serif' }}
                      onClick={() => setOpenEvt(openEvt === evt.id ? null : evt.id)}>
                      {openEvt === evt.id ? 'Cerrar inscripción ▲' : 'Inscribirme ▼'}
                    </button>
                    {openEvt === evt.id && (
                      <div style={{ marginTop:12, borderTop:'1px solid rgba(60,174,120,.1)', paddingTop:12 }}>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
                          <div style={S.fg}><label style={S.lbl}>Nombre *</label><input type="text" value={iForm.nombre} onChange={e=>setIForm(f=>({...f,nombre:e.target.value}))} /></div>
                          <div style={S.fg}><label style={S.lbl}>Correo *</label><input type="email" value={iForm.correo} onChange={e=>setIForm(f=>({...f,correo:e.target.value}))} /></div>
                          <div style={S.fg}><label style={S.lbl}>Carrera</label><select value={iForm.carrera} onChange={e=>setIForm(f=>({...f,carrera:e.target.value}))}><option>Derecho</option><option>Sociología</option><option>Trabajo Social</option></select></div>
                          <div style={S.fg}><label style={S.lbl}>Semestre</label><select value={iForm.semestre} onChange={e=>setIForm(f=>({...f,semestre:e.target.value}))}>{[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}°</option>)}</select></div>
                        </div>
                        <button style={{ ...S.btn, opacity:iSending?.7:1 }} onClick={() => handleInscripcion(evt.id)} disabled={iSending}>
                          {iSending ? 'Procesando...' : 'Confirmar inscripción →'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
