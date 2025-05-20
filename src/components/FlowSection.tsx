import React from 'react';
import {
  LibraryBig,
  Filter,
  Columns,
  Search,
  Sparkles, // Para 'Calidad'
  GraduationCap, // Para 'Disciplina'
  Lightbulb, // Para 'Intuitiva'
  BarChart3, // Para 'Evaluación'
  ShieldCheck, // Para 'Calidad Verificada'
  ListTree, // Para 'Categorías'
  BookOpenCheck // Para 'Recursos de Calidad'
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  visual?: React.ReactNode; // Para los mini-visuales conceptuales
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, visual }) => {
  return (
    <div className="bg-cosmic-black/30 border border-cosmic-blue-electric/20 rounded-lg p-6 flex flex-col transform hover:scale-105 transition-transform duration-300 h-full">
      <div className="flex items-center mb-4">
        <div className="mr-4 text-cosmic-blue-neon">{icon}</div>
        <h3 className="text-xl font-semibold text-cosmic-white">{title}</h3>
      </div>
      <p className="text-cosmic-white/70 text-sm mb-4 flex-grow">{description}</p>
      {visual && <div className="mt-auto pt-4 border-t border-cosmic-blue-electric/10 h-24 flex items-center justify-center">{visual}</div>}
    </div>
  );
};

const FlowSection: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <LibraryBig size={28} />,
      title: "Análisis Multidisciplinario",
      description: "EduFinder tendrá la capacidad de procesar y analizar contenido educativo de numerosas áreas, desde tecnología y ciencias hasta humanidades y artes.",
      visual: (
        <div className="flex space-x-2">
          <GraduationCap size={20} className="text-cosmic-purple-light" />
          <Sparkles size={20} className="text-cosmic-blue-neon" />
          <BookOpenCheck size={20} className="text-green-400" />
        </div>
      )
    },
    {
      icon: <Filter size={28} />,
      title: "Filtros de Calidad Específicos",
      description: "Para cada disciplina, EduFinder aplicará criterios de calidad relevantes, identificando contenido con explicaciones claras y estructura pedagógica sólida.",
      visual: (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-cosmic-white/70">Tema</span>
          <ListTree size={20} className="text-cosmic-blue-electric" />
          <ShieldCheck size={20} className="text-green-400" />
        </div>
      )
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Evaluación y Comparación Objetiva",
      description: "La aplicación permitirá comparar diferentes recursos dentro de un mismo tema basándose en métricas objetivas de calidad y relevancia, no solo en popularidad.",
      visual: (
        <div className="flex space-x-2">
          <Columns size={20} className="text-cosmic-purple-light rotate-90" />
          <span className="text-sm text-cosmic-white/70">vs</span>
          <Columns size={20} className="text-cosmic-purple-light rotate-90" />
        </div>
      )
    },
    {
      icon: <Lightbulb size={28} />,
      title: "Exploración Intuitiva y Búsqueda",
      description: "Podrás navegar fácilmente por categorías temáticas o utilizar una búsqueda inteligente para descubrir contenido relevante en las áreas que te interesan.",
      visual: (
        <div className="flex items-center space-x-2 p-2 bg-cosmic-black/20 rounded-md border border-cosmic-blue-electric/30">
          <Search size={18} className="text-cosmic-blue-neon" />
          <input type="text" placeholder="Buscar disciplina..." className="bg-transparent text-xs text-cosmic-white/70 placeholder-cosmic-white/40 focus:outline-none w-24" />
        </div>
      )
    }
  ];

  return (
    <section id="knowledge-explorer-features" className="py-20 relative overflow-hidden bg-cosmic-black">
      <div className="cosmic-grid"></div> {/* Manteniendo el fondo consistente */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">
              EduFinder: Descubre Contenido de Calidad en Cualquier Disciplina
            </span>
          </h2>
          <p className="text-lg text-cosmic-white/80">
            EduFinder está diseñado para ayudarte a encontrar los mejores recursos educativos en una amplia gama de temas. Estas son las características clave que lo hacen posible:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              visual={feature.visual}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-md text-cosmic-white/70 max-w-2xl mx-auto">
            Con estas características, EduFinder te permitirá explorar y encontrar recursos educativos de alta calidad en cualquier campo del saber.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlowSection;