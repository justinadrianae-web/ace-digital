import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminMiembrosDestacados() {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    cargo: '',
    descripcion: '',
    foto_url: '',
    orden: 0,
    activo: true
  });

  useEffect(() => {
    fetchMiembros();
  }, []);

  async function fetchMiembros() {
    setLoading(true);
    const { data, error } = await supabase
      .from('miembros_destacados')
      .select('*')
      .order('orden', { ascending: true });
    
    if (!error && data) {
      setMiembros(data);
    }
    setLoading(false);
  }

  async function guardarMiembro() {
    if (!form.nombre || !form.cargo || !form.descripcion) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (editando) {
      const { error } = await supabase
        .from('miembros_destacados')
        .update(form)
        .eq('id', editando);
      
      if (!error) {
        alert('Miembro actualizado exitosamente');
        resetForm();
        fetchMiembros();
      } else {
        alert('Error al actualizar: ' + error.message);
      }
    } else {
      const { error } = await supabase
        .from('miembros_destacados')
        .insert([form]);
      
      if (!error) {
        alert('Miembro agregado exitosamente');
        resetForm();
        fetchMiembros();
      } else {
        alert('Error al agregar: ' + error.message);
      }
    }
  }

  async function eliminarMiembro(id) {
    if (!confirm('¿Estás seguro de eliminar este miembro destacado?')) return;

    const { error } = await supabase
      .from('miembros_destacados')
      .delete()
      .eq('id', id);
    
    if (!error) {
      alert('Miembro eliminado exitosamente');
      fetchMiembros();
    } else {
      alert('Error al eliminar: ' + error.message);
    }
  }

  function editarMiembro(miembro) {
    setEditando(miembro.id);
    setForm({
      nombre: miembro.nombre,
      cargo: miembro.cargo,
      descripcion: miembro.descripcion,
      foto_url: miembro.foto_url || '',
      orden: miembro.orden,
      activo: miembro.activo
    });
  }

  function resetForm() {
    setEditando(null);
    setForm({
      nombre: '',
      cargo: '',
      descripcion: '',
      foto_url: '',
      orden: 0,
      activo: true
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold">Miembros Destacados</h1>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            {editando ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {editando ? 'Editar Miembro' : 'Agregar Nuevo Miembro'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Nombre completo *</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({...form, nombre: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                placeholder="Ej: Natalie Rivera"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Cargo *</label>
              <input
                type="text"
                value={form.cargo}
                onChange={(e) => setForm({...form, cargo: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                placeholder="Ej: Secretaria de ASOJURIS"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">Descripción *</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({...form, descripcion: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
              rows="3"
              placeholder="Describe los logros y características destacadas del miembro..."
            ></textarea>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">URL de foto (opcional)</label>
              <input
                type="text"
                value={form.foto_url}
                onChange={(e) => setForm({...form, foto_url: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Orden</label>
              <input
                type="number"
                value={form.orden}
                onChange={(e) => setForm({...form, orden: parseInt(e.target.value)})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Estado</label>
              <select
                value={form.activo ? 'true' : 'false'}
                onChange={(e) => setForm({...form, activo: e.target.value === 'true'})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={guardarMiembro}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              {editando ? 'Actualizar' : 'Guardar'}
            </button>

            {editando && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* LISTA DE MIEMBROS */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Lista de Miembros ({miembros.length})</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400">Cargando...</div>
          ) : miembros.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              No hay miembros destacados. Agrega el primero arriba.
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {miembros.map((miembro) => (
                <div key={miembro.id} className="p-6 hover:bg-gray-750 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {miembro.foto_url ? (
                        <img src={miembro.foto_url} alt={miembro.nombre} className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                          {miembro.nombre.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold">{miembro.nombre}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${miembro.activo ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-600 text-gray-400'}`}>
                            {miembro.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        <p className="text-blue-400 text-sm mb-2">{miembro.cargo}</p>
                        <p className="text-gray-300 text-sm">{miembro.descripcion}</p>
                        <p className="text-gray-500 text-xs mt-2">Orden: {miembro.orden}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => editarMiembro(miembro)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => eliminarMiembro(miembro.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
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