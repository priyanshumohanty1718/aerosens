
import { useState, useRef, useEffect } from "react";
import { MainNav } from "@/components/MainNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function HomePage() {
  const [scrollSection, setScrollSection] = useState(1);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll events to change background
  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      
      // Calculate which section we're in based on scroll position
      const sectionCount = 4; // Total number of color transition sections
      const sectionHeight = fullHeight / sectionCount;
      const currentSection = Math.min(
        sectionCount,
        Math.max(1, Math.ceil(scrollPosition / sectionHeight))
      );
      
      setScrollSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div ref={mainRef} className="min-h-screen flex flex-col">
      <MainNav />
      
      <HeroSection />
      
      <FeaturesSection />
      
      <TestimonialsSection />
      
      <CTASection />
      
      <ContactSection />
      
      <NewsletterSection />
      
      <FooterSection onScrollToSection={scrollToSection} />
    </div>
  );
}
