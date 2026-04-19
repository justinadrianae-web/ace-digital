// src/pages/Invitados.jsx
import { useState, useEffect } from 'react'
import { useReveal } from '../lib/useReveal'
import { getEventos, crearSolicitudExterna } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function Invitados() {
  useReveal()
  useEffect(() => { document.title = 'Invitados externos — ACE Digital' }, [])
  const [eventos, setEventos] = useState([])
  const [selected, setSelected] = useState(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ organizacion:'', tipo:'Quiero asistir a un evento de ACE', eventoPropio:'', fechaPref:'', horaPref:'', lugar:'', representante:'', correo:'', mensaje:'' })
  const set = (k,v) => setForm(f=>({...f,[k]:v}))
  const isInvite = form.tipo.includes('invitar')

  useEffect(() => { getEventos(true).then(({data}) => setEventos(data||[])) }, [])

  async function handleSubmit() {
    if (!form.organizacion || !form.representante || !form.correo) { toast.error('Completa los campos obligatorios'); return }
    setSending(true)
    const { error } = await crearSolicitudExterna({ ...form, eventoAce: selected ? selected.nombre : null })
    setSending(false)
    if (error) { toast.error('Error al enviar'); return }
    toast.success('¡Solicitud enviada!'); setSent(true)
  }

  const boxStyle = { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:16, padding:26 }
  const fgStyle = { display:'flex', flexDirection:'column', gap:5, marginBottom:12 }
  const lblStyle = { fontSize:12, color:'#8ABFA3', fontWeight:500 }
  const btnStyle = { width:'100%', background:'#3CAE78', color:'#fff', border:'none', padding:13, borderRadius:9, fontSize:14, fontFamily:'DM Sans,sans-serif', fontWeight:500, cursor:'pointer', marginTop:6 }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#0C1C15', minHeight:'100vh' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal">
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Invitados externos
          </div>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, lineHeight:1.1, marginBottom:10 }}>Portal para organizaciones<br/>y delegaciones externas</h1>
          <p style={{ color:'#8ABFA3', fontSize:15, lineHeight:1.72, maxWidth:560, marginBottom:0 }}>Organizaciones como REDMUN pueden ver los eventos de ACE y solicitar participación o invitar a ACE a sus propios eventos.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start', marginTop:44 }}>
          <div className="reveal">
            <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:600, marginBottom:4 }}>Eventos disponibles de ACE</h3>
            <p style={{ fontSize:12, color:'#8ABFA3', marginBottom:16 }}>Selecciona el evento al que deseas asistir.</p>
            {eventos.length === 0 ? (
              <div style={{ ...boxStyle, textAlign:'center', padding:'28px 16px', color:'#8ABFA3', fontSize:13 }}>No hay eventos publicados aún.</div>
            ) : eventos.map(evt => (
              <div key={evt.id} onClick={() => setSelected(selected?.id===evt.id?null:evt)}
                style={{ background: selected?.id===evt.id?'rgba(60,174,120,.06)':'#102019', border:`1px solid ${selected?.id===evt.id?'#3CAE78':'rgba(60,174,120,.13)'}`, borderRadius:9, padding:12, cursor:'pointer', marginBottom:8, position:'relative' }}>
                {selected?.id===evt.id && <div style={{ position:'absolute', top:10, right:10, width:18, height:18, borderRadius:'50%', background:'#3CAE78', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff' }}>✓</div>}
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:13, fontWeight:600, marginBottom:3 }}>{evt.nombre}</div>
                <div style={{ fontSize:11, color:'#8ABFA3' }}>📅 {evt.fecha} · {evt.hora}</div>
                <div style={{ fontSize:11, color:'#5DC995', marginTop:4 }}>Cupos para delegaciones disponibles</div>
              </div>
            ))}
          </div>

          <div style={boxStyle} className="reveal">
            {sent ? (
              <div style={{ textAlign:'center', padding:'32px 16px' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
                <h4 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, marginBottom:8 }}>¡Solicitud enviada!</h4>
                <p style={{ fontSize:13, color:'#8ABFA3' }}>ACE responderá en menos de 48 horas al correo indicado.</p>
                <button style={{ ...btnStyle, width:'auto', padding:'9px 20px', marginTop:20 }} onClick={()=>{setSent(false);setSelected(null)}}>Nueva solicitud</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:600, marginBottom:4 }}>Solicitud de participación</h3>
                <p style={{ fontSize:12, color:'#8ABFA3', marginBottom:18 }}>El equipo directivo evaluará y responderá.</p>
                <div style={fgStyle}><label style={lblStyle}>Nombre de la organización *</label><input type="text" placeholder="Ej: REDMUN Ecuador" value={form.organizacion} onChange={e=>set('organizacion',e.target.value)} /></div>
                <div style={fgStyle}><label style={lblStyle}>Tipo de solicitud</label>
                  <select value={form.tipo} onChange={e=>set('tipo',e.target.value)}>
                    <option>Quiero asistir a un evento de ACE</option>
                    <option>Quiero invitar a ACE a mi evento</option>
                    <option>Quiero colaborar / co-organizar</option>
                  </select>
                </div>
                {isInvite && (<>
                  <div style={fgStyle}><label style={lblStyle}>Nombre de tu evento</label><input type="text" placeholder="Conferencia, taller..." value={form.eventoPropio} onChange={e=>set('eventoPropio',e.target.value)} /></div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:12 }}>
                    <div style={fgStyle}><label style={lblStyle}>Fecha preferida</label><input type="date" value={form.fechaPref} onChange={e=>set('fechaPref',e.target.value)} /></div>
                    <div style={fgStyle}><label style={lblStyle}>Horario</label><input type="time" value={form.horaPref} onChange={e=>set('horaPref',e.target.value)} /></div>
                  </div>
                  <div style={fgStyle}><label style={lblStyle}>Lugar</label><input type="text" placeholder="Ciudad, institución" value={form.lugar} onChange={e=>set('lugar',e.target.value)} /></div>
                </>)}
                <div style={fgStyle}><label style={lblStyle}>Evento ACE seleccionado</label><input type="text" value={selected?selected.nombre+' · '+selected.fecha:''} placeholder="Selecciona un evento a la izquierda" readOnly style={{ background:'rgba(60,174,120,.04)' }} /></div>
                <div style={fgStyle}><label style={lblStyle}>Representante *</label><input type="text" placeholder="Nombre completo" value={form.representante} onChange={e=>set('representante',e.target.value)} /></div>
                <div style={fgStyle}><label style={lblStyle}>Correo de contacto *</label><input type="email" placeholder="contacto@org.com" value={form.correo} onChange={e=>set('correo',e.target.value)} /></div>
                <div style={fgStyle}><label style={lblStyle}>Mensaje</label><textarea placeholder="Detalles adicionales..." value={form.mensaje} onChange={e=>set('mensaje',e.target.value)} /></div>
                <button style={{ ...btnStyle, opacity:sending?.7:1 }} onClick={handleSubmit} disabled={sending}>{sending?'Enviando...':'Enviar solicitud a ACE →'}</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
