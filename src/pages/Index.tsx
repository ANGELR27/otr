
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SolutionSection from "@/components/SolutionSection";
import FlowSection from "@/components/FlowSection";
import BenefitsSection from "@/components/BenefitsSection";
import FutureSection from "@/components/FutureSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  // Implement smooth scrolling
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for header height
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-cosmic-black text-cosmic-white">
      <Header />
      <HeroSection />
      <SolutionSection />
      <FlowSection />
      <BenefitsSection />
      <FutureSection />
      <CTASection />
    </div>
  );
};

export default Index;
