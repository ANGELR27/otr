import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Loader2, Eye, CalendarDays, CheckCircle2, XCircle } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  description: string;
  publishedAt?: string; 
  simulatedViewCount?: string;
  eduFinderScore?: number; // Simulated score
  strengths?: string[]; // For detected strengths
  weaknesses?: string[]; // For detected weaknesses
}

const sampleStrengths = [
  "Excelente estructura pedagógica con ejercicios prácticos.",
  "Cubre conceptos modernos y relevantes (Streams, Optional, etc.).",
  "Incluye proyectos reales y evaluaciones para aplicar conocimiento.",
  "Explicaciones claras y concisas, ideal para autoaprendizaje.",
  "Buen ritmo y progresión de dificultad.",
  "Material complementario de alta calidad (código fuente, diapositivas)."
];

const sampleWeaknesses = [
  "Puede ser muy avanzado para principiantes absolutos sin base.",
  "Requiere conocimientos previos de programación orientada a objetos.",
  "Algunos ejemplos podrían ser más detallados o variados.",
  "La calidad de audio/video podría mejorar en ciertas secciones.",
  "Falta de interacción directa o soporte para dudas."
];

const predefinedSuggestions = [
  "Tutorial de Python para principiantes",
  "Curso completo de JavaScript moderno",
  "Aprender React desde cero",
  "Introducción a Machine Learning",
  "Desarrollo web full stack",
  "Algoritmos y estructuras de datos",
  "Fundamentos de SQL y bases de datos",
  "Diseño UX/UI para aplicaciones móviles",
  "Curso de Node.js y Express",
  "Introducción a la ciberseguridad"
];

// Helper function to get random elements from an array
const getRandomElements = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FutureSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // State for YouTube Search Demo
  const [searchQuery, setSearchQuery] = useState('');
  const [videoResults, setVideoResults] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

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

  const fetchVideos = async (currentQuery: string, pageToken?: string) => {
    if (!YOUTUBE_API_KEY) {
      setSearchError('Error: La API Key de YouTube no está configurada.');
      setIsLoading(false);
      setIsLoadingMore(false);
      return;
    }

    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(currentQuery)}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Error al buscar videos.');
      }
      const data = await response.json();

      const mappedVideos: YouTubeVideo[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        simulatedViewCount: Math.floor(Math.random() * 1000000).toLocaleString('es-ES'),
        eduFinderScore: Math.floor(Math.random() * 31) + 70,
        strengths: getRandomElements(sampleStrengths, Math.floor(Math.random() * 3) + 2),
        weaknesses: getRandomElements(sampleWeaknesses, Math.floor(Math.random() * 2) + 1),
      }));

      setVideoResults(prevVideos => pageToken ? [...prevVideos, ...mappedVideos] : mappedVideos);
      setNextPageToken(data.nextPageToken || null);
      setSearchError(null);
    } catch (err: any) {
      setSearchError(err.message || 'Ocurrió un error desconocido.');
      setNextPageToken(null); // Clear token on error
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleSearch = async (query: string = searchQuery, e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setShowSuggestions(false);
    setSearchAttempted(true);
    setIsLoading(true);
    setVideoResults([]); // Clear previous results for a new search
    setNextPageToken(null); // Clear previous page token
    setSearchError(null);

    fetchVideos(query);
  };

  const handleLoadMore = () => {
    if (!nextPageToken || isLoadingMore) return;
    setIsLoadingMore(true);
    fetchVideos(searchQuery, nextPageToken);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchAttempted(false); // Reset search attempt status
    // videoResults and searchError are cleared when a new search starts or query is empty

    if (query.length > 0) {
      const filteredSuggestions = predefinedSuggestions.filter(
        suggestion => suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1); // Reset active suggestion
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setVideoResults([]); // Clear results if query is empty
      setSearchError(null); // Clear error if query is empty
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    searchInputRef.current?.focus(); // Ensure input is focused
    handleSearch(suggestion); // Pass suggestion directly to search
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex(prevIndex => 
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex(prevIndex => 
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        } else {
          handleSearch(searchQuery); // Perform search with current input if no suggestion selected
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    }
  };

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

  return (
    <section className="py-20 relative overflow-hidden" id="futuro">
      <div className="cosmic-grid"></div>

      <div className="absolute top-0 right-0 w-full md:w-1/2 h-1/3 bg-cosmic-blue-electric/5 rounded-bl-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-1/3 bg-cosmic-purple-electric/5 rounded-tr-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">
              El Futuro de EduFinder (Demo Funcional)
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-blue-electric to-cosmic-purple-light mx-auto mb-12"></div>

          {/* YouTube Search Demo Section */}
          <div className="mb-16 max-w-3xl mx-auto" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) { setShowSuggestions(false); } }}> {/* Hide suggestions on blur from the entire search section */}
            <form onSubmit={(e) => handleSearch(searchQuery, e)} className="mb-8 flex flex-col sm:flex-row gap-4"> {/* Added relative positioning here for the form itself */}
              <div className="relative w-full sm:flex-grow"> {/* Ensures proper width and growth in flex layouts */}
                  <input ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar videos educativos en YouTube..."
                  className="w-full p-3 rounded-lg bg-cosmic-black/50 border border-cosmic-blue-neon/50 text-cosmic-white focus:ring-2 focus:ring-cosmic-blue-electric focus:border-cosmic-blue-electric outline-none transition-all duration-300"
                />
                {showSuggestions && (
                  <ul className="absolute z-50 w-full bg-cosmic-dark-blue border border-cosmic-blue-neon/50 rounded-b-lg shadow-xl left-0 top-full mt-1"> {/* Ensure top-full and left-0 for precise positioning below input */}
                    {suggestions.map((suggestion, index) => (
                      <li key={suggestion} className={`p-2 cursor-pointer ${activeSuggestionIndex === index ? 'bg-cosmic-blue-electric/20' : ''}`} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                  )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-cosmic-purple-light to-cosmic-blue-electric text-cosmic-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-lg focus:ring-2 focus:ring-cosmic-blue-neon focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap sm:w-auto w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Buscando...
                  </span>
                ) : 'Buscar'}
              </button>
            </form>

            {searchError && (
              <div className="p-4 mb-4 text-sm text-red-400 bg-red-900/30 rounded-lg border border-red-400/50" role="alert">
                <span className="font-medium">Error:</span> {searchError}
              </div>
            )}

            {videoResults.length > 0 && (
              <div className="grid grid-cols-1 gap-6">
                {videoResults.map((video, index) => (
                  <div key={video.id} className="bg-cosmic-black/50 border border-cosmic-blue-neon/30 rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:border-cosmic-blue-electric/70 transition-all duration-300 shadow-lg hover:shadow-cosmic-blue-electric/20">
                    <div className="relative rounded-lg">
                      <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover rounded-lg" />
                      <div className="absolute top-2 left-2 bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-bold shadow-lg z-10 border-2 border-cosmic-purple-light">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-cosmic-blue-neon mb-1 truncate" title={video.title}>{video.title}</h3>
                      <h4 className="text-sm text-cosmic-gray-medium mb-2 truncate">
                        {video.channelTitle}
                      </h4>
                      <div className="my-3">
                        <p className="text-xs text-cosmic-gray-light truncate-3-lines" title={video.description}>{video.description}</p>
                        <div className="mt-2 pt-2 border-t border-cosmic-purple-light/10 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cosmic-gray-medium">
                          {video.publishedAt && (
                            <span className="flex items-center">
                              <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-cosmic-purple-light" />
                              {video.publishedAt}
                            </span>
                          )}
                          {video.simulatedViewCount && (
                            <span className="flex items-center">
                              <Eye className="w-3.5 h-3.5 mr-1.5 text-cosmic-purple-light" />
                              {video.simulatedViewCount} vistas
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Strengths and Weaknesses Sections */}
                      {(video.strengths && video.strengths.length > 0 || video.weaknesses && video.weaknesses.length > 0) && (
                        <div className="mt-3 pt-3 border-t border-cosmic-purple-light/10 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                          {video.strengths && video.strengths.length > 0 && (
                            <div>
                              <h4 className="flex items-center font-semibold text-green-400 mb-1.5">
                                <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                                Fortalezas Detectadas
                              </h4>
                              <ul className="space-y-1 pl-1">
                                {video.strengths.map((strength, idx) => (
                                  <li key={`strength-${idx}`} className="flex items-start text-cosmic-gray-light">
                                    <span className="text-green-400 mr-1.5 mt-0.5 flex-shrink-0">✓</span>
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {video.weaknesses && video.weaknesses.length > 0 && (
                            <div>
                              <h4 className="flex items-center font-semibold text-red-400 mb-1.5">
                                <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                Debilidades Clave
                              </h4>
                              <ul className="space-y-1 pl-1">
                                {video.weaknesses.map((weakness, idx) => (
                                  <li key={`weakness-${idx}`} className="flex items-start text-cosmic-gray-light">
                                    <span className="text-red-400 mr-1.5 mt-0.5 flex-shrink-0">✕</span>
                                    {weakness}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {video.eduFinderScore && (
                        <div className="mt-auto pt-2 border-t border-cosmic-blue-neon/20">
                          <p className="text-sm font-medium">
                            <span className="bg-gradient-to-r from-cosmic-blue-electric via-cosmic-blue-neon to-cosmic-purple-light text-transparent bg-clip-text">
                              Puntuación EduFinder (Demo):
                            </span>
                            <span className={`ml-2 font-bold ${video.eduFinderScore >= 9 ? 'text-green-400' : video.eduFinderScore >= 8 ? 'text-yellow-400' : 'text-orange-400'}`}>
                              {video.eduFinderScore.toFixed(1)}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isLoading && !videoResults.length && (
              <div className="text-center text-cosmic-white/80 py-8">
                <p>Buscando videos...</p>
                {/* You can add a more elaborate loader here if desired */}
              </div>
            )}

            {!isLoading && nextPageToken && !isLoadingMore && (
              <div className="text-center mt-8 mb-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-gradient-to-r from-cosmic-purple-light to-cosmic-blue-electric text-cosmic-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-lg focus:ring-2 focus:ring-cosmic-blue-neon focus:ring-opacity-50"
                >
                  Cargar Más Resultados
                </button>
              </div>
            )}
            {isLoadingMore && (
                <div className="text-center text-cosmic-white/80 py-8 flex justify-center items-center">
                    <Loader2 className="w-8 h-8 mr-3 animate-spin text-cosmic-blue-neon" />
                    <span>Cargando más videos...</span>
                </div>
            )}

            {!isLoading && videoResults.length === 0 && searchQuery && searchAttempted && !searchError && (
              <div className="text-center text-cosmic-white/80 py-8">
                <p>No se encontraron resultados para "{searchQuery}". Intenta con otra búsqueda.</p>
              </div>
            )}
          </div>
          {/* End YouTube Search Demo Section */}

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
    </section>
  );
};
export default FutureSection;