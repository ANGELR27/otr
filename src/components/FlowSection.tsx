import React from 'react';
import {
  LibraryBig,
  Filter,
  Search,
  Sparkles, 
  GraduationCap, 
  Lightbulb, 
  BarChart3, 
  ShieldCheck, 
  ListTree, 
  BookOpenCheck,
  ArrowRightCircle, // Icono para conector horizontal
  ArrowDownCircle,  // Icono para conector vertical
  PlaySquare,       // Para representar video/contenido multimedia
} from 'lucide-react';

// La interfaz FeatureCardProps sigue siendo útil para tipar los datos
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  visual?: React.ReactNode; 
}

// El componente FeatureCard ya no es necesario y se elimina.

const FlowSection: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <Search size={28} />,
      title: "Búsqueda Potenciada por IA",
      description: "EduFinder utilizará inteligencia artificial para entender tu búsqueda y rastrear vastas bibliotecas de videos, identificando candidatos relevantes más allá de las métricas de popularidad.",
      visual: (
        <div className="flex items-center justify-center space-x-3">
          <Sparkles size={20} className="text-cosmic-blue-neon animate-sparkle-burst" />
          <LibraryBig size={20} className="text-cosmic-purple-light" />
          <Search size={20} className="text-green-400 animate-search-scan" />
        </div>
      )
    },
    {
      icon: <Filter size={28} />,
      title: "Análisis Profundo de Contenido",
      description: "Cada video preseleccionado será sometido a un análisis detallado de su estructura pedagógica, claridad conceptual y completitud, asegurando que solo el contenido de verdadero valor avance.",
      visual: (
        <div className="flex items-center justify-center space-x-3">
          <ShieldCheck size={20} className="text-green-400" />
          <GraduationCap size={20} className="text-cosmic-purple-light animate-cap-acquire" />
          <Lightbulb size={20} className="text-cosmic-blue-neon animate-lightbulb-flash" />
        </div>
      )
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Ranking de Precisión y Relevancia",
      description: "Los videos serán calificados y ordenados mediante un sistema de ranking que priorizará la calidad educativa y la adecuación a tus necesidades específicas, presentándote una selección depurada.",
      visual: (
        <div className="flex items-center justify-center space-x-3">
          <Sparkles size={20} className="text-cosmic-blue-neon animate-sparkle-burst" />
          <ListTree size={20} className="text-cosmic-blue-electric animate-list-sort" />
          <BookOpenCheck size={20} className="text-green-400" />
        </div>
      )
    },
    {
      icon: <Lightbulb size={28} />,
      title: "Descubrimiento Simplificado",
      description: "Finalmente, accederás a los mejores recursos educativos de forma clara y directa, permitiéndote invertir tu tiempo en aprender, no en buscar interminablemente.",
      visual: (
        <div className="flex items-center justify-center space-x-3">
          <Search size={20} className="text-cosmic-blue-neon" />
          <PlaySquare size={20} className="text-green-400 animate-play-throb" />
          <Sparkles size={20} className="text-cosmic-purple-light animate-sparkle-burst" />
        </div>
      )
    }
  ];

  return (
    <section id="knowledge-explorer-features" className="py-20 relative overflow-hidden bg-cosmic-black">
      <div className="cosmic-grid"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">
              Así Funcionará EduFinder
            </span>
          </h2>
          <p className="text-lg text-cosmic-white/80">
            Descubre el proceso paso a paso que EduFinder empleará para llevarte al mejor contenido educativo:
          </p>
        </div>

        {/* Nuevo diseño de flujo horizontal/vertical */}
        <div className="flex flex-col md:flex-row md:items-stretch md:justify-between">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              {/* Contenedor del paso individual */}
              <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left p-6 bg-cosmic-black/30 border border-cosmic-blue-electric/20 rounded-lg transform hover:scale-105 transition-transform duration-300 mb-8 md:mb-0">
                <div className="flex items-center mb-4 w-full md:w-auto">
                  <div className="mr-3 text-cosmic-blue-neon">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-cosmic-white">{feature.title}</h3>
                </div>
                <p className="text-cosmic-white/70 text-sm mb-4 flex-grow px-2 md:px-0">{feature.description}</p>
                {feature.visual && (
                  <div className="mt-auto pt-4 border-t border-cosmic-blue-electric/10 w-full flex items-center justify-center space-x-3 h-16">
                    {feature.visual}
                  </div>
                )}
              </div>

              {/* Conector (visible solo si no es el último elemento) */}
              {index < features.length - 1 && (
                <>
                  {/* Conector para pantallas de escritorio (horizontal) */}
                  <div className="hidden md:flex items-center justify-center shrink-0 mx-4 lg:mx-6 xl:mx-8">
                    <ArrowRightCircle size={36} className="text-cosmic-blue-electric opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Conector para pantallas móviles (vertical) */}
                  <div className="flex md:hidden items-center justify-center shrink-0 my-6">
                    <ArrowDownCircle size={36} className="text-cosmic-blue-electric opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-md text-cosmic-white/70 max-w-2xl mx-auto">
            Con este flujo inteligente, EduFinder se convertirá en tu aliado esencial para el aprendizaje y descubrimiento de conocimiento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlowSection;