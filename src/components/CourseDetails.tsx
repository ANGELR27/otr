import React from 'react';
import { Filter, ShieldCheck, SearchCode } from 'lucide-react'; // Iconos representativos. Zap ya no es necesario aquí.

const CourseDetails: React.FC = () => {

  const col1DisplayItems = [
    { title: 'Video Superficial', quality: 'low' },
    { title: 'Joyas Ocultas', quality: 'high' },
    { title: 'Explicación Confusa', quality: 'low' },
  ];

  const col3DisplayItems = [
    'Recursos Validados',
    'Cursos Bien Organizados',
    'Tutoriales Claros y Completos',
  ];

  return (
    <section id="poder-ia" className="py-24 relative overflow-hidden bg-cosmic-black">
      <div className="cosmic-grid"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">
              EduFinder: La App que Busca Contenido Educativo de Calidad en YouTube
            </span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8">
            Seguramente has encontrado situaciones/dificultades en tu vida donde has pensado "si existiera una aplicación que hiciera X, ayudaría tanto a resolver Y...". Pues para esta prueba, la idea es que pienses en alguna situación/dificultad como esa (real o hipotética) y que necesite de alguna aplicación móvil (app) (y que todavía no existe) para darle solución a esa situación/dificultad.
          </p>
        </div>

        {/* Representación Visual de la Animación de Filtrado */}
        <div className="relative max-w-5xl mx-auto p-6 md:p-8 bg-cosmic-black/40 border border-cosmic-blue-electric/20 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start md:items-center"> {/* items-start para mejor alineación si el contenido es variable */}
            {/* Columna 1: Desorden inicial */}
            <div className="flex flex-col items-center text-center">
              <SearchCode size={32} className="text-cosmic-blue-neon mb-3" />
              <h3 className="text-xl font-semibold text-cosmic-white mb-2">Contenido Original</h3>
              <p className="text-sm text-cosmic-white/70 mb-4">Un océano de información: miles de videos con calidad y utilidad muy diversas.</p>
              <div className="space-y-2 w-full max-w-xs">
                {col1DisplayItems.map(item => (
                  <div key={item.title} className={`p-2 rounded-md text-xs border ${item.quality === 'high' ? 'bg-green-500/10 border-green-500/30 text-green-300' : 'bg-red-500/10 border-red-500/30 text-red-300' }`}>
                    {item.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Columna 2: El Filtro EduFinder (Proceso) */}
            <div className="flex flex-col items-center text-center md:mt-0 mt-8"> {/* Margen superior en móvil */}
              <div className="relative mb-4">
                <Filter size={64} className="text-cosmic-blue-neon opacity-30 animate-ping" style={{ animationDuration: '2s' }} />
                <Filter size={64} className="text-cosmic-blue-neon absolute top-0 left-0" />
              </div>
              <h3 className="text-xl font-semibold text-cosmic-white mb-2">EduFinder Filtra por Ti</h3>
              <p className="text-sm text-cosmic-white/70">Nuestra tecnología evalúa la estructura, claridad y relevancia, destacando el contenido de verdadero valor.</p>
              <div className="w-16 h-1 bg-gradient-to-r from-cosmic-blue-electric to-cosmic-purple-light my-4 rounded-full animate-pulse-slow"></div>
              <Filter size={32} className="text-cosmic-purple-light" /> {/* Icono pequeño de filtro inferior */}
            </div>

            {/* Columna 3: Resultado Filtrado */}
            <div className="flex flex-col items-center text-center md:mt-0 mt-8"> {/* Margen superior en móvil */}
              <ShieldCheck size={32} className="text-green-400 mb-3" />
              <h3 className="text-xl font-semibold text-cosmic-white mb-2">Aprendizaje Optimizado para Ti</h3>
              <p className="text-sm text-cosmic-white/70 mb-4">Accede directamente a los recursos que impulsarán tu conocimiento, de forma clara y efectiva.</p>
              <div className="space-y-2 w-full max-w-xs">
                {col3DisplayItems.map(item => (
                  <div key={item} className="p-2 rounded-md text-xs bg-green-500/20 border border-green-500/50 text-green-200 shadow-md">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
