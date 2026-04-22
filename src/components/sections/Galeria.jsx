import { useReveal } from '../../lib/useReveal';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function Galeria() {
  const ref = useReveal();
  const [modalImg, setModalImg] = useState(null);

  const imagenes = [
    {
      src: '/galeria/somos-ace.png',
      titulo: '¿Quiénes somos?',
      desc: 'ACE es una fraternidad política universitaria con más de 5 años de trayectoria en Jurisprudencia UG'
    },
    {
      src: '/galeria/fundacion.png',
      titulo: '¿Y cómo empezaron?',
      desc: 'Fundados el 7 de agosto de 2020 para fortalecer la unión y participación estudiantil'
    },
    {
      src: '/galeria/trevor-frater.png',
      titulo: 'Trevor Frater - Nuestra mascota',
      desc: 'Nacido el 3 de octubre de 2025, símbolo representativo de nuestra organización'
    },
    {
      src: '/galeria/logo-ace.png',
      titulo: 'Nuestro logo',
      desc: 'Representando justicia, igualdad, solidaridad y liderazgo consciente'
    },
    {
      src: '/galeria/fundadores.png',
      titulo: 'Nuestros fundadores',
      desc: 'El equipo que inició el movimiento de liderazgo horizontal en Jurisprudencia'
    },
    {
      src: '/galeria/operacion-593.png',
      titulo: 'ACE x Operación 593',
      desc: 'Primer equipo de la Universidad de Guayaquil en articular con KAS y Ecuador Joven'
    }
  ];

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">Nuestra Identidad</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Galería ACE
            </h2>
            <p className="text-gray-300 text-lg">
              Momentos, logros y la identidad visual que nos representa como fraternidad política estudiantil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {imagenes.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                onClick={() => setModalImg(img)}
              >
                <img
                  src={img.src}
                  alt={img.titulo}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{img.titulo}</h3>
                    <p className="text-gray-300 text-sm">{img.desc}</p>
                  </div>
                </div>

                {/* Badge en la esquina */}
                <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ACE
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de imagen ampliada */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setModalImg(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-emerald-400 transition-colors"
            onClick={() => setModalImg(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalImg.src}
              alt={modalImg.titulo}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{modalImg.titulo}</h3>
              <p className="text-gray-300">{modalImg.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}