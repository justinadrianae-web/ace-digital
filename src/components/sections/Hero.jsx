import { Link } from 'react-router-dom'
export default function Hero() {
  return (
    <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'120px 24px 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(60,174,120,.2) 0%,transparent 65%),radial-gradient(ellipse 40% 40% at 85% 80%,rgba(40,134,92,.1) 0%,transparent 60%)' }}></div>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(60,174,120,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(60,174,120,.04) 1px,transparent 1px)', backgroundSize:'48px 48px' }}></div>
      <div style={{ position:'relative', zIndex:1, maxWidth:780 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(60,174,120,.1)', border:'1px solid rgba(60,174,120,.28)', color:'#5DC995', fontSize:12, fontWeight:500, padding:'6px 14px', borderRadius:99, marginBottom:26, animation:'fadeUp .6s ease both' }}>
          <span style={{ width:6, height:6, background:'#3CAE78', borderRadius:'50%', animation:'pulse 2s infinite' }}></span>
          Fraternidad Política · Fundada 7 Agosto 2020 · UG
        </div>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(36px,7vw,72px)', fontWeight:800, lineHeight:1.05, letterSpacing:-1.5, marginBottom:20, animation:'fadeUp .6s .1s ease both' }}>
          La voz estudiantil<br/>ahora tiene <em style={{ fontStyle:'normal', color:'#3CAE78' }}>plataforma</em>
        </h1>
        <p style={{ fontSize:'clamp(14px,2vw,17px)', color:'#8ABFA3', lineHeight:1.75, maxWidth:620, margin:'0 auto 38px', animation:'fadeUp .6s .2s ease both' }}>
          ACE Alianza Colectiva Estudiantil construye el cambio desde adentro: eventos, comunicación, votaciones y más — todo en un solo lugar. Hecho por y para estudiantes.
        </p>
        <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', animation:'fadeUp .6s .3s ease both' }}>
          <Link to="/inscripcion" style={{ background:'#3CAE78', color:'#fff', border:'none', padding:'12px 24px', borderRadius:9, fontSize:14, fontFamily:'DM Sans,sans-serif', fontWeight:500, cursor:'pointer', textDecoration:'none' }}>
            Únete a ACE →
          </Link>
          <a href="#historia" style={{ background:'transparent', color:'#E8F5EE', border:'1px solid rgba(255,255,255,.14)', padding:'12px 24px', borderRadius:9, fontSize:14, textDecoration:'none' }}>
            Conocer más
          </a>
        </div>
        <div style={{ display:'flex', gap:44, justifyContent:'center', marginTop:68, flexWrap:'wrap', animation:'fadeUp .6s .4s ease both' }}>
          {[['5+','Años de historia'],['4','Proyectos oficiales'],['$0','Costo de plataforma'],['100%','Liderazgo horizontal']].map(([n,l])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, color:'#3CAE78' }}>{n}</div>
              <div style={{ fontSize:11, color:'#8ABFA3', marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}