import { useReveal } from '../../lib/useReveal';

export default function Historia() {
  const ref = useReveal();

  const timeline = [
    {
      year: '7 AGO 2020',
      title: 'Nace ACE',
      desc: 'Alianza Colectiva Estudiantil surge como una fraternidad política universitaria en respuesta a la necesidad de fortalecer la unión, la participación y el compromiso real de los estudiantes de Jurisprudencia de la Universidad de Guayaquil.'
    },
    {
      year: '2020-2024',
      title: 'Liderazgo Horizontal',
      desc: 'ACE se consolida como el único movimiento universitario que se rige por una línea política horizontal, sin presidentes ni directiva tradicional. Cada miembro es un líder, promoviendo la formación constante y el pensamiento crítico.'
    },
    {
      year: '2023-2024',
      title: 'Miembros Destacados',
      desc: 'Natalie Rivera se convierte en Secretaria de la ASOJURIS con más de 4 años de experiencia. Gabriela Correa es elegida Delegada de la Liga Deportiva Universitaria (LDU) y representante femenina en la directiva universitaria.'
    },
    {
      year: '2024',
      title: 'Proyectos de Impacto',
      desc: 'Se lanzan proyectos clave: Acércate (integración estudiantil), Ticket Micho (apoyo a animales), Reconocimiento a Matilde Hidalgo con la Asamblea Nacional, e Introducción a la Jurisprudencia (talleres para nuevos estudiantes).'
    },
    {
      year: '3 OCT 2025',
      title: 'Trevor Frater',
      desc: 'Nace la mascota oficial del equipo: Trevor Frater, un símbolo representativo de la organización que se consolida como parte de la identidad del movimiento y está presente en publicaciones y materiales gráficos.'
    },
    {
      year: 'HOY · 2025',
      title: 'Plataforma Digital ACE',
      desc: 'ACE lanza su primera plataforma web propia con registro de miembros, calendario de eventos, sistema de votaciones, panel de administración y herramientas digitales para fortalecer la participación estudiantil.'
    }
  ];

  return (
    <section id="historia" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">Nuestra Trayectoria</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Más de 5 años de historia
          </h2>
          <p className="text-gray-300 text-lg">
            Desde 2020, ACE ha transformado la participación estudiantil en Jurisprudencia UG, 
            consolidándose como una fraternidad política horizontal donde cada voz importa.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Línea vertical central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500 transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Contenido */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105">
                    <span className="text-emerald-400 font-bold text-sm tracking-wider">{item.year}</span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Punto central */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50 border-4 border-gray-900">
                    <span className="text-white font-bold text-xl">{i + 1}</span>
                  </div>
                </div>

                {/* Espacio vacío para balance */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}