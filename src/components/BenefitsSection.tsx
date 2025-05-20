import React from 'react';
import { BookOpenText, TrendingUp, Presentation, Brain } from 'lucide-react';

interface CaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className={`bg-cosmic-black/50 border border-cosmic-blue-electric/20 rounded-xl p-6 shadow-xl transform transition-all duration-500 hover:scale-105 opacity-0 animate-fade-in-up ${delay}`}
    >
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-blue-neon to-cosmic-purple-light flex items-center justify-center text-cosmic-white">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-cosmic-blue-neon mb-3 text-center">{title}</h3>
      <p className="text-cosmic-white/80 text-sm text-center">{description}</p>
    </div>
  );
};

const BenefitsSection: React.FC = () => {
  // const userCases: CaseCardProps[] = [
  //   {
  //     icon: <BookOpenText size={32} />, // Icono para Estudiante
  //     title: "Estudiante Autodidacta",
  //     description: "Acelera tu aprendizaje encontrando rápidamente los videos con mayor calidad pedagógica y estructura clara, evitando perder tiempo en contenido superficial.",
  //     delay: "animation-delay-200"
  //   },
  //   {
  //     icon: <TrendingUp size={32} />, // Icono para Profesional
  //     title: "Profesional en Actualización",
  //     description: "Identifica cursos y tutoriales con profundidad técnica y buenas prácticas actualizadas para mantener tus habilidades a la vanguardia en tu campo.",
  //     delay: "animation-delay-400"
  //   },
  //   {
  //     icon: <Presentation size={32} />, // Icono para Creador/Educador
  //     title: "Creador de Contenido / Educador",
  //     description: "Obtén insights objetivos sobre la percepción de la calidad y estructura de contenido similar al tuyo, y descubre áreas de oportunidad para mejorar tus propios materiales educativos.",
  //     delay: "animation-delay-600"
  //   },
  // ];

  // Nota: Las clases como 'animate-fade-in-up', 'animate-fade-in', y 'animation-delay-...' 
  // requieren configuración en 'tailwind.config.js' o un CSS global.
  // Ejemplo de configuración en tailwind.config.js para 'animation':
  // theme: {
  //   extend: {
  //     animation: { 'fade-in-up': 'fadeInUp 0.5s ease-out forwards', 'fade-in': 'fadeIn 0.5s ease-out forwards' },
  //     keyframes: {
  //       fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  //       fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } }
  //     }
  //   }
  // }
  // Para los delays, se pueden crear clases de utilidad CSS o usar variantes de Tailwind.

  return null; 
};

export default BenefitsSection;