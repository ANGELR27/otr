
import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';


const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-cosmic-black/80 py-3' : 'py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-heading font-bold text-cosmic-white">
            <span className="text-cosmic-blue-neon">Edu</span>
            <span className="text-cosmic-purple-light">Finder</span>
            <span className="text-cosmic-blue-electric"></span>
          </span>
        </div>
        
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {['Misión', 'Tecnología', 'Futuro', 'Conclusion'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className="text-cosmic-white/80 hover:text-cosmic-blue-neon transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cosmic-blue-neon transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            ))}
          </ul>
        </nav>

        {/* Botón Hamburguesa (Solo Móvil) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="text-cosmic-white p-2 focus:outline-none focus:ring-2 focus:ring-cosmic-blue-neon rounded"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <button
            type="button"
            className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cosmic-blue-neon focus:ring-opacity-50"
            aria-label="Perfil de usuario"
          >
            <img 
              src="/yoo.jpg" 
              alt="Usuario"
              className="w-10 h-10 rounded-full object-cover border-2 border-cosmic-black/50"
            />
          </button>
          <a 
            href="https://colombia.generation.org/"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-3 py-2 rounded-lg bg-gradient-to-br from-cosmic-blue-neon to-cosmic-purple-light hover:from-cosmic-blue-electric hover:to-cosmic-purple-dark transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            aria-label="Generation Colombia (opens in a new tab)"
          >
            <span className="text-xs font-bold text-cosmic-black tracking-wider block text-center leading-tight">
              GENERATION
            </span>
            <span className="text-sm font-semibold text-cosmic-white block text-center leading-tight">
              COLOMBIA
            </span>
          </a>
        </div>
      </div>

      {/* Panel del Menú Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cosmic-black/95 backdrop-blur-sm shadow-lg absolute top-full left-0 right-0 z-40">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {['Misión', 'Tecnología', 'Futuro', 'Conclusion'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 px-4 text-cosmic-white/90 hover:text-cosmic-blue-neon transition-colors text-lg rounded hover:bg-cosmic-purple-dark/30 w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            {/* Enlace Generation Colombia en Menú Móvil */}        
            <li className="pt-4">
               <a 
                  href="https://colombia.generation.org/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg bg-gradient-to-br from-cosmic-blue-neon to-cosmic-purple-light hover:from-cosmic-blue-electric hover:to-cosmic-purple-dark transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  aria-label="Generation Colombia (opens in a new tab)"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xs font-bold text-cosmic-black tracking-wider block text-center leading-tight">GENERATION</span>
                  <span className="text-sm font-semibold text-cosmic-white block text-center leading-tight">COLOMBIA</span>
                </a>
            </li>
            {/* Enlace Descargar PDF en Menú Móvil */}
            <li className="pt-2">
              <a
                href="/El-Problema-Encontrar-Videos-Educativos-de-Calidad-en-YouTube.pdf"
                download="El Problema - Encontrar Videos Educativos de Calidad en YouTube.pdf"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-cosmic-white w-full"
                aria-label="Descargar PDF: El Problema de Encontrar Videos Educativos"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download size={18} className="mr-2" />
                <span className="text-sm font-semibold">Descargar PDF</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
