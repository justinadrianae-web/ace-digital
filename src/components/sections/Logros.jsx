import { useReveal } from '../../lib/useReveal';
import { Award, Users, Heart, BookOpen } from 'lucide-react';

export default function Logros() {
  const ref = useReveal();

  const proyectos = [
    {
      icon: Users,
      titulo: 'Acércate',
      descripcion: 'Proyecto de integración estudiantil desde nivelación, permitiendo que los nuevos estudiantes conozcan la facultad y generen espacios de networking. Brinda herramientas iniciales y facilita la adaptación al entorno universitario.',
      impacto: 'Integración de estudiantes de nivelación',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Heart,
      titulo: 'Ticket Micho',
      descripcion: 'Iniciativa solidaria dirigida al cuidado y apoyo de los animales dentro de la universidad. Nace del trabajo conjunto de varios miembros con un propósito común: ayudar a quienes más lo necesitan.',
      impacto: 'Protección animal universitaria',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Award,
      titulo: 'Reconocimiento a Matilde Hidalgo de Prócel',
      descripcion: 'En articulación con la Asamblea Nacional y el despacho de la asambleísta Naila Victoria Quintana, se realizó la entrega de un reconocimiento legislativo a la Mgs. Grace Sánchez, en honor al legado de Matilde Hidalgo.',
      impacto: 'Reconocimiento con la Asamblea Nacional',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: BookOpen,
      titulo: 'Introducción a la Jurisprudencia',
      descripcion: 'Serie de talleres dirigidos a estudiantes de nuevo ingreso. Brinda una guía básica sobre temas, libros, autores y conceptos fundamentales de las tres carreras (Derecho, Ciencias Políticas, Sociología), fortaleciendo el vínculo con la facultad.',
      impacto: 'Formación de estudiantes de primer ingreso',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">Nuestro Impacto</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Proyectos Oficiales ACE
          </h2>
          <p className="text-gray-300 text-lg">
            Iniciativas que transforman la experiencia estudiantil en Jurisprudencia, 
            desde el apoyo académico hasta la solidaridad social.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {proyectos.map((proyecto, i) => {
            const Icon = proyecto.icon;
            return (
              <div 
                key={i}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* Icono */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${proyecto.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Contenido */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {proyecto.titulo}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {proyecto.descripcion}
                </p>

                {/* Badge de impacto */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 font-medium">{proyecto.impacto}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estadística adicional */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-8 py-4">
            <Award className="w-6 h-6 text-emerald-400" />
            <span className="text-gray-300">
              <span className="text-white font-bold text-xl">4 Proyectos Activos</span> transformando la vida estudiantil
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}