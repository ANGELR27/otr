console.log('SolutionSection.tsx module loaded');
import React from 'react';

// Iconos simples para la UI (puedes reemplazarlos con una librería de iconos si prefieres)
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const GaugeBar: React.FC<{ label: string; score: number; colorClass: string }> = ({ label, score, colorClass }) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs text-cosmic-white/70 mb-0.5">
      <span>{label}</span>
      <span>{score}%</span>
    </div>
    <div className="w-full bg-cosmic-blue-deep/50 rounded-full h-2">
      <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${score}%` }}></div>
    </div>
  </div>
);


const SolutionSection: React.FC = () => {
  const courseData = {
    // Ejemplo de Video ID de la lista: PL_8FSlpwPBDkTIwCGBw0W6QpoxKMdzuPd (tomaríamos uno de los primeros videos, e.g., el primer video podría ser algo como "VIDEO_ID_INTRO_JAVA")
    // Para este ejemplo, usaremos un ID genérico representativo.
    videoId: 'U709qY6S9rA', // ID real del video proporcionado.
    title: 'Curso Java #1: Introducción, JDK, Eclipse',
    channel: 'Píldoras Informáticas',
    channelId: 'UCYQHjxkGz_fMNlHQip01ODA', // ID Real del canal
    duration: 'Lista completa: +100 videos (aprox. 60-80h total). Video analizado: 25 min.', // Duración más específica
    views: 'Video analizado: +3.5M. Lista: Millones por video.', // Vistas más específicas
    // Logo del canal (Píldoras Informáticas) - URL obtenida previamente
    channelLogoUrl: '/pildora-yt.jpg', // Usando el logo desde la carpeta public
    // Miniatura del video específico (formato hqdefault)
    thumbnailUrl: 'https://i.ytimg.com/vi/U709qY6S9rA/hqdefault.jpg',
    strengths: [
      'Fácil de encontrar.',
      'Lenguaje amigable y con buena dicción.',
      'Cubre muchos temas básicos de Java.',
      'Popular y con muchos comentarios positivos.',
    ],
    weaknesses: [
      'No tiene estructura pedagógica profesional (sin ejercicios guiados ni retroalimentación).',
      'Algunos conceptos se explican sin suficiente profundidad o precisión técnica.',
      'Falta de buenas prácticas modernas en Java (usa Scanner, no cubre bien OOP, Streams, patrones actuales).',
      'No incluye proyectos reales ni evaluaciones.',
    ],
    eduFinderAnalysis: {
      pedagogicalStructure: 20, // Puntuación baja
      technicalDepth: 45,     // Puntuación media-baja
      modernPractices: 30,    // Puntuación baja
      realProjects: 10,       // Puntuación muy baja
    },
  };

  console.log('Debug: Channel Logo URL antes de renderizar:', courseData.channelLogoUrl);
  return (
    <section id="tecnología" className="py-20 relative overflow-hidden">
      <div className="cosmic-grid"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">
              Análisis Profundo con EduFinder
            </span>
          </h2>
          <p className="text-lg text-cosmic-white/80 text-center mb-12 max-w-2xl mx-auto">
            ¿Es popular siempre sinónimo de calidad? Veamos un caso real y cómo EduFinder te ayuda a descubrir la verdad educativa detrás de los números.
          </p>

          {/* Card del Curso Analizado */}
          <div className="cyberpunk-card neon-border mb-12 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Columna Izquierda: Miniatura y Datos Básicos */}
              <div className="md:w-1/3 flex-shrink-0">
                <img 
                  // src={courseData.thumbnailUrl} // Descomenta si tienes una URL de imagen real y válida
                  src={courseData.thumbnailUrl.replace('VIDEO_ID_REPRESENTATIVO', 'VIDEO_ID_REPRESENTATIVO')} // Si tuvieras un ID real, lo reemplazarías aquí.
                  // Como fallback o si no hay ID real, puedes usar un placeholder más específico:
                  // src={`https://i.ytimg.com/vi/ rationallyPARUiI/hqdefault.jpg`} // Ejemplo de ID real de un video de Java de Píldoras: rationallyPARUiI (Java #1 2019)
                  alt={`Miniatura de ${courseData.title}`} 
                  className="rounded-md w-full aspect-video object-cover mb-4 border border-cosmic-blue-electric/30" 
                />
                <div className="flex items-center mb-2">
                  <img 
                    src={courseData.channelLogoUrl} // Usando el logo local (desde la carpeta public)
                    alt={`Logo de ${courseData.channel}`}
                    className="w-8 h-8 rounded-full mr-2 border-2 border-cosmic-purple-light object-cover"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      console.error('Error al cargar el logo del canal desde /public:', (e.target as HTMLImageElement).src, e);
                    }}
                  />
                  <h3 className="text-lg font-semibold text-cosmic-white">{courseData.channel}</h3>
                </div>
                <h4 className="text-md text-cosmic-blue-neon mb-3">{courseData.title}</h4>
                <p className="text-xs text-cosmic-white/70 mb-1"><strong>Duración:</strong> {courseData.duration}</p>
                <p className="text-xs text-cosmic-white/70 mb-1"><strong>Vistas:</strong> {courseData.views}</p>
                <span className="inline-block bg-cosmic-blue-electric/20 text-cosmic-blue-neon text-xs font-semibold px-2 py-0.5 rounded-full">
                  Recomendado por YouTube
                </span>
              </div>

              {/* Columna Derecha: Fortalezas y Debilidades */}
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-green-400 mb-3 flex items-center">
                      <CheckIcon /> <span className="ml-2">Fortalezas Detectadas</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {courseData.strengths.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-cosmic-white/80">
                          <CheckIcon />
                          <span className="ml-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-red-400 mb-3 flex items-center">
                      <CrossIcon /> <span className="ml-2">Debilidades Clave</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {courseData.weaknesses.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-cosmic-white/80">
                          <CrossIcon />
                          <span className="ml-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Análisis de EduFinder */}
          <div className="cyberpunk-card neon-border-alt p-6 md:p-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-cosmic-purple-light via-cosmic-blue-neon to-cosmic-blue-electric text-transparent bg-clip-text">
                El Veredicto de EduFinder IA
              </span>
            </h3>
            <div className="max-w-md mx-auto">
              <GaugeBar label="Estructura Pedagógica Profesional" score={courseData.eduFinderAnalysis.pedagogicalStructure} colorClass="bg-red-500" />
              <GaugeBar label="Profundidad y Precisión Técnica" score={courseData.eduFinderAnalysis.technicalDepth} colorClass="bg-yellow-500" />
              <GaugeBar label="Aplicación de Buenas Prácticas Modernas" score={courseData.eduFinderAnalysis.modernPractices} colorClass="bg-red-500" />
              <GaugeBar label="Inclusión de Proyectos Reales y Evaluaciones" score={courseData.eduFinderAnalysis.realProjects} colorClass="bg-red-700" />
            </div>
            <p className="text-center text-cosmic-white/80 mt-6 text-sm">
              EduFinder analiza más allá de la popularidad, ofreciendo una visión clara de la calidad educativa real para que inviertas tu tiempo sabiamente.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionSection;