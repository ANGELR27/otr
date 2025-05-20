import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
const FutureSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.2
    });
    const section = document.getElementById("futuro");
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  const connections = [{
    id: 1,
    label: "Integraciones con LMS",
    description: "Conexión directa con las principales plataformas de gestión de aprendizaje como Canvas, Moodle y Blackboard.",
    color: "cosmic-blue-electric"
  }, {
    id: 2,
    label: "Planes de Estudio IA",
    description: "Utilizando IA para crear itinerarios personalizados basados en tus objetivos de aprendizaje y estilo cognitivo.",
    color: "cosmic-purple-light"
  }, {
    id: 3,
    label: "Rutas de Aprendizaje",
    description: "Secuencias optimizadas de recursos educativos que te guían desde principiante hasta experto.",
    color: "cosmic-blue-neon"
  }, {
    id: 4,
    label: "Análisis de Progreso",
    description: "Visualización detallada de tu avance y recomendaciones para mejorar tu rendimiento.",
    color: "cosmic-purple-electric"
  }, {
    id: 5,
    label: "Comunidad Global",
    description: "Conecta con estudiantes de todo el mundo que comparten tus mismos intereses educativos.",
    color: "cosmic-blue-electric"
  }, {
    id: 6,
    label: "Asistente Virtual",
    description: "Un tutor IA que responde a tus preguntas y te guía a través del material educativo.",
    color: "cosmic-purple-light"
  }, {
    id: 7,
    label: "Traducción Automática",
    description: "Accede a contenido educativo en cualquier idioma con traducción y subtítulos en tiempo real.",
    color: "cosmic-blue-neon"
  }, {
    id: 8,
    label: "Realidad Aumentada",
    description: "Visualiza conceptos complejos mediante experiencias interactivas en 3D y realidad aumentada.",
    color: "cosmic-purple-electric"
  }];
  return <section className="py-20 relative overflow-hidden" id="futuro">
      <div className="cosmic-grid"></div>
      
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-1/3 bg-cosmic-blue-electric/5 rounded-bl-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-1/3 bg-cosmic-purple-electric/5 rounded-tr-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">
              El Futuro de EduFinder
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-blue-electric to-cosmic-purple-light mx-auto mb-6"></div>
          
          
          
          {/* Future Vision Visualization */}
          <div className={`relative h-[500px] mb-24 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Outer Rings */}
                <div className="absolute top-1/2 left-1/2 w-[460px] h-[460px] border border-cosmic-blue-electric/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 w-[360px] h-[360px] border border-cosmic-purple-light/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow" style={{
                animationDirection: 'reverse',
                animationDuration: '20s'
              }}></div>
                <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] border border-cosmic-blue-neon/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow" style={{
                animationDuration: '15s'
              }}></div>
                
                {/* Pulsating Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-blue-electric to-cosmic-blue-neon flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-blue-electric to-cosmic-blue-neon animate-pulse-glow"></div>
                    <div className="relative z-10 p-3">
                      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L12 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <path d="M4 12L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Highlight Aura */}
                  <div className="absolute -inset-4 rounded-full bg-cosmic-blue-electric/20 animate-pulse blur-md"></div>
                </div>
                
                {/* Connection Nodes */}
                {connections.map((connection, i) => {
                const angle = i * (360 / connections.length) * (Math.PI / 180);
                const distance = 180;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                return <HoverCard key={connection.id} openDelay={100} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <button className={`absolute z-10 transform transition-all duration-300 ease-in-out ${activeNode === connection.id ? 'scale-125' : 'scale-100'}`} style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`
                    }} onMouseEnter={() => setActiveNode(connection.id)} onMouseLeave={() => setActiveNode(null)}>
                          <div className={`w-8 h-8 rounded-full bg-${connection.color} flex items-center justify-center relative overflow-hidden group`}>
                            <div className={`absolute inset-0 bg-${connection.color} opacity-30 group-hover:opacity-70 transition-opacity duration-300`}></div>
                            <div className="relative z-10 w-3 h-3 bg-cosmic-white rounded-full animate-pulse"></div>
                            
                            {/* Connection line to center */}
                            <div className={`absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-${connection.color} to-transparent w-[180px] origin-left -z-10 transition-opacity duration-300 ${activeNode === connection.id ? 'opacity-100' : 'opacity-40'}`} style={{
                          transform: `translateY(-50%) rotate(${angle + Math.PI}rad)`
                        }}>
                              <div className={`absolute top-0 left-0 h-full w-full bg-gradient-to-r from-${connection.color} to-transparent animate-data-flow`} style={{
                            animationDelay: `${i * 0.2}s`
                          }}></div>
                            </div>
                          </div>
                        </button>
                      </HoverCardTrigger>
                      
                      <HoverCardContent align="center" className={`max-w-xs bg-cosmic-black/90 border border-${connection.color}/30 backdrop-blur-lg p-4 shadow-lg shadow-${connection.color}/10 z-50`}>
                        <h3 className={`text-${connection.color} text-lg font-bold mb-2`}>
                          {connection.label}
                        </h3>
                        <p className="text-cosmic-white/80 text-sm">
                          {connection.description}
                        </p>
                      </HoverCardContent>
                    </HoverCard>;
              })}
              </div>
            </div>
            
            {/* Floating Text Labels - Strategically placed */}
            <div className="absolute top-[15%] left-[10%] transform rotate-[-5deg] bg-cosmic-black/70 backdrop-blur-sm p-3 rounded-lg border border-cosmic-blue-electric/30 shadow-lg shadow-cosmic-blue-electric/20 animate-float" style={{
            animationDelay: '0.5s'
          }}>
              <h3 className="text-cosmic-blue-electric text-lg font-bold">Visión EduFinder</h3>
              <p className="text-cosmic-white/80 text-sm max-w-xs">
                EduFinder será el estándar para encontrar, analizar y recomendar el mejor contenido educativo online, usando IA y datos reales para transformar la experiencia de aprendizaje.
              </p>
            </div>
            
            <div className="absolute bottom-[20%] right-[10%] transform rotate-[3deg] bg-cosmic-black/70 backdrop-blur-sm p-3 rounded-lg border border-cosmic-purple-light/30 shadow-lg shadow-cosmic-purple-light/20 animate-float" style={{
            animationDelay: '1s'
          }}>
              <h3 className="text-cosmic-purple-light text-lg font-bold">IA Educativa</h3>
              <p className="text-cosmic-white/80 text-sm max-w-xs">
                Nuestra IA analizará tus búsquedas, resultados y feedback para adaptar las recomendaciones y métricas, optimizando tu aprendizaje y permitiendo una personalización real del contenido.
              </p>
            </div>
          </div>
          
          {/* Future Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cosmic-black/30 border border-cosmic-blue-electric/20 rounded-lg overflow-hidden group hover:border-cosmic-blue-electric/60 transition-all duration-300">
              <div className="p-6 h-full flex flex-col">
                <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-blue-deep to-cosmic-black">
                    {/* Animation for IA Study Plans */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* AI-generated study plan visualization */}
                        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed border-cosmic-blue-electric/50 rounded-md animate-pulse">
                          <div className="absolute -top-2 -left-2 w-4 h-4 bg-cosmic-blue-electric rounded-full"></div>
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-cosmic-purple-light rounded-full"></div>
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cosmic-blue-neon rounded-full"></div>
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cosmic-purple-electric rounded-full"></div>
                        </div>
                        
                        {/* AI documents being generated */}
                        <div className="absolute top-1/3 left-1/3 w-1/3 h-2/3 flex flex-col gap-2">
                          {[0, 1, 2].map(i => <div key={i} className="bg-cosmic-black/70 border border-cosmic-blue-electric/30 rounded p-1 transform transition-all duration-500 animate-float" style={{
                          animationDelay: `${i * 0.3}s`,
                          transform: `translateY(${i * 10}px) scale(${1 - i * 0.1})`,
                          opacity: 1 - i * 0.2
                        }}>
                              <div className="h-1 w-1/2 bg-cosmic-blue-neon/50 rounded mb-1"></div>
                              <div className="h-1 w-2/3 bg-cosmic-blue-neon/30 rounded mb-1"></div>
                              <div className="h-1 w-1/3 bg-cosmic-blue-neon/20 rounded"></div>
                            </div>)}
                        </div>
                        
                        {/* Data connections */}
                        {[...Array(5)].map((_, i) => {
                        const startAngle = Math.random() * Math.PI * 2;
                        const endAngle = startAngle + Math.PI;
                        const startX = Math.cos(startAngle) * 70 + 100;
                        const startY = Math.sin(startAngle) * 70 + 100;
                        const endX = Math.cos(endAngle) * 70 + 100;
                        const endY = Math.sin(endAngle) * 70 + 100;
                        return <svg key={i} className="absolute inset-0 w-full h-full" style={{
                          animationDelay: `${i * 0.3}s`
                        }}>
                              <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={i % 2 === 0 ? "#00E6FF" : "#8A2BE2"} strokeWidth="1" strokeDasharray="3 2" className="animate-data-flow" />
                            </svg>;
                      })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-cosmic-blue-neon mb-3">Planes de Estudio IA</h3>
                <p className="text-cosmic-white/80 mb-auto">
                  La IA analizará tus fortalezas, debilidades y objetivos para diseñar planes de estudio personalizados que optimicen tu tiempo y maximicen tu aprendizaje. Cada recurso educativo será seleccionado estratégicamente para tu desarrollo.
                </p>
                
                <div className="pt-4 mt-4 border-t border-cosmic-blue-electric/10">
                  <div className="flex items-center text-sm text-cosmic-blue-electric">
                    <span className="mr-3">En desarrollo</span>
                    <div className="relative w-24 h-1 bg-cosmic-black/50 rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-3/4 bg-cosmic-blue-electric rounded-full"></div>
                    </div>
                    <span className="ml-auto">Q3 2025</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-cosmic-black/30 border border-cosmic-purple-light/20 rounded-lg overflow-hidden group hover:border-cosmic-purple-light/60 transition-all duration-300">
              <div className="p-6 h-full flex flex-col">
                <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple-dark to-cosmic-black">
                    {/* Learning Path Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="relative w-full h-full">
                        {/* Path nodes and connections */}
                        <svg className="absolute inset-0" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
                          {/* Main path */}
                          <path d="M 10,50 C 40,30 70,70 100,50 C 130,30 160,70 190,50" fill="none" stroke="url(#purple-gradient)" strokeWidth="2" strokeDasharray="5,3" className="animate-data-flow" />
                          
                          {/* Learning path nodes */}
                          {[10, 55, 100, 145, 190].map((x, i) => <g key={i}>
                              <circle cx={x} cy={i % 2 === 0 ? 50 : i === 1 ? 30 : 70} r={i === 2 ? 6 : 4} fill={i <= 2 ? "#C77DFF" : "#1A0B37"} stroke={i <= 2 ? "#C77DFF" : "#C77DFF30"} strokeWidth="1" className={i === 2 ? "animate-pulse" : ""} />
                              {i === 2 && <circle cx={x} cy={i % 2 === 0 ? 50 : 30} r={10} fill="none" stroke="#C77DFF" strokeWidth="1" className="animate-pulse" style={{
                            animationDuration: '2s'
                          }} />}
                            </g>)}
                          
                          <defs>
                            <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.3" />
                              <stop offset="50%" stopColor="#C77DFF" />
                              <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* Course indicators along path */}
                        <div className="absolute top-[15%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 bg-cosmic-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs border border-cosmic-purple-light/30 text-cosmic-purple-light">
                          Básico
                        </div>
                        
                        <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-cosmic-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs border border-cosmic-purple-light/50 text-cosmic-purple-light">
                          Intermedio
                        </div>
                        
                        <div className="absolute top-[30%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 bg-cosmic-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs border border-cosmic-purple-light/30 text-cosmic-purple-light">
                          Avanzado
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-cosmic-purple-light mb-3">Rutas de Aprendizaje</h3>
                <p className="text-cosmic-white/80 mb-auto">
                  Navega por caminos de conocimiento optimizados que conectan múltiples recursos de forma coherente. Nuestro sistema mapeará las relaciones entre conceptos para guiarte naturalmente de principiante a experto en cualquier materia.
                </p>
                
                <div className="pt-4 mt-4 border-t border-cosmic-purple-light/10">
                  <div className="flex items-center text-sm text-cosmic-purple-light">
                    <span className="mr-3">En desarrollo</span>
                    <div className="relative w-24 h-1 bg-cosmic-black/50 rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-cosmic-purple-light rounded-full"></div>
                    </div>
                    <span className="ml-auto">Q1 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Future Platform Integrations */}
          
        </div>
      </div>
    </section>;
};
export default FutureSection;