import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Galeria() {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImagenes() {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });
      
      if (!error && data) {
        console.log('Imágenes cargadas:', data); // Debug
        setImagenes(data);
      } else {
        console.error('Error cargando galería:', error);
      }
      setLoading(false);
    }
    fetchImagenes();
  }, []);

  return (
    <section id="galeria" style={{ padding:'96px 24px', background:'#0C1C15' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ marginBottom:44 }}>
          <div style={{ color:'#3CAE78', fontSize:11, fontWeight:500, textTransform:'uppercase', letterSpacing:'.12em', marginBottom:12, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ width:16, height:1, background:'#3CAE78', display:'inline-block' }}></span>Galería ACE
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(24px,4vw,40px)', fontWeight:800, lineHeight:1.1 }}>Momentos, logros y la<br/>identidad visual que nos representa</h2>
          <p style={{ color:'#8ABFA3', fontSize:15, marginTop:10, maxWidth:500 }}>Como fraternidad política estudiantil.</p>
        </div>

        {loading ? (
          <p style={{ color:'#8ABFA3', textAlign:'center' }}>Cargando galería...</p>
        ) : imagenes.length === 0 ? (
          <p style={{ color:'#8ABFA3', textAlign:'center' }}>No hay imágenes en la galería.</p>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:14 }}>
            {imagenes.map((img) => (
              <div key={img.id} className="reveal" style={{ background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:14, overflow:'hidden', transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.3)';e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(60,174,120,.13)';e.currentTarget.style.transform='none'}}>
                <img 
                  src={img.imagen_url} 
                  alt={img.titulo} 
                  style={{ width:'100%', height:220, objectFit:'cover', display:'block' }}
                  onError={(e) => {
                    console.error('Error cargando imagen:', img.imagen_url);
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{ padding:18 }}>
                  <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:15, fontWeight:600, marginBottom:6 }}>{img.titulo}</h3>
                  <p style={{ fontSize:12, color:'#8ABFA3', lineHeight:1.6 }}>{img.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}