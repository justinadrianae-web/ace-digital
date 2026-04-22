// src/pages/Contacto.jsx
import { useState, useEffect } from 'react'
import { useReveal } from '../lib/useReveal'
import { enviarConsulta } from '../lib/supabase'
import toast from 'react-hot-toast'

const LIDERES = [
  { iniciales:'NR', nombre:'Nathalie Rivera', cargo:'Coordinadora General', whatsapp:'593990558066', correo:'nathalie.rivera@ace-ug.com', instagram:'alianzacolectivaestudiantil' },
  { iniciales:'AP', nombre:'Angel Pilay', cargo:'Coordinador', whatsapp:'593991450284', correo:'angel.pilay@ace-ug.com', instagram:'alianzacolectivaestudiantil' },
  { iniciales:'JG', nombre:'Joshua Guagua', cargo:'Coordinador', whatsapp:'593961687728', correo:'joshua.guagua@ace-ug.com', instagram:'alianzacolectivaestudiantil' },
]

export default function Contacto() {
  useReveal()
  useEffect(() => { document.title = 'Contacto — ACE Digital' }, [])
  const [form, setForm] = useState({ nombre:'', correo:'', asunto:'Consulta general', mensaje:'' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  async function handleSubmit() {
    if (!form.nombre || !form.correo || !form.mensaje) { toast.error('Completa todos los campos'); return }
    setSending(true)
    const { error } = await enviarConsulta(form)
    setSending(false)
    if (error) { toast.error('Error al enviar'); return }
    toast.success('¡Mensaje enviado!'); setSent(true)
  }

  const boxStyle = { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:16, padding:26 }
  const fgStyle = { display:'flex', flexDirection:'column', gap:5, marginBottom:12 }
  const lblStyle = { fontSize:12, color:'#8ABFA3', fontWeight:500 }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#102019', minHeight:'100vh' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal">
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Contacto
          </div>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, lineHeight:1.1, marginBottom:10 }}>Habla directamente<br/>con los líderes de ACE</h1>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start', marginTop:44 }}>
          <div className="reveal">
            <p style={{ color:'#8ABFA3', fontSize:14, lineHeight:1.75, marginBottom:24 }}>¿Tienes dudas sobre ACE, la plataforma digital o quieres colaborar? Contacta directamente al equipo de liderazgo.</p>
            {LIDERES.map((l,i) => (
              <div key={i} style={{ ...boxStyle, display:'flex', alignItems:'center', gap:14, marginBottom:10 }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:'#1A3227', border:'1px solid rgba(60,174,120,.13)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:700, fontSize:14, color:'#3CAE78', flexShrink:0 }}>{l.iniciales}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{l.nombre}</div>
                  <div style={{ fontSize:11, color:'#5DC995', marginBottom:7 }}>{l.cargo}</div>
                  <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                    {l.whatsapp && <a href={`https://wa.me/${l.whatsapp}`} target="_blank" rel="noreferrer" style={{ fontSize:11, color:'#8ABFA3', textDecoration:'none', background:'rgba(60,174,120,.07)', padding:'3px 9px', borderRadius:99, border:'1px solid rgba(60,174,120,.15)' }}>📱 WhatsApp</a>}
                    {l.correo && <a href={`mailto:${l.correo}`} style={{ fontSize:11, color:'#8ABFA3', textDecoration:'none', background:'rgba(60,174,120,.07)', padding:'3px 9px', borderRadius:99, border:'1px solid rgba(60,174,120,.15)' }}>✉️ Correo</a>}
                    {l.instagram && <a href={`https://instagram.com/${l.instagram}`} target="_blank" rel="noreferrer" style={{ fontSize:11, color:'#8ABFA3', textDecoration:'none', background:'rgba(60,174,120,.07)', padding:'3px 9px', borderRadius:99, border:'1px solid rgba(60,174,120,.15)' }}>📸 Instagram</a>}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:16, background:'rgba(60,174,120,.06)', border:'1px solid rgba(60,174,120,.15)', borderRadius:10, padding:'14px 18px', fontSize:12, color:'#8ABFA3', lineHeight:1.65 }}>
              📍 <strong style={{ color:'#5DC995' }}>ACE PERTENECE A</strong> — Facultad de Jurisprudencia, UG Guayaquil<br/>
              🕐 Atención Online: Lunes a Viernes · 10:00–13:00 y 15:00–18:00
            </div>
          </div>

          <div style={boxStyle} className="reveal">
            {sent ? (
              <div style={{ textAlign:'center', padding:'40px 20px' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
                <h4 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, marginBottom:8 }}>¡Mensaje enviado!</h4>
                <p style={{ fontSize:13, color:'#8ABFA3' }}>ACE responderá en menos de 24 horas.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:600, marginBottom:4 }}>Enviar consulta</h3>
                <p style={{ fontSize:12, color:'#8ABFA3', marginBottom:20 }}>Te responderemos en menos de 24 horas.</p>
                <div style={fgStyle}><label style={lblStyle}>Tu nombre *</label><input type="text" placeholder="Nombre completo" value={form.nombre} onChange={e=>set('nombre',e.target.value)} /></div>
                <div style={fgStyle}><label style={lblStyle}>Correo *</label><input type="email" placeholder="tu@correo.com" value={form.correo} onChange={e=>set('correo',e.target.value)} /></div>
                <div style={fgStyle}><label style={lblStyle}>Asunto</label>
                  <select value={form.asunto} onChange={e=>set('asunto',e.target.value)}>
                    {['Consulta general','Inscripción a ACE','Propuesta de evento','Colaboración externa','Problema técnico','Otro'].map(a=><option key={a}>{a}</option>)}
                  </select>
                </div>
                <div style={fgStyle}><label style={lblStyle}>Mensaje *</label><textarea placeholder="Escribe tu consulta..." style={{ minHeight:100 }} value={form.mensaje} onChange={e=>set('mensaje',e.target.value)} /></div>
                <button style={{ width:'100%', background:'#3CAE78', color:'#fff', border:'none', padding:13, borderRadius:9, fontSize:14, fontFamily:'DM Sans,sans-serif', fontWeight:500, cursor:'pointer', opacity:sending?.7:1 }} onClick={handleSubmit} disabled={sending}>
                  {sending?'Enviando...':'Enviar mensaje →'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
