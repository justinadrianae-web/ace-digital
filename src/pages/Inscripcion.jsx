// src/pages/Inscripcion.jsx
import { useState, useEffect } from 'react'
import { useReveal } from '../lib/useReveal'
import { registrarMiembro } from '../lib/supabase'
import toast from 'react-hot-toast'

const s = {
  page:    { paddingTop: 100, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: '#102019', minHeight: '100vh' },
  wrap:    { maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' },
  box:     { background: '#132A1E', border: '1px solid rgba(60,174,120,.13)', borderRadius: 16, padding: 28 },
  grid:    { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  fg:      { display: 'flex', flexDirection: 'column', gap: 5 },
  label:   { fontSize: 12, color: '#8ABFA3', fontWeight: 500 },
  req:     { color: '#3CAE78' },
  btn:     { width: '100%', marginTop: 18, background: '#3CAE78', color: '#fff', border: 'none', padding: 13, borderRadius: 9, fontSize: 14, fontFamily: 'DM Sans,sans-serif', fontWeight: 500, cursor: 'pointer' },
  perk:    { display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#8ABFA3', marginBottom: 10 },
  perkIcon:{ width: 32, height: 32, borderRadius: 8, background: 'rgba(60,174,120,.1)', border: '1px solid rgba(60,174,120,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 },
  success: { textAlign: 'center', padding: '40px 20px' },
}

export default function Inscripcion() {
  useReveal()
  useEffect(() => { document.title = 'Únete a ACE — Inscripción' }, [])

  const [form, setForm] = useState({
    nombre:'', cedula:'', correo:'', celular:'', fechaNac:'',
    facultad:'', carrera:'', semestre:'', ciudad:'',
    motivo:'', habilidad:'', comoConocio:'', terminos: false,
  })
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit() {
    if (!form.nombre || !form.correo || !form.cedula || !form.motivo) {
      toast.error('Completa los campos obligatorios (*)'); return
    }
    if (!form.terminos) {
      toast.error('Acepta los términos para continuar'); return
    }
    setLoading(true)
    const { error } = await registrarMiembro(form)
    setLoading(false)
    if (error) {
      if (error.code === '23505') toast.error('Este correo o cédula ya está registrado.')
      else toast.error('Error al enviar. Intenta de nuevo.')
      return
    }
    setSuccess(true)
    toast.success('¡Solicitud enviada!')
  }

  if (success) return (
    <div style={s.page}>
      <div style={{ maxWidth:540, margin:'80px auto', ...s.box, ...s.success }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
        <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:24, fontWeight:800, marginBottom:10 }}>¡Solicitud enviada!</h2>
        <p style={{ color:'#8ABFA3', fontSize:14, lineHeight:1.7 }}>Gracias por unirte a ACE. El equipo directivo revisará tu solicitud y recibirás un correo de confirmación pronto.</p>
        <br/>
        <a href="/eventos" style={{ background:'#3CAE78', color:'#fff', padding:'11px 24px', borderRadius:9, textDecoration:'none', fontSize:13, display:'inline-block', marginTop:8 }}>Ver próximos eventos →</a>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        {/* Info lateral */}
        <div className="reveal">
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Únete a ACE
          </div>
          <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, lineHeight:1.1, marginBottom:12 }}>Forma parte<br/>de la Alianza</h1>
          <p style={{ color:'#8ABFA3', fontSize:14, lineHeight:1.75, marginBottom:24 }}>Completa el formulario y sé parte de la comunidad estudiantil más activa de la Facultad de Jurisprudencia.</p>
          {[
            ['📅','Acceso al calendario exclusivo de eventos'],
            ['✉️','Correo de bienvenida y notificaciones automáticas'],
            ['🗳️','Derecho a votar en decisiones de ACE'],
            ['🎓','Participación en todos los programas y actividades'],
            ['🤝','Red de contactos estudiantiles y docentes'],
          ].map(([icon, txt]) => (
            <div key={txt} style={s.perk}><div style={s.perkIcon}>{icon}</div>{txt}</div>
          ))}
        </div>

        {/* Formulario */}
        <div style={s.box} className="reveal">
          <div style={s.grid}>
            <div style={{ ...s.fg, gridColumn:'span 2' }}>
              <label style={s.label}>Nombres completos <span style={s.req}>*</span></label>
              <input type="text" placeholder="Ej: Juan Carlos Pérez Mendoza" value={form.nombre} onChange={e=>set('nombre',e.target.value)} />
            </div>
            <div style={s.fg}>
              <label style={s.label}>Cédula <span style={s.req}>*</span></label>
              <input type="text" placeholder="0912345678" maxLength={10} value={form.cedula} onChange={e=>set('cedula',e.target.value)} />
            </div>
            <div style={s.fg}>
              <label style={s.label}>Fecha de nacimiento <span style={s.req}>*</span></label>
              <input type="date" value={form.fechaNac} onChange={e=>set('fechaNac',e.target.value)} />
            </div>
            <div style={s.fg}>
              <label style={s.label}>Correo electrónico <span style={s.req}>*</span></label>
              <input type="email" placeholder="tu@ug.edu.ec" value={form.correo} onChange={e=>set('correo',e.target.value)} />
            </div>
            <div style={s.fg}>
              <label style={s.label}>Celular <span style={s.req}>*</span></label>
              <input type="tel" placeholder="0991234567" value={form.celular} onChange={e=>set('celular',e.target.value)} />
            </div>
            <div style={{ ...s.fg, gridColumn:'span 2' }}>
              <label style={s.label}>Facultad <span style={s.req}>*</span></label>
              <select value={form.facultad} onChange={e=>set('facultad',e.target.value)}>
                <option value="">Seleccionar...</option>
                <option>Jurisprudencia y Ciencias Sociales</option>
                <option>Ciencias Económicas</option>
                <option>Ciencias Matemáticas y Físicas</option>
                <option>Comunicación Social</option>
                <option>Filosofía, Letras y Ciencias de la Educación</option>
                <option>Ciencias Médicas</option>
                <option>Otra</option>
              </select>
            </div>
            <div style={s.fg}>
              <label style={s.label}>Carrera <span style={s.req}>*</span></label>
              <select value={form.carrera} onChange={e=>set('carrera',e.target.value)}>
                <option value="">Seleccionar...</option>
                <option>Derecho</option><option>Sociología</option>
                <option>Trabajo Social</option><option>Ciencias Políticas</option>
              </select>
            </div>
            <div style={s.fg}>
              <label style={s.label}>Semestre <span style={s.req}>*</span></label>
              <select value={form.semestre} onChange={e=>set('semestre',e.target.value)}>
                <option value="">Seleccionar...</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n}>{n}° Semestre</option>)}
              </select>
            </div>
            <div style={s.fg}>
              <label style={s.label}>Ciudad</label>
              <input type="text" placeholder="Guayaquil" value={form.ciudad} onChange={e=>set('ciudad',e.target.value)} />
            </div>
            <div style={s.fg}>
              <label style={s.label}>¿Cómo conociste ACE?</label>
              <select value={form.comoConocio} onChange={e=>set('comoConocio',e.target.value)}>
                <option value="">Seleccionar...</option>
                <option>Redes sociales</option><option>Un compañero</option>
                <option>Evento en la facultad</option><option>Otro</option>
              </select>
            </div>
            <div style={{ ...s.fg, gridColumn:'span 2' }}>
              <label style={s.label}>¿Por qué quieres unirte? <span style={s.req}>*</span></label>
              <textarea placeholder="Cuéntanos tu motivación..." value={form.motivo} onChange={e=>set('motivo',e.target.value)} />
            </div>
            <div style={{ ...s.fg, gridColumn:'span 2' }}>
              <label style={s.label}>Habilidades o áreas de interés</label>
              <select value={form.habilidad} onChange={e=>set('habilidad',e.target.value)}>
                <option value="">Seleccionar...</option>
                <option>Diseño gráfico</option><option>Programación / Tecnología</option>
                <option>Comunicación / Redacción</option><option>Organización de eventos</option>
                <option>Liderazgo / Gestión</option><option>Fotografía / Video</option><option>Otra</option>
              </select>
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'flex-start', gap:9, marginTop:14 }}>
            <input type="checkbox" id="terms" checked={form.terminos} onChange={e=>set('terminos',e.target.checked)} style={{ width:16, height:16, marginTop:2, flexShrink:0 }} />
            <label htmlFor="terms" style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.5 }}>
              Acepto que mis datos sean almacenados por ACE para comunicaciones internas. Nunca serán compartidos con terceros.
            </label>
          </div>

          <button style={{ ...s.btn, opacity: loading ? .7 : 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar solicitud de membresía →'}
          </button>
        </div>
      </div>
    </div>
  )
}
