
import React, { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      containerRef.current.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="misión" 
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden pt-20"
      ref={containerRef}
    >
      <div className="cosmic-grid"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-cosmic-white opacity-0 animate-fade-in text-center" style={{ animationDelay: '300ms' }}>
            Propuesta para <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">Generation Colombia</span>
          </h1>

          <div className="max-w-3xl mx-auto bg-cosmic-black/50 p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-sm opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-cosmic-blue-neon mb-2">Optimiza Tu Búsqueda Educativa</h2>
                <p className="text-cosmic-white/80 text-base md:text-lg">
                  Encontrar tutoriales de calidad en YouTube es un desafío. EduFinder lo simplifica, ahorrándote tiempo y esfuerzo.
                </p>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-cosmic-purple-light mb-2">Así Funciona <span className="text-cosmic-blue-neon">EduFinder</span></h2>
                <p className="text-cosmic-white/80 text-base md:text-lg">
                  Nuestra IA analiza y selecciona los mejores videos educativos, evaluando su calidad y relevancia. <strong>Más abajo, prueba nuestra demo interactiva: hemos precargado una búsqueda de "Curso java" para que explores su funcionamiento.</strong>
                </p>
              </div>
            </div>
          </div>

          
          <p className="text-cosmic-blue-neon text-xl font-medium italic opacity-0 animate-fade-in" style={{ animationDelay: '1200ms' }}>
            Algoritmo inteligente. Resultados inmediatos. Aprendizaje optimizado.
          </p>
          
          <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '1500ms' }}>
            <a href="#tecnologia" className="flex flex-col items-center group">
              <span className="text-cosmic-white/60 mb-2 group-hover:text-cosmic-blue-neon transition-colors">Descubre cómo funciona</span>
              <svg 
                className="w-8 h-8 text-cosmic-blue-electric animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neon-glow opacity-30"></div>
      </div>
    </section>
  );
};

export default HeroSection;
