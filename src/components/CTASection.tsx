import React, { useState } from 'react';
import { toast } from "@/components/ui/sonner";
import { Star, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("¡Gracias por tu interés! Te notificaremos cuando EduFinder esté disponible.", {
        description: "Has asegurado tu lugar en el acceso anticipado."
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };
  const openPrototype = () => {
    window.open('/prototype', '_blank');
  };
  return <section className="py-20 relative overflow-hidden" id="conclusion">
      <div className="cosmic-grid"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="cyberpunk-card text-center">

            
            <p className="mt-8 text-cosmic-white/80 italic">
              "Esta presentación de EduFinder busca ofrecer una visión realista y funcional, inspirada en el desafío creativo de Generation Colombia: 'Ten en cuenta que la aplicación (app) debe ser realista... RESPONDER A LAS PREGUNTAS EN UN TEXTO PLANO (tipo Word), SIN INCLUIR CREATIVIDAD VISUAL o de otro tipo, NO SERÁ SUFICIENTE para ser seleccionado para nuestro bootcamp - serás rechazad@'. Espero que esta demostración cumpla con esa expectativa."
            </p>
          </div>
          
          <div className="mt-16 text-center text-cosmic-white/70">
            <p className="mb-4">Si esta presentación interactiva  no cumple con los criterios, descraga este análisis completo en PDF.</p>
            <a
              href="/El-Problema-Encontrar-Videos-Educativos-de-Calidad-en-YouTube.pdf"
              download="El Problema - Encontrar Videos Educativos de Calidad en YouTube.pdf"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-br from-cosmic-blue-neon to-cosmic-purple-light hover:from-cosmic-blue-electric hover:to-cosmic-purple-dark transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-cosmic-white mb-6"
              aria-label="Descargar PDF: El Problema de Encontrar Videos Educativos"
            >
              <Download size={18} className="mr-2" />
              <span className="text-sm font-semibold">Descargar</span>
            </a>
            <p className="mt-6 text-xs">© 2025 Angel Rodriguez. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;