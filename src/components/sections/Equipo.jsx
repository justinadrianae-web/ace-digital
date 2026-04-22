import { useReveal } from '../../lib/useReveal';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Equipo() {
  const ref = useReveal();
  const [miembrosDestacados, setMiembrosDestacados] = useState([]);

  useEffect(() => {
    async function fetchMiembros() {
      const { data, error } = await supabase
        .from('miembros_destacados')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });
      
      if (!error && data) {
        setMiembrosDestacados(data);
      }
    }
    fetchMiembros();
  }, []);

  const fundadores = [
    {
      nombre: 'Felipe Sánchez',
      cargo: 'Cofundador',
      descripcion: 'Abogado. Se ha caracterizado por su firme convicción de que el cambio se logra a través del trabajo en equipo, impulsando desde el inicio la visión colectiva que hoy define a la organización.',
      avatar: 'FS'
    },
    {
      nombre: 'Mike Ordóñez',
      cargo: 'Cofundador',
      descripcion: 'Abogado. Primer capacitador y formador de ACE. Desempeñó un papel clave en la consolidación de las bases formativas y organizativas del movimiento.',
      avatar: 'MO'
    },
    {
      nombre: 'Dahiana Palacios',
      cargo: 'Cofundadora',
      descripcion: 'Abogada y dirigente social. Pieza fundamental en la gestión social y política del movimiento. Lideró el área social e impulsó la incidencia académica, fortaleciendo el trabajo territorial y el compromiso con la comunidad universitaria.',
      avatar: 'DP'
    }
  ];

  const coordinadores = [
    { nombre: 'Nathalie Rivera', cargo: 'Coordinadora General', carrera: 'Jurisprudencia', telefono: '+593 99 055 8066', avatar: 'NR' },
    { nombre: 'Angel Pilay', cargo: 'Coordinador', carrera: 'Jurisprudencia', telefono: '+593 99 145 0284', avatar: 'AP' },
    { nombre: 'Joshua Guagua', cargo: 'Coordinador', carrera: 'Jurisprudencia', telefono: '+593 96 168 7728', avatar: 'JG' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800" ref={ref}>
      <div className="container mx-auto px-6">
        {/* FUNDADORES */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">7 de Agosto de 2020</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Fundadores de ACE</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Quienes tuvieron una manera diferente de ver las cosas y decidieron crear una verdadera fraternidad política universitaria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {fundadores.map((fundador, i) => (
              <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                  {fundador.avatar}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{fundador.nombre}</h3>
                <p className="text-emerald-400 text-sm text-center mb-4 font-medium">{fundador.cargo}</p>
                <p className="text-gray-300 text-sm leading-relaxed text-center">{fundador.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MIEMBROS DESTACADOS */}
        {miembrosDestacados.length > 0 && (
          <div className="max-w-6xl mx-auto mb-24">
            <div className="text-center mb-16">
              <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">Reconocimiento</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Miembros Destacados</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Integrantes de ACE que han sobresalido por su liderazgo y compromiso con la comunidad estudiantil.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {miembrosDestacados.map((miembro) => (
                <div key={miembro.id} className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    {miembro.foto_url ? (
                      <img src={miembro.foto_url} alt={miembro.nombre} className="w-20 h-20 rounded-full object-cover border-2 border-blue-400" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold">
                        {miembro.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{miembro.nombre}</h3>
                      <p className="text-blue-400 text-sm mb-3 font-medium">{miembro.cargo}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{miembro.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COORDINADORES */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">Liderazgo Horizontal</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Coordinadores ACE</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              En ACE no hay jerarquías. Cada coordinador lidera un área con autonomía y compromiso colectivo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {coordinadores.map((coord, i) => (
              <div key={i} className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 text-center hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
                  {coord.avatar}
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{coord.nombre}</h4>
                <p className="text-emerald-400 text-sm mb-2">{coord.cargo}</p>
                <p className="text-gray-400 text-xs mb-1">{coord.carrera}</p>
                <p className="text-gray-500 text-xs">{coord.telefono}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}