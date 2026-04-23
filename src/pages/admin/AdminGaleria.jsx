import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

export default function AdminGaleria() {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    imagen_url: '',
    orden: 0,
    activo: true
  });
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    fetchImagenes();
  }, []);

  async function fetchImagenes() {
    setLoading(true);
    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .order('orden', { ascending: true });
    
    if (!error && data) {
      setImagenes(data);
    }
    setLoading(false);
  }

  function handleArchivoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar 5MB');
      return;
    }

    setArchivo(file);
    
    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function subirArchivo() {
    if (!archivo) return null;

    setUploading(true);

    // Generar nombre único
    const fileExt = archivo.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from('galeria-ace')
      .upload(filePath, archivo, {
        cacheControl: '3600',
        upsert: false
      });

    setUploading(false);

    if (error) {
      alert('Error al subir la imagen: ' + error.message);
      return null;
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('galeria-ace')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async function guardarImagen() {
    if (!form.titulo) {
      alert('Por favor completa el título');
      return;
    }

    let imagenUrl = form.imagen_url;

    // Si hay un archivo nuevo, subirlo
    if (archivo) {
      const url = await subirArchivo();
      if (!url) return;
      imagenUrl = url;
    }

    if (!imagenUrl) {
      alert('Por favor sube una imagen o ingresa una URL');
      return;
    }

    const datosImagen = { ...form, imagen_url: imagenUrl };

    if (editando) {
      const { error } = await supabase
        .from('galeria')
        .update(datosImagen)
        .eq('id', editando);
      
      if (!error) {
        alert('Imagen actualizada exitosamente');
        resetForm();
        fetchImagenes();
      } else {
        alert('Error al actualizar: ' + error.message);
      }
    } else {
      const { error } = await supabase
        .from('galeria')
        .insert([datosImagen]);
      
      if (!error) {
        alert('Imagen agregada exitosamente');
        resetForm();
        fetchImagenes();
      } else {
        alert('Error al agregar: ' + error.message);
      }
    }
  }

  async function eliminarImagen(id, imagenUrl) {
    if (!confirm('¿Estás seguro de eliminar esta imagen de la galería?')) return;

    // Si la imagen está en Supabase Storage, eliminarla
    if (imagenUrl && imagenUrl.includes('galeria-ace')) {
      const fileName = imagenUrl.split('/').pop();
      await supabase.storage.from('galeria-ace').remove([fileName]);
    }

    const { error } = await supabase
      .from('galeria')
      .delete()
      .eq('id', id);
    
    if (!error) {
      alert('Imagen eliminada exitosamente');
      fetchImagenes();
    } else {
      alert('Error al eliminar: ' + error.message);
    }
  }

  function editarImagen(imagen) {
    setEditando(imagen.id);
    setForm({
      titulo: imagen.titulo,
      descripcion: imagen.descripcion || '',
      imagen_url: imagen.imagen_url,
      orden: imagen.orden,
      activo: imagen.activo
    });
    setPreview(imagen.imagen_url);
  }

  function resetForm() {
    setEditando(null);
    setForm({
      titulo: '',
      descripcion: '',
      imagen_url: '',
      orden: 0,
      activo: true
    });
    setArchivo(null);
    setPreview('');
  }

  const cardStyle = { background:'#132A1E', border:'1px solid rgba(60,174,120,.13)', borderRadius:12, padding:18, marginBottom:10 }

  return (
    <div style={{ paddingTop:100, paddingBottom:80, paddingLeft:24, paddingRight:24, background:'#102019', minHeight:'100vh' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <Link to="/admin" style={{ color:'#8ABFA3', fontSize:12, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5, marginBottom:16 }}>← Volver</Link>
        <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, marginBottom:6 }}>Gestión de Galería</h1>
        <p style={{ color:'#8ABFA3', fontSize:14, marginBottom:28 }}>Sube imágenes desde tu celular o PC directamente.</p>

        {/* FORMULARIO */}
        <div style={{ ...cardStyle, marginBottom:24 }}>
          <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16, fontWeight:600, marginBottom:16 }}>
            {editando ? '✎ Editar Imagen' : '+ Agregar Nueva Imagen'}
          </h3>
          
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <div>
              <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Título *</label>
              <input 
                type="text" 
                value={form.titulo}
                onChange={(e) => setForm({...form, titulo: e.target.value})}
                placeholder="Ej: ¿Quiénes somos?"
                style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
              />
            </div>
            <div>
              <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Orden</label>
              <input 
                type="number"
                value={form.orden}
                onChange={(e) => setForm({...form, orden: parseInt(e.target.value)})}
                style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
              />
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({...form, descripcion: e.target.value})}
              placeholder="Breve descripción de la imagen..."
              rows="2"
              style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
            />
          </div>

          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:12, color:'#8ABFA3', display:'block', marginBottom:4 }}>
              📤 Subir imagen desde tu dispositivo *
            </label>
            <input 
              type="file"
              accept="image/*"
              onChange={handleArchivoChange}
              style={{ width:'100%', background:'#1A3227', border:'1px solid rgba(60,174,120,.2)', borderRadius:7, padding:'8px 12px', color:'#fff', fontSize:13 }}
            />
            <p style={{ fontSize:11, color:'rgba(138,191,163,.5)', marginTop:4 }}>
              💡 Máximo 5MB. Formatos: JPG, PNG, WebP, GIF
            </p>
          </div>

          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, color:'#8ABFA3', display:'flex', alignItems:'center', gap:6, cursor:'pointer' }}>
              <input 
                type="checkbox"
                checked={form.activo}
                onChange={(e) => setForm({...form, activo: e.target.checked})}
              />
              Imagen activa (visible en la galería pública)
            </label>
          </div>

          {preview && (
            <div style={{ marginBottom:16 }}>
              <p style={{ fontSize:12, color:'#8ABFA3', marginBottom:8 }}>Vista previa:</p>
              <img 
                src={preview} 
                alt="Preview" 
                style={{ maxWidth:300, maxHeight:200, borderRadius:8, border:'1px solid rgba(60,174,120,.2)', objectFit:'cover' }}
              />
            </div>
          )}

          <div style={{ display:'flex', gap:8 }}>
            <button 
              onClick={guardarImagen}
              disabled={uploading}
              style={{ background:'#3CAE78', color:'#fff', border:'none', borderRadius:7, padding:'8px 18px', fontSize:13, cursor:uploading?'not-allowed':'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:500, opacity:uploading?0.6:1 }}
            >
              {uploading ? 'Subiendo...' : editando ? 'Actualizar imagen' : 'Guardar imagen'}
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

        {/* LISTA DE IMÁGENES */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16, fontWeight:600, marginBottom:16 }}>
            Imágenes en Galería ({imagenes.length})
          </h3>

          {loading ? (
            <p style={{ color:'#8ABFA3', textAlign:'center', padding:20 }}>Cargando...</p>
          ) : imagenes.length === 0 ? (
            <p style={{ color:'#8ABFA3', textAlign:'center', padding:20 }}>No hay imágenes. Agrega la primera arriba.</p>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))', gap:12 }}>
              {imagenes.map((imagen) => (
                <div key={imagen.id} style={{ background:'#1A3227', border:'1px solid rgba(60,174,120,.15)', borderRadius:10, overflow:'hidden' }}>
                  <img 
                    src={imagen.imagen_url} 
                    alt={imagen.titulo}
                    style={{ width:'100%', height:160, objectFit:'cover', display:'block' }}
                  />
                  <div style={{ padding:12 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:6 }}>
                      <h4 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:14, fontWeight:600, flex:1 }}>{imagen.titulo}</h4>
                      <span style={{ background:imagen.activo?'rgba(60,174,120,.15)':'rgba(128,128,128,.15)', color:imagen.activo?'#5DC995':'#999', fontSize:10, padding:'2px 8px', borderRadius:99, marginLeft:8 }}>
                        {imagen.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <p style={{ fontSize:11, color:'#8ABFA3', marginBottom:8, lineHeight:1.4 }}>{imagen.descripcion}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontSize:10, color:'rgba(138,191,163,.4)' }}>Orden: {imagen.orden}</span>
                      <div style={{ display:'flex', gap:6 }}>
                        <button 
                          onClick={() => editarImagen(imagen)}
                          style={{ background:'rgba(60,120,200,.15)', color:'#7cb5ff', border:'1px solid rgba(60,120,200,.3)', borderRadius:6, padding:'4px 10px', fontSize:11, cursor:'pointer' }}
                        >
                          ✎ Editar
                        </button>
                        <button 
                          onClick={() => eliminarImagen(imagen.id, imagen.imagen_url)}
                          style={{ background:'rgba(200,50,50,.15)', color:'#f08080', border:'1px solid rgba(200,50,50,.3)', borderRadius:6, padding:'4px 10px', fontSize:11, cursor:'pointer' }}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}