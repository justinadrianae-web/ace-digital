// src/components/sections/Funciones.jsx
import { Link } from 'react-router-dom'

export default function Funciones() {
  const feats = [
    { 
      icon:'📅', 
      title:'Calendario de eventos', 
      desc:'Todos los eventos en un calendario público. Los miembros reciben alertas automáticas antes de cada actividad.', 
      tag:'Público + privado',
      link: '/eventos'
    },
    { 
      icon:'✉️', 
      title:'Correos automáticos', 
      desc:'Bienvenida al registrarse, recordatorios 24h antes de eventos y newsletters periódicos. Cero esfuerzo manual.', 
      tag:'300/día gratis',
      link: '/contacto'
    },
    { 
      icon:'🗳️', 
      title:'Votaciones estudiantiles', 
      desc:'Sistema seguro de votaciones internas. Cada miembro vota una sola vez, autenticado con su correo institucional.', 
      tag:'Voto único seguro',
      link: '/inscripcion'
    },
    { 
      icon:'📊', 
      title:'Dashboard de métricas', 
      desc:'Visualiza el crecimiento de ACE: miembros, eventos realizados, asistencia y participación. Ideal para informes.', 
      tag:'Tiempo real',
      link: '/admin'
    },
    { 
      icon:'👥', 
      title:'Registro de miembros', 
      desc:'Formulario inteligente que guarda datos en la base de datos y envía correo de bienvenida automáticamente.', 
      tag:'BD integrada',
      link: '/inscripcion'
    },
    { 
      icon:'🌐', 
      title:'Portal de invitados', 
      desc:'REDMUN y otras organizaciones pueden solicitar participación en eventos o invitar a ACE a sus propias actividades.', 
      tag:'Colaboraciones externas',
      link: '/invitados'
    },
  ]
  
  return (
    <section id="funciones" style={{ padding:'96px 24px', background:'#0C1C15' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:44 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Plataforma digital
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>Todo lo que ACE necesita<br/>en un solo lugar</h2>
          <p style={{ color:'#8ABFA3', fontSize:15, marginTop:10, maxWidth:500 }}>Módulos diseñados para resolver los problemas reales que enfrenta la organización.</p>
        </div>
        
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:12 }}>
          {feats.map(f => (
            <Link 
              key={f.title}
              to={f.link}
              className="reveal" 
              style={{ 
                background:'#132A1E', 
                border:'1px solid rgba(60,174,120,.13)', 
                borderRadius:14, 
                padding:24, 
                transition:'all .3s',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                cursor: 'pointer'
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}
            >
              <div style={{ width:44, height:44, borderRadius:10, background:'rgba(60,174,120,.12)', border:'1px solid rgba(60,174,120,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, marginBottom:14 }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16, fontWeight:600, marginBottom:8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize:13, color:'#8ABFA3', lineHeight:1.62 }}>
                {f.desc}
              </p>
              <span style={{ display:'inline-block', marginTop:12, background:'rgba(60,174,120,.1)', color:'#5DC995', fontSize:11, padding:'3px 10px', borderRadius:99, border:'1px solid rgba(60,174,120,.18)' }}>
                {f.tag}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="reveal" style={{ marginTop:28, textAlign:'center' }}>
          <Link to="/inscripcion" style={{ background:'#3CAE78', color:'#fff', padding:'12px 28px', borderRadius:9, textDecoration:'none', fontSize:14, display:'inline-block' }}>
            Unirme y acceder a la plataforma →
          </Link>
        </div>
      </div>
    </section>
  )
}